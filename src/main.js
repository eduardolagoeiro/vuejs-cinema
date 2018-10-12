import './style.scss';
import Vue from 'vue';

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get(){return this.$root.bus}});

import {checkFilterHandler} from './util/bus';

import VueRouter from 'vue-router';
Vue.use(VueRouter)

import routes from './util/routes';
const router = new VueRouter({routes});

import { times, isBefore6p, isAfter6p } from './util/times';

new Vue({
  el: '#app',
  data: {
    movies: [],
    genre: [],
    time: [],
    day: (new Date()).getDate(),
    bus
  },
  methods:{
    getMovies(){
      fetch('api')
        .then(response => response.json())
        .then(json=>{
          const result = [];
          json.map(el => {
            let movie = {};
            movie.id = el.id;
            movie.genres = el.movie.Genre.split(',').map(string=>string.trim());
            movie.sessions = el.sessions.map(session=>session.time);
            const filteredSessionsByDay = movie.sessions.filter( el => (new Date(el).getDate() === this.day));
            if(filteredSessionsByDay.length){
              movie.title = el.movie.Title;
              movie.poster = el.movie.Poster;
              movie.rated = el.movie.Rated;
              movie.times = [];
              if(movie.sessions.find(isBefore6p)){
                movie.times.push(times.BEFORE_6PM);
              }
              if(movie.sessions.find(isAfter6p)){
                movie.times.push(times.AFTER_6PM);
              }
              result.push(movie);
            }
          });
          this.movies=result;
        })
        .catch(err=>console.log(err));
    }
  },
  created: function(){
    this.getMovies();
    this.$bus.$on('check-filter', checkFilterHandler.bind(this));
  },
  router,
});