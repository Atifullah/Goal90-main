<template>
    <div class="top-left">
        <a-card class="left-card">
            <div class="room-card px-3">
                <img src="/images/gamerom.svg" />
                <p class="game-rom-txt fw-4 mb-0">{{ $t('play_game.pg30') }}</p>
            </div>
            <a-divider class="game-divider mb-2" />
            <a-row class="px-3 col-alignment">
                <a-col :lg="15">
                    <a-radio-group default-value="" v-model="currencyNameSearch">
                        <a-radio-button value="">
                            {{ $t('play_game.pg31') }}
                        </a-radio-button>
                        <a-radio-button value="USDT">
                            USDT
                        </a-radio-button>
                        <a-radio-button value="BTC">
                            BTC
                        </a-radio-button>
                    </a-radio-group>
                </a-col>
                <a-col :lg="9" align="end">

                    <a-select :open="open" v-model="ListcurrencyNameSearch" style="width: 100%"
                        dropdownClassName="currency-list-dropdown" ref="fiatSelect" v-on:select="setOpen(false)"
                        @dropdownVisibleChange="onOpen" :loading="currencyinfos.length == 0">
                        <span class="more-txt fw-4" v-if="open" slot="suffixIcon"> <span
                                v-show="ListcurrencyNameSearch == null">More</span> <a-icon type="caret-up" /></span>
                        <span v-else class="more-txt fw-4" slot="suffixIcon" v-on:click="setOpen(true)"><span
                                v-show="ListcurrencyNameSearch == null">More</span> <a-icon type="caret-down" /></span>

                        <div slot="dropdownRender" slot-scope="menu">
                            <div style="padding: 4px 8px; cursor: pointer;">
                                <a-input v-if="open" :placeholder="$t('placeholders.plh5')" ref="fiatSearch"
                                    v-on:blur="setOpen(false)" v-model="searchValue" />
                            </div>
                            <v-nodes :vnodes="menu" />
                        </div>
                        <a-select-option v-for="(item, index) in currencyinfos" :key="index"
                            v-if="filterCurrencyOptions(item.currencyname.toLowerCase())">
                            <img :src="item.icon" height="15" width="15" class="mr-1 mb-1" /> {{
                                item.currencyname }}
                        </a-select-option>
                    </a-select>

                    <!-- <p class="more-txt mb-0">{{ $t('play_game.pg32') }}<img src="/images/arrow-down.svg"
                            class="pl-1" /> </p> -->
                </a-col>
            </a-row>
            <a-divider class="game-divider mt-2 mb-0" />
            <a-row>
                <a-col :lg="24" class="px-2">
                    <a-input placeholder="Room ID" class="search-data" v-model="roomIdSearch">
                        <span slot="prefix">
                            <img src="/images/search-lg.svg" />
                        </span>

                    </a-input>
                </a-col>
                <a-col :lg="24" class="table-data">
                    <AppLoading v-if="loadingGameRooms" backgroundColor="#191919" height="87.5px" />
                    <a-table :columns="gameRoomColumns" :data-source="filteredGetGameRooms"  rowSelection:onSelect="rowClass"
                        :customRow="selectRoom" :pagination="false" :rowKey="(record, index) => index" v-else
                        :scroll="{ y: 430 }">
                        <span slot="name" slot-scope="text,row">
                            <p class="mb-1 user-name fw-4">
                                <img :src="row.avatar" height="14px" width="14px" />
                                <!-- {{ $t('play_game.pg35') }} <img src="/images/lock.svg" class="pl-1" /> -->
                                {{ row.nickname }} <img src="/images/lock.svg" class="pl-1"
                                    v-if="row.password != null" />
                            </p>
                            <p class="mb-0 room-id fw-4">{{ row.id }}</p>
                        </span>
                        <p slot="amount" class="mb-0 user-price fw-4" slot-scope="text,row">{{ row.amount }} <span
                                class="price-txt">{{ row.currencyname }}</span> </p>
                    </a-table>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
import select from '@/components/security/deal_select'
import AppLoading from '../AppLoading.vue';
import { mapGetters } from 'vuex'
export default {
    components: {
        'hex-select': select,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
        AppLoading
    },
    props: {
        fetchGameRoomInfoMethod: {
            type: Function
        }
    },
    computed: {
        ...mapGetters("general", ["loadingGameRooms",]),
        ...mapGetters("playcard", ["getGameRooms",]),
        filteredGetGameRooms() {
            if (this.getGameRooms.length != 0) {
                return this.getGameRooms.filter(item => {
                    let searchCurrency = this.currencyinfos[this.ListcurrencyNameSearch]?.currencyname
                    searchCurrency = searchCurrency ? searchCurrency : ''
                    return item.id.toString().includes(this.roomIdSearch.toString()) && item?.currencyname.includes(this.currencyNameSearch) && item.currencyname.includes(searchCurrency)
                });
            }
            else return []
        },
        currencyinfos() {
            return this.$store.state.currencyinfos;
        },
    },
    data() {
        return {
            gameRoomColumns: [
                {
                    title: this.$t('play_game.pg33'),
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' },
                    width: 110,
                },
                {
                    title: this.$t('play_game.pg22'),
                    dataIndex: 'amount',
                    scopedSlots: { customRender: 'amount' },
                    width: 75,
                    align: 'left',
                    sorter: (a, b) => a.amount - b.amount,
                },
                {
                    title: this.$t('play_game.pg34'),
                    dataIndex: 'playnum',
                    width: 60,
                    align: 'center',
                    sorter: (a, b) => a.playnum - b.playnum,
                },

            ],
            roomIdSearch: '',
            currencyNameSearch: '',
            ListcurrencyNameSearch: null,
            open: false,
            searchValue: '',
        }
    },
    methods: {
        rowClass(record, selected, selectedRows, nativeEvent){
//console.log(record,selected,selectedRows,nativeEvent)

        },
        selectRoom(record) {
            return {
                on: {
                    click: event => {
                        //console.log("FETCH GAME ROOM INFO FROM TOP-LEFT")
                        this.fetchGameRoomInfoMethod(record.gameid, record.id)
                    }
                }
            };
        },
        filterCurrencyOptions(str) {
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
    }
}
</script>

<style></style>
