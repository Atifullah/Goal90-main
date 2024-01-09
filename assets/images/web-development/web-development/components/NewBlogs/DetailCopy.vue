<template>
    <div>
        <div class="blogs-header">
            <div class="main-content">
                <p class="blog-main-heading mb-0 text-black fw-5">
                    <nuxt-link to="/new-blogs"><img src="/images/gray-icon-left.svg" class="gray-icon" /></nuxt-link> {{
                        $t("keyWords.blog1") }}
                </p>
            </div>
        </div>

        <div class="main-content">
            <a-row :gutter="16">
                <a-col :lg="16">
                   <!--  <AppLoading v-if="loadingArticleDetail" /> -->
                    <!-- <a-row v-else>
                        <a-col :lg="19">
                            <p class="fw-5 detail-heading text-black mt-6 mb-2">{{ subItem.title }}</p>
                            <p class="desc fw-4 text-black">Welcome to the world of Ethereum staking on Binance! Whether
                                you’re
                                new to cryptocurrency or a seasoned investor, understanding the ins and outs of ETH staking
                                is crucial in the ever-evolving crypto landscape. Read on for a guide to Binance ETH
                                Staking, detailing what it is, how you can participate, and what rewards you can expect in
                                return.</p>
                            <p class="date-text mb-5">2023-11-27</p>
                            <p class="text-black sub-title mb-3 fw-5">Building Trust in the Crypto Ecosystem</p>
                            <p class="desc fw-4 text-black mb-5">Welcome to the world of Ethereum staking on Binance!
                                Whether
                                you’re new to cryptocurrency or a seasoned investor, understanding the ins and outs of ETH
                                staking is crucial in the ever-evolving crypto landscape. Read on for a guide to Binance ETH
                                Staking, detailing what it is, how you can participate, and what rewards you can expect in
                                return.</p>
                            <img src="/images/blog-detail.svg" class="mb-5" />
                            <p class="desc fw-4 text-black mb-4">WAs I have said on Twitter earlier, it is an honor and with
                                the deepest humility that I step into the role of Binance’s CEO, succeeding the visionary
                                founder of this incredible company. Over the past six years, Binance has laid a foundation
                                that has positioned it for decades of continued growth and success. Now, my role is to lead
                                our talented and committed team into that future while respecting and learning from the
                                past. This, together with the trust placed on us by our 160M+ users, are heavy
                                responsibilities that I take seriously.</p>
                            <p class="desc fw-4 text-black mb-4">A cornerstone of this organization has always been the idea
                                that innovation should bring value to users. The best way to put this principle into
                                practice – the Binance way – is to consistently deliver best-in-class products that people
                                use and find valuable. As Binance’s new CEO, I am determined to keep steady on this course.
                                We will remain committed to product excellence as we continue to blaze the trail of
                                financial innovation.</p>
                            <p class="desc fw-4 text-black mb-5">I accepted this role with the support of CZ and our
                                leadership team. My commitment is to work tirelessly so that we can meet and exceed the
                                expectations of all stakeholders while achieving our core mission: the freedom of money.
                                With three decades of financial services and regulatory experience under my belt, I
                                understand the unique challenges and opportunities that our industry presents, and I am
                                dedicated to steering us through crypto winters and summers alike.</p>
                        </a-col>
                    </a-row> -->
                    <a-row>
                        <a-col :lg="19">
                            <p class="fw-5 detail-heading text-black mt-6 mb-2">{{ subItem.title }}</p>
                            <p class="desc fw-4 text-black" v-html="subItem.remark"></p>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="8">
                    <div class="share-posts-icon mt-6">
                        <div class="icon-box cursor" @click="manageSupport('support')" :loading="supporting">
                            <img src="/images/black-like.svg" />
                            <p class="mt-2 fw-5 count mb-0 text-center">{{ supportedCount }}</p>
                        </div>
                        <div class="icon-box cursor" @click="manageSupport('not-support')" :loading="supporting">
                            <img src="/images/black-unlike.svg" />
                            <p class="mt-2 fw-5 count mb-0 text-center"> {{ noSupportedCount }} </p>
                        </div>
                    </div>
                    <p class="fw-5 text-black share-post mt-6">Share Posts</p>
                    <div class="share-posts-icon">
                        <div class="icon-box cursor" @click="shareOnLinkedIn" target="_blank">
                            <img src="/images/gray-facebook.svg" />
                        </div>
                        <div class="icon-box cursor" @click="shareOnLinkedIn" target="_blank">
                            <img src="/images/gray-medium.svg" />
                        </div>
                        <div class="icon-box cursor" @click="shareOnLinkedIn" target="_blank">
                            <img src="/images/gray-discord.svg" />
                        </div>
                        <div class="icon-box cursor" @click="shareOnLinkedIn" target="_blank">
                            <img src="/images/gray-linkedin.svg" />
                        </div>
                        <div class="icon-box cursor" @click="shareOnTwitter" target="_blank">
                            <img src="/images/gray-medium-x.svg" />
                        </div>
                        <div class="icon-box cursor" @click="shareOnTelegram" target="_blank">
                            <img src="/images/gray-telegram.svg" />
                        </div>
                    </div>
                    <p class="mt-6 fw-5 text-black share-post mb-0">Popular crytocurrencies</p>
                    <div class="right-side">
                        <SpotMarket :getClientExchangeRate="getClientExchangeRate" :marketdata="marketData" tab="2"
                            key="2" />
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import SpotMarket from '~/components/market/SpotMarket.vue'
import { mapGetters, mapActions } from "vuex";
import AppLoading from "../AppLoading.vue";
/* import PopularCryptoCurrencies from "./PopularCryptoCurrencies.vue"; */
import AppPagination from "../AppPagination.vue";
export default {
    components: {
        SpotMarket,
        AppLoading,
        AppPagination,
    },
    data() {
        return {
            marketData: [],
        }
    },
    computed: {
        ...mapGetters("market", [
            "getCurrencyDetail",
            "getCurrencyGraphData",
            "getSpotMarkets",
            "getCurrencySpotMarket",
            "getCurrencyMarginMarket",
            "getCurrencyFutureMarket",
            "getCurrencyTradeData",
            "getFavoriteList",
        ]),
        ...mapGetters("article", ["getSubItem"]),
        ...mapGetters("general", [
            "loadingArticleDetail",
            "supporting",
            "notSupporting",

        ]),
        subItem() {
            return this.getSubItem;
        }, 
        selfRoute: function () {
            return this.$store.state.route;
        },
        totalSupport: {
            get() {
                return this.supportedCount + this.noSupportedCount;
            },
        },
        userOperation() {
            return this.getSubItem.useroper ? this.getSubItem.useroper : {};
        },
        supportedCount: {
            get() {
                const metaData = this.getSubItem.data
                    ? this.getSubItem.data
                    : {};
                // console.log("support nummmm", metaData.supportnum)
                return metaData.supportnum;
            },
            set(value) {
                // You can optionally define a setter function to update the value of `supportedCount`
                const metaData = this.getSubItem.data
                    ? this.getSubItem.data
                    : {};
                metaData.supportnum = value;
            },
        },
        noSupportedCount: {
            get() {
                const metaData = this.getSubItem.data
                    ? this.getSubItem.data
                    : {};
                return metaData.notsupportnum;
            },
            set(value) {
                // You can optionally define a setter function to update the value of `supportedCount`
                const metaData = this.getSubItem.data
                    ? this.getSubItem.data
                    : {};
                metaData.notsupportnum = value;
            },
        },
        shareCount: {
            get() {
                const metaData = this.getSubItem.data
                    ? this.getSubItem.data
                    : {};
                return metaData.sharecount;
            },
            set(value) {
                const metaData = this.getSubItem.data
                    ? this.getSubItem.data
                    : {};
                metaData.sharecount = value;

            },
        },
    },
    watch: {
        getCurrencyGraphData: function () {
            this.mcharts();
        },
        getSpotMarkets: function (val) {
            this.marketData = val;
        },
    },
    methods: {
        ...mapActions("market", [
            "fetchQuotationDailyData",
        ]),
        ...mapActions("article", ["saveSupportNotSupport"]),
        getClientExchangeRate(tradeData) {
            if (tradeData.symble) {
                let symble = tradeData.symble.split("/");
                if (symble.length > 1) {
                    symble = symble[1];
                }
                return this.$store.getters.get_client_exchange_rate(
                    symble,
                    tradeData.c
                );
            }
        },
        manageSupport: async function (requestType) {
            const object = {
                articleID: this.subItem.id,
                isSupport: false,
                isNoSupport: false,
                isShare: false,
            };

            if (requestType == "support") {
                object.isSupport = true;
            } else if (requestType == "not-support") {
                object.isNoSupport = true;
            }
            else if (requestType === "share-support") {
                // Always count shares
                object.isShare = true;
                // console.log("share", object.isShare)
            }

            if (
                this.isRequesting ||
                this.userOperation.issupport == true ||
                this.userOperation.isnosupport == true || this.userOperation.isShare == true

            ) {
                return;

            }
            this.isRequesting = true;
            const response = await this.saveSupportNotSupport(object);
            this.isRequesting = false;
            //console.log("manageSupport response: ", response);
            if (response.code == 200) {
                // console.log(response)
                if (response.data) {
                    // console.log(response.data)
                    if (requestType == "support") {
                        this.userOperation.issupport = true;
                        const supportCount = this.supportedCount;
                        this.supportedCount = supportCount + 1;
                    } else if (requestType == "not-support") {
                        this.userOperation.isnosupport = true;
                        const notSupportCount = this.noSupportedCount;
                        this.noSupportedCount = notSupportCount + 1;
                    }
                    else if (requestType === "share-support") {
                        // Increment share count
                        const issharecount = this.shareCount;
                        this.shareCount = issharecount + 1;
                    }
                }
            }
        },


        activeRoute: function (route) {
            const router = this.$route;
            let activeClass = "";
            if (router.fullPath == route) {
                activeClass = "visited-link";
            }
            return activeClass;
        },
        // share the url into twitter 
        async shareOnTwitter() {
            // Get the current URL from the browser's address bar
            const currentURL = window.location.href;

            // Prepare the Twitter share link
            const twitterShareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`;
            // console.log("Share Count Updated");


            // Open the Twitter share link in a new window or tab
            window.open(twitterShareLink, '_blank');

            // Check if the Twitter window is closed or blocked by a popup blocker
            if (!twitterWindow || twitterWindow.closed || typeof twitterWindow.closed === 'undefined') {
                // Handle the case where the Twitter share window is blocked or closed
                this.$store.commit('set_message', { type: 'error', text: this.$t('twitterShareBlockedErrorMessage') });
                return;
            }

            // Perform an API request to increment the shareCount
            const object = {
                articleID: this.subItem.id,
                isSupport: false,
                isNoSupport: false,
                isShare: true, // Set isShare to true for a share operation
            };

            if (this.isRequesting || this.userOperation.isShare) {
                return;
            }

            try {
                // Make the API request to increment the shareCount
                this.isRequesting = true;
                const response = await this.saveSupportNotSupport(object);
                this.isRequesting = false;

                if (response.code === 200) {
                    if (response.data) {
                        this.userOperation.isshare = true;
                        // Increment share count
                        const supportCount = this.shareCount;
                        this.shareCount = supportCount + 1;
                        // console.log("Share Count Updated");
                    }
                }
            } catch (err) {
                // Handle errors, if any
                this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt13') });
            }
        }
        ,
        async shareOnLinkedIn() {
            const currentURL = window.location.href;
            const linkedInShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`;
            window.open(linkedInShareLink, '_blank');
            if (!linkedInWindow || linkedInWindow.closed || typeof linkedInWindow.closed === 'undefined') {
                this.$store.commit('set_message', { type: 'error', text: this.$t('linkedInShareBlockedErrorMessage') });
                return;
            }
            const object = {
                articleID: this.subItem.id,
                isSupport: false,
                isNoSupport: false,
                isShare: true, // Set isShare to true for a share operation
            };

            if (this.isRequesting || this.userOperation.isShare) {
                return;
            }

            try {
                // Make the API request to increment the shareCount
                this.isRequesting = true;
                const response = await this.saveSupportNotSupport(object);
                this.isRequesting = false;

                if (response.code === 200) {
                    if (response.data) {
                        this.userOperation.isshare = true;
                        // Increment share count
                        const shareCount = this.shareCount;
                        this.shareCount = shareCount + 1;
                        // console.log("Share Count Updated");
                    }
                }
            } catch (err) {
                // Handle errors, if any
                this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt13') });
            }
        },
        shareOnTelegram() {
            // Get the current URL from the browser's address bar
            const currentURL = window.location.href;

            // Prepare the Telegram share link
            const telegramShareLink = `https://t.me/share/url?url=${encodeURIComponent(currentURL)}`;

            // Open the Telegram share link in a new window or tab
            window.open(telegramShareLink, '_blank');

            // Increment the share count
            this.shareCount += 1;
        },
        async copyLinkToClipboard(requestType) {
            const object = {
                articleID: this.subItem.id,
                isSupport: false,
                isNoSupport: false,
                isShare: false,
            };

            // Get the current URL from the browser's address bar
            const currentURL = window.location.href;

            // Create a temporary input element to copy the URL to the clipboard
            const tempInput = document.createElement('input');
            tempInput.value = currentURL;
            document.body.appendChild(tempInput);
            tempInput.select();

            if (requestType === "share-support") {
                // Always count shares
                object.isShare = true;
                // console.log("share", object.isShare);
            }

            if (this.isRequesting || this.userOperation.isShare) {
                return;
            }

            try {
                // Use the Clipboard API to copy the URL to the clipboard
                document.execCommand('copy');
                // Show a success message
                this.$store.commit('set_message', { type: 'ok', text: this.$t('patch.copysuccess') });

                // Make an API request to increment the shareCount if requestType is "share-support"
                if (requestType === "share-support") {
                    this.isRequesting = true;
                    const response = await this.saveSupportNotSupport(object);
                    this.isRequesting = false;

                    if (response.code === 200) {
                        if (response.data) {
                            this.userOperation.isshare = true;
                            // Increment share count
                            const supportCount = this.shareCount;
                            this.shareCount = supportCount + 1;
                            // this.shareCount += 1;
                            // console.log("Share Count Updated");
                        }
                    }
                }
            } catch (err) {
                // Handle errors, if any
                this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt13') });
            } finally {
                // Delay before removing the temporary input element
                setTimeout(() => {
                    document.body.removeChild(tempInput);
                }, 100); // Adjust the delay time as needed
            }
        },
    },
    mounted() {
        const dailyDetailObject = {
            iscontract: 2,
            displaylocation: 2,
            size: 100,
        };
        this.fetchQuotationDailyData(dailyDetailObject);
        console.log('getSubItem data:', this.getSubItem);
    }
}
</script>

<style></style>