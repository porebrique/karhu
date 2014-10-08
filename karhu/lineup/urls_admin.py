from django.conf.urls import *

#from django.views.generic import DetailView, ListView
from karhu.libs.bcm.utils.system import reverse_lazy
from karhu.libs.bcm.image.views import crop_view

from karhu.admin import views as admin_views

from .models import Person, Topic
import views as lineup_views


urlpatterns = patterns('',

    url(r'^topic/add$',                          lineup_views.lineup_topic_add, name="admin-topic-add"),
    url(r'^topic/delete/(?P<pk>\d+)$',           admin_views.common_delete, {'model': Topic, 'success_url':'admin-lineup-feed'}, name="admin-topic-delete"),

    url(r'^person/delete/(?P<pk>\d+)$',          admin_views.DeleteView.as_view(model=Person, success_url=reverse_lazy('admin-lineup-feed')), name="admin-person-delete"),
    url(r'^person/edit/(?P<object_id>\d+)$',     lineup_views.person_edit, name='admin-person-edit'),
    url(r'^person/add$',                         lineup_views.person_edit, name='admin-person-add'),
    
    # Cant replace custom edit view because of NotePack() and blah blah
    # Maybe it's possible to use custom ModelForm enhanced with NotePack?
    # or just add extra context ok ok there is smth about that in docs

    url(r'^person/crop/(?P<object_id>\d+)/(?P<variant_name>\S+)$',     crop_view, {'model': Person, 'field_name': 'photo'}, name='admin-person-crop'),
    
    url(r'^order$',                              admin_views.common_sorter, {'model': Person}, name='admin-lineup-order'),
#    url(r'^$',                                   ListView.as_view(model=Person, queryset=Person.objects.select_related(), template_name='admin/lineup/feed.html'), name='admin-lineup-feed'),
    url(r'^$',                                   lineup_views.admin_feed,  name='admin-lineup-feed'),
)