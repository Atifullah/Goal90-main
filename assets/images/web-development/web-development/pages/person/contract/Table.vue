<template>
    <div>
        <a-card class="deposit-card" :bordered="false">

            <a-row :gutter="16">
                <a-col :lg="20"
                ><p class="total-blance fw-5 mb-0">{{$t('wallet.totalAssets')}}

                    <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="toggleFundVisible">
                                    <use :xlink:href="$usersettings.moreconfig?.fundsvisible  ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
                </p>
                <p class="deposit-blance fw-6 mb-0">
                    {{$usersettings.moreconfig?.fundsvisible?totalAssets:'*******'}} BTC <span class="limit-txt fw-4">≈ {{$usersettings.moreconfig?.fundsvisible?allTransition:'*******'}}  {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}</span>
                  
                </p>
                </a-col>
            </a-row>
        </a-card>
        <a-card class="mt-3 tabs-card contract-table" :bordered="false">
          <a-tabs :default-active-key="0" v-model="records" @change="changeTab">
            <a-tab-pane :key="0" :tab="$t('tabkeys.tab74')">
              <div class="trade-detail">
                <a-card :bordered="false" class="deposit-detail-card">
                  <a-row :gutter="16" class="px-4 col-alignment mb-4">
                    <a-col :lg="2">
                        <!-- <p class="total-blance fw-5 mb-0">{{$t('person.token_person')}}</p> -->
                    </a-col>
                    <a-col :lg="17" align="end">
                        <p class="hide-txt fw-5 show-hide mb-0">
                            {{ hideSmallBalance ? $t('person.hide_person') : $t('person.show_person') }} {{$t('person.sbalance_person')}}
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
                <a-table :columns="tradeTableColumns" :pagination="{pageSize: 10}" :data-source="searchList" rowKey="ctid" :loading="loading">
                    <div slot="market" slot-scope="text,row">
                        <p class="mb-0">
                        <img height="20" width="20" class="mr-1" :src="row.icon" v-if="row.icon" alt="">
                        {{ (row.symblename).toUpperCase() }} <span class="prepetual-txt py-1 px-1">{{$t('contract.swap')}}</span>
                        </p>
                    </div>
                    <span slot="customTitle">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct1')}}</p>
                            </template>
                            {{$t('contract.ct2')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                    </span>
                    <div slot="equity" slot-scope="text,row">
                        <p class="mb-0">
                            {{global_get_tofixed(row.accountequity, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt">{{row.symblename}}</span></p>
                        <p class="mb-0">≈ {{ $store.getters.get_client_exchange_rate_name.mark }}
                            {{ $store.getters.get_client_exchange_rate(row.symblename, row.accountequity) }}</p>
                    </div>
                    <span slot="availableTitle">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4"> {{$t('contract.ct3')}}</p>
                            </template>
                            {{$t('contract.ct4')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                    </span>
                        <span slot="positionTitle" >
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct5')}}</p>
                            </template>
                            {{$t('contract.ct6')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                        <span slot="totalProfit" >
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct7')}}</p>
                            </template>
                            {{$t('contract.ct8')}}<img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                        <span slot="riskRatePrice" >
                        <a-popover :title="false" overlay-class-name="p2paccount-popover deposit-main-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4"> {{$t('contract.ct9')}}<br/>
                                    {{$t('contract.ct10')}}</p>
                            </template>
                            {{$t('leverage.riskRate')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                        <span slot="marginSlot">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4"> {{$t('contract.ct12')}} </p>
                            </template>
                            {{$t('contract.ct13')}}  <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                    <div slot="position" slot-scope="text,row">
                        <p class="mb-0">
                            {{global_get_tofixed(row.holdpositionsamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt">{{row.symblename}}</span>
                        </p>
                        <p class="mb-0">≈ {{ $store.getters.get_client_exchange_rate_name.mark }}
                            {{ $store.getters.get_client_exchange_rate(row.symblename, row.holdpositionsamount) }}</p>
                    </div>
                    <div slot="total_profit" slot-scope="text,row">
                        <p class="mb-0">
                            {{global_get_tofixed(row.unrealizedprofitandlossamount+row.profitandlossamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt">{{row.symblename}}</span>
                        </p>
                        <p class="mb-0">≈ {{ $store.getters.get_client_exchange_rate_name.mark }}
                            {{ $store.getters.get_client_exchange_rate(row.symblename, (row.unrealizedprofitandlossamount+row.profitandlossamount)) }}</p>
                    </div>
                    <div slot="margin" slot-scope="text,row">
                        <!-- <p class="mb-0 ">{{global_get_tofixed(row.amount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt"> {{row.symblename}}</span> </p> -->
                        <p class="mb-0">
                          {{global_get_tofixed(row.amount_usdt+row.experienceamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).p)}} <span class="prepetual-txt">USDT</span>
                          <a-popover :title="false" overlay-class-name="p2paccount-popover" v-if="row.experienceamount>0">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct14')}} {{global_get_tofixed(row.experienceamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).p)}}{{$t('contract.ct15')}}</p>
                            </template>
                            <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </p>
                    </div>
                    <div slot="liq_price" slot-scope="text,row">
                        <p class="mb-0 ">
                            <span class="second-txt" :class="riskCssColorComputed(row.marginrate)">{{(row.marginrate!=0?global_get_tofixed(row.marginrate,2)+'%':'No Risk')}}</span>
                            <!-- <br>≈ 
                            {{global_get_tofixed(row.explosionprice, global_get_decimal(replaceCurrency(row.symblename+"/yx")).p)}} <span class="prepetual-txt">USDT</span> -->
                        </p>
                    </div>

                    <div slot="action" slot-scope="text,row">
                        <span class="mr-2 pointer deposit-table-txt fw-5" @click="showPopTrasfer(row)">{{$t('leverage.transfer')}}</span>
                        <span class="pointer deposit-table-txt fw-5" @click="toUDeal(row.symblename)">{{$t('wallet.deal')}}</span>
                    </div>
                </a-table>
                <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="ctid" type="3" :closePopup="showPopTrasfer" />
                </a-card>
              </div>
            </a-tab-pane>
           <!-- <a-tab-pane :key="1" :tab="$t('tabkeys.tab75')">
              <div class="trade-detail">
                <a-card :bordered="false" class="deposit-detail-card">
                  <a-row :gutter="16" class="px-4 col-alignment mb-4">
                    <a-col :lg="2">
                         <p class="total-blance fw-5 mb-0">{{$t('person.token_person')}}</p> -->
                   <!-- </a-col>
                    <a-col :lg="17" align="end">
                        <p class="hide-txt fw-5 show-hide mb-0">
                            {{ hideSmallBalance1 ? $t('person.hide_person') : $t('person.show_person') }} {{$t('person.sbalance_person')}}
                                <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="hideSmallBalance1 = !hideSmallBalance1">
                                    <use :xlink:href="hideSmallBalance1   ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
                        </p>
                    </a-col>
                    <a-col :lg="5">
                        <a-input :placeholder="$t('placeholders.plh5')" v-model="search1">
                            <span slot="prefix">
                                <img src="/images/search-icon.svg" /></span>
                        </a-input>
                    </a-col>
                </a-row>
                <a-table :columns="tradeTableColumns1" :pagination="{pageSize: 10}" :data-source="searchList1" rowKey="ctid" :loading="loading">
                    <div slot="market" slot-scope="text,row">
                        <p class="mb-0">
                        <img height="20" width="20" class="mr-1" :src="row.icon" v-if="row.icon" alt="">
                        {{ (row.symblename).toUpperCase() }} <span class="prepetual-txt py-1 px-1">{{$t('contract.swap')}}</span>
                        </p>
                    </div>
                    <span slot="customTitle">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct1')}}</p>
                            </template>
                            {{$t('contract.ct2')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                    </span>
                    <div slot="equity" slot-scope="text,row">
                        <p class="mb-0">
                            {{global_get_tofixed(row.accountequity, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt">{{row.symblename}}</span></p>
                        <p class="mb-0 ">≈ {{currencyExchange(row.symblename,Number(global_get_tofixed(row.accountequity, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)))}} <span class="prepetual-txt">USDT</span>
                        </p>
                    </div>
                    <span slot="availableTitle">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4"> {{$t('contract.ct3')}}</p>
                            </template>
                            {{$t('contract.ct4')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                        <span slot="positionTitle" >
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct5')}}</p>
                            </template>
                            {{$t('contract.ct6')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                        <span slot="totalProfit" >
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct7')}}</p>
                            </template>
                            {{$t('contract.ct8')}}<img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                        <span slot="riskRatePrice" >
                        <a-popover :title="false" overlay-class-name="p2paccount-popover deposit-main-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4"> {{$t('contract.ct9')}}<br/>
                                    {{$t('contract.ct10')}}</p>
                            </template>
                            {{$t('contract.ct11')}} <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                        <span slot="marginSlot">
                        <a-popover :title="false" overlay-class-name="p2paccount-popover">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4"> {{$t('contract.ct12')}} </p>
                            </template>
                            {{$t('contract.ct13')}}  <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </span>
                    <div slot="position" slot-scope="text,row">
                        <p class="mb-0">
                            {{global_get_tofixed(row.holdpositionsamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt">{{row.symblename}}</span>
                        </p>
                    </div>
                    <div slot="total_profit" slot-scope="text,row">
                        <p class="mb-0">
                            {{global_get_tofixed(row.unrealizedprofitandlossamount+row.profitandlossamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt">{{row.symblename}}</span>
                        </p>
                        <p class="mb-0">≈ {{currencyExchange(row.symblename,Number(global_get_tofixed(row.unrealizedprofitandlossamount+row.profitandlossamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)))}}
                            <span class="prepetual-txt">USDT</span>
                        </p>
                    </div>
                    <div slot="margin" slot-scope="text,row">
                        <p class="mb-0 ">{{global_get_tofixed(row.amount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).a)}} <span class="prepetual-txt"> {{row.symblename}}</span> </p>
                        <p class="mb-0">
                          {{global_get_tofixed(row.amount_usdt+row.experienceamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).p)}} <span class="prepetual-txt">USDT</span>
                          <a-popover :title="false" overlay-class-name="p2paccount-popover" v-if="row.experienceamount>0">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{$t('contract.ct14')}} {{global_get_tofixed(row.experienceamount, global_get_decimal(replaceCurrency(row.symblename+"/yx")).p)}}{{$t('contract.ct15')}}</p>
                            </template>
                            <img src="/images/gray-circle.svg" height="12"/>
                        </a-popover>
                        </p>
                    </div>
                    <div slot="liq_price" slot-scope="text,row">
                        <p class="mb-0 ">
                            <span class="second-txt" :class="riskCssColorComputed(row.marginrate)">{{(row.marginrate!=0?global_get_tofixed(row.marginrate,2)+'%':'No Risk')}}</span>
                            <br>≈ 
                            {{global_get_tofixed(row.explosionprice, global_get_decimal(replaceCurrency(row.symblename+"/yx")).p)}} <span class="prepetual-txt">USDT</span>
                        </p>
                    </div>

                    <div slot="action" slot-scope="text,row">
                        <span class="mr-2 pointer deposit-table-txt fw-5" @click="showPopTrasfer(row)">{{$t('leverage.transfer')}}</span>
                        <span class="pointer deposit-table-txt fw-5" @click="toDeal(row.symblename)">{{$t('wallet.deal')}}</span>
                    </div>
                </a-table>
                <hex-transfer v-if="transfer_pop1" :transfer_pop="transfer_pop1" :ctid="ctid" type="3" :closePopup="showPopTrasfer" />
                </a-card>
              </div>
            </a-tab-pane>-->
          </a-tabs>
        </a-card>
    </div>
</template>
<script>
import transferPop from '@/components/security/transfer';//转账
export default {
    components: {
        'hex-transfer': transferPop,
    },
    computed: {
        searchList: function () {
            const _this = this;
            const list = _this.currencyData
            const value = _this.search.toLowerCase().replace(/ /g, '');
            let searchary = [];
            if (value) {
                const reg = new RegExp(value, 'gim');
                list.map((item) => {
                    if ((item.symblename).match(reg)) {
                        searchary.push(item)
                    }
                });
                return _this.hideSmallBalance ? searchary.filter(item => {
                    const amount = Number(item.amount) + item.frozenamount > 0 ? _this.global_get_tofixed(Number(item.amount) + item.frozenamount, _this.global_get_decimal(item.symblename).p) : 0
                    return amount >= 1;
                }) : searchary;
            } else {
                return _this.hideSmallBalance ? list.filter(item => {
                    const amount = Number(item.amount) + item.frozenamount > 0 ? _this.global_get_tofixed(Number(item.amount) + item.frozenamount, _this.global_get_decimal(item.symblename).p) : 0
                    return amount >= 1;
                }) : list;
            }
        },
        // searchList1: function () {
        //     const _this = this;
        //     const list = _this.getContractsInfos(_this.currencyData1, 0)
        //     const value = _this.search1.toLowerCase().replace(/ /g, '');
        //     let searchary = [];
        //     if (value) {
        //         const reg = new RegExp(value, 'gim');
        //         list.map((item) => {
        //             if ((item.symblename).match(reg)) {
        //                 searchary.push(item)
        //             }
        //         });
        //         return _this.hideSmallBalance1 ? searchary.filter(item => {
        //             const amount = Number(item.tamount) + item.tfrozenamount > 0 ? _this.global_get_tofixed(Number(item.tamount) + item.tfrozenamount, _this.global_get_decimal(item.symblename).p) : 0
        //             return amount >= 1;
        //         }) : searchary;
        //     } else {
        //         return _this.hideSmallBalance1 ? list.filter(item => {
        //             const amount = Number(item.tamount) + item.tfrozenamount > 0 ? _this.global_get_tofixed(Number(item.tamount) + item.tfrozenamount, _this.global_get_decimal(item.symblename).p) : 0
        //             return amount >= 1;
        //         }) : list;
        //     }
        // },
        totalAssets: function() {
            const _this = this;
            let allbtc = 0;
            this.currencyData.forEach((item) => {
                allbtc += this.$store.getters.get_btc_exchange_rate(item.symblename, item.accountequity)
                // allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.lockamount)
            });
            _this.decimal = this.global_get_decimal('btc');
            return this.global_get_tofixed(allbtc, _this.decimal.a);
        },
        allTransition: function() {
            let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
            return alltransition;
        },
    },
    data() {
        return {
            List: [],
            loading: true,
            hideSmallBalance: false,
            hideSmallBalance1: false,
            transfer_pop: false,
            transfer_pop1: false,
            currencyData: [],
            currencyData1: [],
            search: "",
            search1: '',
            ctid: 0,
            records: 0,
            tradeTableColumns: [
                {
                    title: this.$t('tableskeys.tk1'),
                    dataIndex: 'market',
                    scopedSlots: { customRender: 'market' },
                    width: 155,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt15')},
                        slots: { title: 'customTitle' },

                    dataIndex: 'equity',
                    scopedSlots: { customRender: 'equity' },
                    width: 130,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt16') },
                    slots: {title: 'positionTitle'},
                    dataIndex: 'position',
                    scopedSlots: { customRender: 'position' },
                    width: 150,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt17') },
                    slots: {title: 'totalProfit'},
                    dataIndex: 'profit',
                    scopedSlots: { customRender: 'total_profit' },
                    width: 150,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt18') },
                    slots: {title: 'riskRatePrice'},
                    dataIndex: 'liq_price',
                    scopedSlots: { customRender: 'liq_price' },
                    width: 140,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt19') },
                    slots: {title: 'marginSlot'},
                    dataIndex: 'margin',
                    scopedSlots: { customRender: 'margin' },
                    width: 150,
                },
                {
                    title: this.$t('tableskeys.vt20'),
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 170,
                },
            ],
            tradeTableColumns1: [
                {
                    title: this.$t('tableskeys.tk1'),
                    dataIndex: 'market',
                    scopedSlots: { customRender: 'market' },
                    width: 155,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt15')},
                        slots: { title: 'customTitle' },

                    dataIndex: 'equity',
                    scopedSlots: { customRender: 'equity' },
                    width: 130,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt16') },
                    slots: {title: 'positionTitle'},
                    dataIndex: 'position',
                    scopedSlots: { customRender: 'position' },
                    width: 100,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt17') },
                    slots: {title: 'totalProfit'},
                    dataIndex: 'profit',
                    scopedSlots: { customRender: 'total_profit' },
                    width: 140,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt18') },
                    slots: {title: 'riskRatePrice'},
                    dataIndex: 'liq_price',
                    scopedSlots: { customRender: 'liq_price' },
                    width: 160,
                },
                {
                    // slots: { title: this.$t('tableskeys.vt19') },
                    slots: {title: 'marginSlot'},
                    dataIndex: 'margin',
                    scopedSlots: { customRender: 'margin' },
                    width: 110,
                },
                {
                    title: this.$t('tableskeys.vt20'),
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 170,
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
            s = s.toLowerCase() + "_yx";
            this.$router.push({ path: '/contract/' + s })
        },
        toUDeal(s) {
            s = 'btc' + "_yx";
            let path = '/contract/' + s + '?contractType=1'
            this.$router.push({ path: path })
        },
        currencyExchange(symblename, amount) {
            return this.$store.getters.get_client_exchange_rate(this.replaceCurrency(symblename), amount);
        },
        replaceCurrency(symble) {
            return symble.toUpperCase().replace(this.$t('contract.swap'), '');
        },
        getContractAssesInfos() {
            const _self = this;
            if (!this.$userinfo.uid) {
                return
            }
            const params = Object.assign({}, {
                ctid: 0,
                uid: this.$userinfo.uid,
                key: this.$userinfo.secretkey,
                contractType: this.records == 0? 1 : 0
            });
            _self.$store.dispatch('usercontract_user_contractassets_infos', params).then(({ data }) => {
                if (data) {
                    if (_self.records == 0) {
                      this.currencyData = data;
                    } else {
                      this.currencyData1 = data;
                    }
                    
                } else {
                }
                this.loading = false;
            })
        },
        showPopTrasfer(m) {
            if (m){
                this.ctid = m.ctid;
            }else {
                this.getContractAssesInfos();
            }
            this.transfer_pop = !this.transfer_pop;
        },
        setExplosionPrice(n, m) {
            if (n <= 0) {
                return 0;
            } else {
                return this.global_get_tofixed(n, this.global_get_decimal(m).a);
            }
        },
        riskCssColorComputed(riskValue) {
            if (riskValue >=100) {
                return 'success-active'
            }
            else if (riskValue >= 50 && riskValue < 100) { return 'yellow-active' }
            else if (riskValue>0 && riskValue < 50) {
                return 'red-active';
            }
            else if(riskValue==0){
                return 'success-active'
            }
        },
        changeTab(tabs) {
          this.getContractAssesInfos()
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
            this.getContractAssesInfos();
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/components/trade-table/trade-table.scss';
</style>
