import os, sys, importlib
from django.conf import settings 
import default_site_config as default_config

from karhu.libs.bcm.utils.tools import merge_dicts



AVAILABLE_SITE_SETTINGS = ['ENABLED_APPS', 'GALLERY', 'LINEUP', 'MUSIC', 'MP3PLAYER']


def setup(): 
    
    BASE_DIR = os.path.normpath(os.path.dirname(__file__)) #So this file must rest in same folder as karhu.__init__
    sys.path.append(settings.BASE_DIR)
    
    # Creating SITE const in project's settings, populating it with karhu's default and then overriding with site settings, provided for project
    real_settings = importlib.import_module("site_config")
    settings.SITE = default_config
    for setting in AVAILABLE_SITE_SETTINGS:
        temp = merge_dicts(getattr(default_config, setting), getattr(real_settings, setting))
        setattr(settings.SITE, setting, temp)
    
    
    # Updating settings  
    
    settings.STATICFILES_DIRS = settings.STATICFILES_DIRS + (os.path.join(BASE_DIR, 'static', 'adminstatic'),)
    settings.TEMPLATE_DIRS = settings.TEMPLATE_DIRS + (
                                                       #BASE_DIR, 
                                                       os.path.join(BASE_DIR, 'templates'),
                                                       )
    settings.TEMPLATE_CONTEXT_PROCESSORS = settings.TEMPLATE_CONTEXT_PROCESSORS + (
        'django.core.context_processors.request',
        'karhu.libs.bcm.context_processors.enabled_apps',                                                             
    )
    
    settings.MIDDLEWARE_CLASSES = settings.MIDDLEWARE_CLASSES + (
                                                                 'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
                                                                 )
    
    apps = {}
    apps['required'] = (
                        'django.contrib.sites',     #c for pagelets
                        'django.contrib.flatpages', #c for pagelets
                        'karhu.libs.bcm',
                        'karhu.admin',
                     )
    
    

    apps['enabled'] = tuple('karhu.%s' % app for app in settings.SITE.ENABLED_APPS.keys() if settings.SITE.ENABLED_APPS[app]['enabled'])
    #print apps['enabled']
    settings.INSTALLED_APPS = settings.INSTALLED_APPS + apps['required'] + apps['enabled'] 


setup()


'''
Available apps are  (
             'karhu.blog',
             'karhu.lineup',
             'karhu.events',
             'karhu.gallery',
             'karhu.pagelets',
             'karhu.music',
         )
'''
