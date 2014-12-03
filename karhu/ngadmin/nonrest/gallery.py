from karhu.libs.bcm.utils.decorators import json_view
from django.conf import settings

from karhu.gallery.models import Folder, Image

from karhu.libs.bcm.utils.tools import find_in_list
import json

from time import sleep


@json_view
def folders(request, id=None):
    
    if request.method == 'GET':
        if id:
            folder = Folder.objects.get(pk=id)
            return flat_folder(folder)
        else:
            #list_type = request.GET.get('type', None)
            folders = Folder.objects.all()
            #if list_type == 'short':
             #   response = [flat_folder(folder, False) for folder in folders]
                
            response = [flat_folder(folder) for folder in folders]
            return response
    elif request.method == 'POST':
        P = json.loads(request.body)
        
        data = {
                'title': P.get('title', None),
                'cover': P.get('cover', None),
                'status': P.get('status', None),
                'description': P.get('description', None)
                }
        
        if id:
            folder = Folder.objects.get(pk=id)
            folder.title = P['title']
        else:
            folder = Folder.objects.create()
            
            
        folder.save()
        return flat_folder(folder)
    elif request.method == 'DELETE':
        folder = Folder.objects.get(pk=id)
        folder.delete()

@json_view
def folder_custom_action(request, id=None, action=None):
    
    folder = Folder.objects.get(pk=id)
    #sleep(2)
    #return flat_folder(folder) 

    if action == 'delete_cover':
        folder.clear_cover()
    elif action == 'upload_cover':
        print 'got cover'
        file = request.FILES.get('file', None)
        if file:
            print 'really got cover'
            #song.mp3 = file
            #song.save()
            folder.cover = file
            folder.save()
    print 'after custom action:', folder, folder.cover, folder.cover.url            
    return flat_folder(folder)


def flat_folder(folder):
    response = {
              'id': folder.pk,
              'title': folder.title,
              'description': folder.description,
              'order': folder.order,
              'status': folder.status
              }
    if folder.cover:
        response['cover'] = {'url': folder.cover_url}
    response['size'] = folder.images.count()
    return response


@json_view
def images(request, id=None):
    Klass = Image
    
    if request.method == 'GET':
        if id:
            object = Klass.objects.get(pk=id)
            return flat_image(object)
        else:
            objects = Klass.objects.all()
            response = [flat_image(obj) for obj in objects]
            return response
    elif request.method == 'POST':
        sleep(3)
        #P = json.loads(request.body)
        #print 'body before file', P
        POST = request.POST
        print 'POST before file', POST
        print '...and QueryDict', POST.get('folder_id')
        
        file = request.FILES.get('file', None)
        
        if file:
            folder_id = request.POST.get('folder_id')
            folder = Folder.objects.get(pk=folder_id)
            image = Image.objects.create(image=file, folder=folder)
            image.save()
            return flat_image(image)
        else:
            P = json.loads(request.body)
            
            if id:
                object = Klass.objects.get(pk=id)
            else:
                object = Klass.objects.create()
            object.save()
            return flat_image(object)
    elif request.method == 'DELETE':
        object = Klass.objects.get(pk=id)
        sleep(1)
        object.delete()
        return 'ok'

def flat_image(object):
    print 'flating image', object
    print 'from folder', object.folder, object.folder.title
    response = {
                #'folder': {'id': object.folder.pk, 'title': object.folder.title},
                'id': object.pk,
                'urls': {
                            'thumbnail': object.image.thumbnail.url}
                }
    return response
    