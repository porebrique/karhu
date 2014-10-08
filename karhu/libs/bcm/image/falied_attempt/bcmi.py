# -*- encoding: utf-8 -*- 


import os
import shutil

from settings import MEDIA_ROOT, MEDIA_URL

from libs.bcm.image.smartimage import SmartImage

# -----------------------------------------
#      BCMI
# -----------------------------------------
class BCMI:
    """
        Handles resized version of image.
    """
    
    # TODO: creating versions EACH save omg
    
    variants = []
    
    def __init__(self, *args, **kwargs):
        self.instance = kwargs['instance']
        self.opts = self.instance.BCMI_Options
        print 'creating bcmi, instance exists: ', self.instance_exists
        if self.instance_exists:
            self._populate()
            

            for size in self.opts.sizes:
                w = '%s_width' % size
                h = '%s_height' % size
                
                setattr(self, w, self.opts.sizes[size][0])
                setattr(self, h, self.opts.sizes[size][1])
            
        # also can take src filename without .ext as folder name - istead of just pk
        
        #self.create()
        
    @property
    def instance_exists(self):
        if self.instance.pk:
            return True
        else:
            return False
    @property
    def exists(self):
        
        self.src = getattr(self.instance, self.opts.image_field, None)
        if self.src and self.instance.pk:
            self.save_to = '%s/%s' % (self.opts.save_variants_to, self.instance.pk)
            return self.src
        else:
            return False 

    
    def _populate(self, force_creation=False):
        #print 'bcmi populate'
        self.variants = {}
        if self.exists:
            for size_name in self.opts.sizes.keys():
                variant = ImageVersion(bcmi=self, name=size_name, force_creation=force_creation)
                setattr(self, size_name, variant)
                self.variants[size_name] = variant
            
    
    def update(self):
        #print 'create from bcmi of instance ', self.instance
        #print 'src is ', self.src
        if self.exists:
            if self.variants:
#                for variant in self.variants.keys():
#                    self.variants[variant].create()
                for variant in self.variants.keys():
                    self.variants[variant].create()

            else:
                self._populate(True)

    def delete(self):
        #print 'delete from bcmi of instance ', self.instance
        #print 'bcmi.src is ', self.src
        
        if self.instance_exists:
            
            path = os.path.join(MEDIA_ROOT, self.save_to)
            path = os.path.normpath(path)
            #print 'and folder to b deleted is ', path
            if os.path.exists(path):
                shutil.rmtree(path)


# -----------------------------------------
#    
# -----------------------------------------


class ImageVersion:
    """
    Вариант изображения.
    Связывается с инстансом модели, содержащей ImageField, но не сразу, а через экземпляр класса BCMI
    
    Создаёт файл из исходника по заданному пути, отдаёт путь и урл на результат
    """

    
    def __init__(self, *args, **kwargs):

        self.name = kwargs['name']
        self.bcmi = kwargs['bcmi']
        #self.instance = self.bcmi.instance

        self.size = self.bcmi.opts.sizes.get(self.name)
        #self.size = [int(d) for d in self.size.split('x')]
        
        if kwargs.get('force_creation', False):
            self.create()
        
    
    @property
    def width(self):
        return self.size[0]

    @property
    def height(self):
        return self.size[1]

    
    def __unicode__(self):
        return self.__class__
    
    def create(self):
        #print 'creating version'
        if self.bcmi.src:
            image = SmartImage(self.bcmi.src.path)
            image.trim(self.width, self.height)
            dst = self.path
            folder = os.path.split(dst)[0]
            if not os.path.exists(folder):
                os.makedirs(folder)
            image.save(dst)

    def crop(self, selection):
        if self.bcmi.src:
            image = SmartImage(self.bcmi.src.path)
            image.crop(selection, self.width, self.height)
            image.save(self.path)
    
    def delete(self):
#        print 'deleting version, path is ', self.path
        path = self.path
        if os.path.exists(path):
            os.remove(path)

    
    def _get_path_or_url(self, what):
        #if self.bcmi.src:
        if self.bcmi.exists:
        
            filename, ext = os.path.splitext(os.path.split(self.bcmi.src.path)[1])
            self.filename = '%s_%s%s' % (filename, self.name, ext) 
            
            print 'for instance with pk ', self.bcmi.instance.pk
            if what == 'path':
                folder = os.path.join(MEDIA_ROOT, self.bcmi.save_to)
                p = os.path.join(folder, self.filename)
                p = os.path.normpath(p)
                
                #print 'get_path_or_url, path: ', p
            elif what == 'url':
                #print 'touching url'
                p = '%s%s/%s' % (MEDIA_URL, self.bcmi.save_to, self.filename)
                #print 'url for instance ', self.bcmi.instance
                #print 'while save_to is ', self.bcmi.save_to
                #print 'url is: ', p
            else:
                p = None
            return p
        else:
            return None
    
    @property 
    def path(self):
        return self._get_path_or_url('path')
    
    @property 
    def url(self):
        return self._get_path_or_url('url')

