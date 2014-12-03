from rest_framework import serializers, viewsets, parsers, status
from rest_framework.decorators import action, link, list_route, detail_route, renderer_classes
from rest_framework.renderers import JSONRenderer

from rest_framework.response import Response

from karhu.lineup.models import Person, Note, Topic

from rest_framework import filters
#import django_filters
'''
class NoteFilter(django_filters.FilterSet):
    #min_price = django_filters.NumberFilter(name="price", lookup_type='gte')
    #max_price = django_filters.NumberFilter(name="price", lookup_type='lte')
    person = django_filters.NumberFilter(name='person', lookup_type='equals')
    class Meta:
        model = Note
        #fields = ['category', 'in_stock', 'min_price', 'max_price']
        fields = ['person']
'''
class NoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = ('id', 'text', 'topic', 'person')

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    #filter_class = NoteFilter
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('id', 'text', 'topic', 'person')     
    #lookup_fields = ('person')        
    #lookup_field = "ocompra__folio"
        
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'title')

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
        

class PersonSerializer(serializers.ModelSerializer):
    #photo = serializers.FileField(source='portrait_url',  default='') #mb add .get_photo method to model
    
    photo = serializers.SerializerMethodField('get_photo_url')
    #notes = serializers.SerializerMethodField('get_notepack')
    class Meta:
        model = Person
        fields = ('id', 'name', 'role', 'order', 'photo')
        #read_only_fields = ('photo',)
        
    def get_queryset(self):
        request_type = self.request.QUERY_PARAMS.get('request_type', None)
        print 'type is', request_type
        queryset = Person.objects.all
        return queryset

    def get_notepack(self, obj):
        if obj.notes:
            pack = []
            print 'Persons notes:', obj.notes
            for note in obj.notes.all():
                note = {
                        'id': note.pk,
                        'topic': {'title': note.topic.title, 'id': note.topic.pk},
                        'text': note.text
                }
                pack.append(note)
            return pack       
        
    
    def get_photo_url(self, obj):
        if obj.photo:
            #print 'obj.photo', obj.photo, type(obj.photo)
            return self.context['request'].build_absolute_uri(obj.photo.thumbnail.url)    
        else:
            #print 'no photo'
            return None
            
        
class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    
'''    
    
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
    
    
'''