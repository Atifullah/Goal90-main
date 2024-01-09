<template>
  <fullscreen class="hex-chart" @change="fullscreenChange" :fullscreen.sync="fullscreen" ref="fullscreen">
    <div class="hex-chart-plugin clearfix">
      <div class="left">
        <div v-show="activeChart == 1" class="plugin_interval">
          <span class="plugin_interval_tip" v-if="ispro" :class="{ 'active': resolutionInterval == 1 }"
            @click="setChartType('STYLE_AREA'), setTimeSharing()">{{ $t('deal.timeShare') }}</span>
          <div :class="{ 'active': [2, 3, 4, 5, 14].indexOf(resolutionInterval) >= 0 }"
            class="plugin_interval_tip plugin_interval_minute">
            <span class="plugin_interval_minute_tip" @click="showMinute">{{ [2, 3, 4, 5, 14].indexOf(resolutionInterval)
              >= 0 ? getintervalvalue(minuteResolutionList, resolutionInterval) : '' }}{{ $t('deal.minutes') }}</span>
            <ul v-show="isSelectMinute" class="plugin_interval_minute_content">
              <li :class="{ 'active': resolutionInterval == m.key }" v-for="(m, index) in minuteResolutionList"
                :key="index" @click="setMinuteResolution(m.key)">{{ m.value }}{{ $t('deal.minutes') }}
              </li>
            </ul>
          </div>
          <!--小时-->
          <div :class="{ 'active': [6, 10, 11, 12, 13].indexOf(resolutionInterval) >= 0 }"
            class="plugin_interval_tip plugin_interval_minute">
            <span class="plugin_interval_minute_tip" @click="showHouer">{{ [6, 10, 11, 12, 13].indexOf(resolutionInterval)
              >= 0 ? getintervalvalue(houerResolutionList, resolutionInterval) : '' }}{{ $t('deal.hour') }}</span>
            <ul v-show="isSelectHoure" class="plugin_interval_minute_content">
              <li :class="{ 'active': resolutionInterval == m.key }" v-for="(m, index) in houerResolutionList"
                :key="index" @click="setMinuteResolution(m.key)">{{ m.value }}{{ $t('deal.hour') }}
              </li>
            </ul>
          </div>
          <span class="plugin_interval_tip" :class="{ 'active': resolutionInterval == 7 }"
            @click="setMinuteResolution(7)">{{
              $t('deal.dateLine') }}</span>
          <span class="plugin_interval_tip" :class="{ 'active': resolutionInterval == 8 }"
            @click="setMinuteResolution(8)">{{
              $t('deal.contour') }}</span>
          <span class="plugin_interval_tip" :class="{ 'active': resolutionInterval == 9 }"
            @click="setMinuteResolution(9)">{{
              $t('deal.Monthly') }}</span>
          <a-tooltip :content="$t('security.set')" popper-class="chart_tooltip" placement="bottom">
            <span class="plugin_set_button set_button" @click="setOtherWindows('scalesProperties')"></span>
          </a-tooltip>
          <a-tooltip effect="dark" :content="$t('c2c.index')" popper-class="chart_tooltip" placement="bottom"
            v-if="ispro == true">
            <span class="plugin_set_button index_button" @click="setOtherWindows('insertIndicator')"></span>
          </a-tooltip>
          <!-- <span class="plugin_interval_tip" style="margin-left: 10px;padding:0px;" @click="setChartType('STYLE_AREA')" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="currentColor">
              <path
                d="M12.5 17.207L18.707 11h2l3.647-3.646-.708-.708L20.293 10h-2L12.5 15.793l-3-3-4.854 4.853.708.708L9.5 14.207z">
              </path>
              <path
                d="M9 16h1v1H9zm1 1h1v1h-1zm-1 1h1v1H9zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1H9zm2 0h1v1h-1zm-3-3h1v1H8zm-1 1h1v1H7zm-1 1h1v1H6zm2 0h1v1H8zm-1 1h1v1H7zm-2 0h1v1H5zm17-9h1v1h-1zm1-1h1v1h-1zm0 2h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-5-7h1v1h-1zm2 0h1v1h-1zm1-1h1v1h-1zm-2 2h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-2-6h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-3-3h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1z">
              </path>
            </svg>
          </span>
          <span class="plugin_interval_tip" style="margin-left: 10px;padding:0px;"
            @click="getIndexPriceKline('STYLE_CANDLES', false)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="currentColor">
              <path
                d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z">
              </path>
              <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
              <path
                d="M9 8v11h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5z">
              </path>
              <path
                d="M10 4h1v5h-1zm0 14h1v5h-1zM8.5 9H10v1H8.5zM11 9h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11z">
              </path>
            </svg>
          </span> -->
          <span class="plugin_interval_tip" style="margin-left: 10px;padding:0px;"
            @click="getIndexPriceKline('STYLE_CANDLES', true)" v-if="link == 'contract'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="currentColor">
              <path
                d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z">
              </path>
              <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
              <path
                d="M9 8v11h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5z">
              </path>
              <path
                d="M10 4h1v5h-1zm0 14h1v5h-1zM8.5 9H10v1H8.5zM11 9h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11zm-1 1h1v1h-1zm-1.5 1H10v1H8.5zm2.5 0h1.5v1H11z">
              </path>
            </svg>
            <font style="height:30px;line-height:30px;float:right">{{ $t('deal.index') }}</font>
          </span>
        </div>
      </div>
      <div class="right ">
        <div class="plugin_chart_nav">
          <span class="depth" @click="changeView">{{ $route.name.indexOf('pro') > 0 ?
            $t('deal.standardView') : $t('deal.professionalView') }}</span>
        </div>
        <div class="plugin_chart_nav">
          <span class="depth" :class="{ 'active': activeChart == 1 }" @click="setActiveChart(1)">{{ $t('deal.tradingView')
          }}</span>
        </div>
        <div class="plugin_chart_nav">
          <span class="depth" :class="{ 'active': activeChart == 2 }" @click="setActiveChart(2)">{{ $t('deal.depthMap')
          }}</span>
        </div>
        <span class="plugin_full" @click="toggleFullScreen"></span>
      </div>
    </div>
    <div class="chart-content">
      <div id="hex-chart-content" v-hex-loading="widgetloading"
        :class="{ 'active': activeChart == 1, 'ispro': ispro == true }" ref="hex-chart-content"
        class="hex-chart-content hex-loading"></div>
      <div :class="{ 'active': activeChart == 2 }" style="padding-left: 10px;" class="hex-chart-content">
        <hex-depth-chart :symbleParameString="symbleinfo.descriptions.replace('/', '')"
          ref="depth-chart"></hex-depth-chart>
      </div>
    </div>
  </fullscreen>
