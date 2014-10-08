
from django import forms

class CropForm(forms.Form):
    same_options = {'max_length': 5, 'widget': forms.HiddenInput()}
    x1 = forms.CharField(**same_options)
    x2 = forms.CharField(**same_options)
    y1 = forms.CharField(**same_options)
    y2 = forms.CharField(**same_options)
    width = forms.CharField(**same_options)
    height = forms.CharField(**same_options)
    

    def __init__(self, *args, **kwargs):
        self.object = kwargs.pop('object', None)
        super(CropForm, self).__init__(*args, **kwargs)
        
        
    