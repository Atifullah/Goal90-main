export default {
    setStrategyInfo(state, object) {
        state.strategyInfo = object
    },
    setStrategyTradeStatus(state, bool) {
        state.isStrategyTrade = bool
    },
    setHorizentalStrategyFormHeight(state, height) {
        state.horizentalStrategyFormHeight = height
    },
    setStrategyTabActive(state, bool) {
        state.strategyTabActive = bool
    },
    setStrategyTabPosition(state, str) {
        state.strategyTabPosition = str
    },
}