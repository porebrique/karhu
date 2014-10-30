from karhu.libs.bcm.utils.decorators import json_view, render_to, user_is
from django.conf import settings
from time import sleep
#from .models import Album, Song, SongForm, AlbumForm
from karhu.blog.models import Post
from karhu.lineup.models import Person, Topic, Note

from karhu.libs.bcm.utils.tools import find_in_list
import json



@json_view
def config(request): 
    enabled_apps = settings.SITE.ENABLED_APPS
    #sleep(3)
    config = {
              'apps': settings.SITE.ENABLED_APPS,
              'music': settings.SITE.MUSIC,
              'lineup': settings.SITE.LINEUP,
              'gallery': settings.SITE.GALLERY,
              'mp3player': settings.SITE.MP3PLAYER
              }
    return config


# just copypasta to learn
'''

MP3PLAYER =  {'common': {'textcolor': 939393,
                          'bgcolor1': 'd6d6d6',
                          'bgcolor2': '898989',
                          'slidercolor1': 939393,
                          'slidercolor2': '4f4f5e',
                          'buttoncolor': '4f4f5e'
                          },
              
              'multi': {  
                          'playlistcolor': 'ffffff',
                          'playlistalpha': 70,
                          'currentmp3color': 000,
                          'width': 200,
                          'height': 100
                        },
              
              'single': { 
                         'width': 150,
                         'height':20
                }
            }



def _player(skin, mode, mp3_or_playlist, width, height):
    if skin == 'site':
        options = settings.SITE.MP3PLAYER
    elif skin == 'admin':
        options = settings.SITE.MP3PLAYER
    result = options['common']
    result.update(options[mode])
    
    if mode == 'single':  # mode must be 'single' or 'multi' only
        result['mp3'] = mp3_or_playlist
    elif mode == 'multi':
        result['mp3'] = mp3_or_playlist['urls']
        result['title'] = mp3_or_playlist['titles']

    result['width'] = width or options['single']['width']
    result['height'] = height or options['single']['height']
        
    options = ['%s=%s'%(key, result[key]) for key in result.keys()]
    options = '&'.join(options)
    print 'mp3', options
    return {'options': options, 'width': result['width'], 'height': result['height'], 'mode': mode}   
'''
