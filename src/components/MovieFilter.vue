<template>
  <div id="movie-filter">
    <h2>Movie Filter</h2>
    <h3>Genre</h3>
    <div class="filter-group">
      <check-filter
        v-for="el in genres"
        v-bind:title="el"
        category="genre"
        v-bind:checked="genre.includes(el)"
        v-bind:key = "el"/>
    </div>
    <h3>Time</h3>
    <div class="filter-group">
      <check-filter
        v-for="el in times"
        v-bind:title="el"
        category="time"
        v-bind:checked="time.includes(el)"
        v-bind:key="el"/>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import { times } from '../util/times';

  import CheckFilter from './CheckFilter.vue';
  export default {
    props: ['time', 'genre'],
    data(){
      return {
        genres,
        times,
      };
    },
    components: {
      CheckFilter,
    }
  }
</script>