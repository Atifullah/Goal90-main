<template>
  <div>
    <div class="detail-nav">
      <p>{{ $t('legalTrad.Ordernumber') }}：{{ orderdata.id }}</p>
      <p>{{ $t('legalTrad.Seller') }}：{{ orderdata.nikename }}</p>
      <div class="service">
        <span @click="$parent.changeusercancel" v-if="orderdata.orderstatus == 0">{{ $t('legalTrad.Cancelorder')
        }}</span>
        <span @click="$parent.changeappealstate" v-if="orderdata.orderstatus == 4">{{ $t('legalDeal.Complaint')
        }}</span>
      </div>
    </div>
    <p class="detail-title">{{ $t('legalDeal.Buy') }} {{ orderdata.amount }}
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
      <p class="detail-collection-info" v-for="(item, index) in activepay?.fields" :key="index">
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
    <!--待支付-->
    <template v-if="orderdata.orderstatus == 0">
      <p class="detail-pay-info">
        {{ $t('legalTrad.Waiting') }}<span class="time">{{ overtime }}</span>
        {{ $t('legalTrad.in') }}{{ orderdata.nikename }}{{ $t('legalTrad.Paybuy') }} <span class="money">{{
            $parent.getunitprice()
        }} {{ orderdata.legaltype }}</span>
      </p>
      <div class="detail-button" @click="payaffirm">{{ $t('legalTrad.Paymentconfimation') }}
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
    <!--买家已付款，待卖家确认-->
    <template v-if="orderdata.orderstatus == 4">
      <p class="detail-pay-info">{{ $t('c2c.been') }}{{ orderdata.nikename }}{{ $t('legalTrad.Payconplete') }}
        <span class="money">{{ $parent.getunitprice() }} {{ orderdata.legaltype }}</span>
      </p>
      <div class="pay-info-success">
        <i class="pay-success"></i>
        <span class="detail-pay-info">{{ $t('c2c.Completed') }}</span>
      </div>
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
      <img :src="imageurl" alt="">
    </a-dialog>
    <!--确认支付-->
    <a-dialog top="0" custom-class="detail-order-warn" :visible.sync="confirmorderstate">
      <div>
        <img class="icon" src="../../static/images/warning.svg" alt="">
        <p class="tip_h2">{{ $t('c2c.success') }}</p>
        <span class="detail-button" v-hex-loading="affirmloading" @click="confirmreceipt">{{
            $t('legalTrad.Paymentconfimation')
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
  watch: {},
  data() {
    return {
      activestarleve: 0,
      paytypestate: false,
      confirmorderstate: false,
      affirmloading: false,
      imageurl: '',
      activepay: {},
      evaluate: {
        id: 0,
        starleve: 0
      }
    }
  },
  mounted() {
    var orderevaluate = JSON.parse(window.localStorage.getItem('orderevaluate'))
    if (orderevaluate) {
      orderevaluate.forEach(element => {
        if (element.id == this.orderdata.id) {
          this.evaluate = element
        }
      });
    }
  },
  created() {
    this.activepay = this.orderdata.payconfiglist[0]
  },
  methods: {
    /*买家确认支付*/
    payaffirm() {
      this.confirmorderstate = true
    },
    showimg(imgurl) {
      this.imageurl = imgurl;
      this.paytypestate = true;
    },
    /*买家确认支付*/
    confirmreceipt() {
      if (this.affirmloading) {
        return
      }
      this.affirmloading = true
      this.$store.dispatch('trading_c2c_order_comfirmpay', { ordercompleteid: this.orderdata.id }).then((res) => {
        this.$parent.getorderdetail().then((data) => {
          if (data && res.code == '200') {  
            this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Confirmed') })
          }
          this.affirmloading = false
          this.confirmorderstate = false
        })
      })
    }
  }
}
</script>

