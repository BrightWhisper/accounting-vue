<template>
  <div id="app">
    <transition name="change-route">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-family: $font-hei;
    font-size: 16px;
    line-height: 1.5;
    background: #F5F5F5;
  }

  #app {
    max-width: 500px;
    margin: 0 auto;
  }

  .change-route-enter-active, .change-route-leave-active {
    transition: opacity .3s;
  }

  .change-route-enter, .change-route-leave-to {
    opacity: 0;
  }
</style>
