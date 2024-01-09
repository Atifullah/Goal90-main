<template>
  <div class='popup border'>
    <div class="mask"></div>
    <div class='mask-content'>
      <div class="head">
        <span class='title head-title'>{{$t("Waddress.add")}}{{currencyname}}{{$t("logonHistory.address")}}</span>
        <span class="close" @click='close(0)'>
          <img src="@/static/images/an_close.png" alt="">
        </span>
      </div>
      <div v-if="!loading" class='info'>
        <div class="auth-content_group">
          <a-radio-group v-model="radioWithdrawUSDT" @change="usdtWithdrawMode" v-show="mainChains.length>0">
            <a-radio v-for="(item,i) in mainChains" :key="i" :label='i'>{{item.tokentype}}</a-radio>
          </a-radio-group>
          <p class="title clearfix">
            <span class="left ">{{$t("Waddress.coin")}}</span>
          </p>
          <div class="coinName">{{currencyname}}</div>
        </div>
        <div class="auth-content_group"
             :class="{'auth-content_group--error':$v.addMantionAddress.address.$error}">
          <p class="title clearfix">
            <span class="left ">{{$t('Waddress.mentionaddress')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addMantionAddress.address.required">{{$t('Waddress.mentionaddressNone')}}</span>
          </p>
          <input class="input ipt_hover"
                 v-model.trim="$v.addMantionAddress.address.$model"
                 :placeholder="$t('Waddress.mentionaddressInput')"
                 @blur="checkMentionAddress"
                 type="text">
        </div>
        <!--标签-->
        <div class="auth-content_group"
             v-if="currency.istagrequired">
          <p class="title clearfix">
            <span class="left ">{{$t('c2c.Addresslabel')}}</span>
          </p>
          <input class="input ipt_hover"
                 v-model.trim="$v.addMantionAddress.remarktag.$model"
                 :placeholder="$t('Waddress.remarktagInput')"
                 type="text">
        </div>
        <div class="auth-content_group"
             :class="{'auth-content_group--error':$v.addMantionAddress.remeark.$error}">
          <p class="title clearfix">
            <span class="left">{{$t('Waddress.remark')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addMantionAddress.remeark.required">{{$t('Waddress.remarkNone')}}</span>
          </p>
          <input class="input ipt_hover"
                 v-model.trim="$v.addMantionAddress.remeark.$model"
                 :placeholder="$t('Waddress.remarkInput')"
                 type="text">
        </div>
        <div class="auth-content_group"
             :class="{'auth-content_group--error':$v.addressCode.fundpassword.$error}">
          <p class="title clearfix">
            <span class="left">{{$t('c2c.FundPassword')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addressCode.fundpassword.required">{{$t('c2c.Fund')}}</span>
          </p>
          <input class="input ipt_hover"
                 v-model.trim="$v.addressCode.fundpassword.$model"
                 :placeholder="$t('c2c.FundPassword')"
                 type="password">
        </div>

        <div class="auth-content_group auth-content_group_code"
             v-if="$userinfo.isemailauthed"
             :class="{'auth-content_group--error':$v.addressCode.emailverifycode.$error}">
          <div class="title clearfix">
            <p class="left cl_ccc">
              <span>{{$t("formMenu.emailCodeVerification")}}</span>
              <span class="fr">{{global_string_split($userinfo.email)}}</span>
            </p>
            <span class="normal-tip_error right"
                  v-if="!$v.addressCode.emailverifycode.required">{{$t("formMenu.emailCodeVerificationNone")}}</span>
          </div>
          <div class="auth-content_group_mail">
            <input class="input"
                   :placeholder="$t('formMenu.emialInputVerification')"
                   type="text"  
                   v-model.trim="$v.addressCode.emailverifycode.$model"> 
            <button class="mail_code get-code button-loading--por" disabled="true" style="pointer-events: none;cursor: default;background:gray;"
                  v-hex-loading="loading" v-if="$v.addMantionAddress.address.$model==''?true:false">{{$t("formMenu.getCode")}}</button>
            <verifycode :email="$userinfo.email" 
              :template="'Withdraw'" 
              :address="$v.addMantionAddress.address.$model" 
              :amount="'0'" 
              :currencyname="currencyname.toUpperCase()"
              :remarktag="$v.addMantionAddress.remarktag.$model" v-else></verifycode>
          </div>
        </div>

        <div class="auth-content_group"
             v-if="$userinfo.isgoogleauthed"
             :class="{'auth-content_group--error':$v.addressCode.googleverifycode.$error}">
          <p class="title clearfix">
            <span class="left">{{$t('formMenu.googleCodeVerification')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addressCode.googleverifycode.required">{{$t('formMenu.googleCodeVerificationNone')}}</span>
          </p>
          <input class="input ipt_hover" v-model.trim="$v.addressCode.googleverifycode.$model"
                 :placeholder="$t('formMenu.googleInputVerification')"
                 type="text">
        </div>
        <div class="auth-content_group auth-content_group_input" style="display: none">
          <a-checkbox v-model="addMantionAddress.iswhitelist">
            <span class="label-tip">{{$t("Waddress.addWhiteList")}}</span>
          </a-checkbox>
        </div>
        <button class='commitBtn button-loading--por'
                v-hex-loading="loading"
                @click="addAddress">{{$t("Waddress.add")}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators';
  import verifycode from '@/components/public/verifycode';
  import crypto from "@/plugins/axios/crypto";
  export default {
    name: "popup-add-manton-address",
    validations: {
      addMantionAddress: {
        address: {
          required
        },
        remeark: {
          required
        },
        remarktag: {
          required: false
        }
      },
      addressCode: {
        emailverifycode: {
          required
        },
        smsverifycode: {
          required
        },
        fundpassword:{
          required
        },
        googleverifycode: {
          required
        }
      }
    },
    components: {
      verifycode
    },
    computed: {
      currencyname: function () {
        return this.currency.currencyname.toUpperCase()
      }
    },
    props: ['currency'],
    data() {
      return {
        withdrawcheck: '',
        loading: false,
        addstate: false,
        radioWithdrawUSDT: 0,
        mainChains:[],
        addMantionAddress: {
          currencyid: '',
          cType:'',
          address: '',
          remeark: '',
          remarktag: '',
          googleverifycode: '',
          emailverifycode: '',
          payPassworrd:'',
          smsverifycode: '',
          iswhitelist: true
        },
        addressCode: {
          googleverifycode: '',
          emailverifycode: '',
          smsverifycode: '',
          fundpassword:'',
        },
        sendModel: {
          template: 'Default'
        }
      }
    },
    mounted() {
      this.radioWithdrawUSDT=0;
      this.getChains();
    },
    methods: {
      checkMentionAddress() {
        if (!this.addMantionAddress.address) return;
        let postData = {
          currencyid: this.currency.id,
          address: this.addMantionAddress.address,
          cType:this.mainChains[this.radioWithdrawUSDT].maichina
        } 
       
        this.$store.dispatch('user_user_withdraw_address_check', postData).then(({data}) => {
          if (data) {
            this.withdrawcheck = data;
          }
        })
      },
      usdtWithdrawMode(value) {
        this.checkMentionAddress()
      },
      async getChains(){
            this.loading=true;
            const _self=this;
            _self.mainChains=[];
            this.radioWithdrawUSDT=0;
              try{
                  let {data} = await _self.$store.dispatch('get_user_deposit_and_withdrawl_configuration', {
                      token:this.currencyname.toLowerCase(),
                  }); 
                  if(data){
                    this.mainChains=data.mainchains;
                    this.radioWithdrawUSDT=this.mainChains.length-1;
                  }
                  this.loading=false;
              }catch(error){
                  //console.log('Error',error);
                  this.loading=false;
              }
          
            
        },
      addAddress() {
        const _self = this
        const address = Object.assign({}, _self.addMantionAddress)
        const _address = _self.$v.addMantionAddress
        let {google, phone, email, istag} = '';
        _address.$touch() 
        if (this.$userinfo.isgoogleauthed) {
          google = _self.$v.addressCode.googleverifycode
          google.$touch()
        }

        if (this.$userinfo.isemailauthed) {
          email = _self.$v.addressCode.emailverifycode
          email.$touch()
        }

        if (this.$userinfo.isemailauthed) {
          if (email.$invalid) return
        }
        if (this.$userinfo.isgoogleauthed) {
          if (google.$invalid) return
        }

        address.googleverifycode = this.addressCode.googleverifycode
        address.emailverifycode = this.addressCode.emailverifycode
        address.smsverifycode = this.addressCode.smsverifycode
        address.currencyid = this.currency.id
        address.cType=this.mainChains[this.radioWithdrawUSDT].maichina
        address.remarktag = this.addMantionAddress.remarktag
        address.payPassword=crypto.md5String(this.addressCode.fundpassword)

        if (_self.addstate) return
        _self.addstate = true
        this.loading = true;
        _self.$store.dispatch('user_user_withdraw_address_add', address)
          .then(({data, msg}) => {
            if (data) {
              _self.$store.commit('set_message', {
                type: 'ok', text: msg
              })
              if (_self.currency.page) {//用于提现地址更新视图
                this.currency.fullname = this.currency.currencyname;
                _self.close(0);
                this.$emit('address', this.currency.currencyname + ',' + this.currency.id + ',' + this.currency.assetsid);
              } else {
                _self.close(0)

                this.$pubsub.publish(this.$pubsub.addAddress)
              }
            } else {
              _self.addstate = false;
              _self.loading = false;
            }
          })
          .then(() => {
            _self.addstate = false;
            _self.loading = false;
          })
      },
      close(val) {
        this.$emit('closePopup', val);
      }
    }
  };
</script>
<style lang='less' scoped>
  @import "./../../static/styles/auth.less";

  .popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
  }

  .auth-content_group_mail .mail_code {
    height: 40px;
  }

  .auth-content_group.auth-content_group_code .title.clearfix {
    width: 400px;
  }

  .auth-content_group.auth-content_group_code .title.clearfix .left {
    width: 270px;
  }

  .auth-content_group.auth-content_group_code .title.clearfix .fr {
    color: #bbb;
  }

  .auth-content_group.auth-content_group_code .title .left,
  .popup .mask-content span {
    font-size: 12px;
    height: inherit;
    color: #fff;
  }

  .popup .mask-content .left,
  .auth-content_group.auth-content_group_code .title .cl_ccc span,
  .label-tip {
    color: rgba(102, 102, 102, 1);
  }

  .popup .mask-content span.head-title {
    color: #2c3e50;
  }

  .auth-content_group input {
    color: rgb(51, 51, 51);
  }

  .coinName {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border: 1px solid #dddddd;
    color: #000;
    font-size: 14px;
    width: 400px;
    background: rgba(240, 240, 240, 1);
  }

  .head span.title {
    font-size: 16px;
    display: initial;
  }

  .commitBtn {
    cursor: pointer;
  }

  /*usdt提现*/
  .el-radio-group {
    margin-bottom: 10px
  }
  .border{
    border: 1px solid black;
  }
</style>
