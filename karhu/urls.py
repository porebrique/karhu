from django.conf.urls import *
from django.views.generic import TemplateView
from django.conf import settings

from karhu.ngadmin.nonrest import common



# from tastypie.api import Api
# from karhu.ngadmin.api.tasty  import PostResource, AlbumResource, SongResource
# v1_api = Api(api_name='v1')
# v1_api.register(PostResource())
# v1_api.register(AlbumResource())
# v1_api.register(SongResource())


urlpatterns = patterns( '',
    
    (r'^blog/', include('karhu.blog.urls')),
    (r'^lineup/', include('karhu.lineup.urls')),
    (r'^events/', include('karhu.events.urls')),
    (r'^gallery/', include('karhu.gallery.urls')),
    (r'^music/', include('karhu.music.urls')),
             
    (r'^manage/', include('karhu.admin.urls')),
    
    (r'^ngadmin/', TemplateView.as_view(template_name="ngadmin/app/index.html")),
    
    #(r'^api/admin', include('karhu.ngadmin.urls')),

    #(r'^api/', include('karhu.ngadmin.urls')),
    
    #(r'^api/', include(v1_api.urls)), #tastypie
    
    
                                
    (r'^getconfig', common.config),                                
    
    (r'^api/', include('karhu.ngadmin.api.urls')),
    
    

#    url(r'^(?P<path>files/.*)$', 'django.views.static.serve',
#        {'document_root': '', 'show_indexes': True}),
    
#    url(r'^(?P<path>(css|js|img|flash|adminstatic)/.*)$', 'django.views.static.serve',
#        {'document_root': settings.STATIC_ROOT, 'show_indexes': True}),                       

#    url(r'^todo$', TemplateView.as_view(template_name='site/issues.html')),
)



'''
for app in apps.used.apps:
    urlpatterns += patterns('', (r'^%s/' % app['name'], include(app['app'].urls)))
    # including enabled apps' urlconfs 
'''
