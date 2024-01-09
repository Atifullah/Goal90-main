export default () => ({

    symbolInfo: {},
    tempData: {}, //need to store temprary data  
    MarketTrades: false,
    marketDepth: false,
    triggerOrderOpened: false,
    socketTradeDetail: {}, //data.data
    socketTradeDetailData: [],
    lastBar:{
        time:null,
        high:null,
        low:null,
        open:null,
        close:null
    }
})
