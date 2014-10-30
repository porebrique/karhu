from django.shortcuts import render_to_response
from django.template import RequestContext

from django.http import HttpResponse, HttpResponseRedirect

from django.core.urlresolvers import reverse

from datetime import datetime
import time

#from django.utils import simplejson
import json

from functools import wraps
from django.utils.decorators import available_attrs



def date_handler(obj):
    if hasattr(obj, 'timetuple'):
        return time.mktime(obj.timetuple()) if hasattr(obj, 'isoformat') else obj
    else:
        return obj
    #else:
    #    raise TypeError("Unserializable object %s of type %s" % (obj, type(obj)))
    

# From django-annoying
# http://bitbucket.org/offline/django-annoying/wiki/Home
def json_view(func):
    def wrap(request, *a, **kw):
        response = func(request, *a, **kw)
        jsonresponse = json.dumps(response, default=date_handler, ensure_ascii=False) # nb about parsefloat?
        return HttpResponse(jsonresponse, mimetype='application/json')
    return wrap

def render(func):
    def wrap(request, *a, **kw):
        pass
    pass


def render_to(template=None):
    """
    Decorator for Django views that sends returned dict to render_to_response function.

    Template name can be decorator parameter or TEMPLATE item in returned dictionary.
    RequestContext always added as context instance.
    If view doesn't return dict then decorator simply returns output.

    Parameters:
     - template: template name to use

    Examples:
    # 1. Template name in decorator parameters

    @render_to('template.html')
    def foo(request):
        bar = Bar.object.all()
        return {'bar': bar}

    # equals to
    def foo(request):
        bar = Bar.object.all()
        return render_to_response('template.html',
                                  {'bar': bar},
                                  context_instance=RequestContext(request))


    # 2. Template name as TEMPLATE item value in return dictionary

    @render_to()
    def foo(request, category):
        template_name = '%s.html' % category
        return {'bar': bar, 'TEMPLATE': template_name}

    #equals to
    def foo(request, category):
        template_name = '%s.html' % category
        return render_to_response(template_name,
                                  {'bar': bar},
                                  context_instance=RequestContext(request))

    """
    def renderer(function):
        def wrapper(request, *args, **kwargs):
            output = function(request, *args, **kwargs)
            if not isinstance(output, dict):
                return output
            tmpl = output.pop('TEMPLATE', template)
            c = RequestContext(request)
            return render_to_response(tmpl, output, context_instance=c)

        return wrapper
    return renderer


def user_is(arg):
    """
    Custom version of django's user_pass_test decorator.
    Returns my own handler403 if test is not successful.
    """    
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            if arg.__class__ == str:
                u = request.user
                test_dict = {'staff': u.is_staff,
                             'superuser': u.is_superuser,
                             'authenticated': u.is_authenticated()}
                if test_dict[arg]:
                    return view_func(request, *args, **kwargs)
                #return handler403(request)
                return HttpResponseRedirect(reverse('admin-login'))
            elif hasattr(arg, '__call__'):
                if arg(request.user):
                    return view_func(request, *args, **kwargs)
                else:
                    #return handler403(request)
                    return HttpResponseRedirect(reverse('admin-login'))
        return wraps(view_func, assigned=available_attrs(view_func))(_wrapped_view)
    return decorator
