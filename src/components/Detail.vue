<template>
    <div id="detail">
        <MovieItem
            v-if="movie"
            class="movie" 
            v-bind:movie="movie"
            v-bind:day="day"
            v-bind:time="time"
        >
            <div class="movie-details">
                <p class="movie-genre">{{movie.genre}}</p>
                <p class="movie-plot">{{movie.plot}}</p>
                <table>
                    <tr>
                        <td>Released date:</td>
                        <td>{{movie.released}}</td>
                    </tr>
                </table>
            </div>
        </MovieItem>
    </div>
</template>

<script>
    import MovieItem from './MovieItem.vue';

    export default {
        props: ['time', 'day', 'movies'],
        data() {
            return {
                id: this.$route.params.id,
            }
        },
        components: {
            MovieItem
        },
        computed: {
            movie: function(){
                const movie = this.movies.find( movie => movie.id === this.id);
                return movie;
            }
        },
    }
</script>
