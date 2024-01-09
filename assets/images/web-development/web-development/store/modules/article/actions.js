import * as CryptoJS from 'crypto-js';
import article from '.';
const url = {
    articleInfo: "/comapi/v1.0/com/article.info.get",
    supportNotSupport: "/comapi/v1.0/com/articledata.create",
    channels: "/comapi/v1.0/com/article.channels",
    searchArticle: "/comapi/v1.0/com/article.search",
    createComment: "/comapi/v1.0/com/comment.create",
    getArticleComments: "/comapi/v1.0/com/articlecommont.get"
}

export default {
    async fetchArticleChannels({ commit, dispatch }, params) {
        params.loader = 'loadingMainChannels'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params);
        const channelObject = response.data
        commit('setArticleChannels', channelObject)
    },
    async fetchAnnouncement({ commit, dispatch }, params) {
        params.loader = 'loadingMainChannels'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params);

        const channelObject = response.data ? response.data.children : []
        commit('setAnnouncement', channelObject)
    },
    async fetchArticles({ commit, dispatch }, params) {

        params.end_point = url.searchArticle
        params.storeDataInCache = true
        params.loader = 'loadingArticles'
        const response = await dispatch('makeApiCall', params)
        return response
    },
    async fetchSubItems({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.loader = 'loadingArticlesList'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)
        const data = response.data
        let subItems = []
        if (data) {

            subItems = data.pagedata ? data.pagedata : []
        const object = {
            currentPageIndex: params.pageIndex,
            hasNextPage: data.hasnextpage,
            hasPreviousPage: data.haspreviouspage,
            pageSize: params.pageSize,
            totalItemCount: data.totalitemcount,
            totalPageCount: data.totalpagecount,
        };

            commit('setSubItemPagination', object)
        }
        commit('setSubItems', subItems)
        return response
    },
    async onSearch({ commit, dispatch }, params) {
       params.end_point = url.searchArticle
        params.loader = 'loadingArticlesList'
        params.storeDataInCache = true
    const response = await dispatch('makeApiCall', params);
    const data = response.data;
    let searchResults = [];
    if (data) {
      searchResults = data.pagedata ? data.pagedata : [];
    }
    commit('setSearchResults',searchResults)
  },


    async fetchLatestArticles({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.loader = 'laodingLatestArticles'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)
        console.log("latest article res ",response)

        let articles = []
        if (response.data) {
            articles = response.data.pagedata ? response.data.pagedata : []
        }
        commit('setLatestArticles', articles)

    },

    async fetchRecomendArticles({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.loader = 'loadingRecommendArticles'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)
        let articles = []
        if (response.data) {
            articles = response.data.pagedata ? response.data.pagedata : []
        }
        commit('setRecomendArticles', articles)
    },

    async fetchChannelInfo({ commit, dispatch }, params) {
        params.end_point = url.articleInfo
        const object = { //to get related articles
            ...params,
            channelID: params.subChannel,
        }
        params.loader = 'loadingArticleDetail'
        params.storeDataInCache = true

        const [response] = await Promise.all([
            dispatch('makeApiCall', params),
            dispatch('fetchSubItems', object)
        ])
        const subItem = response.data
        commit('setSubItem', subItem)
    },
    async fetchBullishBearishData({ commit, dispatch }, payload) {
        const params = {
            end_point: url.articleInfo,
            articleID: payload.articleID
        };
        params.storeDataInCache = false
        return await dispatch('makeApiCall', params)
    },

    async submitComment({ commit, dispatch }, params) {
        params.end_point = url.createComment
        params.loader = 'creatingArticleComment'
        params.storeDataInCache = false
        const response = await dispatch('makeApiCall', params)
        if (response.code == 200) {
            dispatch('fetchComments', { articleId: params.articleID, pageIndex: 1, pageSize: 10 })
        }
        return response
    },
    async fetchComments({ commit, dispatch }, params) {
        params.end_point = url.getArticleComments
        params.loader = 'loadingComments'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)

        let comments = []
        const data = response.data
        if (data) {
            comments = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setCommentsPagination', object)
        }

        commit('setArticleComments', comments)
        return response
    },


    saveCurrentChannelToState({ commit }, payload) {
        commit('setCurrentChannel', payload)
    },

    async saveSupportNotSupport({ commit, dispatch }, params) {
        params.end_point = url.supportNotSupport
        let loader = 'notSupporting'
        if (params.isSupport) {
            loader = 'supporting'
        }

        params.loader = loader
        params.storeDataInCache = false
        const response = await dispatch('makeApiCall', params)
        return response
    },

    //home page top section data
    async fetchPromotions({ commit, dispatch }, params) {
        params.end_point = url.searchArticle

        params.loader = 'loadingPromotions'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)
        const footerData = response.data ? response.data.pagedata : []

        commit('setPromotions', footerData)
        return response
    },

    //footer channel
    async fetchFooterData({ commit, dispatch }, params) {
        params.end_point = url.channels

        params.loader = 'loadingFooterData'
        params.storeDataInCache = true

        const response = await dispatch('makeApiCall', params)
        const footerData = response.data ? response.data.children : []

        commit('setFooterData', footerData)
        return response
    },

    async makeApiCall({ rootState, rootGetters }, params) {
        try {
            const loader = params.loader ? params.loader : null
            const general = rootState.general
            if (loader) {
                general[loader] = true
            }
            params.lang = rootGetters.currentLang
            params.end_point = params.end_point ? params.end_point : url.channels
            const shouldStoreDataInCache = params.storeDataInCache
            let response;
            const paramsMD5 = CryptoJS.MD5(JSON.stringify(params)).toString()
            if (shouldStoreDataInCache && process.client && window.localStorage.getItem(paramsMD5) && (new Date().getTime() < (new Date(JSON.parse(window.localStorage.getItem(paramsMD5)).expireTime).getTime() + (60 * 60 * 1000)))) {
                response = JSON.parse(window.localStorage.getItem(paramsMD5))
                if (loader) {
                    general[loader] = false
                }
                return response

            }
            else {
                response = await this.$axios.post(params.end_point, params, {})
                if (loader) {
                    general[loader] = false
                }
                if (response.code && response.code != 200) {
                    throw Error(response)
                }
                if (process.client && response.data) {
                    let storageData = response
                    storageData.expireTime = new Date()
                    window.localStorage.setItem(paramsMD5, JSON.stringify(storageData));
                } 
                return response
            }
        } catch (error) {
            console.error('article store in makeApiCall function', error)
            return error
        }
    }

}
