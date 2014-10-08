from django.conf.urls import *
import views
import urls_admin as admin

urlpatterns = patterns('',

    url(r'^$', views.feed, name="karhu-events-feed"),
    url(r'^past$', views.feed, {'past':True},  name="karhu-events-feed-past"),
    
)
