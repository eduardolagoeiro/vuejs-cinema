<template>
  <div id="movie-list">
    <MovieItem
      v-for="movie in filteredMovies"
      class="movie" 
      v-bind:movie="movie"/>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import MovieItem from './MovieItem.vue';
  import _ from 'lodash';

  export default {
    props:['genre','time'],
    data(){
      return {
        movies: [],
          }
    },
    components: {
      MovieItem,
    },
    methods: {
      moviePassesGenreFilter(movie){
        return this.genre.length == 0 ||
          !this.genre.map(el=>movie.genres.includes(el)).includes(false);
      },
      moviePassesTimeFilter(movie){
        return this.time.length == 0;
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
              movie.poster = movie.Poster;
              movie = _.pick(movie, 'title', 'sessions','genres', 'poster');
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