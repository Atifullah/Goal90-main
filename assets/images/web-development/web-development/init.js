'use strict';
let fs;
if (!process.client) {
    fs = require('fs');
}
var api = 'https://test_api.bitnasdaq.io';  //'http://localhost:9090';
//
const initApi = api;
const obj = {
    buildDir: '.hex',
    server: {
        port: 9088, // default: 3000
        host: '0.0.0.0' // default: localhost
    },
    messages: {
        serverError: 'bitnasdaq.com Server error',
        nuxtjs: '',
        serverErrorDetails: '',
    },
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'viewport',content: 'width=device-width, initial-scale=1.0'}

        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/images/logo-bit.svg' },

          ],
        script: [
            { src: 'https://sg.captcha.qcloud.com/TCaptcha-global.js', ssr:false },
             { src: 'https://api.ipify.org/?format=json', type: 'application/json', ssr:false },
            { type: 'application/ld+json', json:{
            "@context":"https://schema.org",
            "@graph":[
               {
                  "@type":"CollectionPage",
                  "@id":"https://www.bitnasdaq.com/",
                  "url":"https://www.bitnasdaq.com/",
                  "name":"BitNasdaq - Cryptocurrency Exchange Platform",
                  "isPartOf":{
                     "@id":"https://www.bitnasdaq.com/#website"
                  },
                  "about":{
                     "@id":"https://www.bitnasdaq.com/about-us"
                  },
                  "description":"BitNasdaq, your trusted cryptocurrency exchange platform. Trade, invest, and manage your digital assets with ease. Join BitNasdaq today!",
                  "breadcrumb":{
                     "@id":"https://www.bitnasdaq.com/#breadcrumb"
                  }
               },
               {
                  "@type":"BreadcrumbList",
                  "@id":"https://www.bitnasdaq.com/#breadcrumb",
                  "itemListElement":[
                     {
                        "@type":"ListItem",
                        "position":1,
                        "name":"BitNasdaq"
                     }
                  ]
               },
               {
                  "@type":"WebSite",
                  "@id":"https://www.bitnasdaq.com/#website",
                  "url":"https://www.bitnasdaq.com/",
                  "name":"BitNasdaq",
                  "description":"BitNasdaq, your trusted cryptocurrency exchange platform. Trade, invest, and manage your digital assets with ease. Join BitNasdaq today!",
                  "publisher":{
                     "@id":"https://www.bitnasdaq.com/#organization"
                  }
               },
               {
                  "@type":"Organization",
                  "@id":"https://www.bitnasdaq.com/#organization",
                  "name":"BitNasdaq",
                  "url":"https://www.bitnasdaq.com/",
                  "logo":{
                     "@type":"ImageObject",
                     "@id":"https://www.bitnasdaq.com/#/schema/logo/image/",
                     "url":"https://www.bitnasdaq.com/images/logo.svg",
                     "contentUrl":"https://www.bitnasdaq.com/images/unique.png",
                     "width":387,
                     "height":380,
                     "caption":"BitNasdaq - Inclusive Intelligence, Where AI Meets Blockchain"
                  },
                  "image":{
                     "@id":"https://help.bitnasdaq.io/upload/images/2023/10/809779619f65f3d1.svg"
                  },
                  "sameAs": [
                     "https://t.me/Bitnasdaq_Global", 
                     "https://twitter.com/BitnasdaqGlobal", 
                     "https://www.facebook.com/profile.php?id=100093424770282", 
                     "https://www.instagram.com/bitnasdaq/", 
                     "https://discord.gg/a6w4Z2ARKv", 
                     "https://www.youtube.com/@Bitnasdaq", 
                     "https://www.linkedin.com/company/bitnasdaq/", "https://github.com/Bitnasdaq", 
                     "https://www.tiktok.com/@bitnasdaq?lang=en", 
                     "https://play.google.com/store/apps/details?id=com.bitnasdaq.exchange", 
                     "https://apps.apple.com/us/app/bitnasdaq-buy-sell-crypto/id6452725712"]
               }
            ]} }

        ],
    },
    loading: {
        // global loading options
        lazy: true,
      },
    router: {
        scrollBehavior: function (to, from, savedPosition) {
            return { x: 0, y: 0 };
        },
        middleware: ['route','meta'],
    },
    build: {

        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push(
                    {
                        enforce: 'pre',
                        test: /\.(js|vue)$/,
                        loader: 'eslint-loader',
                        exclude: /(node_modules)/,

                    },
                );
            }
        },
        vendor: [
            '~/plugins/main',
            '~/plugins/i18n',
            '~/plugins/axios',
            '~/plugins/notification',
        ],
        babel: {
            plugins: [
                [
                    'import',
                    { libraryName: 'antd', libraryDirectory: 'lib', style: true },
                    'antd',
                ],
            ],
            comments: true,
        },

        postcss: null,
    },
    css: [
        'ant-design-vue/dist/antd.less',
        '~assets/variables/light.less',
        'assets/scss/main.scss',
    ],
    plugins: [
        { src: '~/plugins/route' },
        { src: '~/plugins/global', ssr: false },
        { src: '~/plugins/main' },
        { src: '~/plugins/i18n' },
        { src: '~/plugins/axios' },
        { src: '~/plugins/constants',ssr:false },
        { src: '~/plugins/captcha', ssr: false },
        { src: '~/plugins/notification', ssr: false },
        { src: '~/plugins/antd-ui' },
        { src: '~/plugins/phone-input' },
        { src: '~/plugins/firebase', ssr: false},
        // { src: '~/plugins/swiper', ssr: false},
        { src: '~/plugins/seo', ssr: false},
        { src: '~/plugins/TVChart.js', ssr:false }
    ],
    // components: true,
    modules: [
        '@nuxtjs/axios',
        'vue-web-cam/nuxt',
    ],
    proxy: {
        '/userapi': {
            target: initApi,
        },
        '/comapi': {
            target: initApi,
        },
        '/c2capi': {
            target: initApi,
        },
        '/transactionapi': {
            target: initApi,
        },
    },
};
const init = {
    api: initApi,
    obj: obj,
};
export default init;
