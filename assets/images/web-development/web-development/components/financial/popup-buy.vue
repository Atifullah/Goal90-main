<template>
  <div class='popup'>
    <div class="mask"></div>
    <div class='mask-content'>
      <div class="head">
        <span class="tip">{{$t('manage.Buynow')}}</span>
        <span class="close" @click='close(1)'>
          <img src="@/static/images/an_close.png" alt="">
        </span>
      </div>

      <div class="text-center">
        <button class='commitBtn decide-to-buy' @click='confirmBuy()'>{{$t('formMenu.confirm')}}
        </button>
        <button class='commitBtn think-again'
                @click='close(1)'>{{$t('formMenu.think')}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "popup-buy",
    props: {},
    components: {},
    data() {
      return {};
    },
    mounted() {
    },
    methods: {
      close(val) {
        this.$emit('closePopup', val);
      },
      confirmBuy(){
        this.$emit('confirmBuy');
      }
    },
  };
</script>
<style lang='less' scoped>
  @import "../../static/styles/auth.less";

  .popup {
    .text-center {
      text-align: center
    }
    .mask-content {
      width: 400px;
    }
    .decide-to-buy {
      margin-right: 20px;
    }
    .decide-to-buy, .think-again {
      width: 160px;
      line-height: 1;
    }
    .decide-to-buy {
      background: #FF8200;
      &:hover {
        background: #ee9d49 !important;
      }
    }
    .close{cursor: pointer}
  }

  .head {
    overflow: hidden;
  }

  .mask-content .head span.tip {
    color: rgba(51, 51, 51, 1);
    font-weight: 600;
  }
</style>
