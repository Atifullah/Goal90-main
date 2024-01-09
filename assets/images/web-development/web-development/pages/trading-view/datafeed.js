
import moment from 'moment';
import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';



const configurationData = {
    // Represents the resolutions for bars supported by your datafeed
    supported_resolutions: ["1", "5", "10", "15", "30", "60", "120", "240", "360", "720", "1D", "1W", "1M"],
    // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
    exchanges: [
        { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
        { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange' },
    ],
    // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
    symbols_types: [
        { name: 'crypto', value: 'crypto' }
    ]
};



async function getAllSymbols() {
    const data = vueContext.$store.getters.getSymbleinfos;
    const currencyInfos = vueContext.$store.getters.getCurrencyinfos;
    let allSymbols = [];
    data.forEach(symbol => {
        const coin = currencyInfos.find((currency) => currency.currencyname.includes(symbol.fcurrencyname))

        if (coin) {
            const obj = {
                symbol: symbol.descriptions,
                full_name: symbol.descriptions,
                description: symbol.descriptions,
                exchange: coin.fullname, //fullname
                type: 'crypto',
            }
            allSymbols.push(obj)
        }
    })
    return allSymbols
}


export default {
    onReady: async (callback) => {
        console.log('[onReady]: Method call')
        setTimeout(() => callback(configurationData))
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
        console.log('[searchSymbols]: Method call');
    },
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {
        console.log('[resolveSymbol]: Symbol resolved', symbolName)
        const symbols = await getAllSymbols()
        const symbolItem = symbols.find((symbol) => symbol.full_name.includes(symbolName))

        if (!symbolItem) {
            console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
            onResolveErrorCallback('Cannot resolve symbol');
            return
        }

        // Symbol information object
        const symbolInfo = {
            ticker: symbolItem.full_name,
            name: symbolItem.symbol,
            description: symbolItem.description,
            type: symbolItem.type,
            session: '24x7',
            timezone: moment.tz.guess(),
            exchange: symbolItem.exchange,
            minmov: 1,
            pricescale: 100,
            has_intraday: true,
            visible_plots_set: 'ohlc',
            has_weekly_and_monthly: false,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
        }
        console.log('[resolveSymbol]: symbolInfo', symbolInfo);
        onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => { 
        const { from, to, firstDataRequest } = periodParams; 
        return
      
        const symbol = vueContext.symbol.split('/').join('').toUpperCase()
        const params = {
            etime: to,
            type: 6,
            size: 250,
            symble: symbol,
            isindexprice: false
        } 
        await vueContext.$store.dispatch('quotation_kline_get', params)
            .then(({ data }) => {

                if (data) {
                    data.reverse()
                    const chartData = data.map(el => { 
                        return {
                            time: el.t * 1000, //TradingView requires bar time in ms
                            low: el.l,
                            high: el.h,
                            open: el.o,
                            close: el.c,
                            volume: el.v
                        }

                    }) 
                    if (chartData.length > 0 && from > chartData[0].time / 1000000) {
                        onHistoryCallback(chartData, { noData: false })
                    } else {
                        onHistoryCallback([], { noData: true })
                    }
                }
            }).catch((error) => {
                console.log('catchError', error)
            })
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },

};
