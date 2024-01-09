<template>
    <div class="legal-currency">
        <a-card class="buy-sell-card" :bordered="false">
            <a-row>
                <a-col :lg="24">
                    <p class="buy-sell-heading fw-5 mb-0">{{$t('person.Financial_Orders_person')}}</p>
                </a-col>
            </a-row>
        </a-card>
        <a-card :bordered="false" class="mt-3 detail-card financial-card">
            <div class="shadow-card pt-4 px-4 pb-4">
                <a-row :gutter="16">
                    <a-col :lg="4">
                        <hex-select ref="alltype" :label="$t('labels.lbl45')" :type="$i18n.t('manage.all')" :order="alltypes"
                            market="alltypes" @searchData="searchData" @change="change"
                            @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="4">
                        <hex-select ref="stetus" :label="$t('labels.lbl46')" type="Status" :order="dealstate" :market="dealstatetext"
                            @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="4">
                        <hex-select ref="financial" :label="$t('labels.lbl47')" :type="$i18n.t('legalTrad.Currencies')" :order="financial"
                            :market="financialtext" @searchData="searchData" @change="change"
                            @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="4">
                        <hex-select ref="cycleend" :label="$t('labels.lbl48')" :type="$i18n.t('manage.cycle')" :order="cycleend"
                            :market="cycletext" @searchData="searchData" @change="change"
                            @clearCurrentState="clearCurrentState" />
                    </a-col>

                    <a-col :lg="4" :xl="3" class="some-code-btn-space">
                        <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                            <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                                <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 2 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                            {{ $t('memberCenter.reset')
                                    }}</a-button>
                        </span>

                    </a-col>
                </a-row>
            </div>
            <div class="main-currency-card">
            <div class="currency-detail px-4 pt-2">
                <a-row :gutter="16" class="px-3">
                    <a-col :lg="2">
                        <p class="type-coin-txt fw-4">{{$t('person.pi2')}}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{$t('person.pi3')}}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{$t('person.pi4')}}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{$t('person.pi5')}}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{$t('person.pi6')}}</p>
                    </a-col>
                    <a-col :lg="2">
                        <p class="type-coin-txt fw-4">{{$t('subscriptio.sub5')}}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{$t('p2p.completion_ime')}}</p>
                    </a-col>
                    
                    <a-col :lg="3" align="end">
                        <p class="type-coin-txt fw-4">{{$t('person.pi9')}}</p>
                    </a-col>

                </a-row>
                <NoData v-if="dataList.length < 1" :loading="loading"/>
                <a-card :bordered="false" class="currency-detail-card" v-for="(item, index) in dataList" :key="index"
                    :class="index == 0 ? 'first-card' : ''">
                    <a-row class="px-3 curency-detail-bg">
                        <a-col :lg="14">
                            <p class="mb-0 currency-txt fw-5"><span>{{ alltypes[item.productinfo.type].value }}</span> <a-divider
                                    type="vertical" class="mx-2" /><span
                                    class="buy-txt">{{ dealstate[item.orderstatus + 1].value }}</span> <a-divider
                                    type="vertical" class="mx-2" />{{  global_get_local_time(item.createtime).format('YYYY-MM-DD hh:mm a') }}</p>
                        </a-col>
                        <a-col :lg="10" align="end">
                            <p class="mb-0 copy-link-txt fw-5"><span :id="`keycopy${index}`">{{ item.id }}</span>
                                <AppClipboard :target="`#keycopy${index}`" element-class="link-url1" />

                                <!-- <span class="link-url ml-1 pointer" :data-clipboard-target="`#keycopy${index}`"
                                    @click="copy('link-url')"><img src="/images/copy-icon.svg" class="pl-3 mb-1" height="15px"/></span> -->
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="px-3 py-4 col-alignment">
                        <a-col :lg="2">
                            <p class="col-alignment currency-txt fw-5 usdt-txt mb-0"><img
                                    :src="getCurrencyImage(item.productinfo.currencyname)" height="20" width="20"
                                    class="mr-2" />{{ global_get_uppercase(item.productinfo.currencyname) }}</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt mb-0">{{ item.amount }}</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt red-active mb-0">{{ yearlyrate(item.productinfo.yearlyrate) }}%
                            </p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0 pointer">{{ item.expectaccrual }}/{{ item.realaccrual }}
                            </p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt mb-0">{{
                                (global_get_local_time(item.createtime).format("Y-m-d hh:mm a")).slice(0, 10) }}</p>
                        </a-col>
                        <a-col :lg="2">
                            <p class="currency-txt fw-5 usdt-txt  mb-0">{{item.productinfo.cycle  }}
                            </p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0">{{ (global_get_local_time(addTime(item.createtime, 'add',
                                item.productinfo.cycle, 0, 0, 0)).format("Y-m-d hh:mm a")).slice(0, 10) }}</p>
                        </a-col>
                        
                        <a-col :lg="3" align="end"><a-button class="contact-btn fw-5"
                                v-if="item.orderstatus < 3 && item.productinfo.type != 0 && item.productinfo.type != 2"
                                @click="deletepopup(item, 'deleteAddress')">Return</a-button><span v-else>--</span></a-col>
                    </a-row>
                </a-card>
                
            </div>
        </div>
            <a-row class="px-4 pt-3 pb-3">
                <a-col align="end">
                    <div class=" text-right" v-if="total > 0">
                        <a-pagination background @change="handChange" :page-size="postData.pagesize"
                            :current="postData.pageindex" popper-class="paging" layout="prev, pager, next" :total="total">
                        </a-pagination>
                    </div>
                </a-col>
            </a-row>
        </a-card>
        <popupstair v-show="deleteState" @closePopup="deletePopupState" @deleteAddress="returnDeal" :title="$t('titles.title24')"
            :subTitle="$t('titles.title25')" ref="popname" />
    </div>
