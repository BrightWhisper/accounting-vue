<template>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">记账</span>
      <div class="rightTab">
        <div :class="{selected: value==='payment'}" @click="selectedChange('payment')">支出</div>
        <div :class="{selected: value==='income'}" @click="selectedChange('income')">收入</div>
      </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem},
  })
  export default class EditLabel extends Vue {
    @Prop(String) value!: string;

    selectedChange(type: string) {
      this.$emit("update:value",type);
    }

    goBack() {
      this.$router.replace('/labels');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 10px 8px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .title {
      font-family: $font-hei;
      font-weight: 500;
    }

    > .leftIcon {
      width: 24px;
      height: 24px;
    }

    > .rightTab {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      background: rgb(232, 236, 239);
      border-radius: 5px;
      padding: 0 2px;

      > div {
        margin: 3px 3px;
        padding: 0 2px;
        border-radius: 4px;

        &.selected {
          background: white;
        }
      }
    }
  }
</style>
