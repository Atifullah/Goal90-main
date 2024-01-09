<template>
    <div class="btc-card">
        <a-card class="btc-main-card" :bordered="false">
            <a-row class="btc-row px-3 py-2 col-alignment"
                :style="`background: linear-gradient(180deg, ${item.color}08 0%, rgba(255, 255, 255, 0) 165%); !important`">

                <a-col :lg="14">
                    <p v-if="tab == 1 || tab == 2" class="mb-0 btc-title-finanace fw-5 col-alignment">
                        <img :src="item.currencyicon" width="21" height="21" class="mr-2" />
                        {{ item.currencyname }}
                    </p>
                    <p v-else class="btc-heading fw-5 mb-0 btc-title-finanace fw-5 col-alignment">
                        <img class="image1 circle mr-2" :src="item.currencyicon" width="21" height="21" />
                        <span v-for="icon in allIcons" v-bind:key="icon.id" style="display: inline">
                            <img class="image2 circle mr-2" width="21" height="21" :src="icon.icon" v-if="item.products[0].symbleinfo.tcurrencyname ==
                                icon.currencyname
                                " /> </span>
                        <span style="margin-left: 15px">{{ item.products[0].symbleinfo.descriptions }}</span>
                    </p>
                </a-col>
                <a-col :lg="10" align="end" v-if="tab == '1' || tab == '3'">
                    <span class="btc-heading fw-5 mb-0">
                        {{
                            item.products[
                                item.activeProduct ? item.activeProduct : 0
                            ].cycle
                        }}
                        {{ $t("subscriptio.sub23") }}
                    </span>
                    <p class="duration-txt mb-0">
                        {{ $t("subscriptio.sub16") }}
                    </p>
                    <!-- <span class="btc-heading fw-5 mr-1">{{$t('subscriptio.sub17')}}</span> <span class="btc-heading fw-5 charges-txt">{{
                            item.products[item.activeProduct ? item.activeProduct : 0].yearlyrate * 100
                    }}%</span> -->
                </a-col>
            </a-row>
            <a-divider class="mt-0 mb-3" />
            <div class="px-3">
                <a-row :gutter="16" class="mb-2">
                    <a-col :lg="14">
                        <span class="btc-heading mr-2 fw-4">{{
                            $t("subscriptio.sub17")
                        }}</span>
                    </a-col>
                    <a-col :lg="10" align="end">
                        <span class="btc-heading charges-txt fw-4">{{
                            item.products[
                                item.activeProduct ? item.activeProduct : 0
                            ].yearlyrate * 100
                        }}%</span>
                    </a-col>
                </a-row>
                <!-- <a-row :gutter="16" class="mb-3">
                <a-col :lg="14">
                    <span class="btc-heading fw-5 mr-1 status-txt">{{$t('subscriptio.sub18')}}</span>
                </a-col>
                <a-col :lg="10" align="end">
                    <span class="btc-heading fw-5 mb-0 ongoing-txt">{{
                            item.products[item.activeProduct ? item.activeProduct : 0].yearlyrate * 100
                    }}%</span>
                </a-col>
            </a-row> -->
                <a-row :gutter="16" class="mb-4">
                    <a-col :lg="14">
                        <span class="btc-heading fw-4 mr-1">{{
                            $t("subscriptio.sub18")
                        }}</span>
                    </a-col>
                    <a-col :lg="10" align="end">
                        <span class="btc-heading fw-4 mb-0 ongoing-txt">{{
                            status[
                                item.products[
                                    item.activeProduct ? item.activeProduct : 0
                                ].status
                            ]
                        }}</span>
                    </a-col>
                </a-row>
                <a-row v-if="tab == '1' || tab == '3'">
                    <a-col :lg="24">
                        <div class="all-product-tabs">
                        <a-tabs v-model="activeRadio" type="editable-card" hide-add @change="onTabChange">
                            <!-- <div class="radio-financial-btn"> -->
                            <a-tab-pane v-for="(product, i) in item.products" :key="i" :tab="product.cycle + ' ' + $t('subscriptio.sub5')" :closable="false" 
                                 >
                                <img src="/images/orange-bg-tick.svg" class="tick-img" v-if="activeRadio == i" />

                                </a-tab-pane>
                            <!-- </div> -->
                        </a-tabs>
                    </div>

                        <!-- <a-radio-group v-model="activeRadio" :default-value="activeRadio" button-style="solid">
                            <div class="radio-financial-btn">
                                <a-radio-button v-for="(product, i) in item.products" v-bind:key="product.id"
                                    @click="termChange(item_index, i)" :value="i">
                                    <img src="/images/orange-bg-tick.svg" class="tick-img" v-if="activeRadio == i" />

                                    {{ product.cycle }}
                                    {{ $t("subscriptio.sub5") }}</a-radio-button>
                            </div>
                        </a-radio-group> -->
                    </a-col>
                </a-row>
                <a-row v-if="tab == '1' || tab == '3'">
                    <a-col :lg="24" class="pt-4">
                        <p class="mb-0 selled-btc fw-4">
                            {{ $t("subscriptio.sub24") }}:
                            <span class="selled-desc text-black fw-5">{{
                                item.products[
                                    item.activeProduct
                                        ? item.activeProduct
                                        : 0
                                ].selledamount
                            }}
                                {{ item.currencyname }}</span>
                        </p>
                        <a-progress :percent="(item.products[
                            item.activeProduct ? item.activeProduct : 0
                        ].selledamount *
                            100) /
                            item.products[
                                item.activeProduct ? item.activeProduct : 0
                            ].expectamount
                            " />
                        <p class="mb-0 mt-1 selled-btc fw-4 text-right">
                            {{ $t("subscriptio.sub19") }}:<span class="selled-desc text-black fw-5">
                                {{
                                    item.products[
                                        item.activeProduct
                                            ? item.activeProduct
                                            : 0
                                    ].expectamount
                                }}
                                {{ item.currencyname }}</span>
                        </p>
                    </a-col>
                </a-row>
                <!-- <a-card class="mt-4 counter-card" :bordered="false">
                    <a-row>
                        <a-col class="first-card" :lg="6" align="center">
                            <p class="mb-0 counter-month fw-6">{{ days }}</p>
                            <p class="mb-0 counter-days fw-5">
                                {{ $t("subscriptio.sub5") }}
                            </p>
                        </a-col>

                        <a-col class="first-card" :lg="6" align="center">
                            <p class="mb-0 counter-month fw-6">{{ hours }}</p>
                            <p class="mb-0 counter-days fw-5">
                                {{ $t("subscriptio.sub20") }}
                            </p>
                        </a-col>

                        <a-col class="first-card" :lg="6" align="center">
                            <p class="mb-0 counter-month fw-6">{{ minutes }}</p>
                            <p class="mb-0 counter-days fw-5">
                                {{ $t("subscriptio.sub21") }}
                            </p>
                        </a-col>

                        <a-col class="" :lg="6" align="center">
                            <p class="mb-0 counter-month fw-6">{{ seconds }}</p>
                            <p class="mb-0 counter-days fw-5">
                                {{ $t("subscriptio.sub22") }}
                            </p>
                        </a-col>
                    </a-row>
                </a-card> -->

                <a-row>
                    <a-col :lg="24">
                        <a-button v-if="tab == '1' || tab == '2'" class="subscription-btn fw-5 mt-4"
                            :class="item.products[item.activeProduct ? item.activeProduct : 0].selledamount >= item.products[item.activeProduct ? item.activeProduct : 0].maxbuyamount ? 'disabled-btn' : ''"
                            block @click="
                                subscriptionBtnModel(
                                    tab,
                                    item.currencyname,
                                    item.activeProduct ? item.activeProduct : 0,
                                    item_index
                                )
                                ">{{ item.products[item.activeProduct ? item.activeProduct :
        0].selledamount >= item.products[item.activeProduct ? item.activeProduct : 0].maxbuyamount ?
        $t("manage.soldOut") : $t("manage.sub") }}</a-button>
                        <a-button v-else class="subscription-btn fw-5 mt-4" block @click="
                            subscriptionBtnModel(
                                tab,
                                item.products[0].symbleinfo.descriptions,
                                item.activeProduct ? item.activeProduct : 0,
                                item_index
                            )
                            ">{{ $t("manage.sub") }}</a-button>
                    </a-col>
                </a-row>
            </div>
        </a-card>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => { },
        },
        termChange: {
            type: Function,
        },
        subscriptionBtnModel: {
            type: Function,
        },
        item_index: {
            type: Number,
        },
        allIcons: {
            type: Array,
        },
        tab: {
            type: String,
        },
        dateNow: {
            type: String,
        },
    },
    data() {
        return {
            status: [
                this.$t("stratergybot.sb18"),
                this.$t("stratergybot.sb17"),
                this.$t("stratergybot.sb19"),
            ],
            activeRadio: 0,
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            componentInterval: "",
        };
    },
    methods: {
        onTabChange(tab){
            this.termChange(this.item_index, tab)
        },
        getTimeRemaining() {
            const endtime =
                this.item.products[
                    this.item.activeProduct ? this.item.activeProduct : 0
                ].finishselltime;
            this.total = Date.parse(endtime) - Date.parse(this.dateNow);
            this.seconds = Math.floor((this.total / 1000) % 60);
            this.minutes = Math.floor((this.total / 1000 / 60) % 60);
            this.hours = Math.floor((this.total / (1000 * 60 * 60)) % 24);
            this.days = Math.floor(this.total / (1000 * 60 * 60 * 24));
            this.componentInterval = setInterval(() => {
                if (this.seconds != 0) {
                    this.seconds = this.seconds - 1;
                } else {
                    if (this.minutes != 0) {
                        this.minutes = this.minutes - 1;
                        this.seconds = 59;
                    } else {
                        if (this.hours != 0) {
                            this.hours = this.hours - 1;
                            this.minutes = 59;
                            this.seconds = 59;
                        } else {
                            if (this.days != 0) {
                                this.days = this.days - 1;
                                this.hours = 23;
                                this.minutes = 59;
                                this.seconds = 59;
                            } else {
                                clearInterval(this.componentInterval);
                            }
                        }
                    }
                }
            }, 1000);
        },
    },
    mounted() {
        this.getTimeRemaining();
    },
    beforeDestroy() {
        clearInterval(this.componentInterval);
    },
};
</script>

<style lang="scss">
.ant-tabs-tab-prev.ant-tabs-tab-arrow-show, .ant-tabs-tab-next.ant-tabs-tab-arrow-show {
width: 12px;
}
.ant-tabs-nav-container-scrolling {
    padding-right: 15px;
    padding-left: 15px;
}
</style>
