from django.conf.urls import *
#from django.views.generic import CreateView, UpdateView
from django.db.models import Count


from karhu.libs.bcm.utils.system import reverse_lazy
from karhu.admin import views as admin_views

from .models import Pagelet, Slot, PageletForm
from .views import slots_and_pagelets


views_options = {
                 'pagelet':       {'model': Pagelet, 'form_class': PageletForm, 'success_url': reverse_lazy('admin-pagelets-feed'), 'template_name':'admin/pagelets/pagelet_edit.html'},
                 'slot':       {'model': Slot, 'success_url': reverse_lazy('admin-pagelets-feed'), 'template_name':'admin/pagelets/slot_edit.html'}
                 }

urlpatterns = patterns('',

    url(r'^$',                              slots_and_pagelets, name='admin-pagelets-feed'),
    
    url(r'^pagelet/add$',                   admin_views.ProtectedCreateView.as_view(**views_options['pagelet']), name='admin-pagelet-add'),
    url(r'^pagelet/edit/(?P<pk>\d+)$',      admin_views.ProtectedUpdateView.as_view(**views_options['pagelet']), name='admin-pagelet-edit'),
    url(r'^pagelet/delete/(?P<pk>\d+)$',    admin_views.DeleteView.as_view(model=Pagelet, success_url=reverse_lazy('admin-pagelets-feed')), name='admin-pagelet-delete'),
    
    url(r'^slot/add$',                      admin_views.ProtectedCreateView.as_view(**views_options['slot']), name='admin-slot-add'),
    url(r'^slot/edit/(?P<pk>\d+)$',         admin_views.ProtectedUpdateView.as_view(**views_options['slot']), name='admin-slot-edit'),
    url(r'^slot/delete/(?P<pk>\d+)$',       admin_views.DeleteView.as_view(model=Slot, success_url=reverse_lazy('admin-pagelets-feed')), name='admin-slot-delete'),

)