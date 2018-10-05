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

  export default {
    props:['genre','time'],
    data(){
      return {
        movies: [
          {
            title: 'Pulp Fiction',
            genre: genres.CRIME,
            time: times.BEFORE_6PM,
          },
          {
            title: 'Home Alone',
            genre: genres.COMEDY,
            time: times.AFTER_6PM,
          },
          {
            title: 'Austin Powers',
            genre: genres.COMEDY,
            time: times.BEFORE_6PM,
          }
        ],
      }
    },
    methods: {
      moviePassesGenreFilter(movie){
        return this.genre.length == 0 || this.genre.find(genre => movie.genre === genre);
      },
      moviePassesTimeFilter(movie){
        return this.time.length == 0 || this.time.find(time => movie.time === time);
      }
    },
    computed: {
      filteredMovies: function(){
        return this.movies
          .filter(this.moviePassesGenreFilter)
          .filter(this.moviePassesTimeFilter);
      }
    }
  }
</script>

<style>
  
</style>