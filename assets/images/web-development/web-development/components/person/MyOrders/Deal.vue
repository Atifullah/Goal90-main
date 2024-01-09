<template>
    <div class="legal-currency">
      <a-card class="buy-sell-card" :bordered="false">
          <a-row>
              <a-col :lg="24"><p class="buy-sell-heading fw-5 mb-0">{{$t('person.Spot_Orders_person')}}</p></a-col>
          </a-row>
      </a-card>
      <a-card :bordered="false" class="mt-3 detail-card">

      <a-tabs :default-active-key="0" @change="changeTab">
        <a-tab-pane :key="0" :tab="$t('contract.ct16')">
          <hex-entrust-recode ref="entrust" :isSelect="true"   v-if="flag==0"/>
        </a-tab-pane>
        <a-tab-pane :key="1" :tab="$t('contract.ct17')">
          <hex-transaction ref="transaction" :isSelect="true"  v-if="flag==1"/>
        </a-tab-pane>
      </a-tabs>

      </a-card>
    </div>
  </template>

  <script>
  import entrust from '@/components/record/entrust'
  import transaction from '@/components/record/transaction'

  export default {
    name: 'articles',
    components: {
      'hex-entrust-recode': entrust,
      "hex-transaction": transaction
    },
    data() {
      return {
        flag: 0,
        margin:''
      }
    },
    methods: {
      changeTab(val) {
        this.flag = val;
        let name='';
        if(val==0){
          name='entrust'
        }
        else{
          name='transaction'
        }
        this.$nextTick(()=>{
          if (this.$refs[name]) {
            this.$refs[name].resetSelect();
            this.$refs[name].getUserDeal(true);
          }
        })
      }
    }
  }
  </script>

  <style>

  </style>
