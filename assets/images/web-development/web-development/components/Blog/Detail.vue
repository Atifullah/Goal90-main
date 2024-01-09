    <template>
    <a-card :bordered="false" class="detail-main-card">
        <div class="main-content">
            <a-row :gutter="16">
                <a-col :lg="15" :xl="17">
                    <a-card :bordered="false" class="detail-card">
                        <AppLoading v-if="loadingArticleDetail" />
                        <template v-else>
                            <a-card :bordered="false" class="desc-card">

                                <a-row>
                                    <a-col :lg="24" :xl="20">
                                        <p class="mb-0 desc-text fw-5">
                                            {{ $t('details.det1') }}
                                            <a href="#">
                                                {{ $t('details.det2') }}
                                            </a>
                                        </p>
                                    </a-col>
                                </a-row>
                            </a-card>
                            <a-row>

                                <a-col :lg="24" class="pt-4">
                                    <p class="mb-1 detail-heading fw-7">
                                        {{ subItem.title }}
                                    </p>
                                    <p class="mb-1 desc-text fw-5">
                                        <span class="author-name">{{ subItem.source }}</span> {{
                                            global_get_local_time(subItem.updatetime).format('YYYY-MM-DD hh:mm a') }}
                                    </p>
                                    <p class="mb-4 republish-txt fw-4">
                                {{ $t('details.det3') }}
                            </p>
                                </a-col>
                            </a-row>
                          

                            <div class="detail-img mb-4" v-if="subItem.imgurl&&subItem.articletypename!='Blogs'">
                                <img :src="subItem.imgurl" />
                            </div>

                            <div class="pr-5 pb-4">
                                <div class="articles-desc-detail" v-html="subItem.remark"></div>
                            </div>

                            <a-divider class="news-divider" />
                            <a-row>
                                <a-col :lg="12" :offset="6">
                                    <div class="share-news">
                                        <div class="share fw-5">
                                            <a-popover :title="false" overlayClassName="share-popover">
                                                <template slot="content">
                                                    <div class="detail-social-icons">
                                                        <!-- <SocialLinks /> -->
                                                        <div class="social-icon mb-3">
                                                            <a-col :lg="24">
                                                                <a-row :gutter="16">
                                                                    <a-col class="mr-2" :lg="4">
                                                                        <a @click="shareOnLinkedIn" target="_blank">
                                                                            <img src="/images/linkedin-fill.svg" />
                                                                        </a>
                                                                    </a-col>
                                                                    <a-col :lg="4" class="mr-2">
                                                                        <a @click="shareOnTwitter" target="_blank">

                                                                            <img src="/images/twitter-fill.svg" />
                                                                        </a>
                                                                    </a-col>
                                                                    <a-col :lg="4" class="mr-2">
                                                                        <a @click="shareOnTelegram" target="_blank">
                                                                            <img src="/images/telegram-fill.svg" />
                                                                        </a>
                                                                    </a-col>
                                                                    <a-col :lg="4" class="mr-2">
                                                                        <a @click="copyLinkToClipboard('share-support')"
                                                                            target="_blank">

                                                                            <img src="/images/copy-icon.svg" height="24px"/>
                                                                        </a>
                                                                    </a-col>
                                                                </a-row>
                                                            </a-col>
                                                        </div>

                                                    </div>
                                                </template>
                                                <a @click="manageSupport('share-support')" class="cursor fw-5"
                                                    :loading="supporting" v-bind:class="userOperation.isShare
                                                        ? 'thumbs-up-btn'
                                                        : 'thumbs-neutral-btn'
                                                        ">
                                                    <img src="/images/share.svg" class="pr-2" />
                                                    {{ $t('play_game.pg26') }}
                                                </a>

                                            </a-popover>
                                        </div>

                                        <div class="share fw-5">
                                            <a @click="manageSupport('support')" class="cursor fw-5" :loading="supporting"
                                                v-bind:class="userOperation.issupport
                                                    ? 'thumbs-up-btn'
                                                    : 'thumbs-neutral-btn'
                                                    ">
                                                <img :src="userOperation.issupport
                                                    ? '/images/thumbs-up-active.svg'
                                                    : '/images/thumbs-up.svg'
                                                    " class="pr-2" />
                                                <!-- {{ supportedCount }} -->
                                                {{ $t('extra.extra2') }}
                                            </a>
                                        </div>

                                        <div class="share fw-5">
                                            <a @click="manageSupport('not-support')" class="cursor fw-5"
                                                :loading="supporting" v-bind:class="userOperation.issupport
                                                    ? 'thumbs-up-btn'
                                                    : 'thumbs-neutral-btn'
                                                    ">
                                                <img :src="userOperation.isnosupport
                                                    ? '/images/thumbs-down-active.svg'
                                                    : '/images/thumbs-down.svg'" class="pr-2" />
                                                {{ $t('extra.extra3') }}
                                            </a>
                                        </div>
                                    </div>
                                </a-col>
                            </a-row>

                            <!-- dont remove -->
                            <a-divider class="news-divider" />
                            <!-- <a-tabs default-active-key="1" class="mb-5">
                                <a-tab-pane key="1" tab="Comment 0"> </a-tab-pane>
                            </a-tabs>  -->
                            <p class="news-heading mb-5 pt-2 fw-7">{{ $t('details.det4') }} ({{
                                commentsPagination.totalItemCount }})</p>
                            <a-row :gutter="16">
                                <a-col :lg="1" class="pt-3">
                                    <img src="/images/comment-user.svg" />
                                </a-col>
                                <a-col :lg="18" class="pl-5">
                                    <a-textarea class="comment-area" placeholder="Type your comment here"
                                        v-model="commentData.content" />
                                    <a-row :gutter="16" class="mt-3">
                                        <a-col :lg="12">
                                            <img src="/images/smile1.svg" class="pointer" />
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <a-button class="primary-btn fw-5 submit-btn" @click="createComment"
                                                :disabled="creatingArticleComment" :loading="creatingArticleComment">{{
                                                    $t('legalTrad.Submit') }}</a-button>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                            <!-- <p class="news-heading my-4 fw-7">{{ $t('details.det5') }} ({{
                                commentsPagination.totalItemCount }} )
                            </p> -->
                            <AppLoading v-if="loadingComments" />

                            <template v-else>
                                <div v-for="(comment, commentIndex) in articleComments" v-if="articleComments.length>0" v-bind:key="commentIndex">
                                    <a-row :gutter="16" class="mt-4 pt-2 comment-row">
                                        <a-col :lg="1" class="pt-1">
                                            <img class="user-image" :src="comment?.logo" />
                                        </a-col>
                                        <a-col :lg="18" class="pl-5">
                                            <p class="news-detail-desc mb-3 fw-7">{{ comment?.nickname }}</p>
                                            <p class="news-detail-desc mb-3 fw-5">{{ comment?.content }} </p>

                                            <a-row :gutter="16">
                                                <a-col :lg="12">
                                                    <p class="like-share fw-5 mb-0">{{ comment?.createTime }}</p>
                                                </a-col>
                                                <a-col :lg="12" align="end" class=" d-none">
                                                    <p class="mb-0 news-detail-desc fw-5">
                                                        <img src="/images/message.svg" class="pr-2" />{{ $t('details.det6')
                                                        }}
                                                        <span class="pl-4">
                                                            <img src="/images/outline-like.svg" class="pr-2" />25
                                                        </span>
                                                    </p>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16" class="mt-4 pt-2  d-none">
                                                <a-col :lg="2" :xl="1" class="pt-1">
                                                    <img src="/images/user3.svg" />
                                                </a-col>
                                                <a-col :lg="22" :xl="23" class="pl-5">
                                                    <p class="news-detail-desc mb-3 fw-7">CRYPTO_JENNAFX_ON_lG</p>
                                                    <p class="news-detail-desc mb-3 fw-5">{{ $t('details.det7') }}</p>
                                                    <a-row :gutter="16">
                                                        <a-col :lg="12">
                                                            <p class="like-share fw-5 mb-0">08-01 07:57<span
                                                                    class="pl-3">Jiangsu</span>
                                                            </p>
                                                        </a-col>
                                                        <a-col :lg="12" align="end">
                                                            <p class="mb-0 news-detail-desc fw-5"><img
                                                                    src="/images/message.svg" class="pr-2" />{{
                                                                        $t('details.det8') }}
                                                                <span class="pl-4"><img src="/images/outline-like.svg"
                                                                        class="pr-2" />25</span>
                                                            </p>
                                                        </a-col>
                                                    </a-row>
                                                    <div class="pt-4">
                                                        <a-textarea class="comment-area"
                                                            placeholder="Type your comment here" />
                                                        <a-row :gutter="16" class="mt-3">
                                                            <a-col :lg="12">
                                                                <img src="/images/smile1.svg" />
                                                            </a-col>
                                                            <a-col :lg="12" align="end">
                                                                <a-button class="primary-btn fw-5 submit-btn">{{
                                                                    $t('legalTrad.Submit') }}</a-button>
                                                            </a-col>
                                                        </a-row>
                                                    </div>
                                                    <a-row :gutter="16" class="mt-3">
                                                        <a-col :lg="24">
                                                            <p class="mb-5 news-time fw-5">{{ $t('details.det9') }}
                                                                <a-icon type="down" />
                                                            </p>
                                                        </a-col>
                                                    </a-row>
                                                </a-col>
                                            </a-row>

                                        </a-col>
                                    </a-row>
                                </div>
                            </template>


                            <a-row>
                                <a-col :lg="24" class="text-right">
                                    <AppPagination v-if="commentsPagination.totalItemCount > 0"
                                        :paginatedObject="commentsPagination" @onChange="getMoreData" />
                                </a-col>
                            </a-row>

                        </template>
                    </a-card>
                </a-col>

                <a-col :lg="9" :xl="7">
                    <!-- <a-card :bordered="false" class="right-card">
                        <p class="mb-2 bit-logo fw-7 text-center">
                            <img src="/images/bit.svg" class="pr-1" />
                        </p>
                        <p class="mb-1 bit-heading fw-7 text-center">{{ $t('footer.fm1') }}</p>
                        <p class="news-time fw-5 text-center mx-3">
                            {{ $t('details.det10') }}
                        </p>
                        <div class="share-news share-card-bg mt-4">
                            <div class="share fw-5">
                                <p class="mb-1 fw-7 news-detail-desc">
                                    {{ noSupportedCount }}
                                </p>
                                <p class="like-share fw-5 mb-0">{{ $t('extra.extra3') }}</p>
                            </div>
                            <div class="share fw-5">
                                <p class="mb-1 fw-7 news-detail-desc">
                                    {{ supportedCount }}
                                </p>
                                <p class="like-share fw-5 mb-0">{{ $t('details.det11') }}</p>
                            </div>
                            <div class="share fw-5">
                                <p class="mb-1 fw-7 news-detail-desc">

                                    {{ shareCount }}
                                </p>
                                <p class="like-share fw-5 mb-0">
                                    {{ $t('details.det12') }}
                                </p>
                            </div>
                        </div>
                    </a-card> -->
