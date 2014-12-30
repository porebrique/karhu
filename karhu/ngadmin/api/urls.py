from django.conf.urls import url, include
from rest_framework import routers


from karhu.ngadmin.api.blog import PostViewSet
from karhu.ngadmin.api.users import UserViewSet
from karhu.ngadmin.api.music import AlbumViewSet, SongViewSet
from karhu.ngadmin.api.lineup import PersonViewSet, TopicViewSet, NoteViewSet
from karhu.ngadmin.api.gallery import FolderViewSet, ImageViewSet
from karhu.ngadmin.api.pagelets import PageletViewSet, SlotViewSet
from karhu.ngadmin.api.events import EventViewSet

from karhu.ngadmin.api.config import ConfigView


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'blog/posts', PostViewSet)
router.register(r'music/albums', AlbumViewSet)
router.register(r'music/songs', SongViewSet)
router.register(r'lineup/people', PersonViewSet)
router.register(r'lineup/topics', TopicViewSet)
router.register(r'lineup/notes', NoteViewSet)
router.register(r'gallery/folders', FolderViewSet)
router.register(r'gallery/images', ImageViewSet)
router.register(r'pagelets', PageletViewSet)
router.register(r'slots', SlotViewSet)
router.register(r'events', EventViewSet)
#router.register(r'config', ConfigView, base_name="config")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = [
    
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    url(r'^config/$', ConfigView.as_view(), name='config'),
    url(r'^config$', ConfigView.as_view(), name='config'),
    
    url(r'^', include(router.urls)),
    
]