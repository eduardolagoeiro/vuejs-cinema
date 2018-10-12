import './style.scss';
import Vue from 'vue';
import Overview from './components/Overview.vue';

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
    Overview
  },
  created: function(){
    this.$bus.$on('check-filter', checkFilterHandler.bind(this));
  }
});