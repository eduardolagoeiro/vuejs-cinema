<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <MovieItem
        v-for="movie in filteredMovies"
        class="movie" 
        v-bind:movie="movie"
        v-bind:key="movie.id"/>
      </div>
    <div v-else-if="movies.length" class="no-results">
      No results.
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import { times, isBefore6p, isAfter6p } from '../util/times';
  import MovieItem from './MovieItem.vue';

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
        return this.time.length == 0 ||
          !this.time.map(el=>movie.times.includes(el)).includes(false);
      },
      getMovies(){
        fetch('api')
          .then(response => response.json())
          .then(json=>{
            const result = [];
            json.map(el => {
              let movie = {};
              movie.id = el.id;
              movie.genres = el.movie.Genre.split(',').map(string=>string.trim());
              movie.sessions = el.sessions.map(session=>session.time);
              movie.title = el.movie.Title;
              movie.poster = el.movie.Poster;
              movie.rated = el.movie.Rated;
              movie.times = [];
              if(movie.sessions.find(isBefore6p)){
                movie.times.push(times.BEFORE_6PM);
              }
              if(movie.sessions.find(isAfter6p)){
                movie.times.push(times.AFTER_6PM);
              }
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