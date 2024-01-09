<template>
  <div class="send-crypto">
    <a-card :bordered="false" class="send-receive-card">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="12">
          <p class="mb-0 crypto-heading fw-5">{{ $t('person.pm39') }}</p>
        </a-col>
        <a-col :lg="12" align="end">
          <nuxt-link to="/person/send-recieve-crypto/receive-crypto"><a-button class="px-4 outline-btn fw-5">{{
            $t('person.pm40') }}</a-button></nuxt-link>
        </a-col>
      </a-row>
    </a-card>
    <div class="crypto-steps pt-3">
      <a-card :bordered="false" class="steps-card">
        <a-row>
          <a-col :lg="22" :offset="1" class="pt-3">
            <a-steps :current="current" label-placement="vertical">
              <a-step v-for="(item, index) in steps" :key="index" :title="item.title">
                <span slot="icon">
                  <img :src="current >= index ? '/images/dot-active.svg' : '/images/dot-p2p.svg'" class="pointer" />
                </span>
              </a-step>
            </a-steps>
            <div class="steps-content">
              <a-form-model :hide-required-mark="true" :model="withdraw" :rules="rules" ref="sendForm">
                <a-row class="text-center">
                  <a-col :lg="{ span: 14, offset: 5 }" :xl="{ span: 12, offset: 6 }" class="pt-5">
                    <p class="text-center sendto-heading fw-5 mb-4 mx-5">{{ $t('person.pm41') }}</p>
                    <div class="first-step" v-if="current == 0">
                      <a-tabs default-active-key="1" v-model="activeTab">
                        <a-tab-pane key="1">
                          <span slot="tab">
                            <img :src="activeTab == '1' ? '/images/email-active.svg' : '/images/email-gray.svg'"
                              class="mr-1" />
                            {{ $t('person.pd14') }}
                          </span>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                          <span slot="tab">
                            <img :src="activeTab == '2' ? '/images/ud-phone-active.svg' : '/images/phone-gray.svg'"
                              class="mr-1" />
                            {{ $t('person.pd15') }}
                          </span>
                        </a-tab-pane>
                        <a-tab-pane key="3">
                          <span slot="tab">
                            <img
                              :src="activeTab == '3' ? '/images/BitNasdaq-id-active.svg' : '/images/BitNasdaq-id-gray.svg'"
                              class="mr-1" />
                            BitNasdaq ID 
                            <a-popover :title="false" overlayClassName="findid-popover">
                              <template slot="content">
                                <p class="px-2 text-black fw-5 mb-0 pointer" @click="findUid=true">How to find Bitnasdaq ID ?</p>
                              </template>
                              <img src="/images/round-img.svg" />
                            </a-popover>
                          </span>
                        </a-tab-pane>
                      </a-tabs>

                      <a-row class="mt-3 mb-2 mx-5" :gutter="16">
                        <a-col :lg="24">
                          <a-form-model-item has-feedback prop="withdrawalAddress" :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }">
                            <a-auto-complete placeholder="" :filter-option="filterOption"
                              v-model="withdraw.withdrawalAddress">
                              <template slot="dataSource">
                                <a-select-option v-for="item in getSourceData" :key="item">{{ item }}</a-select-option>
                              </template>
                            </a-auto-complete>
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </div>
                    <div class="second-step" v-else-if="(current == 1)">
                      <a-row class="mx-5" :gutter="16">
                        <a-col :lg="24">
                          <p class="text-left mb-2 uid-txt fw-5">{{ $t('person.pm35') }}</p>
                          <a-card class="light-orange-card mb-3" :bordered="false">
                            <a-row class="col-alignment">
                              <a-col :lg="4"><img src="/images/crypto-user.svg" height="25px" /></a-col>
                              <a-col :lg="20">
                                <p class="mb-0 user-email">{{ withdraw.withdrawalAddress }}</p>
                                <p class="n-name fw-5 mb-0 text-left">{{ toUserProfile?.nickname }}</p>
                              </a-col>
                            </a-row>
                          </a-card>
                          <a-row class="mb-3">
                            <a-col :lg="24">
                              <a-form-model-item has-feedback :label="$t('labels.lbl64')" prop="currencySelected"
                                class="text-left" :colon="false" :wrapper-col="{
                                  xl: 24,
                                  lg: 24,
                                  md: 24,
                                  sm: 24,
                                  xs: 24,
                                }">
                                <a-select style="width: 100%" v-model="withdraw.currencySelected"
                                  :placeholder="$t('formMenu.select')" @change="currencyOnChange">
                                  <a-select-option v-for="item in currencies" :key="item.id" :value="item.currencyname">
                                    <img :src="item.icon" class="mr-1" width="15" height="15" />
                                    {{ item.currencyname }}
                                  </a-select-option>
                                </a-select>
                              </a-form-model-item>
                            </a-col>
                          </a-row>
                          <a-row class="add-box text-left mb-3">
                            <a-col :lg="24" align="end" class="add-txt">
                              <p class="network-inch fw-5">{{ $t('person.pd17') }} {{ availableAssets.toFixed(2) }}
                                {{ withdraw.currencySelected }}</p>
                            </a-col>
                            <a-col :lg="24">
                              <a-form-model-item has-feedback :label="$t('labels.lbl30')" prop="amount" :colon="false"
                                :wrapper-col="{
                                  xl: 24,
                                  lg: 24,
                                  md: 24,
                                  sm: 24,
                                  xs: 24,
                                }">
                                <a-input :placeholder="$t('placeholders.plh28')" v-model="withdraw.amount" type="number">
                                  <span class="pointer" slot="suffix" @click="withdraw.amount = availableAssets">All</span>
                                </a-input>
                              </a-form-model-item>
                            </a-col>
                          </a-row>
                          <a-row class="add-box text-left mb-3">
                            <a-col :lg="24" align="end" class="add-txt">
                            </a-col>
                            <a-col :lg="24">
                              <a-form-model-item has-feedback :label="$t('labels.lbl65')" prop="note" :colon="false"
                                :wrapper-col="{
                                  xl: 24,
                                  lg: 24,
                                  md: 24,
                                  sm: 24,
                                  xs: 24,
                                }">
                                <a-input placeholder="" v-model="withdraw.note" :maxLength="50" />
                              </a-form-model-item>
                            </a-col>
                          </a-row>

                        </a-col>
                      </a-row>

                    </div>
                    <div class="second-step" v-else>
                      <a-row class="px-5 mx-3">
                        <a-col :lg="24">
                          <a-row class="mb-4">
                            <a-card class="third-gray-card" :bordered="false">
                              <p class="senduserid fw-8 mb-0 text-left">{{ withdraw.amount }} {{ withdraw.currencySelected
                              }}
                              </p>
                              <p class="sendto-num fw-5 mb-4 text-left">≈ {{
                                $store.getters.get_client_exchange_rate_name.mark
                              }}{{ $store.getters.get_client_exchange_rate(withdraw.currencySelected, withdraw.amount)
}}
                              </p>
                              <a-row :gutter="16">
                                <a-col :lg="7" :xl="6">
                                  <p class="mb-2 send-email fw-5 gray-email text-left">{{ $t('c2c.NicknameSet') }}</p>
                                  <p class="mb-2 send-email fw-5 gray-email text-left">{{ $t('person.pm35') }}</p>
                                  <p class="mb-0 send-email fw-5 gray-email" v-if="withdraw.note !== ''">
                                    {{ $t('person.Note_person') }}</p>
                                </a-col>
                                <a-col :lg="17" :xl="6">
                                  <p class="mb-2 send-email fw-5 text-left">{{ toUserProfile.nickname }}</p>
                                  <p class="mb-2 send-email fw-5 text-left">{{ withdraw.withdrawalAddress }}</p>
                                  <p class="mb-0 send-email fw-5" v-if="withdraw.note !== ''">{{ withdraw.note }}</p>
                                </a-col>
                              </a-row>
                            </a-card>
                          </a-row>
                        </a-col>
                      </a-row>
                    </div>
                  </a-col>
                </a-row>
              </a-form-model>
            </div>
            <a-row :gutter="16">
              <a-col :lg="{ span: 14, offset: 5 }" :xl="{ span: 12, offset: 6 }">
                <a-row class="mt-2 mb-4 mx-5" :gutter="8" v-if="current == 0">
                  <a-col :lg="24">
                    <a-button block class="primary-btn fw-5" @click="next">{{ $t('person.pm37') }}</a-button>
                  </a-col>
                </a-row>
                <a-row :gutter="8" class="mt-2 mb-4 mx-5" v-else>
                  <a-col :lg="12"><a-button block class="cancel-outline-btn fw-5" @click="prev">{{ $t('person.pm36')
                  }}</a-button></a-col>
                  <a-col :lg="12"><a-button class="primary-btn fw-5" block @click="next">{{ $t('person.pm37')
                  }}</a-button></a-col>
                </a-row>

              </a-col>
            </a-row>
          </a-col>
        </a-row>

        <VerificationModal :verificationModel="verificationModel" @onClose="verificationModel = false"
          :confirmAuth="Transfer" :loading="loading" />
      </a-card>
    </div>
    <TransactionSuccess :transactionSuccessModal="transactionSuccessModal" :toUserProfile="toUserProfile"
      :withdraw="withdraw" @cancel="close" :close="close" />
      <FindUidModal :findUid="findUid" :close="close" />
  </div>