</template>

<script>
import AppClipboard from '~/components/App/AppClipboard.vue';
import select from '@/components/security/deal_select';
import NoData from '~/components/public/NoData';
import Clipboard from 'clipboard';
import popupstair from '@/components/security/popup-only-google'
export default {
    name:'FinancialDeal',
    components: {
        "hex-select": select,
        NoData,
        popupstair,
        AppClipboard
    },
    computed: {
        cycleend: function () {//周期
            return [
                {
                    id: 30,
                    value: '0~30' + this.$t('manage.Day'),
                    type: 'cycleend'//小于等于x天数
                },
                {
                    id: 60,
                    value: '30~60' + this.$t('manage.Day'),
                    type: 'cycleend'
                },
                {
                    id: 90,
                    value: '60~90' + this.$t('manage.Day'),
                    type: 'cycleend'
                },
                {
                    id: 180,
                    value: '90~180' + this.$t('manage.Day'),
                    type: 'cycleend'
                },
                {
                    id: 181,
                    value: '180' + this.$t('manage.Moredays'),
                    type: 'cycleend'
                }
            ]
        },
        dealstate: function () {//状态
            return [
                {
                    id: -1,
                    value: this.$t('values.val3'),
                    type: 'status'
                },
                {
                    id: 0,
                    value: this.$t('manage.placed'),
                    type: 'status'
                },
                {
                    id: 1,
                    value: this.$t('manage.force'),
                    type: 'status'
                },
                {
                    id: 2,
                    value: this.$t('manage.released'),
                    type: 'status'
                },
                {
                    id: 3,
                    value: this.$t('manage.refunded'),
                    type: 'status'
                },
            ]
        },
        alltypes: function () {//状态
            return [
                {
                    id: 0,
                    value: this.$t('values.val4'),
                    type: 'type'
                },
                {
                    id: 1,
                    value: this.$t('values.val5'),
                    type: 'type'
                },
                {
                    id: 2,
                    value: this.$t('values.val6'),
                    type: 'type'
                },
                {
                    id: 3,
                    value: this.$t('values.val7'),
                    type: 'type'
                },
            ]
        }
    },
    watch: {
        '$store.state.hex_lang.locale': function (val) {
            this.lang = val;
        }
    },
    data() {
        return {
            lang: this.$store.state.hex_lang.locale,
            found: false,
            total: 0,
            hoverKey: -1,
            loading: false,
            financialtext: "financial",//币种
            cycletext: "cycleend",//周期
            dealstatetext: 'status',//状态
            searchParam: {},
            dataList: [],
            postData: {
                pageindex: 1,
                pagesize: 5,
            },
            financial: [],
            current: 2,
            deleteState: false,
        }
    },
    mounted() {
        this.loading = false;
        this.getpagelist(0);
    },
    methods: {
        getorderState(n) {
            let s;
            switch (n) {
                case 0:
                    s = this.$t('manage.place');
                    break;
                case 1:
                    s = this.$t('manage.force');
                    break;
                case 2:
                    s = this.$t('manage.released');
                    break;
                case 3:
                    s = this.$t('legalDeal.Cancelled');
                    break;
            }
            return s;
        },
        yearlyrate(val) {
            let rate = val * 100;
            return rate.toFixed(2);
        },
        getCurrencyImage(coinname) {
            return this.financial.filter(item => item.currencyname == coinname)[0].icon;
        },
        handChange(val) {
            this.getpagelist(val);
        },
        deletePopupState() {
            this.deleteState = !this.deleteState;
        },
        deletepopup(vid, m) {
            this.deleteId = vid;
            this.deleteState = !this.deleteState;
            this.$refs.popname.ShowPopup(vid, m);
        },
        change(val) {
            const _self = this;
            switch (val) {
                case 'financial':
                    _self.$refs.stetus.changeBack();
                    _self.$refs.cycleend.changeBack();
                    break;
                case 'status':
                    _self.$refs.cycleend.changeBack();
                    _self.$refs.financial.changeBack();
                    break;
                case 'cycleend':
                    _self.$refs.financial.changeBack();
                    _self.$refs.stetus.changeBack();
                    break;
            }
        },
        searchData(val) {//用于存子组件传过来数据
            this.searchParam[val.type] = val;
            this.getpagelist(0);
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        resetSelect() {
            this.$refs.alltype.clearStatus();
            this.$refs.stetus.clearStatus();
            this.$refs.financial.clearStatus();
            this.$refs.cycleend.clearStatus();
            this.searchParam = {};
            this.getpagelist(0);
        },
        addTime(times, type, days, hours, minutes, seconds) {// 计算时间（基准时间yyyy-MM-dd HH:mm:ss，增加或减少(add|minus)，天，小时，分钟，秒）
            // 全部需要减掉的时间戳
            let all_time = new Date(times).getTime();
            switch (type) {
                case "add":
                    all_time +=
                        days * 24 * 60 * 60 * 1000 +
                        hours * 60 * 60 * 1000 +
                        minutes * 60 * 1000 +
                        seconds * 1000;
                    break;
                case "minus":
                    all_time -=
                        days * 24 * 60 * 60 * 1000 +
                        hours * 60 * 60 * 1000 +
                        minutes * 60 * 1000 +
                        seconds * 1000;
                    break;
            }
            // 转换时间戳格式
            return this.formatDate(all_time);
        },
        formatDate(time) {
            let date = new Date(time);
            let YY = date.getFullYear();
            let MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            // 这里可以修改返回的日期格式
            return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
        },
        async returnDeal(id) {
            const _self = this;

            try {
                const resp = await _self.$store.dispatch('finance_user_order_cancel', {
                    orderID: id
                });
                this.deleteState = !this.deleteState;
                if (resp.code == '200')
                    _self.$store.commit('set_message', { type: 'ok', text: resp.msg });
                const Array = this.dataList.filter(item => item.id != id);
                this.dataList = Array;
            } catch (error) {
                //console.log('Error', error);
            }
        },
        getpagelist(pageIndex) {
            const _this = this;
            _this.loading = true;
            _this.dataList = [];
            _this.$refs.financial.changeBack();
            _this.$refs.stetus.changeBack();
            _this.$refs.cycleend.changeBack();
            let serachPost = {};
            for (let k in _this.searchParam) {
                if (Object.getOwnPropertyNames(_this.searchParam[k]).length > 0 && _this.searchParam[k].id != -1) {
                    if (_this.searchParam[k].type == 'financial') {
                        serachPost['currencyid'] = _this.searchParam[k].id;
                    } else {
                        serachPost[_this.searchParam[k].type] = _this.searchParam[k].id;
                    }
                } else {
                    if (_this.searchParam[k].id == 0) {
                        serachPost[_this.searchParam[k].type] = 0;
                    } else {
                        delete serachPost[k];
                    }
                }
            }
            switch (serachPost.cycleend) {
                case 30:
                    serachPost.cyclestart = 0;
                    break;
                case 60:
                    serachPost.cyclestart = 30;
                    break;
                case 90:
                    serachPost.cyclestart = 60;
                    break;
                case 180:
                    serachPost.cyclestart = 90;
                    break;
                case 181:
                    serachPost.cyclestart = 180;//cyclestart:大于等于x天数
                    delete serachPost.cycleend;//cycleend:小于等于x天数
                    break;
            }
            pageIndex ? this.postData.pageindex = pageIndex : this.postData.pageindex = 1;
            let serachOrder = Object.assign({}, this.postData, serachPost);
            this.$store.dispatch('finance_user_order_getlist', serachOrder).then(({ data }) => {
                if (data && data.pagedata.length > 0) {
                    this.dataList = data.pagedata;
                    this.total = data.totalitemcount
                    this.found = false;
                } else {
                    this.dataList = [];
                    this.found = true;
                    this.total = 0;
                }
                this.loading = false;
            })
        }
    }
}
</script>

<style></style>
