# -*- encoding:utf-8 -*-

ENABLED_APPS = {
                'lineup': {
                           'enabled': True,
                           'menu_name': 'Band',
                           'full_name': 'Current Lineup'
                           },
                'music': {
                           'enabled': True,
                           'menu_name': u'Music',
                           'full_name': u'Music'
                           },
                'gallery': {
                           'enabled': True,
                           'menu_name': u'Galleries',
                           'full_name': u'All galleries'
                           },
                'events': {
                           'enabled': True,
                           'menu_name': u'Gigs',
                           'full_name': u'Upcoming and past events'
                           },
                'blog': {
                           'enabled': True,
                           'menu_name': u'News',
                           'full_name': u'News'
                           },
                'pagelets': {
                           'enabled': True,
                           'menu_name': u'Страницы',
                           'full_name': u'Страницы'
                           }                           
                }

               
GALLERY = {
           'images_folder': 'gallery/images',
           'covers_folder': 'cache/gallery/covers',
           'cache_folder': 'cache/gallery/images',
           'cover_width': 200,
           'cover_height': 300,
           'web_width': 1000,
           'web_height': 750,
           'thumbnail_width': 150,
           'thumbnail_height': 150
           }    

LINEUP = {
           'web_width': 800,
           'web_height': 600,
           'thumbnail_width': 130,
           'thumbnail_height': 170
           } 
   
MUSIC = {
           'web_width': 800,
           'web_height': 800,
           'thumbnail_width': 200,
           'thumbnail_height': 200
           }      


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





