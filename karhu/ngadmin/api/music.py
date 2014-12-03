from rest_framework import serializers, viewsets, parsers, status
from rest_framework.decorators import action, link, list_route, detail_route, renderer_classes
from rest_framework.renderers import JSONRenderer

from rest_framework.response import Response

from karhu.music.models import Album, Song


class SongSerializer(serializers.ModelSerializer):
    #album = AlbumSerializer(source='album')
    class Meta:
        model = Song
        fields = ('id', 'title', 'lyrics', 'album')
        read_only_fields = ('mp3', 'order')

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    
    
class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(source='songs', read_only=True)
    id = serializers.Field(source="pk")
    cover = serializers.Field(source='get_cover')
    class Meta:
        model = Album
        depth = 1
        fields = ('id', 'title', 'cover', 'songs')
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
        
        answer = AlbumSerializer(album).data
        answer = {'cover': album.get_cover()}
        answer = album.get_cover();
        return Response(answer)
    
    
