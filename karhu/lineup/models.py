# -*- encoding:utf-8 -*-

import os

from django.db import models
from django.conf import settings
from karhu.libs.bcm.image.fields import CustomImageField

#http://www.ivankin.net/?p=70
#переименовка файла на лету
def get_file_path(instance, filename=None):
    # returns lineup\image_PK_source.ext
    if not filename:
        filename = instance.photo.name 
    ext = os.path.splitext(filename)[-1]
    filename = "person_%s_photo%s" % (instance.pk, ext)
    path =  os.path.join('lineup', filename)
    print 'hey hey', path
    return path


PERSON_PHOTO_OPTIONS = {
           'cache_folder': 'cache/lineup',
           'sizes': {
                   'thumbnail': ('crop', settings.SITE.LINEUP['thumbnail_width'], settings.SITE.LINEUP['thumbnail_height']), 
                   'web':       ('fit', settings.SITE.LINEUP['web_width'], settings.SITE.LINEUP['web_height'])
                   }
           }

class Person(models.Model):
    name = models.CharField(max_length=100, default="Some Guy")
    role = models.CharField(max_length=50, default="Piano")
    photo = CustomImageField(blank=True, upload_to=get_file_path, options=PERSON_PHOTO_OPTIONS)
    order = models.PositiveSmallIntegerField(default=1, editable=False)
    


    class Meta:
        ordering = ('order',)


    def __unicode__(self):
        return self.name
    
    @property
    def portrait_width(self):
        return self.photo.thumbnail.width

    @property
    def portrait_height(self):
        return self.photo.thumbnail.height
    
    @property
    def portrait_url(self):
        u =  self.photo.thumbnail.url
        return u

# ---------------------------------------------

class Topic(models.Model):
    title = models.CharField(max_length=100)
    order = models.PositiveSmallIntegerField(default=10)
    class Meta:
        ordering = ('order',)
        
    def __unicode__(self):
        return u'%s' % (self.title)

    
class Note(models.Model):
    text = models.TextField(max_length=100, blank=True)
    topic = models.ForeignKey(Topic, related_name='notes')
    person = models.ForeignKey(Person, related_name='notes')
    class Meta:
        ordering = ('topic__order',)
        
        