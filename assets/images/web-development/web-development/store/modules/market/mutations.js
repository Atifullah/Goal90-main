

const setCurrencyDetail = (state, payload) => {
    state.currencyDetail = payload
}

const setCurrencyGraphData = (state, payload) => {
    state.currencyGraphData = payload
}

const setQuotationDailyData = (state, payloadArray) => {
    return state.quotationDailyData = payloadArray
}
const setCurrentCurrency = (state, currency) => {
    return state.currentCurrency = currency
}

const setMarkAsFavorite = (state, isFavorite) => {
    return state.spotMarket.self = isFavorite
}
const setFavoriteList = (state, data) => {
    return state.favoriteList = data
}

const setCurrentMarketPrice = (state, data) => {
    state.prevMarketPrice = state.currentMarketPrice.c
    return state.currentMarketPrice = data
}
const setCurrentMarketType = (state, data) => {
    return state.currentMarketType = data
}

const setContractAllMarketList = (state, data) => {
    return state.contractMarketPriceList = data
}

export default {
    setCurrencyDetail,
    setCurrencyGraphData,
    setQuotationDailyData,
    setCurrentCurrency,
    setMarkAsFavorite,
    setFavoriteList,
    setCurrentMarketPrice,
    setCurrentMarketType,
    setContractAllMarketList
}