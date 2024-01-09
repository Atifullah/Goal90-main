<template>
  <div id="faqs">
    <AppLoading height="50vh" v-if="loading" />
    <div v-else>

      <p class="faqs-txt fw-5">{{ $t("returntxt.rtxt32") }}</p>
      <a-collapse v-model="activeKey">
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel v-for="(item, index) in displayedFaqs" :key="'A' + index"
          :class="index < faqsItem.length - 1 ? 'faqs-item' : ''">
          <template #header>
            <h3 class="faq-header fw-5">{{ item.question }}</h3>
          </template>
          <p class="mb-0">{{ item.answer }}</p>
        </a-collapse-panel>
      </a-collapse>
      <div class=" px-3 pb-4 text-right">

        <a-pagination v-model="currentPage" :total="faqsItem.length" :page-size="faqsPerPage" @change="handChange"
          show-less-items />
      </div>

    </div>
  </div>
</template>

<script>
import { AIcon } from 'ant-design-vue';
import AppLoading from '../AppLoading.vue';

export default {
  props: {
    channelid: {
      type: Number | String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    selectedIndex: {
      type: Number,
      default: 1
    },
    faqsPerPage: {
      type: Number,
      default: 6 // Adjust the page size as needed
    },

  },
  components: { AppLoading },
  data() {
    return {
      activeKey: [],
      faqsItem: [],
      service: {},
      loading: true,
      currentPage: 1
    };
  },
  watch: {
    activeKey(key) { },
    subtitle() {
      this.getArticleInfo();
    },
  },
  computed: {
    displayedFaqs() {
      const startIndex = (this.currentPage - 1) * this.faqsPerPage;
      const endIndex = startIndex + this.faqsPerPage;
      return this.faqsItem.slice(startIndex, endIndex);
    },
  },
  methods: {
    getArticleInfo() {
      let pastData = {
        channelid: this.channelid,
        articeid: 0,
        subtitle: this.subtitle,
      };
      var _this = this;
      _this.loading = true;
      this.$store
        .dispatch("com_article_info_get", pastData)
        .then(({ data }) => {
          _this.loading = false;
          if (data) {
            _this.faqsItem = JSON.parse(data.shortdescription);
          }
          else {
            _this.service = {};
          }
        })
        .catch((res) => {
          _this.loading = false;
          _this.service = {};
        });
    },
    // ...
    handChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.getArticleInfo();
    this.currentPage = this.selectedIndex ? this.selectedIndex : 1
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/faqs/faqs.scss";

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number {
  margin: 0 16px;
  font-size: 18px;
  font-weight: bold;
}
</style>
