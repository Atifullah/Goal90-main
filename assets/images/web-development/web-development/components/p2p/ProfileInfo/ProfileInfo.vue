<template>
    <div class="profile-info" v-if="!loading">
        <a-card :bordered="false">
            <a-row :gutter="16">
                <a-col :lg="24" :xl="11">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="2" :xl="3">
                            <img v-if="$userinfo.avatar" :src="$userinfo.avatar" height="53px" width="53px"
                                style="border-radius:50%" />
                            <span v-else class="photo online"
                                :style="{ 'background-color': global_get_random_color($userinfo.uid.substring($userinfo.uid.length - 1)) }">
                                {{ getname($userinfo.nickname) }}
                            </span>
                        </a-col>
                        <a-col :lg="22" :xl="21" class="profile-avatar">
                            <p class="user-name fw-5 mb-2" v-if="!edit">{{ $userinfo.nickname }}<img @click="edit = true"
                                    :src="!edit ? '/images/user-edit.svg' : '/images/save-icon.svg'"
                                    class="ml-2 pointer" /><img src="/images/sharing.svg" class="ml-2 pointer"
                                    @click="profileSharing = true" /><span class="verified-merchant fw-5 pl-2"><a-tag
                                        :checked="true" v-if="$usersettings.moreconfig?.applyadv">
                                        <p class="mb-0 counter-party-tags counter-date fw-5 success-active">
                                            <img src="/images/green-dot-tick.svg" height="12px" class="mb-1  mr-2" />{{
                                                $t('pinfo.pin1') }}
                                        </p>
                                    </a-tag>
                                    <a-tag v-else>
                                        <p class="mb-0 counter-party-tags counter-date fw-5 grey-active">
                                            <img src="/images/green-dot-tick.svg" height="12px" class="mb-1" />
                                            {{ $t('pinfo.pin2') }}
                                        </p>
                                    </a-tag></span></p>
                            <a-input v-else v-model="nickName" autoFocus class="edit-input" @blur="saveNick" />
                            <p class="counter-list-text fw-5 mb-0"><span class="">
                                <svg  height="14px"  width="14px" class="svg-icon mb-1 mr-1"  alt="tick">
                            <use :xlink:href="$userinfo.email ? '/images/svg/sprite.svg#green-dot-tick-icon' : '/images/svg/sprite.svg#red-cross-icon'"></use>
                            </svg> {{ $t('pinfo.pin3') }} </span>
                                <span class="pl-3">
                                    <svg  height="14px"  width="14px" class="svg-icon mb-1 mr-1"  alt="tick">
                            <use :xlink:href="$userinfo.phone ? '/images/svg/sprite.svg#green-dot-tick-icon' : '/images/svg/sprite.svg#red-cross-icon'"></use>
                            </svg>SMS
                                </span>
                                <span class="pl-3">
                                    <svg  height="14px"  width="14px" class="svg-icon mb-1 mr-1"  alt="tick">
                            <use :xlink:href="$userinfo.securitylevel > 1 ? '/images/svg/sprite.svg#green-dot-tick-icon' : '/images/svg/sprite.svg#red-cross-icon'"></use>
                            </svg>{{ $t('pinfo.pin4') }}</span>
                            </p>
                        </a-col>

                    </a-row>
                </a-col>
                <a-col :lg="24" :xl="13">
                    <a-row :gutter="16" class="profile-row">
                        <a-col :lg="12" :xl="16" class="pl-5 right-profile">
                            <p class="estimated-txt fw-5 mb-2">{{ $t('pinfo.pin5') }}
                                    <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="toggleFundVisible">
                                    <use :xlink:href="$usersettings.moreconfig?.fundsvisible  ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
                                
                                
                                </p>

                            <p class="user-name fw-5 mb-0">{{ $usersettings.moreconfig?.fundsvisible ? totalAssets : '*****' }}
                                BTC<span class="estimated-txt fw-5"> ≈
                                    {{ $usersettings.moreconfig?.fundsvisible ? allTransition : '*****' }}
                                    {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}</span></p>
                        </a-col>
                        <a-col :lg="12" :xl="8" align="end">
                            <a-button class="outline-btn fw-5 mt-1 mr-2" v-if="!$usersettings.moreconfig?.applyadv"
                                @click="becomeMerchant">{{ $t('person.be_merchant') }}</a-button>
                            <nuxt-link to="/p2p/post-new-add" v-else> <a-button class="outline-btn fw-5 mt-1  px-4">{{
                                $t('person.post_ad') }}</a-button></nuxt-link>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-card>
        <a-row :gutter="16" class="mt-3">
            <a-col :lg="24" :xl="17">
                <a-card :bordered="false">
                    <a-row class="mb-5 mt-4">
                        <a-col :lg="8">
                            <a-card class="trades-card" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p10') }} <a-popover overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('pinfo.pin6') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.alltrades }} {{ $t('p2p.p2p11') }}</p>
                            </a-card>
                        </a-col>
                        <a-col :lg="8">
                            <a-card class="trades-card" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('pinfo.pin7') }} <a-popover
                                        overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('pinfo.pin8') }}
                                            </p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.approxvolume_thirtydays }}</p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt">{{ $t('pinfo.pin9') }} {{
                                    counterParty?.approxvolume_buy_total }} </span>/ <span class="trade-sell-txt">{{
        $t('pinfo.pin10') }}
                                        {{ counterParty?.approxvolume_sell_total }}</span></p>
                            </a-card>
                        </a-col>
                        <a-col :lg="8">
                            <a-card class="trades-card trades-card-border" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p12') }} <a-popover overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('pinfo.pin11') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.trades_thirtydays }} {{ $t('p2p.p2p11') }}</p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt"></span><span
                                        class="trade-sell-txt"></span></p>
                            </a-card>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :lg="8">
                            <a-card class="trades-card" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p14') }} <a-popover overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('pinfo.pin12') }}</p>

                                        </template>
                                        <img src="/images/info-circle.svg" />
                                    </a-popover></p>
                                <p class="mb-0 trades-desc1 fw-5">{{ counterParty?.avgreleasetime }} {{ $t('p2p.p2p15') }}</p>
                                <p class="mb-0 trades-buy-list fw-5"><span class="trade-buy-txt"></span> <span
                                        class="trade-sell-txt">
                                    </span></p>
                            </a-card>
                        </a-col>
                        <a-col :lg="8">
                            <a-card class="trades-card" :bordered="false">
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p16') }} <a-popover overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('pinfo.pin13') }}</p>

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
                                <p class="trades-title1 fw-5">{{ $t('p2p.p2p13') }} <a-popover overlay-class-name="info-popover">
                                        <template slot="content">
                                            <p class="info-desc-txt fw-5 mb-0">{{ $t('pinfo.pin14') }}</p>

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
        <a-row :gutter="16">
            <a-col :lg="24">
                <ProfileTabs :getname="getname" />
            </a-col>
        </a-row>
        <UserProfileSharing :profileSharing="profileSharing" v-if="profileSharing" :close="close"
            :counterParty="counterParty" />
    </div>
