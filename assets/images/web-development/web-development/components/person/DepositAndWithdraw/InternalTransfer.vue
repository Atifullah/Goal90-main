<template>
    <a-form-model ref="internalTransfer" :hide-required-mark="true" label-align="left" :model="withdraw" :rules="rules">
        <a-row>
            <a-col :lg="24">
                <a-form-model-item has-feedback :label="$t('labels.lbl29')" prop="currensySelected" :colon="false"
                    :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                    <a-select
                    style="width: 100%" class="mb-2" v-model="withdraw.currencySelected" :placeholder="$t('formMenu.select')" @change="currencyOnChange"
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
        </a-row>
        <a-row class="email-phone-tabs">
            <a-col :lg="24">
                <a-tabs default-active-key="1" v-model="activeTab">
                    <a-tab-pane key="2">
                        <span slot="tab">
                            <img :src="activeTab == '2' ? '/images/email-icon-active.svg' : '/images/email-icon.svg'"
                                class="mr-1" />
                            {{$t('person.pd14')}}
                        </span>

                    </a-tab-pane>
                    <a-tab-pane key='3'>
                        <span slot="tab">
                            <img :src="activeTab == '3' ? '/images/phone-icon-active.svg' : '/images/phone-icon.svg'"
                                class="mr-1" />
                                {{$t('person.pd15')}}
                        </span>

                    </a-tab-pane>
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <img :src="activeTab == '1' ? '/images/bnqid-active.svg' : '/images/bnqid.svg'" />
                               {{$t('person.pd16')}}
                        </span>

                    </a-tab-pane>


                </a-tabs>
            </a-col>
        </a-row>

        <a-row class="email-phone-tabs">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-form-model-item has-feedback prop="withdrawalAddress" :colon="false"
                    :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                    <a-auto-complete
                        placeholder=""
                        :filter-option="filterOption"
                        v-model="withdraw.withdrawalAddress"
                    >
                        <template slot="dataSource">
                            <a-select-option v-for="item in getSourceData" :key="item" >{{item}}</a-select-option>
                        </template>
                    </a-auto-complete>
                </a-form-model-item>
            </a-col>

        </a-row>

        <a-row class="add-box mt-2">
            <a-col :lg="24" align="end" class="add-txt add-txt1">
                <p class="available-txt fw-4 mb-0"> {{$t('person.pd17')}} {{availableAssets.toFixed(2)}}</p>
            </a-col>
            <a-col :lg="24">

                <a-form-model-item has-feedback :label="$t('labels.lbl30')" prop="amount"
                    :colon="false"  :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                    <a-input :placeholder="$t('placeholders.plh28')" v-model="withdraw.amount"  type="number" >
                        <span slot="suffix" @click="withdraw.amount=availableAssets" class="pointer">All</span>   
                    
                    </a-input>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row class="">

            <a-col :lg="24">
                <p class="limit-btc fw-4 mt-2 mb-4">{{ $t("memberCenter.limit") }}: {{ withdrawalLimit.toFixed(2) }}
                            {{withdraw.currencySelected}} <span class="detail-txt increase limit-tip ml-1">
                                <nuxt-link to="/person/authentication">{{
                                        $t("memberCenter.promoteLimit")
                                }}
                                </nuxt-link></span></p>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :lg="12">
                <a-button class="cancel-outline-btn" block @click="close">{{$t('person.pd18')}}</a-button>

</a-col>
            <a-col :lg="12">
                <a-button class="primary-btn fw-5" block @click="submit">{{$t('person.pd19')}}</a-button>
            </a-col>
        </a-row>
        <VerificationModel :verificationModel="verificationModel" :close="closeVerificationModel" :confirmPaymentMethod="Transfer" />
    </a-form-model>

</template>

<script>
import VerificationModel from './VerificationModel'
 
