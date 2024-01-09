<template>
    <div>
        <a-card class="deposit-card" :bordered="false">
            <a-row :gutter="16">
                <a-col :lg="20">
                    <p class="total-blance fw-5 mb-0">{{ $t('wallet.totalAssets') }}
                        <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="toggleFundVisible">
                                    <use :xlink:href="$usersettings.moreconfig?.fundsvisible  ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
                    </p>
                    <p class="deposit-blance fw-6 mb-0">
                        {{$usersettings.moreconfig?.fundsvisible?totalAssets:'*******'}} BTC <span class="limit-txt fw-4">≈ {{$usersettings.moreconfig?.fundsvisible?allTransition:'*******'}}
                            {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}</span>
                            
                    </p>
                </a-col>
            </a-row>
        </a-card>
        <div class="trade-detail pt-3">
            <a-card :bordered="false" class="deposit-detail-card">
                <a-row :gutter="16" class="px-4 col-alignment mb-4">
                    <a-col :lg="2">
                        <p class="total-blance fw-5  mb-0">{{ $t('person.token_person') }}</p>
                    </a-col>
                    <a-col :lg="17" align="end">
                        <p class="hide-txt fw-5 show-hide mb-0">
                            {{ hideSmallBalance ? $t('person.hide_person') : $t('person.show_person') }}
                            {{ $t('person.sbalance_person') }}
                                <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="hideSmallBalance = !hideSmallBalance">
                                    <use :xlink:href="hideSmallBalance   ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
                        </p>
                    </a-col>
                    <a-col :lg="5">
                        <a-input :placeholder="$t('placeholders.plh5')" v-model="search">
                            <span slot="prefix">
                                <img src="/images/search-icon.svg" /></span>
                        </a-input>
                    </a-col>
                </a-row>
                <a-table :columns="tradeTableColumns" :pagination="{ pageSize: 10 }" :data-source="searchList" rowKey="ctid"
                    :loading="loading">
                    <div slot="margin" slot-scope="text,row">
                        <p class="mb-0">
                            <img height="20" width="20" class="mr-1" :src="row.icon" v-if="row.icon" alt="">
                            {{ (row.symblename).toUpperCase() }} <span
                                class="margin-trade-txt">{{ row.borrowmultiple }}X</span>
                        </p>
                    </div>
                    <span slot="customTitle">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{ $t('margin.mt1') }}</p>
                                <p class="mb-0 p2p-info-txt fw-4">{{ $t('margin.mt2') }}</p>
                            </template>
                            {{ $t('margin.mt3') }}<img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                    </span>
                    <div slot="available" slot-scope="text,row">
                        <p class="mb-0">
                            {{ (row.famount == 0) ? 0 : global_get_tofixed(row.famount,
                                global_get_decimal(row.symblename).a) }}
                            <span class="gray-frozen-txt fw-5"> / {{ (row.ffrozenamount == 0) ? 0 :
                                global_get_tofixed(row.ffrozenamount, global_get_decimal(row.symblename).a) }}
                                <span class="prepetual-txt">{{ row.fcurrencyname.toUpperCase() }}</span> </span>
                        </p>
                        <p class="mb-0">
                            {{ (row.tamount == 0) ? 0 : global_get_tofixed(row.tamount,
                                global_get_decimal(row.symblename).p) }}
                            <span class="gray-frozen-txt fw-5"> /
                                {{ (row.tfrozenamount == 0) ? 0 : global_get_tofixed(row.tfrozenamount,
                                    global_get_decimal(row.symblename).p) }}
                                <span class="prepetual-txt">{{ row.tcurrencyname.toUpperCase() }}</span> </span>
                        </p>
                    </div>
                    <span slot="borrowedTitle">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{ $t('margin.mt4') }}</p>
                                <p class="mb-0 p2p-info-txt fw-4">{{ $t('margin.mt5') }}</p>
                            </template>
                            {{ $t('margin.mt6') }}<img src="/images/gray-circle.svg" height="12" class="ml-1"/>
                        </a-popover>
                    </span>
                    <span slot="riskRateTitle">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover deposit-main-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4"> {{ $t('margin.mt7') }}</p>
                            </template>
                            {{ $t('margin.mt8') }} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                    </span>
                    <div slot="borrowed" slot-scope="text,row">
                        <p class="mb-0">
                            {{ (row.fcanborrowamount == 0) ? 0 : global_get_tofixed(row.fcanborrowamount,
                                global_get_decimal(row.symblename).a) }}
                            <span class="gray-frozen-txt fw-5"> / {{ (row.fborrowamount == 0) ? 0 :
                                global_get_tofixed(row.fborrowamount, global_get_decimal(row.symblename).a) }}
                                <span class="prepetual-txt">{{ row.fcurrencyname.toUpperCase() }}</span> </span>
                        </p>
                        <p class="mb-0">
                            {{ (row.tcanborrowamount == 0) ? 0 : global_get_tofixed(row.tcanborrowamount,
                                global_get_decimal(row.symblename).p) }}
                            <span class="gray-frozen-txt fw-5"> / {{ (row.tborrowamount == 0) ? 0 :
                                global_get_tofixed(row.tborrowamount, global_get_decimal(row.symblename).p) }}
                                <span class="prepetual-txt">{{ row.tcurrencyname.toUpperCase() }}</span> </span>
                        </p>
                    </div>
                    <div slot="riskRate" slot-scope="text,row">
                        <p>
                            <span class="second-txt" :class="riskCssColorComputed(row.riskrate)"> {{ (row.riskrate) == 0 ?
                                $t('leverage.risk') :
                                `${((row.riskrate) * 100).toFixed(1)}%` }}</span> <br>≈ {{ global_get_tofixed(row.explosionprice,
        global_get_decimal(row.symblename).p) }}<span class="prepetual-txt"> USDT</span>
                        </p>
                    </div>
                    <div slot="stormPrice" slot-scope="text,row">{{ setExplosionPrice(row.explosionprice,
                        row.tcurrencyname)
                    }}</div>

                    <div slot="action" slot-scope="text,row">
                        <span class="mr-2 pointer deposit-table-txt fw-5"
                            @click="showPopTrasfer(row)">{{ $t('leverage.transfer') }}</span>
                        <span class="pointer deposit-table-txt fw-5"
                            @click="toDeal(row.symblename)">{{ $t('wallet.deal') }}</span>
                    </div>
                </a-table>
            </a-card>
            <repayment-popup :ctid="ctid" :symblename="symblename" :loancurrencyamount="loancurrencyamount"
                :loanamount="loanamount" :interest="interest" :loancurrencyname="loancurrencyname" :repayModel="popupstate"
                @closePopup="closePopup" @confirmToRepayment="confirmToRepayment" v-if="popupstate" ref="popup" />
            <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="ctid" type="1"
                :closePopup="showPopTrasfer" />
        </div>
    </div>
