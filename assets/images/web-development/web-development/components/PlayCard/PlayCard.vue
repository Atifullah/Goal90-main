<template>
    <div class="play-card">
        <div class="main-content">
            <CardHeader />
            <TopHeader :selectedGame="selectedGame" :updateTimeRemaing="updateTimeRemaing"
                :fetchGameRoomMethod="fetchGameRoomMethod" />

            <a-row :gutter="16" class="mt-2">
                <a-col :lg="5">
                    <TopLeft :fetchGameRoomInfoMethod="fetchGameRoomInfoMethod" />
                    <BottomLeft :selectedRoom="selectedRoom"/>
                </a-col>
                <a-col :lg="14">
                    <CenterContent
                        :selectedGame="selectedGame" :changeOpenRoom="changeOpenRoom"
                        :selectedRoom="selectedRoom" :fetchGameRoomInfoMethod="fetchGameRoomInfoMethod"
                        :selectedGameRemainingTime="selectedGameRemainingTime"
                        v-if="(Object.keys(getGameRoomInfo).length > 0 && getGameRoomInfo.constructor === Object)" />
                </a-col>
                <a-col :lg="5">
                    <TopRight  :openRoom="openRoom" :changeOpenRoom="changeOpenRoom" :selectedGame="selectedGame"
                        :fetchOpenBettingMethod="fetchOpenBettingMethod" :fetchGameRoomMethod="fetchGameRoomMethod"
                        :submitBetCreateMethod="submitBetCreateMethod" :selectedSeat="selectedSeat"
                     />
                    <BottomRight :fetchGameRoomMethod ="fetchGameRoomMethod "/>

                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import TopLeft from './TopLeft.vue'
import BottomLeft from './BottomLeft.vue';
import TopRight from './TopRight.vue'
import BottomRight from './BottomRight.vue'

import CardHeader from './CardHeader.vue'
import TopHeader from './TopHeader.vue'
import CenterContent from './CenterContent.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'


