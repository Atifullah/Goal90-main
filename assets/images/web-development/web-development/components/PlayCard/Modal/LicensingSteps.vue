<template>
    <div class="help-center">
        <a-modal id="send-play-modal" wrapClassName="help-center-modal " v-model="show" :footer="false" :title="false"
            @cancel="close" width="50%" :maskClosable="false">

            <a-row :gutter="16" class="my-2 px-3">
                <a-col :lg="4"></a-col>
                <a-col :lg="16" align="center">
                    <div class="room-card px-2 text-center">
                        <img src="/images/rules.svg" width="275px" />
                        <p class="game-rom-txt fw-4 room-info-txt mb-0 licensing-rules-img">{{ $t('play_game.licensing_rules') }} </p>
                    </div>
                </a-col>
                <a-col :lg="4" align="end">
                    <img src="/images/close-btn.svg" @click="close" class="pointer" />
                </a-col>
            </a-row>
            <a-row :gutter="16">

                <a-col :lg="24">
                    <div class="help-scroll licensing-steps-guide" ref="scrollingContainer">
                        <a-timeline class="px-4 pt-2">
                            <a-timeline-item>
                                <span slot="dot" class="ml-2">
                                    <img src="/images/pl_timeline_dot.svg" height="31" width="31" />
                                </span>
                                <p class="help-heading col-alignment mb-1">{{ $t('play_game.step') }} 1
                                    <span class="help-desc fw-4 bit-block pl-2">Eth {{ $t('play_game.block') }}  
                                        <a class="view-link-txt fw-4" target="_blank"
                                            :href="hashDetailLink + `/${blockHash.periods}`">
                                            {{ blockHash.periods ? blockHash.periods.toLocaleString("en-US") : '' }}
                                        </a>
                                    </span>
                                </p>
                                <p class="mb-3 help-desc fw-4 ">
                                    <span>
                                        {{ $t('play_game.hash_value') }} :
                                    </span>
                                    <span class="link-txt">
                                        <a target="_blank" class="text-white"
                                            :href="hashDetailLink + `/${blockHash.periods}`">
                                            {{ blockHash.hashcode }}
                                        </a>
                                    </span>

                                </p>
                                <p class="mb-3 help-desc fw-4 ">
                                    <span>
                                        {{ $t('play_game.duplication_hash') }} :
                                    </span>
                                    <span>
                                        {{ deduplicationHash }}
                                    </span>
                                </p>
                            </a-timeline-item>
                            <a-timeline-item><span slot="dot" class="ml-2">
                                    <img src="/images/pl_timeline_dot.svg" height="31" width="31" />
                                </span>
                                <p class="help-heading col-alignment mb-1">
                                    {{ $t('play_game.step') }} 2 
                                    <span class="help-desc fw-4 bit-block pl-2">{{ $t('play_game.character_encoding') }} </span>
                                    <a target="_blank" :href="hashRulesLink" class="view-link-txt fw-4 pl-3">
                                        {{ $t('play_game.view_rule') }} 
                                         </a>
                                </p>
                                <p class="mb-3 help-desc fw-4 link-txt">
                                    <span v-for="(character, index) in withAsciiCodes" :key="index + 'asciValue'">
                                        {{ character.character + '=' + character.ascii }}
                                    </span>
                                </p>
                            </a-timeline-item>
                            <a-timeline-item><span slot="dot" class="ml-2 ">
                                    <img src="/images/pl_timeline_dot.svg" height="31" width="31" />
                                </span>
                                <p class="help-heading col-alignment mb-1">{{ $t('play_game.bull') }} Step 3<span class="help-desc fw-4 bit-block pl-2">
                                    {{ $t('play_game.byte_encoding') }} </span></p>
                                <p class="mb-0 tip-desc fw-4"><span>{{ $t('play_game.tip') }}:</span>{{ $t('play_game.card_rules') }} </p>
                                <a-row :gutter="16">
                                    <a-col :lg="4" v-for="(item, key) in stepsCardList" :key="key" class="mt-4">
                                        <p class="mb-1 card-list fw-4">{{ item.text1 }}</p>
                                        <p class="mb-4 card-list fw-4">{{ item.text2 }}</p>
                                        <img :src="playcardImageLink + '/' + item.img + '.svg'" height="130px" />
                                    </a-col>
                                </a-row>
                            </a-timeline-item>
                            <a-timeline-item><span slot="dot" class="ml-2">
                                    <img src="/images/pl_timeline_dot.svg" height="31" width="31" />
                                </span>
                                <p class="help-heading col-alignment mb-1">{{ $t('play_game.step') }} 4<span
                                        class="help-desc fw-4 bit-block pl-2">{{ $t('play_game.licensing_result') }} </span></p>

                            </a-timeline-item>

                        </a-timeline>


                        <a-card :bordered="false" class="mx-4 steps-bg-card"
                            :class="(playerIndex + 1) % 2 == 1 ? 'stepsgray-card' : ''"
                            v-for="(player, playerIndex) in players" :key="playerIndex + 'pl'">
                            <a-row :gutter="16" class="col-alignment">
                                <a-col :lg="4" v-if="player.who == 1">
                                    <!-- boss -->
                                    <img src="/images/user-join1.svg" height="110px" />
                                </a-col>
                                <a-col :lg="4" v-else-if="player.who == 2">
                                    <!-- boss -->
                                    <img src="/images/join-user.svg" height="110px" />
                                </a-col>

                                <a-col :lg="4" v-else-if="player.who == 3">
                                    <!-- boss -->
                                    <img src="/images/join-user2.svg" height="110px" />
                                </a-col>

                                <a-col :lg="4" v-else-if="player.who == 4">
                                    <!-- boss -->
                                    <img src="/images/join-user4.svg" height="110px" />
                                </a-col>
                                <a-col :lg="17">
                                    <div class="card-img-box">
                                        <div class="first-box" v-for="(card, cardIndex) in player.cards"
                                            :key="cardIndex + 'pCard'">
                                            <img :src="`${playcardImageLink}/${card.color}_${card.dot}.svg`"
                                                height="110px" />
                                        </div>

                                    </div>
                                </a-col>
                                <a-col :lg="3" class="px-0" v-if="player.weight >= 1 && player.weight <= 7">
                                    <p class="bull-nine fw-4 mb-0"> {{ $t('play_game.bull') }}  <br /> {{ player.weight }} <br /> 1x </p>
                                </a-col>

                                <a-col :lg="3" class="px-0" v-else-if="player.weight == 8">
                                    <p class="bull-nine fw-4 mb-0">{{ $t('play_game.bull') }}    <br /> {{ player.weight }} <br /> 2x </p>
                                </a-col>

                                <a-col :lg="3" class="px-0" v-else-if="player.weight == 9">
                                    <p class="bull-nine fw-4 mb-0"> {{ $t('play_game.bull') }}   <br /> {{ player.weight }} <br /> 3x </p>
                                </a-col>

                                <a-col :lg="3" class="px-0" v-else-if="player.weight == 10">
                                    <p class="bull-nine fw-4 mb-0">{{ $t('play_game.silver_bull') }} <br /> {{ player.weight }} <br /> 4x </p>
                                </a-col>

                                <a-col :lg="3" class="px-0" v-else-if="player.weight == 100">
                                    <p class="bull-nine fw-4 mb-0">{{ $t('play_game.gold_bull') }}   <br /> {{ player.weight }} <br /> 5x </p>
                                </a-col>
                                <a-col :lg="3" class="px-0" v-else>
                                    <p class="bull-nine fw-4 mb-0"> {{ $t('play_game.no_bull') }}   <br /> 1X </p>
                                </a-col>

                            </a-row>
                        </a-card>
                        <a-card :bordered="false" class="mx-4 steps-bg-card" v-if="players.length == 0">
                            <a-row :gutter="16" class="col-alignment">
                                <a-col :lg="24">
                                    <p class="text-center text-white">
                                        {{ $t('play_game.data_not_available') }}
                                    </p>
                                </a-col>
                            </a-row>


                        </a-card>

                    </div>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { playcardImageLink, hashRulesLink, hashDetailLink } from '~/plugins/constants'

