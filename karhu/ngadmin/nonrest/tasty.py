from tastypie.resources import ModelResource, Resource
from tastypie.serializers import Serializer
from django.db.models import fields
from tastypie.authorization import Authorization, DjangoAuthorization
from tastypie import fields


from karhu.blog.models import Post
from karhu.music.models import Album, Song

from django.conf.urls import *  # for url() ?

'''
class PostSerializer(Serializer):
    class Meta:
        model = Post
        fields = ('id', 'date_created', 'id', 'title', 'intro', 'text')
'''        

class PostResource(ModelResource):
    class Meta:
        resource_name = 'post'
        queryset = Post.objects.all()
        allowed_methods = ['get', 'post', 'put',  'delete']
        #excludes = ['pk']
        serializer = Serializer(formats=['json'])
        always_return_data = True
        #authorization = Authorization()
        authorization = DjangoAuthorization()

class SongResource(ModelResource):        
    class Meta:
        resource_name = 'songs'
        queryset = Song.objects.all()
        allowed_methods = ['get', 'post', 'put', 'patch', 'delete']
        serializer = Serializer(formats=['json'])
        always_return_data = True
        authorization = DjangoAuthorization()    

class MultipartResource(object):
    def deserialize(self, request, data, format=None):
        if not format:
            format = request.META.get('CONTENT_TYPE', 'application/json')
        if format == 'application/x-www-form-urlencoded':
            return request.POST
        if format.startswith('multipart'):
            data = request.POST.copy()
            data.update(request.FILES)
            return data
        return super(MultipartResource, self).deserialize(request, data, format)


class AlbumResource(MultipartResource, ModelResource):
    songs = fields.ToManyField(SongResource, 'songs', null=True, blank=True, full=True)
    cover = fields.FileField(attribute="cover", null=True, blank=True)
    class Meta:
        #resource_name = 'music/album'
        resource_name = 'albums'
        queryset = Album.objects.all()
        allowed_methods = ['get', 'post', 'put', 'patch', 'delete']
        #excludes = ['pk']
        serializer = Serializer(formats=['json'])
        always_return_data = True
        authorization = DjangoAuthorization()
        
        
