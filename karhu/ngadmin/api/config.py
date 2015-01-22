from karhu.libs.bcm.utils.decorators import json_view
from django.conf import settings


from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

#from rest_framework.decorators import action, link
from rest_framework import decorators

from karhu.blog.models import Post


class ReadOnly(permissions.BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """
    def has_permission(self, request, view):
        return request.method in ['GET', 'OPTIONS', 'HEAD']


class Config(): 
    
    def __init__(self, *args, **kw):
        # Initialize any variables you need from the input you get
        pass

    def get(self):
        # Do some calculations here
        # returns a tuple ((1,2,3, ), (4,5,6,))
        enabled_apps = settings.SITE.ENABLED_APPS
        #sleep(3)
        config = {
                  'apps': settings.SITE.ENABLED_APPS,
                  'music': settings.SITE.MUSIC,
                  'lineup': settings.SITE.LINEUP,
                  'gallery': settings.SITE.GALLERY,
                  'mp3player': settings.SITE.MP3PLAYER
                  }
        return config




#class ConfigViewSet(viewsets.ViewSet):
class ConfigViewSet(viewsets.ViewSet):
    #queryset = Post.objects.none()
    
    permission_classes = (ReadOnly)
    
    
    @decorators.link()
    def get(self, request, *args, **kw):
        config = Config()
        result = config.get()
        response = Response(result, status=status.HTTP_200_OK)
        return response    


class ConfigView(APIView):
    permission_classes = [ReadOnly]

    def get(self, request, *args, **kw):
        config = Config()
        result = config.get()
        response = Response(result, status=status.HTTP_200_OK)
        
        return response



# just copypasta to learn
'''

MP3PLAYER =  {'common': {'textcolor': 939393,
                          'bgcolor1': 'd6d6d6',
                          'bgcolor2': '898989',
                          'slidercolor1': 939393,
                          'slidercolor2': '4f4f5e',
                          'buttoncolor': '4f4f5e'
                          },
              
              'multi': {  
                          'playlistcolor': 'ffffff',
                          'playlistalpha': 70,
                          'currentmp3color': 000,
                          'width': 200,
                          'height': 100
                        },
              
              'single': { 
                         'width': 150,
                         'height':20
                }
            }



def _player(skin, mode, mp3_or_playlist, width, height):
    if skin == 'site':
        options = settings.SITE.MP3PLAYER
    elif skin == 'admin':
        options = settings.SITE.MP3PLAYER
    result = options['common']
    result.update(options[mode])
    
    if mode == 'single':  # mode must be 'single' or 'multi' only
        result['mp3'] = mp3_or_playlist
    elif mode == 'multi':
        result['mp3'] = mp3_or_playlist['urls']
        result['title'] = mp3_or_playlist['titles']

    result['width'] = width or options['single']['width']
    result['height'] = height or options['single']['height']
        
    options = ['%s=%s'%(key, result[key]) for key in result.keys()]
    options = '&'.join(options)
    print 'mp3', options
    return {'options': options, 'width': result['width'], 'height': result['height'], 'mode': mode}   
'''
