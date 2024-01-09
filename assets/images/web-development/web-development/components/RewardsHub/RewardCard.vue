<template>
    <div>
        <div class="reward-card-sec mb-5 pointer">
            <a-card class="gray-main-card" :bordered="false">
                <div class="right-top" v-if="showCurves"></div>
                <div class="right-bottom" v-if="showCurves"></div>
                <a-card class="white-card" :bordered="false">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="12">
                            <p class="coupon-txt mb-0 fw-5">
                                {{
                                    list.fundtype == 0
                                        ? this.$t("rewardhub.rew9")
                                        : list.fundtype == 1
                                        ? this.$t("rewardhub.rew12")
                                        : this.$t("ico.ico8")
                                }}
                            </p>
                        </a-col>
                        <a-col :lg="12" align="end">
                            <p class="usdt-txt mb-0 fw-5">
                                {{ list.amount }}
                                <span class="fw-5">
                                    {{ list.currencyname.toUpperCase() }}</span
                                >
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :lg="24">
                            <p class="contract-desc fw-5">
                                {{ title.substr(0, 40) }} 
                                <span v-if="title.length > 40">...</span>
                                <a href="javascript:;" @click="viewMore(title)" v-if="title.length > 40">
                {{ $t('person.notice_top_more') }}
                </a>
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="12">
                            <p class="current-progress fw-4 mb-0">
                                {{ $t("rewardhub.current_progress") }}
                            </p>
                        </a-col>
                        <a-col :lg="12" align="end" v-if="list.status!=4">
                            <p class="current-progress fw-4 mb-0">
                                <span class="fw-5">
                                    {{ list.alreadytradeamout }} /
                                    {{ list.needtradetotal }}</span
                                >
                                {{
                                    list.type == 4
                                        ? "day"
                                        : list.type == 5 || list.type == 6
                                        ? ""
                                        : list.currencyname.toUpperCase()
                                }}
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :lg="24">
                            <a-progress :percent="progress" size="small" />
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="reward-timer col-alignment">
                        <a-col :lg="24" :xl="19">
                            <div class="reward-timer-box">
                                <div class="mr-2">
                                    <p class="timer-txt mb-0 fw-5">
                                        <span class="day-bg">{{ days }}</span>
                                        <span class="ml-1">{{
                                            $t("rewardhub.rew_days")
                                        }}</span>
                                    </p>
                                </div>
                                <div class="mr-2">
                                    <p class="timer-txt mb-0 fw-5">
                                        <span class="day-bg">{{ hours }}</span
                                        ><span class="ml-1">{{
                                            $t("rewardhub.rew_Hours")
                                        }}</span>
                                    </p>
                                </div>
                                <div class="mr-2">
                                    <p class="timer-txt mb-0 fw-5">
                                        <span class="day-bg">{{ minutes }}</span
                                        ><span class="ml-1">{{
                                            $t("rewardhub.rew_min")
                                        }}</span>
                                    </p>
                                </div>
                            </div>
                        </a-col>
                        <a-col :lg="24" :xl="5" align="end">
                            <img
                                class="gray-image"
                                :src="
                                    list.fundtype == 0
                                        ? '/images/coupon2.svg'
                                        : list.fundtype == 1
                                        ? '/images/coupon.svg'
                                        : '/images/coupon3.svg'
                                "
                            />
                        </a-col>
                    </a-row>
                </a-card>
                <a-row :gutter="16" class="mt-3">
                    <a-col :lg="2" :xl="2" align="end" class="pr-1">
                        <img src="/images/reward-info-circle.svg" />
                    </a-col>
                    <a-col :lg="22" :xl="16">
                        <p class="mb-0 total-amount fw-5">
                            {{ des.substr(0, 115) }}
                            <!-- <a href="javascript:;" @click="viewMore(des)" v-if="des.length > 85">
                {{ $t('person.notice_top_more') }}
              </a> -->
                        </p>
                    </a-col>
                    <a-col :lg="24" :xl="6" align="end" class="pl-0">
                        <a-button class="received-btn" @click="Deposit">{{
                            $userinfo.uid ? status : this.$t("public.ph27")
                        }}</a-button>
                    </a-col>
                </a-row>
            </a-card>
        </div>
        <MoreTextModal
            :show="showMore"
            :text="moreText"
            @close="showMore = false"
        />
    </div>
