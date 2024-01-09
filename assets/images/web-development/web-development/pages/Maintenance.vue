<template>
    <div id="maintenance">
        <div class="maintenance-content">
            <div class="main-content">
                <a-row>
                    <a-col :lg="8">
                        <p class="maintenance-title fw-5 mb-3">{{ $t('bscard.bsc50') }}</p>
                            <p class="desc fw-5">{{ systemErrorData.msg }}</p>
 
                    </a-col>
                </a-row>
                <a-row class="pt-4">
                    <a-col :lg="7">
                        <div class="maintenance-time">
                            <div class="time-info">
                                <p class="desc fw-5 text-center mb-0">{{$t('rewardhub.rew_Hours')}}</p>
                                <p class="time mb-0">{{ hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) }}</p>
                            </div>
                            <span class="time">:</span>
                            <div class="time-info">
                                <p class="desc fw-5 text-center mb-0">{{$t('rewardhub.rew_min')}}</p>
                                <p class="time mb-0">{{ minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) }}</p>
                            </div>
                            <span class="time">:</span>
                            <div class="time-info">
                                <p class="desc fw-5 text-center mb-0">{{$t('rewardhub.rew_sec')}}</p>
                                <p class="time mb-0">{{ seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) }}</p>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            systemErrorData:{},
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    },
    methods:{
        getMaintenanceData(){
            this.$store.dispatch('com_constants_getconstantsinfo', { key: "common_system_error" })
            .then(( data ) => {
            if (data) {
                    const parseData = JSON.parse(data.data)
                    //console.log(parseData)
                    if (parseData) {
                        this.systemErrorData=parseData;
                        this.total = this.systemErrorData.left_time;
                        this.getTimeRemaining();
                    }
                }
            
            })
        },
        getTimeRemaining() {
            const _self = this;
            _self.seconds = Math.floor((_self.total ) % 60);
            _self.minutes = Math.floor((_self.total / ( 60)) % 60);
            _self.hours = Math.floor((_self.total / ( 60 * 60)) % 24);
            _self.days = Math.floor(_self.total / (60 * 60 * 24));
            const Interval = setInterval(() => {
                if (this.seconds != 0) {
                    this.seconds = this.seconds - 1;
                }
                else {
                    if (this.minutes != 0) {
                        this.minutes = this.minutes - 1;
                        this.seconds = 59;
                    }
                    else {
                        if (this.hours != 0) {
                            this.hours = this.hours - 1;
                            this.minutes = 59;
                            this.seconds = 59;
                        }
                        else {
                            if (this.days != 0) {
                                this.days = this.days - 1;
                                this.hours = 23;
                                this.minutes = 59;
                                this.seconds = 59;
                            }
                            else {
                                clearInterval(Interval)
                                this.$router.push('/')
                            }
                        }
                    }
                }
            }, 1000);
        },
    },
    mounted(){
        this.getMaintenanceData();
    }

}
</script>

<style lang="scss">
@import '@/assets/scss/pages/all-notification/all-notification.scss';
</style>
