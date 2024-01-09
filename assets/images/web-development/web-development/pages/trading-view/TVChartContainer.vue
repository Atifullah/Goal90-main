<template>
  <div :id="containerId" class="TVChartContainer" />
</template>
  
<script>
import Datafeed from './datafeed.js';
import moment from 'moment';
function getLanguageFromURL() {
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp('[\\?&]lang=([^&#]*)')
  const results = regex.exec(window.location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export default {
  name: 'TVChartContainer',
  props: {
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
    }
  },

  methods: {
    initTradingView() {
      const widgetOptions = {
        symbol: this.symbol,            // Default symbol pair
        interval: this.interval,                        // Default interval
        fullscreen: true,                      // Displays the chart in the fullscreen mode
        container: this.containerId,       // Reference to an attribute of a DOM element
        datafeed: Datafeed,
        library_path: this.libraryPath,
        timezone: moment.tz.guess(),// 'Asia/Karachi',
        supported_resolutions: ['1D', '1W', '1M'],
        exchanges: [
          { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
          { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange' },
        ],
        symbols_types: [
          { name: 'crypto', value: 'crypto' }
        ],
        locale: getLanguageFromURL() || 'en',


        charts_storage_api_version: this.chartsStorageApiVersion,
        client_id: this.clientId,
        user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,

        disabled_features: ["save_chart_properties_to_local_storage", "volume_force_overlay"],
        enabled_features: ["move_logo_to_main_pane", "study_templates"],

        studies_overrides: {
          "volume.volume.color.0": "#00FFFF",
          "volume.volume.color.1": "#0000FF",
          "volume.volume.transparency": 70,
          "volume.volume ma.color": "#FF0000",
          "volume.volume ma.transparency": 30,
          "volume.volume ma.linewidth": 5,
          "volume.volume ma.visible": true,
          "bollinger bands.median.color": "#33FF88",
          "bollinger bands.upper.linewidth": 7
        },
        debug: true,
        time_frames: [
          { text: "50y", resolution: "6M" },
          { text: "3y", resolution: "W" },
          { text: "8m", resolution: "D" },
          { text: "2m", resolution: "D" },
          { text: "1m", resolution: "60" },
          { text: "1w", resolution: "30" },
          { text: "7d", resolution: "30" },
          { text: "5d", resolution: "10" },
          { text: "3d", resolution: "10" },
          { text: "2d", resolution: "5" },
          { text: "1d", resolution: "5" }
        ],
        favorites: {
          intervals: ["1D", "3D", "3W", "W", "M"],
          chartTypes: ["Area", "Line"]
        },
        theme: "dark", //light, dark
        overrides: {
          "paneProperties.background": "#0C1014",
          "paneProperties.horzGridProperties.style": "1",
          "mainSeriesProperties.style": 0,
          "volumePaneSize": "tiny"
        },
        activeChart: () => {
          console.log('activeChartactiveChartactiveChartactiveChartactiveChartactiveChart');
        }


      }

      const {
        $TVChart: { Widget }
      } = this
      const tvWidget = new Widget(widgetOptions)
      this.tvWidget = tvWidget



      setTimeout(() => {
        this.tradingViewSettingWhenReady(tvWidget)
      }, 2000);


    },

    tradingViewSettingWhenReady(tvWidget) {
      
    }

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
  
<style scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>