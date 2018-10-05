<template>
  <div id="movie-list">
    <div
      v-for="movie in filteredMovies"
      class="movie">{{movie.title}}</div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import _ from 'lodash';

  export default {
    props:['genre','time'],
    data(){
      return {
        movies: [],
          }
    },
    methods: {
      moviePassesGenreFilter(movie){
        return this.genre.length == 0 || this.genre.find(genre => movie.genre === genre);
      },
      moviePassesTimeFilter(movie){
        return this.time.length == 0 || this.time.find(time => movie.time === time);
      },
      getMovies(){
        fetch('api')
          .then(response => response.json())
          .then(json=>{
            const result = [];
            json.map(el => {
              let movie = el.movie;
              movie.id = el.id;
              movie.genres = movie.Genre.split(',').map(string=>string.trim());
              movie.sessions = el.sessions.map(session=>session.time);
              movie.title = movie.Title;
              movie = _.pick(movie, 'title', 'sessions','genres');
              result.push(movie);
            });
            return result;
          })
          .then(result=>{
            this.movies=result;
          })
          .catch(err=>console.log(err));
      }
    },
    computed: {
      filteredMovies: function(){
        return this.movies
          .filter(this.moviePassesGenreFilter)
          .filter(this.moviePassesTimeFilter);
      }
    },
    mounted() {
      this.getMovies();
    },
  }
</script>

<style>
  
</style>