<!-- 
                    <a-card :bordered="false" class="right-card first-right-card mt-3">
                        <p class="news-heading fw-7 mb-3">{{ $t('details.det14') }}</p>

                        <div class="">
                            <a-row v-for="(sub_item, subItemIndex) in newsSubItems.slice(0, 10)" v-bind:key="subItemIndex" class="pr-2"
                                v-bind:class="activeRoute(sub_item.redirectTo)">
                                <a-col :lg="24">
                                    <a :href="sub_item.articlehref" v-if="sub_item.articlehref" target="_blank"
                                        class="link-txt">
                                        <p class="news-detail-desc fw-5 mb-1">
                                            {{ sub_item.title.substr(0, 80) }}
                                        </p>
                                    </a>
                                    <nuxt-link :to="sub_item.redirectTo" v-else>
                                        <p class="mb-1 news-title fw-5">
                                            {{ sub_item.title.substr(0, 80) }}
                                        </p>
                                    </nuxt-link>

                                    <p class="mb-0 like-share fw-5">
                                        {{ sub_item.updateTime }}
                                    </p>
                                </a-col>
                                <a-col :lg="24">
                                    <a-divider class="my-3 detail-new-divider" />
                                </a-col>
                            </a-row>
                        </div>

                    </a-card> -->





                    <a-card :bordered="false" class="right-card first-right-card">
                        <p class="news-heading fw-7 mb-3">{{ $t('details.det14') }}</p>

                        <div class="scroll_div">
                            <a-row v-for="(sub_item, subItemIndex) in subItems" v-bind:key="subItemIndex" class="pr-2"
                                v-bind:class="activeRoute(sub_item.redirectTo)">
                                <a-col :lg="24">
                                    <a :href="sub_item.articlehref" v-if="sub_item.articlehref" target="_blank"
                                        class="link-txt">
                                        <p class="news-detail-desc fw-5 mb-1">
                                            {{ sub_item.title.substr(0, 80) }}
                                        </p>
                                    </a>
                                    <nuxt-link :to="sub_item.redirectTo" v-else>
                                        <p class="mb-1 news-title fw-5">
                                            {{ sub_item.title.substr(0, 80) }}
                                        </p>
                                    </nuxt-link>

                                    <p class="mb-0 like-share fw-5">
                                        {{ sub_item.updateTime }}
                                    </p>
                                </a-col>
                                <a-col :lg="24">
                                    <a-divider class="my-3 detail-new-divider" />
                                </a-col>
                            </a-row>
                        </div>

                    </a-card>
                    <a-card :bordered="false" class="right-card mt-3">
                        <p class="news-heading fw-7 mb-3">
                            {{ $t('details.det13') }}
                        </p>

                        <PopularCryptoCurrencies />
                        <div class="mt-4">
                            <!-- <nuxt-link to="/market" class="">View more markets ></nuxt-link> -->
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppCollapsePanel from "../AppCollapsePanel.vue";
import AppLoading from "../AppLoading.vue";
import PopularCryptoCurrencies from "./PopularCryptoCurrencies.vue";
import AppPagination from "../AppPagination.vue";
// import SocialLinks from "../App/SocialLinks.vue";

