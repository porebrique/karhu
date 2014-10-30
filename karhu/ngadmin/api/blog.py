from karhu.libs.bcm.utils.decorators import json_view 
from django.conf import settings
from time import sleep
#from .models import Album, Song, SongForm, AlbumForm
from karhu.blog.models import Post

#from karhu.libs.bcm.utils.tools import find_in_list
import json


@json_view
def blog(request, post_id=None):
    if request.method == 'GET':
        if post_id: 
            post = Post.objects.filter(pk=post_id).values()[0]
            return post
        else:
            posts = Post.objects.values('id', 'title', 'lead', 'text', 'date_created')
            posts = list(posts)
            return posts
    elif request.method == 'POST':
        if post_id:
            print 'updating existing post number', post_id
            P = json.loads(request.body)
            post = Post.objects.get(pk=post_id)
            post.title = P['title']
            post.lead = P['lead']
            post.text = P['text']
            post.save()
            return {'title': post.title, 'lead': post.lead, 'text': post.text}            
        else:
            print 'no post id, creating new post'
            P = request.POST
            P = json.loads(request.body)
            post = Post.objects.create(title=P['title'], lead=P['lead'], text=P['text'])
            post.save()
            return 'ok'
    elif request.method == 'DELETE':
        post = Post.objects.get(pk=post_id)
        post.delete()
        return 'ok'


