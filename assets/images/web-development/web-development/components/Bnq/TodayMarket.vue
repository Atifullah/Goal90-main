<template>
    <div class="today-market mt-4">
        <a-card class="market-card" :bordered="false">
            <p class="market-title mb-3 text-black">{{ $t('bnq.buy_bnq') }}</p>
            <p class="market-desc mb-5">{{ $t('bnq.bnq_user') }}</p>
            <a-row>
                <a-col :lg="12">
                    <div class="vote-button">
                        <button class="item good cursor" v-if="isUserVotedToday">{{ (supportPercentagex).toFixed(2)
                        }}%</button>
                        <button class="item good cursor" v-else :data-text="$t('bnq.yes')"
                            @click="handleBullishClick(true, false)"></button>
                    </div>

                </a-col>
                <a-col :lg="12">
                    <div class="red-button">
                        <button class="item good cursor" v-if="isUserVotedToday">{{ (notSupportPercentagex).toFixed(2)
                        }}%</button>
                        <button class="item good cursor" v-else :data-text="$t('tableskeys.tt1')"
                            @click="handleBullishClick(false, true)">
                        </button>
                    </div>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            bullishBearishArticleId: null,
            supportPercentagex: 0,
            notSupportPercentagex: 0,
            isUserVotedToday: false,
        }
    },

    computed: {
        loggedIn() {
            return this.$userinfo.uid != undefined;
        },
        bnqCurrencyObject() {
            const symbleinfo = this.$store.state.currencyinfos;
            return symbleinfo.find((item) => item.currencyname && item.currencyname.includes('BNQ'));
        },
        shouldGetInitData() {
            return this.loggedIn && this.bullishBearishArticleId
        }
    },
    watch: {

        bnqCurrencyObject: {
            handler(val) {
                this.bullishBearishArticleId = val.id
            },
            deep: true,
            immediate: true, // Trigger the handler immediately when the component is mounted
        },
        shouldGetInitData: {
            handler(bool) {
                if (bool) {
                    this.getBullishBearishData()
                }
            },
            deep: true,
            immediate: true, // Trigger the handler immediately when the component is mounted
        }
    },
    methods: {
        ...mapActions("article", ["saveSupportNotSupport", "fetchBullishBearishData"]),
        // support and vote for bullish and bearish
        async handleBullishClick(support, notsupport) {

            if (!this.loggedIn) {
                return this.$router.push('/login?returnurl=' + this.$route.path)
            }

            // First API call to set support
            const object = {
                articleID: this.bullishBearishArticleId + "",
                isSupport: support,
                isNoSupport: notsupport
            };
            const response = await this.saveSupportNotSupport(object);

            if (response.code == 200) {
                this.getBullishBearishData()
            }

        },
        async getBullishBearishData() {

            const responsex = await this.fetchBullishBearishData({ articleID: this.bullishBearishArticleId + "" })

            // Calculate the percentage
            const data = responsex.data

            const isSupportNum = data.data.supportnum;
            const isNotSupportNum = data.data.notsupportnum;
            const totalVotes = (isSupportNum + 100) + (isNotSupportNum + 100);
            const supportPercentage = ((isSupportNum + 155) / (totalVotes)) * 100;
            const notsupportPercentage = ((isNotSupportNum + 45) / (totalVotes)) * 100;
            this.supportPercentagex = supportPercentage
            this.notSupportPercentagex = notsupportPercentage
            this.isUserVotedToday = data.useroper.issupport == true || data.useroper.isnosupport == true
        },
    }
}
</script>

<style></style>