</template>

<script>
import UserProfileSharing from '@/components/p2p/Modals/UserProfileSharing.vue'
import ProfileTabs from './ProfileTabs.vue'
export default {
    components: {
        ProfileTabs,
        UserProfileSharing,
    },
    computed: {
        totalAssets: function () {
            const _this = this;
            let allbtc = 0;
            this.currencyData.forEach((item) => {
                allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.totalamount)
                allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.lockamount)
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
            currencyData: [],
            counterParty: null,
            loading: true,
            profileSharing: false,
            edit: false,
            nickName: '',
        }
    },
    methods: {
        toggleFundVisible() {
            const _self = this;
            _self.$store.dispatch('user_user_settings_save', {
                moreConfig: {
                    fundsVisible: !_self.$usersettings.moreconfig.fundsvisible
                },
            }).then(({
                data
            }) => {
                if (data) {
                    this.global_refresh_user_settings();
                }
            })
        },
        saveNick() {
            const _self = this;
            if (this.$userinfo.nickname == this.nickName) {
                _self.edit = false;
                return;
            }
            if (_self.edit) {
                _self.$store.dispatch('user_user_nickname_save', {
                    nickName: this.nickName,
                }).then(({
                    data
                }) => {
                    if (data) {
                        _self.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt26') });
                        _self.edit = false;
                        _self.nickChange = false;
                        this.global_refresh_user_info();

                    }
                })
            }
        },

        close() {
            this.profileSharing = false
        },
        getname(val) {
            return val ? val.substring(0, 1) : '--'
        },
        getWalletInfo() {
            const _self = this;
            _self.$store.dispatch('trading_user_c2c_userc2cassets_get', {}).then(({
                data
            }) => {
                if (data) {
                    this.currencyData = data;
                }
                this.loading = false;
            })
        },
        becomeMerchant() {
            this.$router.push('/p2p/merchant')
        },
        async getCounterPartyInfo() {
            const _self = this;
            try {
                const { data } = await _self.$store.dispatch('trading_statistics_p2p', {
                    toUid: this.$userinfo.uid
                });
                if (data) {
                    _self.counterParty = data;
                }
                _self.loading = false;
            } catch (error) {
                //console.log('Error', error);
            }
        },
    },
    mounted() {
        this.getCounterPartyInfo();
        this.getWalletInfo();
        this.nickName = this.$userinfo.nickname;
    }
}
</script>

<style lang="scss" scoped>
.photo {
    display: inline-block;
    border-radius: 200px;
    text-align: center;
    width: 39px;
    height: 39px;
    line-height: 36px;
    vertical-align: middle;
    margin-right: 0px;
    color: #ffffff;
    position: relative;
    img {
        object-fit: cover;
    }
}

.photo:after {
    content: '';
    display: inline-block;
    width: 8px;
    position: absolute;
    height: 8px;
    border-radius: 50%;
    background-color: #DDDDDD;
    background-clip: content-box;
    border: 2px solid #ffffff;
    bottom: 0;
    right: 0;
}

.photo.online:after {
    background-color: #0ED12A;
}

input.edit-input.ant-input {
    height: 30px;
    background-color: #fff;
    padding: 8px;
    width: 220px;
}</style>
