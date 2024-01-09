<template>
    <div class="center-content">
        <AppLoading v-if="loadingGameRoomInfo" backgroundColor="#191919" />
        <a-card class="center-card" v-else>
            <a-row :gutter="16">
                <a-col :lg="8">
                    <a-row :gutter="16" class="mb-2">
                        <a-col :lg="10">
                            <p class="mb-0 block-sec-txt fw-4">{{ $t('play_game.pg8') }} </p>
                        </a-col>
                        <a-col :lg="14" class="pl-0">
                            <p class="mb-0 block-sec-txt fw-4"><span class="text-white">{{ selectedGame.periods }}</span> <img
                                    src="/images/pl-share.svg" class="pl-3 pr-2 pointer" /> {{ $t('play_game.pg26')
                                    }}
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="mb-2">
                        <a-col :lg="10">
                            <p class="mb-0 block-sec-txt fw-4">{{ $t('play_game.pg12') }}</p>
                        </a-col>
                        <a-col :lg="14" class="pl-0">

                            <a-row :gutter="16">
                                <a-col :lg="17">
                                    <p class="mb-0 text-white" id="keycopyf">
                                        {{ selectedRoom?.id }}
                                    </p>
                                </a-col>
                                <a-col :lg="7" >
                                    <AppClipboard target="#keycopyf" element-class="link-url1" />
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :lg="10">
                            <p class="mb-0 block-sec-txt fw-4">{{ $t('play_game.pg13') }} </p>
                        </a-col>
                        <a-col :lg="14" class="pl-0">
                            <a-row :gutter="16">
                                <a-col :lg="17">
                                    <p class="mb-0 text-white" id="keycopy">
                                        {{ $userinfo.uid ? $userinfo.uid : '' }}
                                    </p>
                                </a-col>
                                <a-col :lg="7">
                                    <AppClipboard target="#keycopy" element-class="link-url1" />
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="8">
                    <p class="text-center start-txt fw-5 mt-2 pt-1"
                        :style="`color:${selectedGame.status == 0 ? '#70FF00' : selectedGame.status == 4 ? 'orange' : 'red'}`">
                        {{ selectedGame.status == 0 ? $t('play_game.pg9') : selectedGame.status == 4 ? $t('play_game.pg11')
                            :
                            $t('play_game.pg10') }}</p>
                </a-col>
                <a-col :lg="8" align="end">
                    <p class="mb-2 block-sec-txt fw-4"> {{ $t('play_game.pg15') }} #<span class="text-white pl-2">{{
                        getGameRoomInfo?.roomnum }}</span></p>
                    <p class="mb-0 block-sec-txt fw-4"> {{ $t('play_game.pg16') }} #<span class="text-white pl-2">{{
                        selectedRoom?.playnum }}</span></p>
                </a-col>
            </a-row>
            <a-row :gutter="24" class="col-alignment">
                <a-col :lg="8" class="pr-4">
                    <div class="play-card-box">
                        <div class="box-bg" :class="selectedGame.status == 4 ? '' : 'betting_false'">
                            <a-tag v-if="selectedGame.status == 4"
                                :class="first.betting.profit >= 0 || first.betting.status ? 'ant-tag-profit' : 'ant-tag-loss'"><img
                                    src="/images/dollar.svg" class="pr-1" />
                                {{ selectedGame.status == 4 ? first.betting.profit : '0' }} USDT</a-tag>
                        </div>
                        <div class="card-box" v-if="selectedGame.status >= 3 && getGameRoomInfo.cardinfo != null">
                            <div class="first-card">
                                <img :src="first?.cardImages[0]" height="100" />
                            </div>
                            <div class="first-card">
                                <img :src="first?.cardImages[1]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="first?.cardImages[2]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="first?.cardImages[3]" height="100" />

                            </div>
                            <div class="first-card last-card">
                                <img :src="first?.cardImages[4]" height="100" />
                            </div>
                        </div>
                        <div class="card-txt" v-if="selectedGame.status == 4">
                            <p class="mb-0 gold-bull fw-4 text-center">{{ first?.bullText }}<span
                                    :class="first.betting.profit >= 0 || first.betting.status ? 'green-active-color' : 'red-active-color'">{{
                                        first.bullText1 }}</span></p>
                        </div>
                        <div class="gray-card-box">
                            <div class="gold-bull-img">
                                <img src="/images/gray-box.svg" width="100%" />
                                <div class="gold-card-data">
                                    <a-row :gutter="16">
                                        <a-col :lg="8">
                                            <img src="/images/join-user.svg" />
                                        </a-col>
                                        <a-col :lg="16" class="pl-3">
                                            <div class="user-content">
                                                <p class="user-num fw-6 mb-1"><img src="/images/pl-user.svg"
                                                        class="pr-3" />{{ first?.betting.num ? first.betting.num : '0' }}
                                                </p>
                                                <p class="user-num fw-6 mb-0"><img src="/images/coin.svg"
                                                        class="pr-3" />{{ first?.betting.amount ? first.betting.amount :
                                                            '0' }} USDT</p>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                            </div>
                        </div>
                        <div class="content-btn text-center pt-2" v-if="selectedGame.status == 0">
                            <a class="join-btn" @click="joinRoom(2)">{{ $userinfo.uid ? $t('play_game.pg19') : 'Login' }}
                            </a>
                        </div>
                    </div>
                </a-col>
                <a-col :lg="8" class="px-2" align="center">
                    <div class="play-card-box">
                        <div :class="selectedGame.status == 4 ? 'box-bg' : 'pt-5'">
                            <a-tag v-if="selectedGame.status == 4"
                                :class="boss.betting.profit > 0 ? 'ant-tag-profit' : 'ant-tag-loss'"><img
                                    src="/images/dollar.svg" class="pr-1" />
                                {{ selectedGame.status == 4 ? boss.betting.profit : '0' }} USDT</a-tag>
                        </div>
                        <div class="card-box" v-if="selectedGame.status >= 3 && getGameRoomInfo.cardinfo != null">
                            <div class="first-card">
                                <img :src="boss?.cardImages[0]" height="100" />
                            </div>
                            <div class="first-card">
                                <img :src="boss?.cardImages[1]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="boss?.cardImages[2]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="boss?.cardImages[3]" height="100" />

                            </div>
                            <div class="first-card last-card">
                                <img :src="boss?.cardImages[4]" height="100" />
                            </div>
                        </div>
                        <div class="card-txt" v-if="selectedGame.status == 4">
                            <p class="mb-0 gold-bull fw-4 text-center">{{ boss?.bullText }}<span
                                    :class="boss.betting.profit >= 0 ? 'green-active-color' : 'red-active-color'">{{
                                        boss.bullText1 }}</span></p>
                        </div>
                        <div class="gray-card-box">
                            <div class="gold-bull-img">
                                <img src="/images/gray-box.svg" width="100%" />
                                <div class="gold-card-data">
                                    <a-row :gutter="16" class="col-alignment">
                                        <a-col :lg="7">
                                            <img src="/images/user-join1.svg" />
                                        </a-col>
                                        <a-col :lg="17" align="start">
                                            <a-row>
                                                <div class="nickname-box">
                                                    <a-col :lg="12" class="pl-1">
                                                        <!-- <p class="user-num fw-6 nickname mb-1">{{ $t('play_game.pg12') }}:</p> -->
                                                        <p class="user-num fw-6 nickname mb-1">{{ $t('play_game.pg17') }}:</p>
                                                        <p class="user-num fw-6 nickname mb-1">{{ $t('play_game.pg18') }}:</p>

                                                    </a-col>
                                                    <a-col :lg="12">
                                                        <p class="user-num fw-6 mb-1">{{ boss.roominfo.nickname }}</p>
                                                        <p class="user-num fw-6 mb-1">{{ boss?.betting.amount ?
                                                            boss.betting.amount : '0' }} USDT</p>
                                                    </a-col>
                                                </div>
                                            </a-row>
                                        </a-col>
                                    </a-row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="timer-box text-center" v-if="selectedGame.status != 4">
                        <p class="game-seccion fw-4 pt-5">{{ selectedGame.status == 0 ? $t('game.game4') :
                            $t('game.game5') }}
                        </p>
                        <a-row class="px-5 col-alignment">
                            <a-col :lg="10">
                                <p class="game-rules-txt fw-5 mb-0">{{ selectedGameRemainingTime.minutes }}</p>
                                <p class="user-num fw-6 nickname mb-0">Min</p>
                            </a-col>
                            <a-col :lg="4"> <a-divider type="vertical" class="timer-divider" /></a-col>
                            <a-col :lg="10">
                                <p class="game-rules-txt fw-5 mb-0">{{ selectedGameRemainingTime.seconds }}</p>
                                <p class="user-num fw-6 nickname mb-0">Sec</p>
                            </a-col>
                        </a-row>
                    </div>
                    <div class="play-card-box">
                        <div class="box-bg" :class="selectedGame.status == 4 ? '' : 'betting_false'">
                            <a-tag v-if="selectedGame.status == 4"
                                :class="third.betting.profit >= 0 || third.betting.status ? 'ant-tag-profit' : 'ant-tag-loss'"><img
                                    src="/images/dollar.svg" class="pr-1" /> {{ selectedGame.status == 4 ?
                                        third.betting.profit : '0' }} USDT</a-tag>
                        </div>
                        <div class="card-box" v-if="selectedGame.status >= 3 && getGameRoomInfo.cardinfo != null">
                            <div class="first-card">
                                <img :src="third?.cardImages[0]" height="100" />
                            </div>
                            <div class="first-card">
                                <img :src="third?.cardImages[1]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="third?.cardImages[2]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="third?.cardImages[3]" height="100" />

                            </div>
                            <div class="first-card last-card">
                                <img :src="third?.cardImages[4]" height="100" />

                            </div>

                        </div>
                        <div class="card-txt" v-if="selectedGame.status == 4">
                            <p class="mb-0 gold-bull fw-4 text-center">{{ third?.bullText }}<span
                                    :class="third.betting.profit >= 0 || third.betting.status ? 'green-active-color' : 'red-active-color'">{{
                                        third.bullText1 }}</span></p>
                        </div>
                        <div class="gray-card-box">
                            <div class="gold-bull-img">
                                <img src="/images/gray-box.svg" width="100%" />
                                <div class="gold-card-data">
                                    <a-row :gutter="16">
                                        <a-col :lg="8">
                                            <img src="/images/join-user4.svg" />
                                        </a-col>
                                        <a-col :lg="16" align="start">
                                            <div class="user-content">
                                                <p class="user-num fw-6 mb-1"><img src="/images/pl-user.svg"
                                                        class="pr-3" />{{ third?.betting.num ? third.betting.num : '0' }}
                                                </p>
                                                <p class="user-num fw-6 mb-0"><img src="/images/coin.svg"
                                                        class="pr-3" />{{ third?.betting.amount ? third.betting.amount :
                                                            '0' }} USDT</p>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                            </div>
                        </div>
                        <div class="content-btn text-center pt-2" v-if="selectedGame.status == 0">
                            <a class="join-btn" @click="joinRoom(4)">{{ $userinfo.uid ? $t('play_game.pg19') : 'Login' }}
                            </a>
                        </div>
                    </div>
                </a-col>
                <a-col :lg="8" class="pl-4">
                    <div class="play-card-box">
                        <div class="box-bg" :class="selectedGame.status == 4 ? '' : 'betting_false'">
                            <a-tag v-if="selectedGame.status == 4"
                                :class="second.betting.profit >= 0 || second.betting.status ? 'ant-tag-profit' : 'ant-tag-loss'"><img
                                    src="/images/dollar.svg" class="pr-1" />
                                {{ selectedGame.status == 4 ? second.betting.profit : '0' }} USDT</a-tag>
                        </div>
                        <div class="card-box" v-if="selectedGame.status >= 3 && getGameRoomInfo.cardinfo != null">
                            <div class="first-card">
                                <img :src="second?.cardImages[0]" height="100" />
                            </div>
                            <div class="first-card">
                                <img :src="second?.cardImages[1]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="second?.cardImages[2]" height="100" />

                            </div>
                            <div class="first-card">
                                <img :src="second?.cardImages[3]" height="100" />

                            </div>
                            <div class="first-card last-card">
                                <img :src="second?.cardImages[4]" height="100" />
                            </div>

                        </div>
                        <div class="card-txt" v-if="selectedGame.status == 4">
                            <p class="mb-0 gold-bull fw-4 text-center">{{ second?.bullText }}<span
                                    :class="second.betting.profit >= 0 || second.betting.status ? 'green-active-color' : 'red-active-color'">{{
                                        second.bullText1 }}</span></p>
                        </div>
                        <div class="gray-card-box">
                            <div class="gold-bull-img">
                                <img src="/images/gray-box.svg" width="100%" />
                                <div class="gold-card-data">
                                    <a-row :gutter="16">
                                        <a-col :lg="8">
                                            <img src="/images/join-user2.svg" />
                                        </a-col>
                                        <a-col :lg="16" class="pl-3">
                                            <div class="user-content">
                                                <p class="user-num fw-6 mb-1"><img src="/images/pl-user.svg"
                                                        class="pr-3" />{{ second?.betting.num ? second.betting.num : '0' }}
                                                </p>
                                                <p class="user-num fw-6 mb-0"><img src="/images/coin.svg"
                                                        class="pr-3" />{{ second?.betting.amount ? second.betting.amount :
                                                            '0' }} USDT</p>

                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                            </div>
                        </div>
                        <div class="content-btn text-center pt-2" v-if="selectedGame.status == 0">
                            <a class="join-btn" @click="joinRoom(3)">{{ $userinfo.uid ? $t('play_game.pg19') : 'Login' }}
                            </a>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </a-card>
        <div class="mt-2 pt-1">
            <a-card class="left-card center-card-table bottom-table-card">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" :tab="$t('play_game.pg27')">
                        <a-row class="px-2">
                            <a-col :lg="24" class="table-data" v-if="$userinfo.uid">
                                <a-table :columns="openCloseRoomColumns" :data-source="getOpenBetting" :pagination="false"
                                    class="center-table" :rowKey="(record, index) => index">
                                </a-table>
                                <!-- pagination -->
                                <div v-if="openPagination.totalItemCount > 0">
                                    <a-row class="mt-4 pr-2 ">
                                        <a-col :lg="24" align="end">
                                            <a-pagination size="small" :page-size="openPagination.pageSize" showLessItems
                                                :current="openPagination.currentPageIndex"
                                                :total="openPagination.totalItemCount" @change="openPaginationpageChange" />
                                        </a-col>
                                    </a-row>
                                </div>
                                <!-- pagination ended  -->
                            </a-col>
                            <a-col :lg="24" v-else align="center" class="pt-4 my-5">
                                <p class="mb-0 login-user"> <nuxt-link to="/login">{{ $t('home.headLogin') }} </nuxt-link> /
                                    <nuxt-link to="/register"> {{ $t('home.headRegister') }}</nuxt-link>
                                </p>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                    <a-tab-pane key="2" :tab="$t('play_game.pg28')">
                        <a-row class="px-2">
                            <a-col :lg="24" class="table-data" v-if="$userinfo.uid">
                                <a-table :columns="openCloseRoomColumns" :data-source="getHistoryBetting"
                                    :pagination="false" class="center-table" :rowKey="(record, index) => index">
                                </a-table>
                                <!-- pagination -->
                                <div v-if="openPagination.totalItemCount > 0">
                                    <a-row class="mt-4 pr-2 ">
                                        <a-col :lg="24" align="end">
                                            <a-pagination size="small" :page-size="historyPagination.pageSize" showLessItems
                                                :current="historyPagination.currentPageIndex"
                                                :total="historyPagination.totalItemCount"
                                                @change="historyPaginationpageChange" />
                                        </a-col>
                                    </a-row>
                                </div>
                                <!-- pagination ended  -->
                            </a-col>
                            <a-col :lg="24" v-else align="center" class="pt-4 my-5">
                                <p class="mb-0 login-user"> <nuxt-link to="/login">{{ $t('home.headLogin') }} </nuxt-link> /
                                    <nuxt-link to="/register"> {{ $t('home.headRegister') }}</nuxt-link>
                                </p>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                    <a-tab-pane key="3" :tab="$t('play_game.pg29')">
                        <a-row class="px-2">
                            <a-col :lg="24" class="table-data" v-if="$userinfo.uid">
                                <HistoryTable :historyColumns="billingRoomColumns" :historyData="billingDetail"
                                    class="center-table">
                                    <template #currency="{ row }"><img :src="getCurrencyIcon(row)" width="15" height="15"
                                            class="mr-2" />{{
                                                global_get_uppercase(row.currencyname) }}</template>
                                    <template #assetBefore="{ row }">{{ global_get_tofixed(row.amountbefore,
                                        global_get_decimal(row.currencyname).a) }}</template>
                                    <template #quantity="{ row }">{{ global_get_tofixed(row.amount,
                                        global_get_decimal(row.currencyname).a) }}</template>
                                    <template #assetAfter="{ row }">{{ global_get_tofixed(row.amountafter,
                                        global_get_decimal(row.currencyname).a) }}</template>
                                    <template #createTime="{ row }"><span class="last-create-time">{{ getRecordTime(row)
                                    }}</span> </template>
                                </HistoryTable>
                                <!-- pagination -->
                                <div v-if="openPagination.totalItemCount > 0">
                                    <a-row class="mt-4 pr-2 ">
                                        <a-col :lg="24" align="end">
                                            <a-pagination size="small" :page-size="billingPagination.pageSize" showLessItems
                                                :current="billingPagination.currentPageIndex"
                                                :total="billingPagination.totalItemCount"
                                                @change="billingPaginationpageChange" />
                                        </a-col>
                                    </a-row>
                                </div>
                                <!-- pagination ended  -->
                            </a-col>
                            <a-col :lg="24" v-else align="center" class="pt-4 my-5">
                                <p class="mb-0 login-user"> <nuxt-link to="/login">{{ $t('home.headLogin') }} </nuxt-link> /
                                    <nuxt-link to="/register"> {{ $t('home.headRegister') }}</nuxt-link>
                                </p>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                </a-tabs>

            </a-card>
        </div>
    </div>