</template>
<script>
import * as jsCookie from 'js-cookie'
import depthChart from './depth-chart'
import chartFeed from './js/chart-feed.js'
import chartprovider from './js/chart-provider'
import moment from 'moment-timezone';
import TradingView from './js/chart-base'
export default {
  name: 'TradeChart',
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    'hex-depth-chart': depthChart
  },
  watch: {
    '$store.state.hex_client_background.active': function (val) {
      if (val) {
        this.initView()
      }
    },
    '$store.state.hex_lang.locale': function () {
      this.setLanguage()
    },
    'widgetReady': function (val) {
      if (val) {
        this.hideLegend();
        this.setBackground();
        this.setLanguage();
      }
    },
    'chartstyle': function (val) {
      this.widget.chart().removeAllStudies();
      this.widget.chart().createStudy("Volume", false, false);
      this.widget.chart().createStudy("Moving Average", false, false, [5], function (guid) { },
        { "plot.color.0": "#99aac7" }
      )
      this.widget.chart().createStudy("Moving Average", false, false, [15], function (guid) { },
        { "plot.color.0": "#e9e12f" }
      )
      this.widget.chart().createStudy("Moving Average", false, false, [30], function (guid) { },
        { "plot.color.0": "#2026dc" }
      )
      //this.widget.chart().createStudy("MA Cross", false, false, [10, 20, 30]);
      //this.widget.chart().createStudy("MA Cross", false, false, [10, 20,30]);
    }
  },
  data() {
    return {
      bg: '#1E222A',
      widgetloading: true,
      widgetReady: false,
      history: {},
      minuteResolutionList: [
        { key: 2, value: 1 },
        { key: 3, value: 5 },
        { key: 14, value: 10 },
        { key: 4, value: 15 },
        { key: 5, value: 30 }
      ],
      houerResolutionList: [
        { key: 6, value: 1 },
        { key: 10, value: 2 },
        { key: 11, value: 4 },
        { key: 12, value: 6 },
        { key: 13, value: 12 }
      ],
      isSelectMinute: false,
      isSelectHoure: false,
      resolutionInterval: jsCookie.get('interval') ? parseInt(jsCookie.get('interval')) : 3,
      feed: null,
      bars: [],
      link: "",
      fullscreen: false,
      activeChart: 1,
      chartstyle: 3,
      sub: '',
      timezone: '',
      ispro: true,
      isindexprice: false
    }
  },
  methods: {
    getOverrides(theme) {
      var themes = {
        "white": {
          up: "#03c087",
          down: "#ef5555",
          bg: "#ffffff",
          grid: "#f7f8fa",
          cross: "#23283D",
          border: "#DDDDE4",
          text: "#333",
          areatop: "rgba(2,250,153,1)",
          areadown: "rgba(255,255,255,1)",
          line: "#737375"
        },
        "black": {
          up: "#589065",
          down: "#ae4e54",
          bg: "#1E222A",
          grid: "#1f2943",
          cross: "#9194A3",
          border: "#383655",
          text: "#383655",
          areatop: "rgba(2,250,153,.6)",
          areadown: "rgba(255,255,255,.7)",
          line: "#737375"
        },
        "mobile": {
          up: "#03C087",
          down: "#E76D42",
          bg: "#ffffff",
          grid: "#f7f8fa",
          cross: "#23283D",
          border: "#C5CFD5",
          text: "#8C9FAD",
          areatop: "rgba(71, 78, 112, 0.1)",
          areadown: "rgba(71, 78, 112, 0.02)",
          showLegend: !0
        }
      };
      var t = themes[theme];
      return {
        "volumePaneSize": "medium",// 支持的值: large, medium, small, tiny
        "scalesProperties.lineColor": t.text,
        "scalesProperties.textColor": t.text,
        "paneProperties.background": t.bg,
        'scalesProperties.backgroundColor': t.bg,
        "paneProperties.vertGridProperties.color": t.grid,
        "paneProperties.horzGridProperties.color": t.grid,
        "paneProperties.crossHairProperties.color": t.cross,
        "paneProperties.legendProperties.showLegend": !!t.showLegend,
        "paneProperties.legendProperties.showStudyArguments": !0,
        "paneProperties.legendProperties.showStudyTitles": !0,
        "paneProperties.legendProperties.showStudyValues": !0,
        "paneProperties.legendProperties.showSeriesTitle": !0,
        "paneProperties.legendProperties.showSeriesOHLC": !0,
        "mainSeriesProperties.candleStyle.upColor": t.up,
        "mainSeriesProperties.candleStyle.downColor": t.down,
        "mainSeriesProperties.candleStyle.drawWick": !0,
        "mainSeriesProperties.candleStyle.drawBorder": !0,
        "mainSeriesProperties.candleStyle.borderColor": t.border,
        "mainSeriesProperties.candleStyle.borderUpColor": t.up,
        "mainSeriesProperties.candleStyle.borderDownColor": t.down,
        "mainSeriesProperties.candleStyle.wickUpColor": t.up,
        "mainSeriesProperties.candleStyle.wickDownColor": t.down,
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.hollowCandleStyle.upColor": t.up,
        "mainSeriesProperties.hollowCandleStyle.downColor": t.down,
        "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
        "mainSeriesProperties.hollowCandleStyle.borderColor": t.border,
        "mainSeriesProperties.hollowCandleStyle.borderUpColor": t.up,
        "mainSeriesProperties.hollowCandleStyle.borderDownColor": t.down,
        "mainSeriesProperties.hollowCandleStyle.wickColor": t.line,
        "mainSeriesProperties.haStyle.upColor": t.up,
        "mainSeriesProperties.haStyle.downColor": t.down,
        "mainSeriesProperties.haStyle.drawWick": !0,
        "mainSeriesProperties.haStyle.drawBorder": !0,
        "mainSeriesProperties.haStyle.borderColor": t.border,
        "mainSeriesProperties.haStyle.borderUpColor": t.up,
        "mainSeriesProperties.haStyle.borderDownColor": t.down,
        "mainSeriesProperties.haStyle.wickColor": t.border,
        "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.barStyle.upColor": t.up,
        "mainSeriesProperties.barStyle.downColor": t.down,
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.barStyle.dontDrawOpen": !1,
        "mainSeriesProperties.lineStyle.color": t.border,
        "mainSeriesProperties.lineStyle.linewidth": 1,
        "mainSeriesProperties.lineStyle.priceSource": "close",
        "mainSeriesProperties.areaStyle.color1": t.areatop,
        "mainSeriesProperties.areaStyle.color2": t.areadown,
        "mainSeriesProperties.areaStyle.linecolor": t.border,
        "mainSeriesProperties.areaStyle.linewidth": 1,
        "mainSeriesProperties.areaStyle.priceSource": "close"
      }
    },
    getStudiesOverrides(theme) {
      var themes = {
        "white": {
          c0: "#f6465d",
          c1: "#00BB00",
          t: 70,
          v: !1
        },
        "black": {
          c0: "#fd8b8b",
          c1: "#3cb595",
          t: 70,
          v: !1
        }
      };
      var t = themes[theme];
      return {
        "volume.volume.color.0": t.c0,
        "volume.volume.color.1": t.c1,
        "volume.volume.transparency": t.t,
        "volume.options.showStudyArguments": t.v
      }
    },
    setBackground() {
      const val = this.$store.state.hex_client_background.active;
      const tradingview = document.querySelector('iframe[id^="tradingview"]');
      const contentWindow = tradingview.contentWindow.document;
      const chartPage = contentWindow.querySelector('.chart-page');
      chartPage.className = chartPage.className.replace(/day/g, '').replace(/night/g, '');
      if (val == 'day') {
        chartPage.className += ' day';
      } else {
        chartPage.className += ' night'
      }
      try {
        this.widget.applyOverrides(val == 'day' ? this.getOverrides('white') : this.getOverrides('black'));
        this.widget.applyStudiesOverrides(val == 'day' ? this.getStudiesOverrides('white') : this.getStudiesOverrides('black'))
      } catch (e) {

      }
    },
    changeView() {

      const ctid = this.symbleinfo.id

      const route = this.$route.name;
      if (route.indexOf('pro') > 0) {
        this.$store.commit('set_tradeview', 'std')
        jsCookie.set('tradeView', 'std');
      }
      else {
        this.$store.commit('set_tradeview', 'pro')
        jsCookie.set('tradeView', 'pro');
      }
      switch (route) {
        case "contract-pro-id":
          if (this.$store.getters.get_contractType == 1) {
            this.$router.push('/contract/' + this.$route.params.id + '?contractType=1')
          } else {
            this.$router.push('/contract/' + this.$route.params.id)
          }
          break;
        case "deal-pro-id":
          this.$router.push('/deal/' + this.$route.params.id)
          break;
        case "margin-pro-id":
          this.$router.push('/margin/' + this.$route.params.id)
          break;
        case "contract-id":
          this.$router.push('/contract-pro/' + this.$route.params.id + '?ctid=' + ctid)
          break;
        case "deal-id":
          this.$router.push('/deal-pro/' + this.$route.params.id + '?ctid=' + ctid)
          break;
        case "margin-id":
          this.$router.push('/margin-pro/' + this.$route.params.id + '?ctid=' + ctid)
          break;
      }

    },
    hideLegend() {
      let clickEvent;
      if (document.createEvent) {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      else {
        clickEvent = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': false
        });
      }
      const contentWindow = document.getElementById(this.widget._id).contentWindow;
      const a = contentWindow.document.querySelector('a.pane-legend-minbtn.apply-common-tooltip.apply');
      if (a) {
        a.dispatchEvent(clickEvent)
      }
    },
    showMinute() {
      this.isSelectHoure = false;
      this.isSelectMinute = !this.isSelectMinute
    },
    showHouer() {
      this.isSelectMinute = false;
      this.isSelectHoure = !this.isSelectHoure
    },
    getintervalvalue(list, key) {
      return list.find((item) => {
        return item.key == key
      }).value
    },
    //设置时间间隔
    setTimeInterval(time) {
      time = Number(time);
      this.resolutionInterval = time;
      jsCookie.set('interval', time);
      let interval = '';
      switch (time) {
        case 2:
          interval = '1';
          break;
        case 3:
          interval = '5';
          break;
        case 14:
          interval = '10';
          break;
        case 4:
          interval = '15';
          break;
        case 5:
          interval = '30';
          break;
        case 6:
          interval = '60';
          break;
        case 7:
          interval = '1D';
          break;
        case 8:
          interval = '1W';
          break;
        case 9:
          interval = '1M';
          break;
        case 10:
          interval = '120';
          break;
        case 11:
          interval = '240';
          break;
        case 12:
          interval = '360';
          break;
        case 13:
          interval = '720';
          break;
      }
      return interval
    },
    setLanguage() {
      try {
        this.widget.chart().setLanguage(this.getlanguage())
      } catch (e) {
      }
    },
    setResolution(time) {
      try {
        this.widgetloading = true;
        for (let i in chartprovider.history) {
          delete chartprovider.history[i].firstBar
        }
        const interval = this.setTimeInterval(time);
        this.widget.chart().setChartType(this.chartstyle);
        this.widget.chart().setResolution(interval, function (e) { })
      } catch (e) {
      }
    },
    setTimeSharing() {
      this.resolutionInterval = 1;
      jsCookie.set('interval', 1);
    },
    selectChartType(type) {
      let typenum;
      switch (type) {
        case 'STYLE_BARS'://美国线
          typenum = 0;
          break;
        case 'STYLE_CANDLES'://K线图
          typenum = 1;
          break;
        case 'STYLE_AREA'://面积图
          typenum = 3;
          break;
        case 'STYLE_LINE'://线形图
          typenum = 2;
          break;
        case 'STYLE_HEIKEN_ASHI'://平均K线
          typenum = 8;
          break;
      }
      return typenum
    },
    //设置图表类型
    setChartType(type) {
      try {
        jsCookie.set(this.$store.state.HexKlineType.type, type);
        this.chartstyle = this.selectChartType(type);
        // this.resolutionInterval = 3;
        this.widget.chart().setChartType(this.chartstyle);
        this.widget.chart().resetData();
        this.setBackground();
      } catch (e) {
      }
    },
    getIndexPriceKline(type, bl) {
      try {
        this.widgetloading = true;
        jsCookie.set(this.$store.state.HexKlineType.type, type);
        if (bl) {
          this.chartstyle = this.selectChartType(type);
          this.resolutionInterval = 3;
          this.isindexprice = bl;
          // this.initView();
        } else {
          if (this.isindexprice == true) {
            window.location.reload()
          }
          else {
            this.setChartType(type)
          }
        }
      } catch (e) {
      }
    },
    //设置弹窗
    setOtherWindows(val) {
      this.widget.chart().executeActionById(val)
    },
    //全屏
    toggleFullScreen() {
      this.fullscreen = !this.fullscreen;
      this.$refs['fullscreen'].toggle()
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
      setTimeout(() => {
        this.$refs['depth-chart'].setFullScreen(this.fullscreen)
      }, 50)
    },
    getlanguage() {
      return this.$store.state.hex_lang.locale == 'zh_cn' ? "zh" : 'en'
    },
    initView() {
      this.widgetloading = true;
      let this_vue = this;
      // 判断访问的页面
      if (this.$route.path.indexOf('margin') >= -1) {
        this_vue.link = "margin"
      } else if (this.$route.path.indexOf('contract') >= -1) {
        this_vue.link = "contract"
      } else {
        this_vue.link = "deal"
      }
      let tz = moment.tz.guess();
      const overrides = Object.assign(this.$store.state.hex_client_background.active == 'day' ? this.getOverrides('white') : this.getOverrides('black'));
      this.timezone = tz;
      this.feed = chartFeed.createFeed(this_vue);
      this.widget = new TradingView.widget({
        debug: false,
        autosize: true,
        interval: 5,
        timezone: this.timezone,
        style: 3,
        container_id: "hex-chart-content",
        datafeed: this.feed,
        library_path: "/chart/",
        locale: this.getlanguage(),
        disabled_features: [//禁用的功能
          'header_symbol_search', // 头部搜索
          "header_widget_dom_node", // 隐藏头部组件
          'source_selection_markers', // 禁用系列和指示器的选择标记
          "header_indicators", //图标指标
          'adaptive_logo', // 移动端可以隐藏logo
          'constraint_dialogs_movement',
          'header_interval_dialog_button',
          'show_interval_dialog_on_key_press',
          'symbol_search_hot_key',
          // 'study_dialog_search_control',
          'display_market_status',
          'header_chart_type',// k线样式
          'header_compare',// 图表对比
          'header_undo_redo', // 撤销返回
          //'header_screenshot', // 截图
          'volume_force_overlay', // 防止他们重叠
          'header_settings',// 设置
          'property_pages',// 禁用所有属性页
          'header_fullscreen_button',// 全屏
          "header_saveload",
          // 'edit_buttons_in_legend',
          //'timeframes_toolbar', // 下面的时间
        ],
        studies_overrides: {
          //显示交易量的移动平均线
          "volume.show ma": false, //是否显示量的背景波浪
          "bollinger bands.median.color": "#33FF88",
          "bollinger bands.upper.linewidth": 7
        },
        overrides: overrides,
        custom_css_url: "css/hex.css",
        enabled_features: [//开启功能
          "keep_left_toolbar_visible_on_small_screens", //防止左侧工具栏在小屏幕上消失
          "adaptive_logo",
          "property_pages",
          "display_market_status",
          "remove_library_container_border",
          "move_logo_to_main_pane",
          "dont_show_boolean_study_arguments", //是否隐藏指标参数
          // "countdown",
          // "caption_buttons_text_if_possible", //在可能的情况下，在标题中的“指标”和“比较”按钮上显示文字而不是图标
          "header_settings",
          "hide_last_na_study_output", //隐藏最后一次指标输出
          "symbol_info", //商品信息对话框
          this.ispro ? "" : "hide_left_toolbar_by_default" //开启或者关闭左侧工具栏
        ],
        charts_storage_api_version: "1.1",
        user_id: 'public_user_id',
      });
      var _this = this;
      this.widget.onChartReady(() => {
        const wd = document.getElementById(_this.widget._id);
        if (wd) {
          wd.style.visibility = 'visible'
        }
        _this.widgetReady = true;
        _this.widget.chart().removeAllStudies();
        var _klinetype = jsCookie.get(_this.$store.state.HexKlineType.type);
        if (!_klinetype || _klinetype == 'STYLE_CANDLES') {
          _klinetype = 'STYLE_CANDLES';
        } else {
          _klinetype = 'STYLE_AREA';
        }
        _this.setChartType(_klinetype);
        setTimeout(() => {
          _this.setChartType(_klinetype);
        }, 500);
      });
    },
    //切换chart
    setActiveChart(type) {
      this.activeChart = type
    },
    setMinuteResolution(val) {
      this.setChartType('STYLE_CANDLES');
      this.isSelectHoure = false;
      this.isSelectMinute = false;
      this.setResolution(val);

    }
  },
  mounted: function () {
    this.widgetloading = true;
    setTimeout(() => {
      this.initView();
    }, 300);
  },
  created() {
    this.sub = `market.${this.symbleinfo.descriptions.replace("/", "").toLowerCase()}.kline.1min`
  },
  beforeDestroy() {
    for (const _t in chartprovider.timer) {
      clearTimeout(chartprovider.timer[_t]);
      chartprovider.timer[_t] = -1;
    }
    for (const _t in chartprovider.pollingtimer) {
      clearTimeout(chartprovider.pollingtimer[_t]);
      chartprovider.pollingtimer[_t] = -1;
    }
    this.$socket.invoke({
      sub: this.sub,
      type: this.$socket.type.quotation_kline_get
    });
  }
}
</script>
<style lang="less">
@import "../../static/styles/color";

