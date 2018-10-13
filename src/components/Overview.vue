<template>
    <div id="overview">
        <DaySelect v-bind:selected="day"/>
        <div class="main">
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:day="day" v-bind:movies="movies"></movie-list>
            <movie-filter v-bind:time="time" v-bind:genre="genre" />
        </div>
    </div>
</template>

<script>
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';
    import DaySelect from './DaySelect.vue';

    export default {
        props: [
            'genre','time','day', 'movies'
        ],
        components:{
            MovieList,
            MovieFilter,
            DaySelect,
        }
    }
</script>
