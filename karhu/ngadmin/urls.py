from django.conf.urls import *
from django.views.generic import TemplateView
from django.conf import settings
from karhu.ngadmin.api import common, blog, lineup, pagelets, music


from karhu.lineup.models import Person
from karhu.libs.bcm.image.views import crop_view

class Api():
    common = common
    blog = blog
    lineup = lineup
    pagelets = pagelets
    music = music

api = Api()
    
urlpatterns = patterns( '',
    
    (r'^config', api.common.config),
    
    (r'^lineup/crop_for/(?P<id>\d+)$', api.lineup.crop),
    #url(r'^apiperson/crop/(?P<object_id>\d+)/(?P<variant_name>\S+)$', crop_view, {'model': Person, 'field_name': 'photo'}),
    #(r'^lineup/crop$', api.lineup.crop),
    
    (r'^lineup/topic/(?P<id>\d+)$', api.lineup.topic),
    (r'^lineup/topic$', api.lineup.topic),
    
    #(r'^lineup/new$', api.lineup.person, {'person_id': 'new'}),
    (r'^lineup/(?P<person_id>\d+)$', api.lineup.person),
    (r'^lineup$', api.lineup.person),
    
    (r'^blog/(?P<post_id>\d+)$', api.blog.blog),
    (r'^blog', api.blog.blog),
    
    (r'^pagelets/(?P<id>\d+)$', api.pagelets.pagelets),
    (r'^pagelets$', api.pagelets.pagelets),
    
    (r'^pagelets/slots/(?P<id>\d+)$', api.pagelets.slots),
    (r'^pagelets/slots$', api.pagelets.slots),    
    
    (r'^music/albums/(?P<id>\d+)$', api.music.albums),
    (r'^music/albums/$', api.music.albums),   

    (r'^music/songs/(?P<id>\d+)/(?P<action>\w+)$', api.music.song_custom_action),
    (r'^music/songs/(?P<id>\d+)$', api.music.songs),
    (r'^music/songs$', api.music.songs),
    
    
    #(r'', TemplateView.as_view(template_name="ngadmin/app/index.html")),
    
    
    
                                

#    url(r'^(?P<path>files/.*)$', 'django.views.static.serve',
#        {'document_root': '', 'show_indexes': True}),
    
#    url(r'^(?P<path>(css|js|img|flash|adminstatic)/.*)$', 'django.views.static.serve',
#        {'document_root': settings.STATIC_ROOT, 'show_indexes': True}),                       

#    url(r'^todo$', TemplateView.as_view(template_name='site/issues.html')),
)


