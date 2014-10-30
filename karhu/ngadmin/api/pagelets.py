from karhu.libs.bcm.utils.decorators import json_view
from django.conf import settings
from time import sleep
#from .models import Album, Song, SongForm, AlbumForm
from karhu.pagelets.models import Pagelet, Slot

from karhu.libs.bcm.utils.tools import find_in_list
import json

@json_view
def pagelets(request, id=None):
    
    if request.method == 'GET':
        if id:
            pagelet = Pagelet.objects.get(pk=id)
            return flat_pagelet(pagelet)
        else:
            response = []
            pagelets = Pagelet.objects.all()
            for pagelet in pagelets:
                p = {
                     #'slot': {'id': pagelet.slot.pk, 'title': pagelet.slot.title} if pagelet.slot else None
                     'id': pagelet.pk,
                     'title': pagelet.title,
                     'url': pagelet.url
                     
                     }
                if pagelet.slots:
                    p['slots'] = []
                    for s in pagelet.slots.all():
                        p['slots'].append({'id': s.pk, 'title': s.title})
                response.append(p)
            
            return response
    elif request.method == 'POST':
        P = json.loads(request.body)
        
        if id:
            pagelet = Pagelet.objects.get(pk=id)
            pagelet.title = P['title']
            pagelet.url = P['url']
            pagelet.content = P['content']
        else:
            pagelet = Pagelet.objects.create(title=P['title'], url=P['url'], content=P['content'])
        
        pagelet.save()
        return flat_pagelet(pagelet)
    elif request.method == 'DELETE':
        pagelet = Pagelet.objects.get(pk=id)
        pagelet.delete()
    
def flat_pagelet(pagelet):
    s =  {'id': pagelet.pk,
          'title': pagelet.title,
          'url': pagelet.url,
           'content': pagelet.content
          }
    return s


@json_view
def slots(request, id=None):
    
    if request.method == 'GET':
        if id:
            slot = Slot.objects.get(pk=id)
            response = flat_slot(slot)
            return response
        else:
            slots = Slot.objects.all()
            response = [flat_slot(slot) for slot in slots]
            return response
    elif request.method == 'POST':
        P = json.loads(request.body)
        
        if id:
            slot = Slot.objects.get(pk=id)
            slot.title = P['title']
        else:
            slot = Slot.objects.create(title=P['title'])
        
        pagelet = P.get('pagelet', None)
        if pagelet:
            slot.pagelet = Pagelet.objects.get(pk=pagelet['id'])
        slot.save()
        return flat_slot(slot)
    elif request.method == 'DELETE':
        slot = Slot.objects.get(pk=id)
        slot.delete()            
            
            
    

def flat_slot(slot):
    s =  {'id': slot.pk,
          'title': slot.title,
           'pagelet': {'id': slot.pagelet.pk, 'title': slot.pagelet.title} if slot.pagelet else None
          }
    return s