export default {
    components: {
        AppCollapsePanel,
        AppLoading,
        // SocialLinks,
        PopularCryptoCurrencies,
        AppPagination,

    },
    data() {
        return {
            hoverKey: '',
            commentData: {
                content: '',
                // articleID:'',
                // commentID:'',
            },
            commentPageSize: 10,
        };
    },
    computed: {
        ...mapGetters("article", ["getSubItem", "getSubItems", "getArticleComments", "commentsPagination",  "getNewsSubItems"]),
        ...mapGetters("general", [
            "loadingArticleDetail",
            "supporting",
            "notSupporting",
            "creatingArticleComment",
            "loadingComments",
          
        ]),
        subItem() {
            return this.getSubItem;
        },
        subItems() {
            return this.getSubItems;
        },
        newsSubItems() {
            return this.getNewsSubItems;
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
        articleComments: function () {
            return this.getArticleComments
        }
    },
    methods: {
        ...mapActions("article", ["submitComment", "fetchComments"]),
        ...mapActions("article", ["saveSupportNotSupport"]),
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
        async createComment() {
            if (this.commentData.content.replace(/\s+/g, ' ').trim() == '') {
                this.commentData.content = ''
                return
            }
            this.commentData.articleID = this.subItem.id
            //console.log('creating comment')
            const res = await this.submitComment(this.commentData)

            if (res.code == 200) {
                this.commentData = {
                    content: '',
                    articleID: '',
                    commentID: ''
                }
            }

        },
        getMoreData(val) {
            //console.log('val:::', val);
            const object = {
                articleID: this.subItem.id,
                pageIndex: val,
                pageSize: this.commentPageSize
            }
            this.fetchComments(object);
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
            // Get the current URL from the browser's address bar
            const currentURL = window.location.href;

            // Prepare the LinkedIn share link
            const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`;

            // Open the LinkedIn share link in a new window or tab
            window.open(linkedinShareLink, '_blank');

            // Check if the LinkedIn window is closed or blocked by a popup blocker
            if (!linkedinWindow || linkedinWindow.closed || typeof linkedinWindow.closed === 'undefined') {
                // Handle the case where the LinkedIn share window is blocked or closed
                this.$store.commit('set_message', { type: 'error', text: this.$t('linkedinShareBlockedErrorMessage') });
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
    watch: {
        subItem: function (newValue) {
            if (newValue) {
                const object = {
                    articleID: this.subItem.id,
                    pageIndex: 1,
                    pageSize: this.commentPageSize
                }
                this.fetchComments(object);
            }
        },
        immediate: true
    },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/faqs/faqs.scss";
</style>