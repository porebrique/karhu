from django.db import models
from django.contrib.flatpages.models import FlatPage
from django.contrib.sites.models import Site

from django.conf import settings

from django import forms
# Create your models here.


class Pagelet(FlatPage):
    
    class Meta:
        proxy = True
    
    def __unicode__(self):
        return self.title    
    
    def save(self, *args, **kwargs):
        self.prepare_url()
        super(Pagelet, self).save(*args, **kwargs)
        self.prepare_sites()


    def prepare_url(self):
        # r = "^[a-zA-Z0-9_]*$"
        self.url = self.url.lower()
        if not self.url.startswith('/'):
            self.url = '/%s' % self.url
        if not self.url.endswith('/'):
            self.url = '%s/' % self.url


    def prepare_sites(self):
        current_site = Site.objects.get(pk=settings.SITE_ID)
        if not current_site in self.sites.all():
            self.sites.add(current_site)
            self.save()
                    

class PageletForm(forms.ModelForm):
    #sites = forms.ModelMultipleChoiceField(required=False, queryset=Site.objects.all(), initial=[settings.SITE_ID])

    class Meta:
        model = Pagelet
        exclude = ('sites', 'registration_required', 'enable_comments', 'template_name')

# -----------------------

        
class Slot(models.Model):
    title = models.CharField(max_length=40, default="Some slot")
    
    pagelet = models.ForeignKey(Pagelet, related_name="slots", blank=True, null=True, on_delete=models.SET_NULL)
    
    class Meta:
        ordering = ('id',)
    def __unicode__(self):
        return self.title
    
