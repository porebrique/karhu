from django.conf.urls import *
from django.views.generic import ListView, DetailView, TemplateView
from .models import Post
#import urls_admin as admin
urlpatterns = patterns('',

    url(r'^(?P<pk>\d+)$', DetailView.as_view(model=Post, template_name='site/blog/zoom.html'), name="karhu-blog-zoom"),
    url(r'^$', ListView.as_view(model=Post, paginate_by=10, template_name="site/blog/feed.html"), name="karhu-blog-feed"),
    #url(r'^$', TemplateView.as_view(template_name='blog/templates/feed.html'), name="karhu-blog-feed"),
    
)

