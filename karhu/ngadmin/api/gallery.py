from rest_framework import serializers, viewsets, parsers
#from rest_framework.decorators import detail_route, list_route
from rest_framework import decorators
#from rest_framework.renderers import JSONRenderer

from rest_framework.response import Response
from karhu.gallery.models import Folder, Image
from karhu.ngadmin.api import utils

from rest_framework import filters


class ImageSerializer(serializers.ModelSerializer):
    #album = AlbumSerializer(source='album')
    urls = serializers.SerializerMethodField(method_name='get_image_urls')
    class Meta:
        model = Image
        fields = ('id', 'urls', 'order', 'folder')
    
    def get_image_urls(self, obj):
        urls = {
            'web': obj.image.web.url,
            'thumbnail': obj.image.thumbnail.url
        }
#        print 'image is ', obj.image.web.url
#        print '----', dir(obj.image)
        return urls

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('folder',)
    #parser_classes = (parsers.JSONParser,)
    
    @decorators.list_route(methods=['patch'])
    def migrate(self, request):
        folder_id = request.DATA['folder']
        images_ids = request.DATA['images']
        folder = Folder.objects.get(pk=folder_id)
        images = Image.objects.filter(id__in=images_ids)
        images.update(folder=folder)
        return Response({'status': 'success'})

        
class FolderSerializer(serializers.ModelSerializer):
#    images = ImageSerializer(source='images', read_only=True)
    cover = ImageSerializer(source='cover', read_only=True)  # dunno if it is correct
    id = serializers.ReadOnlyField(source="pk")
    size = serializers.SerializerMethodField(method_name='get_folder_size')
    cover = serializers.SerializerMethodField(method_name='get_folder_cover')
    
    class Meta:
        model = Folder
        depth = 1
        fields = ('id', 'title', 'status', 'order', 'description', 'size', 'cover')

    def get_folder_size(self, obj):
        return obj.images.count()
    
    def get_folder_cover(self, obj):
        if obj.cover:
            return {'url': obj.cover_url}
        else:
            return None
        
class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)
    
##    Doesnt make sense without 'images' field
#    def list11111111(self, request):
#        queryset = Folder.objects.all()
#        serializer = FolderSerializer(queryset, many=True)
##        request_type = request.GET.get('request_type', None)
##        if request_type == 'list':
##            imgs = serializer.fields.pop('images')
#
#        imgs = serializer.fields.pop('images')
#    
#        return Response(serializer.data)

    @decorators.detail_route(methods=['patch'])
    def set_cover(self, request, filename=None, format=None, pk=None):
        image_id = request.DATA['cover']
        image = Image.objects.get(pk=image_id)
        folder = self.queryset.get(pk=pk)
        folder.set_cover(image)
        serializer = FolderSerializer(folder)
        return Response(serializer.data)
        
    @decorators.detail_route(methods=['post'])
    def upload_image(self, request, filename=None, format=None, pk=None):
        file = request.FILES['file']
        folder = self.queryset.get(pk=pk)
        
        image = Image.objects.create(folder=folder)
        image.image = file
        image.save()
        
        serializer = ImageSerializer(image)
        return Response(serializer.data)
    
    

    
    