<style lang='scss' scoped>

.select-account {
  width: 400px;
  padding: 10px 0 10px 10px;
  border-radius: 4px;
  border: 1px solid #dddddd;

  .title {
    font-size: 12px;
    color: #344B6C;
    margin-top: 0;
    margin-bottom: 4px;
  }

  .block.active {
    border: 1px solid #ffb11a;
    position: relative;
  }

  .block.active:after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: 0;
    right: 0;
    background-image: url("../../static/images/account-active.svg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .block {
    font-size: 14px;
    display: inline-block;
    width: 119px;
    height: 34px;
    line-height: 32px;
    border: 1px solid #DDDDE4;
    border-radius: 3px;
    margin: 10px 10px 0 0;
    cursor: pointer;
    float: left;
  }

  .icon {
    width: 14px;
    height: 14px;
    margin: 0 10px;
    vertical-align: middle;
  }

  .block.block-add {
    background-image: url("../../static/images/add.svg");
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: center;
  }
}

.info_usable {
  font-size: 12px;
  margin-bottom: 20px;
  width: 400px;
}

.info_usable .all_button {
  padding: 0 10px;
  cursor: pointer;
  color: #ffb11a;
}

.info_usable_tip {
  font-weight: 600;
  font-size: 14px;
  color: #344B6C;
  margin-left: 10px;
}
</style>
<style lang="scss">
.a-tooltip__popper.is-dark.select-account_tooltip {
  background: rgba(33, 40, 62, 1);
  box-shadow: 0 2px 4px 0 rgba(100, 107, 140, 0.3);
  border-radius: 4px;
  opacity: 0.9;
  padding: 20px;
  font-size: 14px;
  line-height: 14px;

  .title {
    font-weight: 600;
    margin-bottom: 14px;
  }

  .title_icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-image: url("../../static/images/edit-account.svg");
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
  }

  .name {
    margin-bottom: 10px;
  }
}

