from .models import SongForm
from karhu.libs.bcm.utils.decorators import render_to, user_is
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

@user_is('staff')
@render_to('admin/music/song.html')
def add_song(request,  *args, **kwargs):
    if request.method == 'POST':
        form = SongForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('admin-music-feed'))
    else:
        album = request.GET.get('album', None)
        form = SongForm(initial={'album': album})
    result = {'form': form}
    return result    
