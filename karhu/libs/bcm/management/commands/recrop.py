from django.core.management.base import BaseCommand, CommandError
from karhu.gallery.models import Image


class Command(BaseCommand):
    #args = '<poll_id poll_id ...>'
    help = 'Updates all thumbnails and other variants if their sizes are changed.'

    def handle(self, model, field, *args, **options):
        print model
        objects = model.objects.all()
        
        print objects
        return None
        for objects in objects:
            #try:
            
            getattr(object, field).create_variants()
             
            #except:
            #    raise CommandError('Some errors with image "%s"' % image.pk)

        self.stdout.write('%s images resized.' % objects.count())
