<template>
    <a-row type="flex" :gutter="[16, 16]" class="p-0 m-0">
      <template >
        <a-col :xs="12" :sm="12" :md="12" :lg="5" :xl="5" v-for="(list,index) in marketdata_recommend" :key="index" :ref="`animation${list.symble}`" style="width:20%">
            <div id="pricing-card">
                <a-card class="card-detail pointer" :bordered="false"
                @click="goDeal(''+list.symble+'',list.itype==1?'contract':(list.itype==-1)?'margin':'spot')">
                    <a-row :gutter="16">
                        <a-col :lg="24">
                            <a-row :gutter="16" class="mb-2 heading-card-mb">
                                <a-col :lg="12">
                                    <p class=" mb-0 text-heading fw-5">
                                <span class="left">
                                    {{getSymble(list.symble).from}}/{{getSymble(list.symble).to}}</span>
                            </p>
                                </a-col>
                                <a-col :lg="12" align="end"><img :src="list.logo" height="24" width="24" class="mr-1"/></a-col>
                            </a-row>

                        </a-col>
                        <a-col :lg="24"><p class="mb-2 price-heading fw-7 col-alignment" :class='limitPrice(list.c,list.o)<0?"red-active":"success-active"'>{{list.c}}<span class="delta-symbol">≈</span><span class="doller-txt fw-5 pl-1">{{$store.getters.get_client_exchange_rate_name.mark}}{{getClientExchangeRate(list)}}</span></p></a-col>
                        <a-col :lg="24">
                             <span class="heading-percent fw-5" :class='limitPrice(list.c,list.o)<0?"red-active":"success-active"'>{{limitPrice(list.c,list.o)}}%<img :src="limitPrice(list.c,list.o)<0?'/images/red-up-arrow.svg':'/images/green-up-arrow.svg'" height="12" width="auto" class="ml-1 mb-1"/><span class="second-price-txt pl-2">{{ numFormatter(global_get_tofixed(list.v, global_get_decimal(list.symble).p)) }}</span></span>

                        </a-col>
                    </a-row>
                    </a-card>
            </div>

        </a-col>

        <a-col :xs="12" :sm="12" :md="12" :lg="5" :xl="5" v-for="(list) in marketdata_recommend_future" :key="list.ctid" :ref="`animation${list.symble}`" style="width:20%">
            <div id="pricing-card">
                <a-card class="card-detail pointer" :bordered="false" @click="goDeal(''+list.symble+'',list.itype==1?'contract':(list.itype==-1)?'margin':'spot')">
                    <a-row :gutter="10">
                        <a-col :lg="24">
                            <a-row :gutter="16" class="mb-2 heading-card-mb">
                                <a-col :lg="16">
                                    <p class=" mb-0 text-heading fw-5">
                                <span class="left">
                                    {{getSymble(list.symble).from}} {{$t('deal_new.dn10')}}</span>
                            </p>
                                </a-col>
                                <a-col :lg="8" align="end"><img :src="list.logo" height="24" width="24" class="mr-1"/></a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="24"><p class="mb-2 price-heading fw-7 col-alignment" :class='limitPrice(list.c,list.o)<0?"red-active":"success-active"'>{{list.c}}<span class="delta-symbol">≈</span><span class="doller-txt fw-5 pl-1">{{$store.getters.get_client_exchange_rate_name.mark}}{{getClientExchangeRate(list)}}</span></p></a-col>
                        <a-col :lg="24">
                            <span class="heading-percent fw-5" :class='limitPrice(list.c,list.o)<0?"red-active":"success-active"'>{{limitPrice(list.c,list.o)}}%<img :src="limitPrice(list.c,list.o)<0?'/images/red-up-arrow.svg':'/images/green-up-arrow.svg'" height="12" width="auto" class="ml-1 mb-1"/><span class="second-price-txt pl-2">{{ numFormatter(global_get_tofixed(list.v, global_get_decimal(list.symble).p)) }}</span></span>

                        </a-col>
                    </a-row>
                </a-card>
            </div>

        </a-col>
      </template>
    </a-row>

  </template>

  <script>
  export default {
    props:{
        marketdata_recommend:{
            type:Array
        },
        marketdata_recommend_future:{
            type:Array
        },
        marketdata_recommend_margin:{
            type:Array
        },
        getSymble: {
            type: Function
        },
        getClientExchangeRate: {
            type: Function
        },
    },
    data() {
        return {
            canvasary: [],
            canvasary1: [],
            canvasary2:[],
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
    },

    methods:{
        limitPrice: function (c, o) {
            let limit_price = Number((((c - o) / o) * 100).toFixed(2));
            return isNaN(limit_price) ? 0 : limit_price;
        },
        goDeal(coinid, ctype) {
            coinid = coinid.replace('/', '_');
            if (ctype == 'contract') {
                this.$router.push({ path: '/contract/' + coinid })
            }
            else if (ctype == 'margin') {
                this.$router.push({ path: '/margin/' + coinid })
            }
            else {
                this.$router.push({ path: '/deal/' + coinid })
            }
        },
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
        numFormatter(num) {
            if (num > 999 && num < 1000000) {
                return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
            } else if (num > 1000000 && num < 10000000) {
                return (num / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
            } else if (num > 10000000) {
                return (num / 10000000).toFixed(2) + 'B'; // convert to B for number from > 1 billion
            } else if (num < 900) {
                return num; // if value < 1000, nothing to do
            }
        },
    }
  }
  </script>
  <style lang="scss">
  @import '~/assets/scss/components/pricing-card/card.scss';

  </style>
