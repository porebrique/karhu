from django.conf  import settings
def build_absolute_url(url):
    url = '%s%s' % (settings.MEDIA_URL, url)
    print 'url is', url
    return url