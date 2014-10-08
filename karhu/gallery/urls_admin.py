from django.conf.urls import *
#from django.views.generic import CreateView, UpdateView, ListView
from django.db.models import Count

from karhu.libs.bcm.image.views import crop_view
from karhu.libs.bcm.utils.system import reverse_lazy
from karhu.admin import views as admin_views

from .models import Folder, Image
from .forms import ImageAddForm
import views as gallery_views



views_options = {
                 'gallery_folder':  {'model':Folder, 'success_url': reverse_lazy('admin-gallery-feed'), 'template_name': 'admin/gallery/folder.html'},
                 'gallery_image':   {'form_class': ImageAddForm, 'success_url': reverse_lazy('admin-gallery-feed'), 'template_name': 'admin/gallery/image.html'},
                 }

urlpatterns = patterns('',


    url(r'^photos/folder/add$',                                 admin_views.ProtectedCreateView.as_view(**views_options['gallery_folder']), name='admin-folder-add'),
    url(r'^photos/folder/edit/(?P<pk>\d+)$',                    admin_views.ProtectedUpdateView.as_view(**views_options['gallery_folder']), name='admin-folder-edit'),
    url(r'^photos/folder/delete/(?P<pk>\d+)$',                  admin_views.DeleteView.as_view(model=Folder, success_url=reverse_lazy('admin-gallery-feed')), name='admin-folder-delete'),

    url(r'^photos/folder/(?P<object_id>\d+)/update_images$',    gallery_views.folder_update_images,  name='admin-gallery-folder-update-images'),

    # at this moment editing image requires some work not provided by generic views
    # same problems with song's album
    url(r'^photos/image/add$',                                  gallery_views.add_image,  views_options['gallery_image'], name='admin-image-add'),    
    url(r'^photos/image/edit/(?P<object_id>\d+)$',              gallery_views.add_image,  views_options['gallery_image'], name='admin-image-edit'),
    url(r'^photos/image/delete/(?P<pk>\d+)$',                   admin_views.DeleteView.as_view(model=Image, success_url=reverse_lazy('admin-gallery-feed')), name='admin-image-delete'),    
    url(r'^photos/image/delete/mass$',                          gallery_views.image_mass_delete,  name='admin-image-mass-delete'),
    
    url(r'^photos/image/(?P<object_id>\d+)/crop/(?P<variant_name>\S+)$',     crop_view, {'model': Image, 'field_name': 'image'}, name='admin-gallery-image-crop'),
    url(r'^photos/folder/(?P<object_id>\d+)/crop$',         gallery_views.cover_crop_view, name='admin-gallery-folder-crop'),
    
    url(r'^photos/image/(?P<photo_id>\d+)/is_cover$',       gallery_views.set_folder_cover,  name='admin-set-folder-cover'),
    url(r'^photos/migrate$',                                gallery_views.photo_migrate,  name='admin-photo-migrate'),
    
    
    url(r'^photos/sort_folders$',                           admin_views.common_sorter, {'model': Folder},  name='admin-sort-folders'),
    url(r'^photos/sort_photos$',                            admin_views.common_sorter, {'model': Image},  name='admin-sort-photos'),

    url(r'^photos$',                                        admin_views.ProtectedListView.as_view(queryset=Folder.objects.annotate(size=Count('images')), template_name="admin/gallery/feed.html"), name='admin-gallery-feed'),
    
)