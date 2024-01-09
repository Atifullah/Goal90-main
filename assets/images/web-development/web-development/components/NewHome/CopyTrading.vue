<template>
    <div class="copy-trading mt-10 ">
        <div class="main-content">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="11" :xl="9">
                    <p class="trading-text fw-5 mb-0 text-black">{{$t('copytrade.copytrade')}}</p>
                    <p class="trading-desc fw-4 text-black">{{$t('copytrade.platform')}}</p>
                    <div class="trades-price">
                        <div class="trade-box" v-for="(trade, key) in getTrades" :key="key">
                            <p class="mb-0 text-black trading-price fw-5">{{ trade.price }}</p>
                            <p class="traders-txt fw-4">{{ trade.trade }}</p>
                        </div>
                    </div>
                    <nuxt-link to="/strategy-bot">
                        <a-button class="primary-btn">{{$t('copytrade.copy')}}</a-button>
                    </nuxt-link>
                </a-col>
                <a-col :lg="13" :xl="15" class="pl-5">
                    <template v-if="loading">
                    <AppLoading height="133px" backgroundColor="transparent" />
                </template>
                    <no-ssr v-else>
                        <carousel :perPage="StrategyDataa.length > 3 ? 3 : StrategyDataa.length" :loop="false" :speed="1500"
                            :autoplay="false" :perPageCustom="[[1100, 3], [1200, 3]]" :navigationEnabled="true"
                            :scrollPerPage="false" :paginationEnabled="false">
                            <slide v-for="(product, index) in StrategyDataa" :key="index">
                                <a-card class="white-card mr-30">
                                    <a-row :gutter="16" class="col-alignment mb-4">
                                        <a-col :lg="7"><img
                                                :src="product.avatar != null ? product.avatar : '/images/user-img.svg'"
                                                height="43" width="43" class="mx-1 user-img-new" /></a-col>
                                        <a-col :lg="17">
                                            <p class="mb-1 user-name fw-5 text-black"> {{ product.nikename.substr(0, 18) }}
                                            </p>
                                            <p class="mb-0 sec-price fw-5 col-alignment">@ {{ product.nikename.substr(0, 13) }}<img
                                                    src="/images/double-img.svg" height="24" width="24" class="mx-1" /><span
                                                    class="text-black">{{ product.copynum }}</span>/{{ product.tradenum }}
                                            </p>
                                        </a-col>
                                    </a-row>
                                    <p class="mb-1 sec-price">P&L</p>
                                    <p class="trading-price mb-1 up-down">{{ product.incomerate }}%</p>
                                    <canvas class="curve mb-2 text-right" :ref="`${index}str`" height="50" width="250" ></canvas>
                                    <a-row :gutter="16" class="mb-4">
                                        <a-col :lg="12">
                                            <p class="mb-1 sec-price fw-4">P&L (USD)</p>
                                            <p class="fw-5 text-black mb-0">{{ product.profit }}</p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <p class="mb-1 sec-price fw-4">{{$t('titles.title30')}}</p>
                                            <p class="mb-0 fw-5 text-black">{{ product.running_days }}d {{
                                                product.running_hours }}h {{
        product.running_mints }}m</p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="col-alignment">
                                        <a-col :lg="12">
                                            <p class="mb-1 sec-price fw-4">{{$t('home_page.hp13')}}</p>
                                            <p class="fw-5 text-black mb-0">{{ product.fcurrencyname }} <span
                                                    class="sec-price">
                                                    <span v-if="product.directiontype != '1'"
                                                        class="symbol-txt grey-active read-more fw-5">
                                                        /{{ getSymble(product.fcurrencyname).to }}
                                                    </span>
                                                    <span v-else class="symbol-txt gray-active fw-5">
                                                        /{{ $t("contract.swap") }}
                                                    </span>
                                                    <span class="margin-trade-txt"
                                                        v-if="product.directiontype == -1 && $store.state.symbleinfos?.length > 0">
                                                        {{ $store.state.symbleinfos.filter((item) => {
                                                            return item.id == product.ctid;
                                                        })[0].borrowmultiple
                                                        }}X
                                                    </span>


                                                </span></p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <a-button class="primary-btn copy-btn"> <nuxt-link :to="product.redirecTo">
                                                    {{$t('deal_new.dn35')}}
                                                </nuxt-link></a-button>

                                        </a-col>
                                    </a-row>
                                </a-card>
                            </slide>
                        </carousel>
                    </no-ssr>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import carousel from '@/plugins/carousel/Carousel';
