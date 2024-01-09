<template>
    <div class="top-right">
        <a-card class="left-card right-card">
            <a-row :gutter="16">
                <a-col :lg="15">
                    <div class="room-card px-3">
                        <img src="/images/start-bate.svg" />
                        <p class="game-rom-txt fw-4 room-info-txt start-game mb-0">{{ $t('play_game.pg38') }}</p>
                    </div>
                </a-col>
                <a-col :lg="9">
                    <a-button class="common-btn transfer-btn px-2" @click="changeOpenRoom(true)"
                        :class="openRoom ? 'transfer-btn' : ''">{{ $t('play_game.pg39')
                        }}</a-button>
                </a-col>
            </a-row>
            <a-divider class="game-divider mb-2" />
            <a-row :gutter="16" class="px-3 mt-4">
                <a-col :lg="11">
                    <p class="game-seccion fw-4 mb-2">{{ $t('play_game.pg40') }}:</p>
                    <p class="game-seccion fw-4 mb-2">{{ $t('play_game.pg36') }}:</p>
                    <p class="game-seccion fw-4 mb-0" v-if="!openRoom">{{ $t('play_game.pg37') }}:</p>

                </a-col>
                <a-col :lg="13" align="end">
                    <p class="game-seccion fw-4 text-white mb-2">{{ selectedGame.periods }}</p>
                    <p class="game-seccion fw-4 text-white mb-2">{{ openRoom ? $userinfo.nickname : getGameRoomInfo.roominfo.id
                    }}
                    </p>
                    <div class="right-radiobtn" v-if="!openRoom">

                        <a-radio-group v-model="selectedSeatModel">

                            <a-radio-button :value="2">
                                A
                            </a-radio-button>
                            <a-radio-button :value="3">
                                B
                            </a-radio-button>
                            <a-radio-button :value="4">
                                C
                            </a-radio-button>
                        </a-radio-group>
                    </div>

                </a-col>
            </a-row>
            <div class="right-form px-3">
                <a-form-model :model="playCardForm" :hide-required-mark="true" label-align="left">
                    <a-row>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mt-4 mb-2" v-if="openRoom">
                            <a-form-model-item has-feedback prop="firstName" :colon="false">
                                <p class="info-label fw-4 mb-2">{{ $t('play_game.pg42') }}
                                    <a-tooltip placement="bottom" overlayClassName="play-info-tip">
                                        <template slot="title">
                                            <span>{{ $t('play_game.pg41') }}</span>
                                        </template>
                                        <img src="/images/info.svg" class="pl-1" /> </a-tooltip>
                                </p>


                                <a-select v-model="openTime" style="width: 100%"
                                    dropdownClassName="coin-play-drop">
                                    <a-icon type="caret-down" slot="suffixIcon" />
                                    <a-select-option value="5">
                                        5 Times
                                    </a-select-option>
                                    <a-select-option value="10">
                                        10 Times
                                    </a-select-option>
                                    <a-select-option value="15">
                                        15 Times
                                    </a-select-option>
                                    <a-select-option value="20">
                                        20 Times
                                    </a-select-option>
                                </a-select>

                                <!-- <a-input :placeholder="$t('play_game.pg25')">
                                    <span slot="prefix" class="text-white">
                                        5
                                    </span>
                                </a-input> -->
                            </a-form-model-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb-2" v-if="openRoom">
                            <a-form-model-item has-feedback :colon="false">

                                <a-select :open="open" v-model="currency" style="width: 100%"
                                    dropdownClassName="right-currency-list" ref="fiatSelect" v-on:select="setOpen(false)"
                                    @dropdownVisibleChange="onOpen" :loading="currencyinfos.length == 0"
                                    >
                                    <span class="more-txt fw-4" v-if="open" slot="suffixIcon"> <a-icon type="caret-up" /></span>
                                    <span v-else class="more-txt fw-4" slot="suffixIcon" v-on:click="setOpen(true)"><a-icon
                                            type="caret-down" /></span>

                                    <div slot="dropdownRender" slot-scope="menu">
                                        <div style="padding: 4px 8px; cursor: pointer;">
                                            <a-input v-if="open" :placeholder="$t('placeholders.plh5')" ref="fiatSearch"
                                                v-on:blur="setOpen(false)" v-model="searchValue" />
                                        </div>
                                        <v-nodes :vnodes="menu" />
                                    </div>
                                    <a-select-option v-for="(item, index) in currencyinfos" :key="index"
                                        v-if="filterFiatOptions(item?.currencyname.toLowerCase())">
                                        <img :src="item.icon" height="15" width="15" class="mr-1 mb-1" /> {{
                                            item.currencyname }}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mt-1">
                            <a-form-model-item has-feedback prop="firstName" :colon="false">
                                <a-row :gutter="16">
                                    <a-col :lg="11">
                                        <p class="info-label fw-4 mb-2">{{ $t('play_game.pg44') }}</p>

                                    </a-col>
                                    <a-col :lg="24" align="end">
                                        <p class="info-label fw-4 mb-2" v-if="!openRoom">Balance :<span class="text-white">{{
                                            bettingBalance }}
                                                {{ currencyinfos[currency]?.currencyname }} </span></p>

                                    </a-col>
                                </a-row>

                                <a-input
                                    :placeholder="'Max betting : ' + bettingBalance + ' ' + currencyinfos[currency]?.currencyname"
                                    v-model="amount" @change="validateAmount" />
                                    <span class="red-active" v-if="amountError">{{ amountError }}</span>

                            </a-form-model-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="end">
                            <p class="info-label fw-4 mb-3">{{ $t('play_game.pg45') }} : <span class="text-white">{{
                                availableBalance }} {{ currencyinfos[currency]?.currencyname }}</span>
                                <img src="/images/play-arrow-2.svg" class="pl-1" />
                            </p>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
                            v-if="openRoom || getGameRoomInfo.roominfo.password">
                            <a-form-model-item has-feedback prop="firstName" :colon="false">
                                <p class="info-label fw-4 mb-2">{{ $t('play_game.pg46') }}</p>
                                <a-input-password v-model="password" />

                            </a-form-model-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mt-2">
                            <a class="arrow" @click="confirmBetModel = true" :class="amount <= 0 ? 'disabled' : ''">{{ $userinfo.uid
                                && openRoom ? 'CreateRoom' : $userinfo.uid && !openRoom ? $t('play_game.pg18') : 'Login' }} </a>
                        </a-col>
                    </a-row>
                </a-form-model>
            </div>
        </a-card>
        <ConfirmationBet :confirmBetModel="confirmBetModel" :confirm="submit" :close="close" />

    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import ConfirmationBet from '../PlayCard/Modal/ConfirmationBet.vue'
