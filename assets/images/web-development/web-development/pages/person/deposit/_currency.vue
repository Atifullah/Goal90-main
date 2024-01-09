<!-- <template>
  <div id="deposit-detail">
    <div class="deposit-detail pt-3">
      <a-card class="deposit-withdraw-card" :bordered="false">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-row :gutter="16">
              <a-col :lg="6" class="pt-1"
                ><img src="/images/deposit-crypto.svg"
              /></a-col>
              <a-col :lg="18">
                <p class="crypto-heading mb-0">{{St('deposit.dc1')}}</p>
                <p class="deposit-subheading">{{St('deposit.dc2')}}</p>
              </a-col>
            </a-row>
            <a-form-model
              ref="depositDetail"
              :hide-required-mark="true"
              label-align="left"
            >
              <a-row class="pt-4">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb-3">
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
                    >
                      <a-select-option v-for="item in currencies"
                        :key="item.id"
                        :value="item.currencyname">
                        <img :src="item.icon" class="mr-1" width="15" height="15" />
                        {{item.currencyname}}</a-select-option
                      >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <a-form-model-item
                    has-feedback
                    :label="$t('labels.lbl89')"
                    prop="depositToNetwork"
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
                      @change="getAddress(radio)"
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
              </a-row>
            </a-form-model>
          </a-col>
          <a-col :lg="10">
            <p class="deposit-address">{{St('deposit.dc3')}}</p>
            <a-input :value="depositAddress">
              <span slot="suffix">
                <img src="/images/copy-txt.svg" />
              </span>
            </a-input>
            <a-card class="text-center mt-2 qrcode-card">
              <div class="canvas" v-if="depositAddress!=''">
                <canvas id="canvas" class=""></canvas>
              </div>
            </a-card>
          </a-col>
          <a-col :lg="8">
            <div v-if="radio>=0 && mainChains.length>0" class="note">
              <p class="mb-3 note-txt">{{St('deposit.dc6')}}</p>
              <p class="note-desc">{{`• Please don't deposit any other digital spot except ${currencySelected}(${mainChains[radio].tokentype}) to the above address. Otherwise, you may lose your spot permanently.`}}</p>
              <p class="note-desc">{{`• Depositing to the above address requires confirmations of the entire network. It will arrive after ${mainChains[radio].arrivaltime} confirmations, and it will be available to withdraw after ${mainChains[radio].arrivaltime} confirmations.`}}</p>
              <p class="note-desc">{{`• Minimum deposit amount: 1 ${currencySelected}(${mainChains[radio].tokentype}). Any deposits less than the minimum will not be credited or refunded.`}}</p>
              <span v-show="showMore">
              <p class="note-desc">• {{St('deposit.dc4')}}</p>
              <p class="note-desc">• {{St('deposit.dc5')}}</p>
              <p class="note-desc">{{`• ${currencySelected} You can only deposit via the functions of transfer or transferFrom on etherum network. We apologize that deposit via other functions will not be credited.`}}</p>
              </span>
              <p class="note-txt" style="cursor: pointer; text-decoration:underline;" @click="showMore=!showMore">{{showMore? 'Less' : 'More'}}</p>

            </div>
          </a-col>
        </a-row>
      </a-card>
      <TradeTable
        :trade-table-data="chargeRecord"
        :currencySelected="currencySelected"
      />
    </div>
  </div>
</template>

  <script>
  import myQRCode from 'qrcode';
  import Table from "./Table.vue"
    export default {
      name: 'currency',
      components:{
        TradeTable: Table
      },
      data() {
        return {
          showMore:false,
          currencies:[],
          currencySelected:'',
          chain:null,
          radio:-1,
          mainChains:[],
          depositAddress:'',
          loading: true,
          chargeRecordStatus: true,
          mentionRecordStatus: true,
          records: 1,
          chargeRecord: [],
          mentionRecord: [],
          visibleDetailRows: [],
          chargeText: true,
          total: 0,
          found: false,
          page: {
            pageindex: 1,
            pagesize: 20,
          }
        }
      },
      methods: {
        async copyToClipboard() {
          try {
            await navigator.clipboard?.writeText(this.depositAddress);
          } catch (error) {
              //console.log(error);
          }
        },
        bindQRCode(code) {
        const _self=this;
        let bb;
        bb = setInterval(function () {
          if (document.getElementById('canvas')) {
            myQRCode.toCanvas(document.getElementById('canvas'),
            'withdraw:'+code, {
              errorCorrectionLevel: 'H',
              quality: 1,
              toSJISFunc: myQRCode.toSJIS,
              width: 200,
              height: 200,
              color: {
                dark: "#000000",
                light: "#ffffff",
              }
            }, function (error) {
              if (error) console.error(error);
            });
            clearInterval(bb);
          }
        }, 100)

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
                    if(_self.radio>=0){
                      _self.getAddress(_self.radio)
                    }
                  }
              }catch(error){
                  //console.log('Error',error);
              }
          }

        },
        async getAddress(i){ 
          this.depositAddress='';
            const _self=this;
              try{
                  let {data} = await _self.$store.dispatch('get_user_deposit_address', {
                      token:_self.currencySelected.toLowerCase(),
                      mainToken: _self.mainChains[i].maichina
                  }); 
                  if(data){
                    _self.depositAddress=data;
                    const datas={
                      address:data,
                      token:_self.currencySelected,
                      mainToken:_self.mainChains[i].maichina
                    }
                    _self.bindQRCode(JSON.stringify(datas));
                  }
              }catch(error){
                  //console.log('Error',error);
              }
        },

        getCurrencyId(name){
          const currency=this.currencies.filter(_c=>_c.currencyname==name);
          return currency[0].id;
        },
        currencyOnChange(){
            this.getChains();
            this.getUserCoin(1,1);
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
      },

    }
  </script>
  <style lang="scss">
  @import '@/assets/scss/pages/user-center/deposit-detail.scss';
  </style> -->
