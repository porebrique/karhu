import os

from django.db import models
from django import forms
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.db.models import Q

from django.conf import settings

from karhu.libs.bcm.utils.system import OverwriteStorage, file_rename
from karhu.libs.bcm.image.fields import CustomImageField



def generate_playlist(queryset):
    queryset = queryset.exclude(Q(mp3='')|Q(mp3__isnull=True))
    # this maybe slow, dunno.
    urls = []
    titles = []
    for song in queryset.all():
        urls.append(song.mp3.url)
        titles.append(song.title)
    urls = '|'.join(urls)
    titles = '|'.join(titles)
    str = u'mp3=%s&title=%s' % (urls, titles)
    
    return {'urls': urls, 'titles': titles}

 

# -----------------------------

ALBUM_COVER_OPTIONS = {
           'cache_folder': 'cache/album_covers',
           'sizes': {
                   'thumbnail': ('crop', settings.SITE.MUSIC['thumbnail_width'], settings.SITE.MUSIC['thumbnail_height']), 
                   'web':       ('fit', settings.SITE.MUSIC['web_width'], settings.SITE.MUSIC['web_height'])
                   }
           }


def get_cover_path(instance, filename):
    ext = filename.split('.')[-1]
    #image_path = "image_%s" % (instance.pk)
    filename = "cover_%s.%s" % (instance.pk, ext)
    path =  os.path.join('music', 'covers', filename)
    #path =  os.path.join('gallery', image_path, filename)
    return path

class Album(models.Model):
    # how about "root" or "abstract" albums?
    
    title = models.CharField(max_length=150)
    
    order = models.PositiveSmallIntegerField(default=0)
    #cover = CustomImageField(blank=True, upload_to='music/covers', options=ALBUM_COVER_OPTIONS)
    cover = CustomImageField(blank=True, null=True, upload_to=get_cover_path, options=ALBUM_COVER_OPTIONS)
    
    class Meta:
        ordering = ('order', 'title')
        
    def __unicode__(self):
        return self.title        
    
    
    def get_cover(self):
        if self.cover:
            return self.cover.url
        else:
            return None
    
    def clear_cover(self):
        if self.cover:
            self.cover.delete_variants()
            self.cover.delete()
            self.cover = ''
    
    @property
    def playlist(self):
        return generate_playlist(self.songs)
        
# ---------------    
    
    
def get_song_path(instance, filename):
    if instance.pk:
        ext = filename.split('.')[-1]
        filename = "song_%s.%s" % (instance.pk, ext)
    path =  os.path.join('music', 'mp3', filename)
    return path
    

class Song(models.Model):
    title = models.CharField(max_length=150, default="Track 1")
    album = models.ForeignKey(Album, related_name='songs', blank=True)
    mp3 = models.FileField(upload_to=get_song_path, storage=OverwriteStorage(filetypes=('mp3',)), blank=True)
    lyrics = models.TextField(blank=True, default="")
    order = models.PositiveSmallIntegerField(default=0)
    
    
    class Meta:
        ordering = ('album__order', 'order', 'title') 
    
    def clear_mp3(self):
        if self.mp3:
            self.mp3.delete()
            self.mp3 = ''
        
    def __unicode__(self):
        return self.title        

# -------------------------------------------------------------

class SongForm(forms.ModelForm):
    clear_mp3 = forms.BooleanField(required=False)
    
    class Meta:
        model = Song

    def save(self, *args, **kwargs):
        object = super(self.__class__, self).save(*args, **kwargs)
        if self.cleaned_data.get('clear_mp3'):
            object.clear_mp3()
        return object

class AlbumForm(forms.ModelForm):
    clear_cover = forms.BooleanField(required=False)
    
    class Meta:
        model = Album
        widgets = {'cover': forms.FileInput()}

    def save(self, *args, **kwargs):
        object = super(self.__class__, self).save(*args, **kwargs)
        if self.cleaned_data.get('clear_cover'):
            object.clear_cover()
        return object

# ---------------- Signals ------------------------------------

@receiver(pre_delete, sender=Song)
def song_file_delete(sender, instance, **kwargs):
    instance.clear_mp3()
    
@receiver(post_save, sender=Song)
def song_file_rename(sender, instance, created, **kwargs):
    if created and instance.mp3:
        new_file_path = get_song_path(instance, instance.mp3.name)
        file_rename(instance, 'mp3', new_file_path)
        
    