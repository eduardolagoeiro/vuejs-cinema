<template>
    <div id="day-select">
        <ul class="days">
            <li 
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
                days: [0, 1, 2, 3, 4, 5, 6].map(num=>moment().add(num, 'days')),
            }
        },
        filters:{
            formatDate(raw){
                if(raw.isSame(moment(), 'day')) return 'Today';
                return raw.format('ddd DD/MM');
            }
        }
    }
</script>