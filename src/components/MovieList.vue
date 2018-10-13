<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <MovieItem
        v-if="filteredSessions(movie).length"
        v-for="movie in filteredMovies"
        class="movie" 
        v-bind:movie="movie"
        v-bind:key="movie.id"
        v-bind:day="day"
        v-bind:time="time">
        <div class="movie-sessions">
          <div
            v-for="session in filteredSessions(movie)"
            v-bind:key="session"
            class="session-time-wrapper tooltip-wrapper"
            v-tooltip="{seats:session.seats}">
            <div
              class="session-time">
              {{session.time | sessionTimeFormatter}}
            </div>
          </div>
        </div>
      </MovieItem>
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
  import { times, isBefore6p, isAfter6p } from '../util/times';

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
      filteredSessions(movie){
        return movie.sessions
          .filter( session => {
            const date = new Date(session.time);
            let isTime = true;
            this.time.map(time => {
              switch(time){
                case times.BEFORE_6PM:
                  isTime &= isBefore6p(session);
                  break;
                case times.AFTER_6PM:
                  isTime &= isAfter6p(session);
                  break;
              }
            });
            return (date.getDate() === this.day) && isTime;
          });
      }
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
    filters: {
      sessionTimeFormatter(session){
        const date = new Date(session);
        return `${date.getUTCHours() == 0 ? '00' : date.getUTCHours()}:${date.getUTCMinutes() == 0 ? '00' : date.getUTCMinutes()}`;
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none
  }
</style>