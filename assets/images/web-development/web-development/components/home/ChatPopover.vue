<template>
  <div class="chat-wrapper">
    <!-- Chat Icon Button -->
    <button class="chat-icon-button" @click="togglePopover" v-show="isElementVisible">
      <svg class="chatbutn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 17">
        <path fill="#FFF"
          d="M17.98 3.22h-6.65V1.64C11.33.78 10.64.1 9.78.1H1.56C.69.09 0 .78 0 1.64v7.67c0 .2.11.38.27.49a.61.61 0 0 0 .29.07c.08 0 .2-.03.26-.07l1.67-.96h1.47v4.65a2.03 2.03 0 0 0 2.02 2.02h10.7l2.5 1.42a.6.6 0 0 0 .26.07c.1 0 .2-.02.3-.07.17-.09.26-.29.26-.49V5.22c0-1.09-.91-2-2.02-2zm-14.02 2v2.51h-1.6c-.1 0-.2.03-.27.07l-.98.56V1.64c0-.24.2-.44.45-.44h8.22c.24 0 .44.2.44.44v1.58H5.96a2 2 0 0 0-2 2zM18.89 15.5l-1.78-1.02a.6.6 0 0 0-.27-.07H5.96a.92.92 0 0 1-.92-.91V5.22c0-.49.4-.9.92-.9h12.02c.49 0 .9.4.9.9V15.5z">
        </path>
      </svg>
    </button>
    <!-- popover after login or visitor login -->
    <div class="chat-popover" v-if="showPopover">
     
              <div class="loginbanner" v-if="!isLoggedIn && !isVisitorLogin" style="margin-right: 100px;">
          <a-col>
            <p type="text" class="logintext">
              {{ $t("chat.chat11") }}
            </p>
          </a-col>
          <a-col>
            <nuxt-link to="/login">
              <input type="button" class="loginbutton" style="" value="Login" ref="customButton" @click="togglePopover" />
            </nuxt-link>
          </a-col>
          <a-col>
            <input type="button" class="visitorbutton" value="Continue as Visitor" ref="customButton"
              @click="openVisitorPopover" />
          </a-col>
        </div>
        <div class="loginbanner" v-if="isVisitorPopoverOpen == true">
          <a-col>
            <p type="text" class="logintext">
              {{ $t("chat.chat1") }}
            </p>
          </a-col>
          <a-col>
            <div :rules="setValidation.rules" prop="username">
              <a-input type="text" :placeholder="emailPlaceholder" v-model="userInput" ref="customButton" style="
            margin-bottom: 10px;
            width: 300px;
            height: 42px;
            margin-left: 20px;
          ">
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </div>
          </a-col>
          <a-col>
            <input type="button" class="visitorbutton" value="Continue as Visitor" ref="customButton"
              @click="submitUserInput" />
          </a-col>
        </div>
      <a-row class="header-row">
        <a-col span="24" class="header-col">
          <div class="header-wrapper">
            <span class="header-text">Bitnasdaq Online Chat</span>

            <button class="close-button" @click="togglePopover">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#ADB1B8" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.9496 13.3641C12.3401 13.7546 12.9733 13.7546 13.3638 13.3641C13.7544 12.9736 13.7544 12.3404 13.3638 11.9499L8.41417 7.0002L13.364 2.0504C13.7545 1.65987 13.7545 1.02671 13.364 0.636183C12.9734 0.245659 12.3403 0.245659 11.9498 0.636183L6.99996 5.58599L2.05012 0.636155C1.6596 0.245631 1.02643 0.245631 0.635911 0.636155C0.245386 1.02668 0.245387 1.65984 0.635911 2.05037L5.58574 7.0002L0.63605 11.9499C0.245526 12.3404 0.245526 12.9736 0.63605 13.3641C1.02657 13.7546 1.65974 13.7546 2.05026 13.3641L6.99996 8.41441L11.9496 13.3641Z"
                  fill="#ADB1B8"></path>
              </svg>
            </button>
          </div>
        </a-col>
      </a-row>
      <div class="containerx" style="
          overflow-y: auto;
          overflow-x: hidden;
          width: 350px;
          padding-right: 15px;
        ">
        <a-row class="header-row">
          <a-col span="24" class="header-col2">
            <div class="header-wrapper2">
              <span class="header-text2">{{ $t("chat.chat4") }}</span>
              <button class="arrow-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#fff"
                    d="M8.707 16.707a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414l-6-6a1 1 0 0 0-1.414 1.414L13.586 9H3a1 1 0 0 0 0 2h10.586l-5.293 5.293a1 1 0 0 0 1.414 1.414z" />
                </svg>
              </button>
            </div>

            <div>
              <a-col class="chat-search mt-3">
                <a-input-search v-model="searchText" :placeholder="$t('placeholders.plh22')"
                  @input="debouncedPerformSearch" />
              </a-col>
              <!-- Display search results -->
              <ul v-if="searchText != ''"
                class="searchBackground overflow-hidden overflow-y-auto scrollbar force-overflow containerx">
                <li v-if="searchResults.length > 0">
                  <nuxt-link v-for="(item, index) in searchResults" :key="index"
                    :to="item.articlehref || item.redirectTo">
                    <h1 v-if="searchText.length > 0" class="search-result-data" v-html="item.title"></h1>
                  </nuxt-link>


                </li>
                <template v-else>
                  <h1 class="search-not-found">Data not found.</h1>
                </template>
              </ul>

            </div>

            <div>
              <template>
                <div>

                  <div class="activepanel-content mt-3" v-if="activePanel !== null">

                    <a-row>
                      <a-col :span="4" class="contentText mt-4 ">
                        <svg width="16" height="16" @click="handleBackClick" viewBox="0 0 16 17" fill="#ffbf29"
                          class="ml-2" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.41227 7.00208L8.70516 1.70918C9.09569 1.31866 9.09569 0.685492 8.70516 0.294968C8.31464 -0.0955566 7.68147 -0.0955566 7.29095 0.294968L0.298019 7.2879C-0.0964352 7.68235 -0.0963858 8.32185 0.298019 8.71625L7.29095 15.7092C7.68147 16.0997 8.31464 16.0997 8.70516 15.7092C9.09569 15.3187 9.09569 14.6855 8.70516 14.295L3.41227 9.00208L15.0605 9.00207C15.5783 9.00207 15.998 8.55436 15.998 8.00207C15.998 7.44979 15.5783 7.00207 15.0605 7.00207L3.41227 7.00208Z"
                            fill="#ffbf29"></path>
                        </svg>
                      </a-col>
                      <a-col :span="20">
                        <p class="contentheader mt-3" ref="contentDiv">
                          {{ faqsItem[activePanel]?.header }}
                        </p>
                      </a-col>
                    </a-row>
                    <div class="mb-2 ml-2 mr-2 contentText" v-html="faqsItem[activePanel]?.content">

                    </div>
                  </div>

                  <!-- Header Template -->
                  <a-row>

                    <a-col>
                      <a-list v-model="activePanel" class="collapse-header-class mt-3">
                        <div class="mt-3">
                          <span class="header-text3">{{ $t("chat.chat5") }}</span> <button class="arrow-button"
                            v-if="faqsItem.length > 4" @click="showNextcontent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                              <path fill="#fff"
                                d="M3.59445 0.894901C4.70128 0.28303 5.97699 0.0474463 7.22936 0.223648C8.47874 0.399428 9.63737 0.97553 10.5315 1.86542L12.2492 3.46172V1.328C12.2492 1.00584 12.5103 0.74467 12.8325 0.74467C13.1547 0.74467 13.4158 1.00584 13.4158 1.328V4.828C13.4158 5.15017 13.1547 5.41134 12.8325 5.41134H9.33249C9.01032 5.41134 8.74916 5.15017 8.74916 4.828C8.74916 4.50584 9.01032 4.24467 9.33249 4.24467H11.3779L9.72637 2.70975L9.71369 2.69747C8.99766 1.98265 8.06872 1.5199 7.06682 1.37894C6.06493 1.23797 5.04436 1.42644 4.15889 1.91594C3.27342 2.40544 2.57102 3.16945 2.15752 4.09285C1.74402 5.01626 1.64182 6.04904 1.86632 7.03558C2.09082 8.02212 2.62986 8.90898 3.40222 9.56253C4.17458 10.2161 5.13841 10.6009 6.1485 10.659C7.1586 10.7172 8.16022 10.4455 9.00246 9.88485C9.8447 9.32423 10.4819 8.50507 10.8181 7.5508C10.9252 7.24694 11.2583 7.0874 11.5622 7.19446C11.866 7.30151 12.0256 7.63462 11.9185 7.93848C11.4983 9.13132 10.7017 10.1553 9.64891 10.856C8.59611 11.5568 7.34408 11.8965 6.08147 11.8238C4.81886 11.7511 3.61406 11.2701 2.64861 10.4531C1.68316 9.6362 1.00936 8.52763 0.728734 7.29445C0.448107 6.06128 0.575857 4.7703 1.09273 3.61604C1.60961 2.46179 2.48761 1.50677 3.59445 0.894901Z" />
                            </svg>
                          </button>
                        </div>
                        <a-list-item v-for="(item ) in displayedItems" :header="item.header" :key="item.id"
                          :active-key="activePanel" @click="handlePanelChange(item.id)">
                          <a-col :span="2" class="dot-column"><!-- Dot SVG icon -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#595d61" class="dot">
                              <circle cx="10" cy="10" r="5" />
                            </svg></a-col>
                          <a-col :span="20">
                            {{ item.header }}
                          </a-col>
                          <a-col :span="2" class="icon-column">
                            <div>
                              <a-icon type="right" class="ml-2 faq-icon-right" />
                            </div>
                          </a-col>
                        </a-list-item>

                      </a-list>
                    </a-col>

                  </a-row>
                </div>
              </template>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <div class="header-wrapper2">
            <span class="header-text3">{{ $t("home.ss") }}</span>
            <button class="arrow-button" v-if="servicesList.length > 2" @click="showNextItems">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="#fff"
                  d="M3.59445 0.894901C4.70128 0.28303 5.97699 0.0474463 7.22936 0.223648C8.47874 0.399428 9.63737 0.97553 10.5315 1.86542L12.2492 3.46172V1.328C12.2492 1.00584 12.5103 0.74467 12.8325 0.74467C13.1547 0.74467 13.4158 1.00584 13.4158 1.328V4.828C13.4158 5.15017 13.1547 5.41134 12.8325 5.41134H9.33249C9.01032 5.41134 8.74916 5.15017 8.74916 4.828C8.74916 4.50584 9.01032 4.24467 9.33249 4.24467H11.3779L9.72637 2.70975L9.71369 2.69747C8.99766 1.98265 8.06872 1.5199 7.06682 1.37894C6.06493 1.23797 5.04436 1.42644 4.15889 1.91594C3.27342 2.40544 2.57102 3.16945 2.15752 4.09285C1.74402 5.01626 1.64182 6.04904 1.86632 7.03558C2.09082 8.02212 2.62986 8.90898 3.40222 9.56253C4.17458 10.2161 5.13841 10.6009 6.1485 10.659C7.1586 10.7172 8.16022 10.4455 9.00246 9.88485C9.8447 9.32423 10.4819 8.50507 10.8181 7.5508C10.9252 7.24694 11.2583 7.0874 11.5622 7.19446C11.866 7.30151 12.0256 7.63462 11.9185 7.93848C11.4983 9.13132 10.7017 10.1553 9.64891 10.856C8.59611 11.5568 7.34408 11.8965 6.08147 11.8238C4.81886 11.7511 3.61406 11.2701 2.64861 10.4531C1.68316 9.6362 1.00936 8.52763 0.728734 7.29445C0.448107 6.06128 0.575857 4.7703 1.09273 3.61604C1.60961 2.46179 2.48761 1.50677 3.59445 0.894901Z" />
              </svg> -->
              <a-icon type="redo" class="icon" />
            </button>
          </div>
        </a-row>
        <a-row>
          <div class="container">
            <div class="upper-buttons">
              <a-col :lg="4" v-for="(list, key) in servicesList.slice(0, 2)" :key="key" align="center">
                <nuxt-link :to="list.redirectTo">
                  <div :bordered="false" class="button">
                    <img :src="list.img" />
                    <p class="services-list mb-0 mt-3">
                      {{ list.title }}
                    </p>
                  </div>
                </nuxt-link>
              </a-col>
            </div>
          </div>
        </a-row>
        <a-row>
          <div class="header-faq">
            <span class="header-text3">{{ $t("returntxt.rtxt32") }}</span>
            <nuxt-link to="/help-center">
              <button class="arrow-button">
                {{ $t("chat.chat10") }}
                <svg class="iconx" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#fff"
                    d="M8.707 16.707a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414l-6-6a1 1 0 0 0-1.414 1.414L13.586 9H3a1 1 0 0 0 0 2h10.586l-5.293 5.293a1 1 0 0 0 1.414 1.414z" />
                </svg>
              </button>
            </nuxt-link>
          </div>
        </a-row>
        <a-row>
          <div class="demo-infinite-container" :infinite-scroll-distance="10" style="background-color: white">
            <a-list class="collapse-faq" v-for="(list, key) in articleChannels" :key="key">
              <nuxt-link class="faq-desc fw-5" :to="list.redirectTo ? list.redirectTo : ''">
                <a-list-item class="collapse-header">
                  <nuxt-link class="mb-0 ml-2 mb-3 mt-3 faq-desc fw-5" :to="list.redirectTo ? list.redirectTo : ''">
                    <a-list-item-meta :description="list.channelname">
                      <a-avatar slot="avatar" :src="list.imageurl" />
                    </a-list-item-meta>
                  </nuxt-link>
                  <div>
                    <a-icon type="right" class="mt-2 mr-2 faq-icon-right" />
                  </div>
                </a-list-item>
              </nuxt-link>
            </a-list>
          </div>
        </a-row>
        <a-row>
          <a-col>
            <!-- class="support-chat-button" -->
            <input type="button" class="support-chat-button" value="CHAT SUPPORT" ref="customButton"
              @click="togglePopoverAndOpenChat" />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { blogChannelId, helpCenterId, chatBotId } from "~/plugins/constants";