export default {
    components: { CardHeader, TopHeader, TopLeft, BottomLeft, CenterContent, TopRight, BottomRight },
    mounted() {
        this.fetchGamesLocal()
        this.gamesSocket()
        if(this.$userinfo.uid){
            this.userSocket()
            this.fetchOpenBettingMethod()
            this.fetchHistoryBettingMethod()
            // this.fetchBillingDetailMethod()
        }
    },
    data() {
        return {
            fetchGameRequest: {
                pageIndex: 1,
                pageSize: 20,
            },
            openRoom: true,
            selectedSeat: 1,
            selectedGame: {},
            selectedGameRemainingTime:{},
            selectedRoom:{},
            fetchGameRoomRequest: {},
            fetchGameRoomInfoRequest: {},
            fetchPlayersRequest: {
                pageIndex: 1,
                pageSize: 10,
            },
            fetchHistoryBettingRequest: {
                pageIndex: 1,
                pageSize: 5,
            },
            fetchOpenBettingRequest: {
                pageIndex: 1,
                pageSize: 5,
            },
            fetchBillingDetailRequest: {
                pageIndex: 1,
                pageSize: 5,
            },
            fetchUserGameAssetsRequest: {
                currencyID: null
            },
            submitBetCreateRequest: {

            },
            billingDetail: [],
        }
    },
    computed: {
        ...mapGetters("playcard", ["getGames", "getGameRooms", "getGameRoomInfo", "getPlayers", "getOpenBetting", "", "getBlockHashes", "getUserGameAssets","getBlockHashes"]),
    },

    watch:{
     getGames:function(val){
       if((Object.keys(this.selectedGame).length > 0 && this.selectedGame.constructor === Object)){
        const oldSelected=this.selectedGame
            this.selectedGame=this.getGames.find(item=>item.id==this.selectedGame.id)
            if(this.selectedGame.status>3&&this.selectedRoom.id==this.getGameRoomInfo.roominfo.id&&oldSelected.status!=this.selectedGame.status){
                //console.log("ROOM WAS SELECTED ROOM INFO METHOD TRIGGERED")
                this.fetchGameRoomInfoMethod(this.selectedGame.id,this.selectedRoom.id)
            }
       }
     },
     getGameRooms:function(val){
       if((Object.keys(this.selectedRoom).length > 0 && this.selectedRoom.constructor === Object)){
            this.selectedRoom=this.getGameRooms.find(item=>item.id==this.selectedRoom.id)
            //console.log("CHANGED SELECTED ROOM ")
       }
     }
    },


    methods: {
        ...mapMutations("playcard", ["addGames", "updateGames", 'updateRoom','updatePlayers']),
        // SOCKET AREA STARTED

        gamesCallback(data) {
            let response = JSON.parse(data.data);
            response=this.convertObjectKeysToLower(response)
            const gameFlag = this.getGames.find(item => parseInt(item.periods) == parseInt(response.periods));
            if (gameFlag) {
                //console.log(gameFlag.status, "This game exists", response.status, response.periods)
                this.updateGames({selectedGame:this.selectedGame,response:response})
            }
            else{
                if(response.status==0){
                    this.addGames({selectedGame:this.selectedGame,response:response})
                }
            }
        },
        roomCallback(data) {
            let response = JSON.parse(data.data);
            response=this.convertObjectKeysToLower(response)
            this.updateRoom(response)
        },
        userCallback(data) {
            //console.log(data,"USERCALLBACK")
        },
        playerCallback(data) {
            let response = JSON.parse(data.data);
            response = this.convertObjectKeysToLower(response)
            this.updatePlayers(response)
        },
        gamesSocket() {
            this.$socket.uninvoke({ "type": "game", "sub": "game.0.detal" });
            this.$socket.invoke({ "type": "game", "sub": "game.0.detal" });
            this.$socket.receive('game', this.gamesCallback);

        },
        roomSocket(gameId) {
            this.$socket.uninvoke({ "type": "gameroom", "sub": `game.room.${gameId}.detal` });
            this.$socket.invoke({ "type": "gameroom", "sub": `game.room.${gameId}.detal` });
            this.$socket.receive('gameroom', this.roomCallback);

        },
        playerSocket(gameId){
            this.$socket.uninvoke({ "type": "gameplayer", "sub": `game.player.${gameId}.detal` });
            this.$socket.invoke({ "type": "gameplayer", "sub": `game.player.${gameId}.detal` });
            this.$socket.receive('gameplayer', this.playerCallback);
        },
        userSocket(gameId){
            //console.log({ "type": "gameprofile", "sub": `game.${this.$userinfo.uid}.profile` })
            this.$socket.uninvoke({ "type": "gameprofile", "sub": `game.${this.$userinfo.uid}.profile` });
            this.$socket.invoke({ "type": "gameprofile", "sub": `game.${this.$userinfo.uid}.profile` });
            this.$socket.receive('gameprofile', this.userCallback);
        },
        // //SOCKET AREA ENDED
        updateTimeRemaing(time){
this.selectedGameRemainingTime=time
        },


        changeOpenRoom(params, selectedSeat) {
            this.openRoom = params
            //console.log(selectedSeat)
            if (selectedSeat) {
                this.selectedSeat = selectedSeat
            }
        },


        ...mapActions('playcard', ['fetchGames', 'fetchGameRooms', 'fetchGameRoomInfo', 'fetchPlayers', 'fetchOpenBetting', 'fetchHistoryBetting', 'fetchBlockHashes', "fetchUserGameAssets", "submitBetCreate"]),
        ...mapMutations("playcard", ["addGames", "updateGames", 'updateRoom','updatePlayers']),

        async fetchGamesLocal() {
            const response = await this.fetchGames(this.fetchGameRequest)
            const gameID = response[2].id
            this.fetchGameRoomMethod(gameID)
            return response
        },
        // fetchNextGames() {
        //     if (this.getGames.hasnextpage) {
        //         this.fetchGameRequest.pageIndex++;
        //         this.fetchGamesLocal()
        //     }
        // },
        // fetchPrevGames() {
        //     if (this.getGames.haspreviouspage) {
        //         this.fetchGameRequest.pageIndex--;
        //         this.fetchGamesLocal()
        //     }
        // },
        //FETCHING GAME ROOMS
        async fetchGameRoomMethod(gameID) {
            if (gameID != undefined) {
                this.selectedGame = this.getGames.find(item => item.id == gameID)
                this.fetchGameRoomRequest.gameId = gameID
                this.roomSocket(gameID)
                this.playerSocket(gameID)
                const response = await this.fetchGameRooms(this.fetchGameRoomRequest)
                const roomID = response[0].id
                this.selectedRoom=response[0]
                this.fetchGameRoomInfoMethod(gameID, roomID)
                this.fetchPlayersMethod(roomID)
                return response
            }
        },

        //FETCHING THIRD API FETCH GAME ROOM INFO
        fetchGameRoomInfoMethod(gameID, roomID) {
            if (gameID != undefined && roomID != undefined) {
                this.fetchGameRoomInfoRequest.gameID = gameID
                this.fetchGameRoomInfoRequest.roomID = roomID
                this.fetchGameRoomInfo(this.fetchGameRoomInfoRequest)
            }
        },
        fetchPlayersMethod(roomID) {
            this.fetchPlayersRequest.roomID = roomID
            this.fetchPlayers(this.fetchPlayersRequest)
        },
        fetchOpenBettingMethod() {
            this.fetchOpenBettingRequest.status = 0
            this.fetchOpenBetting(this.fetchOpenBettingRequest)
        },
        fetchHistoryBettingMethod() {
            this.fetchHistoryBettingRequest.status = 1
            this.fetchHistoryBetting(this.fetchHistoryBettingRequest)
        },
        fetchBillingDetailMethod() {
            if (this.$userinfo.uid) {
                this.fetchBillingDetailRequest.type = -4
                this.$store.dispatch('user_assets_record_getlist', this.fetchBillingDetailRequest).then(({ data }) => {
                    //console.log(data)
                    this.billingDetail = data.pagedata;
                })
            }
        },
        fetchUserGameAssetsMethod(currencyID) {
            if (this.$userinfo.uid) {
                // this.fetchUserGameAssetsRequest.currencyID = currencyID
                this.fetchUserGameAssets(this.fetchUserGameAssetsRequest)
            }
        },
        submitBetCreateMethod(parmas) {
            this.submitBetCreate(parmas)
        }



    },
}
</script>

<style></style>
