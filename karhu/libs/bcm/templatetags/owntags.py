# -*- coding: utf-8 -*-

from django import template

#from apps.pagelets.models import Slot, Pagelet
from karhu.pagelets.models import Slot, Pagelet
from django.conf import settings

register = template.Library()



@register.inclusion_tag('widgets/safe_html.html')
def render_slot(pk, *args, **kwargs):
    try:
        pagelet = Pagelet.objects.get(slots__pk__contains=pk)
        html = pagelet.content or ''
    except Pagelet.DoesNotExist:
        html ='<!-- Slot %s does not exists or just empty -->' % pk
        
    return {'safe_html':  html}


@register.inclusion_tag('widgets/placeholder.html')
def placeholder(width, height):
    return {'width': width, 'height': height}
    

@register.inclusion_tag('widgets/mp3player.html')
def mp3player_admin(mode, mp3_or_playlist, width=None, height=None):
    return _player('admin', mode, mp3_or_playlist, width, height)

@register.inclusion_tag('widgets/mp3player.html')
def mp3player(mode, mp3_or_playlist, width=None, height=None):
    return _player('site', mode, mp3_or_playlist, width, height)


def _player(skin, mode, mp3_or_playlist, width, height):
    if skin == 'site':
        options = settings.SITE.MP3PLAYER
    elif skin == 'admin':
        options = settings.SITE.MP3PLAYER
    result = options['common']
    result.update(options[mode])
    
    if mode == 'single':  # mode must be 'single' or 'multi' only
        result['mp3'] = mp3_or_playlist
    elif mode == 'multi':
        result['mp3'] = mp3_or_playlist['urls']
        result['title'] = mp3_or_playlist['titles']

    result['width'] = width or options['single']['width']
    result['height'] = height or options['single']['height']
#    if width:
#        result['width'] = width
#    if height:
#        result['height'] = height
        
    options = ['%s=%s'%(key, result[key]) for key in result.keys()]
    options = '&'.join(options)
    
    return {'options': options, 'width': result['width'], 'height': result['height'], 'mode': mode}   

# ---------------

# ---------------

@register.filter
def rupluralize(value, arg="чирок,чирка,чирков"):
    args = arg.split(",")
    number = abs(int(value))
    a = number % 10
    b = number % 100

    if (a == 1) and (b != 11):
        return args[0]
    elif (a >= 2) and (a <= 4) and ((b < 10) or (b >= 20)):
        return args[1]
    else:
        return args[2] 
    
    
@register.filter
def random_number(value):
    from random import random
    r = str(random())
    return '%s?random=%s' % (value, r)

   
@register.filter
def wraplines(text, type='br'):
    
    if type == 'br':
        pattern = '%s<br/>'
    elif type == 'p':
        pattern = '<p>%s</p>'
    
    html = []
    for line in text.splitlines():
        html.append(pattern % line)
    html =  ''.join(html)
    return html     



@register.simple_tag
def active(request, pattern):
    import re
    if re.search(pattern, request.path):
        return 'active'
    return ''