</template>

<script>
import list from "ant-design-vue/lib/list";
import MoreTextModal from "../App/MoreTextModal.vue";
export default {
    props: {
        list: {
            type: Object,
        },
        getWelfareInfos: {
            type: Function,
        },
        index: {
            type: Number,
        },
    },
    computed: {
        title() {
            const lang = this.$store.state.hex_lang.locale;
            if (lang == "zh_cn") {
                return this.list.title.zh_cn;
            }
            return this.list.title.en_us;
        },
        des() {
            const lang = this.$store.state.hex_lang.locale;
            if (lang == "zh_cn") {
                return this.list.dec.zh_cn;
            }
            return this.list.dec.en_us;
        },
        status() {
            let status = "";
            switch (this.list.status) {
                case 0:
                    status = this.$t("tabkeys.tab52");
                    break;
                case 1:
                    status = this.$t("tabkeys.tab53");
                    break;
                case 2:
                    status = this.$t("tabkeys.tab54");
                    break;
                case 3:
                    status = this.$t("tabkeys.tab55");
                    break;
                case 4:
                    status = this.$t("tabkeys.tab56");
                    break;
                default:
                    status = this.$t("tabkeys.tab57");
            }
            return status;
        },
        progress() {
            return (
                (this.list.alreadytradeamout / this.list.needtradetotal) * 100
            );
        },
        showCurves() {
            if (this.list.fundtype < 1) {
                return true;
            }
            return false;
        },
    },
    data() {
        return {
            disabled: false,
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            componentInterval: "",
            moreText: null,
            showMore: false,
        };
    },
    emits: ["onReceived"],
    beforeDestroy() {
        clearInterval(this.componentInterval);
    },
    methods: {
        getTimeRemaining() {
            this.componentInterval = setInterval(() => {
                //console.log("timerCheck")
                var dateNow = new Date();
                var endtime = Date.parse(this.list.etime);
                this.total = endtime - dateNow;
                this.seconds = Math.floor((this.total / 1000) % 60);
                this.minutes = Math.floor((this.total / (1000 * 60)) % 60);
                this.hours = Math.floor((this.total / (1000 * 60 * 60)) % 24);
                this.days = Math.floor(this.total / (1000 * 60 * 60 * 24));
                // Add leading zero for minutes, seconds, and hours if needed
                this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
                this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
                this.hours = this.hours < 10 ? "0" + this.hours : this.hours;
            }, 1000);
        },
        async Deposit() {
            if (!this.$userinfo.uid) {
                this.$router.push("/login?returnurl=" + this.$route.path);
            } else {
                if (this.list.status == 3) {
                    try {
                        const { data } = await this.$store.dispatch(
                            "recieve_wefare_get",
                            {
                                welfareID: this.list.id,
                            }
                        );
                        if (data) {
                            this.list.status = 4;
                            this.$store.commit("set_message", {
                                type: "ok",
                                text: this.$t("texts.txt40"),
                            });
                            this.$emit("onReceived", this.list.id); // Emitting the event
                        }
                    } catch (error) {
                        //console.log('Error', error)
                    }
                } else {
                    switch (this.list.type) {
                        case 1:
                            if (this.$store.getters.get_contractType == 1) {
                                this.$router.push("/contract/btc_yx?contractType=1");
                            } else {
                                this.$router.push("/contract/btc_yx");
                            }
                            break;
                        case 2:
                            this.$router.push("/deal/btc_usdt");
                            break;
                        case 3:
                            this.$router.push("/person/wallet");
                            break;
                        case 4:
                            this.$router.push("/deal/btc_usdt");
                            break;
                    }
                }
            }
        },
        viewMore(text) {
            this.showMore = true;
            this.moreText = text;
        },
    },
    mounted() {
        this.getTimeRemaining();
    },
    components: { MoreTextModal },
};
</script>
