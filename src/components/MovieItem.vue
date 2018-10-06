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
      
    </div>
  </div>
</template>

<script>
  export default {
    props: ['movie'],
  }
</script>