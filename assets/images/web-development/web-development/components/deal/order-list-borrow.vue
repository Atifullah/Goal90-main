<template>
  <div class='leverage hex-flex_auto popup repayment-popup'>
    <div class="mask"></div>
    <div class='mask-content'>
      <div class="head">
        <span class="close" @click='close(0)'>
          <img src="@/static/images/an_close.png" alt="">
        </span>
      </div>
      <div class='info'>
        <div class="leverage-operate-borrow">
          <a-row type="flex" justify="space-between">
            <a-col :span="11">
              <h2>{{ symbleinfo.fcurrencyname.toUpperCase() }} {{ $t('leverage.borrowing') }}</h2>
              <a-row type="flex" justify="space-between">
                <a-col :span="8">
                  <dl>
                    <dt>{{ $t('leverage.borrowed') }}</dt>
                    <dd>{{ leverageCtidInfo.fborrowamount ? global_get_tofixed(leverageCtidInfo.fborrowamount,
                        symbleinfo.amountdigits) :
                        0
                    }}</dd>
                  </dl>
                </a-col>

                <a-col :span="8">
                  <dl>
                    <dt>
                      {{ $t('leverage.canBorrow') }}
                      <a-tooltip placement="top">
                        <div slot="content">{{ $t('leverage.canBorrow1') }}</div>
                        <a-button>
                          <i class="tooltip-icon"></i>
                        </a-button>
                      </a-tooltip>
                    </dt>
                    <dd>{{ leverageCtidInfo.fcanborrowamount ? global_get_tofixed(leverageCtidInfo.fcanborrowamount,
                        symbleinfo.amountdigits) : 0
                    }}</dd>
                  </dl>
                </a-col>

                <a-col :span="8">
                  <dl>
                    <dt style="min-width: 122px;">
                      {{ $t('leverage.dailyInterestRate') }}
                      <a-tooltip placement="top">
                        <div slot="content">
                          {{ $t('leverage.dailyInterestRate1') }}
                          <br />
                          {{ $t('leverage.dailyInterestRate2') }}
                        </div>
                        <a-button>
                          <i class="tooltip-icon"></i>
                        </a-button>
                      </a-tooltip>
                    </dt>
                    <dd>{{ (symbleinfo.borrowrate*100)+'%' }}</dd>
                  </dl>
                </a-col>
              </a-row>
              <hex-loan :symbleinfo="symbleinfo" :distinguish="from" @loan:success="loanSuccess"
                :canLoanCurrencyInfo="leverageCtidInfo" />
            </a-col>
            <a-col :span="11">
              <h2>{{ symbleinfo.tcurrencyname.toUpperCase() }} {{ $t('leverage.borrowing') }}</h2>
              <a-row type="flex" justify="space-between">
                <a-col :span="8">
                  <dl>
                    <dt>{{ $t('leverage.borrowed') }}</dt>
                    <dd>{{ leverageCtidInfo.tborrowamount ? global_get_tofixed(leverageCtidInfo.tborrowamount,
                        symbleinfo.amountdigits) :
                        0
                    }}</dd>
                  </dl>
                </a-col>
                <a-col :span="8">
                  <dl>
                    <dt>
                      {{ $t('leverage.canBorrow') }}
                      <a-tooltip placement="top">
                        <div slot="content">{{ $t('leverage.canBorrow1') }}</div>
                        <a-button>
                          <i class="tooltip-icon"></i>
                        </a-button>
                      </a-tooltip>
                    </dt>
                    <dd>{{ leverageCtidInfo.tcanborrowamount ? global_get_tofixed(leverageCtidInfo.tcanborrowamount,
                        symbleinfo.amountdigits) : 0
                    }}</dd>
                  </dl>
                </a-col>
                <a-col :span="8">
                  <dl>
                    <dt style="min-width: 122px;">
                      {{ $t('leverage.dailyInterestRate') }}
                      <a-tooltip placement="top">
                        <div slot="content">
                          {{ $t('leverage.dailyInterestRate1') }}
                          <br />
                          {{ $t('leverage.dailyInterestRate2') }}
                        </div>
                        <a-button>
                          <i class="tooltip-icon"></i>
                        </a-button>
                      </a-tooltip>
                    </dt>
                    <dd>{{ (symbleinfo.borrowrate*100)+'%' }}</dd>
                  </dl>
                </a-col>
              </a-row>
              <hex-loan :distinguish="to" :symbleinfo="symbleinfo" @loan:success="loanSuccess"
                :canLoanCurrencyInfo="leverageCtidInfo" />
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import loans from "@/components/margin/loans";
export default {
  name: "order-borrow",
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    leverageCtidInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    "hex-loan": loans
  },
  data() {
    return {
      to: "to",
      from: "from"
    };
  },
  methods: {
    loanSuccess() {
      this.applicationApproved = true;
      this.$emit('closePopup', 0);
    },
    close() {
      this.repayment = '';
      this.$emit('closePopup', 0);
    }
  },
  created() {

  }
};
</script>
<style lang='less' scoped>
@import "../../static/styles/auth.less";

