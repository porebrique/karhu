import time
from django.conf  import settings

def randomizeUrl(url):
    return '%s?%f' % (url, time.time())

def build_absolute_url(url):
    url = '%s%s' % (settings.MEDIA_URL, url)
    print 'url is', url
    return url



def get_image_info(image, fields):
    
    if not image:
#        print 'no image'
        return None
    try:
#        print 'getting images'
#        print 'image is', image
#        print 'image.width is', image.width
#        print 'thumbnl is', image.thumbnail
#        print 'th width is', image.thumbnail.width
        info = {
            'source': {
                'url': randomizeUrl(image.url),
                'width': image.width,
                'height': image.height
            }
        }
        for field in fields:
            variant = getattr(image, field)
            info[field] = {
                'url': randomizeUrl(variant.url),
                'height': variant.height,
                'width': variant.width
            }
    except IOError:
        info = {
            'errors': [
                {'code': 505, 'detail': "File not found, try to upload again"}
            ]
        }

    return info