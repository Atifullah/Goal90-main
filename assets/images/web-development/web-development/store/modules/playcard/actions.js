

const url = {
    games: "/gameapi/v1.0/game/games.get",
    gamerooms: "/gameapi/v1.0/game/gamerooms.get",
    gameroominfo: "/gameapi/v1.0/game/gameroominfo.get",
    mybetorder: "/gameapi/v1.0/game/mybetorders.get",
    usergameassets: "/gameapi/v1.0/game/usergameassets.get",
    betcreate: '/gameapi/v1.0/game/bet.create',
}
export default {
    async fetchGames({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingGames',
            end_point: url.games
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setGames', object.pagedata)
        return object.pagedata
    },

    async fetchGameRooms({ commit, dispatch }, params) {

        params.metadata = {
            loader: 'loadingGameRooms',
            end_point: url.gamerooms
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        //console.log("setGames")
        commit('setGameRooms', object)
        return object
    },

    async fetchGameRoomInfo({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingGameRoomInfo',
            end_point: url.gameroominfo
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setGameRoomInfo', object)
        return object
    },

    async fetchBlockHashes({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingHashes',
            end_point: url.games
        }
        const response = await dispatch('makeApiCall', params);
        const data = response.data
        let hashes = []

        if (data) {
            hashes = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setHashPagination', object)
        }

        commit('setBlockHashes', hashes)
        return response
    },

    async fetchHashGameRoomInfo({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingHashGamesInfo',
            end_point: url.gameroominfo
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setHashGamesInfo', object)
        return object
    },

    async fetchPlayers({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingStrategyInfo',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);
        const data=response.data
        let players = []
        if (data) {
            players = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setPlayerPagination', object)
        }
        commit('setPlayers', players)
        return players
    },

    async fetchOpenBetting({ commit, dispatch }, params) {
        //console.log("dsafsadfasdfasdfsdafsdafsadfsadfasdfsdafsdafsdafsdafd")
        params.metadata = {
            loader: 'loadingStrategyInfo',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);
        const data=response.data
        let open = []
        if (data) {
            open = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setOpenPagination', object)
        }
        commit('setOpenBetting', open)
        return open

    },

    async fetchHistoryBetting({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingStrategyInfo',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);
        const data=response.data
        let history = []
        if (data) {
            history = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setHistoryPagination', object)
        }
        commit('setHistoryBetting', history)
        return history
    },


    async fetchBettingOrders({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingOrders',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);

        const data = response.data
        let orders = []

        if (data) {

            orders = data.pagedata ? data.pagedata : []

            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }

            commit('setListPagination', object)
        }


        commit('setBetOrders', orders)
        return orders
    },



    async fetchUserGameAssets({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingStrategyInfo',
            end_point: url.usergameassets
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setUserGameAssets', object)
        return object
    },
    async submitBetCreate({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingBetCreate',
            end_point: url.betcreate
        }
        const response = await dispatch('makeApiCall', params);
        return response
    },

    async makeApiCall({ rootState, rootGetters }, params) {
        try {
            //console.log('rootGetters', rootGetters)
            //console.log('rootState.general', rootState.general)

            const general = rootState.general
            const metadata = params.metadata

            const loader = metadata ? metadata.loader : null

            if (loader) {
                general[loader] = true
            }

            params.lang = rootGetters.currentLang
            const end_point = metadata.end_point

            delete params['metadata']
            const response = await this.$axios.post(end_point, params, {})

            if (loader) {
                general[loader] = false
            }

            //console.log('makeApiCall response: ', response)
            if (response.code && response.code != 200) {
                throw Error(response)
            }
            return response
        } catch (error) {
            console.error('playcard store in makeApiCall function', error)
            return error
        }
    }

}
