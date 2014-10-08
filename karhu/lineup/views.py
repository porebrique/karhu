
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from karhu.libs.bcm.utils.decorators import render_to, user_is
from karhu.libs.bcm.utils.tools import find_in_list
from .models import Person, Topic, Note
from .forms import  PersonForm, NotePack



@render_to('site/lineup/feed.html')
def feed(request):
    return __feed(request)   

 
@render_to('admin/lineup/feed.html')
@user_is('staff')
def admin_feed(request):
    return __feed(request)   


def __feed(request):
    topics = Topic.objects.values()
    notes = Note.objects.values()
    notes_extended = []
    for t in topics:
        for note in find_in_list(notes, 'topic_id', t['id']):
            note['topic'] = t
            notes_extended.append(note)

    people = Person.objects.all()                
    for p in people:
        person_notes = find_in_list(notes_extended, 'person_id', p.pk)
        setattr(p, 'notes_rendered', person_notes)
    return {'people': people}   


@user_is('staff')
@render_to('admin/lineup/zoom.html')
def person_edit(request, object_id=None):
    
    if object_id:
        person = Person.objects.get(pk=object_id)
        #print object_id
    else:
        person = None
        #print 'nope'
        
    topic_was_added = False
    
    if request.method == 'POST':
#----
        if 'new_topic' in request.POST and request.POST.get('new_topic'):
            title = request.POST.get('new_topic')
            topic = Topic(title=title)
            topic.save()
            topic_was_added = True
# ---
        if object_id:
            form = PersonForm(request.POST, request.FILES, instance=person)
            notepack = NotePack(post=request.POST, person=person)
        else:
            form = PersonForm(request.POST, request.FILES)
            notepack = NotePack(post=request.POST)
        
        if form.is_valid() and not topic_was_added:
            person = form.save()
            if notepack.valid:
                notepack.save(person = person)
                return HttpResponseRedirect(reverse('admin-lineup-feed'))
            
    else:
        if object_id:
            form = PersonForm(instance=person)
            notepack = NotePack(person=person)
        else:
            form = PersonForm()
            notepack = NotePack()

    return {'person': person, 
            'form': form, 
            'notepack': notepack
            }

@user_is('staff')
def lineup_topic_add(request):
    if request.method == 'POST':
        if 'return_url' in request.POST and request.POST.get('return_url'):
            return_url = request.POST.get('return_url')
        else:
            return_url = reverse('admin-lineup-feed')

        if 'new_topic' in request.POST and request.POST.get('new_topic'):
            title = request.POST.get('new_topic')
            topic = Topic(title=title)
            topic.save()
    return HttpResponseRedirect(return_url)
    