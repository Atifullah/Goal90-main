<template>
    <div class='popup'>
      <div class="mask"></div>
  <div class="mask-content">
    <div>
      <a-row :gutter="16" class="pt-2">
          <a-col :lg="3"></a-col>
          <a-col :lg="18" align="center"><img src="../../../static/images/ud-question-mark.svg"/></a-col>
          <a-col :lg="3">
              <img src="/images/ud-cross.svg" class="pointer" @click="close"/>
          </a-col>
      </a-row>
      <a-row :gutter="16" class="text-center pt-4 px-2">
          <a-col :lg="24"><p class="confirm-heading mb-2">{{$t('person.pdd9')}}</p>
              <p class="confirm-desc">{{open? this.$t('conditionaltxt.ct28') : this.$t('conditionaltxt.ct29')}}</p>
          </a-col>
      </a-row>
      <a-row :gutter="16" class="mt-3 px-2">
          <a-col :lg="12"><a-button block class="cancel-outline-btn fw-5" @click="close">{{$t('person.pd18')}}</a-button></a-col>
          <a-col :lg="12"><a-button class="primary-btn fw-5" block  @click="confirm">{{$t('person.pd19')}}</a-button></a-col>
      </a-row>
    </div>
  </div>
    </div>
  </template>
  <script>
   export default{
    props:{
        confirm:{
            type:Function
        },
        close:{
            type: Function
        },
        open:{
            type:Boolean
        }
    }
   }

  </script>
  <style lang='less' scoped>
    @import '../../../static/styles/auth';
  .confirm-heading {
      font-size: 18px;
      font-weight: 500;
      color: #081131;
  }
  .new-verification-heading {
      font-weight: 500;
  font-size: 22px;
  color: #000;
  }

  .confirm-desc {
      font-weight: 500;
  font-size: 14px;
  color: #718096;
  }
  .cancel-btn {
      background: #FFFFFF;
  border: 0.6px solid #000000;
  border-radius: 3px;
  font-weight: 400;
  font-size: 15px;
  color: #000000;
  }
    button.commitBtn.bg_bbb {
      background: #bbb !important;
    }

    .head {
      overflow: hidden;
      span {
        font-weight: 600;
      }
    }

    .popup .mask-content {
        background: #FCFCFC;
box-shadow: 0px 3px 24px rgba(0, 0, 0, 0.1);
border-radius: 12px;
  max-width: 400px;
    }
  </style>
