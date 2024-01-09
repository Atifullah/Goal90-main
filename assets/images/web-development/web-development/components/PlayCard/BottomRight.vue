

<template>
    <div class="bottom-right mt-2 pt-1">
        <a-card class="left-card right-card">
            <div class="px-3 room-card">
                <p class="game-rules-txt fw-5 price-txt mb-0">{{ $t('play_game.pg47') }}</p>
            </div>
            <a-divider class="game-divider" />
            <AppLoading v-if="loadingHashes" height="300px" backgroundColor="transparent" />
            <div class="scroll-item" v-else>
                <div v-for="(blockHash, hashIndex) in blockHashes" :key="hashIndex">
                    <a-row class="px-3">
                        <a-col :lg="24">
                            <a-row :gutter="16" class="col-alignment">
                                <a-col :lg="12" @click="pushGame(blockHash)">
                                    <p class="game-rules-txt fw-5 price-txt mb-0"> <span
                                            class="text-white">{{ blockHash.periods }}</span> </p>
                                </a-col>
                                <a-col :lg="12" align="end">
                                    <a-button class="common-btn transfer-btn view-btn"
                                        @click="openGameRuleModel(blockHash)">{{
                                            $t('play_game.pg49') }}</a-button>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="24">
                            <a class="view-link-txt fw-4" target="_blank" :href="hashDetailLink + `/${blockHash.periods}`">
                                <p class="chess-txt fw-4 pointer text-underline mb-0 mt-1">
                                   {{ blockHash.hashcode.substr(0, 35) }}...
                                </p>
                            </a>
                        </a-col>

                    </a-row>
                    <a-divider class="game-divider" />
                </div>
            </div>
            <a-row class="pr-2 hash-codes-pagination">
                <a-col :lg="24" align="end">
                    <a-pagination size="small" :page-size="hashPagination.pageSize" showLessItems
                        :current="hashPagination.currentPageIndex" :total="hashPagination.totalItemCount"
                        @change="pageChange" />
                </a-col>
            </a-row>
        </a-card>
        <LicensingSteps :show="licensingRulesModel" @onClose="close" />
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LicensingSteps from './Modal/LicensingSteps.vue'
import AppPagination from '../AppPagination.vue'
import AppLoading from '../AppLoading.vue'
import { hashDetailLink } from '~/plugins/constants'

export default {

    components: {
        LicensingSteps,
        AppPagination,
        AppLoading
    },
    props:{
        fetchGameRoomMethod:{
            type:Function
        }
    },
    data() {
        return {
            licensingRulesModel: false,
            requestParam: {
                pageIndex: 1,
                pageSize: 50,
                isHash: true
            }
        }
    },
    computed: {
        ...mapGetters("playcard", ["getBlockHashes", 'hashPagination','getGames']),
        ...mapGetters("general", ["loadingHashes"]),

        blockHashes() {
            return this.getBlockHashes
        },
        hashDetailLink: function () {
            return hashDetailLink
        }
    },
    methods: {
        ...mapActions("playcard", ["fetchBlockHashes"]),
        ...mapMutations("playcard", ["pushGames"]),
        close() {
            this.licensingRulesModel = false
        },
        pageChange(val) {
            this.requestParam.pageIndex = val
            this.fetchBlockHashes(this.requestParam);
        },
        openGameRuleModel(blockHash) {
            this.$store.commit('playcard/setCurrentSelectedHash', blockHash)
            this.licensingRulesModel = true
        },
        pushGame(game) {
            //console.log("Clicked")
            const index = this.getGames.findIndex(item => item.periods == game.periods)
            if (!index >= 0) {
                //console.log("Not Found Game")
                this.pushGames(game)
            }
            this.fetchGameRoomMethod(game.id)
        }
    },
    mounted() {
        this.fetchBlockHashes(this.requestParam);
    },
}
</script>

<style></style>
