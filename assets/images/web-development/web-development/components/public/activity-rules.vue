<template>
  <div class="invitation-rule">
    <div v-html="rule.remark">
      {{rule.remark}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "activity-rules",
    props: ['articeid'],
    data() {
      return {
        rule: [],
        ruleList: [],
        lang: this.$store.state.hex_lang.locale,
        orderModel: {
          pageindex: 1,//页数
          pagesize: 100,//条数
        },
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.filterRule();
      }
    },
    mounted() {
      // this.getRule();
      this.filterRule();
    },
    methods: {
      // getRule() {//z文章列表
      //   this.$store.dispatch("com_article_search", this.orderModel).then(({data}) => {
      //     if (data && data.pagedata.length > 0) {
      //       this.ruleList = data.pagedata;
      //       this.filterRule();
      //     }
      //   })
      // },
      filterRule() {//详情表 
        let ruleid
        switch (this.lang) {
          case 'en_us':
            ruleid = this.articeid.en_us
            break;
          case 'zh_cn':
            ruleid = this.articeid.zh_cn
            break;
          case 'ja_jp':
            ruleid = this.articeid.ja_jp
            break;
         case 'zh_hk':
            ruleid = this.articeid.zh_hk
            break;
         case 'ko_kr':
            ruleid = this.articeid.ko_kr
            break; 
          default:
            ruleid = this.articeid.en_us
            break;
        }  
        this.$store.dispatch('com_article_info_get', {articeid: ruleid}).then(({data}) => { 
          if (data) { 
            this.rule = data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .invitation-rule {
    background: white;
    font-size: 14px;
    color: #344B6C;
    line-height: 1.7rem;
    padding: 20px 40px 20px 40px;
  }
  invitation-h2-title {
    font-weight: bold;
  }
  .article {
    padding-bottom: 0 !important;
  }
</style>
