import os, sys, importlib
from django.conf import settings 
import default_site_config as default_config

from karhu.libs.bcm.utils.tools import merge_dicts



AVAILABLE_SITE_SETTINGS = ['ENABLED_APPS', 'GALLERY', 'LINEUP', 'MUSIC', 'MP3PLAYER']


def setup(): 
    
    #settings.APPEND_SLASH=False
    settings.USE_TZ = True
    
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
                                                       os.path.join(BASE_DIR, 'static'),
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
                        'django_filters',
        
                        'django.contrib.sites',     #c for pagelets
                        'django.contrib.flatpages', #c for pagelets
                        
                        
                        'rest_framework',
                        
                        'karhu.libs.bcm',
                        'karhu.admin',
                     )
    
    

    apps['enabled'] = tuple('karhu.%s' % app for app in settings.SITE.ENABLED_APPS.keys() if settings.SITE.ENABLED_APPS[app]['enabled'])
    #print apps['enabled']
    settings.INSTALLED_APPS = settings.INSTALLED_APPS + apps['required'] + apps['enabled'] 

    # not sure if itll stay here
    settings.REST_FRAMEWORK = {
        # Use Django's standard `django.contrib.auth` permissions,
        # or allow read-only access for unauthenticated users.
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
        ],
                               
        'DEFAULT_PARSER_CLASSES': (
            'rest_framework.parsers.JSONParser',
            
        ),
        
        'PAGINATE_BY': 2,                 # Default to 10
        #'PAGINATE_BY_PARAM': 'page_size',  # Allow client to override, using `?page_size=xxx`.
        #'MAX_PAGINATE_BY': 100,             # Maximum limit allowed when using `?page_size=xxx`.
        
       # 'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',)
                               
                               
    }



setup()


'''
Available apps are  (
             'karhu.ngadmin',
             'karhu.blog',
             'karhu.lineup',
             'karhu.events',
             'karhu.gallery',
             'karhu.pagelets',
             'karhu.music',
         )
'''
