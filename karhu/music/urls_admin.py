from django.conf.urls import *
#from django.views.generic import ListView, TemplateView, CreateView, UpdateView,  ArchiveIndexView


from karhu.libs.bcm.image.views import crop_view
from karhu.libs.bcm.utils.system import reverse_lazy
from karhu.admin import views as admin_views

from .models import Album, Song, SongForm, AlbumForm
from .views import add_song

views_options = {
                 'album':           {'model': Album, 'form_class': AlbumForm, 'success_url': reverse_lazy('admin-music-feed'), 'template_name':'admin/music/album.html'},
                 'song':            {'form_class': SongForm, 'model': Song, 'success_url': reverse_lazy('admin-music-feed'), 'template_name': 'admin/music/song.html'},
                 }


urlpatterns = patterns('',

    url(r'^songs_order$',     admin_views.common_sorter, {'model': Song, 'parent': 'album'}, name="admin-songs-order"),
    url(r'^albums_order$',     admin_views.common_sorter, {'model': Album}, name="admin-albums-order"),
    
    url(r'^album/delete/(?P<pk>\d+)$',        admin_views.DeleteView.as_view(model=Album, success_url=reverse_lazy('admin-music-feed')), name='admin-album-delete'),
    url(r'^album/(?P<pk>\d+)$',               admin_views.ProtectedUpdateView.as_view(**views_options['album']), name="admin-album-edit"),
    url(r'^album/add$',                       admin_views.ProtectedCreateView.as_view(**views_options['album']), name="admin-album-add"),

    url(r'^album/crop/(?P<object_id>\d+)/(?P<variant_name>\S+)$',  crop_view, {'model': Album, 'field_name': 'cover'}, name='admin-album-crop'),    
    
    url(r'^song/delete/(?P<pk>\d+)$',         admin_views.DeleteView.as_view(model=Song, success_url=reverse_lazy('admin-music-feed')), name='admin-song-delete'),
    url(r'^song/(?P<pk>\d+)$',                admin_views.ProtectedUpdateView.as_view(**views_options['song']), name="admin-song-edit"),
    #url(r'^music/song/add$',                        CreateView.as_view(**views_options['song']), name="admin-song-add"),
    url(r'^song/add$',                        add_song, name="admin-song-add"),
    
    #url(r'^$',                                 ListView.as_view(model=Song, queryset=Song.objects.select_related(), template_name='admin/music/feed.html'), name="admin-music-feed"),
    url(r'^$',                                 admin_views.ProtectedListView.as_view(model=Album, queryset=Album.objects.select_related(), template_name='admin/music/feed.html'), name="admin-music-feed"),

)