<template>
    <div class="start-trading">
        <div class="product-title">{{$t('home.startTrading')}}</div>
        <div class="content">
            <span>{{$t('home.startTradingContent')}}</span>
            <img src="../../static/images/player.png" alt="" class="player">
        </div>
        <nuxt-link v-if="!$userinfo.uid" to="/login" class="a-login">
            <button class="login">{{$t('home.headLogin')}}</button>
        </nuxt-link>
        
    </div>
</template>

<script>
    export default {
        name: "start-trading",

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
    .start-trading {
        background: url('../../static/images/tradbg.png') no-repeat center bottom;
        text-align: center;
        height: 335px;
        position: relative;
        span{
            position: relative;
            z-index: 10;
        }
        .player{
            width: 384px;
            height: 330px;
            position: absolute;
            right: 0;
            bottom: -252px;
            z-index: 0;
        }
        .product-title {
            font-size: 40px;
            text-align: center;
            margin: 150px 0 20px 0;
            padding-top: 10px;
            font-weight: bold;
        }

        .content {
            font-size: 18px;
            color: #737373;
            text-align: center;
            width: 1440px;
            margin: 0 auto 60px auto;
            position: relative;
        }

        .login {
            width: 190px;
            height: 57px;
            border-radius: 10px;
            color: white;
            font-size: 20px;
            display: inline-block;
            cursor: pointer;
            background: #f7a600;
            margin: 0 auto;
            &:hover {
                background: #f9b833;
            }
        }
    }
</style>
