<template>
  <div class="account-function">
    <a-card :bordered="false">
      <SearchPanel :breadCrumbs="breadCrumbs" />
    </a-card>
    <a-card :bordered="false" class="mt-3">
      <BreadCrumbs @breadcrumbs-updated="updateBreadcrumbs" />
      <a-row :gutter="24">
        <a-col :lg="16" class="pb-4">
          <AppLoading v-if="loadingArticleDetail" />

          <div v-else>
            <div v-if="subItem.hasJson" id="faqs" class="py-4">
              <AppCollapsePanel :items="subItem.jsonData" />
            </div>

            <div v-else>
              <h3 class="help-center-heading fw-5 my-4">{{ subItem.title }}</h3>

              <p class="articles-desc fw-5 mb-1" v-if="subItem.author">
                {{ subItem.author }}
              </p>
              <p class="update-time mb-1">
                {{ $t("helpcenter.hc4") }}: {{ subItem.updateTime }}
              </p>

              <div class="articles-desc-detail" v-html="subItem.remark"></div>
            </div>
          </div>
        </a-col>
        <a-col :lg="8">
          <div>
            <h4 class="help-center-heading fw-5 mt-4 mb-3">
              {{ $t("helpcenter.hc3") }}
            </h4>
            <div v-if="subItems.length > 1">
              <ul class="articles-related-list">
                <li v-for="(sub_item, subItemIndex) in subItems" :key="subItemIndex" class="mb-3 text-capitalize"
                  :class="activeRoute(sub_item.redirectTo)">
                  <a v-if="sub_item.articlehref" :href="sub_item.redirectTo" target="_blank" v-html="sub_item.title">
                  </a>
                  <nuxt-link v-else :to="sub_item.redirectTo ? sub_item.redirectTo : ''" v-html="sub_item.title">
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div v-else>
              <a-col :lg="24" class="py-2">
                <p>{{ $t('helpcenter.hc6') }}</p>
              </a-col>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" class="mt-3" v-if="loggedIn">
      <a-row :gutter="16">
        <a-col :lg="{ span: 12, offset: 6 }" :xl="{ span: 10, offset: 7 }">
          <div class="text-center py-4">
            <p class="faq-title fw-5">{{ $t("extra.extra1") }}</p>
            <div class="positive-txt-box">
              <a-row :gutter="24">
                <a-col :lg="12" :sm="12" :xs="12" class="text-center  ">
                  <a-button @click="manageSupport('support')" class="cursor fw-5" :loading="supporting" v-bind:class="userOperation.issupport
                    ? 'thumbs-up-btn'
                    : 'thumbs-neutral-btn'
                    "><img :src="userOperation.issupport
    ? '/images/thumbs-up-active.svg'
    : '/images/thumbs-up.svg'
    " class="mr-2 mb-1" />{{ $t("extra.extra2") }}</a-button>
                </a-col>
                <a-col :lg="12" :sm="12" :xs="12" class="text-center fw-5">
                  <a-button @click="manageSupport('not-support')" class="cursor" :loading="notSupporting" v-bind:class="userOperation.isnosupport
                    ? 'thumbs-down-btn'
                    : 'thumbs-neutral-btn'
                    "><img :src="userOperation.isnosupport
    ? '/images/thumbs-down-active.svg'
    : '/images/thumbs-down.svg'
    " class="mr-2" />{{ $t("extra.extra3") }}</a-button>
                </a-col>

              </a-row>
            </div>
            <p class="faq-desc fw-5 pt-3">
              {{ supportedCount }} {{ $t("extra.extra4") }} {{ totalSupport }}
              {{ $t("extra.extra5") }}
            </p>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BreadCrumbs from "./BreadCrumbs.vue";
import AppLoading from "../AppLoading.vue";
import AppCollapsePanel from "../AppCollapsePanel.vue";
import SearchPanel from "./SearchPanel.vue";
export default {
  components: { BreadCrumbs, AppLoading, AppCollapsePanel, SearchPanel },

  // head() {
  //   return {
  //     title: this.title + this.seoData.title,
  //     meta: [{
  //       hid: 'description',
  //       name: 'description',
  //       content: this.seoData.description
  //     }]
  //   }
  // },
  data() {
    return {
      title: ' BitNasdaq  | ',
      activeCollapseableChild: "",
      isRequesting: false,
      currentSubChannel: "",
      currentChannel: "",
      breadCrumbs: [],

    };
  },

  watch: {
    "$route.params": {
      handler: function () {
        const route = this.$route;
        //console.log('route.queryParams.channelId', route)
        this.currentChannel = route.params.channel;
        this.currentSubChannel = route.query.subChannel;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("article", ["getSubItem", "getSubItems"]),
    ...mapGetters("general", [
      "loadingArticleDetail",
      "supporting",
      "notSupporting",
    ]),
    subItem() {
      return this.getSubItem;
    },
    subItems() {
      return this.getSubItems;
    },
    userOperation() {
      return this.getSubItem.useroper ? this.getSubItem.useroper : {};
    },
    totalSupport: {
      get() {
        return this.supportedCount + this.noSupportedCount;
      },
    },
    supportedCount: {
      get() {
        const metaData = this.getSubItem.data ? this.getSubItem.data : {};
        return metaData.supportnum;
      },
      set(value) {
        // You can optionally define a setter function to update the value of `supportedCount`
        const metaData = this.getSubItem.data ? this.getSubItem.data : {};
        metaData.supportnum = value;
      },
    },
    noSupportedCount: {
      get() {
        const metaData = this.getSubItem.data ? this.getSubItem.data : {};
        return metaData.notsupportnum;
      },
      set(value) {
        // You can optionally define a setter function to update the value of `supportedCount`
        const metaData = this.getSubItem.data ? this.getSubItem.data : {};
        metaData.notsupportnum = value;
      },
    },
    selfRoute: function () {
      return this.$store.state.route;
    },
    loggedIn: function () {
      return this.$userinfo.uid;
    },

    seoData() {
      return this.subItem.seo
    },
  },
  methods: {
    ...mapActions("article", ["saveSupportNotSupport"]),
    manageSupport: async function (requestType) {
      const object = {
        articleID: this.subItem.id,
        isSupport: false,
        isNoSupport: false,
      };

      if (requestType == "support") {
        object.isSupport = true;
      } else if (requestType == "not-support") {
        object.isNoSupport = true;
      }

      if (
        this.isRequesting ||
        this.userOperation.issupport == true ||
        this.userOperation.isnosupport == true
      ) {
        return;
      }
      this.isRequesting = true;
      const response = await this.saveSupportNotSupport(object);
      this.isRequesting = false;
      //console.log("manageSupport response: ", response);
      if (response.code == 200) {
        if (response.data) {
          if (requestType == "support") {
            this.userOperation.issupport = true;
            const supportCount = this.supportedCount;
            this.supportedCount = supportCount + 1;
          } else if (requestType == "not-support") {
            this.userOperation.isnosupport = true;
            const notSupportCount = this.noSupportedCount;
            this.noSupportedCount = notSupportCount + 1;
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
    updateBreadcrumbs(breadCrumbs) {
      this.breadCrumbs = breadCrumbs;
      console.log(this.breadCrumbs)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/faqs/faqs.scss";
</style>
