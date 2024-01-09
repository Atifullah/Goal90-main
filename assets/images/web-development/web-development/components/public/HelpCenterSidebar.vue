<template>
  <div id="side-bar">
    <div class="side-menu help-sidebar">

      <AppLoading v-if="loadingMainChannels" />
      <a-menu :default-selected-keys="openKeys" :open-keys.sync="openKeys" mode="inline" :inline-collapsed="true"
        v-model="selectedKey" @click="handleClick" v-if="!loadingMainChannels">

        <a-sub-menu @titleClick="titleClick" v-for="(article, index) in filterArticle " :key="`sub${index}`" >
          <span slot="title" class="user-center">
            <img :src="article.imageurl" class="pr-2" height="20px"/>
            {{ article ? article.channelname : '' }}
          </span>

          <a-menu-item class="home-first sidebar-border" :class="{ 'hover-effect': hoverKey === 'childKey' + childKey + index }" @mouseover="hoverKey = 'childKey' + childKey + index"
            @mouseleave="hoverKey = ''" v-for="(child, childKey) in article.children"
            :key="'childKey' + childKey + index">
            <nuxt-link :to="{ path: selfRoute.helpCenterChannelDetail + '/' + currentChannel + '?channelId=' + child.id }"
              class="text-capitalize">
              {{ child.channelname }}
            </nuxt-link>
          </a-menu-item>
          
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppLoading from '../AppLoading.vue'
export default {
  components: { AppLoading },
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1",],
      selectedKey: ["sub1"],
      hoverKey: "",
      currentChannel: "",
      articleHasChildrens: false
    };
  },
  computed: {
    ...mapGetters("article", ["getArticleChildren", "getArticleDetail"]),
    ...mapGetters("general", ["loadingMainChannels"]),
    hovers: function () {
      return this.$store.state.hovers;
    },
    selfRoute: function () {
      return this.$store.state.route;
    },
    processCount() {
      return this.$store.state.inprocessorders;
    },
    articles() {
      return this.getArticleChildren;
    },
    filterArticle(){
            return this.articles.filter(article => article.children && article.children.length > 0);

    },
  },
  watch: {
    "$route.params": {
      handler: function () {
        //console.log("HelpCenterSidebar watching at routes");
        this.setActiveRoute();
      },
      deep: true,
      immediate: true
    },
    filterArticle: {
      handler: function () {
        //console.log("HelpCenterSidebar watching at articles");
        this.setActiveRoute();
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    ...mapActions("article", ["saveCurrentChannelToState"]),
    handleClick(e) {
        const key = e.key;
      //console.log('Clicked key:', key);
        this.hoverKey = key;

      this.selectedKey = [key];
    },
    setActiveRoute(childId) {
     const articlesArray = this.filterArticle;
      let activeIndex = -1;

      articlesArray.forEach((article, index) => {
        const childIndex = article.children.findIndex((child) => child.id === childId);
        if (childIndex !== -1) {
          activeIndex = index;
          const i = index + childIndex;
          const submenuKey = `sub${i}`;
          const childKey = `childKey${i}`;
          this.openKeys = [submenuKey];
          this.selectedKey = [childKey];
        }
      });

      this.$set(this.selectedKey, 0, this.$store.state.route.active);
    },
    titleClick(e) {
            this.hoverKey = "";
            //console.log(this.hoverKey)

    },
    
  },
  mounted() {
    this.$set(this.selectedKey, 0, this.$store.state.route.active);
    this.global_refresh_user_inprocessorders_count();
    const params = this.$route.params;
    this.currentChannel = params.channel;
    this.setActiveRoute();
    //console.log("HelpCenterSidebar mounted", params);
    this.saveCurrentChannelToState(params.channel);
  },
  components: { AppLoading }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar/sidebar.scss';
</style>
