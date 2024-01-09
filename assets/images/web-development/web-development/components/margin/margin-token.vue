<template>
  <!--账户杠杆信息-->
  <div class="leverage-account_block">
    <div class="leverage-account_block-bg">

      <!--  class="text-right" -->
      <div class="pb-2" v-if="normalView">
        <!--   -->
        <a-popover overlayClassName="risk-rate-popover"  placement="bottom" trigger="hover">
          <div class="py-3 px-2" slot="content" style="width:550px">
            <a-row type="flex" justify="space-between">
              <a-col :span="6" class="leverage-account-col">
                <p>
                  <small>
                    {{ $t('leverage.Balance') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('wallet.freeze2') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('leverage.canBorrow') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('leverage.borrowed') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('wallet.usable') }}
                  </small>
                </p>
              </a-col>
              <a-col :span="6" class="leverage-account-col"
                style="border-right: 1px dashed #aaa;text-align: right;padding-right: 20px;">
                <p>
                  {{ leverageCtidInfo.famount ? global_get_tofixed(leverageCtidInfo.famount,
                    symbleinfo.amountdigits) :
                    0
                  }} {{ symbleinfo.fcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.ffrozenamount ? global_get_tofixed(leverageCtidInfo.ffrozenamount,
                    symbleinfo.amountdigits) :
                    0
                  }} {{ symbleinfo.fcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.fcanborrowamount ? global_get_tofixed(leverageCtidInfo.fcanborrowamount,
                    symbleinfo.amountdigits) : 0
                  }} {{ symbleinfo.fcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.fborrowamount ? global_get_tofixed(leverageCtidInfo.fborrowamount,
                    symbleinfo.amountdigits) :
                    0
                  }} {{ symbleinfo.fcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.fcanuseamount ? global_get_tofixed(leverageCtidInfo.fcanuseamount,
                    symbleinfo.amountdigits) : 0
                  }} {{ symbleinfo.fcurrencyname }}
                </p>
              </a-col>
              <a-col :span="6" style="padding-left: 20px;" class="leverage-account-col">
                <p>
                  <small>
                    {{ $t('leverage.Balance') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('wallet.freeze2') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('leverage.canBorrow') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('leverage.borrowed') }}
                  </small>
                </p>
                <p>
                  <small>
                    {{ $t('wallet.usable') }}
                  </small>
                </p>
              </a-col>
              <a-col :span="6" style="text-align: right" class="leverage-account-col">
                <p>
                  {{ leverageCtidInfo.tamount ? global_get_tofixed(leverageCtidInfo.tamount,
                    symbleinfo.pricedigits) : 0
                  }} {{ symbleinfo.tcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.tfrozenamount ? global_get_tofixed(leverageCtidInfo.tfrozenamount,
                    symbleinfo.pricedigits) : 0
                  }} {{ symbleinfo.tcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.tcanborrowamount ? global_get_tofixed(leverageCtidInfo.tcanborrowamount,
                    symbleinfo.pricedigits) : 0
                  }} {{ symbleinfo.tcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.tborrowamount ? global_get_tofixed(leverageCtidInfo.tborrowamount,
                    symbleinfo.pricedigits) : 0
                  }} {{ symbleinfo.tcurrencyname }}
                </p>
                <p>
                  {{ leverageCtidInfo.tcanuseamount ? global_get_tofixed(leverageCtidInfo.tcanuseamount,
                    symbleinfo.pricedigits) : 0
                  }} {{ symbleinfo.tcurrencyname }}
                </p>
              </a-col>
            </a-row>
            <p style="padding-top: 10px;color: #ADB1B8;font-size: 12px;">
              {{ $t('leverage.triggerBurst') }}
            </p>
          </div>
          <small class="margin-coin mx-1">
            <span>{{ `${symbleinfo.fcurrencyname}/${symbleinfo.tcurrencyname}` }}</span>
            <span><i>{{ borrowmultiple }}X</i></span>
          </small>
        </a-popover>

        <span style="padding:0 10px;" class="mx-2">{{ $t('contract.explosionprice') }}
          {{ setExplosionPrice(leverageCtidInfo.explosionprice, symbleinfo.tcurrencyname) }}
          {{ symbleinfo.tcurrencyname }}
        </span>

        <AppTooltip :text="$t('leverage.riskRate')" :title="$t('leverage.riskRate1')" />

        <span v-if="Number(leverageCtidInfo.riskrate) >= 2 || Number(leverageCtidInfo.riskrate) == 0">({{
          $t('leverage.risk') }})</span>
        <span v-if="Number(leverageCtidInfo.riskrate) < 2 && Number(leverageCtidInfo.riskrate) > 0">({{
          $t('leverage.haveRisk') }})</span>
        <div class="leverage-progress" :style="{ width: ('auto') }" v-if="Number(leverageCtidInfo.riskrate) > 0">
          <div class="leverage-progress-text" :class="[{ 'success-active': hasRisk }, 'red-active']">
            {{ `${global_get_tofixed(leverageCtidInfo.riskrate * 100, 2)}%` }}
          </div>
          <div class="leverage-progress-bar" :style="{ display: ('none') }">
            <div class="leverage-progress-bar_outer">
              <div class="leverage-progress-bar_inner" :style="{ width: percentage }">
              </div>
            </div>
          </div>
          <div class="leverage-progress-text" :style="{ display: ('none') }">0%</div>
        </div>
      </div>

      <a-row class="not-normal-view mt-2 mx-2" v-else>
        <a-col :lg="19">
          <span class=" gray-black risk">{{ $t('leverage.riskRate') }} : </span>
          <a-popover width="auto" placement="bottom" trigger="hover">

            <div slot="content">
              <span class=" mx-2">{{ $t('contract.explosionprice') }}
                {{ setExplosionPrice(leverageCtidInfo.explosionprice, symbleinfo.tcurrencyname) }}
                {{ symbleinfo.tcurrencyname }}
              </span>
            </div>
            <span class="leverage-progress-text pointer mr-1 " :class="[{ 'success-active': hasRisk }, 'red-active']">
              {{ `${riskRate}%` }}
            </span>
          </a-popover>

          <a-popover>
            <div slot="content">
              <span>
                {{ $t('leverage.riskRate') + ' = ' + $t('leverage.riskRate1') }}
              </span>
            </div>

            <img src="/images/info-circle1.svg" />


          </a-popover>




        </a-col>

        <a-col :lg="5">
          <a-popover overlayClassName="risk-rate-popover" placement="bottom" trigger="hover">
            <div slot="content" style="width:500px">
              <a-row type="flex" justify="space-between">
                <a-col :span="6" class="leverage-account-col">
                  <p>
                    <small>
                      {{ $t('leverage.Balance') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('wallet.freeze2') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('leverage.canBorrow') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('leverage.borrowed') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('wallet.usable') }}
                    </small>
                  </p>
                </a-col>
                <a-col :span="6" class="leverage-account-col"
                  style="border-right: 1px dashed #aaa;text-align: right;padding-right: 20px;">
                  <p>
                    {{ leverageCtidInfo.famount ? global_get_tofixed(leverageCtidInfo.famount, symbleinfo.amountdigits)
                      :
                      0
                    }} {{ symbleinfo.fcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.ffrozenamount ? global_get_tofixed(leverageCtidInfo.ffrozenamount,
                      symbleinfo.amountdigits) :
                      0
                    }} {{ symbleinfo.fcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.fcanborrowamount ? global_get_tofixed(leverageCtidInfo.fcanborrowamount,
                      symbleinfo.amountdigits) : 0
                    }} {{ symbleinfo.fcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.fborrowamount ? global_get_tofixed(leverageCtidInfo.fborrowamount,
                      symbleinfo.amountdigits) :
                      0
                    }} {{ symbleinfo.fcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.fcanuseamount ? global_get_tofixed(leverageCtidInfo.fcanuseamount,
                      symbleinfo.amountdigits) : 0
                    }} {{ symbleinfo.fcurrencyname }}
                  </p>
                </a-col>
                <a-col :span="6" style="padding-left: 20px;" class="leverage-account-col">
                  <p>
                    <small>
                      {{ $t('leverage.Balance') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('wallet.freeze2') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('leverage.canBorrow') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('leverage.borrowed') }}
                    </small>
                  </p>
                  <p>
                    <small>
                      {{ $t('wallet.usable') }}
                    </small>
                  </p>
                </a-col>
                <a-col :span="6" style="text-align: right" class="leverage-account-col">
                  <p>
                    {{ leverageCtidInfo.tamount ? global_get_tofixed(leverageCtidInfo.tamount,
                      symbleinfo.pricedigits) : 0
                    }} {{ symbleinfo.tcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.tfrozenamount ? global_get_tofixed(leverageCtidInfo.tfrozenamount,
                      symbleinfo.pricedigits) : 0
                    }} {{ symbleinfo.tcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.tcanborrowamount ? global_get_tofixed(leverageCtidInfo.tcanborrowamount,
                      symbleinfo.pricedigits) : 0
                    }} {{ symbleinfo.tcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.tborrowamount ? global_get_tofixed(leverageCtidInfo.tborrowamount,
                      symbleinfo.pricedigits) : 0
                    }} {{ symbleinfo.tcurrencyname }}
                  </p>
                  <p>
                    {{ leverageCtidInfo.tcanuseamount ? global_get_tofixed(leverageCtidInfo.tcanuseamount,
                      symbleinfo.pricedigits) : 0
                    }} {{ symbleinfo.tcurrencyname }}
                  </p>
                </a-col>
              </a-row>
              <p style="padding-top: 10px;color: #ADB1B8;font-size: 12px;">
                {{ $t('leverage.triggerBurst') }}
              </p>
            </div>
            <p class="mb-0">
              <small class="margin-coin more">
                {{ $t('stratergybot.sb9') }}
                <img src="/images/open.svg" />
                <!-- <span>{{ `${symbleinfo.fcurrencyname}/${symbleinfo.tcurrencyname}` }}</span>
                <span><i>{{ borrowmultiple }}X</i></span> -->
              </small>
            </p>
          </a-popover>
        </a-col>

      </a-row>







    </div>
  </div>
  <!--账户杠杆信息 END-->
