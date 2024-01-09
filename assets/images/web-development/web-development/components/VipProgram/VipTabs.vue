<template>
    <div class="vip-tabs my-3">
        <a-card class="tabs-card" :bordered="false">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" :tab="$t('tabkeys.tab59')">
                    <a-row class="">
                        <BenefitsTable :vipColumns="vipLevelColums" :vipData="vipLevels">
                            <template  #vipLevel="{row}"><p class="col-alignment mb-0 vip-txt fw-5"><img src="/images/vip1.svg" class="mr-2" />{{row.name.charAt(0).toUpperCase()+row.name.slice(1)}}</p></template>
                            <template  #or="{row}"><p class="col-alignment mb-0 ">/</p></template>
                            <template  #amount="{row}"><p class="col-alignment mb-0 vip-txt fw-5">{{ row.amout }}</p></template>
                            <template  #spotTradingVolume="{row}"><p class="col-alignment mb-0 vip-txt fw-5">{{ row.spot_min }}-{{ row.spot_max }}</p></template>
                            <template  #futureTradingVolume="{row}"><p class="col-alignment mb-0 vip-txt fw-5">{{ row.future_min }}-{{ row.future_max }}</p></template>
                        </BenefitsTable>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('tabkeys.tab60')" force-render>
                    <a-row class="">
                        <BenefitsTable :vipColumns="withdrawColums" :vipData="currencies" v-if="!loading">
                            <template  #token="{row}"><p class="col-alignment mb-0 vip-txt fw-5"><img :src="row.icon" height="24" width="24"  class="mr-2" />{{ row.currencyname }}<span class="wing-token fw-5">{{ row.fullname }}</span></p></template>
                            <template  #borrowrate="{row}"><p class="col-alignment mb-0 vip-txt fw-5">{{ row.borrowrate*100 }}%</p></template>
                            <template  #free="{row}"><p class="col-alignment mb-0 vip-txt fw-5">{{$t('express.exp27')}}</p></template>
                            <template  #network="{row}"><p class="col-alignment mb-0 vip-txt fw-5" v-for="(item,key) in row.mainChains" :key="key">{{item.tokenfullname}}<span v-if="item.tokentype!=''">({{ item.tokentype.toUpperCase() }})</span></p></template>
                            <template  #minimumWithdraw="{row}"><p class="col-alignment mb-0 vip-txt fw-5" v-for="(item,key) in row.mainChains" :key="key">{{ item.minwithdrawalamount }}</p></template>
                            <template  #withdrawFee="{row}"><p class="col-alignment mb-0 vip-txt fw-5" v-for="(item,key) in row.mainChains" :key="key">{{ item.withdrawalfee }}</p></template>
                        </BenefitsTable>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t('tabkeys.tab58')">
                    <BenefitsTable :vipColumns="tradingColums" :vipData="vipLevels" >
                        <template  #vipLevel="{row}"><p class="col-alignment mb-0 vip-txt fw-5"><img src="/images/vip1.svg" class="mr-2" />{{row.name.charAt(0).toUpperCase()+row.name.slice(1)}}</p></template>
                        <template  #spotFee="{index}"><p class="col-alignment mb-0 vip-txt fw-5"> {{((10-index-1)*0.1*100*spotMaker).toFixed(2) }}%/{{((10-index-1)*0.1*100*spotTaker).toFixed(2) }}%</p></template>
                        <template  #futureFee="{index}"><p class="col-alignment mb-0 vip-txt fw-5">{{((10-index-1)*0.1*100*futureMaker).toFixed(2) }}%/{{((10-index-1)*0.1*100*futureTaker).toFixed(2)}}%</p></template>
                    </BenefitsTable>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>

<script>
import BenefitsTable from './BenefitsTable.vue'

