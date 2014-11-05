from karhu.libs.bcm.utils.decorators import json_view
from django.conf import settings
from time import sleep
from karhu.music.models import Album, Song, SongForm, AlbumForm

from karhu.libs.bcm.utils.tools import find_in_list
import json



@json_view
def albums(request, id=None):
    
    if request.method == 'GET':
        if id:
            album = Album.objects.get(pk=id)
            return flat_album(album)
        else:
            list_type = request.GET.get('type', None)
            albums = Album.objects.all()
            if list_type == 'short':
                response = [flat_album(album, False) for album in albums]
                
            else:
                response = [flat_album(album) for album in albums]
            return response
    elif request.method == 'POST':
        P = json.loads(request.body)
        
        if id:
            album = Album.objects.get(pk=id)
            album.title = P['title']
        else:
            album = Album.objects.create()
        album.save()
        return flat_album(album)
    elif request.method == 'DELETE':
        album = Album.objects.get(pk=id)
        album.delete()
        
@json_view
def songs(request, id=None, action=None):
    if request.method == 'GET':
        if id:
            song = Song.objects.get(pk=id)
            return flat_song(song)
        else:
            response = [flat_song(song) for song in Song.objects.all()]
            print 'got list, returning'
            print response
            return response
    elif request.method == 'POST':
        
        #file = request.FILES.get('file', None)
        POST = json.loads(request.body)
            
        album_id = POST.get('album', None).get('id', None)
        if album_id:
            album = Album.objects.get(pk=album_id)
            
        if id:
            song = Song.objects.get(pk=id)
        else:
            song = Song.objects.create(album=album)
            
        song.title = POST.get('title', None)
        song.lyrics = POST.get('lyrics', '')
        song.save()
        return flat_song(song)
    elif request.method == 'DELETE':
        song = Song.objects.get(pk=id)
        song.delete()

@json_view
def song_custom_action(request, id=None, action=None):
    
    song = Song.objects.get(pk=id)

    if action == 'clear_mp3':
        song.clear_mp3()
    elif action == 'upload_mp3':
        file = request.FILES.get('file', None)
        if file:
            song.mp3 = file
            song.save()
                
    return flat_song(song)

#         
# @json_view
# def upload_track(request, id=None):
#     
#     file = request.FILES.get('file')
#     print file
#     
#     song = Song.objects.get(pk=id)
#     print 'song before file', song, song.title, song.mp3
#     song.mp3 = file
#     song.save()
#     print 'song with file', song, song.title, song.mp3
#     #handle_uploaded_file(f)
#     return 'file uploaded'
#     

def handle_uploaded_file(f):
    with open('some/file/name.txt', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)    
                  
                
def flat_album(album, full_view=True):
    a = {
         'id': album.pk,
         'title': album.title
         }
    if full_view:
        a['songs'] = [flat_song(song) for song in album.songs.all()]
        a['order'] = album.order
        a['cover'] = {'thumbnail': {'url': None,
                                 'width': album.cover.thumbnail.width,
                                 'height': album.cover.thumbnail.height
                                 }
                   }
    return a
         

'''
  title = models.CharField(max_length=150, default="Track 1")
    album = models.ForeignKey(Album, related_name='songs', blank=True)
    mp3 = models.FileField(upload_to=get_song_path, storage=OverwriteStorage(filetypes=('mp3',)), blank=True)
    lyrics = models.TextField(blank=True)
    order
    
'''

def flat_song(song):
    print 'song:', song.title
    s = {
        'id': song.pk,
        'title': song.title,
        'lyrics': song.lyrics,
        'order': song.order
         }
    if song.mp3:
        s['mp3'] = song.mp3.url
    if song.album:
        s['album'] =  {'id': song.album.pk, 'title': song.album.title}
    return s
