<template>
    <div class="">
        <a-row :gutter="16" class="px-4">
            <a-col :lg="6" class="currency-fig" :class="{'coin_compair_animation_down':a.equality>0, 'coin_compair_animation_up':a.equality<0}"  v-for="(a,i) in marketdata" :ref="`animation${a.symble}`" @click="goDeal(a.symble)" :key="i">
                <a-card class="price-card mt-4" :bordered="false">
                    <a-row :gutter="16" class="px-3 col-alignment">
                        <a-col :lg="5"><img :src="a.logo" height="48"/></a-col>
                        <a-col :lg="6">
                            <p class="mb-0 list-btc"><span>{{getSymble(a.symble).from}}</span></p>
                            <p class="mb-0 list-bitcoin">{{ currencyFullName(getSymble(a.symble).from.toUpperCase()) }}</p>
                        </a-col>
                        <a-col :lg="13" >
                            <div class="currency-curve">
                                <canvas class="curve" :ref="`${a.symble}`"></canvas>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="pr-3 pl-4 col-alignment pt-3">
                        <a-col :lg="12">
                            <p class="mb-0 list-price-txt" :class="limitPrice(a.c,a.o)<0?'red-color':''">{{$store.getters.get_client_exchange_rate_name.mark}}{{getClientExchangeRate(a)}}</p>
                        </a-col>
                        <a-col :lg="12" align="end">
                            <p class="mb-0 down-price">{{limitPrice(a.c,a.o)}}% <img :src="limitPrice(a.c,a.o)<0?'/images/red-up-arrow.svg':'/images/green-up-arrow.svg'" height="12" width="auto" class="ml-1 mb-1"/></p>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>

    </div>

</template>
<script>
export default {
    name: "currency-figure",
    props: {
        marketdata: [],
        getClientExchangeRate: {
            type: Function
        },
        getSymble: {
            type: Function
        }
    },
    computed:{

    },
    data() {
        return {
            canvasary: [],
            loading: true,
            bg: {
                buy: 'rgba(74,196,158,0.000089)',
                buydark: 'rgba(74,196,158,0.45)',
                buyline: 'rgba(74,196,158,0.85)',
                sell: 'rgba(255,129,141,000089)',
                selldark: 'rgba(255,129,141,0.0045)',
                sellline: 'rgba(255,129,141,0.85)'
            }
        }
    }, watch: {
        'marketdata': function (val) {
            if (val.length > 0) {
                this.loading = false;
                this.canvasary = [];
                val.forEach((_d) => {
                    this.canvasary[_d.symble] = {
                        data: _d
                    };
                });
                this.$nextTick(() => {
                    for (const i in this.canvasary) {
                        this.canvasary[i]['canvas'] = this.$refs[i][0];
                        this.drawline(this.canvasary[i]);
                    }
                });
            }
        }
    },
    mounted() {
    },
    methods: {
        goDeal(coinid) {
            coinid = coinid.replace('/', '_');
            let _path = window.localStorage.getItem('deal');
            let _arr = null;
            if (_path) {
                _arr = _path.split('/');
                let isPro = _arr[2];
                this.$router.push({ path: `/deal/${coinid}`});
            } else {
                this.$router.push({ path: `/deal/${coinid}` });
            }
        },
        currencyFullName(obj){
           return this.$store.state.currencyinfos.filter((item)=>item.currencyname==obj)[0].fullname;
        },
        limitPrice: function (c, o) {
            let limit_price = Number((((c - o) / o) * 100).toFixed(2));
            return isNaN(limit_price) ? 0 : limit_price;
        },
        //绘制行情曲线
        drawline({ data, canvas }) {
            if (!canvas) return
            const k = data.kdata
            const _length = k.length
            if (_length <= 0) return
            const isup = this.limitPrice(data.c, data.o) >= 0
            const { offsetHeight, offsetWidth } = canvas.parentElement
            canvas.width = offsetWidth
            canvas.height = offsetHeight
            const width = offsetWidth
            const height = offsetHeight
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, width, height);
            const _sort = k.sort((a, b) => {
                return b.c - a.c
            })
            let _max = _sort[0].c
            let _min = _sort[_sort.length - 1].c
            let _range = _max - _min

            const _k = k.sort((a, b) => {
                return a.t - b.t
            })
            context.beginPath();
            var my_gradient = context.createLinearGradient(0,0,0,height);
            my_gradient.addColorStop(0, isup ?this.bg.buydark: this.bg.sell );
            my_gradient.addColorStop(1, isup ?this.bg.buy: this.bg.selldark);
            context.fillStyle = my_gradient;
            // context.fillStyle = isup ? this.bg.buy : this.bg.sell;
            context.strokeStyle = isup ? this.bg.buyline : this.bg.sellline;
            let last = {}
            const getxy = function (item, index) {
                const x = width / _length * index
                const _y = 2 * ((item.c - _min) / _range - 0.5)
                const y = -_y * height * 0.8 / 2 + height / 2
                return { x, y }
            }

            _k.forEach((item, index) => {
                const { x, y } = getxy(item, index)
                context.fillRect(x, y, width / _length, height - y);
                context.lineTo(x, y);
                if (index == _length - 2)
                    context.stroke()
            })
        },
    }
}
</script>

<style scoped lang="scss">
.currency-curve {
    width: 50%;
    height: 53px;
    canvas {
        width: 100%;
        height: 100%;
    }
}
.currency-fig .coin_compair_animation_up {
            background: url("../../static/images/image_red.svg") -385px 0px no-repeat;
            background-size: auto 100%;
        }

        .currency-fig .coin_compair_animation_down {
            background: url("../../static/images/image_green.svg") -385px 0px no-repeat;
            background-size: auto 100%;
        }

        .currency-fig .isanimation {
            animation: backgroundPo 1s;
        }

        @keyframes backgroundPo {
            from {
                background-position: -240px 0px;
            }

            to {
                background-position: 240px 0px;
            }
        }

        .currency-fig .up {

            background-size: auto 100%;
        }
        .currency-fig .down {
            background-size: auto 100%;
        }

        .currency-fig:last-child {
            margin-right: 0;
        }
</style>