</template>
<script>
import repaymentPopup from '@/components/security/repayment-popup';
import transferPop from '@/components/security/transfer';//转账
export default {
    name: 'MarginTable',
    components: {
        'hex-transfer': transferPop,
        'repayment-popup': repaymentPopup,
        // Repay,
    },
    computed: {
        searchList: function () {
            const _this = this;
            // const list = _this.currencyData
            const list = _this.getMortgageassetsInfos(_this.currencyData, 0)
            const value = _this.search.length > 0 ? _this.search.toLowerCase().replace(/ /g, '') : ''
            let searchary = [];
            if (value) {
                const reg = new RegExp(value, 'gim');
                list.map((item) => {
                    if ((item.symblename).match(reg)) {
                        searchary.push(item)
                    }
                });
                return _this.hideSmallBalance ? searchary.filter(item => {
                    const amount = Number(item.tamount) + item.tfrozenamount > 0 ? _this.global_get_tofixed(Number(item.tamount) + item.tfrozenamount, _this.global_get_decimal(item.symblename).p) : 0
                    return amount >= 1;
                }) : searchary;
            } else {
                return _this.hideSmallBalance ? list.filter(item => {
                    const amount = Number(item.tamount) + item.tfrozenamount > 0 ? _this.global_get_tofixed(Number(item.tamount) + item.tfrozenamount, _this.global_get_decimal(item.symblename).p) : 0
                    return amount >= 1;
                }) : list;
            }
            
        },
        totalAssets: function () {
            const _this = this;
            let allbtc = 0;
            const list = _this.getMortgageassetsInfos(_this.currencyData, 1)
            list.forEach((item) => {
                allbtc += this.$store.getters.get_btc_exchange_rate(item.fcurrencyname, item.famount)
                allbtc += this.$store.getters.get_btc_exchange_rate(item.tcurrencyname, item.tamount)
            });
            _this.decimal = this.global_get_decimal('btc');
            return this.global_get_tofixed(allbtc, _this.decimal.a);
        },
        allTransition: function () {
            let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
            return alltransition;
        },
    },
    data() {
        return {
            repayModal: false,
            List: [],
            loading: true,
            hideSmallBalance: false,
            transfer_pop: false,
            popupstate: false,
            currencyData: [],
            search: "",
            id: '',
            ctid: 0,
            symblename: '',
            loancurrencyname: '',
            interest: 0,//支付利息
            loanamount: 0,//应还数量
            loancurrencyamount: 0,//贷款数量
            tradeTableColumns: [
                {
                    title: this.$t('tableskeys.tk1'),
                    dataIndex: 'margin',
                    scopedSlots: { customRender: 'margin' },
                    width: 190,
                },
                {
                    slots: { title: 'borrowedTitle' },
                    dataIndex: 'borrowed',
                    scopedSlots: { customRender: 'borrowed' },
                    width: 160,
                },

                {
                    slots: { title: 'customTitle' },
                    dataIndex: 'available',
                    scopedSlots: { customRender: 'available' },
                    width: 150,
                },
                {
                    slots: { title: 'riskRateTitle' },
                    dataIndex: 'riskRate',
                    scopedSlots: { customRender: 'riskRate' },
                    width: 155,
                },
                {
                    title: this.$t('tableskeys.vt20'),
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 160,
                },
            ]
        }
    },
    methods: {
        //交易K线页路由
        legalDeal(val) {
            this.$router.push({
                name: 'trade',
                query: {
                    direction: val
                }
            })
        },
        toLeverage(s) {
            s = s.replace('/', '_').toLowerCase();
            this.$router.push({ name: 'margin-center-id', params: { id: s } })
        },
        toDeal(s) {
            s = s.replace('/', '_').toLowerCase();
            this.$router.push({ name: 'margin-id', params: { id: s } })
        },
        getLeverageInfo() {
            const _self = this;
            _self.$store.dispatch('userborrowmoney_user_mortgageassets_infos').then(({ data }) => {
                if (data) {
                    this.currencyData = data;
                    this.currencyData.forEach(_d => {
                        this.$store.state.symbleinfos.forEach(_m => {
                            if (_d.ctid == _m.id) {
                                _d.borrowmultiple = _m.borrowmultiple;
                            }
                        })
                    })
                }
                this.loading = false;
            })
        },
        showPopTrasfer(m) {
            if (m) {
                this.ctid = m.ctid;
            } else {
                this.getLeverageInfo();
            }
            this.transfer_pop = !this.transfer_pop;
        },
        async showRepay(val) {
            //console.log(val)
            let symblename = val.symblename.replace("/", "_").toLowerCase();
            this.$router.push({ path: `/margin/` + symblename });
        },
        setExplosionPrice(n, m) {
            if (n <= 0) {
                return 0;
            } else {
                return this.global_get_tofixed(n, this.global_get_decimal(m).a);
            }
        },
        confirmToRepayment(_this) {
            const _self = this;
            const params = Object.assign({}, {
                id: this.id,
            });
            this.$store.dispatch('userborrowmoney_user_borrow_back', params)
                .then((res) => {
                    if (res.data) {
                        this.$store.commit('set_message', {
                            type: 'ok',
                            text: res.msg
                        });
                        _self.getLeverageInfo();
                        _self.$refs.popup.close();//更新资产与订单列表
                    } else {
                        _self.$refs.popup.closeLoading();
                    }
                })
        },
        closePopup() {
            this.popupstate = !this.popupstate;
        },
        close() {

        },
        riskCssColorComputed(riskValue) {
            riskValue = (riskValue * 100).toFixed(1);
            if (riskValue >= 150) { return 'success-active' }
            else if (riskValue >= 120 && riskValue < 150) { return 'yellow-active' }
            else if (riskValue >= 110 && riskValue < 120) { return 'red-active' }
            else if (riskValue == 0) { return 'success-active' }
        },
        toggleFundVisible() {

            this.$store.dispatch('user_user_settings_save', {
                moreConfig: {
                    fundsVisible: !this.$usersettings.moreconfig.fundsvisible
                },
            }).then(({
                data
            }) => {
                if (data) {
                    this.global_refresh_user_settings();
                }
            })
        }
    },
    mounted() {
        if (this.$userinfo.uid) {
            this.getLeverageInfo();
        }
    }
}
</script>
<style lang="scss">@import '@/assets/scss/components/trade-table/trade-table.scss';</style>
