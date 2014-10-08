from django.contrib import admin
from django.db import models
from .models import Post




    
class PostAdmin(admin.ModelAdmin):
    model = Post

admin.site.register(Post, PostAdmin)    

print 'admin'