<template>
    <div class="trade-detail pt-3">
      <a-card :bordared="false" class="deposit-detail-card" :title="currencySelected+' '+$t('wallet.mentionRecord')">
        <div slot="extra">
          <a-row :gutter="16">
            <a-col :lg="12">
              <p class="hide-txt fw-5 pt-2 mb-0">
                {{$t('withdrawal.wc10')}}
                <svg width="16" height="16" class="svg-icon ml-2" >
      <use xlink:href="/images/svg/sprite.svg#us-eye-icon"></use>
    </svg>

              </p>
            </a-col>
            <a-col :lg="12">
              <a-input :placeholder="$t('placeholders.plh5')">
                <span slot="prefix">
                  <img src="/images/search-icon.svg"
                /></span> </a-input
            ></a-col>
          </a-row>
        </div>
        <a-table
          :columns="tradeTableColumns"
          :pagination="false"
          :data-source="tradeTableData"
          rowKey="id"
        >
            <div slot="mentionTime" slot-scope="text,row" >
                <span>{{getRecordTime(row)}}</span>
            </div>
            <div slot="currency" slot-scope="text,row">
                <span>{{global_get_uppercase(row.currencyname)}}</span>
            </div>

          <div slot="action" slot-scope="text,row">
            <a-row :gutter="16">
              <a-col :lg="8">
                <a-button class="deposit-btn" block @click="row.currency.iscandeposit?showDetailRow(row,'deposit'):''">
                    <span class="handle" >
                        {{$t('wallet.recharge')}}
                    </span>
                </a-button>
              </a-col>
              <a-col :lg="8">
                <a-button class="withdraw-btn" block>{{$t('withdrawal.wc11')}}</a-button>
              </a-col>
              <a-col :lg="8" aling="end">
                <a-button class="transaction-btn" block>{{$t('withdrawal.wc12')}}</a-button>
              </a-col>
            </a-row>
          </div>
          <span slot="status">
            <a-button class="deposit-success fw-5">{{$t('withdrawal.wc13')}}</a-button>
          </span>
        </a-table>
      </a-card>
    </div>
  </template>
  <script>
  export default {
    props: {
      tradeTableData: {
        type: Array,
        default: () => [],
      },
      currencySelected:{
        type: String
      }
    },
    computed:{
        selfRoute: function () {
        return this.$store.state.route
        },
    },
    data() {
      return {
        tradeTableColumns:[
          {
            title:  this.$t('tableskeys.ty11'),
            dataIndex: 'mentionTime',
            scopedSlots: { customRender: 'mentionTime' },
            width: 180,
          },
          {
            title: 'ID',
            dataIndex: 'id',
            width: 120,
          },
          {
            title:  this.$t('tableskeys.vt21'),
            dataIndex: 'currency',
            scopedSlots: { customRender: 'currency' },
            width: 100,
          },
          {
            title:  this.$t('tableskeys.ty9'),
            dataIndex: 'address',
            width: 310,
          },
          {
            title:  this.$t('tableskeys.ty10'),
            dataIndex: 'amount',
            width: 160,
          },
          {
            title:  this.$t('tableskeys.tt4'),
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
            width: 120,
          },

        ]
      }
    },
    methods:{
      getRecordTime: function (coinitem) {
        return (coinitem.updatetime && coinitem.status == 1) ? this.global_get_local_time(coinitem.updatetime).format('YYYY-MM-DD hh:mm a') : this.global_get_local_time(coinitem.createtime).format('YYYY-MM-DD hh:mm a')
      },
    }
  }
  </script>
  <style lang="scss">
  @import '@/assets/scss/components/trade-table/trade-table.scss';
  </style>
