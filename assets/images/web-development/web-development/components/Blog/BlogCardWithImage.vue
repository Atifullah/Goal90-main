<template>
  <div class="news-card">
    <a-row :gutter="16">
      <a-col :lg="6">
        <img :src="news.imgurl" width="100%" height="131px" class="news-img" />
      </a-col>
      <a-col :lg="18">
        <p class="mb-0 news-heading fw-5">{{ news.title.substr(0, 60) }}</p>
        <p class="new-desc fw-4 mb-0">
          {{
            news.seo.short_description
              ? news.seo.short_description.substr(0, 180)
              : ""
          }}
        </p>

        <a-row :gutter="16" class="col-alignment">
          <a-col :lg="12">
            <p class="mb-0 news-time fw-5 text-underline text-black">
              {{ news.source }}
            </p>
          </a-col>
          <a-col :lg="12" align="end">
            <p class="time-txt fw-5 mb-0">
              {{ news.updateTime }}
            </p>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "BlogCardWithImage",
  props: {
    news: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
