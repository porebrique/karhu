from rest_framework import serializers, viewsets, parsers, decorators
from rest_framework.response import Response

from karhu.music.models import Album, Song
from karhu.ngadmin.api import utils
from time import sleep

class SongSerializer(serializers.ModelSerializer):
    #album = AlbumSerializer(source='album')
    album = serializers.PrimaryKeyRelatedField(queryset=Album.objects.all())
    class Meta:
        model = Song
        depth = 1
        fields = ('id', 'title', 'lyrics', 'album', 'mp3', 'order')
        read_only_fields = ('order', 'mp3')

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)
    
    @decorators.detail_route(methods=['patch'])
    def clear_mp3(self, request, filename=None, format=None, pk=None):
        
        song = self.queryset.get(pk=pk)
        song.clear_mp3()
        song.save()
        return Response('mp3 removed.')    
    
    @decorators.detail_route(methods=['patch'])
    def upload_mp3(self, request, filename=None, format=None, pk=None):
        file = request.FILES['file']
        
        song = self.queryset.get(pk=pk)
        print 'song.mp3 BEFORE', song.mp3
        song.mp3 = file
        song.save()
        print 'song', song
        print 'song.mp3', song.mp3
        #answer = utils.build_absolute_url(album.cover)
        #answer = SongSerializer(song).data
        answer = utils.build_absolute_url(song.mp3)
        return Response(answer)    
    
    
class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(read_only=True, many=True)
    id = serializers.ReadOnlyField(source="pk")
#    cover = serializers.ReadOnlyField(source='get_cover')
    cover = serializers.SerializerMethodField()
    class Meta:
        model = Album
        depth = 1
        fields = ('id', 'title', 'cover', 'songs', 'order')
        #read_only_fields = ('songs',)
    
    def get_cover(self, obj):
        return utils.get_image_info(obj.cover, ['thumbnail'])
#    def cover(self, obj):
#        return obj.get_cover()

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)


    @decorators.detail_route(methods=['patch'])
    def upload_cover(self, request, filename=None, format=None, pk=None):
        file = request.FILES['file']
        album = self.queryset.get(pk=pk)
        album.cover = file
        album.save()
        answer = utils.build_absolute_url(album.cover)
        sleep(2) # I know that is dumb, but sometime cover thumbnail is not ready when requested by frontend 
        return Response(answer)
    
    @decorators.detail_route(methods=['patch'])
    def crop_cover(self, request, pk=None):
        selection = request.DATA['selection']
        album = self.queryset.get(pk=pk)
        version = album.cover.thumbnail
        version.crop(selection=selection)
        answer = 'cropped'
        return Response(answer);    

    @decorators.detail_route(methods=['patch'])
    def clear_cover(self, request, filename=None, format=None, pk=None):    
        album = self.queryset.get(pk=pk)
        album.clear_cover()
        answer = 'cover removed'
        return Response(answer)