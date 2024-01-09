<template>
  <div class="intro">
    <h2>{{currendydata.currencyname}}</h2>
    <h3>{{$t('currency.title1')}}{{currendydata.currencyname}}{{$t('currency.title2')}}</h3>
    <p>{{currendydata.description}}</p>
    <h3>{{$t('currency.baseInfo')}}</h3>
    <p>
      {{$t('currency.issue')}}:{{global_get_local_time(currendydata.publishtime).format('YYYY-MM-DD')}}
      <br />

      {{$t('currency.totalCirculation')}}:{{currendydata.circulation}}    <br />
      {{$t('currency.circulationTol')}}:{{currendydata.totalcirculation}} <br />
      {{$t('currency.officialWebsite')}}:{{currendydata.info.website}} <br />
      {{$t('currency.exNum')}}:{{currendydata.tradeplantnum}} <br />
      {{$t('currency.whitePaper')}}:{{currendydata.info.whitepaper}}
      <br />

    </p>
    <h3> {{$t('currency.ICOInformation')}}</h3>
    <p>
      {{$t('currency.Distribution')}}:{{currendydata.info.ico.distribution}}
      <br />

      {{$t('currency.Raise')}}:{{currendydata.info.ico.ico_coin}}    <br />
      {{$t('currency.ICOTotal')}}:{{currendydata.info.ico.supply}} <br />
      {{$t('currency.CrowdfundingAmount')}}:{{currendydata.info.ico.raised}}
      <br />

    </p>
  </div>
</template>
<script>
  export default {
    name: "currency",
    props: ["symble"],
    data() {
      return { 
        lang: this.$store.state.hex_lang.locale,
        currendydata: {
          info: {
            englishname: "",
            ico: {

            }
          }
        },
        introShow: false
      };
    },
    watch: {
      "$store.state.hex_lang.locale": function (val) {
        this.lang = val;
        this.getarticle();
      },
      symble: function (val) { 
        this.getarticle();
      }
    },
    mounted() { 
       
    },
    methods: {
      falseFun() {
        this.introShow = !this.introShow;
      },
      getarticle() {
        this.$store
          .dispatch("com_article_info_get", {
            channelid: 3,
            subtitle: this.symble.toLowerCase(),
          })
          .then(data => {
            if (data) {
              var currency = JSON.parse(data.data.shortdescription);
              this.currendydata = currency;
            } 
          });
      }
    }
  };
</script>
<style scoped>
  .intro {
    padding: 10px;
    background: transparent;
    width: 100%;
    height: 95%;
    overflow: scroll;
  }

    .intro::-webkit-scrollbar {
      display: block !important;
      width: 6px;
      cursor: pointer;
    }

    .intro::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: rgba(94, 101, 115, 0.6);
    }

    .intro h2,
    .intro h3,
    .intro p {
      margin-bottom: 10px;
      color: #555A5F;
      font-weight: 500 !important;

    }

    .intro p {
      font-size: 12px;
    }

    .intro h3 {
      border-bottom: 1px solid #cccccc;
    }
</style>