<template>
    <div class="counter-party" v-if="!loading">
        <a-card :bordered="false" class="">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="13" :xl="12">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="3">
                            <span v-if="counterParty.userlogo" class="photo"
                                :class="{ 'online': counterParty?.online == 'now is online' }"><img
                                    :src="counterParty.userlogo" height="53px" width="53px"
                                    style="border-radius:50%" /></span>
                            <span v-else class="photo" :class="{ 'online': counterParty?.online == 'now is online' }"
                                :style="{ 'background-color': global_get_random_color(counterParty?.userid ? counterParty?.userid.substring(counterParty?.userid.length - 1) : 0) }">
                                {{ getname(counterParty?.nickname) }}
                            </span>
                        </a-col>
                        <a-col :lg="21" class="profile-avatar">
                            <p class="user-name fw-5 mb-2">{{ counterParty?.nickname }}<img
                                    v-if="getCompletionRate(counterParty) >= 95" title="High Rated Merchant"
                                    src="/images/star-p2p.svg" class="ml-1" /><img v-if="isMerchant"
                                    title="Certified Merchant" src="/images/check-star.svg" class="ml-1" /><span
                                    class="grey-active ml-2" style="font-size:12px;">{{ $t('counterparty.cp1') }}
                                    {{ global_get_local_time(counterParty.firsttradetime).format('YYYY-MM-DD') }}</span></p>

                            <a-tag :checked="true" v-if="isMerchant">
                                <p class="mb-0 counter-party-tags counter-date fw-5 success-active">
                                    <img src="/images/green-dot-tick.svg" height="12px" class="mb-1" />
                                    {{ $t('counterparty.cp2') }}
                                </p>
                            </a-tag>
                            <a-tag v-else>
                                <p class="mb-0 counter-party-tags counter-date fw-5 success-active">
                                    <img src="/images/green-dot-tick.svg" height="12px" class="mb-1" />
                                    {{ $t('counterparty.cp3') }}
                                </p>
                            </a-tag>
                            <a-tag :checked="true">
                                <p class="mb-0 counter-party-tags counter-date fw-5 block-txt pointer"
                                    @click="showBlockPopup">
                                    {{ counterParty?.isblocked ? this.$t('pinfo.pin16') : this.$t('chat.chat16') }}</p>
                            </a-tag>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="11" :xl="12" align="end">
                        <p class="counter-date fw-5 mb-2"><span class="pl-3">{{ $t('p2p.p2p3') }}
                                {{ counterParty?.deposit }} USDT</span>
                        </p>
                        <p class="counter-list-text fw-5 mb-0"><span class="pl-3">
                                                        <svg  height="14px"  width="14px" class="svg-icon mb-1 mr-1"  alt="tick">
                            <use :xlink:href="counterParty.email ? '/images/svg/sprite.svg#green-dot-tick-icon' : '/images/svg/sprite.svg#red-cross-icon'"></use>
                            </svg>{{ $t('p2p.p2p4') }} </span>
                                                <span class="pl-3">
                                                        <svg height="14px" width="14px" class="svg-icon mb-1 mr-1"  alt="tick">
                            <use :xlink:href="counterParty.phone ? '/images/svg/sprite.svg#green-dot-tick-icon' : '/images/svg/sprite.svg#red-cross-icon'"></use>
                            </svg> SMS</span>
                                                <span class="pl-3">
                                                        <svg height="14px" width="14px" class="svg-icon mb-1 mr-1"  alt="tick">
                            <use :xlink:href="counterParty.iskyc ? '/images/svg/sprite.svg#green-dot-tick-icon' : '/images/svg/sprite.svg#red-cross-icon'"></use>
                            </svg>{{ $t('p2p.p2p5') }} </span>
                                            </p>
                    </a-col>
            </a-row>
        </a-card>

        <a-row :gutter="16" class="mt-3">
            <a-col :lg="24" :xl="17">
                <a-card :bordered="false">
                    <a-row class="mb-5 mt-4">
                        <a-col :lg="8">
                            <a-card class="trades-card" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p10') }}
                                    <a-popover overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('counterparty.cp4') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover>
                                </p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.alltrades }} {{ $t('p2p.p2p11') }}</p>
                            </a-card>
                        </a-col>
                        <a-col :lg="8">
                            <a-card class="trades-card " :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('counterparty.cp5') }} <a-popover
                                        overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('counterparty.cp6') }}
                                            </p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{
                                    global_get_tofixed_entrust(counterParty?.approxvolume_buy_total +
                                        counterParty?.approxvolume_sell_total, 6)
                                }}</p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt">{{ $t('counterparty.cp12') }}
                                        {{ global_get_tofixed_entrust(counterParty?.approxvolume_buy_total, 6) }} </span>/
                                    <span class="trade-sell-txt">{{ $t('deal.sell') }} {{
                                        global_get_tofixed_entrust(counterParty?.approxvolume_sell_total, 6) }}</span>
                                </p>
                            </a-card>
                        </a-col>
                        <a-col :lg="8">
                            <a-card class="trades-card trades-card-border" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p12') }} <a-popover
                                        overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('counterparty.cp13') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.trades_thirtydays }} {{ $t('p2p.p2p11')
                                }}</p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt"></span><span
                                        class="trade-sell-txt"></span></p>
                            </a-card>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :lg="8">
                            <a-card class="trades-card" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p14') }} <a-popover
                                        overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('counterparty.cp7') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.avgreleasetime }} {{ $t('p2p.p2p15') }}
                                </p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt"></span> <span
                                        class="trade-sell-txt">
                                    </span></p>
                            </a-card>
                        </a-col>
                        <a-col :lg="8">
                            <a-card class="trades-card" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p16') }} <a-popover
                                        overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('counterparty.cp8') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.avgpaytime }} {{ $t('p2p.p2p15') }}</p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt"></span> <span
                                        class="trade-sell-txt">
                                    </span></p>
                            </a-card>
                        </a-col>
                        <a-col :lg="8">
                            <a-card class="trades-card trades-card-border" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p13') }} <a-popover
                                        overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('counterparty.cp9') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.completionrate_thirtydays }}%</p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt"></span> <span
                                        class="trade-sell-txt">
                                    </span></p>
                            </a-card></a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :lg="24" :xl="7">
                <a-card :bordered="false" class="main-card">
                    <a-row :gutter="16">
                        <a-col :lg="8" :xl="24">
                            <a-card :bordered="false" class="feedback-card mb-3">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="5">
                                        <img src="/images/all-feedback.svg" />
                                    </a-col>
                                    <a-col :lg="19" class="pl-2">
                                        <p class="mb-0 feedbacck-title fw-5">{{ $t('p2p.p2p7') }}</p>
                                        <p class="mb-0 feedbacck-desc fw-4">{{ counterParty.positivefeedback }}%</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </a-col>
                        <a-col :lg="8" :xl="24">
                            <a-card :bordered="false" class="feedback-card positive-card mb-3">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="5">
                                        <img src="/images/positive-feedback.svg" />
                                    </a-col>
                                    <a-col :lg="19" class="pl-2">
                                        <p class="mb-0 feedbacck-title fw-5">{{ $t('p2p.p2p8') }}</p>
                                        <p class="mb-0 feedbacck-desc fw-4">{{ counterParty?.positive }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </a-col>
                        <a-col :lg="8" :xl="24">
                            <a-card :bordered="false" class="feedback-card mb-3 negative-card">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="5">
                                        <img src="/images/negative-feedback.svg" />
                                    </a-col>
                                    <a-col :lg="19" class="pl-2">
                                        <p class="mb-0 feedbacck-title fw-5">{{ $t('p2p.p2p9') }}</p>
                                        <p class="mb-0 feedbacck-desc fw-4">{{ counterParty?.negative }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
        <a-card :bordered="false" class="mt-3 counter-party-table-card">
            <a-row>
                <a-col :lg="24">
                    <a-tabs default-active-key="1" @change="handChange(1)">
                        <a-tab-pane key="1" :tab="`Online Ads (${totalBuyAds + totalSellAds})`">
                            <p class="pt-2 mb-0 user-online-ads fw-5 px-4 pt-4">{{ $t('counterparty.cp10') }}</p>
                            <OnlineAds :direction="-1" @setBuySellAdsCount="setBuySellAdsCount" />
                            <p class="pt-2 mb-0 user-online-ads fw-5 px-4">{{ $t('counterparty.cp11') }}</p>
                            <OnlineAds :direction="1" @setBuySellAdsCount="setBuySellAdsCount" />
                        </a-tab-pane>
                        <a-tab-pane key="2" :tab="`Feedback (${total})`">
                            <Feedback :feedbacks="feedbacks" />
                            <div class="px-3 pb-4 text-right" v-if="total > 0">
                                <a-pagination background @change="handChange" :page-size="page.pagesize"
                                    :current="page.pageindex" popper-class="paging" layout="prev, pager, next"
                                    :total="total">
                                </a-pagination>
                            </div>
                        </a-tab-pane>
                    </a-tabs>

                </a-col>
            </a-row>
        </a-card>
        <SelectReason :reasonModal="reasonModal" :block="block" :loading="blockloading" :close="close" />
    </div>
</template>

<script>
import OnlineAds from './OnlineAds.vue'
import SelectReason from './Modal/SelectReason.vue'
import Feedback from './Feedback.vue'
export default {
    name: 'CounterParty',
    components: {
        Feedback,
        OnlineAds,
        SelectReason,
    },
    computed: {
        isMerchant() {
            if (this.counterParty?.iskyc && this.counterParty?.merchantfrozen > 0) {
                return true;
            }
            return false;
        },
    },
    data() {
        return {
            feedbacks: [],
            total: 0,
            totalBuyAds: 0,
            totalSellAds: 0,
            page: {
                pageindex: 1,
                pagesize: 5,
            },
            loading: true,
            blockloading: false,
            reasonModal: false,
            counterParty: null,
            onlineAds: true,
        };
    },
    methods: {
        handChange(val) {
            this.getUserFeedBacks(val);
        },
        setBuySellAdsCount(val, type) {
            if (type == 1) {
                this.totalSellAds = val;
            }
            else {
                this.totalBuyAds = val;
            }

        },
        getname(val) {
            return val ? val.substring(0, 1) : '--'
        },
        getCompletionRate(item) {
            const rate = (1 - item.negative / (item.positive + item.negative)) * 100
            if (Number.isNaN(rate)) {
                return 0;
            }
            return rate.toFixed(2);
        },
        async getUserFeedBacks(pageIndex) {
            const _self = this;
            this.page.pageindex = pageIndex ? pageIndex : 1;
            let reqData = Object.assign(this.page);
            reqData.touid = this.$route.query.userid;
            reqData.advid = this.$route.query.advid;
            try {
                let { data } = await _self.$store.dispatch('trading_c2c_evaluates_get', reqData);
                if (data) {
                    this.feedbacks = data.pagedata;
                    this.total = data.totalitemcount;
                }
                else {
                    this.total = 0;
                    this.feedbacks = [];
                }
            } catch (error) {
                //console.log('Error', error);
            }
        },
        async getCounterPartyInfo() {
            const _self = this;
            try {
                const { data } = await _self.$store.dispatch('trading_statistics_p2p', {
                    touid: this.$route.query.userid,
                    advid: this.$route.query.advid
                });
                if (data) {
                    _self.counterParty = data;
                    //console.log(data,"counterParty")
                }
                _self.loading = false;
            } catch (error) {
                //console.log('Error', error);
            }
        },
        showBlockPopup() {
            if (!this.counterParty.isblocked) {
                this.reasonModal = true
            }
            else {
                this.block(null);
            }
        },
        async block(reason) {
            const _self = this;
            _self.blockloading = true;
            let postData = {
                blockUserID: this.counterParty.userid,
                blockNickName: this.counterParty.nickname,
            }
            if (reason) {
                postData.reason = reason;
            }
            try {
                const data = await _self.$store.dispatch('trading_c2c_block_user_update', postData);
                _self.counterParty.isblocked = !_self.counterParty.isblocked;
                _self.blockloading = false;
                _self.reasonModal = false;
                _self.$store.commit('set_message', { type: 'ok', text: _self.counterParty.isblocked ? this.$t('depositModal.dm22') : this.$t('depositModal.dm23') });
            } catch (error) {
                //console.log('Error', error);
                _self.blockloading = false;
            }
        },
        close() {
            this.reasonModal = false;
            this.tradingRequirements = false;
        },
    },
    mounted() {
        this.getCounterPartyInfo();
        this.getUserFeedBacks(1);
    }
}
</script>

<style lang="scss" scoped>
.photo {
    display: inline-block;
    border-radius: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 53px;
    height: 53px;
    line-height: 36px;
    margin-right: 0px;
    color: #ffffff;
    position: relative;
}

.photo:after {
    content: '';
    display: inline-block;
    width: 12px;
    position: absolute;
    height: 12px;
    border-radius: 50%;
    background-color: #DDDDDD;
    background-clip: content-box;
    border: 2px solid #ffffff;
    bottom: 0;
    right: 0;
}

.photo.online:after {
    background-color: #0ED12A;
}</style>

