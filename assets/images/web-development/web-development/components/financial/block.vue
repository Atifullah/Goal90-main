<template>
  <div class="financial-product" @click="goRush">
    <img class="icon" :src="product.currencyicon" alt="">
    <p class="title" v-if="product.pronames">
       {{lang=='zh_cn'?product.pronames.zh_cn:lang=='zh_hk'?product.pronames.zh_hk:lang=='ko_kr'
              ?product.pronames.ko_kr:lang=='ja_jp'?product.pronames.ja_jp:product.pronames.en_us}}
    </p>
    <p class="rate">{{(product.yearlyrate*100).toFixed(2)}}%</p>
    <p class="rate_tip">{{$t('manage.Estimate')}}</p>
    <p class="process">
      <span class="process_tip" :style="{'width':getProcess()}"></span>
    </p>
    <p class="lock">{{$t('manage.sold')}} {{product.selledamount}}</p>
    <financial-button :product="product"></financial-button>
  </div>
</template>
<script>
  import finbutton from '@/components/financial/financial-button'
  export default {
    name: "block",
    props: {
      product: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    components: {
      'financial-button': finbutton
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.changeLang(val)
      }
    },
    data() {
      return {
        lang: this.$store.state.hex_lang.locale,
        Title:""
      };
    },
    methods: {
      goRush() {
        this.$router.push({path: '/financial/' + this.product.id})
      },
      changeLang(val){
        switch (val) {
          case 'en_us':
            this.Title = this.product.pronames.en_us
            break;
          case 'zh_cn':
            this.Title = this.product.pronames.zh_cn
            break;
          case 'ja_jp':
            this.Title = this.product.pronames.ja_jp
            break;
          case 'ko_kr':
            this.Title = this.product.pronames.ko_kr
            break;
         case 'zh_hk':
            this.Title = this.product.pronames.zh_hk
            break;
          default:
            break;
        }
      },
      getProcess() {
        let pro = Math.abs(this.$np.divide(this.product.selledamount, this.product.expectamount)) * 100
        if (pro < 0.5) {
          pro = 0.5
        }
        return pro + '%'
      }
    },
    mounted() {
      this.changeLang(this.lang)
    },
    created() {
    }
  };

</script>

<style lang='scss' scoped>
  .financial-product {
    position: relative;
    width: 270px;
    height: 324px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 5px 10px 2px rgba(51, 51, 51, 0.15);
    text-align: center;
    line-height: 1;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    cursor: pointer;
    .icon {
      width: 25px;
      height: 25px;
      margin: 25px auto 10px auto;
      display: block;
    }
    .title {
      color: #333333;
      font-size: 16px;
      margin-bottom: 35px;
      font-weight: 600;
      padding: 0 5px;
    }
    .rate {
      font-family: HexNumber;
      color: #14a2a5;
      font-size: 45px;
      font-weight: 600;
      margin-bottom: 10px;
      display: inline-block;
    }
    .rate_tip {
      margin-bottom: 35px;
      font-size: 14px;
      color: #999999;
    }
    .process {
      width: 246px;
      height: 8px;
      background: rgba(240, 240, 240, 1);
      border-radius: 2px;
      margin: 0 auto 10px auto;
      position: relative;
      .process_tip {
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        border-radius: 2px;
        height: 8px;
        background: linear-gradient(-90deg,#2cdfccd9,#1bc3b2b8);
      }
    }
    .lock {
      color: #666666;
      font-size: 14px;
    }
    .rush {
      text-align: center;
      line-height: 44px;
      color: #ffffff;
      font-size: 16px;
      background: #1bc3b2;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .no_rush {
      background: #F8F8F8;
      color: #999999;
    }
  }

  .financial-product:hover {
    transform: translateY(-10px);
  }
</style>