export default {
    name: 'LicencingSteps',
    props: {
        show: {
            type: Boolean
        },
    },
    emits: ['onClose'],
    data() {
        return {
            stepsCardList: [

            ],
            withAsciiCodes: [],
            encodedCards: [],
            deduplicationHash: ""
        }
    },
    computed: {
        ...mapGetters("playcard", ["getCurrentSelectedHash", "getHashGamesInfo"]),
        ...mapGetters("general", ["loadingHashes"]),
        blockHash: function () {
            return this.getCurrentSelectedHash
        },
        hashGamesInfo: function () {
            return this.getHashGamesInfo
        },
        players: function () {
            const array = this.hashGamesInfo.cardinfo ? this.hashGamesInfo.cardinfo : []
            return array.sort((a, b) => a.who - b.who)
        },
        playcardImageLink: function () {
            return playcardImageLink
        },
        hashRulesLink: function () {
            return hashRulesLink
        },
        hashDetailLink: function () {
            return hashDetailLink
        }
    },
    watch: {
        getCurrentSelectedHash: function (val) {
            this.createAllCards(val.hashcode)
            if (val.id) {
                this.fetchHashGameRoomInfo({ gameID: val.id })
            }
            const el = this.$refs.scrollingContainer
            window.ELLL = el
            setTimeout(function () {
                if (el) {
                    el.scrollTop = 0;
                }
            }, 300);

        },
        deep: true
    },
    methods: {
        ...mapActions("playcard", ["fetchHashGameRoomInfo"]),
        createAllCards(hashcode) {
            this.stepsCardList = [];
            this.withAsciiCodes = []
            this.deduplicationHash = "";
            let index = 0
            let message = Array.from(hashcode); // 转换为字符数组
            message.forEach(character => {
                let nowascii = character[0].charCodeAt(0) + index;
                let existingCard = this.withAsciiCodes.find((item) => item.ascii == nowascii);
                if (!existingCard && this.withAsciiCodes.length <= 20) {
                    this.deduplicationHash += character;
                    this.withAsciiCodes.push({
                        character: character,
                        ascii: nowascii
                    })
                }
            })
            while (this.stepsCardList.length < 20) {
                let nowIndex = index === 0 ? 0 : index % this.withAsciiCodes.length; // 当前索引所在位置
                let nowData = index === 0 ? 0 : Math.floor(index / this.withAsciiCodes.length); // hash轮询次数
                let suit = (parseInt(this.withAsciiCodes[nowIndex].ascii) + nowData) % 4 + 1; // 方梅红黑
                let rank = (parseInt(this.withAsciiCodes[nowIndex].ascii) + nowData) % 13 + 1; // A-K
                let existingCard = this.stepsCardList.find((card) => card.img == suit + "" + rank);
                if (!existingCard) {
                    this.stepsCardList.push({
                        text1: (parseInt(this.withAsciiCodes[nowIndex].ascii) + nowData) + '%4+1=' + suit,
                        text2: (parseInt(this.withAsciiCodes[nowIndex].ascii) + nowData) + '%13+1=' + rank,
                        img: suit + "_" + rank
                    });
                }
                index++;
                //console.log("nowIndex:" + nowIndex + "_nowData:" + nowData + "_color:" + suit + "_value:" + rank + "_ascii:" + parseInt(this.withAsciiCodes[nowIndex].ascii) + nowData)
            }
        },
        close() {
            this.$store.commit('playcard/setHashGamesInfo', {})
            this.$emit('onClose', true)
        }
    },
}
</script>

<style></style>
