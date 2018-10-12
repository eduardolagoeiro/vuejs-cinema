<template>
  <div>
    <div class="movie-col-left">
      <img v-bind:src="movie.poster"/>
    </div>
    <div class="movie-col-right">
      <div class="movie-title">
        <h2>{{movie.title}}</h2>
        <span class="movie-rating">{{movie.rated}}</span>
      </div>
      <div class="movie-sessions">
        <div
          v-for="session in filterSessionByDay(day)"
          v-bind:key="session"
          class="session-time-wrapper">
          <div
            class="session-time">
            {{session | sessionTimeFormatter}}
            {{(new Date(session)).getDate()}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { times, isBefore6p, isAfter6p } from '../util/times';

  export default {
    props: ['movie', 'day', 'time'],
    methods: {
      filterSessionByDay(){
        return this.movie.sessions
          .filter( session => {
            const date = new Date(session);
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
    filters: {
      sessionTimeFormatter(session){
        const date = new Date(session);
        return `${date.getUTCHours() == 0 ? '00' : date.getUTCHours()}:${date.getUTCMinutes() == 0 ? '00' : date.getUTCMinutes()}`;
      }
    }
  }
</script>