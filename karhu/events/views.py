import datetime
from django.db.models import Q
from karhu.libs.bcm.utils.decorators import render_to
from .models import Event



#@render_to('events/templates/feed.html')
@render_to('site/events/feed.html')
def feed(request, **kwargs):
    past = kwargs.get('past', False)
    print datetime.date.today()
    
    if past:
        events = Event.objects.filter(date__lt=datetime.date.today()).order_by('-date')
    else:
        events = Event.objects.filter(date__gte=datetime.date.today())
    
    
    return {'events': events, 'past': past}
#
#    used_years = events.dates('date', 'year')
#    used_months = events.dates('date', 'month')
#    #events = list(events.values())
#    
#    year_sorted_events = []    
#    
#    for year in used_years:
#        print 'y', year.year
#        this_year_events = {'year':year, 'months':[]}
#        for month in used_months:
#            print 'm'
#            this_month_events = {'month': month, 'events':[]}
#            print 1, year
#            evs = events.filter(date__year=year.year,  date__month=month.month)
#            print 2
#            this_month_events['events'] = evs
#            
#            if this_month_events['events']:
#                this_year_events['months'].append(this_month_events)
#        if this_year_events['months']:     
#            year_sorted_events.append(this_year_events)    
#
#    return {'year_sorted_events': year_sorted_events}

