<template>
  <div>
    <div class="movie-col-left">
      <router-link v-bind:to="`../movie/${movie.id}`">
        <img v-bind:src="movie.poster"/>
      </router-link>
    </div>
    <div class="movie-col-right">
      <div class="movie-title">
        <router-link v-bind:to="`../movie/${movie.id}`">
          <h2>{{movie.title}}</h2>
        </router-link>
        <span class="movie-rating">{{movie.rated}}</span>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['movie']
  }
</script>