</template>
<script>
import AppTooltip from '../App/AppTooltip.vue'

export default {
  name: 'margin-token',
  components: { AppTooltip },
  computed: {},
  props: ['symbleinfo', 'leverageCtidInfo'],

  data() {
    return {
      percentage: 0,
      borrowmultiple: 0,
      normalView: false,
    }
  },
  computed: {
    riskRate: function () {
      const rate = this.global_get_tofixed(this.leverageCtidInfo.riskrate * 100, 2)
      return rate == 0 ? '0.00' : rate
    },
    hasRisk: function () {
      return Number(this.leverageCtidInfo.riskrate) >= 2 || Number(this.leverageCtidInfo.riskrate) == 0
    }
  },
  watch: {
    'leverageCtidInfo': function (val) {
      this.borrowmultiple = this.symbleinfo.borrowmultiple;
      if (Number(val.riskrate) <= 1.1 && Number(val.riskrate) > 0) {
        this.percentage = '100%';
      } else if (Number(val.riskrate) > 1.1 && Number(val.riskrate) < 2) {
        this.percentage = `${((val - 1.1) / (2 - 1.1)) * 100}%`;
      } else {
        this.percentage = 0;
      }
    }
  },
  methods: {
    setExplosionPrice(n, m) {
      if (Number(n) <= 0) {
        return 0;
      } else {
        return this.global_get_tofixed(n, this.global_get_decimal(m).a);
      }
    }
  },
  mounted() {
    //console.log('RoUTE: ', this.$route)
    if (this.$route.name == 'margin-id') {
      this.normalView = true
    } else
      this.normalView = false
  },
}
</script>

