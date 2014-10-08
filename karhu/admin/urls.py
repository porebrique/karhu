
from django.conf.urls import *

from karhu.admin.views import  ProtectedTemplateView, logout
from django.contrib.auth import views as auth_views


#from django.contrib.auth.decorators import login_required

#from apps.used import lineup, blog, events, music, pagelets, gallery
#import apps.used


urlpatterns = patterns('',
    url(r'^login$', auth_views.login, {'template_name': 'admin/login.html'}, name="admin-login"),
    url(r'^logout$', logout, name="admin-logout"),
    
    (r'^blog/', include('karhu.blog.urls_admin')),
    (r'^lineup/', include('karhu.lineup.urls_admin')),
    (r'^events/', include('karhu.events.urls_admin')),
    (r'^gallery/', include('karhu.gallery.urls_admin')),
    (r'^pagelets/', include('karhu.pagelets.urls_admin')),
    (r'^music/', include('karhu.music.urls_admin')),
    
    url(r'^$', ProtectedTemplateView.as_view(template_name='admin/index.html'), name="admin-index" ),
    
    
)

'''
for app in apps.used.apps:
    urlpatterns += patterns('', (r'^%s/' % app['name'], include(app['app'].urls.admin)))
'''

# or: 

'''
urlpatterns = patterns('',


    #url(r'^login$', login, name="admin-login"),
    url(r'^login$', auth_views.login, {'template_name': 'admin/login.html'}, name="admin-login"),
    url(r'^logout$', logout, name="admin-logout"),
    
    (r'^lineup/', include(lineup.urls.admin)),
    (r'^events/', include(events.urls.admin)),
    (r'^music/', include(music.urls.admin)),
    (r'^blog/', include(blog.urls.admin)),
    (r'^pagelets/', include(pagelets.urls.admin)),
    (r'^gallery/', include(gallery.urls.admin)),
    # ---------------------------------------------
    #url(r'^$', TemplateView.as_view(template_name='admin/glagne.html'), name="admin-index" ),    
    url(r'^$', ProtectedTemplateView.as_view(template_name='admin/glagne.html'), name="admin-index" ),
)

'''