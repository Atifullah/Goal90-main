<template>
  <div>
    <div class="detail-nav">
      <p>{{ $t('legalTrad.Ordernumber') }}：{{ orderdata.id }}</p>
      <p>{{ $t('legalTrad.Buyer') }}：{{ orderdata.nikename }}</p>
      <div class="service">
        <span @click="$parent.changeappealstate" v-if="orderdata.orderstatus == 4">{{ $t('legalDeal.Complaint')
        }}</span>
      </div>
    </div>
    <p class="detail-title">{{ $t('memberCenter.sell') }} {{ orderdata.amount }}
      {{ global_get_uppercase(orderdata.currencyname) }}</p>
    <p class="detail-title-price">
      <span class="tip">{{ $t('legalDeal.Unitprice') }}：</span>
      <span class="tip_value">{{ global_get_tofixed(orderdata.price, 2) }}
        {{ orderdata.legaltype }}/{{ global_get_uppercase(orderdata.currencyname) }}</span>
    </p>
    <p class="detail-title-price">
      <span class="tip">{{ $t('legalDeal.Total') }}：</span>
      <span class="tip_value">{{ $parent.getunitprice() }} {{ orderdata.legaltype }}</span>
    </p>
    <div class="detail-way-br">
      <span class="tip">{{ $t('c2c.Vendor') }}</span>
      <div class="br"></div>
    </div>
    <p class="detail-way-cancel" v-if="orderdata.orderstatus == 2 || orderdata.orderstatus == 3">
      {{ $t('c2c.unable') }}
    </p>
    <template v-else>
      <div class="detail-way-list">
        <span v-for="(item, index) in orderdata.payconfiglist" :key="index"
          @click="activepay = item.payconfig ? item.payconfig : {}"
          :class="{ 'active': activepay.paytypeid == item.typeid }" class="block">{{ item.typename }}</span>
      </div>
      <p class="detail-collection-info" v-for="(item, index) in activepay.fields" :key="index">
        <span class="tip">{{ item.fieldname }}</span>
        <span class="tip_value" v-if="item.fieldcontenttype == 'qr_code'">
          <img :src="item.fieldvalue" style="width:20px;height:auto;" @click="showimg(item.fieldvalue)">
        </span>
        <span class="tip_value" v-else>{{ item.fieldvalue }}</span>
      </p>
    </template>
    <div class="detail-hr"></div>
    <p class="detail-remart">
      <span class="tip">{{ $t('legalTrad.Payment') }}：</span>
      <span class="tip_value">{{ orderdata.paynotes ? orderdata.paynotes : '--' }}</span>
    </p>
    <!--待收款-->
    <template v-if="orderdata.orderstatus == 0">
      <p class="detail-pay-info">
        {{ $t('c2c.charged') }} <span class="time">{{ overtime }}</span> {{ $t('c2c.pay') }} <span class="money">{{
            $parent.getunitprice()
        }} {{ orderdata.legaltype }}</span>
      </p>
    </template>
    <template v-if="orderdata.orderstatus == 4">
      <p class="detail-pay-info">
        {{ $t('c2c.payd') }} <span class="money">{{ $parent.getunitprice() }}
          {{ orderdata.legaltype }}</span>{{ $t('c2c.payd2') }}
      </p>
      <div v-show="orderdata.orderstatus == 4" class="detail-button" @click="payaffirm">{{ $t('c2c.Confirmpayment') }}
      </div>
    </template>
    <!--申诉中-->
    <template v-if="orderdata.orderstatus == 6">
      <p class="detail-pay-info">{{ $t('c2c.Appealing') }}</p>
    </template>
    <!--交易已取消-->
    <template v-if="orderdata.orderstatus == 2 || orderdata.orderstatus == 3">
      <p class="detail-pay-info">{{ $t('c2c.TransactionCancelled') }}</p>
    </template>
    <!--订单已完成-->
    <div class="pay-info-success"
      v-if="orderdata.orderstatus == 1 || orderdata.orderstatus == 5 || orderdata.orderstatus == 7">
      <i class="pay-success"></i>
      <span class="detail-pay-info">{{ $t('c2c.TransactionCompleted') }}</span>
      <div class="pay-evaluate">
        <span>{{ $t('c2c.transaction') }}</span>
        <ul v-if="evaluate.id == 0" class="clearfix">
          <li v-for="(item, index) in [1, 2, 3, 4, 5]" class="pay-evaluate-tip"
            :class="{ 'active': orderdata.starleve >= item || activestarleve >= item }"
            @click="$parent.userevaluate(item)" @mouseenter="activestarleve = item" @mouseleave="activestarleve = 0"
            :key="index"></li>
        </ul>
        <ul v-else class="clearfix">
          <li v-for="(item, index) in [1, 2, 3, 4, 5]" class="pay-evaluate-tip"
            :class="{ 'active': evaluate.starleve >= item }" :key="index"></li>
        </ul>
      </div>
    </div>

    <div class="detail-faq">
      <p class="title">{{ $t('legalTrad.questions') }}：</p>
      <div class="detail-faq-list" :class="{ 'active': $parent.isVisibleDetailRow(1) }">
        <span class="tip"></span>
        <p class="tip_value" @click="$parent.showDetailRow(1)">{{ $t('legalTrad.seller') }}</p>
        <div v-show="$parent.isVisibleDetailRow(1)">
          <p>{{ $t('legalTrad.information') }}</p>
          <p>{{ $t('legalTrad.bankcards') }}</p>
          <p>{{ $t('legalTrad.greater') }}</p>
        </div>
      </div>
    </div>
    <a-dialog :show-close="false" custom-class="detail-order-qrcode" :visible.sync="paytypestate">
      <img :src="activepay.imageurl" alt="">
    </a-dialog>
    <!--确认收款-->
    <a-dialog top="0" custom-class="detail-order-warn" :visible.sync="confirmorderstate">
      <div>
        <img class="icon" src="../../static/images/warning.svg" alt="">
        <p class="tip_h1">{{ $t('c2c.2') }}</p>
        <p class="tip_h2">{{ $t('c2c.3') }}</p>
        <span class="detail-button" v-hex-loading="affirmloading" @click="confirmreceipt">{{ $t('c2c.Confirmpayment')
        }}</span>
      </div>
    </a-dialog>
  </div>
