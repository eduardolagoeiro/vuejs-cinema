import './style.scss';
import Vue from 'vue';

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get(){return this.$root.bus}});

import {checkFilterHandler} from './util/bus';

import VueRouter from 'vue-router';
Vue.use(VueRouter)

import routes from './util/routes';
const router = new VueRouter({routes});

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    day: (new Date()).getDate(),
    bus
  },
  components:{
  },
  created: function(){
    this.$bus.$on('check-filter', checkFilterHandler.bind(this));
  },
  router
});