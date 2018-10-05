<template>
  <div>
    <div class="movie-col-left">
      <img v-bind:src="movie.poster"/>
    </div>
    <div class="movie-col-right">
      {{movie.title}}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['movie'],
  }
</script>