# -*- encoding:utf-8 -*-

from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from karhu.libs.bcm.utils.system import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.views import generic 

from karhu.libs.bcm.utils.decorators import json_view, render_to, user_is

from django.contrib.auth import logout as auth_logout


#from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
 
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


# ----------------------------
# Protected views


class ProtectedTemplateView(generic.TemplateView):
    @method_decorator(user_is('staff'))
    def dispatch(self, *args, **kwargs):
        return super(ProtectedTemplateView, self).dispatch(*args, **kwargs)

class ProtectedListView(generic.ListView):
    @method_decorator(user_is('staff'))
    def dispatch(self, *args, **kwargs):
        return super(ProtectedListView, self).dispatch(*args, **kwargs)

class ProtectedDetailView(generic.DetailView):
    @method_decorator(user_is('staff'))
    def dispatch(self, *args, **kwargs):
        return super(ProtectedDetailView, self).dispatch(*args, **kwargs)

class ProtectedCreateView(generic.CreateView):
    @method_decorator(user_is('staff'))
    def dispatch(self, *args, **kwargs):
        return super(ProtectedCreateView, self).dispatch(*args, **kwargs)

class ProtectedUpdateView(generic.UpdateView):
    @method_decorator(user_is('staff'))
    def dispatch(self, *args, **kwargs):
        return super(ProtectedUpdateView, self).dispatch(*args, **kwargs)


# --------------------------
@render_to('admin/login.html')
def logout(request):
    auth_logout(request)
    return HttpResponseRedirect('/')


# -------------------------- 
class DeleteView(generic.DeleteView):
    template_name = 'admin/delete_confirmation.html'

    def __init__(self, *args, **kwargs):
        super(DeleteView, self).__init__(*args, **kwargs)
        
    def get_context_data(self, **kwargs):
        context = super(DeleteView, self).get_context_data(**kwargs)
        context['action_url'] = self.request.path
        return context

    @method_decorator(user_is('staff'))
    def dispatch(self, *args, **kwargs):
        return super(DeleteView, self).dispatch(*args, **kwargs)    

@user_is('staff')
def common_delete(request, pk, *args, **kwargs):
    # I think it isnt used anymore but let it be
    object = kwargs['model'].objects.get(pk=pk)
    object.delete()
    return HttpResponseRedirect(reverse(kwargs['success_url']))

# ------------------------------------------------
#  Sort views 

@csrf_exempt
def common_sorter(request, model=None, parent=None, *args, **kwargs):
    if request.method == 'POST':
        return common_sorter_post(request, model, *args, **kwargs)
    else:
        return common_sorter_get(request, model, parent, *args, **kwargs)
    
@json_view
@user_is('staff')
def common_sorter_post(request, model, *args, **kwargs):
    try:
        order = request.POST.getlist('order[]')
        order = [int(pk) for pk in order]
        objects = model.objects.filter(pk__in=order).only('order')
        for i in range(len(order)):
            item = objects.get(pk=order[i])
            item.order = i
            item.save()
        # Wonder if there is a way to save all at once somehow
        return {'status': 'success'}
    except:
        return {'status': 'fail'}

@render_to('admin/sorting_interface.html')
@user_is('staff')
def common_sorter_get(request, model, parent, *args, **kwargs):
    if parent:
        field = '%s__pk' % parent
        pk = request.GET.get('parent_pk', None)
        filter = {field : pk}     
        objects = model.objects.filter(**filter)
    else:
        objects = model.objects.all()
    
    return {'objects': objects}

# ------------------------------------------------

