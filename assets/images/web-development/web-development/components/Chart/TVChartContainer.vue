<template>
  <div class="hex-chart">
    <div :id="containerId" class="TVChartContainer" />
    <div class="hex-chart-content" :style="{ 'z-index': showDepthChart ? '1' : '-1' }">
      <div class="header">
        <a-row type="flex" justify="end">
          <a-col :lg="3">
            <div class="plugin_chart_nav" @click="showDepthChart = false">
              <span class="depth">{{ $t('deal.tradingView') }}</span>
            </div>
          </a-col>
          <a-col :lg="3">
            <div class="plugin_chart_nav yellow-active">
              <span class="depth">{{ $t('deal.depthMap') }}</span>
            </div>
          </a-col>
        </a-row>
      </div>
      <hex-depth-chart :symbleParameString="symbol" ref="depth-chart" />
    </div>
  </div>
</template>
  
<script>
import * as jsCookie from 'js-cookie'
import Datafeed from './datafeed.js';
import depthChart from './depth-chart.vue'
import moment from 'moment';

export default {
  name: 'TVChartContainer',
  components: {
    'hex-depth-chart': depthChart
  },
  props: {
    symbleinfo: {
      default: Object,
      type: Object
    },
    symbol: {
      default: 'BTC/USDT',//Bitfinex:BTC/USD, BTC/USD
      type: String
    },
    interval: {
      default: 'H',
      type: String
    },
    containerId: {
      default: 'tv_chart_container',
      type: String
    },
    libraryPath: {
      default: '/charting_library/',
      type: String
    },
    chartsStorageApiVersion: {
      default: '1.1',
      type: String
    },
    clientId: {
      default: '2222222',
      type: String
    },
    userId: {
      default: '111111',
      type: String
    },
    fullscreen: {
      default: false,
      type: Boolean
    },
    autosize: {
      default: true,
      type: Boolean
    },
    studiesOverrides: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      tvWidget: null,
      theme: 'night',
      showDepthChart: true
    }
  },
  watch: {
    '$store.state.hex_client_background.active': function (val) {
      if (val) {
        this.initTradingView()
      }
    },
  },
  methods: {
    initTradingView() {
      this.showDepthChart = false
      this.theme = this.$store.state.hex_client_background.active == 'day' ? 'light' : 'dark'

      const lang = this.$store.getters.currentLang == 'zh_cn' ? "zh" : 'en'


      const widgetOptions = {
        symbol: this.symbol,// Default symbol pair
        interval: this.interval,// Default interval
        fullscreen: true,// Displays the chart in the fullscreen mode
        container: this.containerId,// Reference to an attribute of a DOM element
        datafeed: Datafeed,
        library_path: this.libraryPath,
        timezone: moment.tz.guess(),// 'Asia/Karachi',
        supported_resolutions: ['1D', '1W', '1M'],
        // exchanges: [
        //   { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
        //   { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange' },
        // ],
        symbols_types: [
          { name: 'crypto', value: 'crypto' }
        ],
        locale: lang,


        charts_storage_api_version: this.chartsStorageApiVersion,
        // client_id: this.clientId,
        // user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,

        disabled_features: ["save_chart_properties_to_local_storage", "volume_force_overlay"],

        // custom_css_url: "/charting_library/hex.css",
        disabled_features: [
          'header_undo_redo', // 撤销返回 
          'constraint_dialogs_movement',
          'header_compare',


          'header_screenshot', // 截图
          'volume_force_overlay', // 防止他们重叠
          'header_settings',// 设置
          'property_pages',// 禁用所有属性页

          "header_saveload",
          'header_symbol_search'

        ],
        studies_overrides: {
          "volume.volume.color.0": "#f7525f",//volum strategy color
          "volume.volume.color.1": "#22ab94",
          "volume.volume.transparency": 70,
          "volume.volume ma.color": "#FF0000",
          "volume.volume ma.transparency": 30,
          "volume.volume ma.linewidth": 5,
          "volume.volume ma.visible": true,
          "bollinger bands.median.color": "#33FF88",
          "bollinger bands.upper.linewidth": 7
        },
        debug: false,
        time_frames: [

        ],
        favorites: {
          intervals: ["5", "15", "30"],
          chartTypes: ["Candle", "Line"]
        },
        theme: this.theme, //"dark", //light, dark
        overrides: {
          // "paneProperties.background": "#0C1014",
          // "paneProperties.backgroundType": "solid",
          "paneProperties.horzGridProperties.style": "1",
          "mainSeriesProperties.style": 0,
          "volumePaneSize": "tiny",
          "crossHairProperties.color": "#2a2a33",

          "PaneProperties.legendProperties.showStudyTitles": 0,
        },
        supported_resolutions: ["1", "5", "10", "15", "30", "60", "120", "240", "360", "720", "1D", "1W", "1M"],

      }

      const {
        $TVChart: { Widget }
      } = this
      const tvWidget = new Widget(widgetOptions)
      this.tvWidget = tvWidget

      this.tradingViewSettingWhenReady(tvWidget)

    },
    tradingViewSettingWhenReady(tvWidget) {
      const _self = this
      const btnText = this.$route.name.indexOf('pro') > 0 ? this.$t('deal.standardView') : this.$t('deal.professionalView')
      const timeSharingText = _self.$t('deal.timeShare')
      const depthText = _self.$t('deal.depthMap')
      const bg = _self.theme == 'dark' ? "#0C1014" : '#ffffff'

      tvWidget.onChartReady(function () {
        tvWidget.addCustomCSSFile('/charting_library/hex.css')

        tvWidget.chart().setChartType(1) //set candle view

        tvWidget.chart().createStudy("Volume", false, false)

        tvWidget.activeChart().createStudy("Moving Average", false, false, { length: 5 },
          { "Plot.color": "#99aac7" }//gray
        )
        tvWidget.activeChart().createStudy("Moving Average", false, false, { length: 15 },
          { "Plot.color": "#e9e12f" } //yellow
        )
        tvWidget.activeChart().createStudy("Moving Average", false, false, { length: 25 },
          { "Plot.color": "#2026dc" } //blue
        )




        tvWidget.applyOverrides({
          "paneProperties.background": bg,
          "paneProperties.backgroundType": "solid"
        })
        tvWidget.chart().setResolution(15, function (e) { })


        tvWidget.activeChart().onIntervalChanged().subscribe(null,
          (interval, timeframeObj) => {
            _self.showDepthChart = false
            // timeframeObj.timeframe = { from: new Date('2015-01-01').getTime() / 1000, to: new Date('2017-01-01').getTime() / 1000, type: "time-range" }

            const candleView = tvWidget.activeChart().chartType() == 1
            if (!candleView) {//not candle view
              tvWidget.chart().setChartType(1)  //set candle view 
            }
          }
        );

      })

      tvWidget.headerReady().then(function () {

        var viewRedirectBtn = tvWidget.createButton({
          align: 'right'
        })
        var depthMarketBtn = tvWidget.createButton({
          align: 'right'
        })
        var timeGraphButton = tvWidget.createButton({
          align: 'left'
        })


        viewRedirectBtn.addEventListener('click', function () {
          _self.changeView()
        })
        viewRedirectBtn.textContent = btnText


        timeGraphButton.addEventListener('click', function () {
          _self.showDepthChart = false
          tvWidget.chart().setResolution(1, function (e) { })
          tvWidget.chart().setChartType(3)
        }) //set area graph on click
        timeGraphButton.textContent = timeSharingText

        depthMarketBtn.textContent = depthText
        depthMarketBtn.addEventListener('click', function () {
          _self.showDepthChart = true
        }) //show depth chart
      })



    },

    changeView() {

      this.showDepthChart = false
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
      console.log('route11111', this.$route)
      let query = this.$route.query
      query.ctid = ctid
      switch (route) {
        case "contract-pro-id":
          let path = '/contract/' + this.$route.params.id
          if (query.contractType == 1) {
            path += '?contractType=1'
          }
          this.$router.push({path: path})
          break;
        case "deal-pro-id":
          this.$router.push('/deal/' + this.$route.params.id)
          break;
        case "deals-pro-id":
          this.$router.push('/deals/' + this.$route.params.id)
          break;
        case "margin-pro-id":
          this.$router.push('/margin/' + this.$route.params.id)
          break;
        case "contract-id":
          this.$router.push({path: '/contract-pro/' + this.$route.params.id, query: query})
          break;
        case "deal-id":
          this.$router.push('/deal-pro/' + this.$route.params.id + '?ctid=' + ctid)
          break;
        case "deals-id":
          this.$router.push('/deals-pro/' + this.$route.params.id + '?ctid=' + ctid)
          break;
        case "margin-id":
          this.$router.push('/margin-pro/' + this.$route.params.id + '?ctid=' + ctid)
          break;
      }

    },
  },
  mounted() {
    window.vueContext = this
    this.initTradingView()
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove()
      this.tvWidget = null
    }
  }
}


</script>
  
<style scoped lang="scss">
@import '@/assets/variables/light';
@import '@/assets/scss/components/chart/chart';
</style>