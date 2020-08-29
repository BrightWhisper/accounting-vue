<template>
  <div class="form-content">
    <div class="income-tag-content" v-if="value==='payment'">
      <div v-for="paymentItem in paymentTagList" :key="paymentItem.id"
           :class="{tagItem:true, selected: paymentItem.id === currentTagID}"
           @click="selectTag(paymentItem,'payment')">
        <Icon :name="paymentItem.iconName"></Icon>
        <div>{{paymentItem.name}}</div>
      </div>
    </div>
    <div class="payment-tag-content" v-if="value==='income'">
      <div v-for="incomeItem in incomeTagList" :key="incomeItem.id"
           :class="{tagItem:true, selected: incomeItem.id === currentTagID}"
           @click="selectTag(incomeItem,'income')">
        <Icon :name="incomeItem.iconName"></Icon>
        <div>{{incomeItem.name}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    incomeTagList!: Array<string>;
    paymentTagList!: Array<string>;
    currentTagID: string = '';
    @Prop(String) value!: string;

    @Watch('value')
    onValueChanged(value: string, oldValue: string) {
      if (value === 'payment') {
        this.currentTagID = '1';
        this.$store.commit('setCurrentTag', '1');
      } else if (value === 'income') {
        this.currentTagID = '11';
        this.$store.commit('setCurrentTag', '11');
      }
    }

    created() {
      this.$store.commit('fetchTags');
      this.incomeTagList = this.$store.state.incomeTagList;
      this.paymentTagList = this.$store.state.paymentTagList;
      this.currentTagID = '1';
      this.$store.commit('setCurrentTag', '1');
    }

    selectTag(item: Tag, type: string) {
      this.currentTagID = item.id;
      this.$store.commit('setCurrentTag', item.id);
    }
  }
</script>

<style lang="scss" scoped>
  .form-content {
    flex-grow: 1;
    overflow: auto;
    background: rgb(248, 249, 244);

    > .income-tag-content {
      display: flex;
      flex-wrap: wrap;

      > .tagItem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 15vw;
        height: 10vh;
        text-align: center;
        margin: 3vh 2vw;
        border: 2px solid transparent;

        &.selected {
          background: rgb(161, 223, 210);
          border: 2px solid rgb(154, 206, 194);
          border-radius: 10px;
        }

        svg {
          width: 2em;
          height: 10vh;
        }
      }
    }

    > .payment-tag-content {
      display: flex;
      flex-wrap: wrap;

      > .tagItem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 15vw;
        height: 10vh;
        text-align: center;
        margin: 3vh 2vw;
        border: 2px solid transparent;

        &.selected {
          background: rgb(161, 223, 210);
          border: 2px solid rgb(154, 206, 194);
          border-radius: 10px;
        }

        svg {
          width: 2em;
          height: 10vh;
        }
      }
    }
  }

</style>
