<template>
  <div id="deposit-detail">
    <div class="with-draw-detail">
      <a-card class="deposit-withdraw-card" :bordered="false">
        <a-row :gutter="16">
          <a-col :lg="1" class="pt-1"
            ><img src="/images/withdraw-crypto.svg"
          /></a-col>
          <a-col :lg="23" class="pl-4">
            <p class="crypto-heading fw-5 mb-0">{{$t('withdrawal.wc1')}}</p>
            <p class="deposit-subheading fw-4">{{$t('withdrawal.wc2')}}</p>
          </a-col>
        </a-row>
        <a-form-model
          ref="withDrawDetail"
          :model="withDrawDetail"
          :hide-required-mark="true"
          label-align="left"
        >
          <a-row :gutter="16">
            <a-col :lg="12">
              <a-row class="pt-4">
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" class="mb-3">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl88')"
                    prop="selectCoin"
                    :colon="false"
                    :label-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 10,
                      xs: 10,
                    }"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }"
                  >
                    <a-select
                      v-model="currencySelected" :placeholder="$t('formMenu.select')" @change="currencyOnChange"
                      default-value="jack"
                    >
                      <a-select-option v-for="item in currencies"
                        :key="item.id"
                        :value="item.currencyname">
                        <img :src="item.icon" class="mr-1" width="15" height="15" />
                        {{item.currencyname}}</a-select-option
                      >
                    </a-select>
                    <a-row :gutter="16" class="mt-3" v-if="radio>=0 && mainChains.length>0">
                      <a-col :lg="13">
                        <ul class="withdraw-list">
                          <li class="mb-0">{{$t('withdrawal.wc3')}}</li>
                          <li class="mb-0">{{$t('withdrawal.wc4')}}</li>
                          <li class="mb-0">{{$t('withdrawal.wc5')}}</li>
                          <li class="mb-0">{{$t('withdrawal.wc6')}}</li>
                        </ul></a-col
                      >
                      <a-col :lg="11"
                        ><ul class="withdraw-list">
                          <li class="mb-0 price-list fw-5">{{mainChains[radio].minwithdrawalamount}}</li>
                          <li class="mb-0 price-list fw-5">{{mainChains[radio].maxwithdrawalamount}}</li>
                          <li class="mb-0 price-list fw-5">{{convertWithdrawlLimit}}</li>
                          <li class="mb-0 price-list fw-5">{{left}}</li>
                        </ul></a-col
                      >
                    </a-row>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl90')"
                    prop="sendToNetwork"
                    :colon="false"
                    :label-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 10,
                      xs: 10,
                    }"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }"
                  >
                    <a-select
                    v-model="radio"
                    :placeholder="$t('placeholders.plh31')"
                    >
                      <a-select-option  v-for="(item,i) in mainChains" :key="i">
                        <a-row :gutter="16">
                          <a-col :lg="12" :xl="12">{{item.tokenfullname }}</a-col>
                          <a-col :lg="12" :xl="12" align="end"> ({{item.tokentype.toUpperCase()}})</a-col>
                        </a-row>
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl91')"
                    prop="sendToAddress"
                    :colon="false"
                    :label-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 10,
                      xs: 10,
                    }"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }"
                  >
                    <a-input
                      :disabled="this.radio==-1"
                      v-model="withdrawalAddress"
                      @change="isAddressValid"
                      :placeholder="$t('placeholders.plh70')"
                    >
                      <span slot="suffix">
                        <img src="/images/send-address.svg" />
                      </span>
                    </a-input>
                    <p v-if="!valid" style="color:red; font-size:12px;">*{{$t("c2c.InvalidAddress")}}</p>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl30')"
                    prop="amount"
                    :colon="false"
                    :label-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 10,
                      xs: 10,
                    }"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }"
                  >
                    <a-input
                      v-model="amount"
                      :placeholder="$t('placeholders.plh71')"
                    />
                    <p v-if="amount>withdrawalLimit" style="color:red; font-size:12px;">*{{$t("c2c.24hrLimit")}} </p>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl92')"
                    prop="fee"
                    :colon="false"
                    :label-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 10,
                      xs: 10,
                    }"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }"
                  >
                    <a-input
                    :disabled="true"
                    :value="fee"
                    />
                  </a-form-model-item>
                </a-col> </a-row
            ></a-col>
            <a-col :lg="12">
              <a-row class="pt-4">
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl56')"
                    prop="googleVerificationCode"
                    :colon="false"
                    :label-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 10,
                      xs: 10,
                    }"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }"
                  >
                    <a-input
                      v-model="googleVerifyCode"
                      :placeholder="$t('placeholders.plh63')"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl94')"
                    prop="fundPassword"
                    :colon="false"
                    :label-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 10,
                      xs: 10,
                    }"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }"
                  >
                    <a-input
                      v-model="payPassword"
                      :placeholder="$t('placeholders.plh72')"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
                  <a-button type="primary" @click="withDraw" class="withdraw-btn mt-2" block
                    >{{$t('withdrawal.wc14')}}</a-button
                  >
                </a-col>
              </a-row>
              <div v-if="radio>=0 && mainChains.length>0">
                <p class="express-txt fw-5 pt-3 mb-1 mr-5">
                  {{$t('withdrawal.wc7')}}
                </p>
                <p class="minimum-withdraw fw-4 mb-1">{{`Minimum withdrawal amount: ${mainChains[radio].minwithdrawalamount} ${currencySelected}(${mainChains[radio].tokentype})`}}</p>
                <p class="minimum-withdraw fw-4 mb-1">{{$t('withdrawal.wc8')}}</p>
                <p class="minimum-withdraw fw-4">{{$t('withdrawal.wc9')}}</p>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <TradeTable
        :trade-table-data="mentionRecord"
        :currencySelected="currencySelected"
      />
    </div>
  </div>
