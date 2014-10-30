from karhu.libs.bcm.utils.decorators import json_view
from django.conf import settings
from time import sleep
from karhu.blog.models import Post
from karhu.lineup.models import Person, Topic, Note

from karhu.libs.bcm.utils.tools import find_in_list
import json



@json_view
def crop(request, id=None):
    
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        model = Person
        object_id = id
        field_name = 'photo'
        variant_name = 'thumbnail'
        
        
        object = model.objects.get(pk=object_id)
        
        field = getattr(object, field_name)
        source_image = field
        
        version = getattr(field, variant_name)
        width = version.width
        height = version.height
        
        P = json.loads(request.body)
        
        selection = {
                     'x1': P['x1'],
                     'y1': P['y1'],
                     'x2': P['x2'],
                     'y2': P['y2'],
                     'width': P['width'],
                     'height': P['height'],
                     }
        
        
        #for key in form.cleaned_data.keys():
        #    selection[key] = int(form.cleaned_data[key])
             
        version.crop(selection=selection)
                
        return 'cropped'



@json_view
def topic(request, id=None):
    if request.method == 'GET':
        return get_flat_notepack()
    elif request.method == 'POST':
        if id:
            pass
        else:
            P = json.loads(request.body)
            #print 'creating topic', P
            topic = Topic.objects.create(title=P['title'])
            topic.save()
            topic_flat = {'title': topic.title, 'id': topic.pk}
            return topic_flat
    elif request.method == 'DELETE':
        topic = Topic.objects.get(pk=id)
        topic.delete()

# ------------------------------------------------------------

@json_view
def person(request, person_id=None):
    if request.method == 'GET':
        if person_id:
            person = Person.objects.get(pk=person_id)
            return flatten_person(person)
        else:
            return get_lineup_list()
    elif request.method == 'POST':  # TO DO
        return save_person(request, person_id)
    elif request.method == 'DELETE':
        person = Person.objects.get(pk=person_id)
        person.delete()
        return 'person deleted'
    
    
    
def save_person(request, person_id=None):
    #print 'saving, person_id is', person_id
    
    if person_id:
        person = Person.objects.get(pk=person_id)
    else:
        person = Person.objects.create()
    
    P = json.loads(request.body)
    
    person.name = P['name']
    person.role = P.get('role', '')
    person.save()        
    
    notepack = P.get('notepack', [])
    for item in notepack:
        #print 'note from pack', item
        # {u'topic': {u'id': 1, u'title': u'theme 1'}, u'note': {u'text': u'ulitka1', u'id': 1}}
        note = item['note']
        note_id = note.get('id', None)
        note_text = note.get('text', None)
        if note_id:
            note_object = Note.objects.get(pk=note_id)
            if note_text:
                note_object.text = note['text']
                note_object.save()
            else:
                note_object.delete()
        elif note_text:
            topic_object = Topic.objects.get(pk=item['topic']['id'])
            note_object = Note.objects.create(topic=topic_object, text=note_text, person=person)
            note_object.save()

    return flatten_person(person)


def flatten_person(person):
    
    if person:
        id = person.pk
        portrait_url =  person.portrait_url
        name = person.name
        role = person.role
        print person.photo.url
        photo = person.photo.url
        notepack = get_flat_notepack(person)
    else:
        id = 'new'
        portrait_url =  None
        name = None
        role = None
        notepack = get_flat_notepack()
        
    person_flat = {
                    'id': id,
                     'portrait_url': portrait_url,
                     'photo': photo,
                     'name': name,
                     'role': role,
                    
                   'notepack': notepack
                   }    
    return person_flat
    

def get_flat_notepack(person=None):
    notepack = []
    if person:
        notes = Note.objects.filter(person=person)
        topics = Topic.objects.all()
        for topic in topics:
            item = {} 
            item['topic'] = {'id': topic.pk, 'title': topic.title}
            #print 'topic is', topic.title
            if notes:
                
                note = notes.filter(topic=topic)
                if note.exists():
                    note = note[0]
                    item['note'] = {'id': note.pk, 'text': note.text }
                else:
                    item['note'] = {'id': None, 'text': '' }
            else:
                item['note'] = {'id': None, 'text': '' }
            
            notepack.append(item)
    else: # blank set for person creating form
        topics = Topic.objects.all()
        for topic in topics:
            item = {
                    'topic': {'id': topic.pk, 'title': topic.title},
                    'note': {'id': None, 'text': '' }
                    }    
            notepack.append(item)
    return notepack

def get_lineup_list():
    #topics = Topic.objects.values()
    
    notes = Note.objects.all()

        
#     print 'notes:'
#     for n in notes:
#         print n.pk, n.text, n.topic.title, 'for ', n.person.name
#     print 'done.'


    lineup = []
    for p in Person.objects.all():
        #print '----------', p.name
        person = {
                  'id': p.id,
                  'name': p.name,
                  'role': p.role,
                  #'photo': p.photo,
                  'photo': True if p.photo else False,
                  'order': p.order,
                  'portrait_url': p.portrait_url,
                  'thumbnail': {
                                'width': p.portrait_width,
                                'height': p.portrait_height
                                }
                  
                   }
        person_notes = notes.filter(person=p)
        
        person['notes'] = []
        
        for n in person_notes:
            print n.pk, n.text, n.topic.title
            item = {'topic': n.topic.title, 'note': n.text}
            person['notes'].append(item)
        #person['notes'] = person_notes = find_in_list(notes_extended, 'person_id', p.pk)
        lineup.append(person)
    return lineup    
