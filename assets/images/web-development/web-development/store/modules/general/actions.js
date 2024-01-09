export default {
    setLoadingArticlesList({ commit }, payload) {
        commit('setLoadingArticlesList', payload)
    },

    setLoadingArticleDetail({ commit }, payload) {
        commit('setLoadingArticleDetail', payload)
    },

    setLoadingRelatedArticles({ commit }, payload) {
        commit('setLoadingRelatedArticles', payload)
    },

    setLoadingMainChannels({ commit }, payload) {
        commit('setLoadingMainChannels', payload)
    },

    setLaodingLatestArticles({ commit }, payload) {
        commit('setLaodingLatestArticles', payload)
    },

    setLoadingRecommendArticles({ commit }, payload) {
        commit('setLoadingRecommendArticles', payload)
    },

    //trade
setLoadingMarketTrades({ commit }, payload) {
    commit('setLoadingMarketTrades', payload)
},
setloadingMarketDepth({ commit }, payload) {
    commit('setloadingMarketDepth', payload)
},
//market
setLoadingQuotationDailyData({ commit }, payload) {
    commit('setLoadingQuotationDailyData', payload)
},
 


}
