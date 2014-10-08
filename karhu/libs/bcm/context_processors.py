from django.conf import settings

def enabled_apps(request):
    apps = settings.SITE.ENABLED_APPS
    return {'apps': apps}