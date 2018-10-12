import './style.scss';
import Vue from 'vue';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get(){return this.$root.bus}});

import {checkFilterHandler} from './util/bus';

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    day: (new Date()).getDate(),
    bus
  },
  components:{
    MovieList,
    MovieFilter,
  },
  created: function(){
    this.$bus.$on('check-filter', checkFilterHandler.bind(this));
  }
});