
import moment from 'moment';

var lastBar = {}


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
    const data = await vueContext.$store.getters.getSymbleinfos;
    const currencyInfos = await vueContext.$store.getters.getCurrencyinfos;
    let allSymbols = [];
    data.forEach(symbol => {
        const coin = currencyInfos.find((currency) => currency.currencyname.includes(symbol.fcurrencyname))
        
        if (coin) {
            const price_scale = Math.pow(10, parseInt(symbol.pricedigits));
             



            const obj = {
                symbol: symbol.descriptions,
                full_name: symbol.descriptions,
                description: symbol.descriptions,
                exchange: coin.fullname, //fullname
                type: 'crypto',
                price_scale: price_scale
            }
            allSymbols.push(obj)
        }
    })
    return allSymbols
}


export default {
    onReady: async (callback) => {
        console.log('[onReady]: Method call');
        console.log('widget.chart()', vueContext.$TVChart);
        setTimeout(() => callback(configurationData));
    },
    searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
        console.log('[searchSymbols]: Method call', userInput);
        const symbols = await getAllSymbols()
        const result = symbols
            .filter((symbolInfo) => {
                if (symbolInfo.full_name.toUpperCase().includes(userInput.toUpperCase()))
                    return {
                        symbol: symbolInfo.full_name,
                        full_name: symbolInfo.full_name,
                        description: symbolInfo.description,
                        exchange: symbolInfo.exchange,
                        params: [],
                        type: symbolInfo.type,
                        ticker: symbolInfo.full_name,
                    };
            });
        onResultReadyCallback(result)
        return Promise.resolve(result);

    },
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {

        console.log('[resolveSymbol]: Symbol resolved', symbolName)
        const symbols = await getAllSymbols()
        const symbolItem = symbols.find((symbol) => symbol.full_name.includes(symbolName))
        console.log('[resolveSymbol]: symbols', symbols)
        console.log('[resolveSymbol]: symbolItem', symbolItem)
        if (!symbolItem) {
            console.error('[resolveSymbol]: Cannot resolve symbol', symbolName);
            onResolveErrorCallback('Cannot resolve symbol');
            return
        }
        // Symbol information object
        const symbolInfo = {
            ticker: symbolItem.full_name,
            name: symbolItem.symbol,
            description: symbolItem.description.replace(/YX/g, "USDT"),
            type: symbolItem.type,
            session: '24x7',
            timezone: moment.tz.guess(),
            exchange: symbolItem.exchange,
            minmov: 1,
            pricescale: symbolItem.price_scale,
            has_intraday: true,
            has_weekly_and_monthly: true,
            visible_plots_set: 'ohlc',
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
            has_empty_bars: false
        }
        onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {

        const { from, to, firstDataRequest } = periodParams
        let type = 6
        let endTime = to
        console.log('resolution', resolution);
        if (resolution == 1) {
            type = 2
        } else if (resolution == 5) {
            type = 3
        } else if (resolution == 15) {
            type = 4
        } else if (resolution == 30) {
            type = 5
        } else if (resolution == 60) {
            type = 6
        } else if (resolution == 120) {
            type = 10
        } else if (resolution == 240) {
            type = 11
        } else if (resolution == 360) {
            type = 12
        } else if (resolution == 720) {
            type = 13
        } else if (resolution == 10) {
            type = 14
        } else if (resolution == '1D') {
            type = 7
        } else if (resolution == '1W') {
            type = 8
            endTime = to - (24 * 60 * 60);
        } else if (resolution == '1M') {
            type = 9
            endTime = to - (24 * 60 * 60);
        }



        const symbol = symbolInfo.full_name.split('/').join('').toUpperCase()
        const params = {
            etime: endTime,
            type: type,
            size: 250,
            symble: symbol,
            isindexprice: false
        }
        console.log("getBars:periodParams", periodParams)
        console.log("getBars:params", params)
        await vueContext.$store.dispatch('quotation_kline_get', params)
            .then(({ data }) => {
                //console.log("getBars:data outside", data)
                if (data) {

                    data.reverse()
                    lastBar = data[data.length - 1]

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
                    const frstTime = chartData.length > 0 ? chartData[0].time : 0

                    //console.log("getBars:chartData", chartData)
                    if (chartData.length > 0 && from > (frstTime / 1000000)) {
                        lastBar = chartData[0]
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
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID)

        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        document.addEventListener(
            "marketValueListener",
            (e) => {
                const detail = e.detail
                const price = detail.price
                const high = lastBar?.h >= price ? lastBar?.h : price
                const low = lastBar?.l <= price ? lastBar?.l : price
                if (lastBar) {
                    lastBar.h = high
                    lastBar.l = low
                    lastBar.c = price
                } else {
                    lastBar = {
                        h: high,
                        l: low,
                        c: price,
                    }
                }
                const bar = {
                    time: timestamp,
                    high: high,
                    low: low,
                    close: price,
                    volume: detail.amount,
                }
                return onRealtimeCallback(bar)
            },
            false,
        );
        return
    },
    unsubscribeBars: (subscriberUID) => {
        const sub = `market.${vueContext.symbol.replace("/", "").toLowerCase()}.kline.1min`
        vueContext.$socket.uninvoke({
            sub: sub,
            type: vueContext.$socket.type.quotation_kline_get
        });
    },
    onIntervalChange: (interval) => {
        console.log(`New chart interval selected: ${interval}`);
    }
}