import crypto from "@/plugins/axios/crypto"

export default {
    components: {
        ConfirmationBet,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
    },
    mounted() {
        this.currency = this.currencyinfos.findIndex(item => item.currencyname == 'USDT')
        this.getConstants()
    },
    props: {
        openRoom: {
            type: Boolean,
            default: true,
        },
        changeOpenRoom: {
            type: Function
        },
        selectedGame: {
            type: Object,
            default: () => { }
        },
        selectedSeat: {
            type: Number,
            default: 1
        },
        fetchOpenBettingMethod: {
            type: Function
        },
        fetchGameRoomMethod: {
            type: Function
        }
    },
    watch: {
        selectedSeat: function (val) {
            this.selectedSeatModel = val
        }
    },
    computed: {
        ...mapGetters("playcard", [ "getGameRoomInfo","getUserGameAssets"]),
        currencyinfos() {
            return this.$store.state.currencyinfos;
        },
        availableBalance() {
            if (this.getUserGameAssets.length > 0 && this.currency && this.currencyinfos.length > 0) {
                const available = this.getUserGameAssets.find(item => item.currencyid == this.currencyinfos[this.currency].id).available;
                return this.global_get_tofixed((available), this.global_get_decimal(this.currencyinfos[this.currency]?.currencyname).a)
            }
            else return 0
        },
        bettingBalance() {
            if (this.openRoom && this.currency && this.currencyinfos) {
                return this.global_get_tofixed((this.availableBalance), this.global_get_decimal(this.currencyinfos[this.currency]?.currencyname).a)
            }
            else {
                return this.global_get_tofixed(((this.availableBalance / 5)), this.global_get_decimal(this.currencyinfos[this.currency]?.currencyname).a)
            }
        }
    },

    data() {
        return {
            playCardForm: {},
            currency: null,
            open: false,
            searchValue: '',
            selectedSeatModel: 2,
            openTime: "5",
            amount: "",
            password: "",
            confirmBetModel: false,
            validationValue: {},
            amountError:false

        }
    },
    methods: {
validateAmount(){
    const currency=this.currencyinfos[this.currency].currencyname
if(this.openRoom){
    if(currency=='BTC'){
        if(this.amount<this.validationValue.btc_min){
            this.amountError=`Minimum Amount is ${this.validationValue.btc_min} ${currency}`
            return false;
        }
    }
    else if(currency=='USDT'){
        if(this.amount<this.validationValue.usdt_min){
            this.amountError=`Minimum Amount is ${this.validationValue.usdt_min} ${currency}`
            return false;
        }
    }
    else if(currency=='ETH'){
        if(this.amount<this.validationValue.eth_min){
            this.amountError=`Minimum Amount is ${this.validationValue.eth_min} ${currency}`
            return false;
        }
    }
}
else{
    if(currency=='BTC'){
        if(this.amount<this.validationValue.btc_player_min){
            this.amountError=`Minimum Amount is ${this.validationValue.btc_player_min} ${currency}`
            return false;
        }
    }
    else if(currency=='USDT'){
        if(this.amount<this.validationValue.usdt_player_min){
            this.amountError=`Minimum Amount is ${this.validationValue.usdt_player_min} ${currency}`
            return false;
        }
    }
    else if(currency=='ETH'){
        if(this.amount<this.validationValue.eth_player_min){
            this.amountError=`Minimum Amount is ${this.validationValue.eth_player_min} ${currency}`
            return false;
        }
    }
}
this.amountError=false
return true

},


        ...mapActions('playcard', ["submitBetCreate"]),
        getConstants() {
            const _self = this;
            this.$store.dispatch('com_constants_getconstantsinfo', { key: "game_setting" })
                .then(({ data }) => {
                        this.validationValue =eval('(' + data + ')');

                });
        },
        filterFiatOptions(str) {
            const _self = this;
            if (_self.searchValue !== '') {
                return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)
            }
            return true
        },
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
        onOpen() {
            this.open = true
            if (this.open == true) {
                setTimeout(() => {
                    this.$refs.fiatSearch?.focus()
                }, 100);
            }
        },
        submit() {
            if (this.$userinfo.uid) {
                const RequestData = {
                    gameID: this.selectedGame.id,
                    roomID: this.openRoom ? '0' : this.getGameRoomInfo.roominfo.id,
                    currencyID: this.currencyinfos[this.currency].id,
                    who: this.openRoom ? 1 : this.selectedSeatModel,
                    times: this.openRoom ? this.openTime : '0',
                    amount: this.amount,
                    password: crypto.md5String(this.password)
                }
                this.confirmBetModel = false
                this.submitBetCreate(RequestData).then(res => {
                    if (res.data) {
                        this.amount = '',
                            this.password = ''
                        this.fetchOpenBettingMethod()
                        this.fetchGameRoomMethod(this.selectedGame.id)
                    }
                })
            }
        },
        close() {
            this.confirmBetModel = false
        },
    },
}
</script>

<style></style>