.hex_table_row td {
  padding: 0;
  border: none;
}
</style>
<template>
  <tr class="hex_table_row">
    <td colspan="8">
      <div class="trade-table-detail clearfix">
        <div class="deal-info">
          <p class="info_title">{{ $t('legalTrad.Tradeinformation') }}</p>
          <dl class="info_content">
            <div class="row">
              <dt>{{ $t('memberCenter.prices') }}:</dt>
              <dd>
                <p class="value price">{{ $parent.getprice(item) + ' ' + legalname }}
                  <!--({{$t('legalTrad.Refresh')}})-->
                </p>
              </dd>
            </div>
            <div class="row">
              <dt>{{ $t('legalTrad.Quantity') }}:</dt>
              <dd>
                <p class="value">{{ item.enableamount }} {{ global_get_uppercase(item.currencyname) }}</p>
              </dd>
            </div>
            <div class="row">
              <dt>{{ $t('legalTrad.Quota') }}:</dt>
              <dd>
                <p class="value">{{ $parent.getminprice(item) }}</p>
              </dd>
            </div>
            <div class="row">
              <dt>{{ $t('legalTrad.Buyer') }}:</dt>
              <dd>
                <p class="value">{{ item.nikename }}</p>
              </dd>
            </div>
            <div class="row">
              <dt>{{ $t('c2c.PaymentMethod') }}:</dt>
              <dd>
                <p class="value">{{ $parent.getpaytypestring(item) }}</p>
              </dd>
            </div>
            <div class="row">
              <dt>{{ $t('legalTrad.Location') }}:</dt>
              <dd>
                <p class="value">
                  <img :src="$parent.getarea(item).flag" style="width:25px;margin-top: 10px;">
                  {{ $parent.getarea(item).engname }}
                </p>
              </dd>
            </div>
          </dl>
          <P class="deal_tip">{{ $t('legalTrad.reminder') }}:</P>
          <p class="deal_tip_info">{{ $t('legalTrad.suggested') }}</p>
        </div>
        <div class="buy-info">
          <p class="info_title">{{ $t('legalTrad.Sellinfromation') }}</p>
          <p class="info_usable">
            {{ $t('legalTrad.Available') }}
            <span class="info_usable_tip">{{ canuseamount }} {{ global_get_uppercase(item.currencyname) }}</span>
            <span class="right all_button" @click="setAllAmount">全部</span>
          </p>
          <div class="buy_buttons_group" :class="{ 'group--error': $v.orderaddmodel.amount.$error }">
            <p class="buttons_title clearfix">
              <span class="left">{{ $t('legalTrad.Tradequantity') }}</span>
              <span v-if="!$v.orderaddmodel.amount.$require" class="right require_tip ts--opacity">{{ $t('c2c.agreater')
              }}</span>
              <span v-if="!$v.orderaddmodel.amount.$ismax" class="right require_tip ts--opacity">{{
                  $t('c2c.Cannotmaximum')
              }} {{ item.enableamount }}</span>
              <span v-if="!$v.orderaddmodel.amount.$isusable" class="right require_tip ts--opacity">{{
                  $t('c2c.Cannotavailable')
              }} {{ canuseamount }}</span>
            </p>
            <trade-number @number:focus="selecttrade = 'from'" :num.sync="$v.orderaddmodel.amount.$model"
              :tip="global_get_uppercase(item.currencyname)"></trade-number>
          </div>
          <div class="buy_buttons_group" :class="{ 'group--error': $v.orderaddmodel.price.$error }">
            <p class="buttons_title clearfix">
              <span class="left">{{ $t('legalTrad.Tradeamount') }}</span>
              <span v-if="!$v.orderaddmodel.price.$require" class="right require_tip ts--opacity">{{ $t('c2c.greater')
              }}</span>
              <span v-if="!$v.orderaddmodel.price.$ismin" class="right require_tip ts--opacity">{{ $t('c2c.minimum') }}
                {{ item.minprice }}</span>
              <span v-if="!$v.orderaddmodel.price.$ismax" class="right require_tip ts--opacity">{{ $t('c2c.maximum') }}
                {{ item.maxprice }}</span>
            </p>
            <trade-number @number:focus="selecttrade = 'to'" :num.sync="$v.orderaddmodel.price.$model"
              :tip="item.legaltype"></trade-number>
          </div>

          <div class="buy_buttons_group" :class="{ 'group--error': $v.orderaddmodel.paytypes.$error }">
            <p class="buttons_title clearfix">
              <span class="left">{{ $t('legalDeal.Collection') }}</span>
              <span v-if="$v.orderaddmodel.paytypes.$error" class="right require_tip">{{ $t('c2c.Required') }}</span>
            </p>
            <div class="select-account">
              <p class="title">{{ $t('legalTrad.multiple') }}</p>
              <div class="clearfix">
                <div v-for="(item, index) in paytypelist" :key="index">
                  <a-tooltip effect="dark" transition="" popper-class="select-account_tooltip" placement="bottom">
                    <span @click="showDetailRow(item.identifier)"
                      :class="{ 'active': isVisibleDetailRow(item.identifier) }" class="block">{{ item.identifier
                      }}</span>
                    <div slot="content">
                      <p class="clearfix">
                        <span class="title left">{{ item.identifier }}</span>
                        <span class="title_icon right" @click="gopayment"></span>
                      </p>
                      <p v-if="item.payconfiginfo.fields.length>0">
                        {{ item.payconfiginfo.fields[0].fieldname }}： {{ item.payconfiginfo.fields[0].fieldvalue }}
                      </p>
                      <p v-if="item.payconfiginfo.fields.length>1">
                        {{ item.payconfiginfo.fields[1].fieldname }}： {{ item.payconfiginfo.fields[1].fieldvalue }}
                      </p>
                    </div>
                  </a-tooltip>
                </div>
                <nuxt-link tag="span" to="/person/payment" class="block block-add"></nuxt-link>
              </div>
            </div>
          </div>
          <div class="buy_protocol ovh">
            <p class="fl" @click="ischecked = !ischecked">
              <span class="checkbox" :class="{ 'active': ischecked }"></span>
              <span class="">{{ $t('legalTrad.agreed') }}</span>
            </p>
            <span class="buy_protocol_tip fl" @click="popup">{{ $t('legalTrad.agreement') }}</span>
          </div>
          <terms @close="popup" v-show="popupStatue" terms_channelid="20" subtitle="yhxy" />
          <div>
            <span :class="{ 'disabled': !ischecked }" v-hex-loading="orderaddloading" @click="orderadd"
              class="buy-button">{{ $t('legalTrad.Submit') }}</span>
          </div>
        </div>
      </div>
    </td>
  </tr>

</template>
<script>
import tradeNumber from '@/components/public/trade-number'
import { required } from 'vuelidate/lib/validators'
import terms from "@/components/public/terms-service.vue";