export default {
    components: {
        BenefitsTable
    },
    computed:{
        spotMaker(){
             return this.$store.state.symbleinfos[0]?.buyfee
        },
        spotTaker(){
             return this.$store.state.symbleinfos[0]?.takerbuyfee
        },
        futureMaker(){
             return this.$store.state.symbleinfos[3]?.buyfee
        },
        futureTaker(){
             return this.$store.state.symbleinfos[3]?.takerbuyfee
        }
    },
    data() {
        return {
            loading:true,
            vipLevels:[],
            currencies:[],
            mainChains:[],
            vipLevelColums: [
                {
                    title: this.$t('tableskeys.vt1'),
                    dataIndex: 'vipLevel',
                    scopedSlots: { customRender: 'vipLevel' },
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt2'),
                    dataIndex: 'amout',
                    scopedSlots: { customRender: 'amount' },
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt3'),
                    dataIndex: 'or',
                    scopedSlots: { customRender: 'or' },
                    width: 100,
                },
                {
                    title: this.$t('tableskeys.vt4'),
                    dataIndex: 'tradingVolume',
                    scopedSlots: { customRender: 'spotTradingVolume' },
                    width: 200,
                },
                {
                    title: this.$t('tableskeys.vt3'),
                    dataIndex: 'or1',
                    scopedSlots: { customRender: 'or' },
                    width: 100,
                },
                {
                    title: this.$t('tableskeys.vt5'),
                    dataIndex: 'tradingUsdt',
                    scopedSlots: { customRender: 'futureTradingVolume' },
                    width: 180,
                },
            ],
            withdrawColums: [
                {
                    title: this.$t('tableskeys.vt6'),
                    dataIndex: 'token',
                    scopedSlots: { customRender: 'token' },
                    width: 200,
                },
                {
                    title: this.$t('tableskeys.wa8'),
                    dataIndex: 'network',
                    scopedSlots: { customRender: 'network' },
                    width: 200,
                },
                {
                    title: this.$t('tableskeys.vt7'),
                    dataIndex: 'minimumWithdraw',
                    scopedSlots: { customRender: 'minimumWithdraw' },
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt8'),
                    dataIndex: 'withdrawFee',
                    scopedSlots: { customRender: 'withdrawFee' },
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt9'),
                    dataIndex: 'deposit',
                    scopedSlots: { customRender: 'free' },
                    width: 140,
                },
                {
                    title: this.$t('tableskeys.vt10'),
                    dataIndex: 'borrowRate',
                    scopedSlots: { customRender: 'borrowrate' },
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt11'),
                    dataIndex: 'p2pFee',
                    scopedSlots: { customRender: 'free' },
                    width: 140,
                },
            ],
            tradingColums: [
                {
                    title: this.$t('tableskeys.vt12'),
                    dataIndex: 'vipLevel',
                    scopedSlots: { customRender: 'vipLevel' },
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt13'),
                    dataIndex: 'spotfee',
                    scopedSlots: { customRender: 'spotFee' },
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt14'),
                    dataIndex: 'futurefee',
                    scopedSlots: { customRender: 'futureFee' },
                    width: 180,
                },
            ]
        }
    },
    methods: {
        callback(key) {
          
        },
        async getVipLevels(){
            try {
                const { data } = await this.$store.dispatch('com_constants_getconstantsinfo',{key:"Vip_ConfigSetting"})
                if (data) {
                    this.vipLevels=JSON.parse(data);
                }
            } catch (error) {
                //console.log('Error', error)
            }
        },
        async getMainChains(){
            try {
                const { data } = await this.$store.dispatch('com_constants_getconstantsinfo',{
                    key:"DepositAndWithdrawalConfiguration"
                })
                if (data) {
                    this.mainChains=eval('('+ data +')');
                    this.currencies.filter(_c=>{
                        const result=this.mainChains.filter(_m=>_m.token.toUpperCase()==_c.currencyname)[0]
                        if(result){
                            _c.mainChains=result.mainchains;
                        }
                        else{
                            _c.mainChains=[];
                        }
                    })
                    this.loading=false;
                }
            } catch (error) {
                //console.log('Error', error.toString())
            }
        }
    },
    mounted(){
        this.getVipLevels();
        this.getMainChains();
        this.currencies=this.$store.state.currencyinfos;
    }
}
</script>

<style>

</style>
