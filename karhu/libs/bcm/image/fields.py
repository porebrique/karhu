# -*- encoding:utf-8 -*-

import os
import shutil

from django.db.models import signals
from django.db.models.fields.files import ImageField, ImageFieldFile
#from django.core.files.images import ImageFile, get_image_dimensions
from django.core.exceptions import ValidationError



from django.conf import settings
from karhu.libs.bcm.utils import system 
from karhu.libs.bcm.image.smartimage import SmartImage




'''
Mystic ussue: upload_to must be a function. Dunno why simple string doesn't work. 
'''


# ISSUES
# some method to update ALL thumbnails after size change

class CustomImageFieldFile(ImageFieldFile):
    
    def __init__(self, *args, **kwargs):
        # args are (instance, field, name)
        super(CustomImageFieldFile, self).__init__(*args, **kwargs)
        #print 'fieldfile init for model: ', self.instance.pk
        self.populate()
    
    def save(self, *args, **kwargs):
        super(CustomImageFieldFile, self).save(*args, **kwargs)
        #self.field.delete_variants()
        print 'saving field'
        if self.instance.pk:
            self.create_variants()

    def populate(self):
        self.options = self.field.options
        self.save_to = '%s/%s' % (self.options['cache_folder'], self.instance.pk)
        self.variants = []
        for key in self.options['sizes'].keys():
            size = Variant(
                           fieldfile=self,
                           name=key, 
                           method = self.options['sizes'][key][0],
                           width = self.options['sizes'][key][1],
                           height = self.options['sizes'][key][2],
                           save_to = self.save_to
                           )
            setattr(self, key, size)
            self.variants.append(size)
    
    
    @property
    def exists(self):
        return bool(self)

    @property
    def get_reliable_path(self):
        return self

    def get_upload_to(self, instance):
        # got troubles if field.upload_to is simple string
        filename = os.path.split(self.name)[1]
        if callable(self.field.upload_to):
            #print 'upload_to is callable'
            r = self.field.upload_to(instance, filename)
        else:
            #print 'upload_to is string'
            r = os.path.join(self.field.upload_to, filename)
            r = os.path.normpath(r)
        #print 'resulting upload_to is ', r
        return r
            
    def post_save(self):
#        print '-----------------------------'
#        print 'post-saving for instance ', self.instance.pk 
        if self.exists:
            #new_path = self.field.upload_to(self.instance, self.name)
            new_path = self.get_upload_to(self.instance)
            system.file_rename(self.instance, self.field.name, new_path)
            self.create_variants()
#            print 'post-save closed.'
    
    def pre_delete(self, instance, **kwargs):
        #print 'pre_delete signal or call'
        self.delete_variants()
        if bool(self):
            path = os.path.join(settings.MEDIA_ROOT, self.get_upload_to(instance))
            if os.path.exists(path):
                os.remove(path)        
        

    def delete_variants(self, **kwargs):
        path = self.save_to
        path = path.replace('[PK]', str(self.instance.pk))
        path = os.path.join(settings.MEDIA_ROOT, path)
        if path and os.path.exists(path):
            shutil.rmtree(path)

        
       
    def create_variants(self):
        self.delete_variants()
        variants = self.variants
        if variants:
            for v in variants:
                v.create()
                

#   -------------- Field ----------------                



class CustomImageField(ImageField):
    attr_class = CustomImageFieldFile
    
    def __init__(self, *args, **kwargs):
        kwargs['storage'] = kwargs.get('storage', system.OverwriteStorage(filetypes=('jpg','png','gif')))
        # filetypes should be in lowercase.
        
        self.options = kwargs.pop('options', None)
        v = kwargs.get('validators', [])
        v.append(self.image_validator)
        kwargs['validators'] = v
        super(CustomImageField, self).__init__(self, *args, **kwargs)


    def image_validator(self, *args, **kwargs):
        file = args[0]
        ext = os.path.splitext(file.name)[1].split('.')[1]
        ext = ext.lower()
        if not ext in self.storage.filetypes:
            filetypes = ', '.join(self.storage.filetypes)
            raise ValidationError('Загружать можно только файлы %s.' % filetypes)
    

    def contribute_to_class(self, cls, name):
        super(CustomImageField, self).contribute_to_class(cls, name)
        signals.post_save.connect(self.post_save, sender=cls)
        signals.pre_delete.connect(self.pre_delete, sender=cls)

    def post_save(self, instance, created, **kwargs):
        if created:
            field = getattr(instance, self.name, None)
            field.post_save()

    def pre_delete(self, instance, **kwargs):
        field = getattr(instance, self.name, None)
        field.pre_delete(instance, **kwargs)        
        
 
        

# --------------------------------
#     Image variant
# --------------------------------


class Variant:
    
    def __init__(self, *args, **kwargs):
        #self.field_name = kwargs['field_name']
        #self.instance = kwargs['instance']
        
        self.fieldfile = kwargs['fieldfile']
        self.name = kwargs['name']
        self.method = kwargs['method']
        self.width = kwargs['width']
        self.height = kwargs['height']

        self.save_to = kwargs['save_to']
        self.src = None
        
        
    def __unicode__(self):
        return self.__class__, self.name
    
    @property
    def field(self):
        p = getattr(self.fieldfile.instance, self.fieldfile.field.name, None)
        return p
    
    @property
    def croppable(self):
        src = self.field
        return src.width > self.width and src.height > self.height
            

    def create(self):
        print 'creating variant', self.name
        if self.exists:
            image = SmartImage(self.src)
            if self.method == 'fit':
                image.fit(self.width, self.height)
            elif self.method == 'crop':
                image.crop(self.width, self.height)
            image.save(self.path)
                                
    
    
    def path_or_url(self, method):
        if self.exists:
            #folder = self.save_to.replace('[PK]', str(self.instance.pk))
            folder = self.save_to
            if method == 'path':
                p = os.path.join(settings.MEDIA_ROOT, folder, self.filename)
                p = os.path.normpath(p)
            elif method == 'url':
                p = '%s%s/%s' % (settings.MEDIA_URL, folder, self.filename)
            return p
        else:
            return 'None'

    @property
    def exists(self):
        #field = getattr(self.instance, self.field_name, None)
        if self.field and self.field.exists:
            self.src = self.field.path
            return True
        else:
            self.src = None
            return False
        
        
    @property
    def filename(self):
        path = self.src
        filename = os.path.split(path)[1]
        name, ext = os.path.splitext(filename)
        name = '%s_%s%s' % (name, self.name, ext)
        return name
            
    @property        
    def path(self):
        return self.path_or_url('path')   

    @property        
    def url(self):
        return self.path_or_url('url')
        
    def crop(self, selection):
        if self.exists:
            image = SmartImage(self.src)
            image.crop(self.width, self.height, selection)
            image.save(self.path)
        
        
        
# -------------

# http://djangosnippets.org/snippets/978/
# same functionality snippet


# http://softwaremaniacs.org/forum/django/7411/

#class BookCoverImageField(models.ImageField):
#    def save_form_data(self, instance, data):
#        if data and isinstance(data, UploadedFile):
#            image = Image.open(data)
#            image.thumbnail((150, 150), Image.BILINEAR)
#            new_image = StringIO()
#            image.save(new_image, 'JPEG')
#            data = SimpleUploadedFile(data.name, new_image.getvalue(), data.content_type)
#        super(BookCoverImageField, self).save_form_data(instance, data)        