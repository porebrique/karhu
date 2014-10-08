# -*- encoding:utf-8 -*-

import os

try:
    from PIL import Image as pil
except ImportError:
    import Image as pil    



class SmartImage():
    
    """
    Картиночный класс, который умеет себя по-всякому ресайзить.
    Может использоваться отдельно.
    Желает PIL.
    """

    def __init__(self, src_path=None, *args, **kwargs):
        if src_path:
            self.src_path = src_path
            self.image = pil.open(self.src_path)
        else:

            return None

    @property
    def width(self):
        return self.image.size[0]

    @property
    def height(self):
        return self.image.size[1]

    def _overflows(self, w, h):
        ow = self.width > w
        oh = self.height > h
        if ow or oh :
            if ow and oh:
                return 2
            else:
                return 1
        else:
            return False
            
    def thumbnail(self, w, h):
        self.__resize(w, h)
    
    def fit(self, w, h):
        self.__resize(w, h)
    
       
    def trim(self, w, h):
        # Source's smaller side is resized to wanted size. 
        # All that dont fit is cut off.
        o = self._overflows(w, h)
        if o:
            self.__trim(w, h)
            self.__resize(w, h)

    def crop(self, dst_width, dst_height, selection=None):
        o = self._overflows(dst_width, dst_height)
        if o:
            if o == 2 and selection:
                print 'cropping, overflows both'
                self.__crop(selection)
                self.__resize(dst_width, dst_height)
            else:
                print 'cropping halted, trimming'
                self.__trim(dst_width, dst_height)
                self.__resize(dst_width, dst_height)
                
    def save(self, path, overwrite=True):
        if overwrite and os.path.exists(path):
            os.remove(path)
        folder = os.path.split(path)[0]
        if not os.path.exists(folder):
            #print 'folder not exists, creating'
            os.makedirs(folder)        
        self.image.save(path, self.image.format, quality=95)
        

    def __resize(self, w, h):
        self.image.thumbnail((w, h), pil.ANTIALIAS)
        

    def __trim(self, w, h):
        W, H = self.image.size
        R = float(W) / float(H)
        r = float(w) / float(h)
        if R > r: # src is wider than dst
            crop_height = H
            crop_width = crop_height * r
            x_offset = int((W - crop_width) / 2)
            y_offset = 0
        else:  # src is higher than dst or they are both square
            crop_width = W
            crop_height = crop_width / r
            x_offset = 0
            y_offset = int((H - crop_height) / 3)

        self.image = self.image.crop((x_offset, y_offset, x_offset+int(crop_width), y_offset+int(crop_height)))
        # offsets are for cropping from center

        
    def __crop(self, selection):
        s = selection
        #self.image = self.image.crop((s['x1'], s['y1'], s['x2'], s['y2']))
        self.image = self.image.crop((s['x1'], s['y1'], s['x1']+s['width'], s['y1']+s['height']))
# -----------------------------------------
        
