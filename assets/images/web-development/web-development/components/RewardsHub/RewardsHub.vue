<template>
    <div class="">
        <div class="reward-header">
            <div class="main-content">
                <a-row :gutter="16" class="col-alignment">
                    <a-col :lg="14" :xl="14">
                        <p class="heading fw-5 mb-2">
                            {{ $t("rewardhub.rew5") }}
                        </p>
                        <p class="desc fw-">{{ $t("rewardhub.rew6") }}</p>
                    </a-col>
                    <a-col :lg="9" :xl="7">
                        <a-card class="gray-card-bg" :bordered="false">
                            <a-row :gutter="16">
                                <a-col :lg="5">
                                    <img src="/images/total-reward.svg" />
                                </a-col>
                                <a-col :lg="16">
                                    <p class="mb-0 total-txt fw-4">
                                        {{ $t("rewardhub.rew8") }}
                                    </p>
                                    <p class="mb-0 total-price fw-5">
                                        {{
                                            $usersettings.moreconfig
                                                ?.fundsvisible
                                            ? total
                                            : "*******"
                                        }}
                                        USDT
                                    </p>
                                </a-col>
                                <a-col :lg="3" align="end" v-if="loggedIn">
                                    <img class="ml-2 pointer" :src="$usersettings.moreconfig
                                        ?.fundsvisible
                                        ? '/images/fin-hide.png'
                                        : '/images/fin-hide-active.svg'
                                        " @click="toggleFundVisible" height="15" />
                                </a-col>
                            </a-row>
                            <a-card :bordered="false" class="black-card-bg">
                                <a-row :gutter="24">
                                    <a-col :lg="8">
                                        <p class="mb-0 bonus-txt fw-4">
                                            {{ $t("rewardhub.rew12") }}
                                        </p>
                                        <p class="mb-0 fw-4 avail-txt">
                                            {{ $t("person.pd17") }}
                                        </p>
                                        <p class="mb-0 usdt-txt fw-5">
                                            {{
                                                $usersettings.moreconfig
                                                    ?.fundsvisible
                                                ? welfareAssets.deductamount
                                                : "*****"
                                            }}
                                            {{ getCurrency }}
                                        </p>
                                    </a-col>
                                    <a-col :lg="8">
                                        <p class="mb-0 bonus-txt fw-4">
                                            {{ $t("rewardhub.rew9") }}
                                        </p>
                                        <p class="mb-0 fw-4 avail-txt">
                                            {{ $t("person.pd17") }}
                                        </p>
                                        <p class="mb-0 usdt-txt fw-5">
                                            {{
                                                $usersettings.moreconfig
                                                    ?.fundsvisible
                                                ? welfareAssets.experienceamount
                                                : "*****"
                                            }}
                                            {{ getCurrency }}
                                        </p>
                                    </a-col>
                                    <a-col :lg="8">
                                        <p class="mb-0 bonus-txt fw-4">
                                            {{ $t("ico.ico8") }}
                                        </p>
                                        <p class="mb-0 fw-4 avail-txt">
                                            {{ $t("person.pd17") }}
                                        </p>
                                        <p class="mb-0 usdt-txt fw-5">
                                            {{
                                                $usersettings.moreconfig
                                                    ?.fundsvisible
                                                ? welfareAssets.experienceamount
                                                : "*****"
                                            }}
                                            {{ getCurrency }}
                                        </p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="rewards-hub-tabs">
            <div class="main-content">
                <div class="rewards-tabs">
                    <RewardTabs @onReceived="refreshRewardPricingCard" />
                </div>
                <div class="invite-bg mb-4">
                    <a-row :gutter="16">
                        <a-col :lg="22" :offset="1">
                            <p class="invite-heading fw-5 mb-2">
                                {{ $t("rewardhub.rew13") }}
                            </p>
                            <p class="invite-desc1 fw-5 mb-3">
                                {{ $t("rewardhub.rew14") }}
                            </p>
                            <a-button class="primary-btn fw-5 px-5 mt-2" @click="() => $router.push('/person/invitation')
                                ">{{ $t("rewardhub.rew15") }}</a-button>
                        </a-col>
                    </a-row>
                </div>
                <a-card :bordered="false" class="mt-3 pb-3">
                    <a-row class="py-4 mx-4">
                        <a-col :lg="24">
                            <Faqs :channelid="85" subtitle="reward-hub_faqs" :faqsPerPage="10"/>
                        </a-col>
                    </a-row>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
import RewardTabs from "@/components/RewardsHub/RewardTabs.vue";
import Faqs from "@/components/public/Faqs.vue";
export default {
    components: {
        RewardTabs,
        Faqs,
    },
    computed: {
        getCurrency() {
            if (this.welfareAssets.currencyid) {
                return this.$store.state.currencyinfos.filter(
                    (item) => item.id == this.welfareAssets.currencyid
                )[0].currencyname;
            } else {
                return "0 USDT";
            }
        },
        total() {
            if (this.welfareAssets.currencyid) {
                return (
                    this.welfareAssets.experienceamount +
                    this.welfareAssets.deductamount +
                    this.welfareAssets.airdrop
                );
            } else {
                return "0";
            }
        },
        loggedIn(){
            return this.$userinfo.uid != undefined
        }
    },
    data() {
        return {
            welfareAssets: {},
        };
    },
    methods: {
        async getWelfareAssets() {
            try {
                if (this.$userinfo.uid) {
                    const { data } = await this.$store.dispatch(
                        "get_wefareassets_get"
                    );
                    if (data) {
                        this.welfareAssets = data;
                    }
                    //console.log("get welfare asset refreash")
                }
            } catch (error) {
                //console.log('Error', error)
            }
        },
        async refreshRewardPricingCard(val) {
            if (val) {
                await this.getWelfareAssets();
                //console.log("updatedwarefare",val)
            }
        },
        toggleFundVisible() {
            this.$store
                .dispatch("user_user_settings_save", {
                    moreConfig: {
                        fundsVisible:
                            !this.$usersettings.moreconfig.fundsvisible,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        this.global_refresh_user_settings();
                    }
                });
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.getWelfareAssets();
        }
    },
};
</script>

<style></style>
