<template>
    <div id="overview">
        <div class="main">
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:day="day" v-bind:movies="movies"></movie-list>
            <movie-filter/>
        </div>
    </div>
</template>

<script>
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';

    export default {
        props: [
            'genre','time','day', 'movies'
        ],
        components:{
            MovieList,
            MovieFilter,
        }
    }
</script>
