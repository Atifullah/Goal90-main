<template>
  <div class="application-loan">
    <p>{{ $t('leverage.numberLoans') }}</p>
    <div class="deal_input">
      <div class="deal_input_num">
        <hex-number :fix="symbleinfo.amountdigits" :num.sync="loanAmount" @number:focus="showMaxLoanAmount"
          @number:blur="showMaxLoanAmount" class='loan-number-control'></hex-number>
      </div>
      <span v-show="maxLoanAmountToast" class="loan-toast">
        {{ $t("leverage.most") }}：<span>{{ global_get_tofixed(loanAble, (distinguish == 'from' ? symbleinfo.amountdigits:symbleinfo.pricedigits)) }} {{
             (distinguish == 'from' ? symbleinfo.fcurrencyname : symbleinfo.tcurrencyname)
        }}</span></span>
      <p class="deal_input_tip">
        <span class="tip_title">{{ (distinguish == 'from' ? symbleinfo.fcurrencyname : symbleinfo.tcurrencyname) }}</span>
      </p>
    </div>
    <hex-slider :dec="getLoanDec" @slider:change="getLoanAmount"></hex-slider>
    <button class='commitBtn button-loading--por' v-if="$userinfo.uid" v-hex-loading="loading"
      @click="applicationLoanSubmit">{{ $t("leverage.Application") + ' ' + (distinguish ==
          'from' ? symbleinfo.fcurrencyname : symbleinfo.tcurrencyname)
      }}
    </button>
    <div class="commitBtn no_login" v-else>
      <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>
      /
      <nuxt-link to="/register" tag="span" class="repeal">{{ $t("home.headRegister") }}</nuxt-link>
    </div>
  </div>
</template>
<script>
import hexNumber from '@/components/public/number'
import slider from '@/components/public/slider'

export default {
  name: 'loans',
  components: {
    'hex-number': hexNumber,
    'hex-slider': slider
  },
  computed: {
    loanAble: function () {
      if (this.distinguish === 'from')
        return this.global_get_tofixed(this.canLoanCurrencyInfo.fcanborrowamount, this.symbleinfo.amountdigits);
      else
        return this.global_get_tofixed(this.canLoanCurrencyInfo.tcanborrowamount, this.symbleinfo.pricedigits);
    },
    getLoanDec() {
      if (!this.loanAble) {
        return 0
      }
      return Math.ceil((this.loanAmount / this.loanAble) * 100)
    }
  },
  props: {
    symbleinfo: {
      type: Object
    },
    canLoanCurrencyInfo: {
      type: Object
    },
    distinguish: '',
  },
  data() {
    return {
      loading: false,
      maxLoanAmountToast: false,
      loanAmount: '',
    }
  },
  mounted() {
  },
  watch: {},
  methods: {
    getLoanAmount(num) {
      const n = this.global_get_tofixed(this.loanAble * num, symbleinfo.amountdigits)
      this.loanAmount = n
    },
    showMaxLoanAmount() {
      this.maxLoanAmountToast = !this.maxLoanAmountToast;
    },
    applicationLoanSubmit() {
      var _self=this;
      if (this.loading) return
      this.loading = true
      if (Number(this.loanAmount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('leverage.volumeLzero') })
        this.loading = false
        return
      }
      if (Number(this.loanAmount) > Number(this.loanAble)) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('leverage.loanable') })
        this.loading = false
        return
      }
      let _ = {};
      if (this.distinguish === 'from') {
        _.loancurrencyid = this.canLoanCurrencyInfo.fid
      } else {
        _.loancurrencyid = this.canLoanCurrencyInfo.tid
      }
      const params = Object.assign({}, {
        uid: this.$userinfo.uid,
        key: this.$userinfo.secretkey,
        ctid: this.canLoanCurrencyInfo.ctid,
        loancurrencyamount: this.loanAmount
      }, _);
      this.$store.dispatch('userborrowmoney_user_borrow_add', params)
        .then((res) => {
          if (res.data) {
            _self.$emit('loan:success');
            _self.$pubsub.publish(_self.$pubsub.getOrderList) //借币成功之后，刷新资产信息与借币列表
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
          }
          _self.loading = false;
        })
    }
  }
}
</script>
<style lang='less' scoped>
.deal_input {
  height: 42px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  position: relative;

  .deal_input_num {
    flex: auto;
    padding: 0 15px;
    line-height: 40px;

    input {
      font-size: 16px;
      width: 100%;
      border: none;
      padding-left: 0;
      height: 30px;
      line-height: 30px;
    }
  }

  .deal_input_tip {
    line-height: 40px;
    font-size: 0;
  }

  .tip_title,
  .tip_all {
    padding: 4px 20px;
    font-size: 14px;
  }

  .tip_title {
    color: #999999 !important;
    border-right: 1px solid #EEEEEE
  }

  .tip_all {
    color: #14a2a5 !important;
    cursor: pointer;
  }
}

.application-loan {
  margin-top: 30px;
  color: #aaa;

  p {
    margin-bottom: 6px;
  }

  .commitBtn {
    width: 100%;
    border-radius: 4px;
    margin-top: 15px;
  }

  .no_login {
    text-align: center;
    cursor: pointer;
    background: #5e6573;

    &:hover {
      background: #5e6573 !important;
    }
  }

  .loan-toast {
    position: absolute;
    background-color: #eee;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 0 10px;
    width: 100%;
    color: #14a2a5;
    top: 40px;
  }
}
</style>