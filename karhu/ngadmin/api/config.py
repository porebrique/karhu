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
    
    
    #@decorators.link()
    #decorators.detail_route(methods=['get'])
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


