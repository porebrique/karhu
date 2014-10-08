from django.conf.urls import *
from django.views.generic import ListView, DetailView
from .models import Folder, Image
from .views import feed
import urls_admin as admin

from django.db.models import Count

not_empty_folders = Folder.objects.annotate(size=Count('images')).filter(size__gt=0).select_related()

urlpatterns = patterns('',

    url(r'^$', ListView.as_view(queryset=not_empty_folders.filter(status__gt=0), template_name='site/gallery/feed.html'), name="karhu-gallery-feed"),
    url(r'^(?P<pk>\d+)$', feed, name="karhu-folder"),
    
)
