<template>
  <div class="check-filter"
    v-on:click="checkFilter"
    v-bind:class="{ active: checked }">
    <span class="checkbox"></span>
    <span class="check-filter-title">
      {{title}}
    </span>
  </div>
</template>

<script>
  export default {
    props:['title','category','checked'],
    methods: {
      checkFilter(){
        this.$bus.$emit('check-filter', {
          category: this.category,
          title: this.title,
          checked: !this.checked
        });
      }
    }
  }
</script>