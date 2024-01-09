<template>
  <div>
    <div class="mask"></div>
    <div class="term">
      <div>
        <div class="head">
          <span class="titles">{{$t('legalTrad.agreement')}}</span>
          <span class="closes" @click="close"></span>
        </div>
        <div class="body" v-bar> 
            <div class="area">
               <articleinfo :channelid="terms_channelid" :subtitle="subtitle"/>  
            </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import articleinfo from "@/components/public/articleinfo";
  export default {
    name: "terms-service", 
    components: {
      articleinfo
    },
    props: ['terms_channelid','subtitle'],
    data() {
      return {  
      }
    }, 
    mounted() {  

    },
    methods: { 
      close() {
        this.$emit("close");
      }
    }
  }
</script>

<style lang="less" scoped>
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.4;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
  .term {
    position: fixed;
    width: 960px;
    background: white;
    top: 50%;
    left: 50%;
    z-index: 2;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    
    .head {
      overflow: hidden;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      padding: 0 10px 0 20px;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(240, 239, 247, 1);
      .titles {
        float: left;
      }
      .closes {
        float: right;
        width: 20px;
        height: 20px;
        background: url("../../static/images/an_close.png") no-repeat center center;
        background-size: 80% auto;
        margin-top: 11px;
      }
    }
    .body {
      padding: 30px;
      height: 600px;
      overflow-y: scroll;
      h1 {
        font-size: 20px;
        text-align: center;
      }
      .area {
        h2 {
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
        p {
          overflow: hidden;
          margin-top: 10px;
          font-size: 14px;
          line-height: 20px;
          span {
            float: left;
            color: rgba(51, 51, 51, 1);
          }
          span.disc {
            width: 877px;
          }
          
        }
      }
      
    }
  }
  
  .body::-webkit-scrollbar {
    width: 6px; //滚动条的宽度
  }
  
  .body::-webkit-scrollbar-thumb {
    background: rgba(225, 224, 236, 1);
    border-radius: 3px;
  }


</style>
