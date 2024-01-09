import { parse } from "cookie";

export default {
    setGames(state, payload) {
        state.games = payload;
    },
    addGames(state, params) {
        const payload=params.response
        const selectedGame=params.selectedGame
        //console.log("GAME ADD MUTATION TRIGGERED",payload);
        let data = state.games;
        if(data.findIndex(item=>item.periods==selectedGame.periods)==(data.length-1)){
            data.splice((data.length-2),1)
        }
        else{
            data.splice((data.length-1),1)
        }
        //console.log(data)
        data.unshift(payload);
        state.games = [];
        state.games = data;
    },
    pushGames(state,payload){
        //console.log("GAME PUSH MUTATION TRIGGERED");
        let data = state.games;
        data.splice((data.length-1),1)
        data.push(payload)
        state.games = {};
        state.games = data;
    },
    updateGames(state, payload) {
        const pageindex=state.games.findIndex(
            (item) => parseInt(item.periods) == parseInt(payload.periods)
        );
        state.games[pageindex] = payload;
        const data=state.games;
        state.games={}
        state.games=data
     },


// GAME ROOM MUTATIONS
    setGameRooms(state, payload) {
        state.gamerooms = payload;
    },
    updateRoom(state, payload) {

        //console.log(payload,"GAME ROOM MUTATION CALL")
        let newData=state.gamerooms
        const index = newData.findIndex(
            (item) => parseInt(item.id) == parseInt(payload.id)&&parseInt(item.gameID)==parseInt(payload.gameID)
        );
        if (index>=0) {
            //console.log("Index is Find",index)
            newData[index] = payload;
        } else {
            //console.log("Index Was not found")
            newData.splice((newData.length-1),1)
            newData.unshift(payload);
        }
        state.gamerooms=[]
        state.gamerooms=newData
    },

    //ROOM INFO MUTATION
    setGameRoomInfo(state, payload) {
        state.gameroominfo = payload;
    },
    setBlockHashes(state, payload) {
        state.blockHashes = payload;
    },
    setPlayers(state, payload) {
        state.players = payload;
    },
    setPlayerPagination(state, object) {
        state.playerPagination = object
    },
    updatePlayers(state,payload){
        //console.log("UPDATE PLAYER MUTATION TRIGGERED",payload)
        let newDataPlayers=state.players
        let newDataRooms=state.gamerooms
        let newDataRoomInfo=state.gameroominfo
        const roomIndex=newDataRooms.findIndex(item=>parseInt(item.id)==parseInt(payload.roomid))
        if(roomIndex>=0){
            //console.log(newDataRooms[roomIndex].amount,"Amount previous")
            //console.log(newDataRooms[roomIndex].playnum,"Players previous")
            newDataRooms[roomIndex].amount+=payload.amount
            newDataRooms[roomIndex].playnum+=1
            //console.log(newDataRooms[roomIndex].amount,"Amount new")
            //console.log(newDataRooms[roomIndex].playnum,"Players new")
            //console.log("ROOM WAS FOUNDED AND DATA WAS UPDATED",roomIndex)
            state.gamerooms=[]
            state.gamerooms=newDataRooms
        }
        else{
        //console.log("ELSE IS CALLED ALERT")
        }

       if(newDataRoomInfo.roominfo.id==payload.roomid){
        newDataPlayers.push(payload)
        const roomInfoIndex=newDataRoomInfo.tabletinfos.findIndex(item=>item.who==payload.tablet);
        if(roomInfoIndex>=0){
            //console.log(newDataRoomInfo.tabletinfos[roomInfoIndex].num,"PREVIOUS ROOM PLAYER INFO ")
            //console.log(newDataRoomInfo.tabletinfos[roomInfoIndex].amount,"PREVIOUS ROOM AMOUNT INFO ")
            newDataRoomInfo.tabletinfos[roomInfoIndex].num+=1
            newDataRoomInfo.tabletinfos[roomInfoIndex].amount+=1
            //console.log(newDataRoomInfo.tabletinfos[roomInfoIndex].num,"NEXT ROOM PLAYER INFO ")
            //console.log(newDataRoomInfo.tabletinfos[roomInfoIndex].amount,"NEXT ROOM AMOUNT INFO ")
        }
        else{
            //console.log("added tablet")
            newDataRoomInfo.tabletinfos.push({
                amount:payload.amount,
                num:1,
                who:payload.tablet,
                profit:0,
            })
        }

        state.gameroominfo={}
        state.gameroominfo=newDataRoomInfo
        state.players=[];
        state.players=newDataPlayers
        }

    },


    setOpenBetting(state, payload) {
        state.openingbetting = payload;
    },
    setHistoryBetting(state, payload) {
        state.historybetting = payload;
    },
    setBetOrders(state, payload) {
        state.betOrders = payload;
    },
    setUserGameAssets(state, payload) {
        state.usergameassets = payload;
    },
    setListPagination(state, object) {
        state.listPagination = object;
    },
    setHashPagination(state, object) {
        state.hashPagination = object
    },
    setHistoryPagination(state, object) {
        state.historyPagination = object
    },
    setOpenPagination(state, object) {
        state.openPagination = object
    },
    setBillingPagination(state, object) {
        state.billingPagination = object
    },
    setCurrentSelectedHash(state, object) {
        state.currentSelectedHash = object
    },
    setHashGamesInfo(state, object){
        state.hashGamesInfo = object
    }

};
