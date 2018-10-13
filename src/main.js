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
            let movie = {
              id: el.id,
              title: el.movie.Title,
              actors: el.movie.Actors,
              poster: el.movie.Poster,
              rated: el.movie.Rated,
              actors: el.movie.Actors,
              director: el.movie.Director,
              times: [],
              genre: el.movie.Genre,
              plot: el.movie.Plot,
              released: el.movie.Released,
              genres: el.movie.Genre.split(',').map(string=>string.trim()),
              sessions: el.sessions.map(session=>session.time),
            };
            const filteredSessionsByDay = movie.sessions.filter( el => (new Date(el).getDate() === this.day));
            if(filteredSessionsByDay.length){
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