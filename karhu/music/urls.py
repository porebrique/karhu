from django.conf.urls import *

from django.views.generic import ListView, DetailView
from .models import Album, Song
import urls_admin as admin

urlpatterns = patterns('',

    url(r'^$', ListView.as_view(model=Album, queryset=Album.objects.select_related(), template_name='site/music/feed.html'), name="karhu-music-feed"),
)
