# -*- encoding:utf-8 -*-



from django import forms
from django.core.exceptions import ObjectDoesNotExist

from .models import Person, Topic, Note

# ----------------------------------------
class NoteForm(forms.ModelForm):
    class Meta:
        model = Note
    topic = forms.CharField(widget=forms.HiddenInput())
        
        
class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        widgets = {'photo': forms.FileInput()}
    
    

class NotePack():
    def __init__(self, person=None, post=None, *args, **kwargs):            
        
        self.valid = True
        self.notes = []
        
        for topic in Topic.objects.all():
            pre = 'note-%d' % topic.pk
            note = {'topic': topic, 'prefix': pre}
            initial_data = {'topic': topic.title}
            if person:
                try:
                    existing_note = person.notes.get(topic=topic.pk)
                    if post:
                        form = NoteForm(post, prefix=pre, instance=existing_note)
                    else:
                        form = NoteForm(instance=existing_note, prefix=pre)
                except ObjectDoesNotExist:
                    if post:
                        form = NoteForm(post, prefix=pre, initial=initial_data)
                    else:
                        form = NoteForm(prefix=pre, initial=initial_data)
            else:
                if post:
                    form = NoteForm(post, prefix=pre, initial=initial_data)
                else:
                    form = NoteForm(prefix=pre, initial=initial_data)
            
            note['form'] = form
            self.notes.append(note)

    def save(self, person):
        for note in self.notes:
            topic = note['topic']

            form = note['form']
            value =  form['text'].data

            try:
                note = person.notes.get(topic=topic)
                if value:
                    note.text = value
                    note.save()
                else:
                    note.delete()
            except ObjectDoesNotExist:
                if value:
                    note = Note(topic=topic, text=value, person=person)
                    note.save()
                
            
