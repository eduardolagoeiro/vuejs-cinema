import './style.scss';
import genres from './util/genres';
import Vue from 'vue';

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: []
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
    'movie-list': {
      template:`
        <div id="movie-list">
          <div v-for="movie in movies" class="movie">{{movie.title}}</div>
        </div>
      `,
      data(){
        return {
          movies: [
            {
              title: 'Pulp Fiction',
            },
            {
              title: 'Home Alone',
            },
            {
              title: 'Austin Powers',
            }
          ]
        }
      }
    },
    'movie-filter': {
      data(){
        return {
          genres
        };
      },
      template:`
        <div id="movie-filter">
          <h2>Movie Filter</h2>
          <div class="filter-group">
            <check-filter
              v-for="genre in genres"
              v-on:check-filter="checkFilterHandler"
              v-bind:title="genre"
              category="genre"/>
          </div>
        </div>
      `,
      methods: {
        checkFilterHandler({category, title, checked}){
          this.$emit('check-filter', category, title, checked);
        }
      },
      components: {
        'check-filter': {
          data(){
            return {
              checked: false,
            }
          },
          props:['title','category'],
          template:`
            <div class="check-filter"
              v-on:click="checkFilter"
              v-bind:class="{ active: checked }">
              <span class="checkbox"></span>
              <span class="check-filter-title">
                {{title}}
              </span>
            </div>
          `,
          methods: {
            checkFilter(){
              this.checked = !this.checked;
              this.$emit('check-filter', {
                category: this.category,
                title: this.title,
                checked: this.checked
              });
            }
          }
        }
      }
    }
  }
});