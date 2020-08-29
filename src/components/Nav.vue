<template>
  <nav v-if="navVisible">
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="detail"/>
      明细
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="graph"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Nav extends Vue {
    navVisible: boolean = true;

    mounted() {
      if(this.$route.path === '/money'){
        this.navVisible = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgb(248, 249, 244);
    display: flex;
    flex-direction: row;
    font-size: 12px;

    > .item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: rgb(216, 224, 226);

      .icon {
        width: 32px;
        height: 32px;
      }
    }

    > .item.selected {
      color: $color-highlight;
    }
  }
</style>
