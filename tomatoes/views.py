import json
from django.http import HttpResponse
from django.shortcuts import render, render_to_response

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from models import Movie

def home(request):
    favorites = Movie.objects.all()
    data = {
        'favorites': favorites
    }
    return render(request, 'tomatoes_base.html', data)

@csrf_exempt
def new_movie(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if data['runtime'] == "":
            runtime = 10
        else:
            runtime = data['runtime']
        # new_movie = Movie.objects.create(
        #     title=data['title'],
        #     release_year=data['release_year'],
        #     critic_rating=data['critic_rating'],
        #     poster=data['poster'],
        #     mpaa_rating=data['mpaa_rating'],
        #     runtime=runtime,
        #     audience_score=data['audience_score']
        # )
        movie_info = {
            'title': data['title'],
            'release_year': data['release_year'],
            'critic_rating': data['critic_rating'],
            'audience_score': data['audience_score'],
            'poster': data['poster'],
            'mpaa_rating': data['mpaa_rating'],
            'index': data['index'],
            'runtime': runtime
        }
        # movie_info = [movie_info]
        # return HttpResponse(json.dumps(movie_info), content_type='application/json')
        return render_to_response('movie_template.html', movie_info)


@csrf_exempt
def favorite_movie(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if data['runtime'] == "":
            runtime = 10
        else:
            runtime = data['runtime']
        new_movie = Movie.objects.create(
            title=data['title'],
            release_year=data['release_year'],
            critic_rating=data['critic_rating'],
            poster=data['poster'],
            mpaa_rating=data['mpaa_rating'],
            runtime=runtime,
            audience_score=data['audience_score']
        )
        movie_info = {
            'title': new_movie.title,
            'release_year': new_movie.release_year,
            'critic_rating': new_movie.critic_rating,
            'audience_score': new_movie.audience_score,
            'poster': new_movie.poster,
            'mpaa_rating': new_movie.mpaa_rating,
            'runtime': new_movie.runtime
        }
        # return HttpResponse(json.dumps(movie_info), content_type='application/json')
        return render_to_response('movie_template.html', movie_info)


@csrf_exempt
def new_movie_info(request, new_movie_id):
    movie_info = Movie.objects.filter(id=new_movie_id)
    data = {
        'movie_info': movie_info,
    }
    return render_to_response('movie_template.html', data)