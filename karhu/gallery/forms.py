from django import forms
from .models import Folder, Image


class ImageAddForm(forms.ModelForm):
    folder = forms.ModelChoiceField(queryset=Folder.objects.all())
    class Meta:
        model = Image

class ImageEditForm(ImageAddForm):
    # There is now need to edit Image right now
    class Meta:
        exclude = ('source',)        
            
