# -*- encoding: utf-8 -*-
from django.db import models


class Event(models.Model):
    #date = models.DateField()
    date = models.DateTimeField(verbose_name="Дата")
    title = models.CharField(max_length=300, blank=True, verbose_name="Название")
    place = models.CharField(max_length=300, blank=True, verbose_name="Место")
    info = models.TextField(blank=True, verbose_name="Дополнительная информация")
    
    class Meta:
        ordering = ('date',)
    

    def __unicode__(self):
        s = self.date.strftime('%d.%m.%Y')
        if self.title:
            s = '%s %s' % (s, self.title)
        return s