from rest_framework import serializers, viewsets, parsers
from rest_framework.decorators import detail_route
#from rest_framework.renderers import JSONRenderer

from rest_framework.response import Response

from karhu.lineup.models import Person, Note, Topic

from rest_framework import filters

from karhu.ngadmin.api import utils

class NoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = ('id', 'text', 'topic', 'person')

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('id', 'text', 'topic', 'person')     
        
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'title')

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
        

class PersonSerializer(serializers.ModelSerializer):
    
    #photo = serializers.SerializerMethodField('portrait_url')
    photo = serializers.Field(source='portrait_url')
    #model has property portrait_url
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
        
    
    def portrait_url(self, obj):
        return obj.portrait_url
        '''
        req = self.context.get('request')
        if obj.photo:
            return req.build_absolute_uri(obj.photo.thumbnail.url)    
        else:
            #print 'no photo'
            return None
        '''
            
        
class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)
    
    @detail_route(methods=['patch'])
    def upload_photo(self, request, filename=None, format=None, pk= None):
        file = request.FILES['file']
        person = self.queryset.get(pk=pk)
        person.photo = file
        person.save()
        
        #answer = utils.build_absolute_url(person.photo)
        answer = person.portrait_url
        return Response(answer)