</template>

  <script>
  import crypto from "@/plugins/axios/crypto";
  import Table from "./Table"
    export default {
      name: 'currency',
      components:{
        TradeTable:Table,
      },
      data() {
        return {
          withDrawDetail: {
            sendToNetwork: [],
            sendToAddress: '',
            amount: '',
            fee: '',
            googleVerificationCode: '',
            fundPassword: '',
          },
          currencies:[],
          currencySelected:'',
          radio:-1,
          mainChains:[],
          withdrawalAddress:'',
          withdrawalLimit:0,
          left:0,

          payPassword:'',
          googleVerifyCode:'',
          amount:0,
          loading: true,
          chargeRecordStatus: true,
          mentionRecordStatus: true,
          records: 2,
          chargeRecord: [],
          mentionRecord: [],
          visibleDetailRows: [],
          chargeText: true,
          total: 0,
          found: false,
          page: {
            pageindex: 1,
            pagesize: 20,
          },
          valid:true,
          local:true,

        }
      },
      computed:{
        getYouRecieve(){
          if(this.amount==0){
            return 0;
          }
         const fee=this.radio>=0 && !this.local ?parseFloat(this.mainChains[this.radio].withdrawalfee):0;
         return this.amount-fee;
        },
        fee(){
          if(!this.local && this.mainChains[this.radio]){
            return this.mainChains[this.radio].withdrawalfee;
          }
          else{
            return 0;
          }
        },
        getPrefix(){
          const currency=this.currencies?.filter(_c=>_c.currencyname==this.currencySelected);
          return currency[0]?.icon;
        },
        convertWithdrawlLimit(){
          if(this.currencySelected!=''){
            let rateList = this.$store.state.exchangeRate;
            let btcPrice=rateList.filter(t=>t.currceyname=="btc")[0];
            let selectedCurrencyPrice=rateList.filter(t=>t.currceyname==this.currencySelected.toLowerCase())[0];
            let maxAmount=(this.withdrawalLimit*btcPrice.price)/selectedCurrencyPrice?.price;
            return maxAmount;
          }

        },
      },
      methods: {
        async copyToClipboard() {
          try {
            await navigator.clipboard?.writeText(this.depositAddress);
          } catch (e) {
              //console.log(e);
          }
        },
        goToAddressBook(){
          const baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 9088}`;
          this.$router.push(`${baseURL}/person/address`)
        },
        async getChains(){
          if(!this.currencySelected==''){
            const _self=this;
            _self.mainChains=[];
            _self.radio=-1;
            _self.depositAddress='';
              try{
                  let {data} = await _self.$store.dispatch('get_user_deposit_and_withdrawl_configuration', {
                      token:this.currencySelected.toLowerCase(),
                  }); 
                  if(data){
                    this.mainChains=data.mainchains;
                    _self.radio=this.mainChains.length-1;
                  }
              }catch(error){
                  //console.log('Error',error);
              }
          }

        },
        async getWithdrawalLimit(){
            const _self=this;
              try{
                  let {data} = await _self.$store.dispatch('user_serwithdraw_maxmount_get'); 
                  if(data){
                    this.Left=data;
                  }
              }catch(error){
                  //console.log('Error',error);
              }

        },
        async getSettings(){
            const _self=this;
              try{
                  let {data} = await _self.$store.dispatch('user_user_settings_get'); 
                  if(data){
                    this.withdrawalLimit=data.withdrawlimtperday;
                  }
              }catch(error){
                  //console.log('Error',error);
              }

        },
        async isAddressValid(){
          const _self=this;
          try{
                  const id=this.getCurrencyId(this.currencySelected)
                  let {data} = await _self.$store.dispatch('user_user_withdraw_address_check', {
                    currencyID: id,
                    address: this.withdrawalAddress,
                    cType: this.mainChains[this.radio].maichina,
                  });
                  this.valid=data?data:false;
                  this.isAddressLocal(id);
              }catch(error){
                  //console.log('Error',error);
              }
        },
        async isAddressLocal(id){
          const _self=this;
          try{
                  let {data} = await _self.$store.dispatch('user_user_withdraw_address_check_isin', {
                    currencyID: id,
                    address: this.withdrawalAddress,
                    cType: this.mainChains[this.radio].maichina,
                  });
                  this.local=data?data:false;
              }catch(error){
                  //console.log('Error',error);
              }
        },
        async withDraw(){
          const _self=this;
          try{
                  const options={};
                  if(this.googleVerifyCode!=''){
                      options.googleVerifyCode=this.googleVerifyCode;
                  }
                  if(this.payPassword!=''){
                      options.paypassword=crypto.md5String(this.payPassword);
                  }
                  options.amount=_self.amount;
                  options.currencyID= _self.getCurrencyId(_self.currencySelected);
                  options.fee=!this.local && this.mainChains[this.radio]?this.mainChains[this.radio].withdrawalfee:0;
                  options.address=this.withdrawalAddress;
                  options.cType= this.mainChains[_self.radio].maichina;
                  let {data} = await _self.$store.dispatch('user_assets_withdraw',options
                  );
              }catch(error){
                  //console.log('Error',error);
              }
        },
        isVisibleDetailRow(rowid) {
          return this.visibleDetailRows.indexOf(rowid) >= 0
        },
        getRecordTime: function (coinitem) {
          return (coinitem.updatetime && coinitem.status == 1) ? this.global_get_local_time(coinitem.updatetime).format('YYYY-MM-DD hh:mm a') : this.global_get_local_time(coinitem.createtime).format('YYYY-MM-DD hh:mm a')
        },
        showDetailRow(row) {
          if (!this.isVisibleDetailRow(row.id)) {
            this.visibleDetailRows.push(row.id)
          } else {
            this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(row.id), 1);
          }
          this.$forceUpdate()
        },
        handChange(val) {
          this.getUserCoin(this.records, val);
        },
        getCurrencyId(name){
          const currency=this.currencies?.filter(_c=>_c.currencyname==name);
          return currency[0]?.id;
        },
        currencyOnChange(){
            this.getChains();
            this.getUserCoin(2,1);
        }, 
        getUserCoin(val, pageIndex) {
          this.loading = true;
          this.records = val;
          this.found = false;
          this.mentionRecord = [];
          this.chargeRecord = [];
          const id=this.getCurrencyId(this.currencySelected);
          if (val == 1) {
            this.chargeRecordStatus = true;
            this.chargeText = true;
          } else {
            this.mentionRecordStatus = true;
            this.chargeText = false;
          }
          const postData = this.page;
          postData.type = val;
          pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
          postData.currencyID=id;
          this.$store.dispatch("user_assets_exchange_record", postData)
            .then(({data}) => {
              if (data) {
                if (val == 1) {
                  this.total = data.totalitemcount;
                  this.chargeRecord = data.pagedata;
                  for (var i = 0; i < this.chargeRecord.length; i++) {
                    if(this.chargeRecord[i]['userremark'] != null && this.chargeRecord[i]['currencyname'] == 'USDT'){
                      var userremark_mention = this.chargeRecord[i]['userremark']
                      var pate = userremark_mention.match(/实际充币金额为：(\S*)，当前/)
                      if(pate != null && this.chargeRecord[i]['status'] == 1) {
                        this.chargeRecord[i]['actualtoaccount'] =  pate[1] + 'usd'
                      } else if (pate != null && this.chargeRecord[i]['status'] != 1) {
                        this.chargeRecord[i]['actualtoaccount'] =  '--'
                      } else {
                        this.chargeRecord[i]['actualtoaccount'] =  0
                      }
                    }else if(this.chargeRecord[i]['currencyname'] == 'EUR' && this.chargeRecord[i]['status'] == 1){
                      this.chargeRecord[i]['actualtoaccount'] = 0
                    }else{
                      this.chargeRecord[i]['actualtoaccount'] = 0
                    }
                  }

                  this.total ? this.found = false : this.found = true;
                } else {
                  this.total = data.totalitemcount;
                  this.mentionRecord = data.pagedata;
                  for (var i = 0; i < this.mentionRecord.length; i++) {
                    if(this.mentionRecord[i]['userremark'] != null && this.mentionRecord[i]['currencyname'] == 'USDT'){
                      var userremark_mention = this.mentionRecord[i]['userremark']
                      var pate = userremark_mention.match(/实际到账:(\S*),usd/)
                      if(pate != null && this.mentionRecord[i]['status'] == 1) {
                        this.mentionRecord[i]['actualtoaccount'] = pate[1]
                      } else if(pate != null && this.mentionRecord[i]['status'] != 1) {
                        this.mentionRecord[i]['actualtoaccount'] = '--'
                      }else {
                        this.mentionRecord[i]['actualtoaccount'] =  0
                      }
                    }else if(this.mentionRecord[i]['currencyname'] == 'EUR' && this.mentionRecord[i]['status'] == 1){
                      this.mentionRecord[i]['actualtoaccount'] = 0
                    }else{
                      this.mentionRecord[i]['actualtoaccount'] = 0
                    }
                  }
                  this.total ? this.found = false : this.found = true;
                }
              } else {
                this.total = 0;
                this.found = true;
              }
              this.loading = false;
              this.chargeRecordStatus = false;
              this.mentionRecordStatus = false;
          })
        },
      },
      mounted() { 
       this.currencySelected=this.$route.params.currency;
       this.currencies=this.$store.state.currencyinfos; 
       this.currencyOnChange();
       this.getWithdrawalLimit();
       this.getSettings();
      },

    }
  </script>
  <style lang="scss">
  @import '@/assets/scss/pages/user-center/deposit-detail.scss';
  </style>
