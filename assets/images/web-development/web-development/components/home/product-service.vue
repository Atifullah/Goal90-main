<template>
    <div class="product-service w1427">
        <div class="product-title">{{$t('home.productTitle')}}</div>
        <div class="content">{{$t('home.productSubTitle')}}</div>
        <div class="list clearfix">
            <div class="list-item">
                <img src="../../static/images/pro_item1.png" alt="">
                <h1>{{$t('home.globalLayout')}}</h1>
                <p v-html="$t('home.globalLayoutContent')"></p>
            </div>
            <div class="list-item">
                <img src="../../static/images/pro_item2.png" alt="">
                <h1>{{$t('home.securitySystem')}}</h1>
                <p v-html="$t('home.securitySystemContent')"></p>
            </div>
            <div class="list-item">
                <img src="../../static/images/pro_item3.png" alt="">
                <h1>{{$t('home.tradingSystem')}}</h1>
                <p v-html="$t('home.globalLayoutContent')"></p>
            </div>
            <div class="list-item">
                <img src="../../static/images/pro_item4.png" alt="">
                <h1>{{$t('home.highScalability')}}</h1>
                <p v-html="$t('home.highScalabilityContent')"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "product-service",

        data () {
            return {
                lang: this.$store.state.hex_lang.locale,

            }
        },

        mounted () {

        },

        methods: {},
    }
</script>

<style scoped lang="less">
    .product-title {
        font-size: 34px;
        text-align: center;
        margin: 100px 0 20px 0;
    }

    .content {
        font-size: 18px;
        color: #737373;
        text-align: center;
        margin-bottom: 100px;
    }

    .list {
        display: flex;
        justify-content: space-between;

        .list-item {
            text-align: center;
            width: 25%;

            &:nth-of-type(2) {
                width: 28%;
            }

            &:nth-of-type(4) {
                width: 22%;
            }

            img {
                width: auto;
                height: 200px;
            }

            h1 {
                font-size: 18px;
                font-weight: normal;
                margin-top: 30px;
                margin-bottom: 10px;
            }

            p {
                font-size: 12px;
                color: #737373;
            }
        }
    }

    .clearfix {
        zoom: 1;
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>
