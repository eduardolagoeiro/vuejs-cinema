import './style.scss';
import Vue from 'vue';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get(){return this.$root.bus}});

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    day: (new Date()).getDate(),
    bus
  },
  methods: {
    checkFilterHandler(payload){
      if(payload.checked){
        this[payload.category].push(payload.title);
      }else{
        let index = this[payload.category].indexOf(payload.title);
        if(index >= 0){
          this[payload.category].splice(index, 1);
        }
      }
    }
  },
  components:{
    MovieList,
    MovieFilter,
  },
  created: function(){
    this.$bus.$on('check-filter', this.checkFilterHandler);
  }
});