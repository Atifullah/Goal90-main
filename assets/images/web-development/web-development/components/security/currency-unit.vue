<template>
  <div class="popup repayment-popup">
    <div class="mask"></div>
    <div class="mask-content">
      <div class="head">
        <span class="title head-title">交易单位</span>
        <span class="close" @click="close(0)">
          <img src="@/static/images/an_close.png" alt />
        </span>
      </div>
       <ul class="trade-unit-alert-inner-list">
          <li :class="{'active':openType==1}" @click="setType(1)">张</li>
          <li :class="{'active':openType==2}" @click="setType(2)">{{symblefrom}}</li>
       </ul>
       <p>{{symblefrom}} 合约：1 张 = {{$store.getters.get__currency_contract_size(symblefrom)}} USDT</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "in-popup",
  validations: {
  },
  computed: {},
  props: ["symblefrom"],
  data() {
    return {
        openType:2
    };
  },
  watch: {
    symblename(newVal, oldVal) {
      if (newVal !== oldVal) {
      }
    }
  },
  methods: {
    setType(type) {
      this.$emit("confirmCurrencyUnit", type);
      this.$emit("closePopup", 0);
      this.openType = type
    },
    close() {
      this.$v.$reset();
      this.$emit("closePopup", 0);
    }
  },
  mounted() {}
};
</script>
<style lang='less' scoped>
@import "../../static/styles/auth.less";
.head-title{
    font-size: 16px;
    color: #333333;
    font-weight: 600;
}
ul{
   margin: 50px 0;
   text-align: center;
 } 
 ul li{
    display: inline-block;
    color: #9194a4;
    width: 80px;
    cursor: pointer;
    margin-right: 20px;
    border-radius: 4px;
    font-size: 32px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #d1d3df;
 } 
 li:hover{
   color:#14a2a5;
 }
 li:active{
   background: #EDEDF2;
 }
 li.active {
   background: #14a2a5;
   color: #fff;
   border-color: #14a2a5;
 }
 p{
   border-top: 1px solid #d1d3df;
   padding-top: 10px ;
   font-size: 12px;
   text-align: center;
   color: #9194a4;
 }
 .popup .mask-content{
   top: calc(50% - 256px);
 }
</style>