export default {
  name: 'articles',
  validations: {
    orderaddmodel: {
      price: {
        $require(val) {
          val = parseFloat(val)
          if (!val) {
            return false
          }
          return true
        },
        $ismin(val) {
          val = parseFloat(val)
          const min = parseFloat(this.item.minprice)
          let _state = true
          if (val && min > 0 && val < min) {
            _state = false
          }
          return _state
        },
        $ismax(val) {
          val = parseFloat(val)
          const max = parseFloat(this.item.maxprice)
          let _state = true
          if (val && max > 0 && val > parseFloat(this.item.maxprice)) {
            _state = false
          }
          return _state
        }
      },
      amount: {
        $require(val) {
          val = parseFloat(val)
          if (!val) {
            return false
          }
          return true
        },
        $ismax(val) {
          val = parseFloat(val)
          const max = parseFloat(this.item.enableamount)
          let _state = true
          if (val && val > max) {
            _state = false
          }
          return _state
        },
        $isusable(val) {
          val = parseFloat(val)
          let _state = true
          const max = parseFloat(this.item.enableamount)
          if (val && val <= max && val > this.canuseamount) {
            _state = false
          }
          return _state
        }
      },
      paytypes: {
        required
      }
    }
  },
  components: {
    tradeNumber, terms
  },
  props: ['item'],
  computed: {
    /*获取支付方式*/
    getpaytype: function () {
      return this.visibleDetailRows.join(',')
    },
    legalname: function () {
      return this.item.legaltype
    },
    unitprice: function () {
      return this.$parent.getprice(this.item)
    },
  },
  watch: {
    'visibleDetailRows': function (val) {
      this.orderaddmodel.paytypes = val.join(',')
    },
    'orderaddmodel.price': function (val) {
      if (this.selecttrade == 'to') {
        this.orderaddmodel.amount = this.global_get_tofixed(this.$np.divide(val, this.unitprice))
      }
    },
    'orderaddmodel.amount': function (val) {
      if (this.selecttrade == 'from') {
        this.orderaddmodel.price = this.global_get_tofixed(this.$np.times(val, this.unitprice))
      }
    }
  },
  data() {
    return {
      popupStatue: false,
      selecttrade: '',
      to: '',
      from: '',
      ischecked: true,
      orderaddloading: false,
      visibleDetailRows: [],
      orderaddmodel: this.getnewmodel(),
      canuseamount: 0,
      payconfiglist: [],
      paytypelist: []
    }
  },
  mounted() {
    var _self = this;
    this.payconfiglist = this.item.payconfiglist;
    this.$store.dispatch('trading_user_c2c_userc2cassets_get', { currencyname: this.item.currencyname })
      .then((res) => {
        if (res.data && res.data.length == 1) {
          _self.canuseamount = res.data[0].canuseamount;
          this.getmayaccount();
        }
      })
  },
  methods: {
    /*设置全部交易数量*/
    setAllAmount() {
      this.selecttrade = 'from'
      this.orderaddmodel.amount = this.canuseamount
    },
    getmayaccount() { /*获取下单用户收款账号*/
      var _self = this;
      this.$store.dispatch('user_user_payments_get').then(({ data }) => {
        if (data) {
          data.forEach((item) => {
            if (item.typecode == "bank" && _self.payconfiglist.filter(t => t.typecode == "bank").length > 0) {
              _self.paytypelist.push(item)
            }
            else if (_self.payconfiglist.filter(t => t.identifier == item.identifier).length > 0) {
              _self.paytypelist.push(item)
            }
          })
        }
      })
    },
    getnewmodel() {
      return {
        price: '',
        amount: '',
        orderid: '',
        paytypes: []
      }
    },
    gopayment() {
      this.$router.push('/person/payment')
    },
    isVisibleDetailRow(id) {
      return this.visibleDetailRows.indexOf(id) >= 0
    },
    showDetailRow(id) {
      if (!this.isVisibleDetailRow(id)) {
        this.visibleDetailRows.push(id)
      } else {
        this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(id), 1);
      }
      this.$forceUpdate()
    },
    popup() {
      this.popupStatue = !this.popupStatue;
    },
    /*用户下单*/
    orderadd() {
      if (!this.ischecked) {
        return
      }
      let _state = false
      this.$v.$touch()
      if (this.$v.$invalid) {
        _state = true
      }
      if (_state) {
        return
      }
      if (this.orderaddloading) {
        return
      }
      this.orderaddloading = true
      const newmodel = Object.assign({}, this.orderaddmodel)
      newmodel.orderid = this.item.id
      newmodel.price = parseFloat(newmodel.price)
      newmodel.amount = parseFloat(newmodel.amount)
      this.$store.dispatch('trading_c2c_order_add', newmodel).then(({ data }) => {
        if (data) {
          this.$parent.getorderdetail(data)
            .then((orderdata) => {
              this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Ordered') })
              this.orderaddmodel = this.getnewmodel()
              this.$v.$reset()
              this.$router.push({ path: '/trade/' + data })
              this.orderaddloading = false
            })
        } else {
          this.orderaddloading = false
        }
      })
    }
  }
}
</script>