.a-tooltip__popper.is-dark.chart_tooltip {
  margin-top: 0;
  background: #292E39;

  .popper__arrow,
  .popper__arrow:after {
    border-bottom-color: #292E39;
  }
}

.plugin_interval_minute_tip {
  position: relative;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  text-align: center;
  padding-right: 12px;
}

.plugin_interval_minute_tip:hover,
.plugin_interval_minute_tip.active,
.hex-chart-plugin .plugin_interval .plugin_interval_tip.active,
.hex-chart-plugin .plugin_interval .plugin_interval_tip:hover {
  color: @cl_link;
  background-color: #0C1014
}

.plugin_interval_minute_tip:after,
.plugin_interval_minute_tip.active:after {
  content: '';
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  position: absolute;
  width: 6px;
  height: 4px;
  background-image: url("../../static/images/arrowdown.svg");
  background-size: cover;
  right: 0;
}

.plugin_interval_minute_tip:hover:after,
.plugin_interval_tip.active .plugin_interval_minute_tip:after {
  background-image: url("../../static/images/arrowdown_active.svg");
}

.plugin_interval_minute {
  position: relative;
}

.plugin_interval_minute_content {
  position: absolute;
  font-size: 12px;
  color: #ffffff;
  left: 0;
  line-height: 36px;
  background-color: #292E39;
  width: 80px;
  z-index: 2;
  top: 30px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.plugin_interval_minute_content li {
  padding: 0 10px;
  cursor: pointer;
}

.plugin_interval_minute_content li:hover,
.plugin_interval_minute_content li.active {
  background-color: #333946;
}

.hex-chart {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.hex-chart.fullscreen {
  background-color: #1e222a !important
}

.hex-chart.fullscreen .hex-chart-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.hex-chart-plugin {
  font-size: 12px;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid @cl_292E39;
  background-color: @cl_content;
  margin-bottom: 3px;
  margin-top: 3px;

  .plugin_set_button {
    float: left;
    width: 28px;
    height: 30px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: center;
    margin-left: 10px;
    cursor: pointer;
  }

  .set_button {
    background-image: url("../../static/images/klin_set.svg");
  }

  .set_button:hover {
    background-image: url("../../static/images/klin_set_active.svg");
  }

  .index_button {
    background-image: url("../../static/images/klin_zhibiao.svg");
  }

  .index_button:hover {
    background-image: url("../../static/images/klin_zhibiao_active.svg");
  }

  .plugin_major_button {
    float: left;
    display: inline-block;
    width: 36px;
    height: 30px;
    border-right: 1px solid #292E39;
    border-left: 1px solid #292E39;
    background-size: 16px;
    background-repeat: no-repeat;
    background-image: url("../../static/images/klin_zhuanye.svg");
    background-position: center;
    cursor: pointer;
  }

  .plugin_major_button:hover {
    background-image: url("../../static/images/klin_zhuanye_active.svg");
  }
}

.chart-content {
  position: relative;
  width: 100%;
  flex: 1;
}

.hex-chart-content {
  background: @cl_content;
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

.hex-chart-content.active {
  z-index: 1;
}

.hex-chart-plugin .plugin_interval {
  color: @cl_8790A1;
}

.hex-chart-plugin .plugin_interval .plugin_interval_tip {
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0 10px;
  float: left;
}

.hex-chart-plugin .plugin_full {
  background-image: url('../../static/images/full.svg');
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  float: right;
  width: 36px;
  height: 30px;
  cursor: pointer;
}

.fullscreen .plugin_full {
  background-image: url('../../static/images/full_active.svg');
}

.hex-chart-plugin .plugin_chart_nav {
  color: #555A5F;
  display: inline-block;
  position: relative;
  float: left;
  font-weight: 500 !important;

  .trading,
  .depth {
    float: left;
    display: flex;
    align-items: center;
    // background-size: 16px 16px;
    // background-repeat: no-repeat;
    // background-position: center;
    // display: inline-block;
    // width: 36px;
    // height: 30px;
  }

  .depth:hover {
    color: #FFA500;
  }

  .trading {
    background-image: url("../../static/images/klin.svg");
  }

  .trading.active {
    background-image: url("../../static/images/klin_active.svg");
  }

  // .depth {
  //   background-image: url("../../static/images/depth.svg");
  // }

  .depth.active {
    // background-image: url("../../static/images/depth_active.svg");
  }
}

.hex-chart-plugin .plugin_chart_nav span {
  text-align: center;
  padding: 0 10px;
  display: inline-block;
  cursor: pointer;
  height: 30px;
}

.hex-chart-plugin .plugin_chart_nav span.active {
  background-color: #0C1014;
  color: @cl_8790A1;
}

.border {
  border: 1px solid red;
}
</style>

