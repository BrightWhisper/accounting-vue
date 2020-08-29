<template>
  <div class="words-layout">
    <div class="words-content">
      <div>{{words}}</div>
      <div>{{author}}</div>
    </div>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {
    words: string = '"我需要最狂的风，和最静谧的海"';
    author: string = '顾城';

    mounted() {
      setTimeout(() => this.$router.replace('/labels'), 2000);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .words-layout {
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background: white;
    > .words-content{
      font-family: $font-song;
      font-size: 18px;
      text-align: center;
      background: rgb(249,250,245);
      > div{
        padding: 30px;
        &:nth-child(2){
          color: rgba(0,0,0,0.5);
        }
      }
    }
  }
</style>

