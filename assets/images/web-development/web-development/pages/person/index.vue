<template>
  <div id="home" class="">


    <a-row>
      <a-col :lg="24">
        <BannerArticle />
      </a-col>
    </a-row>


    <a-row :gutter="16" v-if="$userinfo.uid">
      <a-col :lg="16">
        <a-row class="pt-3">
          <UserProfileCard ref="userProfileCard" />
        </a-row>
        <a-row class="pt-3">
          <EstimatedGraph />
        </a-row>
        <a-row class="pt-3">
          <MarketTable />
        </a-row>
      </a-col>
      <a-col :lg="8">
        <a-row class="pt-3">
          <RecentTransactions />
        </a-row>
        <a-row class="pt-3">
          <MoreServices />
        </a-row>
        <a-row class="pt-3">
          <Explore />
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :lg="24">
        <NickName :nickNameModal="nickNameModal" :close="close" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import NickName from '@/components/public/NickNameModal/NickName.vue'
import UserProfileCard from '@/components/person/Home/UserProfileCard.vue';
import EstimatedGraph from '@/components/person/Home/EstimatedGraph.vue';
import MarketTable from '@/components/person/Home/MarketTable';
import RecentTransactions from '@/components/person/Home/RecentTransactions';
import MoreServices from '@/components/person/Home/MoreServices';
import Explore from '@/components/person/Home/Explore';
import BannerArticle from '~/components/home/banner-article.vue';
import { mapGetters } from 'vuex'
export default {
  name: 'PersonDashboard',
  layout: 'dashboard',
  components: {
    UserProfileCard,
    EstimatedGraph,
    MarketTable,
    RecentTransactions,
    MoreServices,
    Explore,
    NickName,
    BannerArticle
  },
  data() {
    return {
      nickNameModal: false,
      loading: true,
      total: 0,
      found: false,
      tradingRecord: [],
      tradingRecordIndex: 1,
      tradingRecordMax: 20,
      moreState: true,
      animate: false,
      marqueeList: [],
      lang: this.$store.state.hex_lang.locale,
      timer: null,
      countryname: '',
      reg: {
        ip: new RegExp("^((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))")
      },
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null
  },
  created() {
    this.timer = setInterval(this.ScrollUp, 10000)
  },
  computed: {
    ...mapGetters('auth', ['userInfo']),
    totalAssets: function () {
      const _this = this;
      let allbtc = 0;
      _this.decimal = this.global_get_decimal('btc');
      return this.global_get_tofixed(allbtc, _this.decimal.a);
    },
    allTransition: function () {
      let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
      return alltransition;
    },
    listenLang: function () {
      return this.$store.state.hex_lang.locale;
    },
    getassiselist: function () {
      if (this.$userassets.list) {
        return this.$userassets.list.slice(0, 3);
      } else {
        return null;
      }
    }
  },
  
  watch: {
    listenLang: function (val) {
      this.lang = val;
      this.getNotice();
      this.changelang();
    },
    userInfo: function (val) {
      
      this.nickNameModal = false
      if (!val.nickname) {
        this.nickNameModal = true
      }
    }
  },
  methods: {
    getavgprice(m) {
      const ary = [1, 3, 4];
      if (ary.indexOf(m.orderstatus) < 0) {
        return '--'
      } else {
        return m.tradeavgprice
      }
    },
    coinDecimal(coin) {
      return coin.split('/')[1];
    },
    getVolume(coin) {// 已成交=委托量/成交均价
      return coin.amount / coin.tradeavgprice
    },
    changelang() {//仅仅保存国家名称
      let countryid = this.$userinfo.countryid;
      this.$store.dispatch('com_country_getlist').then(({ data }) => {
        data.find((item) => {
          if (countryid == item.countryid) {
            if (this.lang == 'zh_cn' || this.lang == 'zh_hk') {
              this.countryname = item.name;
              return;
            } else {
              this.countryname = item.engname;
              return;
            }
          }
        });
      })
    },
    handChange(val) {
      this.getUserDeal(val);
    },
    ScrollUp() {
      if (this.marqueeList.length > 1) {
        this.animate = true;
        setTimeout(() => {
          this.marqueeList.push(this.marqueeList[0]);
          this.marqueeList.shift();
          this.animate = false;
        }, 3000)
      }
    },
    getNotice() {
      let postData = {
        pageindex: 1,
        pagesize: 20,
        channelid: 16
      }
      this.$store.dispatch("com_article_search", postData).then(({ data }) => {
        if (data) {
          this.marqueeList = data.pagedata;
        }
      })
    },
    symble(s) {
      if (s) {
        return s.toUpperCase()
      }
    },
    getUserDeal(val) {
      !val ? this.tradingRecordIndex = 1 : this.tradingRecordIndex = val;
      this.$store.dispatch('trading_order_search', {
        pagesize: this.tradingRecordMax,
        pageindex: this.tradingRecordIndex
      }).then(({ data }) => {
        if (data) {
          this.total = data.totalitemcount;
          this.tradingRecord = data.pagedata;
          this.loading = false;
        } else {
          this.total = 0;
          this.found = true;
          this.tradingRecord = [];
          this.loading = false;
        }
      })
    },
    close() {
      this.nickNameModal = false;
      this.$refs.userProfileCard.updateNick();
    }
  },
  mounted() {
    this.getUserDeal()
    //用户信息
    this.getNotice()
    //余额
    this.moreState = true
    this.changelang()
    this.global_refresh_user_info()
    this.global_refresh_user_settings()
    this.global_refresh_user_assets()

    // if (!this.userInfo.nickname) {
    //   this.nickNameModal = true
    // }
    
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/user-center/home.scss';
</style>