</template>

<script>
import TransactionSuccess from './Modal/TransactionSuccess.vue';
import VerificationModal from "~/components/App/VerificationModal.vue";
import FindUidModal from './Modal/FindUidModal.vue';
export default {
  name: 'SendCrypto',
  components: {
    TransactionSuccess,
    VerificationModal,
    FindUidModal
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getSourceData() {
      let array = [];
      if (this.activeTab == "3") {
        this.dataSource.filter(_d => {
          array.push(_d.touserid);
        });
      }
      else if (this.activeTab == '1') {
        this.dataSource.filter(_d => {
          if (_d.email)
            array.push(_d.email);
        })
      }
      else {
        this.dataSource.filter(_d => {
          if (_d.phone)
            array.push(_d.phone);
        })
      }
      return array;
    }
  },
  data() {
    return {
      toUserProfile: {},
      findUid: false,
      current: 0,
      transactionSuccessModal: false,
      steps: [
        {
          title: this.$t("tableskeys.lh4"),
        },
        {
          title: this.$t("tableskeys.lh5"),
        },
        {
          title: this.$t("tableskeys.lh6"),
        },
      ],
      activeTab: "1",
      withdraw: {
        currencySelected: 'USDT',
        withdrawalAddress: '',
        amount: 0,
        note: ''
      },
      currencies: [],
      withdrawalLimit: 0,
      assets: [],
      availableAssets: 0,
      verificationModel: false,
      valid: false,
      loading: false,
      rules: {
        currencySelected: [
          {
            required: true, message: this.$t('messages.msg27')
          }
        ],
        withdrawalAddress: [
          {
            required: true, message: this.$t('messages.msg66'), trigger: 'blur'
          },
          {
            validator: async (rule, value, callback) => {
              if (parseInt(this.activeTab) == 3) {
                if (isNaN(value)) {
                  callback(new Error(this.$t('messages.msg68')))
                }
              }

              if (this.withdraw.withdrawalAddress == '') {
                callback(new Error(this.$t('messages.msg66')))
              } else {
                const validateAddress = await this.isAddressValid()

                //console.log('validateAddress:', validateAddress);
                if (!validateAddress) {
                  callback(new Error(this.$t('messages.msg48')))
                }
                else {
                  callback()
                }
              }
            },
            trigger: 'blur',

          }
        ],
        amount: [
          {
            required: true, message: this.$t('messages.msg16')
          },
          {
            validator: async (rule, value, callback) => {
              if (this.withdraw.amount > this.availableAssets) {
                callback(new Error(this.$t('conditionaltxt.ct26')))
              }
              else if (this.withdraw.amount == 0) {
                callback(new Error(this.$t('conditionaltxt.ct27')))
              } else {
                callback()
              }
            },
            trigger: 'change',
          }
        ]

      }
    }
  },
  watch: {
    activeTab(val) {
      this.withdraw.withdrawalAddress = ''
    }
  },
  methods: {
    close() {
      this.transactionSuccessModal = false
      this.findUid = false
      this.reset();
    },
    async next() {
      const _self = this;
      if (this.current == 0) {
        await _self.$refs['sendForm'].validateField('withdrawalAddress', (errorMessage) => {
          if (!errorMessage) {
            this.current++;
          }
        })
      }
      else if (this.current == 1) {
        await _self.$refs['sendForm'].validateField('amount', (errorMessage) => {
          if (!errorMessage) {
            this.current++;
          }
        })
      }
      else {
        this.verificationModel = true;
      }

    },
    prev() {
      this.current--;
    },
    commonPayee(row) {
      this.current = 1;
      this.withdraw.withdrawalAddress = row.touserid;
    },
    async isAddressValid() {
      const _self = this;
      try {
        let { data } = await _self.$store.dispatch('verify_user_info', {
          to: _self.withdraw.withdrawalAddress
        });
        if (data) {
          this.toUserProfile = data;
          //console.log(this.toUserProfile, data);
          this.valid = true
        } else {
          this.valid = false
        }
        return this.valid
      } catch (error) {
        //console.log('Error', error);
        return false;
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      );
    },
    currencyOnChange() {
      const _self = this;
      if (this.withdraw.currencySelected !== 'BTC') {
        this.withdrawalLimit = this.$userinfo.withdrawlimtperday * this.$store.getters.get_exchange_rate_by_name(this.withdraw.currencySelected, 'btc');
      }
      else {
        this.withdrawalLimit = this.$userinfo.withdrawlimtperday;
      }
      this.assets.filter(asset => {
        if (asset.currency.currencyname == this.withdraw.currencySelected) {
          _self.availableAssets = asset.canuseamount;
        }
      })
    },
    getCurrencyId(name) {
      const currency = this.currencies?.filter(_c => _c.currencyname == name);
      return currency[0]?.id;
    },
    //   async getTransferUsers(){
    //     const _self = this;
    //     let array=[];
    //     try{
    //         let {data} = await _self.$store.dispatch('get_transfer_users',{
    //             pageindex: 1,
    //             pagesize: 120
    //         });
    //         if(data){
    //             data.pagedata.forEach(_d=>{
    //                 array.push(_d)
    //             });
    //             this.dataSource=array;
    //         }
    //     }catch(error){
    //console.log('Error',error);
    //     }
    //   },
    async getUserAssets() {
      const _self = this;
      try {
        let { data } = await _self.$store.dispatch('user_assets_get');
        this.assets = this.getAssetsInfos(data, 1);
        this.assets.filter(asset => {
          if (asset.currency.currencyname == this.withdraw.currencySelected) {
            _self.availableAssets = asset.canuseamount;
          }
        })
      } catch (error) {
        //console.log('Error', error);
      }
    },
    async Transfer(verifycode) {
      const _self = this;
      _self.loading = true;
      try {
        let options = {};
        //console.log('verifycode:::', verifycode)
        options.googleVerifyCode = verifycode.googleVerifyCode
        options.paypassword = verifycode.paypassword


        options.amount = _self.withdraw.amount;
        options.currencyID = _self.getCurrencyId(_self.withdraw.currencySelected);
        options.to = this.withdraw.withdrawalAddress;
        const resp = await _self.$store.dispatch('transfer_user', options
        );


        if (resp.code == '200') {
          _self.$store.commit('set_message', { type: 'ok', text: resp.msg });
          this.withdraw.transactionId = resp.data
          this.closeVerificationModel();
          this.transactionSuccessModal = true;
          this.$emit('updategetCommonPayees');
          // this.getTransferUsers()
          // this.reset();
        }
        _self.loading = false;
      } catch (error) {
        _self.loading = false;
        //console.log('Error', error);
      }
    },
    closeVerificationModel() {
      this.verificationModel = false;
    },
    reset() {
      this.withdraw = {
        currencySelected: 'USDT',
        withdrawalAddress: '',
        amount: 0,
        note: ''
      }
      this.current = 0;
      this.currencyOnChange();

    }
  },
  mounted() {
    //   this.getTransferUsers();
    this.getUserAssets();
    this.currencies = this.$store.state.currencyinfos;
    this.currencyOnChange();
  }
}
</script>

<style></style>
