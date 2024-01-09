import * as CryptoJS from 'crypto-js';
export const gridProfitFees = (maxPrice, minPrice, gridNo, currentMarketPrice) => { //calculate the grid profit percentage 
    //((( max - min )/gridNo )/nowPrice) * 100
    // devide the difference of min and max with gridNo
    // then get the percentage of that value with nowPrice of grid (Last Price at trade dashboard)

    const nowPrice = currentMarketPrice.price
    const difference = maxPrice - minPrice
    const gridValue = difference / gridNo
    const percentage = (gridValue / nowPrice) * 100

    return percentage
}

export const gridProfitFeesRange = (percentage) => {
    const minValue = parseFloat(percentage * 0.75).toFixed(2) //suggested value
    const maxValue = parseFloat(percentage * 1.25).toFixed(2) //suggested value

    return {
        min: minValue,
        max: maxValue
    }
}


export const updateMarketPrice = (currentContext, currencySymbol) => {
    //whenever called must uninvoke this socket before leaving page or component
    const context = currentContext
    //console.log('_self.$socket', context.$socket);
    const symbleParameString = currencySymbol.toLowerCase()
    context.$socket.invoke({
        sub: 'market.' + symbleParameString + '.detail',
        type: context.$socket.type.quotation_daily_get
    })

    context.$socket.receive(context.$socket.type.quotation_daily_get, function (data) {

        context.$store.commit('market/setCurrentMarketPrice', data.data)
    })
}

export const isMobile = {

    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export const isTradeView = (vueContext) => {
    return vueContext.$route.name == 'deal-id' ||
        vueContext.$route.name == 'margin-id' ||
        vueContext.$route.name == 'contract-id' ||
        vueContext.$route.name == 'deal-pro-id' ||
        vueContext.$route.name == 'margin-pro-id' ||
        vueContext.$route.name == 'contract-pro-id'
}

export const saveInLocalCache = (key, data) => {
    if (process.client && data) {
        const paramsMD5 = CryptoJS.MD5(JSON.stringify(key)).toString()
        const storageData = data
        storageData.expireTime = new Date()
        window.localStorage.setItem(paramsMD5, JSON.stringify(storageData));
    }
}