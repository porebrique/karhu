from rest_framework import serializers, viewsets, parsers
from rest_framework.decorators import detail_route
#from rest_framework.renderers import JSONRenderer

from rest_framework.response import Response

from karhu.music.models import Album, Song

from karhu.ngadmin.api import utils

class SongSerializer(serializers.ModelSerializer):
    #album = AlbumSerializer(source='album')
    album = serializers.PrimaryKeyRelatedField()
    class Meta:
        model = Song
        depth = 1
        fields = ('id', 'title', 'lyrics', 'album', 'mp3', 'order')
        read_only_fields = ('order',)

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)
    
    @detail_route(methods=['patch'])
    def clear_mp3(self, request, filename=None, format=None, pk=None):
        
        song = self.queryset.get(pk=pk)
        song.clear_mp3()
        song.save()
        return Response('mp3 removed.')    
    
    @detail_route(methods=['patch'])
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
    songs = SongSerializer(source='songs', read_only=True)
    id = serializers.Field(source="pk")
    cover = serializers.Field(source='get_cover')
    class Meta:
        model = Album
        depth = 1
        fields = ('id', 'title', 'cover', 'songs', 'order')
        #read_only_fields = ('songs',)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)


    @detail_route(methods=['patch'])
    def upload_cover(self, request, filename=None, format=None, pk=None):
        file = request.FILES['file']
        album = self.queryset.get(pk=pk)
        album.cover = file
        album.save()
        answer = utils.build_absolute_url(album.cover)
        return Response(answer)
    
    
