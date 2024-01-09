const url = {
    constants: '/comapi/v1.0/com/constants.getconstantsinfo',
}



export default {
    async fetchConstants({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.constants
        }
        const response = await dispatch('makeApiCall', params)
        const object = JSON.parse(response.data)
        if (response.code == 200) {
            commit('setConstants',object)
            if (object.left_time > 0) {
                if (location.pathname != '/maintenance') {
                  location.href = '/maintenance'
                }
                return
              }
        }
    },
    async isBuyBnq({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.constants
        }
        const response = await dispatch('makeApiCall', params)
        
        const object = response.data
        if (response.code == 200) {
            commit('setIsBnq', object)
        }
    },
    async makeApiCall({ rootState, rootGetters }, params) {
        try { 

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
 
            if (response.code && response.code != 200) {
                throw Error(response)
            }
            return response
        } catch (error) {
            console.error('auth store in makeApiCall function', error)
            return error
        }
    }
}