</template>

<script>
import AppLoading from '../AppLoading.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Clipboard from 'clipboard';
import HistoryTable from '@/components/person/WalletHistory/HistoryTable.vue'
import AppClipboard from '~/components/App/AppClipboard.vue';

export default {

    components: {
        AppLoading,
        HistoryTable,
        AppClipboard
    },
    props: {
        selectedRoom: {
            type: Object,
            default: () => { }
        },
        selectedGame: {
            type: Object,
            default: () => { }
        },
        changeOpenRoom: {
            type: Function
        },
        selectedGameRemainingTime: {
            type: Object,
            default: () => { }
        }
    },
    mounted() {
        this.billingPaginationpageChange(1)
    },

    computed: {
        ...mapGetters("general", ["loadingGameRoomInfo",]),
        ...mapGetters("playcard", ["getGameRoomInfo", "getOpenBetting", "getHistoryBetting", "billingPagination", "historyPagination", "openPagination", "openPagination", "billingPagination"]),
        boss() {
            if (Object.keys(this.getGameRoomInfo).length > 0 && this.getGameRoomInfo.constructor === Object) {
                let object = {}
                object.roominfo = this.getGameRoomInfo.roominfo;
                object.betting = this.getGameRoomInfo.tabletinfos.find(item => item.who == 1);
                if (typeof object.betting == 'undefined') {
                    object.betting = {
                        profit: 0,
                        num: 0,
                        amount: 0
                    }
                }
                if (this.getGameRoomInfo.cardinfo != null) {
                    let cardsinfo = this.getGameRoomInfo.cardinfo.find((card) => card.who == 1)
                    object.cards = cardsinfo.cards
                    object.bullText = ''
                    object.bullText1 = ''
                    if (cardsinfo.weight >= 1 && cardsinfo.weight <= 7) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 1X'
                    }
                    else if (cardsinfo.weight == 8) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 2X'
                    }
                    else if (cardsinfo.weight == 9) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 3X'
                    }
                    else if (cardsinfo.weight == 10) {
                        object.bullText = 'Silver Bull ' + cardsinfo.weight
                        object.bullText1 = ' 4X'
                    }
                    else if (cardsinfo.weight == 100) {
                        object.bullText = 'Gold Bull ' + cardsinfo.weight
                        object.bullText1 = ' 5X'
                    }
                    else {
                        object.bullText = 'No Bull '
                        object.bullText1 = '1X'

                    }
                    object.cardImages = object.cards.map((card) => {
                        let image = 'https://images.bitnasdaq.io/playcard/' + String(card.color) + "_" + String(card.dot) + '.svg'
                        return image;
                    })
                }
                return object;
            }
            else return {}

        },
        first() {
            if (Object.keys(this.getGameRoomInfo).length > 0 && this.getGameRoomInfo.constructor === Object) {
                let object = {}
                object.betting = this.getGameRoomInfo.tabletinfos.find(item => item.who == 2);
                if (typeof object.betting == 'undefined') {
                    object.betting = {
                        profit: 0,
                        num: 0,
                        amount: 0
                    }
                }
                else {
                    if (object.betting.profit == 0) {
                        if (parseInt(object.betting.num) > parseInt(this.boss.betting.num)) {
                            object.betting.status = 1
                        }
                    }
                }

                if (this.getGameRoomInfo.cardinfo != null) {
                    let cardsinfo = this.getGameRoomInfo.cardinfo.find((card) => card.who == 2)
                    object.cards = cardsinfo.cards
                    object.bullText = ''
                    object.bullText1 = ''
                    if (cardsinfo.weight >= 1 && cardsinfo.weight <= 7) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 1X'
                    }
                    else if (cardsinfo.weight == 8) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 2X'
                    }
                    else if (cardsinfo.weight == 9) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 3X'
                    }
                    else if (cardsinfo.weight == 10) {
                        object.bullText = 'Silver Bull ' + cardsinfo.weight
                        object.bullText1 = ' 4X'
                    }
                    else if (cardsinfo.weight == 100) {
                        object.bullText = 'Gold Bull ' + cardsinfo.weight
                        object.bullText1 = ' 5X'
                    }
                    else {
                        object.bullText = 'No Bull '
                        object.bullText1 = '1X'

                    }
                    object.cardImages = object.cards.map((card) => {
                        let image = 'https://images.bitnasdaq.io/playcard/' + String(card.color) + "_" + String(card.dot) + '.svg'
                        return image;
                    })
                }

                return object;
            }
            else return {}
        },
        second() {
            if (Object.keys(this.getGameRoomInfo).length > 0 && this.getGameRoomInfo.constructor === Object) {
                let object = {}
                object.betting = this.getGameRoomInfo.tabletinfos.find(item => item.who == 3);
                if (typeof object.betting == 'undefined') {
                    object.betting = {
                        profit: 0,
                        num: 0,
                        amount: 0
                    }
                }
                else {
                    if (object.betting.profit == 0) {
                        if (parseInt(object.betting.num) > parseInt(this.boss.betting.num)) {
                            object.betting.status = 1
                        }
                    }
                }
                if (this.getGameRoomInfo.cardinfo != null) {
                    let cardsinfo = this.getGameRoomInfo.cardinfo.find((card) => card.who == 3)
                    object.cards = cardsinfo.cards
                    object.bullText = ''
                    object.bullText1 = ''
                    if (cardsinfo.weight >= 1 && cardsinfo.weight <= 7) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 1X'
                    }
                    else if (cardsinfo.weight == 8) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 2X'
                    }
                    else if (cardsinfo.weight == 9) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 3X'
                    }
                    else if (cardsinfo.weight == 10) {
                        object.bullText = 'Silver Bull ' + cardsinfo.weight
                        object.bullText1 = ' 4X'
                    }
                    else if (cardsinfo.weight == 100) {
                        object.bullText = 'Gold Bull ' + cardsinfo.weight
                        object.bullText1 = ' 5X'
                    }
                    else {
                        object.bullText = 'No Bull '
                        object.bullText1 = '1X'

                    }
                    object.cardImages = object.cards.map((card) => {
                        let image = 'https://images.bitnasdaq.io/playcard/' + String(card.color) + "_" + String(card.dot) + '.svg'
                        return image;
                    })
                }
                return object;
            }
            else return {}
        },
        third() {
            if (Object.keys(this.getGameRoomInfo).length > 0 && this.getGameRoomInfo.constructor === Object) {
                //console.log("Hello")
                let object = {}
                object.betting = this.getGameRoomInfo.tabletinfos.find(item => item.who == 4);
                if (typeof object.betting == 'undefined') {
                    object.betting = {
                        profit: 0,
                        num: 0,
                        amount: 0
                    }
                }
                else {
                    //console.log(object.betting.num, parseInt(this.boss.betting.num), "Nisar")
                    if (object.betting.profit == 0) {
                        if (parseInt(object.betting.num) > parseInt(this.boss.betting.num)) {
                            object.betting.status = 1
                        }
                    }
                }
                if (this.getGameRoomInfo.cardinfo != null) {
                    let cardsinfo = this.getGameRoomInfo.cardinfo.find((card) => card.who == 4)
                    object.cards = cardsinfo.cards
                    object.bullText = ''
                    object.bullText1 = ''
                    if (cardsinfo.weight >= 1 && cardsinfo.weight <= 7) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 1X'
                    }
                    else if (cardsinfo.weight == 8) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 2X'
                    }
                    else if (cardsinfo.weight == 9) {
                        object.bullText = 'Bull ' + cardsinfo.weight
                        object.bullText1 = ' 3X'
                    }
                    else if (cardsinfo.weight == 10) {
                        object.bullText = 'Silver Bull ' + cardsinfo.weight
                        object.bullText1 = ' 4X'
                    }
                    else if (cardsinfo.weight == 100) {
                        object.bullText = 'Gold Bull ' + cardsinfo.weight
                        object.bullText1 = ' 5X'
                    }
                    else {
                        object.bullText = 'No Bull '
                        object.bullText1 = '1X'

                    }
                    object.cardImages = object.cards.map((card) => {
                        let image = 'https://images.bitnasdaq.io/playcard/' + String(card.color) + "_" + String(card.dot) + '.svg'
                        return image;
                    })
                }
                return object;
            }
            else return {}
        },
    },

    data() {
        return {
            billingDetail: [],
            openCloseRoomColumns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                },
                {
                    title: this.$t('play_game.pg20'),
                    dataIndex: 'gameid',

                },
                {
                    title: this.$t('play_game.pg12'),
                    dataIndex: 'roomid',
                },
                {
                    title: this.$t('play_game.pg21'),
                    dataIndex: 'tablet',

                },
                {
                    title: this.$t('play_game.pg22'),
                    dataIndex: 'amount',

                },
                {
                    title: this.$t('play_game.pg23'),
                    dataIndex: 'profit',

                },
                {
                    title: this.$t('play_game.pg24'),
                    dataIndex: 'status',

                },
                {
                    title: this.$t('play_game.pg25'),
                    dataIndex: 'createtime',

                }

            ],
            billingRoomColumns: [
                {
                    title: this.$t("tableskeys.it1"),
                    dataIndex: 'currency',
                    key: 'currency',
                    scopedSlots: { customRender: 'currency' },
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.wa1"),
                    dataIndex: 'typename',
                    key: 'typename',
                    width: 180,
                },

                {
                    title: this.$t("tableskeys.wa2"),
                    dataIndex: 'assetBefore',
                    key: 'assetBefore',
                    scopedSlots: { customRender: 'assetBefore' },
                    width: 110,
                },
                {
                    title: this.$t("tableskeys.wa3"),
                    dataIndex: 'quantity',
                    key: 'quantity',
                    scopedSlots: { customRender: 'quantity' },
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.wa4"),
                    dataIndex: 'assetsAfter',
                    key: 'assetsAfter',
                    scopedSlots: { customRender: 'assetAfter' },
                    width: 110,
                },
                {
                    title: this.$t("tableskeys.wa5"),
                    dataIndex: 'id',
                    key: 'id',
                    width: 120,
                },
                {
                    title: this.$t("tableskeys.wa6"),
                    dataIndex: 'createTime',
                    key: 'createTime',
                    scopedSlots: { customRender: 'createTime' },
                    width: 180,
                    align: 'end'
                },
            ],
            openRequestParam: {
                pageIndex: 1,
                pageSize: 10,
                status: 0,

            },
            historyRequestParam: {
                pageIndex: 1,
                pageSize: 10,
                status: 1
            },
            billingRequestParam: {
                pageIndex: 1,
                pageSize: 10,
                type: -4
            },
        }
    },
    methods: {
        ...mapActions('playcard', ['fetchOpenBetting', 'fetchHistoryBetting']),
        ...mapMutations('playcard', ['setBillingPagination']),
        getRecordTime: function (coinitem) {
            return (coinitem.updatetime && coinitem.status == 1) ? this.global_get_local_time(coinitem.updatetime).format('YYYY-MM-DD hh:mm a') : this.global_get_local_time(coinitem.createtime).format('YYYY-MM-DD hh:mm a')
        },
        getCurrencyIcon(item) {
            const icon = this.$store.state.currencyinfos.filter(_i => _i.currencyname == item.currencyname)[0].icon;
            return icon;
        },
        joinRoom(selectedSeat) {
            if (this.$userinfo.uid) {
                this.changeOpenRoom(false, selectedSeat)
            }
            else {
                this.$router.push('/login?returnurl=' + this.$route.path)
            }
        },
        fetchBillingDetail(requestData) {
            if (this.$userinfo.uid) {
                this.$store.dispatch('user_assets_record_getlist', requestData).then(({ data }) => {
                    let billing = []
                    if (data) {
                        billing = data.pagedata ? data.pagedata : []
                        const object = {
                            currentPageIndex: data.currentpageindex,
                            hasNextPage: data.hasnextpage,
                            hasPreviousPage: data.haspreviouspage,
                            pageSize: data.pagesize,
                            totalItemCount: data.totalitemcount,
                            totalPageCount: data.totalpagecount,
                        }
                        this.setBillingPagination(object)
                    }
                    this.billingDetail = billing

                })
            }
        },
        //PAGINATION FUNCTION
        openPaginationpageChange(val) {
            this.openRequestParam.pageIndex = val
            this.fetchOpenBetting(this.openRequestParam)
        },
        historyPaginationpageChange(val) {
            this.historyRequestParam.pageIndex = val
            this.fetchHistoryBetting(this.historyRequestParam)
        },
        billingPaginationpageChange(val) {
            this.billingRequestParam.pageIndex = val
            this.fetchBillingDetail(this.billingRequestParam)
        }



    }
}
</script>

<style scoped>
.betting_false {
    margin-top: -70px !important;
}
</style>
