# -*- encoding:utf-8 -*-
from django.db import models
#import datetime

    
class Post(models.Model):
    title = models.CharField(max_length=200)
    lead = models.TextField(max_length=500, blank=True)
    text = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    # NB: auto_now_add makes input not editable
    
    class Meta:
        ordering = ('-date_created',)
    
    def __unicode__(self):
        date = self.date_created.strftime('%d.%m.%Y')
        s = '%s: %s' % (date, self.title or u'Безымянная запись')
        return s    

