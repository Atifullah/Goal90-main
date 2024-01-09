<template>
    <div>
        <a-modal id="detail-modal" v-model="selectCurrencyModal" width="450px" :footer="false" :title="false" @cancel="close">
            <a-row :gutter="16" class="col-alignment mb-2 mx-4">
                <a-col :lg="12">
                    <p class="deposit-heading fw-5 mb-0">{{$t('person.pm24')}}</p>

                </a-col>
                <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" @click="close" class="pointer" />
                </a-col>
            </a-row>
            <a-form-model :model="walletHistoryModel" :hide-required-mark="true" label-align="left">
            <a-row :gutter="16" class="mx-4">
                <a-col :lg="24">
                    <a-form-model-item has-feedback :label="$t('labels.lbl67')" prop="currency" :colon="false"
                        :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                        <a-select style="width: 100%" class="mb-3"
                                v-model="currencySelected" :placeholder="$t('formMenu.select')"
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
                <a-col :lg="24" class="mb-2">
                    <a-row :gutter="16">
                        <a-col :lg="12"><p class="mb-2 amount-label fw-5">{{$t('person.pi3')}}</p></a-col>
                    </a-row>
                    <a-form-model-item has-feedback  prop="currency" :colon="false"
                        :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                               <a-input  addon-after="All" v-model="amount" >
                        <span slot="suffix" class="col-alignment optional-txt fw-4">
                           <img :src="selectedCurrencyIcon" class="mr-1" width="15" height="15"/> {{currencySelected}}
                        </span>
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :lg="24">
                    <p class="mb-2 amount-label fw-5">{{$t('Waddress.remarkInput')}}</p>
                    <a-form-model-item has-feedback  prop="currency" :colon="false"
                        :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                    <a-input  :placeholder="$t('placeholders.plh49')" v-model="note" >
                        <span slot="suffix" class="col-alignment optional-txt fw-4"> 0/50
                        </span>
                        </a-input>
                    </a-form-model-item>
                </a-col>
                </a-row>
                <a-row :gutter="16" class="mx-4 mt-3">
                    <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="close">{{$t('extra.extra6')}}</a-button></a-col>
                <a-col :lg="12">
                    <a-button class="primary-btn " block @click="confirmAmount()">{{$t('person.pd19')}}</a-button>
                </a-col>
                </a-row>
                </a-form-model>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        selectCurrencyModal: {
            type: Boolean
        },
        close:{
            type: Function
        },
        confirm:{
            type:Function
        }
    },
    computed:{
        selectedCurrencyIcon(){
            const _self=this;
            return this.currencies.length>0 && _self.currencySelected?this.currencies.filter(item=>item.currencyname==_self.currencySelected)[0].icon:'';
        }
    },
    data() {
        return {
            walletHistoryModel: {},
            currencySelected:'USDT',
            currencies:[],
            amount:0,
            note:''
        }
    },
    methods:{
        confirmAmount(){
            let data={
                uid:this.$userinfo.uid,
                token:this.currencySelected,
            }
            if(this.amount>0){
                data.amount=this.amount
            }
            if(this.note!=''){
                data.note=this.note
            }
            if(this.$userinfo.nickname){
                data.name=this.$userinfo.nickname
            }
            if(this.$userinfo.avatar){
                data.avatar=this.$userinfo.avatar
            }
            this.confirm(data);
            this.amount=0;
            this.currencySelected='USDT';
            this.close();
        },
    },
    mounted(){
        this.currencies=this.$store.state.currencyinfos;
    }
}
</script>

<style>

</style>
