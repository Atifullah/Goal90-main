<template>
    <div class="home-help">
        <div class="w1427">
            <p class="trade-reasons-title">{{$t('home.homehelp1')}}</p>
            <h2>{{$t('home.homehelp2')}}</h2>
            <div class="trade-reasons-content">
                <ul>
                    <li>
                        <div class="trade-reasons-content-icon smart">
                            <img src="../../static/images/help1.png" alt="" />
                        </div>
                        <p class="trade-reasons-content-title">
                            {{$t('home.homehelp3')}}
                        </p>
                        <p class="trade-reasons-content-description">
                            {{$t('home.homehelp4')}}
                        </p>
                        <a href="#" class="more">{{$t('home.homehelp5')}}</a>
                    </li>
                    <li>
                        <div class="trade-reasons-content-icon security">
                            <img src="../../static/images/help2.png" alt="" />
                        </div>
                        <p class="trade-reasons-content-title">{{$t('returntxt.rtxt32')}}</p>
                        <p class="trade-reasons-content-description">
                            {{$t('home.homehelp6')}}
                        </p>
                        <a href="/help" class="more">{{$t('home.homehelp7')}}</a>
                    </li>
                    <li>
                        <div class="trade-reasons-content-icon suport">
                            <img src="../../static/images/help3.png" alt="" />
                        </div>
                        <p class="trade-reasons-content-title">{{$t('home.homehelp8')}}</p>
                        <p class="trade-reasons-content-description">
                            {{$t('home.homehelp9')}}
                        </p>
                        <a class="more">{{$t('home.homehelp7')}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg1"><img src="../../static/images/bg1.png" alt=""></div>
        <div class="bg2"><img src="../../static/images/bg1.png" alt=""></div>
    </div>
</template>

<script>
export default {
    name: "help",

    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style scoped lang="less">
    .home-help{
        background: #fff;
        padding: 50px 0 150px 0;
        position: relative;
        .w1427{
          position: relative;
          z-index: 1;
        }
    }

     .trade-reasons-content ul{
        display: flex;
        justify-content: space-between;
    }
    .trade-reasons-content ul li {
        background: #fff;
        width: 31.5%;
        padding: 30px;
        box-shadow: 80px 60px 256px #73899529;
    }
    .trade-reasons-content ul li .more{
        color: #FF8000;
    }
    .trade-reasons-content ul li .trade-reasons-content-icon {
        width: 110px;
        height: 110px;
        display: flex;
        align-items: center;
        margin-bottom:20px;
    }
    .trade-reasons-content ul li .trade-reasons-content-title {
        width: 329px;
        margin-bottom: 16px;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 31px;
        color: #15192a;
    }
    .trade-reasons-content ul li .trade-reasons-content-description {
        width: 100%;
        padding-right: 12px;
        font-weight: normal;
        font-size: 18px;
        line-height: 26px;
        color: #15192a;
        opacity: 0.7;
        margin-bottom: 20px;
    }
    .trade-reasons-title {
        padding-top: 80px;
        padding-bottom: 20px;
        font-style: normal;
        font-weight: bold;
        font-size: 46px;
        line-height: 52px;
        color: #15192a;
        white-space: pre-wrap;
    }
    h2{
      font-weight: normal;
      font-size: 20px;
      margin-bottom: 50px;
    }
    .bg1{
        position: absolute;
        width: 22%;
        height: auto;
        z-index: 0;
        bottom: 50px;
        left: 0;
        transform: scale(-1,1);
    }
    .bg2{
        position: absolute;
        width: 20%;
        height: auto;
        z-index: 0;
        bottom: 0;
        right: 0;
    }
    @media (min-width: 1200px) and (max-width: 1919px) {
        .home-help .w1427{
            width: 1200px;
        }
    }
</style>
