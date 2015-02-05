from rest_framework import serializers, viewsets, parsers, decorators

from rest_framework.response import Response
from karhu.gallery.models import Folder, Image
from karhu.ngadmin.api import utils

from rest_framework import filters
from time import sleep

class ImageSerializer(serializers.ModelSerializer):
    #album = AlbumSerializer(source='album')
    urls = serializers.SerializerMethodField(method_name='get_image_urls')
    class Meta:
        model = Image
        fields = ('id', 'urls', 'order', 'folder')
    
    def get_image_urls(self, obj):
        return utils.get_image_info(obj.image, ['web', 'thumbnail']) 
    
#    def get_image_urls(self, obj):
#        urls = {
#            'web': obj.image.web.url,
#            'thumbnail': obj.image.thumbnail.url
#        }
#        print 'image is ', obj.image.web.url
#        print '----', dir(obj.image)
#        return urls

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('folder',)
    
    @decorators.list_route(methods=['patch'])
    def set_order(self, request):
        sleep(1)
        request = request.DATA
        for img_data in request:
            image = Image.objects.get(pk=img_data['id'])
            image.order = img_data['order']
            image.save()
        return Response({'status': 'success'})
    
    @decorators.list_route(methods=['patch'])
    def migrate(self, request):
        folder_id = request.DATA['folder']
        images_ids = request.DATA['images']
        folder = Folder.objects.get(pk=folder_id)
        images = Image.objects.filter(id__in=images_ids)
        images.update(folder=folder)
        return Response({'status': 'success'})
    
    @decorators.detail_route(methods=['patch'])
    def crop(self, request, pk=None):
        selection = request.DATA['selection']
        image = self.queryset.get(pk=pk)
        version = image.image.thumbnail
        version.crop(selection=selection)
        answer = 'cropped'
        return Response(answer);
        
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
            return {'source': {'url': obj.cover.image.url},
                    'thumbnail': {'width': obj.cover_width, 
                                  'height': obj.cover_height,
                                   'url': obj.cover_url}
                   }
        else:
            return None
#    def get_folder_cover(self, obj):
#        if obj.cover:
#            return utils.get_image_info(obj.cover.image, ['thumbnail'])
#        else:
#            return None        
        
class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)
    
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
    
    @decorators.detail_route(methods=['patch'])
    def crop_cover(self, request, pk=None):
        selection = request.DATA['selection']
        folder = self.queryset.get(pk=pk)
        folder.create_cover(selection=selection)
        answer = 'gallery cover cropped'
        return Response(answer);      

    
    