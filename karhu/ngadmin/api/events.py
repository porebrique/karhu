from rest_framework import serializers, viewsets, parsers
from rest_framework.decorators import detail_route
#from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from karhu.events.models import Event
from rest_framework import filters
from karhu.ngadmin.api import utils

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'date', 'title', 'place', 'info')
        
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer