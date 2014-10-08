# -*- encoding:utf-8

import os
from PIL import Image as pil

from django.core.files.storage import FileSystemStorage
from django.db import models
from django.conf import settings

from django.utils.functional import lazy
from django.core.urlresolvers import reverse
# Workaround for using reverse with success_url in class based generic views
# because direct usage of it throws an exception.
reverse_lazy = lambda name=None, *args : lazy(reverse, str)(name, args=args)




class OverwriteStorage(FileSystemStorage):

    def __init__(self, filetypes=None, *args, **kwargs):
        super(OverwriteStorage, self).__init__(*args, **kwargs)
        self.filetypes = filetypes
                
    def get_available_name2(self, name):
        """
        Returns a filename that's free on the target storage system, and
        available for new content to be written to.
        """
        # If the filename already exists, remove it as if it was a true file system
        
        #if self.exists(name):
            #os.remove(os.path.join(settings.MEDIA_ROOT, name))
        s_name = name.split('.')[0]
        for ext in self.filetypes: # self.filetypes is tuple of extensions
            path = "%s.%s" % (s_name, ext)
            path = os.path.join(settings.MEDIA_ROOT, path) # added in var.2
            if self.exists(path):
                #print 'path exists: ', path
                #os.remove(os.path.join(settings.MEDIA_ROOT, path))
                print 'storage.get_availblablabla path ', path
                os.remove(path) # chenged for var.2
        return name
    
    def get_available_name(self, name):
        """
        Returns a filename that's free on the target storage system, and
        available for new content to be written to.
        """
        # If the filename already exists, remove it as if it was a true file system
        
        #print 'storage.get_available_name'
        dirname, filename = os.path.split(name)
        fileroot, fileext = os.path.splitext(filename)
        
        for ext in self.filetypes: # self.filetypes is tuple of extensions
            
            maybe_file = "%s.%s" % (fileroot, ext)
            path = os.path.join(settings.MEDIA_ROOT, dirname, maybe_file)
            if self.exists(path):
                #print 'trying to delete ', path
                os.remove(path)
                #print 'deleted ok.'
                 
        #print 'returning path: ', name 
        return name

def file_rename(instance, field_name, new_path):
    #print 'renaming... '
    storage = getattr(instance, field_name).storage
    old_file = getattr(instance, field_name)
    #print 'new_file_path :', new_path
    #print 'old_file :', old_file
    storage.save(new_path, storage.open(old_file))
    storage.delete(old_file)
    setattr(instance, field_name, new_path)
    instance.save()
    #print '..done'
        



# -----------------------------------------
#class SmartImage_wtf_duplicate():
#
#    def __init__(self, src_path=None, *args, **kwargs):
#        print 'utils'
#        if src_path:
#            self.src_path = src_path
#            self.image = pil.open(self.src_path)
#        else:
#            return None
#
#    def thumbnail(self, w, h):
#        self.__resize(w, h)
#    
#    def trim(self, w, h):
#        self.__trim(w, h)
#        self.__resize(w, h)
#
#    def crop(self, w, h, coords):
#        pass
#        
#    def save(self, path):
#        if os.path.exists(path):
#            os.remove(path)
#        self.image.save(path, self.image.format, quality=95)
#
#    def __resize(self, w, h):
#        self.image.thumbnail((w, h), pil.ANTIALIAS)
#        
#
#        
#    def __trim(self, w, h):
#        W, H = self.image.size
#        R = float(W) / float(H)
#        r = float(w) / float(h)
#        if R > r: # src is wider than dst
#            crop_height = H
#            crop_width = crop_height * r
#            x_offset = int((W - crop_width) / 2)
#            y_offset = 0
#            
#        else:  # src is higher than dst or they are both square
#            crop_width = W
#            crop_height = crop_width / r
#            x_offset = 0
#            y_offset = int((H - crop_height) / 3)
#
#        self.image = self.image.crop((x_offset, y_offset, x_offset+int(crop_width), y_offset+int(crop_height)))
#        # offsets are for cropping from center
#        print 'SmartImage.__trim() done'
#
#        
#    def __crop(self, coords=None):
#        print '__crop'
#
#        print 'SmartImage.crop() done'        
#        
# -----------------------------------------

        