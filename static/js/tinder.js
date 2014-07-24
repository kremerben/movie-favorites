$(document).ready(function() {


    var myApiKey = 'rd5c6aj88gw6ycbn4sv2n3a6';
    var movieID = "769959054";
    var pageLimit = 3;
    var movieInfo = {};

//var currentSearch = [];
// SEARCH FOR A Related MOVIE - RETURN 3
    $('#relatedMovieSearch').on('click', function () {
        $('#relatedMovies').empty();
        var relatedSearchString = $('#relatedMovieSearchInput').val();
        console.log(relatedSearchString);
        $.ajax({
            url: 'http://api.rottentomatoes.com/api/public/v1.0/' +
                'movies.json?apikey=' + myApiKey + '&q=' +
                relatedSearchString + '&page_limit=1',
            type: 'GET',
            dataType: 'jsonp',
            success: function (movie_response) {
                if (movie_response.movies.length < 1) {
                    $('#relatedMovies').html('<h2> Title not Found </h2>');
                } else {
                                    console.log(movie_response);
                    //                console.log(movie_response.movies[0]['id']);
                    searchID = movie_response.movies[0]['id'];
                    $.ajax({
                        url: 'http://api.rottentomatoes.com/api/public/v1.0/movies/'
                            + searchID + '/similar.json?apikey=' + myApiKey + '&limit=' + pageLimit,
                        type: 'GET',
                        dataType: 'jsonp',
                        success: function (movie_response) {
                            if (movie_response.movies.length < 1) {
                                $('#relatedMovies').html('<h2> Nothing Found </h2>');
                            } else {
                                console.log(movie_response);
                                console.log(movie_response.movies[0]['title']);
                                $.each(movie_response.movies, function (index, movie) {
                                    movieInfo = {};
                                    movieInfo.title = movie.title;
                                    movieInfo.rt_id = movie.id;
                                    movieInfo.release_year = movie.year;
                                    movieInfo.critic_rating = movie.ratings.critics_score;
                                    movieInfo.audience_score = movie.ratings.audience_score;
                                    movieInfo.mpaa_rating = movie.mpaa_rating;
                                    movieInfo.runtime = movie.runtime;
                                    movieInfo.poster = movie.posters.original;
                                    movieInfo.synopsis = movie.synopsis;
                                    movieInfo.index = index;
                                    currentSearch.push(movieInfo);
                                    postMovie(movieInfo);
                                });
                            }
                        },
                        error: function (error_response) {
                            console.log(error_response);
                        }
                    });
                }
            },
            error: function (error_response) {
                console.log(error_response);
            }
        });
    });

var postMovie = function(movieInfo) {
    movieInfo = JSON.stringify(movieInfo);
    $.ajax({
        url: '/new_movie/',
        type: 'POST',
        dataType: 'html',
        data: movieInfo,
        success: function (movie_response) {
//            console.log('b'+ movie_response);
            $('#relatedMovies').append(movie_response);
        },
        error: function(error_response) {
            console.log(error_response);
        }
    });
};



// SAVE FAVORITE
//$(document).on('click', '#favorite', function() {
//    var thisOne = $(this);
//    var fave_index = thisOne.data('id');
//    console.log(currentSearch);
//    movieInfo = JSON.stringify(currentSearch[fave_index]);
//    console.log(movieInfo);
//
//    $.ajax({
//        url: '/favorite_movie/',
//        type: 'POST',
//        dataType: 'html',
//        data: movieInfo,
//        success: function (movie_response) {
//            console.log(movie_response);
//            thisOne.hide();
//            thisOne.parent().parent().appendTo('#favoriteBox');
//        }
//    });
//});


//var currentSearch = [];
//$('#searchMovie').on('click', function() {
//    currentSearch = [];
//    var searchString = $('#searchBox').val();
//    $('.movieInfoContainer').empty();
//    $.ajax({
//        url: 'http://api.rottentomatoes.com/api/public/v1.0/movies/'
//            + movieID + '/similar.json?apikey=' + myApiKey + '&limit=' + pageLimit,
//        type: 'GET',
//        dataType: 'jsonp',
//        success: function(movie_response) {
//            console.log(movie_response);
//            console.log(movie_response.movies);
////            $.each(movie_response.movies, function(index, movie) {
////                movieInfo = {};
////                movieInfo.title = movie.title;
////                movieInfo.rt_id = movie.id;
////                movieInfo.release_year = movie.year;
////                movieInfo.critic_rating = movie.ratings.critics_score;
////                movieInfo.audience_score = movie.ratings.audience_score;
////                movieInfo.mpaa_rating = movie.mpaa_rating;
////                movieInfo.runtime = movie.runtime;
////                movieInfo.poster = movie.posters.original;
////                movieInfo.synopsis = movie.synopsis;
////                movieInfo.index = index;
////                currentSearch.push(movieInfo);
////                postMovie(movieInfo);
////            });
//        },
//        error: function(error_response) {
//            console.log(error_response);
//        }
//    });
////});


});