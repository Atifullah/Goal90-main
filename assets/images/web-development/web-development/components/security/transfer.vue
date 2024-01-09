<template>
  <div class="transfer-modal">
    <a-modal
      id="transfer-modal"
      :loading="loading"
      v-model="transfer_pop"
      width="450px"
      :footer="false"
      @cancel="close"
    >
      <a-row :gutter="16" class="col-alignment mb-4">
        <a-col :lg="12">
          <p class="transfer-crypto fw-5 mb-0">
            {{ $t("security.cc31") }}
          </p>
        </a-col>
        <a-col :lg="12" align="end"
          ><img src="/images/ud-cross.svg" @click="close" class="pointer"
        /></a-col>
      </a-row>
      <a-form-model
        :model="selectaccountMode"
        ref="selectaccountMode"
        :hide-required-mark="true"
        label-align="left"
        :rules="rules"
      >
        <p class="network-inch fw-5 pt-2 pb-3">{{ $t("bscard.bsc45") }}</p>
        <a-card class="orange-transfer-bg" :bordered="false">
          <a-row :gutter="16" class="col-alignment">
            <a-col :lg="6">
              <p class="from-dropdown fw-5 mb-0">
                <img src="/images/from-trade.svg" class="mr-3" /> From
              </p>
            </a-col>
            <a-col :lg="18">
              <a-form-model-item has-feedback  prop="from" :colon="false" :wrapper-col="{xl: 24,lg: 24,md: 24, sm: 24,xs: 24,}">
                <a-select v-model="selectaccountMode.faccount" :placeholder="$t('formMenu.select')" >
                  <a-select-option v-for="item in accountdatas" :key="item.account" :value="item.account" v-if="selectaccountMode.taccount != item.account || (item.account == 2 || item.account == 3)">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="col-alignment">
            <a-col :lg="12">
              <img src="/images/down-arrow1.svg" class="pointer" />
            </a-col>
            <a-col :lg="12" class="pointer pr-0" align="end">
              <img src="/images/convert1.svg" @click="changeTransferType" />
            </a-col>
          </a-row>
          <a-row :gutter="16" class="col-alignment">
            <a-col :lg="6">
              <p class="from-dropdown fw-5 mb-0">
                <img src="/images/to-trade.svg" class="mr-3" /> To
              </p>
            </a-col>
            <a-col :lg="18">
              <a-form-model-item has-feedback prop="to" :colon="false"
                :wrapper-col="{xl: 24,lg: 24,md: 24, sm: 24,xs: 24,}">
                <a-select v-model="selectaccountMode.taccount" :placeholder="$t('formMenu.select')" >
                  <a-select-option v-for="item in accountdatas" :key="item.account" :value="item.account" v-if="selectaccountMode.faccount != item.account || (item.account == 2 || item.account == 3)">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-card>
        <a-row :gutter="16">
          <a-col :xs="selectaccountMode.twoSymbles" :sm="selectaccountMode.twoSymbles" :md="selectaccountMode.twoSymbles" :lg="selectaccountMode.twoSymbles" :xl="selectaccountMode.twoSymbles"
            class="mt-2 mb-3" v-if="selectaccountMode.faccount == 2 || selectaccountMode.faccount == 3">
            <a-form-model-item has-feedback :label="'From ' + $t('home.tradeOn')"  prop="selectNetwork" :colon="false"
              :wrapper-col="{ xl: selectaccountMode.twoSymbles, lg: selectaccountMode.twoSymbles,  md: selectaccountMode.twoSymbles,  sm: selectaccountMode.twoSymbles, xs: selectaccountMode.twoSymbles, }">
              <a-select v-model="selectaccountMode.fctid"  :placeholder="$t('formMenu.select')" @change="inputamountValidate"  >
                <a-select-option  v-for="item in fsymbleinfos" :key="item.id" :value="item.id" :label="item.descriptions.replace('YX', 'USDT')" v-if="selectaccountMode.tctid != item.id">
                  {{ item.descriptions.replace("YX", "USDT") }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="selectaccountMode.twoSymbles" :sm="selectaccountMode.twoSymbles" :md="selectaccountMode.twoSymbles" :lg="selectaccountMode.twoSymbles" :xl="selectaccountMode.twoSymbles"
            class="mt-2 mb-3" v-if="(selectaccountMode.taccount == 2 || selectaccountMode.taccount == 3)">
            <a-form-model-item has-feedback  :label="'To ' + $t('home.tradeOn')"  prop="selectNetwork" :colon="false"
              :wrapper-col="{ xl: selectaccountMode.twoSymbles, lg: selectaccountMode.twoSymbles, md: selectaccountMode.twoSymbles, sm: selectaccountMode.twoSymbles,  xs: selectaccountMode.twoSymbles, }" >
              <a-select v-model="selectaccountMode.tctid" :placeholder="$t('formMenu.select')" @change="inputamountValidate">
                <a-select-option v-for="item in tsymbleinfos" :key="item.id" :value="item.id" :label="item.descriptions.replace('YX', 'USDT')" v-if="selectaccountMode.fctid != item.id">
                  {{ item.descriptions.replace("YX", "USDT") }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="my-3" v-if="currencyinfos.length <= 2 && currencyinfos.length>0" >
            <div class="token-btn">
              <div class="left-token">
                <p class="mb-0 network-inch fw-5">
                  {{ $t("wallet.coin") }}
                </p>
              </div>
              <div class="right-token">
                <div class="btn-box">
                  <a-button class="fw-5" :class="selectaccountMode.currencyid == currencyinfos[1].id? 'btc-usdt-btn': 'usdt-btn'"
                    @click="setAssetType(currencyinfos[1].id,currencyinfos[1].currencyname)" v-if="currencyinfos.length>1">
                    {{ currencyinfos[1].currencyname }}</a-button>
                  <a-button class="fw-5" :class="selectaccountMode.currencyid ==currencyinfos[0].id? 'btc-usdt-btn': 'usdt-btn'"
                    @click="setAssetType(currencyinfos[0].id,currencyinfos[0].currencyname)">
                    {{currencyinfos[0].currencyname.replace("YX", "USDT")}}</a-button>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24"  :md="24" :lg="24" :xl="24"  class="mt-2 mb-3" v-if="currencyinfos.length>2 && selectaccountMode.faccount>0 && selectaccountMode.taccount>0 && selectaccountMode.taccount != 4 && selectaccountMode.taccount != 2  && selectaccountMode.faccount != 2" >
            <a-form-model-item has-feedback :label="$t('Waddress.selectCion')" prop="selectNetwork" :colon="false" :wrapper-col="{xl: 24,lg: 24,md: 24,sm: 24,xs: 24,}">
              <a-select v-model="selectaccountMode.currencyid" :placeholder="$t('formMenu.select')" @change="inputamountValidate" >
                <a-select-option v-for="item in currencyinfos" :key="item.id" :value="item.id" :label="item.currencyname">
                  {{ item.currencyname }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <a-row :gutter="16" class="mt-2">
              <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <p class="network-inch fw-5">Amount</p>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" align="end">
                <p class="label-sec">
                  {{ $t("leverage.Transferable") }}
                  {{ selectaccountMode.canuseamount }}
                  {{ selectaccountMode.currencyname.replace("YX", "USDT") }}
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <a-row>
              <a-col :lg="21">
                <a-form-model-item has-feedback prop="inputamount"
                  :colon="false" :wrapper-col="{xl: 24,lg: 24,md: 24,sm: 24,xs: 24,}"> 
                  <a-input
                    class="transfer-crypto-input"
                    v-model="selectaccountMode.inputamount"
                    :disabled="disabledInput ? true : false"
                    placeholder="Enter Amount"
                  >
                    <span slot="suffix" class="btc-gray-txt fw-3">
                      <!-- <img src="/images/btc-gray.svg" class="mr-1" /> -->
                      {{selectaccountMode.currencyname? selectaccountMode.currencyname.replace("YX", "USDT") : "" }}</span
                    >
                  </a-input>
                </a-form-model-item>
              </a-col>
              <a-col :lg="3">
                <p
                  class="text-center all-transfer-txt mb-0"
                  @click="setAllGo()"
                >
                  {{ $t("manage.all") }}
                </p>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row class="text-center mt-4" :gutter="16">
          <a-col :lg="12">
            <a-button class="cancel-outline-btn fw-5" block @click="close">{{ $t("security.cc29") }}</a-button>
          </a-col>
          <a-col :lg="12">
            <a-button class="primary-btn fw-5" block @click="confirmToTransferContract" :class="parseFloat(selectaccountMode.inputamount) > parseFloat(selectaccountMode.canuseamount) ? 'disabled-btn' : 'primary-btn'">
              {{ $t("formMenu.confirm") }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "contract-transfer-popup",
  props: ["ctid", "type", "currencyid", "transfer_pop", "closePopup"], //交易对id;转账类型；币种ID
  watch: {
    "selectaccountMode.faccount": function (val) {
      if (val) {
        this.resetAccountMode()
        if (this.selectaccountMode.faccount == 1) { // SPOT账户
          var nowcurrencyinfos=this.$store.state.currencyinfos.filter((t) => {
            return this.currencyinfos.filter(m=>m.id==t.id).length>0 || this.fsymbleinfos.filter(m=>m.fcurrencyid==t.id || m.tcurrencyid==t.id).length>0;
          }) 
          this.currencyinfos = nowcurrencyinfos;
        }
        if (this.selectaccountMode.faccount == 2) { // 杠杠
          this.handldMarginTo()
        }
        if (this.selectaccountMode.faccount == 3) {//币本位合约
            this.fsymbleinfos= this.$store.state.symbleinfos.filter((item) => {
                              return item.itype==1;
                            });
        }
        if (this.selectaccountMode.faccount == 4) { // U本位合约
          this.currencyinfos=this.$store.state.currencyinfos.filter((t) => {
              return t.currencyname == "USDT";
          })
          if (this.currencyinfos.length > 0) {
              this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
            }
        } else {
          if (this.selectaccountMode.taccount == 4) {//U本位合约
            this.currencyinfos=this.$store.state.currencyinfos.filter((t) => { return t.currencyname == "USDT"; }); 
            this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
          }
          if ((this.selectaccountMode.taccount == 5 && this.selectaccountMode.faccount == 1) || (this.selectaccountMode.taccount == 1 && this.selectaccountMode.faccount == 5)) { // c2c账户
            this.handCTCAndSpot()
          }
          
        }
        if (this.selectaccountMode.taccount == 2) {
          this.handldToMargin()
        }
      }
    },
    "selectaccountMode.taccount": function (val) {
      if(val>0) {    
        this.resetAccountMode()
        if (this.selectaccountMode.taccount == 1) { // 其它账户转SPOT账户   
            var nowcurrencyinfos=this.$store.state.currencyinfos.filter((t) => {
              return this.currencyinfos.filter(m=>m.id==t.id).length>0 || this.fsymbleinfos.filter(m=>m.fcurrencyid==t.id || m.tcurrencyid==t.id).length>0;
            }) 
            this.currencyinfos = nowcurrencyinfos;
            this.selectaccountMode.currencyid = this.currencyinfos.length > 0 ? this.currencyinfos[0].id : ''
            if ((this.selectaccountMode.taccount == 5 && this.selectaccountMode.faccount == 1) || (this.selectaccountMode.taccount == 1 && this.selectaccountMode.faccount == 5)) { // c2c账户
              this.handCTCAndSpot()
            }
        }
        if (this.selectaccountMode.taccount == 2) {//杠杠
          this.handldToMargin()
        }
        if (this.selectaccountMode.taccount == 3) {//币本位合约
          if(this.currencyinfos.length>0){
              this.tsymbleinfos= this.$store.state.symbleinfos.filter((item) => {
                return item.itype==1 && this.currencyinfos.filter(m=>m.id==item.fcurrencyid || m.id==item.tcurrencyid).length>0;
              });
          }
          else{
              this.tsymbleinfos= this.$store.state.symbleinfos.filter((item) => {
                return item.itype==1;
              });
           }
            this.currencyinfos=[];
        }
        if (this.selectaccountMode.taccount == 4) {//U本位合约
            this.currencyinfos=this.$store.state.currencyinfos.filter((t) => { return t.currencyname == "USDT"; })
            this.selectaccountMode.currencyid = this.currencyinfos[0].id;
            this.selectaccountMode.currencyname = this.currencyinfos[0].currencyname; 
            this.tsymbleinfos= []
            if (this.currencyinfos.length > 0) {
                this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
              }
        }
        if (this.selectaccountMode.taccount == 5) { //c2c账户
            if (this.selectaccountMode.faccount != 4) {
              this.currencyinfos = this.p2pcurrencyinfos
              if (this.currencyinfos.length > 0 && this.selectaccountMode.canuseamount <= 0) {
                this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
              }
            } else {
              if (this.currencyinfos.length > 0) {
                this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
              }
            }
            
        }
        if (this.selectaccountMode.faccount == 4) {//从U本位合约划转
            this.currencyinfos=this.$store.state.currencyinfos.filter((t) => { return t.currencyname == "USDT"; });
            if (this.currencyinfos.length > 0) {
                this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
              }
            console.log('currencyinfos===', this.currencyinfos)
        }
        if (this.selectaccountMode.faccount == 2) { // 从杠杆账户划转
          this.handldMarginTo()
        }
      }
    },
    "selectaccountMode.fctid": {
      deep: true,
      handler(val, oldValue) {
        if (val > 0) {
          this.fsymbleinfo= this.$store.state.symbleinfos.filter((item) => {
            return item.id == val;
          })[0];
          if(this.fsymbleinfo.fcurrencyid>0 && this.tsymbleinfo.fcurrencyid>0 && this.fsymbleinfo.fcurrencyid!=this.tsymbleinfo.fcurrencyid){
              this.selectaccountMode.currencyid = this.tsymbleinfo.tcurrencyid;
              this.selectaccountMode.currencyname = this.tsymbleinfo.tcurrencyname;
              this.currencyinfos=this.$store.state.currencyinfos.filter((t) =>t.id==this.fsymbleinfo.tcurrencyid);
          }else  {
              
              
              if (this.selectaccountMode.taccount == 5) {
                this.currencyinfos = this.$store.state.currencyinfos.filter((t) =>t.id==this.fsymbleinfo.fcurrencyid || t.id==this.fsymbleinfo.tcurrencyid);
                this.currencyinfos = this.currencyinfos.filter(item => this.p2pcurrencyinfos.some(ele=> ele.id === item.id))
                this.selectaccountMode.currencyid = this.currencyinfos[this.currencyinfos.length - 1].id;
                this.selectaccountMode.currencyname = this.currencyinfos[this.currencyinfos.length - 1].currencyname
              } else {
                this.selectaccountMode.currencyid = this.fsymbleinfo.fcurrencyid;
                this.selectaccountMode.currencyname = this.fsymbleinfo.fcurrencyname;
                this.currencyinfos=this.$store.state.currencyinfos.filter((t) =>t.id==this.fsymbleinfo.fcurrencyid || t.id==this.fsymbleinfo.tcurrencyid);
              }
          }
          if (this.selectaccountMode.taccount == 4 || this.selectaccountMode.faccount == 4) {//U本位合约
            this.currencyinfos=this.$store.state.currencyinfos.filter((t) => { return t.currencyname == "USDT"; })
            if (this.currencyinfos.length) {
              this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
            } 
          } 
          //else if (this.selectaccountMode.taccount == 5) {
            
            // if (this.currencyinfo.length > 0) {
            //   this.setAssetType(this.currencyinfos[this.currencyinfo.length - 1].id, this.currencyinfos[this.currencyinfo.length - 1].currencyname)
            // }

            // this.selectaccountMode.currencyid = this.currencyinfos[this.currencyinfo.length - 1].id;
            //   this.selectaccountMode.currencyname = this.currencyinfos[this.currencyinfo.length - 1].currencyname
            
          //}
          this.initamount();
      } else {
        this.fsymbleinfo = {}
      }
      }
    },
    "selectaccountMode.tctid": {
      deep: true,
      handler(val, oldValue) {
        if (val > 0) {  
          this.tsymbleinfo= this.$store.state.symbleinfos.filter((item) => {
              return item.id == val;
          })[0];
          console.log('this.tsymbleinfo===', this.tsymbleinfo)
          if(this.fsymbleinfo.fcurrencyid>0 && this.tsymbleinfo.fcurrencyid>0 && this.fsymbleinfo.fcurrencyid!=this.tsymbleinfo.fcurrencyid){
              this.selectaccountMode.currencyid = this.tsymbleinfo.tcurrencyid;
              this.selectaccountMode.currencyname = this.tsymbleinfo.tcurrencyname;
              this.currencyinfos=this.$store.state.currencyinfos.filter((t) =>t.id==this.tsymbleinfo.tcurrencyid);
          }else{
              this.selectaccountMode.currencyid = this.tsymbleinfo.fcurrencyid;
              this.selectaccountMode.currencyname = this.tsymbleinfo.fcurrencyname; 
              this.currencyinfos=this.$store.state.currencyinfos.filter((t) =>t.id==this.tsymbleinfo.fcurrencyid || t.id==this.tsymbleinfo.tcurrencyid);
          }
          if (this.selectaccountMode.taccount == 4 || this.selectaccountMode.faccount == 4) {//U本位合约
            this.currencyinfos=this.$store.state.currencyinfos.filter((t) => { return t.currencyname == "USDT"; })
            if (this.currencyinfos.length > 0) {
              this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
            } 
          } else if (this.selectaccountMode.faccount != 2 && this.selectaccountMode.taccount == 2) {
            if (this.currencyinfos.length > 0) {
              this.setAssetType(this.currencyinfos[1].id, this.currencyinfos[1].currencyname)
            }
          }
          this.initamount();
      } else {
        this.tsymbleinfo = {}
      }
      }
    },
    "selectaccountMode.currencyid": function (val) {
      console.log('555555', val)
      if (val > 0) {
        var nowcurrencyInfo = this.$store.state.currencyinfos.filter((item) => {
                                return item.id == val;
                              })[0];
        this.selectaccountMode.currencyid = nowcurrencyInfo.id;
        // if (this.selectaccountMode.faccount == 4) {
        //   this.selectaccountMode.currencyname = USDT
        // } else {
        //   this.selectaccountMode.currencyname = nowcurrencyInfo.currencyname;
        // }
        this.selectaccountMode.currencyname = nowcurrencyInfo.currencyname;
        this.initamount();
      }
    },
    "selectaccountMode.canuseamount": function (val) {
      if (val > 0) {
        this.disabledInput = false;
      } else {
        this.disabledInput = true;
      }
    },
  },
  data() {
    return {
      timer: null,
      disabledInput: true,
      transferloading: false,
      loading: false,
      fsymbleinfos: [], //所有交易对
      tsymbleinfos: [], //所有交易对
      currencyinfos: [], //选择代币
      p2pcurrencyinfos: [], //所有币种名称
      fsymbleinfo: {}, //交易对信息
      tsymbleinfo: {}, //交易对信息
      accountdatas: [
        { account: 1, label: this.$t("contract.ccAcc") },
        { account: 2, label: this.$t("wallet.leveraged") }, //type: 1 //资产转杠杆账户  //type: 2 //杠杆账户转资产账户
       // { account: 3, label: this.$t("contract.contractAcc") }, //type: 3 //资产转合约账户  //type: 4 //合约账户转资产账户
        //{ account: 4, label: this.$t("contract.contractAcc_usdt") }, //type: 9 //资产转U合约账户  //type: 10 //U合约账户转资产账户
        { account: 4, label: this.$t("contract.contractAcc") },
        { account: 5, label: this.$t("contract.p2p") }, //type: 5 //资产转买币账户  //type: 6 //买币账户转资产
        // {account:6,  label: this.$t('game.gameaccount') }//type://type: 7 //资产转游戏账户  //type: 8 //游戏转资产账户
      ],
      selectaccountMode: {
        faccount: 0,
        taccount: 0,
        twoSymbles: 24, //如果是2个交易对账户互转，就是12，单个交易对账户就是24
        fctid: '', //选中交易对ID
        tctid: '', //选中交易对ID
        currencyid: '', //选中币种ID
        currencyname: "", //选中的币名称
        canuseamount: '', //可以转金额
        inputamount: '', //要转入转出币种金额
      },
      rules: {
        inputamount: [
          {
            required: true,
            message: "Amount is required!",
          },
          {
            validator: async (rule, value, callback) => {
              if (this.selectaccountMode.inputamount != 0) {
                this.selectaccountMode.inputamount =
                  this.selectaccountMode.inputamount.replace(/[^0-9.]/g, "");
              } else if (this.selectaccountMode.canuseamount != 0) {
                  callback(new Error("Amount should be greater than 0"));
              }
              if (
                !this.selectaccountMode.inputamount > 0 &&
                this.selectaccountMode.canuseamount != 0
              ) {
                  callback(new Error("Amount should be greater than 0"));
              } else if (
                  parseFloat(this.selectaccountMode.inputamount) >
                  parseFloat(this.selectaccountMode.canuseamount)
              ) {
                  callback(new Error("Amount is more than Transferable"));
              } else {
                
                let length = this.selectaccountMode.canuseamount.toString().split(".").length > 0 ? this.selectaccountMode.canuseamount.toString().split(".")[1].length : 0
                
                if (!this.isInteger(this.selectaccountMode.inputamount)) {
                  console.log("111111")
                  let length1 =  this.selectaccountMode.inputamount.toString().split(".").length > 0 ?  this.selectaccountMode.inputamount.toString().split(".")[1].length : 0
                  if (length < length1) {
                    callback(new Error("Amount enter decimal places of the same length"));
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              }
            },
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  created() {
      if (!this.$userinfo.uid) {
          this.$router.push("/login?returnurl=" + this.$route.path);
          return;
      }
  },
  mounted() { 
    var _self=this;
    this.loading = true
     this.$store.dispatch("frenchcurrency_get_c2c", {}).then(({ data }) => {
        this.loading = false
              if (data) { 
                data.forEach((item) => {
                    var citem = _self.$store.state.currencyinfos.filter((t) => {
                      return t.currencyname == item;
                    })[0];
                    _self.p2pcurrencyinfos.push(citem); 
                }); 
                if(_self.type==1){
                      _self.selectaccountMode.faccount=1;
                      _self.selectaccountMode.taccount=2;
                    }
                    if(_self.type==2){
                      _self.selectaccountMode.faccount=2;
                      _self.selectaccountMode.taccount=1;
                    }
                    if(_self.type==3){
                      _self.selectaccountMode.faccount=1;
                      // _self.selectaccountMode.taccount=3;
                      _self.selectaccountMode.taccount=4
                    }
                    if(_self.type==4){
                      _self.selectaccountMode.faccount=3;
                      _self.selectaccountMode.taccount=1;
                    }
                    if(_self.type==5){
                      _self.selectaccountMode.faccount=1;
                      _self.selectaccountMode.taccount=5;
                    }
                    if(_self.type==6){
                      _self.selectaccountMode.faccount=5;
                      _self.selectaccountMode.taccount=1;
                    }
                    if(_self.type==7){
                      _self.selectaccountMode.faccount=1;
                      _self.selectaccountMode.taccount=6;
                    } 
                    if(_self.type==8){
                      _self.selectaccountMode.faccount=6;
                      _self.selectaccountMode.taccount=1;
                    }
                    if(_self.type==9){
                      _self.selectaccountMode.faccount=1;
                      _self.selectaccountMode.taccount=4;
                    } 
                    if(_self.type==10){
                      _self.selectaccountMode.faccount=4;
                      _self.selectaccountMode.taccount=1;
                    }  
              }
        });  
  },
  methods: {
    isInteger(num) {
      return /^[0-9]+$/.test(num); // 只包含数字且不能有其他特殊符号
    },
    inputamountValidate() {
      this.$refs.selectaccountMode.clearValidate("inputamount");
    },
    // 转到杠杆
    handldToMargin() {
      if(this.currencyinfos.length>0) {
        this.tsymbleinfos= this.$store.state.symbleinfos.filter((item) => {
          return item.itype==0 && item.borrowmultiple>0 && this.currencyinfos.filter(m=>m.id==item.fcurrencyid || m.id==item.tcurrencyid).length>0;
        }); 
      }else{
        this.tsymbleinfos= this.$store.state.symbleinfos.filter((item) => {
          return item.itype==0 && item.borrowmultiple>0;
        });
      }
      if (this.tsymbleinfos.length > 0) {
        if (this.selectaccountMode.faccount == 2) {
          console.log('222222')
          this.selectaccountMode.tctid = this.tsymbleinfos.length > 1? this.tsymbleinfos[1].id : ''
        } else {
          console.log('222222')
          this.selectaccountMode.tctid = this.tsymbleinfos[0].id
        }
        
      }
      
    },
    // 杠杆账户转出
    handldMarginTo() {
      this.fsymbleinfos = this.$store.state.symbleinfos.filter((item) => {
        return item.itype==0 && item.borrowmultiple>0;
      });
      if (this.fsymbleinfos.length > 0) {
        console.log('this.selectaccountMode', this.selectaccountMode.fctid)
        this.selectaccountMode.fctid = this.fsymbleinfos[0].id
        console.log('this.selectaccountMode2222', this.selectaccountMode.fctid)
      }
    },
    // 现货与ctc互转
    handCTCAndSpot() {
      if (this.selectaccountMode.faccount != 4) {
        this.currencyinfos = this.p2pcurrencyinfos
        if (this.currencyinfos.length > 0 && this.selectaccountMode.canuseamount <= 0) {
          this.setAssetType(this.currencyinfos[0].id, this.currencyinfos[0].currencyname)
        }
      }
    },
    resetAccountMode() {
      this.selectaccountMode.canuseamount = ''
      this.selectaccountMode.tctid = ''
      this.selectaccountMode.currencyid = ''
      this.selectaccountMode.currencyname = ''
      this.selectaccountMode.inputamount = ''
      this.selectaccountMode.fctid = ''
      this.fsymbleinfo = {}
      this.tsymbleinfo = {}
    },
    setAssetType(currencyid, currencyname) {
      console.log('eeee', currencyid)
      console.log('currencyname====', currencyname)
        this.selectaccountMode.currencyid = currencyid; //要转入转出币种id
        this.selectaccountMode.currencyname = currencyname; //要转入的币种ID
        this.initamount();
    },
    initamount() {
        this.selectaccountMode.inputamount = '';
        this.selectaccountMode.canuseamount = 0;
        if (this.selectaccountMode.faccount==1 && this.selectaccountMode.currencyid>0) {
            //console.log('LoadSpotAssets')
            this.LoadSpotAssets();
        } else if (this.selectaccountMode.faccount==2 && this.selectaccountMode.fctid>0) {
            //console.log('LoadMarginAssets')
            this.LoadMarginAssets();
        } else if (this.selectaccountMode.faccount==3 && this.selectaccountMode.fctid>0) {
            //console.log('LoadContractAssets')
            this.LoadContractAssets();
        } else if (this.selectaccountMode.faccount==4 && this.selectaccountMode.currencyid>0) {
            //console.log('LoadContractAssets_USDT')
            this.LoadContractAssets_USDT();
        } else if (this.selectaccountMode.faccount==6 && this.selectaccountMode.currencyid>0) {
            //console.log('LoadGameAssets')
            this.LoadGameAssets();
        } else if (this.selectaccountMode.faccount==5 && this.selectaccountMode.currencyid>0) {
            //console.log('LoadP2pAssets')
            this.LoadP2pAssets();
        } 
    },
    setAllGo() {
      /*是否全部划转*/
      if (this.selectaccountMode.currencyid > 0) {
          this.selectaccountMode.inputamount = this.selectaccountMode.canuseamount;
      } else {
          this.$store.commit("set_message", {
              type: "error",
              text: this.$t("Waddress.selectCion"),
          });
          return;
      }
    },
    async confirmToTransferContract() {
      //确定转账
      await this.$refs["selectaccountMode"].validate(async (valid) => {
        if (valid) {
          this.transferloading = true;
          const params = {
            faccount: this.selectaccountMode.faccount,
            taccount: this.selectaccountMode.taccount,
            fctid: this.selectaccountMode.fctid,
            tctid: this.selectaccountMode.tctid,
            currencyid: this.selectaccountMode.currencyid,
            amount: this.selectaccountMode.inputamount,
          };
          var _self = this;
          this.loading = true
          _self.$store
            .dispatch("userborrowmoney_user_transfer_inorout", params)
            .then((data) => {
              this.loading = false
              if (data.data) {
                _self.transferloading = false;
                _self.$store.commit("set_message", {
                    type: "ok",
                    text: data.msg,
                });
                _self.$pubsub.publish(_self.$pubsub.getOrderList);
                _self.close();
              }
            });
        }
      });
    },
    changeTransferType() {
      /*改变划转类型*/
      var taccount=this.selectaccountMode.faccount;
      this.selectaccountMode.faccount = this.selectaccountMode.taccount;
      this.selectaccountMode.taccount = taccount;
      this.transferloading = true;
      this.timer = setTimeout(() => {
          this.transferloading = false;
          this.initamount();
      }, 100);
    },
    LoadSpotAssets() {
      const _self = this;
      var params = { tokens : this.selectaccountMode.currencyname };
      this.loading = true
      this.$store.dispatch("user_assets_get", params).then(({ data }) => {
        console.log('user_assets_get===', data)
        this.loading = false
        if (data.length) {  
           var nowcurrencyInfo = this.$store.state.currencyinfos.filter((item) => {
              return item.id == _self.selectaccountMode.currencyid;
            })[0];
           _self.selectaccountMode.canuseamount = _self.global_get_tofixed(data[0].canuseamount,nowcurrencyInfo.precision);
        }
      });
    },
    LoadContractAssets() {
      const _self = this;
      this.loading = true
      this.$store
        .dispatch("usercontract_user_contractassets_infos", {
            ctid: this.selectaccountMode.fctid,
        })
        .then(({ data }) => {
          this.loading = false
          if (data) {
            console.log('data----', data)
            var symbleinfo = this.getContractsInfos(data, 1);
            symbleinfo.map((item, i) => {
                if (_self.selectaccountMode.currencyname == item.symblename) {
                    _self.selectaccountMode.canuseamount = _self.global_get_tofixed(
                      item.withdraw_amount,
                      item.amountdigits
                    );
                } else {
                    _self.selectaccountMode.canuseamount = _self.global_get_tofixed(
                      item.withdraw_amount_usdt,
                      item.pricedigits
                    );
                }
            });
          }
        });
    },
    LoadContractAssets_USDT() {
      //usdt contract
      const _self = this;
      this.loading = true
      this.$store
        .dispatch("usercontract_user_contractassets_infos", { 
            contractType: 1,
        }).then(({ data }) => {
          this.loading = false
          if (data) {
            console.log('item===111', data)
            //var symbleinfo = this.getContractsInfos(data, 1);
            data.map((item, i) => {
              //console.log('item===', item)
               _self.selectaccountMode.canuseamount = _self.global_get_tofixed(item.withdraw_amount_usdt, 2);
            });
          }
        });
    },
    LoadMarginAssets() {
      const _self = this;
      this.loading = true
      _self.$store.dispatch("userborrowmoney_user_mortgageassets_infos", {
            ctid: this.selectaccountMode.fctid,
      }).then(({ data }) => {
        this.loading = false
          if (data) {
            console.log('marginData====', data)
            var marginData = this.getMortgageassetsInfos(data, 1)[0];
           
            //console.log('getmos', this.getMortgageassetsInfos(data, 1))
            if (marginData) {
              if (marginData?.fid == _self.selectaccountMode.currencyid) {
                _self.selectaccountMode.canuseamount = _self.global_get_tofixed(
                    marginData.withdraw_amount,
                    marginData.amountdigits
                );
              } else {
                _self.selectaccountMode.canuseamount = _self.global_get_tofixed(
                    marginData.withdraw_amount_usdt,
                    marginData.pricedigits
                );
              }
            }
          }
        });
    },
    LoadP2pAssets() {
      var _self = this;
      this.loading = true
      this.$store.dispatch("trading_user_c2c_userc2cassets_get", {
            currencyname: this.selectaccountMode.currencyname,
      }).then((res) => {
        this.loading = false
          if (res.data && res.data.length == 1) {
            var currencyinfo = this.$store.state.currencyinfos.filter(
              (t) => t.id == _self.selectaccountMode.currencyid
            )[0];
            _self.selectaccountMode.canuseamount = _self.global_get_tofixed(
              res.data[0].canuseamount,
              currencyinfo.precision
            );
          }
        });
    },
    LoadGameAssets() {
      var _self = this;
      this.loading = true
      this.$store.dispatch("playcard/fetchUserGameAssets", {
          currencyid: this.selectaccountMode.currencyid,
        }).then((res) => {
          this.loading = false
          if (res.data && res.data.length == 1) {
            var currencyinfo = this.$store.state.currencyinfos.filter(
              (t) => t.id == _self.selectaccountMode.currencyid
            )[0];
            _self.selectaccountMode.canuseamount = _self.global_get_tofixed(
              res.data[0].available,
              currencyinfo.precision
            );
          }
        });
    },
    close() {
      this.transferloading = false;
      this.closePopup();
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/components/modals/transfer.scss";

.currency-type {
  background-color: #f0f0f0;
  text-align: center;
  color: #aaa;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  cursor: pointer;
}

.currency-type.active {
  background: url("/images/sign.png") no-repeat right bottom #ff8000;
  color: #fff;
}
</style>

