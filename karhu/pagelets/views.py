
from django.db.models import Count
from karhu.libs.bcm.utils.decorators import render_to, user_is
from karhu.libs.bcm.utils.tools import find_in_list
from .models import Slot, Pagelet


@user_is('staff')
@render_to('admin/pagelets/feed.html')
def slots_and_pagelets(request):

    pagelets = Pagelet.objects \
                    .annotate(slots_count=Count('slots')) \
                    .order_by('-slots_count').values()
                    
    slots = Slot.objects.select_related('pagelet')
    
    sv = slots.values()
    for p in pagelets:
        p['slots'] = find_in_list(sv, 'pagelet_id', p['id'])
        
    return {'pagelets': pagelets, 'slots': slots}
