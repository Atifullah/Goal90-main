<template>
    <div class='popup'>
      <div class="mask"></div>
      <div class='mask-content'>
        <div class="head">
          <span class="tip">{{$t('trade.tp1')}}</span>
          <span class="close" @click='close'>
            <img src="@/static/images/an_close.png" alt="">
          </span>
        </div>
        <div class='info'>
            <div class="info-content">
                <p class="">{{$t('trade.tp2')}}</p>
                <p>{{convertData.fname}}</p>
            </div>
            <div class="info-content">
                <p class="">{{$t('trade.tp3')}}</p>
                <p>{{convertData.famount}}</p>
            </div>
            <div class="info-content">
                <p class="">{{$t('trade.tp4')}}</p>
                <p>{{convertData.tname}}</p>
            </div>
            <div class="info-content">
                <p class="">{{$t('trade.tp5')}}</p>
                <p>{{convertData.tamount}}</p>
            </div>
            
            
            
          
          
          <button class='commitBtn button-loading--por'
                  @click='ConfirmConversion'>{{$t('formMenu.confirm')}}
          </button>
        </div>
      </div>
    </div>
  </template>
  <script>

    
    export default {
      name: "popup",
      props: {
        convertData: {
          type: Object
        },
        close:{
            type:Function
        },
      },
     
      
   
      data() {
        return {
          
        };
      },
      mounted() {
       
      },
      methods: {
        async ConfirmConversion(){
            if(true){
                try{
                  const {data} = await this.$store.dispatch('user_flash_convert_confirm',{
                        fName:this.convertData.fname,
                        tName:this.convertData.tname,
                        fAmount:this.convertData.famount,
                    }); 
                    this.close();
                }catch(error){
                    //console.log(error)
                }
            }
        },
      },
    };
  </script>
  <style lang='less' scoped>
    @import "../../static/styles/auth.less";
    
    button.commitBtn.bg_bbb {
      background: #bbb !important;
    }
    
    .popup {
      .mask-content {
        .unity {
          margin-top: 30px;
          .google_span {
            line-height: 17px;
            font-size: 12px;
            color: #666;
            margin-bottom: 6px;
          }
        }
      }
    }
    
    .right {
      float: right !important;
    }
    
    .head {
      overflow: hidden;
    }
    
    .auth-content_group_mail .mail_code {
      height: 40px;
    }
    
    .auth-content_group_mail.nota input {
      width: 400px;
    }
    
    .auth-content_group.auth-content_group_code .title {
      width: 400px;
      .titlePhone {
        width: 270px;
        float: left;
      }
    }
    
    .auth-content_group_code .title.clearfix .titlePhone {
      .right {
        color: rgba(187, 187, 187, 1);
      }
      .left {
        color: rgba(102, 102, 102, 1);
      }
    }
    
    .mask-content .head span.tip {
      color: rgba(51, 51, 51, 1);
      font-weight: 600;
    }
    
    .auth-content_group.auth-content_group_code .title.googles {
      width: 400px;
    }
    
    .auth-content_group.auth-content_group_code .title .titlePhone .right {
      float: right;
    }
    
    .popup .mask-content .title span {
      font-size: 12px;
    }
    
    .auth-content_group .title {
      margin-bottom: 0;
    }
    .border{
      border: 1px solid #000;
    }
    .info-content{
        display:flex;
        justify-content: space-between;
        align-items: center;
        color:#D3D3D3;
        margin-top: 10px;
    }
    .info-content :last-child{
        margin-right:50px;
    }
  </style>
  