<template>
    <div id="day-select">
        <ul class="days">
            <li 
                v-bind:class="{ active : isActive(day) }"
                v-on:click="changeDayEvent(day, 0)"
                v-for="day in days" v-bind:key="day"
                class="day">
                {{day | formatDate}}
            </li>
            <li class="day-selector">
                <span class="dec" v-on:click="changeDayEvent(selected,-1)"></span>
                <span class="inc" v-on:click="changeDayEvent(selected,+1)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    const moment = require('moment-timezone');

    export default{
        props: [ 'selected' ],
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
        },
        methods:{
            isActive(day){
                return day.date() == this.selected;
            },
            changeDayEvent(day, inc){
                if(inc == -1 && (this.days[0]).date() == day)return;
                if(inc == 1 && (this.days[6]).date() == day)return;
                this.$bus.$emit('change-day', {
                    day: (day.date ? day.date() : day )+inc
                })
            }
        }
    }
</script>