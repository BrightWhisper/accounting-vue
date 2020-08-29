<template>
  <Layout>
    <ol v-if="groupedList.length>0" class="detail-content">
      <li v-for="(group, index) in groupedList" :key="index">
        <div class="detail-header">
          <h3 class="title">{{beautify(group.title)}} </h3>
          <div v-if="group.incomeTotal=== 0">支出¥{{group.paymentTotal}}</div>
          <div v-else-if="group.paymentTotal=== 0 ">收入¥{{group.incomeTotal}}</div>
          <div v-else><span>支出¥{{group.paymentTotal}}</span><span
            style="margin-left:10px;">收入¥{{group.incomeTotal}}</span></div>
        </div>

        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          >
            <div class="tag">
              <Icon :name="item.tags[0].iconName"></Icon>
              <span class="notes">{{item.notes}}</span>
            </div>
            <div class="itemAmount" v-if="item.type ==='-'">-¥{{item.amount}}</div>
            <div class="itemAmount income" v-else-if="item.type ==='+'">¥{{item.amount}}</div>

          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';


  @Component
  export default class Details extends Vue {

    created() {
      this.$store.commit('fetchTags');
      this.$store.commit('fetchRecords');
    }

    get recordList() {
      return this.$store.state.recordList;
    }


    get groupedList() {
      const newList = clone(this.recordList).sort((a: RecordItem, b: RecordItem) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {
        return [];
      }
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }

      result.map(group => {
        group.paymentTotal = 0;
        group.incomeTotal = 0;
        group.items.forEach(el => {
          if (el.type === '-') {
            group.paymentTotal! += el.amount;
          } else if (el.type === '+') {
            group.incomeTotal! += el.amount;
          }
        });
      });

      result.map(el => {
        el.items.sort((a: RecordItem, b: RecordItem) => a.type.charCodeAt(0) - b.type.charCodeAt(0));
      });
      console.log(result);
      this.$store.commit('setGroupedList',result);
      return result;
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' :
        tags.map(t => t.name).join('，');
    }


  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .detail-content {
    max-height: calc(100vh - 54px);
    padding: 10px;

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin-top: 3vh;

      > div {
        font-family: $font-hei;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.8);
      }

      > .title {
        font-size: 20px;
        color: rgb(169, 206, 200);
        line-height: 20px;

      }
    }

    .record {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1vh;
      padding: 5px;
      background: rgb(249, 250, 245);

      > .tag {
        > svg {
          width: 2em;
          height: 2em;
          color: rgb(240, 168, 161);
        }

        > .notes {
          vertical-align: super;
          margin-left: 3px;
        }
      }

      > .itemAmount {
        font-weight: bold;
        font-family: $font-hei;
      }

      > .itemAmount.income {
        color: rgb(157, 202, 194);
      }
    }
  }

  .noResult {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

