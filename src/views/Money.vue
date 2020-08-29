<template>
  <Layout class-prefix="layout">
    <EditLabel :value.sync="labelType"></EditLabel>

    <FormItem :value="labelType"></FormItem>

    <NumberPad :amount.sync="record.amount" :notes.sync="record.notes" @submit="saveRecord"/>


  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import EditLabel from '@/views/EditLabel.vue';

  @Component({
    components: {EditLabel, FormItem, NumberPad},
  })
  export default class Money extends Vue {
    labelType: string = 'payment';
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };


    saveRecord({amount, notes, createdAt}: { amount: number, notes: string, createdAt: string }) {
      if (this.labelType === 'income') {
        this.record.type = '+';
      } else {
        this.record.type = '-';
      }
      this.record.amount = amount;
      this.record.notes = notes;
      this.record.createdAt = createdAt;
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError === null) {
        window.alert('已保存');
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column;
  }

  .notes {
    padding: 12px 0;
  }
</style>

