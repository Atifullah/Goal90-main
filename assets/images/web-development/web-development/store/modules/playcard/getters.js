export default {
  getGames(state) {
    return state.games
  },
  getGamesArray(state){
    return state.games?.pagedata
  },
  getGameRooms(state) {
    return state.gamerooms
  },
  getGameRoomInfo(state) {
    return state.gameroominfo
  },
  getBlockHashes(state) {
    return state.blockHashes
  },
  getPlayers(state) {
    return state.players
  },
  getOpenBetting(state) {
    return state.openingbetting
  },
  getHistoryBetting(state) {
    return state.historybetting
  },
  getBetOrders(state, getters, rootState, rootGetters) {
    const betOrders = state.betOrders
    const symbolInfos = rootState.currencyinfos
    const modifiedOrders = betOrders.map(order => {


      const currencyInfo = symbolInfos.find((info) => info.id == order.currencyid)
      if (currencyInfo) {
        return {
          ...order,
          icon: currencyInfo.icon,
          currencyname: currencyInfo.currencyname
        }
      } 

    })


    return modifiedOrders
  },

  getUserGameAssets(state) {
    return state.usergameassets
  },

  getCurrentSelectedHash(state) {
    return state.currentSelectedHash
  },

  listPagination(state) {
    return state.listPagination
  },

  hashPagination(state, object) {
    return state.hashPagination
  },
  playerPagination(state, object) {
    return state.playerPagination
  },
  openPagination(state, object) {
    return state.openPagination
  },
  historyPagination(state, object) {
    return state.historyPagination
  },
  billingPagination(state, object) {
    return state.billingPagination
  },


  getHashGamesInfo(state, object) {
    return state.hashGamesInfo
  }

}
