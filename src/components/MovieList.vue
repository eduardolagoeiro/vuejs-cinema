<template>
  <div id="movie-list">
    <div
      v-for="movie in filteredMovies"
      class="movie">{{movie.title}}</div>
  </div>
</template>

<script>
  import genres from '../util/genres';

  export default {
    props:['genre','time'],
    data(){
      return {
        movies: [
          {
            title: 'Pulp Fiction',
            genre: genres.CRIME,
          },
          {
            title: 'Home Alone',
            genre: genres.COMEDY,
          },
          {
            title: 'Austin Powers',
            genre: genres.COMEDY,
          }
        ],
      }
    },
    methods: {
      moviePassesGenreFilter(movie){
        return this.genre.length == 0 || this.genre.find(genre => movie.genre === genre);
      }
    },
    computed: {
      filteredMovies: function(){
        return this.movies.filter(this.moviePassesGenreFilter);
      }
    }
  }
</script>

<style>
  
</style>