<style lang='less'>
@import '../../static/styles/color.less';

.ant-popover-inner {
  background: @cl_1E252B;

}

.ant-popover-inner-content {
  color: #fff !important;

  p {
    // margin: 0px;

  }
}

small {
  color: @cl_ADB1B8;
}

.leverage-account-col {

  p,
  small {
    font-size: 14px;
    height: 24px;
  }
}

.leverage-account_block {
  color: #b0b8db;
  font-size: 12px;

  .leverage-account_block-bg {
    background-color: #12181D;
    padding: 8px 10px 8px 8px;

    .leverage-progress-text {
      border-bottom: 1px solid;
      border-bottom-style: dashed;
    }

    .lq-price,
    .risk,
    .more {
      font-size: 14px;
    }


    small {
      cursor: default;
      color: #ffb11a;
      background: url(../../static/images/open.svg) no-repeat 0 0;
      padding-left: 16px;
      font-size: 12px;

      i {
        font-style: normal;
        border: 1px solid #ffb11a;
        padding: 0 3px;
        border-radius: 2px;
        color: #ffb11a;
        display: inline-block;
        height: 15px;
        line-height: 13px;
      }

      &:hover {
        color: #ffb11a;
        cursor: pointer;
        background: url(../../static/images/fold.svg) no-repeat 0 6px;
      }
    }

    .tooltip-icon:hover {
      background-image: url("../../static/images/tip-active.svg");
    }

    .tooltip-icon {
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: bottom;
      background-repeat: no-repeat;
      background-size: 14px 14px;
      background-position: center;
      background-image: url("../../static/images/tip.svg");
      cursor: pointer;
    }

    em {
      font-style: normal;
      cursor: default;
      color: #b0b8db;

      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYyMDU5NDc3NTYxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzODIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiAxMjhjMjEyIDAgMzg0IDE3MiAzODQgMzg0UzcyNCA4OTYgNTEyIDg5NiAxMjggNzI0IDEyOCA1MTJzMTcyLTM4NCAzODQtMzg0bTAtNjRDMjY0LjggNjQgNjQgMjY0LjggNjQgNTEyczIwMC44IDQ0OCA0NDggNDQ4IDQ0OC0yMDAuOCA0NDgtNDQ4Uzc1OS4yIDY0IDUxMiA2NHoiIHAtaWQ9IjMzODMiIGZpbGw9IiNiMGI4ZGIiPjwvcGF0aD48cGF0aCBkPSJNNDgwIDcwNGg2NHY2NGgtNjR6IG0wLTQ0OGg2NHYzODRoLTY0eiIgcC1pZD0iMzM4NCIgZmlsbD0iI2IwYjhkYiI+PC9wYXRoPjwvc3ZnPg==');
      background-repeat: no-repeat;
      padding-left: 18px;
      background-position: 0 -1px;

      &:hover {
        color: #14a2a5;
        background-image: url("../../static/images/plaint.svg");
      }
    }

    .not-normal-view {
      small {
        background: unset !important;
        padding-left: 0px;
      }



      em {
        background-image: url("../../static/images/info-circle1.svg");

      }
    }
  }

  .margin-coin {
    span {
      display: inline-block;
    }

    div {
      display: inline
    }
  }

  .leverage-progress {
    display: inline-block;
    position: relative;
    line-height: 1;

    .leverage-progress-bar {
      display: inline-block;
      vertical-align: middle;
      width: 62%;
      box-sizing: border-box;

      .leverage-progress-bar_outer {
        height: 6px;
        border-radius: 100px;
        background-color: #000;
        overflow: hidden;
        position: relative;
        vertical-align: middle;

        .leverage-progress-bar_inner {
          background-color: #e6a23c;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-align: right;
          border-radius: 100px;
          line-height: 1;
          white-space: nowrap;
        }
      }
    }

    .leverage-progress-text {
      font-size: 12px;
      color: #e6a23c;
      display: inline-block;
      line-height: 1;
    }

    .toast-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: sub;
      background-image: url("../../static/images/tip-active.svg");
    }
  }

  .border {
    border: 1px solid red;
  }
}</style>
