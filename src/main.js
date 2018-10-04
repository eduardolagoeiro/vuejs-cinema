import './style.scss';
import genres from './util/genres';
import Vue from 'vue';

new Vue({
  el: '#app',
  data: {
    msg: 'Hello World!'
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
              v-bind:name="genre"/>
          </div>
        </div>
      `,
      methods: {
        checkFilterHandler(){
          console.log('msg');
        }
      },
      components: {
        'check-filter': {
          data(){
            return {
              checked: false,
            }
          },
          props:['name'],
          template:`
            <div class="check-filter"
              v-on:click="checkFilter"
              v-bind:class="{ active: checked }">
              <span class="checkbox"></span>
              <span class="check-filter-title">
                {{name}}
              </span>
            </div>
          `,
          methods: {
            checkFilter(){
              this.checked = !this.checked;
              this.$emit('check-filter', {
                name: this.name,
                checked: this.checked
              });
            }
          }
        }
      }
    }
  }
});