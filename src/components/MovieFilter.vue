<template>
  <div id="movie-filter">
    <h2>Movie Filter</h2>
    <div class="filter-group">
      <h3>Genre</h3>
      <check-filter
        v-for="genre in genres"
        v-on:check-filter="checkFilterHandler"
        v-bind:title="genre"
        category="genre"
        v-bind:key = "genre"/>
        <h3>Time</h3>
      <check-filter
        v-for="time in times"
        v-on:check-filter="checkFilterHandler"
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
    methods: {
      checkFilterHandler({category, title, checked}){
        this.$emit('check-filter', category, title, checked);
      }
    },
    components: {
      CheckFilter,
    }
  }
</script>