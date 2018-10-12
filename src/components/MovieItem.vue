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
          v-for="session in sessions"
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
  export default {
    data(){
      return {
        sessions: []
      }
    },
    props: ['movie', 'day'],
    mounted: function(){
      this.sessions = this.movie.sessions
      // .slice(0, 10);
    },
    filters: {
      sessionTimeFormatter: function(session){
        const date = new Date(session);
        return `${date.getUTCHours() == 0 ? '00' : date.getUTCHours()}:${date.getUTCMinutes() == 0 ? '00' : date.getUTCMinutes()}`;
      }
    }
  }
</script>