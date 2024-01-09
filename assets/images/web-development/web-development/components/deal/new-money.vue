<template>
  <div>
    <div class="new-money px-3">
      <div class="money-type">
        <div class="col-alignment" style="width: 100%">
          <div class="coin-list-popover-icon" v-if="$route.name.indexOf('pro') > -1">
            <a-popover :title="false" trigger="hover" placement="bottomLeft" :overlay-class-name="$store.state.hex_client_background.active === 'day'
              ? 'coin-list-popover-day'
              : 'coin-list-popover-night'
              ">
              <template slot="content">
                <div style="width: 320px">
                  <hex-coinlist style="height: 380px" :dailyDetail="dailyDetail" :symbleinfo="symbleinfo"
                    :symbletype="getSymbleType" :searchvalue="''" />
                </div>
              </template>
              <div class="icon-img" @mouseover="hoverKey = 22" @mouseleave="hoverKey = -1"
                :class="hoverKey == 22 ? 'active-up-arrow' : ''">
                <img :src="hoverKey == 22
                  ? '/images/coin-list-dropdown-active.svg'
                  : '/images/coin-list-dropdown.svg'
                  " />
              </div>
            </a-popover>
          </div>
          <div>
            <nuxt-link :to="`/market/detail?currency=${symbleinfo.fcurrencyname
              ? symbleinfo.fcurrencyname.toLowerCase()
              : ''
              }`">
              <img v-if="symbleinfo.icon" class="type-logo" :src="symbleinfo.icon" :alt="symbleinfo.fcurrencyname" />
            </nuxt-link>
          </div>
          <div class="pl-2 pr-3">
            <nuxt-link :to="`/market/detail?currency=${symbleinfo.fcurrencyname
              ? symbleinfo.fcurrencyname.toLowerCase()
              : ''
              }`">
              <p class="mb-0 line-h3">
                <span class="type-weight">{{ symbleinfo.fcurrencyname }}</span>
                <span class="type-weight">{{ symbleinfo.tcurrencyname == "YX" ? "" : "/" }}</span>

                <span class="type-weight">{{ symbleinfo.tcurrencyname == "YX" ? $t("contract.swap")
                  : symbleinfo.tcurrencyname }}</span>

                <span class="margin-label" v-if="symbletype == -1"> {{ symbleinfo.borrowmultiple }}X</span>
              </p>
              <p class="type-normal fw-4 mb-0">
                {{ coinFullName }}
                <img src="/images/coin-profile.svg" class="pl-1 pointer" />
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <ul class="new-money-list mb-0">
          <li class="mt-1">
            <span class="new-money-num" v-if="copeDailyDetail.symble">
              <span class="new-money-price" :class="currentMarketPrice.direction > 0 ? 'success-active' : 'red-active'">
                {{ global_get_tofixed(currentMarketPrice.price, dcs.p) }}
              </span>
              <p class="new-money-dot mb-0">
                {{ $store.getters.get_client_exchange_rate_name.mark }}
                {{ getNewMarketClientRate(currentMarketPrice.price) }}
              </p>
            </span>
            <span v-else> -- </span>
          </li>
          <li v-if="symbletype == 1 && copeDailyDetail.mp > 0">
            <a-tooltip placement="top" overlayClassName="mark-price-tip">
              <div slot="title">
                {{ $t("index.latestmark") }}{{ global_get_tofixed(indexPrice, dcs.p) }}
              </div>
              <span class="new-money-title fw-5 help">{{ $t("index.mark") }}</span>
            </a-tooltip>

            <p class="new-money-num mb-0" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">
                {{ global_get_tofixed(copeDailyDetail.mp, dcs.p) }}
              </span>
            </p>
            <p v-else>--</p>
          </li>
          <li v-if="symbletype == 1">
            <span class="new-money-title fw-5" @click="$router.push('/contract/data?tab=1')">{{ $t("deal.index") }}</span>
            <p class="new-money-num pointer mb-0" v-if="copeDailyDetail.symble"
              @click="$router.push('/contract/data?tab=1')">
              <span class="new-money-dot">{{
                global_get_tofixed(indexPrice, dcs.p)
              }}</span>
            </p>
            <p v-else>--</p>
          </li>
          <li v-if="symbletype == 1">
            <a-tooltip placement="top" overlayClassName="funding-countdown-tip">
              <div slot="title">
                {{ $t("index.fund_countown") }} <a
                  href="/help-dashboard/7?mainChannel=82&subItemTitle=introducing-future-funding-rates-to-BitNasdaq">{{
                    $t('express.exp16') }}</a>
              </div>

              <span class="new-money-title fw-5 help"> {{ $t("deal.funding") }}/{{ $t("deal.countdown") }}</span>

            </a-tooltip>

            <p class="new-money-num pointer mb-0">
              <span class="new-money-dot">
                <nuxt-link to="/contract/data?tab=3">
                  <span :class="rate < 0 ? 'red-active' : 'success-active'">{{ Math.abs(rate) }}%</span>
                  <span class="text-white">/{{ countdown.hours }}:{{ countdown.min }}:{{ countdown.seconds }}</span>
                </nuxt-link>
              </span>

            </p>
          </li>
          <li>
            <span class="new-money-title fw-5">{{ $t("deal.hourUps") }}</span>
            <p class="new-money-num mb-0" v-if="copeDailyDetail.symble">
              <span class="new-money-dot" :class="ubs >= 0 ? 'rise' : 'fall'">{{ ubsPercent }}%</span>
            </p>
            <p v-else>--</p>
          </li>
          <li>
            <span class="new-money-title fw-5">{{ $t("deal.hourHPrice") }}</span>
            <p class="new-money-num mb-0" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">{{
                global_get_tofixed(copeDailyDetail.h, dcs.p)
              }}</span>
            </p>
            <p v-else>--</p>
          </li>
          <li>
            <span class="new-money-title fw-5">{{ $t("deal.hourLPrice") }}</span>
            <p class="new-money-num mb-0" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">{{
                global_get_tofixed(copeDailyDetail.l, dcs.p)
              }}</span>
            </p>
            <p v-else>--</p>
          </li>
          <li>
            <span class="new-money-title fw-5">{{ $t("deal.hourNumber") }}</span>
            <p class="new-money-num mb-0" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">{{
                global_get_tofixed(copeDailyDetail.v, dcs.a)
              }}</span>
            </p>
            <p v-else>--</p>
          </li>
        </ul>
        <div class="right-content">


          <span class="new-money-title fw-5 pointer  tutorial-guidance" @click="onPopoverVisibleChange"
            v-if="symbletype != 1">
            <img src="/images/trade-video-circle.svg" class="mr-1 mb-1 pointer" />
            <template v-if="symbletype == 0">
              {{ $t("deal.tutorial") }}
            </template>
            <template v-else-if="symbletype == -1">
              {{ "Margin Tutorial" }}
            </template>
            <!-- <template v-else-if="symbletype == 1">
              {{ "Future Tutorial" }}
            </template> -->

          </span>


          <span class="new-money-title fw-5 pointer ml-1  tutorial-guidance  " @click="navigateToMarginPage">
            <img src="/images/document-text.svg" class="mr-1 mb-1 pointer" />
            <template v-if="symbletype == 0">
              {{ $t("deal.guidance") }}
            </template>
            <template v-else-if="symbletype == -1">
              {{ $t('deal.margin_guidance') }}
            </template>
            <template v-else-if="symbletype == 1">
              {{ $t('deal.future_guidance') }}
            </template>

          </span>





          <a-dropdown class="guidance-dropdown">
            <a class="ant-dropdown-link">
              <img :src="hoverKey == 35 ? '/images/white-category.svg' : '/images/white-category.svg'" class="pointer" />
            </a>

            <a-menu slot="overlay">
              <a-menu-item @click="onPopoverVisibleChange">
                <img src="/images/trade-video-circle.svg" class="mr-1 mb-1 pointer" />
                <template v-if="!isMarginPage">
                  {{ $t("deal.tutorial") }}
                </template>
                <template v-else>
                  {{ $t('deal.spot_tutorial') }}
                </template>
              </a-menu-item>

              <a-menu-item @click="navigateToMarginPage">
                <img src="/images/document-text.svg" class="mr-1 mb-1 pointer" />
                <template v-if="!isMarginPage">
                  {{ $t("deal.guidance") }}
                </template>
                <template v-else>
                  {{ $t('deal.margin_guidance') }}
                </template>
              </a-menu-item>
            </a-menu>
          </a-dropdown>


          <div class="select_background">
            <span class="select_collect" :class="{ active: copeDailyDetail.self }"
              @click="collect(copeDailyDetail)"></span>

            <span class="mode-icon">
              <span class="select_background_night" :class="{ active: background == 'night' }"
                @click="setBackground('night')"></span>
              <span class="select_background_day" :class="{ active: background == 'day' }"
                @click="setBackground('day')"></span>
            </span>
          </div>

        </div>

      </div>

    </div>
    <CoinProfile :coinProfile="coinProfile" :close="close" />

    <a-modal v-model="showTutorial" centered @cancel="() => (showTutorial = false)" :footer="false" :title="false"
      width="802px" :bodyStyle="{ 'padding': '1px', 'line-height': '0', }">
      <iframe id="videoIframe" width="800" height="405" :src="videoSrc" title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </a-modal>

  </div>
</template>
<script>
import CoinProfile from "@/components/deal/CoinProfile";
import coinList from "@/components/deal/coin-list";
import coin from "@/components/public/coin";
import { mapGetters } from 'vuex'
import * as jsCokie from "js-cookie";
import { helpCenterId, spotId, marginId, futureChannelId } from "~/plugins/constants";
import AppInfoTooltip from "../App/AppInfoTooltip.vue";

export default {
  name: "NewMoney",
  components: {
    "hex-coin": coin,
    "hex-coinlist": coinList,
    CoinProfile,
    AppInfoTooltip
  },
  computed: {
    ...mapGetters('market', ['getCurrentMarketPrice']),
    currentMarketPrice: function () {
      return this.getCurrentMarketPrice
    },
    iframeSrc() {
      return this.visible && this.isMarginPage ? this.marginVideoUrl : "";
    },
    //获取24小时涨跌
    ubs: function () {
      const ups = this.dailyDetail;
      if (ups.o == 0) return 0;
      return ((this.copeDailyDetail.c - ups.o) / ups.o).toFixed(8);
    },
    //获取4小时涨跌百分比
    ubsPercent: function () {
      const ups = this.dailyDetail;
      if (ups.o == 0) return 0;
      const abs = ((this.copeDailyDetail.c - ups.o) / ups.o) * 100;
      return isNaN(abs) ? 0 : abs.toFixed(2);
    },
    coinFullName: function () {
      return this.$store.state.currencyinfos.filter(
        (item) => item.currencyname == this.symbleinfo.fcurrencyname
      )[0]?.fullname;
    },
    getSymbleType: function () {
      if (this.$route.name.indexOf("deal") > -1) {
        return 0;
      } else if (this.$route.name.indexOf("margin") > -1) {
        return -1;
      } else if (this.$route.name.indexOf("contract") > -1) {
        return 1;
      }
    },
  },
  watch: {
    dailyDetail: {
      handler: function (val) {
        if (val) {
          this.copeDailyDetail = val;
          this.copeDailyDetail.c = val.c;
          if (val.mp > 0)
            this.marketPrice = val.mp;
          if (val.mp == 0)
            this.copeDailyDetail.mp = this.marketPrice;
          this.dcs = this.global_get_decimal(val.symble?.toUpperCase());
        }
      },
      deep: true,
      immediate: true,
    },
    symbleinfo: function (val) {
      if (val) {
        if (val.itype == 1) {
          this.getTime()
        }
      }
    }
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {};
      },
    },

    dailyDetail: {
      type: Object,
      default: function () {
        return {};
      },
    },
    isMarginPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showTutorial: false,
      videoSrc: null,
      hoverKey: -1,
      copeDailyDetail: {},
      background: this.$store.state.hex_client_background.active,
      coinTitleActive: false,
      coinTitleActiveTimer: null,
      coinSearchString: "",
      coinProfile: false,
      dcs: {},
      symbletype: 0,
      indexPrice: 0,
      marketPrice: 0,
      visible: false,
      marginVideoUrl: "https://images.BitNasdaq.io/videos/margin-trading.mp4",
      futureVideoUrl: "https://images.BitNasdaq.io/videos/margin-trading.mp4",
      spotVideoUrl: "https://images.BitNasdaq.io/videos/en_us_spot_trading.mp4",
      countdown: {
        hours: '00',
        min: '00',
        seconds: '00'
      },
      countdowninterval: null,
      rate: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.countdowninterval)
  },
  mounted() {
    this.symbletype =
      this.$route.path.indexOf("margin") > -1
        ? -1
        : this.$route.path.indexOf("contract") > -1
          ? 1
          : 0;
    document.addEventListener("click", () => {
      this.setActiveCoin(false);
    });
    // this.getTime()
  },
  /*订阅消息*/
  subscribe() {
    return {
      /*订阅最新价*/
      changeNewMoney(res) {
        this.changePrice(res);
      },
      indexPrice(res) {
        this.indexPrice = res;
      },
      addedToFavorite(res) {
        // this.copeDailyDetail.self = res
        if (this.copeDailyDetail.ctid == res.ctid) {
          this.copeDailyDetail.self = res.self;
        }
      },
    };
  },
  methods: {
    getTime() {
      let searchOrder = Object.assign({}, {});
      searchOrder.ctid = this.symbleinfo.id;
      const _self = this;

      this.$store.dispatch('trading_fundingrate', searchOrder).then(({ data }) => {
        console.log(data, "timer");

        if (data) {
          console.log("data found");
          const expireTime = new Date(Date.now() + data.lefttime * 1000);
          this.countdowninterval = setInterval(function () {
            const currentTime = new Date();
            const elapsedTime = expireTime - currentTime;
            const hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((elapsedTime % (1000 * 60)) / 1000)).padStart(2, '0');
            if (hours === '00' && minutes === '00' && seconds === '00') {
              clearInterval(this.countdowninterval);
              this.getTime()
            }
            _self.countdown = {
              hours: hours,
              min: minutes,
              seconds: seconds
            };
            // Use _self to access the Vue component's context
          }, 1000);
          this.rate = data.rate;
        }
      });
    },

    close() {
      this.coinProfile = false;
    },
    closeVideo() {
      // Stop the video (if needed) by setting the src attribute to an empty string
      const videoIframe = document.getElementById("videoIframe");
      if (videoIframe) {
        videoIframe.src = "";
      }

    },
    onPopoverVisibleChange(ev) {
      console.log('EVVV', ev);
      this.showTutorial = true
      if (this.symbletype == 0) {
        this.videoSrc = this.spotVideoUrl
      } else if (this.symbletype == -1) {
        this.videoSrc = this.marginVideoUrl
      } else if (this.symbletype == 1) {
        this.videoSrc = this.marginVideoUrl
      }
    },
    changePrice(res) {
      if (
        this.symbleinfo.descriptions &&
        res.symble.toUpperCase() ==
        this.symbleinfo.descriptions.replace("/", "").toUpperCase()
      ) {
        if (res.price > this.copeDailyDetail.h) {
          this.copeDailyDetail.h = res.price;
        }
        if (res.price < this.copeDailyDetail.l) {
          this.copeDailyDetail.l = res.price;
        }
        this.copeDailyDetail.c = res.price;
        //this.copeDailyDetail.v += res.amount
      }
    },
    setActiveCoin(e, delay) {
      if (!delay) {
        this.coinTitleActive = e;
      } else {
        this.coinTitleActiveTimer && clearTimeout(this.coinTitleActiveTimer);
        if (!e) {
          this.coinTitleActiveTimer = setTimeout(() => {
            this.coinTitleActive = e;
          }, 1000);
        } else {
          this.coinTitleActive = e;
        }
      }
    },
    async collect(val) {
      /*推送自选*/
      const res = await this.$pubsub.publish(this.$pubsub.changeCollect, {
        ctid: val.ctid,
        id: val.id,
        self: val.self,
        itype:
          this.$route.path.indexOf("margin") > -1
            ? -1
            : this.$route.path.indexOf("contract") > -1
              ? 1
              : 0,
      });
      // console.log("val:::", val);
      // console.log("res:::", res);
      // val.self = !val.self;
    },
    setBackground(val) {
      if (this.$store.state.hex_client_background.active == val) {
        return;
      }
      this.background = val;
      this.$store.commit("set_client_background", val);
      jsCokie.set(this.$store.state.hex_client_background.type, val);
    },
    getNewMarketClientRate(num) {
      if (this.symbleinfo.tcurrencyname) {
        return this.$store.getters.get_client_exchange_rate(
          this.symbleinfo.tcurrencyname,
          num
        );
      }
      return 0;
    },
    navigateToMarginPage() {
      // Assuming you have access to this.isMarginPage, marginId, and spotId

      if (this.symbletype == -1) { //margin
        this.$router.push(`/help-dashboard/${helpCenterId}?channelId=${marginId}`);
      } else if (this.symbletype == 0) {//spot
        this.$router.push(`/help-dashboard/${helpCenterId}?channelId=${spotId}`);
      } else if (this.symbletype == 1) {//future
        this.$router.push(`/help-dashboard/${helpCenterId}?channelId=${futureChannelId}`);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../static/styles/color";

:deep(#videoIframe) {
  border-radius: 4px;
}

ul.ant-dropdown-menu.ant-dropdown-menu-vertical.ant-dropdown-menu-root.ant-dropdown-menu-light.ant-dropdown-content {
  margin-top: 0px !important;
  background: #0C1014;
  width: 165px !important;
}

ul.ant-dropdown-menu.ant-dropdown-menu-vertical.ant-dropdown-menu-root.ant-dropdown-menu-light.ant-dropdown-content li {
  background: #0C1014;
  color: white !important;
  padding: 8px;
}

.tutorial-guidance {
  color: @cl_ADB1B8 !important;
}

.new-money {
  min-height: 56px;
  position: relative;
  background: #0C1014;
  margin-bottom: 6px;
  padding-top: 10px;
  padding-bottom: 6px;

  .select_background {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
    text-align: center;
    margin-left: 14px;
    vertical-align: middle;
    position: relative;

    &:after {
      height: 36px;
      width: 2px;
      background: @cl_12181D;
      position: absolute;
      content: "";
      left: -6px;
      top: -3px;
    }
  }

  .select_background .select_background_day,
  .select_background .select_background_night {
    display: inline-block;
    height: 22px;
    width: 24px;
    background-size: 14px 14px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    border-radius: 6px;
  }

  .select_background_day {
    background-image: url("../../static/images/day.svg");
  }

  .select_background_day.active {
    background-image: url("../../static/images/day-active.svg");
  }

  .select_background_night {
    background-image: url("../../static/images/night.svg");
  }

  .select_background_night.active {
    background-image: url("../../static/images/night-active.svg");
  }

  .right-content {
    height: 100%;
    line-height: 42px;
    position: relative;
    float: right;
  }

  .select_collect {
    cursor: pointer;
    width: 22px;
    height: 28px;
    display: inline-block;
    background-image: url("../../static/images/collect.svg");
    background-size: 14px 14px;
    background-position: center;
    background-repeat: no-repeat;
  }

  .select_collect.active {
    background-image: url("../../static/images/collect-active.svg");
  }


  .money-type {
    float: left;
    height: 100%;
    width: auto;
    margin-right: 0px;
    padding-right: 5px;
    display: flex;
    align-items: center;

    .type-weight {
      font-size: 18px;
      color: @cl_EAECEF;
      font-weight: bold;
    }

    .type-normal {
      color: @cl_ADB1B8;
      font-size: 14px;
      line-height: 1;
      font-weight: 400;
    }

    .icon-logo {
      width: 30px;
      height: 30px;
      position: relative;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
      bottom: 2px;
    }

    .type-logo {
      width: 30px;
      height: 30px;
      border: 0;
      margin: 3px;
    }

    .type-tip {
      color: @cl_c5c;
      font-size: 18px;
      margin: 4px;
    }

    .money-type {
      float: left;
      height: 100%;
      margin-right: 40px;
      padding-right: 5px;
      cursor: pointer;
    }

    .money-type:after {
      content: "";
      width: 6px;
      height: 4px;
      background-image: url("../../static/images/select_down.svg");
      background-size: cover;
      vertical-align: middle;
      display: inline-block;
      position: relative;
      right: -5px;
      top: -2px;
    }
  }

  .new-money-list {
    // display: inline-block;
    // height: 100%;
    // padding-top: 7px;

    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }

  .new-money-list:after {
    content: "";
    display: block;
    clear: both;
  }

  .new-money-list>li {
    // flex: 0 0 100%;
    margin-bottom: 10px;
    padding-right: 17px;
  }

  .new-money-list>li:last-child {
    padding-right: 0;
  }

  .new-money-title {
    font-size: 12px;
    color: @cl_71757A;
    line-height: 1.5rem;
  }

  .new-money-num {
    line-height: 1rem;
  }

  .new-money-dot {
    color: @cl_fff;
    font-size: 12px;
    font-weight: 500;
  }

  .new-money-dot.rise {
    color: @cl_buy;
  }

  .new-money-dot.fall {
    color: @cl_F6465D;
  }

  .new-money-dot.rise:after,
  .new-money-dot.fall:after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 10px;
    background-size: cover;
    vertical-align: middle;
    margin-left: 4px;
  }

  .new-money-dot.rise:after {
    background-image: url("../../static/images/rise.svg");
  }

  .new-money-dot.fall:after {
    background-image: url("../../static/images/decline.svg");
  }

  .new-money-price {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }
}

.margin-label {
  padding: 3px;
  background: #412F11;
  border-radius: 3px;
  color: #FFA500;
  font-size: 10px;

}

.red-active {
  color: @cl_F6465D !important;
}
</style>
<style lang="scss" >
@import 'assets/variables/light.scss';

.mark-price-tip {
  max-width: 600px;
}

.funding-countdown-tip {
  max-width: 360px;
}

.funding-countdown-tip .ant-tooltip-inner,
.mark-price-tip .ant-tooltip-inner {
  background-color: $cl_5e6673 !important;
}

.coin-list-popover-icon {
  display: block;
}

.coin-list-popover-night {
  top: 110px !important;
  height: auto;

  .ant-popover-content {
    .ant-popover-inner {
      background: #12181d;
      box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.12);
      border-radius: 0px;

      .ant-popover-inner-content {
        .dealcoin-list {
          background: #0C1014;
        }

        // .dealcoin-list .coin-title{
        //   border-bottom: 1px solid #F1F5FA
        // }
        // .dealcoin-list .coin-title .coin-title_item.active{
        //   background: #F1F5FA;
        // }
        .search-area {
          background-color: #12181d;
        }

        // .search{
        //   border: 1px solid #e1e0ec;
        // }
        .coin-list-header {
          background-color: #2a2a2c;
          border: 1px solid #e1e0ec;
        }
      }
    }
  }

  .ant-popover-arrow {
    display: none;
  }
}

.mode-icon {
  background: $cl_12181D;
  display: inline-block;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
  padding: 3px;
}

.select_background_night {
  background-color: #222930;
  border-radius: 6px;
}

.coin-list-popover-day {
  top: 110px !important;

  .ant-popover-content {
    .ant-popover-inner {
      background: #f8f9fb;
      border: 1px solid #e1e0ec;
      box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.12);
      border-radius: 0px;

      .ant-popover-inner-content {
        .dealcoin-list {
          background: #f8f9fb;
        }

        .dealcoin-list .coin-title {
          border-bottom: 1px solid #f1f5fa;
        }

        .dealcoin-list .coin-title .coin-title_item.active {
          background: #f1f5fa;
        }

        .search-area {
          background-color: #f8f9fb;
        }

        .search {
          border: 1px solid #e1e0ec;
        }

        .coin-list-header {
          background-color: #f8f9fb;
          border: 1px solid #e1e0ec;
        }
      }
    }
  }

  .ant-popover-arrow {
    display: none;
  }

  //css for video on margin and spot tutorial
  /* Style the video popover */
  .video-popover {
    position: relative;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    padding: 20px;
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  /* Style the video player */
  iframe {
    width: 100%;
    height: 100%;
  }
}

@media only screen and (min-width: 1800px) {
  .coin-list-popover-icon {
    display: none;
  }
}

.guidance-dropdown {
  display: none;
}

@media only screen and (max-width: 1580px) {
  .tutorial-guidance {
    display: none;
  }

  .guidance-dropdown {
    display: inline-block;
  }
}
</style>



