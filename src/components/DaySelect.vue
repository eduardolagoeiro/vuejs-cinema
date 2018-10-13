<template>
    <div id="day-select">
        <ul class="days">
            <li 
                v-bind:class="{ active : isActive(day) }"
                v-on:click="selected = day"
                v-for="day in days" v-bind:key="day"
                class="day">
                {{day | formatDate}}
            </li>
        </ul>
    </div>
</template>

<script>
    const moment = require('moment-timezone');

    export default{
        data(){
            return {
                selected: moment(),
                days: [0, 1, 2, 3, 4, 5, 6].map(num=>moment().add(num, 'days')),
            }
        },
        filters:{
            formatDate(raw){
                if(raw.isSame(moment(), 'day')) return 'Today';
                return raw.format('ddd DD/MM');
            }
        },
        methods:{
            isActive(day){
                return day.isSame(this.selected, 'day');
            }
        }
    }
</script>