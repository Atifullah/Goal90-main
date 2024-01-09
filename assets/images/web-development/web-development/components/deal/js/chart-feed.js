import stream from './chart-stream.js'
import historyProvider from './chart-provider.js'
const resolutions = ["1", "5", "10", "15", "30", "60", "120", "240", "360", "720", "1D", "1W", "1M"];
export default {
  //创建feed
  createFeed: function (this_vue) {
    historyProvider.init();
    return {
      onReady: cb => {
        setTimeout(() => cb({
          supported_resolutions: resolutions
        }), 0)
      },
      searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        const symbol_stub = {
          name: this_vue.symbleinfo.fcurrencyname + ":" + this_vue.symbleinfo.tcurrencyname,
          ticker: this_vue.symbleinfo.fcurrencyname + ":" + this_vue.symbleinfo.tcurrencyname,
          type: 'crypto',
          session: '24x7',
          minmov: 1,
          pricescale: 10000,
          has_intraday: true,
          has_daily: true,
          has_weekly_and_monthly: true,
          volume_precision: 8,
          data_status: 'streaming',
          intraday_multipliers: resolutions,
          timezone: this_vue.timezone
        }
        var ilength=this_vue.symbleinfo.pricedigits 
        if(ilength==6) 
          symbol_stub.pricescale=1000000; 
        if(ilength==4) 
          symbol_stub.pricescale=10000; 
        if(ilength==2) 
          symbol_stub.pricescale=100; 
        setTimeout(() => {
          onSymbolResolvedCallback(symbol_stub)
        }, 0)
      },
      getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
         
        historyProvider.getBars(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
          .then(bars => {
            if (bars.length) {
              setTimeout(() => { 
                onHistoryCallback(bars);
                historyProvider.getLastBarsOther(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
              }, 6)
            } else {
              setTimeout(() => {
                onHistoryCallback(bars, {noData: true})
              }, 6)
            }
          }).catch(err => {
              onErrorCallback(err)
          })
      },
      subscribeBars: (symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback) => {
        stream.subscribeBars(symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback)
      },
      unsubscribeBars: subscriberUID => {
         stream.unsubscribeBars(subscriberUID)
      },
      calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
      },
      getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
        //optional
      },
      getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
        //optional
      },
      getServerTime: cb => {

      }
    }
  }
}
