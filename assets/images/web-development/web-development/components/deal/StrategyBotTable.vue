<template>
    <!-- Table is being moved here -->
    <div>
        <a-row :gutter="16" class="mt-4 pt-4">
            <a-col :lg="16">
                <a-row :gutter="16">

                    <a-col :lg="5" :xl="5">
                        <a-select style="width: 100%" :open="open" v-model="filter.symbolType" ref="symbolSelect"
                            v-on:select="setOpen(false)" @dropdownVisibleChange="onOpen"
                            :loading="filter.symbolTypes.length == 0" @change="getData()">

                            <a-icon v-if="open" slot="suffixIcon" type="up" />
                            <a-icon v-else slot="suffixIcon" type="down" v-on:click="setOpen(true)" />
                            <!-- <a-icon  v-if="open" slot="suffixIcon" type="caret-up" />
                            <a-icon v-else slot="suffixIcon" type="caret-down" v-on:click="setOpen(true)" /> -->
                            <div slot="dropdownRender" slot-scope="menu">
                                <div style="padding: 4px 8px; cursor: pointer;">
                                    <a-input v-if="open" :placeholder="$t('placeholders.plh5')" ref="symbolSearch"
                                        class="all-input-search" v-on:blur="setOpen(false)" v-model="searchValue" />
                                </div>
                                <a-divider style="margin: 4px 0;" />
                                <v-nodes :vnodes="menu" />
                            </div>

                            <a-select-option v-for="(item, index) in filter.symbolTypes" :key="index"
                                v-if="filterSelf(item.descriptions.toLowerCase())">
                                <img :src="item.icon" height="15" width="15" class="mr-2 mb-1" v-if="item.icon" /> {{
                                    item.descriptions }}
                            </a-select-option>

                        </a-select>
                    </a-col>

                    <a-col :lg="7" :xl="5">
                        <a-select v-model="filter.dayType" style="width: 100%" :defaultActiveFirstOption="true"
                            @change="getData()">
                            <a-select-option v-for="(item, index) in filter.dayTypes" :key="index">
                                {{ item.text }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :lg="5" :xl="5">
                        <a-select v-model="filter.rateType" style="width: 100%" :defaultActiveFirstOption="true"
                            @change="getData()">
                            <a-select-option v-for="(item, index) in filter.rateTypes" :key="index">
                                {{ item.text }}
                            </a-select-option>

                        </a-select>
                    </a-col>
                    <!-- <a-col :lg="5">
                        <a-select default-value="lucy" style="width: 100%">
                            <a-select-option value="jack">
                                Jack
                            </a-select-option>
                            <a-select-option value="lucy">
                                Market:All
                            </a-select-option>
                            <a-select-option value="Yiminghe">
                                yiminghe
                            </a-select-option>
                        </a-select>
                    </a-col> -->
                    <a-col :lg="3" :xl="2">
                        <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                            <a-button block class="outline-btn fw-5" @click="resetSelect"><img src='/images/refresh-new.svg'
                                    class="" /><!-- {{$t('deal_new.dn34')}} --></a-button>
                        </span>
                    </a-col>

                </a-row>
            </a-col>
            <a-col :lg="8" align="end" class="">
                <a-select v-model="filter.orderType" style="width: 184px" :defaultActiveFirstOption="true"
                    @change="getData()">
                    <a-select-option v-for="(item, index) in filter.orderTypes" :key="index">
                        {{ item.text }}
                    </a-select-option>
                </a-select>
            </a-col>
        </a-row>
        <a-row :gutter="[28, 28]" type="flex" class="py-4 mt-4 strategy-cards">
            <a-col :xs="24" :sm="12" :lg="8" :xl="6" v-for="(list, key) in strategyBotData" :key="key">
                <nuxt-link :to="list.redirecTo">
                    <a-card :bordered="false" class="st-card">
                        <a-row class="bot-details-row">
                            <a-col :xs="10" :lg="12" :xl="12" class="running-bot fw-5">
                                <a-row :gutter="16" class="col-alignment">
                                    <span class="ml-2">{{ list.symbolText }}</span>
                                    <a-tag class="tag ml-1" v-if="list.borrowmultiple">{{ list.borrowmultiple }}x</a-tag>
                                    <span class="symbolTo ml-1 perpetual-txt fw-5" v-else-if="strategyType == 3">
                                        {{ $t('deal_new.dn10') }}</span>

                                </a-row>
                            </a-col>
                            <a-col :lg="12" :xl="12" class="trade-num col-alignment fw-5"><img src="/images/person-icon.png"
                                    alt="" class="pr-2"> {{ list.copynum }} <span> /{{ list.tradenum }}</span></a-col>
                        </a-row>
                        <a-row class="profit-row pt-3 ">
                            <a-col :xs="10" :lg="12" :xl="12">
                                <p class="grid-bot-desc fw-4">P&L</p>
                                <p class="pl-value fw-5" :class="list.incomerate < 0 ? 'red-active' : 'success-active'">
                                    {{ list.incomerate }}%</p>
                            </a-col>
                            <a-col :lg="12" :xl="12" class="graph text-end">
                                <canvas class="curve" :ref="`${key}str`" height="70" width="131"></canvas>
                            </a-col>
                        </a-row>
                        <a-row class="profit-row pt-3 ">
                            <a-col :xs="10" :lg="12" :xl="12">
                                <p class="grid-bot-desc fw-4">P&L (USD)</p>
                                <p class="trade-num fw-5" :class="list.profit < 0 ? 'red-active' : 'success-active'">{{
                                    list.profit }}</p>
                            </a-col>
                            <a-col :lg="12" :xl="12" class="text-end">
                                <p class="grid-bot-desc fw-4">{{ $t('titles.title30') }}</p>
                                <p class="trade-num fw-5">{{ list.running_time }}</p>
                            </a-col>
                        </a-row>
                        <a-row class="ranking-create-row pt-3 col-alignment ">
                            <a-col :xs="6" :lg="10" :xl="10" class="ranking fw-4 pl-4">{{ $t('titles.title1') }} <img
                                    :src="list.rankImg" alt="" v-if="list.rankImg != undefined" class="ml-2 rank-img"> <span
                                    v-else class="ml-2">{{
                                        list.rank }}</span></a-col>
                            <a-col :xs="18" :lg="14" :xl="14" class="text-end"><nuxt-link :to="list.redirecTo"
                                    v-if="$userinfo.uid"><a-button
                                        class="ranking create-btn">{{ $t('api.creat') }}</a-button></nuxt-link></a-col>
                        </a-row>
                    </a-card>
                </nuxt-link>
            </a-col>
            <div class=" px-3 pb-4 text-right" v-if="page?.total > 0">
                <a-pagination background :page-size="page.pagesize" :current="page.current" popper-class="paging"
                    layout="prev, pager, next" :total="page.total">
                </a-pagination>
            </div>
        </a-row>


    </div>
    <!-- Table is ended above  -->
</template>
<script>
import moment from 'moment';
export default {
    components: {
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },

    },
    props: {
        strategyType: {
            type: Number,
            default: 1 //1:spot, 2:margin, 3:future
        }
    },
    computed: {
        api() {
            return {
                dayType: this.filter.dayTypes[this.filter.dayType].value,
                rateType: this.filter.rateTypes[this.filter.rateType].value,
                orderType: this.filter.orderTypes[this.filter.orderType].value,
                pageSize: this.page.pagesize,
                pageIndex: this.page.pageindex,
                strategyType: this.strategyType,
                ctid: this.filter.symbolTypes[this.filter.symbolType].id,
            }

        }
    },
    data() {
        return {
            hoverKey: -1,
            //FOR SYMBOLS SELECT OPEN SEARCH AND CLOSE
            searchValue: '',
            open: false,
            strategyBotData: [],
            strategyBotColumns: [
                {
                    title: this.$t('titles.title1'),
                    dataIndex: 'rank',
                    scopedSlots: { customRender: 'rank' },
                    width: 100
                },
                {
                    title: this.$t('titles.title2'),
                    dataIndex: 'contract',
                    scopedSlots: { customRender: 'contract' },
                    width: 120

                },
                {
                    title: 'P&L',
                    dataIndex: 'incomerate',
                    scopedSlots: { customRender: 'pl' },
                    width: 100
                },
                {
                    title: 'P&L (USD)',
                    dataIndex: 'profit',
                    scopedSlots: { customRender: 'plusd' },
                    width: 100
                },
                {
                    title: this.$t('titles.title3'),
                    dataIndex: 'running_time',
                    width: 120
                },
                {
                    title: this.$t('titles.title4'),
                    dataIndex: 'copynum',
                    width: 100
                },
                {
                    title: this.$t('titles.title5'),
                    dataIndex: 'tradenum',
                    width: 100
                },
                {
                    title: this.$t('titles.title6'),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 120
                },
            ],
            //HERE TYPE MEANS INDEX I.E DAYTYPES IS ARRAY FOR SELECT OPTIONS AND DAYTYPE WITHOUT S IS INDEX SELECTED SELECT OPTION
            filter: {
                dayTypes: [{ value: 0, text: this.$t('texts.txt2') }, { value: 1, text: this.$t('texts.txt3') }, { value: 1, text: this.$t('texts.txt4') }, { value: 1, text: this.$t('texts.txt5') }],
                dayType: 0,
                rateTypes: [{ value: 0, text: this.$t('texts.txt6') }, { value: 1, text: 'P&L-0-5%' }, { value: 2, text: 'P&L-5-10%' }, { value: 3, text: 'P&L-10-20%' }, { value: 3, text: 'P&L-10-20%' }, { value: 4, text: 'P&L-20-50%' }, { value: 5, text: 'P&L-50-70%' }, { value: 6, text: 'P&L-70-100%' }, { value: 7, text: 'P&L-100%' }],
                rateType: 0,
                orderTypes: [{ value: 0, text: this.$t('texts.txt7') }, { value: 2, text: this.$t('texts.txt8') }, { value: 2, text: this.$t('texts.txt9') }, { value: 4, text: this.$t('texts.txt10') }],
                orderType: 0,
                symbolType: 0,
                symbolTypes: [],

            },
            page: {
                pageindex: 1,
                pagesize: 10,
                total: 0
            },
            bg: {
                buy: "rgba(74,196,158,0.000089)",
                buydark: "rgba(74,196,158,0.45)",
                buyline: "rgba(74,196,158,0.85)",
                sell: "rgba(255,129,141,000089)",
                selldark: "rgba(255,129,141,0.0045)",
                sellline: "rgba(255,129,141,0.85)",
            },

        }
    },
    watch: {
        strategyBotData: {
            handler(val, oldVal) {
                this.drawChartLine()
            },
            deep: true,
        },

    },
    methods: {
        //RESETTING ALL SEARCH TO 0 INDEX WILL BE REFLECTED IN COMPUTED AS API
        resetSelect() {
            this.filter.dayType = 0
            this.filter.rateType = 0
            this.filter.orderType = 0
            this.filter.symbolType = 0
            this.getData()
        },

        // Search Select Functions Start
        //FILTER OUT WITH RESPECT TO VALUE IN INPUT OF SELECT
        filterSelf(str) {
            const _self = this;
            if (_self.searchValue !== '') {
                return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)
            }
            return true
        },
        //FOR OPENING AND CLOSING OF SELECT INNER DIV
        setOpen(bool) {
            if (this.open == bool) {
                return
            }
            if (!bool) {
                setTimeout(() => {
                    this.open = bool
                    this.searchValue = '';
                }, 100);
            }
            else {
                this.open = bool;
            }
        },
        //PUTTING FOCUS TO INPUT INSIDE THE SELECT FOR SEARCHING
        onOpen() {
            this.open = true
            if (this.open == true) {
                setTimeout(() => {
                    this.$refs.symbolSearch?.focus()
                }, 100);
            }
        },
        // SYMBOLS SEARCH FUNCTION ENDED

        setSymbol() {
            //GETTING SYMBOLS BASED ON STRATEGY 0 FOR SPOT AND MARGIN AND 1 FOR FUTURE SYMBOLS
            this.filter.symbolTypes = this.$store.state.symbleinfos.filter((item) => {
                if (this.strategyType == 1 || this.strategyType == 2) {
                    return item.itype === 0
                }
                else {
                    return item.itype == 1
                }

            });
            //ADDING ALL SYMBOL TO SYMBOLS AT 0 INDEX
            this.filter.symbolTypes.unshift({ descriptions: this.$t('all_symbols'), id: 0 });
        },
        handChange(val) {
            this.loading = true;
            this.page.pageindex = val
            this.getData()
        },

        async getData() {
            await this.$store.dispatch('querytopstrategy_get', this.api).then((data) => {
                if (data) {
                    this.page.total = data.totalitemcount
                    this.strategyBotData = data.data.pagedata.map((item, index) => {
                        //FIND SYMBOL FROM STATE AND SETTING ICON AND TEXT OF SYMBOL
                        const Symbol = this.$store.state.symbleinfos.find((symbol) => symbol.id == item.ctid)
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

                        item.symbolImg = Symbol.icon
                        item.symbolText = this.strategyType == 3 ? Symbol.fcurrencyname : Symbol.descriptions
                        item.borrowmultiple = Symbol.borrowmultiple > 0 && this.strategyType == 2 ? Symbol.borrowmultiple : false
                        //CALCULATE RUNNING TIME
                        let createTime = moment.tz(item.createtime, 'Etc/GMT').local();
                        let nowTime = moment();
                        var duration = moment.duration(nowTime.diff(createTime));
                        var days = Math.floor(duration.asDays());
                        var hours = duration.hours();
                        var minutes = duration.minutes();
                        item.running_time = `${days}D ${hours}H ${minutes}M`
                        //RANK IMAGE VALIDATION
                        if (index < 3) {
                            item.rankImg = `/images/rank${++index}.svg`
                        }
                        item.rank = ++index;
                        //COPYNUM TO SHOW IN CURRENCY FORMAT HAVING , AND TRIMMING THE VALUES OF INCOME PROFIT
                        item.copynum = item.copynum.toLocaleString()
                        item.incomerate = item.incomerate.toFixed(2)
                        item.profit = item.profit.toFixed(2)
                        return item;
                    })
                }
            })

        },
        drawChartLine() {
            const data = JSON.parse(JSON.stringify(this.strategyBotData))
            for (const i in data) {
                const refindex = `${i}str`;
                const ref = this.$refs[refindex]
                this.drawline(data[i].datas, ref)
            }

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
    },
    async mounted() {
        //SETTING SYMBOLS FROM STATE ACCORDING TO SPOT,MARGIN,FUTURE
        this.setSymbol();
        // GETTING INITIAL DATA THIS FUNCTION @CHNAGE ON ALL SEARCH SELECT BOXES  AND ALSO RESET FUNCTION
        await this.getData()
        this.drawChartLine()
    },
}
</script>
