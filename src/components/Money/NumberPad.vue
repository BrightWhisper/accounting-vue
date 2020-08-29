<template>
  <div class="numberPad">
    <van-popup v-model="dataPickerShow" get-container="body" class="datePop">
      <van-datetime-picker
        :value="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>

    <div class="displayArea">
      <input type="text" v-model="notes" class="notes" placeholder="内容备注"/>
      <div class="amounts"><b>{{amount}}</b></div>
    </div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="showDataPicker" class="datePicker">{{displayCurrentDate}}</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="remove">删除</button>

      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="clear">清空</button>

      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
      <button @click="ok" class="ok">OK</button>
      <div class="fillArea"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';


  @Component
  export default class NumberPad extends Vue {
    amount: string = '0';
    notes: string = '';
    dataPickerShow: boolean = false;
    minDate: Date = new Date(1970, 0, 1);
    maxDate: Date = new Date(2025, 10, 1);
    currentDate: Date = new Date();

    get displayCurrentDate() {
      let currentMonth = dayjs(this.currentDate).month();
      let currentDate = dayjs(this.currentDate).date();
      const todayMonth = dayjs(new Date()).month();
      const todayDate = dayjs(new Date).date();
      if (currentMonth === todayMonth && currentDate === todayDate) {
        return '今日';
      }
      currentMonth = dayjs(this.currentDate).month();
      currentDate = dayjs(this.currentDate).date();
      return `${currentMonth + 1}月${currentDate}日`;
    }

    showDataPicker() {
      this.dataPickerShow = !this.dataPickerShow;
    }

    confirm(value: Date) {
      this.currentDate = value;
      this.dataPickerShow = false;
    }

    cancel() {
      this.dataPickerShow = false;
    }

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.amount.length === 16) { return; }
      if (this.amount === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.amount = input;
        } else {
          this.amount += input;
        }
        return;
      }
      if (this.amount.indexOf('.') >= 0 && input === '.') {return;}
      this.amount += input;
    }

    remove() {
      if (this.amount.length === 1) {
        this.amount = '0';
      } else {
        this.amount = this.amount.slice(0, -1);
      }
    }

    clear() {
      this.amount = '0';
    }

    ok() {
      const number = parseFloat(this.amount);
      if (number === 0) {
        alert('金额不能为0');
        return;
      }
      this.$emit('submit', {amount: number, notes: this.notes, createdAt: new Date(this.currentDate).toISOString()});
      this.amount = '0';
      this.$router.replace('/labels');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .datePop {
    min-width: 80vw;
    min-height: 50vh;
  }

  ::v-deep .van-picker__confirm,
  ::v-deep .van-picker__cancel {
    color: rgb(154, 201, 193);
    font-size: 16px;
  }

  .numberPad {
    background: rgb(155, 202, 194);

    > .displayArea {
      font-size: 16px;
      padding: 8px 8px;
      text-align: right;
      margin-top: 1vh;
      margin-bottom: -4px;


      > .notes {
        width: 100%;
        border: 2px solid black;
        border-radius: 5px;
        padding: 5px;
        padding-left: 10px;
      }

      > .amounts {
        width: 100%;
        font-size: 25px;
        border-bottom: 2px solid black;
        font-family: Consolas, monospace;

      }
    }

    .buttons {
      @extend %clearFix;
      margin-bottom: 2vh;

      > button {
        width: 23%;
        margin: 1% 0;
        margin-left: 1.5%;
        height: 40px;
        float: left;
        background: white;
        border: 2px solid black;
        border-radius: 10px;

        &.datePicker {
          background: rgb(242, 169, 160);
        }

        &.ok {
          background: rgb(242, 197, 16);
        }

        &.zero {
          width: 23.75*2%;
        }

      }

      > .fillArea {
        height: 16px;
      }
    }
  }
</style>
