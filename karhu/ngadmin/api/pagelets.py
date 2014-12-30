from rest_framework import serializers, viewsets

from karhu.pagelets.models import Pagelet, Slot


class PageletSerializer(serializers.ModelSerializer):
#    slots = SlotSerializer(source='slots', many=True)
    slots = serializers.SerializerMethodField('get_slots')
    class Meta:
        model = Pagelet
        deep = 1
        fields = ['id', 'title', 'url', 'slots']
        #read_only_fields = ('slots', )
    
    def get_slots(self, object):
        slots = []
        for slot in object.slots.all():
            slots.append({
                    'id': slot.pk,
                    'title': slot.title
                })
        return slots
#    def __init__(self, *args, **kwargs):
#        super(PageletSerializer, self).__init__(args, kwargs)
#        self.slots = SlotSerializer(source='slots', many=True)
    

class PageletViewSet(viewsets.ModelViewSet):
    queryset = Pagelet.objects.all()
    serializer_class = PageletSerializer
    
class SlotSerializer(serializers.ModelSerializer):
    #pagelet = PageletSerializer(source='pagelet')
    pagelet = serializers.PrimaryKeyRelatedField(required=False)
    class Meta:
        model = Slot
        deep = 1
        fields = ('id', 'title', 'pagelet')

#PageletSerializer.slots = SlotSerializer(source='slots', many=True)
#print PageletSerializer.Meta.fields
#PageletSerializer.Meta.fields.append('slots')
#print PageletSerializer.Meta.fields

class SlotViewSet(viewsets.ModelViewSet):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    
    def put(self, request, pk, format=None):
        print 'PUT', request.DATA
        return Response({})