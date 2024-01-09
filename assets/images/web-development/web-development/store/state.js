"use strict";
import config from "./config";
export default () => ({
    hex_lang: {
        type: "HEX_LANG",
        default: "en_us",
        locales: [
            { locale: "en_us", lang: "English" },
            { locale: "zh_cn", lang: "简体中文" },
            { locale: "zh_tc", lang: "繁體中文" },
            { locale: "ru", lang: "Русский" },
            { locale: "es", lang: "Español (España)" },
            { locale: "es_la", lang: "Español (Latinoamérica)" },
            { locale: "fr", lang: "Français" },
            { locale: "vi", lang: "Tiếng Việt" },
            { locale: "tr", lang: "Türkçe" },
            { locale: "it", lang: "Italiano" },
            { locale: "pl", lang: "Polski" },
            { locale: "id", lang: "Bahasa Indonesia" },
            { locale: "uk_ua", lang: "Українська" },
            { locale: "ar", lang: "العربية" },
            { locale: "en_au", lang: "English (Australia)" },
            { locale: "pt_br", lang: "Português (Brasil)" },
            { locale: "en_in", lang: "English (India)" },
            { locale: "en_ng", lang: "English (Nigeria)" },
            { locale: "ro", lang: "Română" },
            { locale: "bg", lang: "български" },
            { locale: "cs", lang: "Čeština" },
            { locale: "lv", lang: "latviešu valoda" },
            { locale: "bn", lang: "বাংলা" },
            { locale: "sv", lang: "Svenska" },
            { locale: "pt_pt", lang: "Português (Portugal)" },
            { locale: "es_mx", lang: "Español (México)" },
            { locale: "el", lang: "Ελληνικά" },
            { locale: "sk", lang: "Slovenčina" },
            { locale: "sl", lang: "Slovenščina" },
            { locale: "ur", lang: "اردو" },
            { locale: "es_ar", lang: "Español (Argentina)" },
            { locale: "fr_fr", lang: "Français (Afrique)" },
            { locale: "en_kz", lang: "English (Kazakhstan)" },
            { locale: "en_za", lang: "English (South Africa)" },
            { locale: "en_nz", lang: "English (New Zealand)" },
            { locale: "en_bh", lang: "English (Bahrain)" },
            { locale: "ar_bh", lang: "العربية (البحرين)" },
            { locale: "ru_ua", lang: "Русский (Украина)" },
            { locale: "de_ch", lang: "Deutsch (Schweiz)" },
            { locale: "ka_ge", lang: "ქართული" },
            { locale: "kk_kz", lang: "Қазақша (Қазақстан)" },
            { locale: "ru_kz", lang: "Русский (Казахстан)" },
            { locale: "kz", lang: "Қазақша" },
            // {locale: "ko_kr", lang: "한국어"},
            // {locale: "zh_hk", lang: "繁體中文"},
            // {locale: "ja_jp", lang: "日本語"}
        ],
        locale: "en_us",
    },

    hex_timestamp: {
        type: "HEX_TIMESTAMP",
        value: "",
    },

    hex_uid: {
        type: "HEX_UID",
        value: "",
    },

    hex_key: {
        type: "HEX_KEY",
        value: "",
    },

    hex_token: {
        type: "HEX_TOKEN",
        value: "",
    },

    hex_user_info: {
        type: "HEX_USER_INFO",
        value: "",
    },

    hex_server_user_info: {
        type: "HEX_SERVER_USER_INFO",
        value: "",
    },
    //set state of visitor email
    visitor_user: {
        userInput: "",
    },
    popoverstate: {
        showPopover: false,
    },
    hex_server_user_assets: {
        type: "HEX_SERVER_USER_ASSETS",
        value: "",
    },
    hex_server_user_settings: {
        type: "HEX_SERVER_USER_SETTINGS",
        value: "",
    },
    hex_client_background: {
        type: "HEX_CLIENT_BACKGROUND",
        active: "",
        default: "night",
    },
    hex_client_exchange: {
        type: "HEX_CLIENT_EXCHANGE",
        default: "usd",
        active: "USD",
        infos: [],
    },
    hex_client_language: {
        type: "HEX_CLIENT_LANGUAGE",
        value: "en_us",
    },
    hex_config: config,
    message: {
        text: "",
        type: "",
    },
    c2c_message: {},
    hovers: 1,
    route: {
        active: "",
        person: "/person",
        authentication: "/person/authentication",
        wallet: "/person/wallet",
        walletHistory: "/person/wallet-history",
        tickets: "/person/my-tickets",
        deal: "/person/deal",
        marginDeal: "/person/margin/margin-deal",
        contractDeal: "/person/contract/contract-deal",
        underway: "/person/underway",
        undone: "/person/undone",
        security: "/person/security",
        withdraw: "/person/wallet-address",
        history: "/person/login-history",
        api: "/person/api",
        legal: "/person/legal-currency",
        legalset: "/person/legal-set",
        payment: "/person/payment",
        invitation: "/person/invitation",
        mycard: "/person/mycard",
        manage: "/person/financial-deal",
        margin: "/person/margin",
        marginDetail: "/person/margin/wallet-margin",
        financialDeal: "/person/financial-deal",
        contract: "/person/contract",
        personP2p: "/person/p2p",
        gameAccount: "/person/game-account",
        gameOrders: "/person/game-history",
        walletAddress: "/person/wallet-address",
        convertHistory: "/person/convert-history",
        convert: "/convert",
        changePassword: "/person/security/password-change",
        bindPhoneNo: "/person/security/binding-mobile",
        bindEmail: "/person/security/binding-email-google",
        changeGoogleVerification: "/person/security/google-change",
        fundsPassword: "/person/security/password-capital",
        createTicket: "/person/my-tickets/create-ticket",

        buyAndSell: "/p2p/buy-and-sell",
        paymentMethod: "/p2p/payment",
        p2pAccount: "/p2p/p2p-account",
        postNewAd: "/p2p/post-new-add",
        myAds: "/p2p/my-ads",
        closedAds: "/p2p/closed-ads",
        adsHistory: "/p2p/ads-history",
        inProcess: "/p2p/in-process",
        orderHistory: "/p2p/orders-history",
        beginnersGuide: "/p2p/beginners-guide",
        videoTutorial: "/p2p/video-tutorial",
        p2pTradingFaqs: "/p2p/trading-faqs",
        accountFunction: "/help-dashboard/account-function",
        helpCenterChannelDetail: "/help-dashboard", //{channel}/{sub_channel}
        channelInfo: "/help-dashboard/", //{channel}/{sub_title}
        helpCenter: "/help-center",
        searchResult: "/help-center/search-results", //?query=some-text
        blogsDetail: "/blogs",
        blogsDetailCopy: "/new-blogs",
        newsDetail: "/news", //_slug
        market: "/market",
        marketDetail: "/market/detail",
        rewardHub: "/rewards-hub",
        dealPro: "/deal-pro",
        marginPro: "/margin-pro",
        futurePro: "/contract-pro",
        deleteAccount:"/person/delete-account"
    },
    bbTitleList: [],
    exchangeRate: [],
    decimalsList: [],
    symbleinfos: [],
    currencyinfos: [],
    legaltypes: [],
    timer: {},
    ip: "",
    tradeview: "",
    inprocessorders: 0,
    dotType: 8,
    maintain: {},
    user_allwithdrawlimtperday: "",
    tradeScript: [
        // {src: '/im/speakmd5.js', id: 'speakmd5'},
        // {src: '/im/json2.js', id: 'json2'},
        // {src: '/im/webim.js', id: 'webim'}
    ],
    dealScript: [{ src: "/chart/hex_chart.js", id: "hex_chart" }],
    HexKlineType: {
        type: "Hex_Kline_Type",
        value: "STYLE_CANDLES",
    },
    h1Seo: '',
    titleSeo: '',
    descriptionSeo: '',
    currentRouteSeo: '',

    selectedPayment: {},
    currenciesColors: {
        BTC: '#f7931a',
        ETH: '#2e2f2f',
        LTC: '#345d9d',
        BCH: '#ef891d',
        NEO: '#00e599',
        TRX: '#d90b18',
        UNI: '#f60279',
        LINK: '#345d9d',
        BNB: '#f0b90b',
        ETC: '#328332',
        XMR: '#fa6800',
        FIL: '#0090ff',
        XRP: '#23292f',
        ARB: '#2c374b',
        DOGE: '#ba9f33',
        USDT: '#26a17b',
        BNQ: '#f7931a'
    }
});
