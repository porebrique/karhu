from django.conf.urls import *

from django.views.generic import DetailView, ListView
from .models import Person
from .views import feed 
#import urls_admin as admin


urlpatterns = patterns('',

    url(r'^(?P<pk>\d+)$', DetailView.as_view(model=Person, template_name='site/lineup/zoom.html'),  name="karhu-lineup-zoom"),
    #url(r'^$', ListView.as_view(model=Person, template_name="site/lineup/feed.html"), name="karhu-lineup-feed"),
    #dunno why not generic view
    url(r'^$', feed, name='karhu-lineup-feed'),
    
)
