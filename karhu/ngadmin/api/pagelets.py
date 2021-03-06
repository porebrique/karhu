from rest_framework import serializers, viewsets
from karhu.pagelets.models import Pagelet, Slot


class PageletSerializer(serializers.ModelSerializer):
#    slots = SlotSerializer(source='slots', many=True)
    slots = serializers.SerializerMethodField()
    class Meta:
        model = Pagelet
        deep = 1
        fields = ['id', 'title', 'url', 'slots', 'content']
    
    def get_slots(self, object):
        slots = []
        for slot in object.slots.all():
            slots.append({
                    'id': slot.pk,
                    'title': slot.title
                })
        return slots

class PageletViewSet(viewsets.ModelViewSet):
    queryset = Pagelet.objects.all()
    serializer_class = PageletSerializer
    
class SlotSerializer(serializers.ModelSerializer):
#    pagelet = serializers.PrimaryKeyRelatedField(required=False, queryset=Pagelet.objects.all())
    pagelet = serializers.PrimaryKeyRelatedField(allow_null=True, required=False, queryset=Pagelet.objects.all())
    class Meta:
        model = Slot
        deep = 1
        fields = ('id', 'title', 'pagelet')

class SlotViewSet(viewsets.ModelViewSet):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    
    def put(self, request, pk, format=None):
        print 'PUT', request.DATA
        return Response({})