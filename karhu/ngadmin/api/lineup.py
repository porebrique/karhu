from rest_framework import serializers, viewsets, parsers, decorators
from rest_framework.response import Response
from rest_framework import filters

from karhu.lineup.models import Person, Note, Topic
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
    
    photo = serializers.SerializerMethodField('get_crop_info', read_only=True)
    
    #model has property portrait_url
    class Meta:
        model = Person
        fields = ('id', 'name', 'role', 'order', 'photo')
#        read_only_fields = ('photo',)
        
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
        
    def get_crop_info(self, obj):
        return utils.get_image_info(obj.photo, ['thumbnail'])
    
        
class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer   

    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)
    
    @decorators.detail_route(methods=['patch'])
    def upload_photo(self, request, filename=None, format=None, pk= None):
        file = request.FILES['file']
        person = self.queryset.get(pk=pk)
        person.photo = file
        person.save()
        answer = PersonSerializer(person).data
        #answer = utils.build_absolute_url(person.photo)
#        answer = person.portrait_url
        return Response(answer)
    
    @decorators.detail_route(methods=['patch'])
    def crop_photo(self, request, pk=None):
        selection = request.DATA['selection']
        person = self.queryset.get(pk=pk)
        version = person.photo.thumbnail
        version.crop(selection=selection)
        answer = 'cropped'
        return Response(answer);
