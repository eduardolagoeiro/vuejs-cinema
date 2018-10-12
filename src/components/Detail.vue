<template>
    <div id="detail">
        <MovieItem
            v-if="movie"
            class="movie" 
            v-bind:movie="movie"
            v-bind:day="day"
            v-bind:time="time"
        />
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
