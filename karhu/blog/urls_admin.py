from django.conf.urls import *
#from django.views.generic import ListView, CreateView, UpdateView

from karhu.libs.bcm.utils.system import reverse_lazy
from karhu.admin import views as admin_views

from .models import Post

views_options = {'model': Post, 'success_url': reverse_lazy('admin-blog-feed'), 'template_name':'admin/blog/zoom.html'}

urlpatterns = patterns('',
                       
    url(r'^$',                         admin_views.ProtectedListView.as_view(model=Post, paginate_by=10, template_name='admin/blog/feed.html'), name='admin-blog-feed'),
    url(r'^add$',                      admin_views.ProtectedCreateView.as_view(**views_options), name='admin-blog-add'),
    url(r'^edit/(?P<pk>\d+)$',         admin_views.ProtectedUpdateView.as_view(**views_options), name='admin-blog-edit'),
    url(r'^delete/(?P<pk>\d+)$',       admin_views.DeleteView.as_view(model=Post,  success_url=reverse_lazy('admin-blog-feed')), name='admin-blog-delete'),
    
)                       