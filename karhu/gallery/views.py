# -*- encoding:utf-8 -*-
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from karhu.libs.bcm.utils.decorators import json_view, render_to, user_is

from karhu.libs.bcm.image.forms import CropForm

from .models import Folder, Image
from .forms import ImageAddForm


@render_to('site/gallery/folder.html')
def feed(request, pk):
    images = Image.objects.filter(folder__pk=pk).select_related('folder__title')
    return {'images': images}

# ------ Adding image ------
@user_is('staff')
def add_image(request, *args, **kwargs):
     
    if request.REQUEST.get('ajax', False):
        return _add_image_ajax(request, *args, **kwargs)
    else:
        return _add_image_plain(request, *args, **kwargs)


@render_to('admin/gallery/image_add_ajax.html')
def _add_image_ajax(request, object=None, *args, **kwargs):
    return _add_image(request, object_id=None, *args, **kwargs)

    
@render_to('admin/gallery/image.html')
def _add_image_plain(request, object_id=None, *args, **kwargs):
    return _add_image(request, object_id=None, *args, **kwargs)
    
    
def _add_image(request, object_id,  *args, **kwargs):
    result = {}
    form = None    
    folder = None
    if object_id:
        image = Image.objects.get(pk=object_id)
        Form = ImageEditForm
    else:
        image = None
        Form = ImageAddForm
    
    if request.method == 'POST':
        form = Form(request.POST, request.FILES, instance=image) # and image will be None for a new instance
        if form.is_valid():
            saved_image = form.save()
            folder = saved_image.folder
            
            if not folder.cover: # Usually when uploading first image to empty folder
                saved_image.set_as_cover()
            return HttpResponseRedirect(reverse('admin-folder-edit', args=(folder.pk,)))
        else:
            print 'lol errors'
    else:
        if object_id:
            form = Form(instance=image)
            result =  {'custom_form': form, 'object': image}
        else:
            f = request.GET.get('folder', None)
            if f:
                folder_pk = int(f)
#                folder = Folder.objects.get(pk=int(f))
#                form = Form(instance=image, initial={'folder': folder.pk})
                form = Form(instance=image, initial={'folder': folder_pk})
                result = {'no_folder_error': False}
            else:
                result = {'no_folder_error': True}
    if form:
        result['custom_form'] = form
    if image:
        result['object'] = image
        
    return result

# ------ /adding image ------   
    
@json_view
@user_is('staff')
def set_folder_cover(request, photo_id=None):
    if photo_id:
        photo =  Image.objects.get(pk=int(photo_id))
        if not photo.is_cover:
            photo.set_as_cover()
            status = 'success'
        else:
            status = 'But this photo is the cover already'
    return {'status': status}

@user_is('staff')
def photo_migrate(request):
    if request.method == 'GET':
        return ajax_folders_list(request)
    else:
        return change_folder(request)

@render_to('admin/gallery/folders_list.html')
@user_is('staff')
def ajax_folders_list(request):
    
    folders = Folder.objects.all()
    ex = request.GET.get('exclude_folder', None)
    if ex:
        folders = folders.exclude(pk=int(ex))
    folders = list(folders.values('pk', 'title', 'order'))
    return {'object_list': folders}      

#@json_view
#@user_is('staff')
#def change_folder_old(request):
#    folder_id = request.POST.get('folder', None)
#    target_folder = Folder.objects.get(pk=int(folder_id))
#    photos = [int(pk) for pk in request.POST.getlist('photos[]')]
#    cover_found = False
#    for pk in photos:
#        photo = Image.objects.get(pk=pk)
#        if not cover_found and photo.is_cover:
#            photo.folder.cover = None
#            photo.folder.save()
#            cover_found = True
#        photo.folder = target_folder
#        photo.save()
#    return {'status': 'ok'}

@json_view
@user_is('staff')
def change_folder(request):
    folder_id = int(request.POST.get('folder', None))
    photos_ids = [int(pk) for pk in request.POST.getlist('photos[]')]
    
    target_folder = Folder.objects.get(pk=folder_id)
    photos = Image.objects.filter(pk__in=photos_ids)

    old_folder = photos[0].folder 
    if old_folder.cover in photos:
        old_folder.uncover()

    photos.update(folder=target_folder)
    return {'status': 'Image moved to other folder'}

@user_is('staff')
def folder_update_images(request, object_id):
    # Not used now, but useful when global site's cover_size changed 
    folder = Folder.objects.get(pk=object_id)
    version_type = request.GET.get('version_type', None) # should be 'web' or 'preview' at this moment
    if folder and version_type:
        #for image in folder.images.all():
        #    image.update_version(version_type)
        return HttpResponseRedirect(reverse('admin-folder-edit', args=(object_id,)))
    

@json_view
@user_is('staff')    
def image_mass_delete(request):
    # оптовое удаление кверисетным методом происходит наприямую,
    # что отключает сигналы и кастомные удаляторы.

    photos_ids = [int(pk) for pk in request.POST.getlist('photos[]')]
    photos = Image.objects.filter(id__in=photos_ids)
    for photo in photos:
        #photo.image.pre_delete()
        photo.delete()
    #photos.delete()
    #менеджер почему-то всё равно итерировался по своим объектам
    status = 'success'
        
    return {'status': status}


# -----------------------------------------


@csrf_exempt
@user_is('staff')
def cover_crop_view(request, object_id):
    
    folder = Folder.objects.get(pk=object_id)
    
    if request.method == 'GET':
        return crop_get(request, folder)
    else:
        return crop_post(request, folder)
        
    

@user_is('staff')
@render_to('admin/crop_interface.html')
def crop_get(request, folder):
    width = folder.cover_width
    height = folder.cover_height
    source_image = folder.cover.image
    size = {'width': width, 'height': height}
    form = CropForm(object=object)
    form.action = request.path
    return {'form': form, 'source_image': source_image, 'size': size}


@json_view
@user_is('staff')
def crop_post(request, folder):
    form = CropForm(request.POST, object=folder)
    if form.is_valid():
        selection = {}
        for key in form.cleaned_data.keys():
            selection[key] = int(form.cleaned_data[key])
        folder.create_cover(selection)
        print 'crop_post method done.'
        return {'result': 'ok'}
    
