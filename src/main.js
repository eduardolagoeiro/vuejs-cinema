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
    checkFilterHandler(category, title, checked){
      if(checked){
        this[category].push(title);
      }else{
        let index = this[category].indexOf(title);
        if(index >= 0){
          this[category].splice(index, 1);
        }
      }
    }
  },
  components:{
    MovieList,
    MovieFilter,
  }
});