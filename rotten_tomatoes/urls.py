from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'rotten_tomatoes.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'tomatoes.views.home', name='home'),
    url(r'^new_movie/$', 'tomatoes.views.new_movie', name='new_movie'),
    url(r'^small_new_movie/$', 'tomatoes.views.small_new_movie', name='small_new_movie'),
    url(r'^new_movie/(?P<new_movie_id>\d+)/$', 'tomatoes.views.new_movie_info', name='new_movie_info'),
    url(r'^favorite_movie/$', 'tomatoes.views.favorite_movie', name='favorite_movie'),
    url(r'^remove_movie/$', 'tomatoes.views.remove_movie', name='remove_movie'),
    url(r'^tinder/$', 'tomatoes.views.tinder', name='tinder'),
    url(r'^theater/$', 'tomatoes.views.theater', name='theater'),

)