export default{
    name:"InternalTransfer",
    components:{
        VerificationModel
    },
    props:{
        selectedCurrency:{
            type:String
        },
        uid:{
            type:[String,Boolean]
        },
        currencies:{
            type: Array
        },
        assets:{
            type: Array
        },
        close:{
            type:Function
        }
    },
    watch: {
        'uid': function (val) {
            if (val) {
                this.withdraw.withdrawalAddress=val;
            }
        },
        'selectedCurrency': function (val) {
            if (val) {
               
                this.withdraw.currencySelected=val;
            }
        },
    },
    computed:{
        getSourceData(){
            let array=[];
            if(this.activeTab=="1"){
               this.dataSource.filter(_d=>{
                array.push(_d.touserid);
               });
            }
            else if(this.activeTab=='2'){
                this.dataSource.filter(_d=>{
                    if(_d.email)
                    array.push(_d.email);
                })
            }
            else{
                this.dataSource.filter(_d=>{
                    if(_d.phone)
                    array.push(_d.phone);
                })
            }
            return array;
        }
    },
    data(){
        return{
            activeTab:"1",
            withdraw:{
                currencySelected:'',
                withdrawalAddress:'',
                amount:0,
            },
            availableAssets:0,
            withdrawalLimit:0,
            verificationModel:false,
            dataSource: [],
            valid:false,
            rules:{
                currencySelected:[
                    {
                        required:true, message:this.$t('messages.msg27')
                    }
                ],
                withdrawalAddress:[
                    {
                        required:true, message:this.$t('messages.msg66'), trigger:'blur'
                    },
                    {
                        validator: async (rule, value, callback) => {
                            if (this.withdraw.withdrawalAddress=='') {
                                callback(new Error(this.$t('messages.msg66')))
                            } else {
                                const validateAddress= await this.isAddressValid()
                                if(!validateAddress){
                                    callback(new Error(this.$t('messages.msg24')))
                                }
                                else{
                                    callback()
                                }
                            }
                        },
                        trigger: 'blur',
                        message: this.$t('messages.msg24')
                    }
                ],
                amount:[
                    {
                        required:true, message:this.$t('messages.msg16')
                    },
                    {
                        validator: async (rule, value, callback) => {
                            if(this.withdraw.amount>this.availableAssets){
                                callback(new Error(this.$t("Amount is more than avaialble Spot")))
                            }else {
                               callback()
                            }
                        },
                        trigger: 'change',
                    }
                ]

            }
        }
    },
    methods:{
        async getTransferUsers(){
            const _self = this;
            let array=[];
            try{
                let data = await _self.$store.dispatch('get_transfer_users',{
                    pageindex: 1,
                    pagesize: 120
                });
                if(data){
                    //console.log('Transfer Users',data);
                    data.data.pagedata.forEach(_d=>{
                        array.push(_d)
                    });
                    this.dataSource=array;
                }
            }catch(error){
                //console.log('Error',error);
            }
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
            );
        },
        async submit(){
            await this.$refs['internalTransfer'].validate((valid) => {
                if (valid) {
                    this.verificationModel=true;
                }
            })
        },
        closeVerificationModel(){
            this.verificationModel=false;
        },
        getCurrencyId(name){
            const currency=this.currencies?.filter(_c=>_c.currencyname==name);
            return currency[0]?.id;
        },
        async isAddressValid(){
            const _self=this;
            try{
                let {data} = await _self.$store.dispatch('verify_user_info',{
                    to : _self.withdraw.withdrawalAddress
                });
                this.valid=data?data:false;
                return this.valid
            }catch(error){
                //console.log('Error',error);
                return false;
            }
        },
        async Transfer(verifycode){
            const _self=this;
            try{
                const options={};
                options.googleVerifyCode=verifycode.googleVerifyCode;
                options.paypassword=verifycode.paypassword;
                options.amount=_self.withdraw.amount;
                options.currencyID= _self.getCurrencyId(_self.withdraw.currencySelected);
                options.to=this.withdraw.withdrawalAddress;
                const resp=await _self.$store.dispatch('transfer_user',options
                );
                if (resp.code == '200') {
          _self.$store.commit('set_message', { type: 'ok', text: resp.msg });
          this.closeVerificationModel();
          this.close();   
        }

            }catch(error){
                //console.log('Error',error);
            }
        },
        currencyOnChange(){
            const _self=this;
            if(this.withdraw.currencySelected!=='BTC'){
                this.withdrawalLimit=this.$userinfo.withdrawlimtperday*this.$store.getters.get_exchange_rate_by_name(this.withdraw.currencySelected, 'btc')
            }
            else{
                this.withdrawalLimit=this.$userinfo.withdrawlimtperday;
            }
            this.assets.filter(asset=>{
                if(asset.currency.currencyname==this.withdraw.currencySelected){
                    _self.availableAssets=asset.canuseamount;
                }
            })
        },
        InternalInit(uid){
            this.activeTab="1";
            this.withdraw.withdrawalAddress=uid;
            this.withdraw.currencySelected=this.selectedCurrency;
            this.currencyOnChange();
        }
    },
    mounted(){
        this.getTransferUsers();
        this.withdraw.withdrawalAddress=this.uid?this.uid:'';
        this.withdraw.currencySelected=this.selectedCurrency;
        this.currencyOnChange();
    }
}
</script>
