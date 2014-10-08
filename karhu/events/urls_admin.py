from django.conf.urls import *
from django.views.generic import ListView, CreateView, UpdateView
from karhu.libs.bcm.utils.system import reverse_lazy
from karhu.admin import views as admin_views
from .models import Event


views_options = {'model': Event, 'success_url': reverse_lazy('admin-events-feed'), 'template_name': 'admin/events/edit.html'}

urlpatterns = patterns('',
   
    url(r'^delete/(?P<pk>\d+)$',         admin_views.DeleteView.as_view(model=Event, success_url=reverse_lazy('admin-events-feed')), name='admin-event-delete'),
    url(r'^edit/(?P<pk>\d+)$',           admin_views.ProtectedUpdateView.as_view(**views_options), name='admin-event-edit'),
    url(r'^add$',                        admin_views.ProtectedCreateView.as_view(**views_options), name='admin-event-add'),
    url(r'^$',                           admin_views.ProtectedListView.as_view(model=Event, template_name='admin/events/feed.html'), name="admin-events-feed"),
    
)