.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.close {
  cursor: pointer
}

.auth-content_group_mail .mail_code {
  height: 40px;
}

.auth-content_group.auth-content_group_code .title.clearfix {
  width: 400px;
}

.auth-content_group.auth-content_group_code .title.clearfix .left {
  width: 270px;
}

.auth-content_group.auth-content_group_code .title.clearfix .fr {
  color: #bbb;
}

.auth-content_group.auth-content_group_code .title .left,
.popup .mask-content span {
  font-size: 12px;
  height: inherit;
  color: @cl_fff;
}

.popup .mask-content {
  width: 840px;
}

.popup .mask-content .left,
.popup .mask-content .right,
.auth-content_group.auth-content_group_code .title .cl_ccc span,
  .label-tip {
  color: rgba(102, 102, 102, 1);
}

.popup .mask-content .right {
  color: #aaa;
  font-weight: normal;
}

.auth-content_group input {
  color: rgb(51, 51, 51);
}

.auth-content_group .form_error {
  font-size: 12px;
  margin-top: 4px;
  color: #CD4559;
}

.deal_input {
  height: 46px;
  border-radius: 2px;
  border: 1px solid #dcdfe6;
  display: flex;
  flex-direction: row;

  .deal_input_num {
    flex: auto;
    padding: 0 15px;
    line-height: 44px;

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
    line-height: 44px;
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
    color: @cl_link !important;
    cursor: pointer;
  }
}

.coinName {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  color: #666;
  font-size: 12px;
  width: 400px;
  background: rgba(240, 240, 240, 1);
}

.head span.title {
  font-size: 16px;
  color: #333333;
  font-weight: 600;
  display: initial;
}

.commitBtn {
  cursor: pointer;
}

/*usdt提现*/
.el-radio-group {
  margin-bottom: 10px
}

.amount-set {
  font-size: 12px;
  color: #aaaaaa;
}

.transfer {
  .left {
    line-height: 40px;
  }

  img {
    width: 30px;
    margin: 4px 0;
    transform: translateX(-9px);
  }

  .coinName {
    width: 100%;
  }
}

.currency-type {
  background-color: #f0f0f0;
  text-align: center;
  color: #aaa;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  cursor: pointer;
}

.tooltip-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: sub;
  background-repeat: no-repeat;
  background-size: 14px 14px;
  background-position: center;
  background-image: url("../../static/images/tip-active.svg");
  cursor: pointer;
}

.tooltip-icon:hover {
  background-image: url("../../static/images/tip-active.svg");
}

.currency-type.active {
  background: url('/images/sign.png') no-repeat right bottom @cl_link;
  color: #fff;
}

.leverage-operate-borrow {
  dl {
    font-size: 12px;
  }

  h2 {
    font-weight: normal;
    margin-bottom: 15px;
  }
}

.el-button {
  padding: 0;
  border: none;
  background: #fff
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 10px 0 24px 0;
}

.el-divider {
  background-color: #eee;
  position: relative;
}
</style>