import slide from '@/plugins/carousel/Slide';
import moment from 'moment';
import AppLoading from '../AppLoading.vue'
export default {
    components: {
        carousel, slide,AppLoading
    },
    data() {
        return {
            imgLoaded: false,
            loading:true,
            StrategyDataa: [],
            bg: {
                buy: "rgba(74,196,158,0.000089)",
                buydark: "rgba(74,196,158,0.45)",
                buyline: "rgba(74,196,158,0.85)",
                sell: "rgba(255,129,141,000089)",
                selldark: "rgba(255,129,141,0.0045)",
                sellline: "rgba(255,129,141,0.85)",
            },
            getTrades: [
                {
                    price: '50+',
                    trade: this.$t('copytrade.traders')
                },
                {
                    price: '10,000+',
                    trade: this.$t('copytrade.followers')
                },
                {
                    price: '$5,000,000+',
                    trade: this.$t('copytrade.aum_follower')
                }
            ]
        }
    },
    methods: {
        getSymble(s) {
            const symble = s.toLowerCase();
            //console.log('symb:', s);

            const obj = this.$store.state.symbleinfos.find((sinfo) => sinfo.descriptions.toLowerCase().includes(symble))
            //console.log('objJJ: ', obj)
            const des = obj.descriptions.split("/");
            return {
                from: des[0],
                to: des[1],
            };
        },
        drawline(data, canvas) {

            if (!canvas || canvas.length <= 0) return;
            const k = data
            if (!k) return;
            const _length = k.length;
            if (_length <= 0) return;

            const isup = true
            canvas = canvas[0]
            const { offsetHeight, offsetWidth } = canvas;
            canvas.width = offsetWidth;
            canvas.height = offsetHeight;
            const width = offsetWidth;
            const height = offsetHeight;
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, width, height);
            const _sort = k.sort((a, b) => {
                return b.income - a.income;
            });
            let _max = _sort[_sort.length - 1].income;

            let _min = _sort[0].income;
            let _range = _max - _min;

            const _k = k.sort((a, b) => {
                return a.time - b.time;
            });
            context.beginPath();
            var my_gradient = context.createLinearGradient(0, 0, 0, height);
            my_gradient.addColorStop(0, isup ? this.bg.buydark : this.bg.sell);
            my_gradient.addColorStop(1, isup ? this.bg.buy : this.bg.selldark);
            context.fillStyle = my_gradient;
            context.strokeStyle = isup ? this.bg.buyline : this.bg.sellline;

            const getxy = function (item, index) {
                const x = (width / _length) * index;
                const _y = 2 * ((item.income - _min) / _range - 0.5);
                const y = (-_y * height * 0.8) / 2 + height / 2;
                return { x, y };
            };
            _k.forEach((item, index) => {
                const { x, y } = getxy(item, index);
                context.fillRect(x, y, width / _length, height - y);
                context.lineTo(x, y);
                if (index == _length - 2) context.stroke();
            });
        },
        getStrategies() {
            this.$store.dispatch('querytopstrategy_get', { pageIndex: 1, pageSize: 30, strategyType: 1, orderType: 1 }).then((data) => {
                if (data) {
                    this.loading=false
                    let StrategyDataa = data.data.pagedata;
                    StrategyDataa = StrategyDataa.map(item => {
                        const Symbol = this.$store.state.symbleinfos.find((symbol) => symbol.id == item.ctid)
                        item.fcurrencyname = Symbol.fcurrencyname
                        let createTime = moment.tz(item.createtime, 'Etc/GMT').local();
                        let nowTime = moment();
                        var duration = moment.duration(nowTime.diff(createTime));
                        var days = Math.floor(duration.asDays());
                        var hours = duration.hours();
                        var minutes = duration.minutes();
                        item.running_days = `${days}`;
                        item.running_hours = `${hours}`;
                        item.running_mints = `${minutes}`;
                        item.copynum = item.copynum.toLocaleString()
                        item.incomerate = item.incomerate.toFixed(2)
                        item.profit = item.profit.toFixed(2)
                        item.tradenum = parseInt(item.tradenum)
                        const coinid = (Symbol.fcurrencyname + '_' + Symbol.tcurrencyname).toLowerCase()
                        let redirecTo = '/deal-pro/' + coinid + '?strategy-bot-id=' + item.id
                        if (this.strategyType == 1) {
                            redirecTo = '/deal-pro/' + coinid + '?strategy-bot-id=' + item.id
                        } else if (this.strategyType == 2) {
                            redirecTo = '/margin-pro/' + coinid + '?strategy-bot-id=' + item.id
                        }
                        else if (this.strategyType == 3) {
                            redirecTo = '/contract-pro/' + coinid + '?strategy-bot-id=' + item.id
                        }

                        item.redirecTo = redirecTo
                        return item;
                    })

                    this.StrategyDataa = StrategyDataa.reverse()
                    this.$nextTick(() => {
                            for (const i in this.StrategyDataa) {
                                const refindex = `${i}str`;
                                const ref = this.$refs[refindex]
                                this.drawline(this.StrategyDataa[i].datas, ref)
                            }
                        
                    })

                }
            })

        },
    },
    created() {
        this.getStrategies()
    }
}
</script>

