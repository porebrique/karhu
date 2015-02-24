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
      
#height	281
#width	215
#x1	165
#x2	380
#y1	71
#y2	352        
#@json_view
#def crop_post(request, object, field, version):
#    form = CropForm(request.POST, object=object)
#    
#    if form.is_valid():
#        #print form.cleaned_data
#        selection = {}
#        for key in form.cleaned_data.keys():
#            selection[key] = int(form.cleaned_data[key])
#             
#        version.crop(selection=selection)
#        return {'result': 'ok'}
#    


#    def crop(self, dst_width, dst_height, selection=None):
#        o = self._overflows(dst_width, dst_height)
#        if o:
#            if o == 2 and selection:
#                print 'cropping, overflows both'
#                self.__crop(selection)
#                self.__resize(dst_width, dst_height)
#            else:
#                print 'cropping halted, trimming'
#                self.__trim(dst_width, dst_height)
#                self.__resize(dst_width, dst_height)
        
    
#@csrf_exempt
#def crop_view(request, model, object_id, field_name, variant_name):
#    
#    object = model.objects.get(pk=object_id)
#    field = getattr(object, field_name)
#    version = getattr(field, variant_name)
#    width = version.width
#    height = version.height
#    source_image = field
#    
#    if request.method == 'POST':
#        return crop_post(request, object, field, version)
#        
#    else:
#        return crop_get(request, object, width, height, source_image)
#    
