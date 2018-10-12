<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <MovieItem
        v-for="movie in filteredMovies"
        class="movie" 
        v-bind:movie="movie"
        v-bind:key="movie.id"
        v-bind:day="day"
        v-bind:time="time"/>
      </div>
    <div v-else-if="movies.length" class="no-results">
      {{ noResults }}
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import MovieItem from './MovieItem.vue';

  export default {
    props:['genre','time','day', 'movies'],
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
    },
    computed: {
      filteredMovies: function(){
        return this.movies
          .filter(this.moviePassesGenreFilter)
          .filter(this.moviePassesTimeFilter);
      },
      noResults: function(){
        return 'No resulst for ' + this.genre.concat(this.time).join(', ') + ' on day '+ this.day;
      }
    },
  }
</script>

<style>
  
</style>