<template>
  <div class="article_content">
    <slot></slot>
    <div v-html="service.remark">
    </div>
  </div>
</template>

<script>
  export default {
    name: "articleinfo",
    props: ['channelid','subtitle'],
    data() {
      return {
        service: {},//根据当前语言展示的数据
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.getArticleInfo();
      }
    },
    mounted() {
      setTimeout(() => {
        this.getArticleInfo();
      }, 50);
    },
    methods: {
      getArticleInfo() {
          let pastData = {
             channelid: this.channelid,
             articeid:0,
             subtitle: this.subtitle
          }
          var _this=this;
          this.$store.dispatch('com_article_info_get', pastData).then(({data}) => {
            _this.loading = false;
            if (data) {
              _this.service= data;
            } else {
              _this.service= {};
            }
          }).catch((res) => {
            _this.service={};
          })
        },
        close() {
          this.$emit("close");
        }
      },
  }
</script>

<style lang="scss">
</style>

