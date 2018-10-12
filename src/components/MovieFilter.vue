<template>
  <div id="movie-filter">
    <h2>Movie Filter</h2>
    <h3>Genre</h3>
    <div class="filter-group">
      <check-filter
        v-for="genre in genres"
        v-bind:title="genre"
        category="genre"
        v-bind:key = "genre"/>
    </div>
    <h3>Time</h3>
    <div class="filter-group">
      <check-filter
        v-for="time in times"
        v-bind:title="time"
        category="time"
        v-bind:key="time"/>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import { times } from '../util/times';

  import CheckFilter from './CheckFilter.vue';
  export default {
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