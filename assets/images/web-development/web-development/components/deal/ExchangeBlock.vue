<template>
    <div id="exchange-block">
        <a-row>
            <a-col :lg="12"><a-button block class="standard-btn fw-5">{{$t('deal_new.dn1')}}</a-button></a-col>
            <a-col :lg="12"><a-button block class="standard-btn fw-5 strategy-btn">{{$t('deal_new.dn2')}}</a-button></a-col>
        </a-row>
        <div>
            <a-tabs v-model="activeKey" class="buy" @change="onTabChange">
            <a-tab-pane  key="1" :tab="$t('pinfo.pin9')" ></a-tab-pane>
            <a-tab-pane key="2" :tab="$t('pinfo.pin10')"></a-tab-pane>
        </a-tabs>
        <div class="rang-tabs">
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" :tab="$t('legal.lgl5')">
                            <a-row :gutter="16" class="mx-2 col-alignment mt-3">
                                <a-col :lg="16">
                                    <p class="available-blance fw-5 mb-0">{{ $t('deal.usable') }}</p>
                                </a-col>
                                <a-col :lg="8" align="end">
                                    <p class="available-blance fw-5 usdt-txt mb-0">--USDT</p>
                                </a-col>
                            </a-row>

                                    <a-form-model ref="exchangeBlock"  :hide-required-mark="true"
                                        label-align="left">
                                        <a-row :gutter="16" class="mx-2">
                                <a-col :lg="24">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl16')"
                                            :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                            <a-input v-model="exchangeBlock.firstName" >
                                                <span slot="suffix">
                                                    <p class="mb-0 available-blance fw-5 usdt-txt">USDT</p>
                                                </span>
                                                </a-input>
                                        </a-form-model-item>

                                </a-col>
                                <a-col :lg="24">
                                    <a-row :gutter="8">
                                        <a-col :lg="16">
                                            <a-form-model-item has-feedback :label="$t('deal.buyinRate')"
                                                :colon="false" :wrapper-col="{
                                                        xl: 24,
                                                        lg: 24,
                                                        md: 24,
                                                        sm: 24,
                                                        xs: 24,
                                                    }">
                                                <a-input v-model="exchangeBlock.orderPrice" />


                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :lg="8" class="code-p2pbtn-space">
                                            <a-select default-value="lucy" style="width: 100%">
                                                <a-select-option value="jack">
                                                    {{$t('person.pm14')}}
                                                </a-select-option>
                                                <a-select-option value="lucy">
                                                    {{$t('legal.lgl5')}}
                                                </a-select-option>
                                                <a-select-option value="Yiminghe">
                                                    {{$t('person.pm17')}}
                                                </a-select-option>
                                            </a-select>
                                        </a-col>
                                    </a-row>
                                </a-col>
                                <a-col :lg="24">
                                        <a-form-model-item has-feedback :label="$t('deal.purchases')"  prop="qty"
                                            :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                            <a-input v-model="exchangeBlock.qty" >
                                                <span slot="suffix">
                                                    <p class="mb-0 available-blance fw-5 usdt-txt">BTC3L</p>
                                                </span>
                                                </a-input>
                                        </a-form-model-item>
                                </a-col>
                                <a-col :lg="24">
                                    <a-slider id="test" :default-value="30"  />

                                </a-col>
                                <a-col :lg="24">
                                        <a-form-model-item has-feedback :label="$t('deal.turnover')" prop="orderValue"
                                            :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                            <a-input v-model="exchangeBlock.orderValue" >
                                                <span slot="suffix">
                                                    <p class="mb-0 available-blance fw-5 usdt-txt">USDT</p>
                                                </span>
                                                </a-input>
                                        </a-form-model-item>
                                </a-col>
                                <a-col :lg="24">
                                    <p class="available-blance fw-5 mb-0 text-right">≈0.00 USD</p>
                                    <a-row :gutter="16" class="col-alignment mt-3">
                                <a-col :lg="14">
                                    <p class="available-blance fw-5 mb-0">{{ $t("deal.maxbuy") }}</p>
                                </a-col>
                                <a-col :lg="10" align="end">
                                    <p class="available-blance fw-5 usdt-txt mb-0">9.7545 BTC3L</p>
                                </a-col>
                            </a-row>
                            <a-button class="mt-3" :class="activeKey=='1'?'buy-btc-btn':'sell-btc-btn'" block>{{$t('deal_new.dn3')}}</a-button>
                                </a-col>
                                <a-col :lg="24">
                                    <a-row :gutter="16" class="mt-4">
                                        <a-col :lg="10">
                                        <p class="available-blance fw-5 usdt-txt mb-2">{{$t('deal_new.dn4')}} <img src="/images/white-eye01.svg" class="ml-2 pointer"/></p>
                                        <p class="available-blance fw-5 mb-2">{{$t('deal_new.dn5')}}</p>
                                        <p class="available-blance fw-5 mb-2">{{$t('deal_new.dn6')}}</p>
                                        </a-col>
                                        <a-col :lg="14" align="end"><p class="available-blance fw-5 active mb-2">{{$t('public.ph16')}}</p>
                                            <p class="available-blance fw-5 usdt-txt mb-2">9.26583855 USDT</p>
                                            <p class="available-blance fw-5 usdt-txt mb-2">0 BTC</p>
                                        </a-col>

                                    </a-row>
                                    <a-row :gutter="16" class="mt-3">
                                        <a-col :lg="24">
                                            <a-button class="cancel-outline-btn fw-5 mr-2">{{$t('deal_new.dn7')}}</a-button>
                                            <a-button class="cancel-outline-btn fw-5">{{$t('deal_new.dn8')}}</a-button>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                        </a-form-model>
                        </a-tab-pane>
                        <a-tab-pane key="2" :tab="$t('confirm.con10')">
                            {{$t('deal_new.dn9')}}
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="TP/SL">
                            {{$t('deal_new.dn9')}}
                        </a-tab-pane>
                    </a-tabs>
                </div>
        </div>
        

    </div>
</template>

<script>
export default {
    data() {
        return {
            exchangeBlock: {},
            activeKey:"1"
        }
    },
    methods:{
        onTabChange(key){
            this.updateTabBackground(key);
        },
        updateTabBackground(key){
            const element = document.documentElement;
            if (element) {
                // 
                element.style.setProperty('--active_tab_color', key=='1'?'#0ECB81':'#f6465d'); // Use Dynamic color variable here.
                
            }
            
        },
        mounted(){
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/deal/exchange-block.scss';
</style>
