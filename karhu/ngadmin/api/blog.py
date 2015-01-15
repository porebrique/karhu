from rest_framework import serializers, viewsets
from rest_framework import pagination

from karhu.blog.models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'lead', 'text', 'date_created')

class PaginatedPostSerializer(pagination.PaginationSerializer):
    """
    Serializes page objects of user querysets.
    """
    class Meta:
        object_serializer_class = PostSerializer        
        
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    paginator = PaginatedPostSerializer(queryset)
    paginate_by = 5
    #paginate_by_param = 'page_size'
    #max_paginate_by = 100    
    
