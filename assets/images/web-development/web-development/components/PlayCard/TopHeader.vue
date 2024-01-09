<template>
    <div class="top-header">
        <a-card class="top-header">
            <AppLoading v-if="loadingGames" backgroundColor="#191919" height="87.5px" />
            <a-row :gutter="16" class="col-alignment" v-else>
                <a-col :lg="1"> <img
                        :src="back ? '/images/arrow-left-active.svg' : '/images/wsi-arrow-left.svg'"
                        @click="prev" class="pointer" /></a-col>
                <a-col :lg="22">
                    <div class="carousel">
                        <div class="inner" ref="inner" :style="innerStyles">
                            <div class="top-header-card">
                                <div v-for="(item, key) in games" :key="key" @click="fetchGameRoomMethod(item.id)"
                                    class="mx-4" :class="selectedGame.id == item.id ? 'active-card' : ''">
                                    <div class="small-card " :class="[key % 4 != 0 || key == 0 ? 'card-item' : '']">
                                        <a-row :gutter="16" class="col-alignment">
                                            <a-col :lg="15">
                                                <p class="mb-1" :class="item.status == 4 ? 'first-item' : 'first-item1'">{{
                                                    item.status == 4 ? $t('play_game.pg8') : item.periods }}</p>

                                                <p class="sec-txt fw-6 mb-0"
                                                    :style="`color:${item.status == 0 ? '#70FF00' : item.status == 4 ? 'orange' : 'red'}`">
                                                    {{
                                                        item.status == 0 ? $t('play_game.pg9')
                                                        : item.status == 4 ? $t('play_game.pg11') : $t('play_game.pg10') }}</p>
                                            </a-col>
                                            <a-col :lg="9" align="end" class="pl-0">
                                                <p class="sec-txt fw-6 mb-0">{{
                                                    item.status == 4 ? item.periods : timeArray[key] ?
                                                    timeArray[key].minutes + " :" + timeArray[key].seconds : '' }}</p>
                                            </a-col>
                                        </a-row>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </a-col>
                <a-col :lg="1" align="end">
                    <img :src="forward ? '/images/arrow-right-active.svg' : '/images/arrow-right.svg'"
                        @click="next" class="pointer" />
                </a-col>

            </a-row>
        </a-card>

    </div>
</template>

<script>
import AppLoading from '../AppLoading.vue';
import { mapGetters } from 'vuex'
import moment from "moment"

export default {
    components: {
        AppLoading
    },
    props: {
        fetchGameRoomMethod: {
            type: Function
        },
        selectedGame: {
            type: Object,
            default: () => { }
        },
        updateTimeRemaing: {
            type: Function
        }
    },
    data() {
        return {
            innerStyles: {},
            step: '',
            stepsMoved: 0,
            timeArray: [],
            timeArrayInterval: [],
            games: [],
            innerWidth:0

        }
    },
    watch: {
        getGames: {
            handler: function (val) {
                if (this.getGames.length > 0) {

                    setTimeout(() => {
                        this.setStep()
                    }, 1000);
                    this.games = val;
                    if (this.timeArrayInterval.length > 0) {
                        this.timeArrayInterval.map(item => {
                            clearInterval(item)
                        })
                    }
                    this.timerClock()
                }
            },
            flush: 'post'
        }
    },
    computed: {
        ...mapGetters("general", ["loadingGames",]),
        ...mapGetters("playcard", ["getGames",]),

        forward() {
            if(((this.step*6)+this.stepsMoved)<=this.innerWidth)
            {return true}
            else return false;
        },
        back() {
            if(this.stepsMoved>0){
                return true;
            }
            else return false
        }
    },
    methods: {
        timerClock() {
            if (this.games.length > 1) {
                this.games.map((item, index) => {
                    const leftTime = moment().add(Math.abs((item.leftsecond + 2)), 'seconds');
                    this.timeArrayInterval[index] = setInterval(() => {
                        var duration = moment.duration(leftTime.diff(moment()));
                        let minutes = duration.minutes().toString().padStart(2, '0');
                        let seconds = duration.seconds().toString().padStart(2, '0');
                        if (typeof this.timeArray[index] != 'undefined') {
                            this.timeArray[index].minutes = minutes
                            this.timeArray[index].seconds = seconds
                        }
                        else {
                            this.timeArray.push({
                                minutes: minutes,
                                seconds: seconds
                            })
                        }
                        if (item.id == this.selectedGame.id) {
                            this.updateTimeRemaing(this.timeArray[index])
                        }

                        if (this.timeArray[index].minutes <= 0 && this.timeArray[index].seconds <= 0) {
                            clearInterval(this.timeArrayInterval[index])
                        }
                    }, 1000);
                })
            }
        },
        setStep() {
            const innerWidth = this.$refs.inner.scrollWidth
            const totalCards = this.games.length
            this.innerWidth=innerWidth
            this.step = innerWidth / totalCards
        },
        next() {
            if(this.forward){
            this.stepsMoved = this.stepsMoved + this.step
            //console.log(this.stepsMoved, this.step)
            this.moveLeft();
            }

        },
        prev() {
            if(this.back){
            this.stepsMoved = this.stepsMoved - this.step
            //console.log(this.stepsMoved, this.step)
            this.moveRight();
            }
        },
        moveLeft() {
            this.innerStyles = {
                transform: `translateX(-${this.stepsMoved}px)`
            }
        },
        moveRight() {
            this.innerStyles = {
                transform: `translateX(-${this.stepsMoved}px)`
            }
        },
        resetTranslate() {
            this.innerStyles = {
                transition: 'none',
                transform: `translateX(0)`
            }
        }
    },
}
</script>

<style>
.carousel {
    width: 100%;
    overflow: hidden;
}

.inner {
    transition: transform 0.2s;
    white-space: nowrap;
}
</style>