</template>
<script>

export default {
  name: 'articles',
  props: ['orderdata', 'overtime'],
  computed: {},
  watch: {
    'orderdata': function (val) {
      if (val) { 
        this.activepay = val.payconfiglist[0]
      }
    }
  },
  data() {
    return {
      activestarleve: 0,
      paytypestate: false,
      confirmorderstate: false,
      affirmloading: false,
      activepay: {},
      evaluate: {
        id: 0,
        starleve: 0
      }
    }
  },
  mounted() {
    var orderevaluate = JSON.parse(window.localStorage.getItem('orderevaluate'))
    orderevaluate.forEach(element => {
      if (element.id == this.orderdata.id) {
        this.evaluate = element
      }
    });
  },
  created() {

  },
  methods: {
    /*卖家确认收款*/
    payaffirm() {
      this.confirmorderstate = true
    },
    showimg(imgurl) {
      this.imageurl = imgurl;
      this.paytypestate = true;
    },
    /*卖家确认收款*/
    confirmreceipt() {
      if (this.affirmloading) {
        return
      }
      this.affirmloading = true
      this.$store.dispatch('trading_c2c_order_receivables', { ordercompleteid: this.orderdata.id }).then((res) => {
        this.$parent.getorderdetail().then((data) => {
          if (data && res.code == '200') {  
            this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.ConfirmedR') })
          }
          this.affirmloading = false
          this.confirmorderstate = false
        })
      })
    }
  }
}
</script>