import debounce from "~/plugins/carousel/debounce";
export default {
  data() {
    return {
      visible: false,
      faqsItem: [],
      pageIndex: 1,
      pageSize: 10,
      searchText: "",
      servicesList: [],
      isVisitorPopoverOpen: false,
      emailPlaceholder: "Enter your email",
      isElementVisible: true,
      onInitRan: false,
      kommunicateSettings: null,
      userInput: "", // Initialize visitorEmail data property
      visitormail: "",
      isEmailValid: true, // Initialize isEmailValid flag as true
      activePanel: null,
      itemsPerPage: 4, // Number of items to display initially
      currentIndex: 0, // Current index for displaying items
      setValidation: {
        rules: {
          username: [
            {
              type: "email",
              message: this.$t("messages.msg2"),
            },
            { required: true, message: this.$t("messages.msg1") },
          ],
        },
      }, customStyle:
        "color: #fff; background: #16171a;border-radius: 4px;margin-bottom: 10px;border: 0;overflow: hidden ",
    };
  },
  computed: {
    ...mapGetters("article", [
      "getArticleChildren",
      "getLatestArticles",
      "getRecomendArticles",
      "getSearchResults"
    ]),
    ...mapGetters("general", [
      "laodingLatestArticles",
      "loadingRecommendArticles",
    ]),
    ...mapState(["popoverstate"]),
    showPopover() {
      return this.popoverstate.showPopover;
    },

    articleChannels() {
      return this.getArticleChildren;
    },
    searchResults() {
      return this.getSearchResults
    },
    selfRoute: function () {
      return this.$store.state.route;
    },
    isLoggedIn() {
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;

      return !!email && !!userId;
    },
    isVisitorLogin() {
      const visitorgetter = this.$store.state.visitor_user;
      const visitormail = visitorgetter.userInput;
      return visitormail !== "";
    },
    displayedItems() {
      const endIndex = this.currentIndex + this.itemsPerPage;
      return this.faqsItem.slice(this.currentIndex, endIndex);
    },
  },
  watch: {
    // Watch for changes in the popover state and fetch data if needed
    "popoverstate.showPopover": {
      immediate: true,
      handler(value) {
        if (value) {
          this.assignServicesList();
          this.fetchArticleChannels({ channelId: helpCenterId });
        }
      },
    },
  },
  mounted() {
    this.getArticleInfo();
    setTimeout(() => {
      const chatButton = document.querySelector('.km-chat-icon-sidebox');
      if (chatButton) {
        chatButton.style.display = 'none';
      }
    }, 1000);
    this.onInitRan = false;
    const hexServerUserInfo = this.$store.state.hex_server_user_info;
    const visitorgetter = this.$store.state.visitor_user;
    var email = hexServerUserInfo.value.email;
    var userId = hexServerUserInfo.value.uid;
    var visitormail = visitorgetter.userInput;
    //console.log(this.visitormail);
    var kommunicateSettings;
    if (email && userId) {
      //condition 1 for login user
      kommunicateSettings = {
        // appId: "f473fcaff998ffbe60f08e0484180fcf", baobo chat id
        appId: chatBotId,
        popupWidget: false,
        automaticChatOpenOnNavigation: true,
        email: email,
        userId: userId,
        onInit: () => {
          if (!this.onInitRan) {
            Kommunicate.displayKommunicateWidget(false);
            this.onInitRan = true;
          }
        },
      };
    } else if (visitormail) {
      // Condition 2: Visitor email is available
      kommunicateSettings = {
        appId: chatBotId,
        popupWidget: false,
        automaticChatOpenOnNavigation: false,
        email: visitormail,
        onInit: () => {
          if (!this.onInitRan) {
            Kommunicate.displayKommunicateWidget(false);
            this.onInitRan = true;
          }
        },
      };
    } else {
      //if no user login
      kommunicateSettings = {
        appId: chatBotId,
        popupWidget: false,
        automaticChatOpenOnNavigation: false,
        onInit: () => {
          Kommunicate.displayKommunicateWidget(false);
          this.buttonEnabled = false;
        },
      };
    }

    if (typeof window.kommunicate === "undefined") {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      const h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
    }

    window.kommunicate = window.kommunicate || {};
    window.kommunicate._globals = kommunicateSettings;


  },
  methods: {
    ...mapActions("article", [
      "fetchArticleChannels",
      "fetchLatestArticles",
      "fetchRecomendArticles",
      "onSearch", "fetchSubItems"
    ]),
    getArticleInfo() {
      let pastData = {
        channelid: 106,
        articeid: 0,
        subtitle: "chat-bot-questions",
      };
      var _this = this;
      _this.loading = true;
      this.$store
        .dispatch("com_article_info_get", pastData)
        .then(response => {
          console.log('Response:', response);
          _this.loading = false;

          if (response) {
            _this.faqsItem = JSON.parse(response.data.shortdescription);
          }

        })
        .catch(error => {
          console.error('Error:', error);
          _this.loading = false;
        });

    },
    performSearch() {
      const channelId = helpCenterId; // Make sure channelId is available in the component
      const object = {
        keywords: this.searchText,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        channelId: channelId
      }
      this.$store.commit('article/setCurrentSearchText', this.searchText, this.channelId)
      this.onSearch(object)
    },
    // Use your custom debounce function
    debouncedPerformSearch: debounce(function () {
      this.performSearch();
    }, 1000),

    assignServicesList: function () {
      const array = [
        {
          img: "/images/reset-pass.svg",
          title: this.$t("news.t8"),
          redirectTo: this.selfRoute.changePassword,
        },
        {
          img: "/images/unlock-account.svg",
          title: this.$t("news.t9"),
          redirectTo: this.selfRoute.createTicket,
        },
        {
          img: "/images/reset-phone-security.svg",
          title: this.$t("news.t10"),
          redirectTo: this.selfRoute.bindPhoneNo,
        },
        {
          img: "/images/change-email.svg",
          title: this.$t("news.t11"),
          redirectTo: this.selfRoute.bindEmail,
        },
        {
          img: "/images/reset-google-auth.svg",
          title: this.$t("news.t12"),
          redirectTo: this.selfRoute.changeGoogleVerification,
        },
        {
          img: "/images/crypto-deposit1.svg",
          title: this.$t("news.t13"),
          redirectTo: this.selfRoute.createTicket + "?tab=others",
        },
      ];

      this.servicesList = array;
      // this.showPopover= true;
    },
    togglePopover() {
      // this.showPopover = !this.showPopover;;
      if (!this.popoverstate.showPopover) {
        this.popoverstate.showPopover = true;
        this.buttonclose = !this.buttonclose;
        this.isVisitorPopoverOpen = false;

      } else {
        this.popoverstate.showPopover = false;
        this.buttonclose = false;
        // You might want to reset other variables here if needed
      }
    },
    openVisitorPopover() {
      this.isVisitorPopoverOpen = true;
    },
    closePopover() {
      this.showPopover = false;
    },
    hidebutton() {
      this.isElementVisible = false;
    },
    openChat() {
      Kommunicate.displayKommunicateWidget(true);
      Kommunicate.openWidgetPreview();
    },
    togglePopoverAndOpenChat() {
      this.openChat();
      this.togglePopover();
      this.hidebutton();
    },
    hide() {
      //console.log(111);
      this.visible = false;
    },
    submitUserInput() {
      if (this.userInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.userInput)) {
          this.userInput = "";
          this.emailPlaceholder = "Not a valid email";
        } else {
          // Email is valid, show popover

          this.buttonclose = !this.buttonclose;
          this.isVisitorPopoverOpen = false;
          // Trigger the action to store the user input in the Vuex store
          this.$store.dispatch("setUserInput", this.userInput);
          // // You can also reset the input field after submitting if needed
          this.userInput = "";
        }
      }
    },
    //show the self services data in form of 2
    showNextItems() {
      this.servicesList = this.servicesList
        .slice(2)
        .concat(this.servicesList.slice(0, 2));
    },
    showNextcontent() {
      this.currentIndex += this.itemsPerPage;
      // If currentIndex goes beyond the array length, reset to 0
      if (this.currentIndex >= this.faqsItem.length) {
        this.currentIndex = 0;
      }
    },

    //function for article
    handlePanelChange(itemId) {
      if (this.activePanel === itemId) {
        this.activePanel = null; // Close the active panel if clicked again
      } else {
        this.activePanel = itemId; // Open the clicked panel
      }
      this.$nextTick(() => {
        this.scrollContentToView();
      });
    },
    scrollContentToView() {
      const contentDiv = this.$refs.contentDiv;
      if (contentDiv) {
        contentDiv.scrollIntoView({ behavior: 'smooth' });
      }

    },
    handleBackClick() {
      this.activePanel = null;
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/pages/footer/chatpopover.scss'
</style>