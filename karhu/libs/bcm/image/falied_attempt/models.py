# -*- encoding:utf-8 -*-



from django.db.models import Model, manager
from django.db.models.base import ModelBase

from django.db.models import signals
from django.dispatch import receiver


from libs.bcm.image.bcmi import BCMI

# -----------------------------------------
#      Manager
# -----------------------------------------

class CustomManager(manager.Manager):

    def contribute_to_class(self, model, name):
        super(CustomManager, self).contribute_to_class(model, name)
        signals.class_prepared.connect(mass_connect, sender=model)


def mass_connect(sender, **kwargs):
    signals.pre_save.connect(bcmi_delete, sender=sender)
    signals.post_save.connect(bcmi_create, sender=sender)
    signals.pre_delete.connect(bcmi_delete, sender=sender)
    
def bcmi_create(instance, sender, created,  **kwargs):
    print 'bcmi post-save'
    instance.bcmi.update()
    if created:
        print 'instance created, pk is ', instance.pk

def bcmi_delete(instance, sender, **kwargs):
    instance.bcmi.delete()

# -----------------------------------------
#        Model
# -----------------------------------------

class ImageModel(Model):
    """
        Simply adds 'bcmi' object to derived Model, which has BCMI_Options class.
    """
    
    # modes: fit, trim, crop. isnt crop just a case of trim with x-y-offsets?
    
    objects = CustomManager()
    
    class DefaultOpts:
        #image_field = 'photo'
        path_template = ''
        sizes = {
                 'thumbnail': '100x100', 
                 'web': '800x600'
                 }

    class Meta:
        abstract = True
    

    def __init__(self, *args, **kwargs):
        super(ImageModel, self).__init__(*args, **kwargs)
        self.bcmi = BCMI(opts=self.BCMI_Options, instance=self)
        
        
