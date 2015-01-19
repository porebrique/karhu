# -*- encoding:utf-8 -*-

import os
import shutil

from django.db import models
from django.dispatch import receiver

from django.conf import settings

from karhu.libs.bcm.image.smartimage import SmartImage
from karhu.libs.bcm.image.fields import CustomImageField



# ---------------------------------------------
#             Folder
# ---------------------------------------------

FOLDER_STATUSES = (
                   (0, u'Служебная'),
                   (1, u'Публичная'),
                   )

#Ну что, варианты:
#    1. Напрячься и таки нагнуть все кропные методы под отдельную картинку.
#        + выбор обложки из содержимого - логичен
#        - ад геморроя и захламление сотней методов. не вкантактик же делаю, необязательно усираться.
#
#    2. Сделать обложку простым имаджфилдом.
#        + ноль геморроя, компактно.
#        - отдельно заливать обложку может показаться странным.
#
#    3. Комбинация: обложка это имаджфилд, но в него копируется файл выбранной фотачки.
#        Если поле хранить просто путь к файлу, то можно сгенерить путь, скопировать туда файл, а путь сунуть в поле.
#        Не знаю, насколько это возможно.
#        А также большое изменение, надо осторожно браться, стряхнув серьёзные хвосты и сбакапив нынешний вариант.

#class NotEmptyFolders(models.Manager):
#    def get_query_set(self):
#        q = super(NotEmptyFolders, self).get_query_set()
#        q = q.annotate(size=models.Count('images'))
#        q = q.filter(size__gt=0)
#        return q

#class AnnotatedFolder(models.Manager):
#    def get_query_set(self):
#        q = super(AnnotatedFolder, self).get_query_set()
#        q = q.annotate(size=models.Count('images'))
#        return q

class Folder(models.Model):
    
    title = models.CharField(max_length=100, blank=True, default=u'Безымянная галерея')
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    status = models.PositiveSmallIntegerField(choices=FOLDER_STATUSES, default=1)
    cover = models.OneToOneField('Image', editable=False, related_name='covered_folder', blank=True, null=True, on_delete=models.SET_NULL)
    
#    objects = models.Manager()
#    not_empty = NotEmptyFolders()
    
    class Meta:
        ordering = ('-status', 'order',)    
    
    # NB regenerate size-versions after change
    # with post-save and custom form maybe?

#    web_width = models.PositiveSmallIntegerField(default=800)
#    web_height = models.PositiveSmallIntegerField(default=600)
#    thumbnail_width = models.PositiveSmallIntegerField(default=100)
#    thumbnail_height = models.PositiveSmallIntegerField(default=100)
    
    def __unicode__(self):
        return self.title or u'Галерея %s' % self.pk
    
    @property
    def full(self):
        return self.images.count() > 0

    @property
    def thumbnail_width(self):
        a =  self.images[0].image.thumbnail.width
        return a

    @property
    def thumbnail_height(self):
        return self.images[0].image.thumbnail.height

# ----------------------------------------
#             Cover mess
# ----------------------------------------

    @property
    def cover_is_croppable(self):
        if self.cover.image.width>self.cover_width and self.cover.image.height>self.cover_height:
            return True
        else:
            return False

    @property
    def cover_width(self):
        return settings.SITE.GALLERY['cover_width']

    @property
    def cover_height(self):
        return settings.SITE.GALLERY['cover_height']

    @property
    def cover_url(self):
        return self._generate_cover_url_or_path('url')

# ----------------------------------------

    def _generate_cover_filename(self):
        ext = os.path.splitext(self.cover.image.path)[1]
        filename = 'folder_%s_cover%s' % (self.pk, ext)
        return filename

    def _generate_cover_url_or_path(self, url_or_path):
        folder = settings.SITE.GALLERY['covers_folder']
        if url_or_path == 'path':
            path = os.path.join(settings.MEDIA_ROOT, folder, self._generate_cover_filename())
            result = os.path.normpath(path)
        elif url_or_path == 'url':
            result = '/'.join((folder, self._generate_cover_filename()))
            result = '%s%s' % (settings.MEDIA_URL, result)
        return result

    def uncover(self, save=True):
        path = self._generate_cover_url_or_path('path')
        if os.path.exists(path):
            os.remove(path)
        if save:
            self.cover = None
            self.save()
   
    def set_cover(self, photo):
        if self.cover:
            self.uncover(False)
        self.cover = photo
        self.save()
        self.create_cover()

    def create_cover(self, selection=None):
        if self.cover:
            cover_path = self._generate_cover_url_or_path('path')
            cover_folder_path = os.path.split(cover_path)[0]
            if not os.path.exists(cover_folder_path):
                os.makedirs(cover_folder_path)
            #filename = self._generate_cover_filename()
            #cover_file_path = os.path.join(cover_folder_path, filename)
            #cover_file_path = cover_path
            image = SmartImage(self.cover.image.path)
            if selection:
                image.crop(self.cover_width, self.cover_height, selection)
            else:
                image.trim(self.cover_width, self.cover_height)
            image.save(cover_path)
            print 'cover created.'
            #return filename

# -------------------------------------------------------


# ---------------------------------------------
#             Image
# ---------------------------------------------

IMAGE_OPTIONS = {
           'cache_folder': settings.SITE.GALLERY['cache_folder'],
           'sizes': {
                   'thumbnail': ('crop', settings.SITE.GALLERY['thumbnail_width'], settings.SITE.GALLERY['thumbnail_height']), 
                   'web':       ('fit', settings.SITE.GALLERY['web_width'], settings.SITE.GALLERY['web_height'])
                   }
           }

def get_file_path(instance, filename):
    folder = settings.SITE.GALLERY['images_folder']
    ext = filename.split('.')[-1]
    #image_path = "image_%s" % (instance.pk)
    filename = "image_%s.%s" % (instance.pk, ext)
    path =  os.path.join(folder, filename)
    path = os.path.normpath(path)
    return path

class Image(models.Model):
    folder = models.ForeignKey('Folder', related_name="images")
    image = CustomImageField(upload_to=get_file_path, options=IMAGE_OPTIONS)
    order = models.PositiveSmallIntegerField(default=0)
    
    class Meta:
        ordering = ('order',)
        
    @property
    def is_cover(self):
        return self == self.folder.cover
    
    def set_as_cover(self):
        self.folder.set_cover(self)
        


# ---------------------------------------------
#             Signals
# ---------------------------------------------

        
@receiver(models.signals.pre_delete, sender=Image)
def photo_pre_delete(sender, instance, **kwargs):
    if instance.is_cover:
        instance.folder.uncover()
        