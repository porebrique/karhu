
from django.views.decorators.csrf import csrf_exempt
from karhu.libs.bcm.utils.decorators import render_to, json_view

from karhu.libs.bcm.image.forms import CropForm

@csrf_exempt
def crop_view(request, model, object_id, field_name, variant_name):
    
    object = model.objects.get(pk=object_id)
    field = getattr(object, field_name)
    version = getattr(field, variant_name)
    width = version.width
    height = version.height
    source_image = field
    
    if request.method == 'POST':
        return crop_post(request, object, field, version)
        
    else:
        return crop_get(request, object, width, height, source_image)
    


@render_to('admin/crop_interface.html')
def crop_get(request, object,  width, height, source_image):
    size = {'width': width, 'height': height}
    form = CropForm(object=object)
    form.action = request.path
    return {'form': form, 'source_image': source_image, 'size': size}


@json_view
def crop_post(request, object, field, version):
    form = CropForm(request.POST, object=object)
    
    if form.is_valid():
        #print form.cleaned_data
        selection = {}
        for key in form.cleaned_data.keys():
            selection[key] = int(form.cleaned_data[key])
             
        version.crop(selection=selection)
        return {'result': 'ok'}
    

