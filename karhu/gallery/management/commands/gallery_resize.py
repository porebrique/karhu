from django.core.management.base import BaseCommand, CommandError
from karhu.gallery.models import Image


class Command(BaseCommand):
    help = 'Updates all thumbnails and other variants if their sizes are changed.'

    def handle(self, *args, **options):
        
        images = Image.objects.all()
        for image in images:
            #try:
            image.image.create_variants()
             
            #except:
            #    raise CommandError('Some errors with image "%s"' % image.pk)

        self.stdout.write('%s images resized.' % images.count())
