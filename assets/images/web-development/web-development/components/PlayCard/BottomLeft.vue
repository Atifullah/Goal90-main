<template>
    <div class="top-left mt-2 pt-1">
        <a-card class="left-card">
            <div class="room-card px-3">
                <img src="/images/room-info.svg" />
                <p class="game-rom-txt fw-4 room-info-txt mb-0">{{ $t('play_game.pg36') }}</p>
            </div>
            <a-divider class="game-divider mb-2" />
            <a-row class="px-3 col-alignment">
                <a-col :lg="24">
                    <a-radio-group v-model="filterRadio" class="all-btn">
                        <a-radio-button value="">
                            {{ $t('play_game.pg31') }}
                        </a-radio-button>
                        <a-radio-button value="2">
                            A
                        </a-radio-button>
                        <a-radio-button value="3">
                            B
                        </a-radio-button>
                        <a-radio-button value="4">
                            C
                        </a-radio-button>
                    </a-radio-group>
                </a-col>
            </a-row>
            <a-divider class="game-divider mt-2 mb-0" />
            <a-row class="">
                <a-col :lg="24" class="table-data">
                    <a-table :columns="gameRoomColumns" :data-source="players" :pagination="false" :scroll="{ y: 295 }"
                        :rowKey="(record, index) => index">
                        <span slot="name" slot-scope="text,row">
                            <p class="mb-0 user-name fw-4">
                                <img :src="row.avatar" height="14px" width="14px" />
                                {{ row.nickname }}
                            </p>
                        </span>
                        <p slot="amount" slot-scope="text,row" class="mb-0 user-price fw-4">{{ row.amount }} <span
                                class="price-txt">{{ row.currencyname }}</span> </p>
                        <p slot="seat" slot-scope="text,row" class="mb-0"><img :src="row.seatImage" height="23px" width="29px" /></p>
                    </a-table>
                </a-col>
            </a-row>
            <div>
                <a-row class="mt-2 pr-2 hash-codes-pagination">
                <a-col :lg="24" align="end">
                    <a-pagination size="small" :page-size="playerPagination.pageSize" showLessItems
                        :current="playerPagination.currentPageIndex" :total="playerPagination.totalItemCount"
                        @change="pageChange" />
                </a-col>
            </a-row>
            </div>

        </a-card>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    props:{
        selectedRoom:{
            type:Object,
            default:()=>{}
        }
    },
    computed: {
        ...mapGetters("playcard", ["getPlayers","playerPagination"]),
        players() {
            if(this.getPlayers.length>0){
                return this.getPlayers.map((bet) => {
                if (bet.tablet == 1) {
                    bet.seatImage = '/images/boss.svg'
                }
                else if (bet.tablet == 2) {
                    bet.seatImage = '/images/join-user.svg'
                }
                else if (bet.tablet == 3) {
                    bet.seatImage = '/images/join-user2.svg'
                }
                else if (bet.tablet == 4) {
                    bet.seatImage = '/images/join-user4.svg'
                }
                bet.currencyname = this.$store.state.currencyinfos.find(item => item.id == bet.currencyid).currencyname
                bet.amount=this.global_get_tofixed((bet.amount), this.global_get_decimal(bet.currencyname).a)
                return bet;
            }).filter(item=>{
                return item.tablet.toString().includes(this.filterRadio)
            })
            }
            else return []

        }
    },
    data() {
        return {
            filterRadio:"",
            requestParam: {
                pageIndex: 1,
                pageSize: 2,
            },
            gameRoomColumns: [
                {
                    title: this.$t('play_game.pg33'),
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' },
                    width: 90,
                },
                {
                    title: this.$t('play_game.pg22'),
                    dataIndex: 'amount',
                    scopedSlots: { customRender: 'amount' },
                    width: 90,
                    align: 'left',
                    sorter: (a, b) => a.amount - b.amount,
                },
                {
                    title: this.$t('play_game.pg37'),
                    dataIndex: 'seat',
                    scopedSlots: { customRender: 'seat' },
                    width: 70,
                    align: 'center',
                },

            ],
        }
    },
    methods: {
        ...mapActions("playcard", ["fetchPlayers"]),
        pageChange(val) {
            this.requestParam.pageIndex = val
            this.requestParam.roomID=this.selectedRoom.id
            this.fetchPlayers(this.requestParam);
        },
    },
}
</script>

<style></style>
