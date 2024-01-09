<template>
    <div class="currency-calu">
        <a-modal id="currency-calu-modal" v-model="currencyCaluModal" :footer="false" :title="false" width="607px" @cancel="close(0)">
            <a-form-model ref="currencyForm" :model="currencyForm" :hide-required-mark="true" label-align="left">
                <a-row :gutter="16" class="pt-4 px-4">
                    <a-col :lg="24" align="end"> <img src="/images/cros1-header.svg" class="pointer"
                            @click="close(0)"></a-col>
                </a-row>
                <a-row :gutter="16" class="col-alignment px-4 ">
                    <a-col :lg="24">
                        <a-tabs v-model="msg" @change="switchType">
                            <a-tab-pane :key="1" tab="PNL">
                                <a-row :gutter="16" class="mt-2">
                                    <a-col :lg="13">
                                        <a-row :gutter="8">
                                            <a-col :lg="12"><a-button block :class="zod == 1 ? 'long-btn' : 'neutral-btn'"
                                                    @click="zod = 1">{{$t('security.cc7')}}</a-button></a-col>
                                            <a-col :lg="12"><a-button block :class="zod == 2 ? 'short-btn' : 'neutral-btn'"
                                                    @click="zod = 2">{{$t('security.cc8')}}</a-button></a-col>
                                        </a-row>
                                        <a-row class="my-2">
                                            <a-slider :marks="marks" :min="1" :max="20" @afterChange="afterSliderChange"
                                                v-model="sod" />
                                        </a-row>
                                        <a-row :gutter="16">
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh56')" v-model="openprice" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">USDT</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh57')" v-model="closeprice" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">USDT</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh58')" v-model="openamount" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">{{ this.symblefrom }}</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <p class="futures-calu">{{ symblefrom }} {{$t('security.cc1')}}</p>
                                            </a-col>
                                            <a-col :lg="24" class="mb-4">
                                                <a-button class="fw-5" :class="allowClick ? 'primary-btn' : 'disabled-btn'" block
                                                    @click="caluType1">{{$t('security.cc2')}}</a-button>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :lg="11" class="pl-4">
                                        <a-card class="result-card">
                                            <p class="result-heading mb-4 pt-2">{{$t('security.cc3')}}</p>
                                            <p class="result-desc mb-1">{{$t('security.cc4')}} ({{ this.symblefrom }})</p>
                                            <p class="result-heading mb-4">{{
                                                global_get_tofixed(opensecurity,
                                                    global_get_decimal(this.symblefrom).a) }}</p>
                                            <p class="result-desc mb-1">PnL</p>
                                            <p class="result-heading mb-4">{{
                                                global_get_tofixed(income,
                                                    global_get_decimal(this.symblefrom).a) }}</p>
                                            <p class="result-desc mb-1">{{$t('security.cc5')}}</p>
                                            <p class="result-heading mb-4">{{ global_get_tofixed(rate * 100, 2) }}%</p>
                                        </a-card>
                                        <p class="result-desc pt-4">{{$t('security.cc6')}}</p>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane :key="2" :tab="$t('tabkeys.tab68')">
                                <a-row :gutter="16" class="mt-2">
                                    <a-col :lg="13">
                                        <a-row :gutter="8">
                                            <a-col :lg="12"><a-button block :class="zod == 1 ? 'long-btn' : 'neutral-btn'"
                                                    @click="zod = 1">{{$t('security.cc7')}}</a-button></a-col>
                                            <a-col :lg="12"><a-button block :class="zod == 2 ? 'short-btn' : 'neutral-btn'"
                                                    @click="zod = 2">{{$t('security.cc8')}}</a-button></a-col>
                                        </a-row>
                                        <a-row class="my-2">
                                            <a-slider :marks="marks" :min="1" :max="20" @afterChange="afterSliderChange"
                                                v-model="sod" />
                                        </a-row>
                                        <a-row :gutter="16">
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh56')" v-model="openprice" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">USDT</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input placeholder="ROE" v-model="roe" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">%</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <p class="futures-calu">{{ symblefrom }} {{$t('security.cc1')}}</p>
                                            </a-col>
                                            <a-col :lg="24" class="mb-4">
                                                <a-button class="fw-5" :class="allowClick ? 'primary-btn' : 'disabled-btn'" block
                                                    @click="caluType2">{{$t('security.cc2')}}</a-button>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :lg="11" class="pl-4">
                                        <a-card class="result-card">
                                            <p class="result-heading mb-4 pt-2">{{$t('security.cc3')}}</p>
                                            <p class="result-desc mb-1">{{$t('security.cc9')}}</p>
                                            <p class="result-heading mb-4">{{ targetprice }}</p>
                                        </a-card>
                                        <p class="result-desc pt-4">{{$t('security.cc6')}}</p>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane :key="3" :tab="$t('security.cc10')">
                                <a-row :gutter="16" class="mt-2">
                                    <a-col :lg="13">
                                        <a-row :gutter="8">
                                            <a-col :lg="12"><a-button block :class="zod == 1 ? 'long-btn' : 'neutral-btn'"
                                                    @click="zod = 1">{{$t('security.cc7')}}</a-button></a-col>
                                            <a-col :lg="12"><a-button block :class="zod == 2 ? 'short-btn' : 'neutral-btn'"
                                                    @click="zod = 2">{{$t('security.cc8')}}</a-button></a-col>
                                        </a-row>
                                        <a-row class="my-2">
                                            <a-slider :marks="marks" :min="1" :max="20" @afterChange="afterSliderChange"
                                                v-model="sod" />
                                        </a-row>
                                        <a-row :gutter="16">
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh56')" v-model="openprice" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">USDT</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh59')" v-model="openamount" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">{{ symblefrom }}</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh60')" v-model="accountequity" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">{{ this.symblefrom }}</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <p class="futures-calu">{{ symblefrom }} {{$t('security.cc1')}}</p>
                                            </a-col>
                                            <a-col :lg="24" class="mb-4">
                                                <a-button class="fw-5" :class="allowClick ? 'primary-btn' : 'disabled-btn'" block
                                                    @click="caluType3">{{$t('security.cc2')}}</a-button>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :lg="11" class="pl-4">
                                        <a-card class="result-card">
                                            <p class="result-heading mb-4 pt-2">{{$t('security.cc3')}}</p>
                                            <p class="result-desc mb-1">{{$t('security.cc10')}}</p>
                                            <p class="result-heading mb-4">{{ liquidationprice }}</p>
                                        </a-card>
                                        <p class="result-desc pt-4">{{$t('security.cc11')}}</p>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane :key="4" :tab="$t('security.cc13')">
                                <a-row :gutter="16" class="mt-2">
                                    <a-col :lg="13">
                                        <a-row :gutter="8">
                                            <a-col :lg="12"><a-button block :class="zod == 1 ? 'long-btn' : 'neutral-btn'"
                                                    @click="zod = 1">{{$t('security.cc7')}}</a-button></a-col>
                                            <a-col :lg="12"><a-button block :class="zod == 2 ? 'short-btn' : 'neutral-btn'"
                                                    @click="zod = 2">{{$t('security.cc8')}}</a-button></a-col>
                                        </a-row>
                                        <a-row class="my-2">
                                            <a-slider :marks="marks" :min="1" :max="20" @afterChange="afterSliderChange"
                                                v-model="sod" />
                                        </a-row>
                                        <a-row :gutter="16">
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh56')" v-model="openprice" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">USDT</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <a-form-model-item has-feedback :colon="false"
                                                    :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                    <a-input :placeholder="$t('placeholders.plh60')" v-model="accountequity" type='number'>
                                                        <span slot="suffix">
                                                            <p class="mb-0 usdt-txt">{{ this.symblefrom }}</p>
                                                        </span>
                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="24" class="pt-1">
                                                <p class="futures-calu">{{ symblefrom }} {{$t('security.cc1')}}</p>
                                            </a-col>
                                            <a-col :lg="24" class="mb-4">
                                                <a-button class="fw-5" :class="allowClick ? 'primary-btn' : 'disabled-btn'" block
                                                    @click="caluType4">{{$t('security.cc2')}}</a-button>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :lg="11" class="pl-4">
                                        <a-card class="result-card">
                                            <p class="result-heading mb-4 pt-2">{{$t('security.cc3')}}</p>
                                            <p class="result-desc mb-1">{{$t('security.cc12')}}</p>
                                            <p class="result-heading mb-4">{{ global_get_tofixed(targetprice, 2) }}</p>
                                            <p class="result-desc mb-1">{{$t('security.cc13')}} ({{symblefrom}})</p>
                                            <p class="result-heading mb-4">{{
                                                global_get_tofixed(openamount,
                                                    global_get_decimal(symblefrom).a) }}</p>
                                        </a-card>
                                        <p class="result-desc pt-4">{{$t('security.cc6')}}</p>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane :key="5" :tab="$t('strtable.stab13')">
                                <a-row :gutter="16" class="mt-2">
                                    <a-col :lg="13">
                                        <a-row :gutter="8">
                                            <a-col :lg="12"><a-button block :class="zod == 1 ? 'long-btn' : 'neutral-btn'"
                                                    @click="zod = 1">{{$t('security.cc7')}}</a-button></a-col>
                                            <a-col :lg="12"><a-button block :class="zod == 2 ? 'short-btn' : 'neutral-btn'"
                                                    @click="zod = 2">{{$t('security.cc8')}}</a-button></a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :lg="11" class="pl-4">
                                        <a-card class="result-card">
                                            <p class="result-heading mb-4 pt-2">{{$t('security.cc3')}}</p>
                                            <p class="result-desc mb-1">
                                                <b class="left">{{$t('security.cc14')}}</b>
                                                <b class="right">{{ targetprice }}</b>
                                            </p>
                                        </a-card>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="mt-4">
                                    <a-col :lg="5">
                                        <p class="openprice-title">{{$t('security.cc15')}}</p>
                                    </a-col>
                                    <a-col :lg="8">
                                        <p class="openprice-title">{{$t('security.cc16')}}</p>
                                    </a-col>
                                    <a-col :lg="8">
                                        <p class="openprice-title">{{$t('security.cc17')}} ({{symblefrom}})</p>
                                    </a-col>
                                    <a-col :lg="3" align="end">
                                        <p class="openprice-title">{{$t('security.cc18')}}</p>
                                    </a-col>
                                </a-row>
                                <a-card class="openprice-card">
                                    <a-row :gutter="16" class="col-alignment" v-for="(item,index) in inputList" :key="index">
                                        <a-col :lg="5">
                                            <p class="openprice-title mb-0">{{ index+1 }}</p>
                                        </a-col>
                                        <a-col :lg="8">
                                            <a-form-model-item has-feedback :colon="false" :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                <a-input placeholder="" class="openprice-input" v-model="item.price" type='number'/>
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :lg="8">
                                            <a-form-model-item has-feedback :colon="false" :wrapper-col="{ xl: 24, lg: 24, md: 24, sm: 24, xs: 24, }">
                                                <a-input placeholder="" class="openprice-input" v-model="item.amount" type='number'/>
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :lg="3" align="end">
                                            <img src="/images/trash.svg" class="pointer"  @click="deleteinput(index)">
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <a-row>
                                    <a-col :lg="24" class="pb-2 pt-4">
                                        <p class="addposition-txt pointer" @click="addinput"><a-icon type="plus"/> {{$t('security.cc19')}}</p>
                                    </a-col>
                                    <a-col :lg="24">
                                        <a-button class="fw-5" :class="allowClick ? 'primary-btn' : 'disabled-btn'" block
                                                    @click="caluType5">{{$t('security.cc2')}}</a-button>
                                    </a-col>
                                    <a-col :lg="24">
                                        <p class="result-desc py-4">{{$t('security.cc21')}}</p>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
                <a-row class="px-4">
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
export default {
    name: "in-popup",
    validations: {
    },
    computed: {},
    props: ["symblefrom", "currencyCaluModal"],
    data() {
        return {
            msg: 1, //选择 方式 1 收益 2 平仓价格 3 强平价格
            zod: 1,  // 1 做多 2 做空
            sod: 1, //合约杠杆率
            roe: '',//回报率
            targetprice: 0,//目标价格
            openprice: '', //开仓价
            closeprice: '', //平仓价
            openamount: '', //开仓数量
            selectSecurity: true, // 平仓时  默认选择收益
            opensecurity: '',//开仓保证金
            income: '',//收益
            rate: '', //收益率,
            allowClick: false, //按钮是否允许被点击
            accountequity: '', //账户权益
            liquidationprice: '', //强平价格
            takeoverres: false,
            takeoverprice: '', //接管价格
            adjustmentrate: '', //调整系数
            marks: {
                1: '1x',
                5: '5x',
                10: '10x',
                20: '20x'
            },
            currencyForm: {

            },
            inputList:[
               {
                  price:'',
                  amount:''
               }
            ]
        };
    },
    watch: {
        msg(newval,oldVal){
          this.targetprice= 0;//目标价格
          this.openprice=''; //开仓价
          this.closeprice=''; //平仓价
          this.openamount= ''; //开仓数量
          this.liquidationprice="";

        },
        symblename(newVal, oldVal) {
            if (newVal !== oldVal) {
            }
        },
        infoChange: {
            handler: function (val) {
                if (this.msg == 1 && val.openprice > 0 && val.closeprice > 0 && val.openamount > 0) {
                    this.allowClick = true
                } else if (this.msg == 2 && this.openprice > 0 && this.roe != 0) {
                    this.allowClick = true
                } else if (this.msg == 3 && this.openprice > 0 && this.openamount > 0 && this.accountequity > 0) {
                    this.allowClick = true
                } else if (this.msg == 4 && this.openprice > 0 && this.accountequity > 0) {
                    this.allowClick = true
                } else if (this.msg == 5) {
                    var _self=this;
                    this.allowClick = true
                    this.inputList.forEach(item => {
                       if(item.price=="" || item.amount==""|| parseFloat(item.price)<=0 || parseFloat(item.amount)<=0){
                           _self.allowClick = false;
                       }
                    });
                } else {
                    this.allowClick = false
                }
            },
            deep: true
        }
    },
    computed: {
        infoChange() {
            const { openprice, closeprice, openamount, income, rate, selectSecurity, accountequity, liquidationprice, takeoverprice,
              adjustmentrate, takeoverres, roe, targetprice ,inputList} = this;
            return {
                openprice,
                closeprice,
                openamount,
                income,
                rate,
                selectSecurity,
                accountequity,
                liquidationprice,
                takeoverprice,
                adjustmentrate,
                takeoverres,
                roe,
                targetprice,
                inputList
            };
        }
    },
    methods: {
        deleteinput(index){
            this.inputList.splice(index,1);
        },
        addinput() {
          this.inputList.push({price:'', amount:'' });
        },
        onChange(checked) {
        },
        setType(type) {
            this.$emit("confirmCurrencyUnit", type);
            this.$emit("closePopup", 0);
        },
        close() {
            this.$v.$reset();
            this.$emit("closePopup", 0);
        },
        afterSliderChange(val) {
            if (val < 3) {
                this.sod = 1;
            }
            else if (val < 8) {
                this.sod = 5;
            }
            else if (val < 15) {
                this.sod = 10;
            }
            else {
                this.sod = 20;
            }

        },
        //收益 和收益率
        switchSecurity() {
            this.selectSecurity = !this.selectSecurity

            if (this.selectSecurity == true && this.income > 0 && this.openamount > 0) {
                this.allowClick = true
            } else if (this.selectSecurity == false && this.rate > 0) {
                this.allowClick = true
            } else {
                this.allowClick = false
            }
        },
        switchType(type) {
            this.msg = type
            this.sod = 1 //合约杠杆率
            this.openprice = ''//开仓价
            this.closeprice = ''//平仓价
            this.openamount = '' //开仓数量
            this.selectSecurity = true // 平仓时  默认选择收益
            this.opensecurity = ''//开仓保证金
            this.income = ''//收益
            this.rate = '' //收益率
            this.allowClick = false
            this.accountequity = '' // 账户权益
            this.liquidationprice = '' //强平价格
            this.takeoverprice = '' //接管价格
            this.adjustmentrate = '' //调整系数
        },
        /* 计算收益
          保证金 = (合约总金额)/最新成交价/杠杆倍数
          多仓实现盈亏 =（1/open均价 - 1/最新成交价）* 多仓合约张数* 合约面值
          空仓实现盈亏 =（1/最新成交价 - 1/open均价）* 空仓合约张数* 合约面值
          （盈亏 / 持仓保证金）*100%
        */
        caluType1() {//收益计算
            this.opensecurity = this.openamount / this.sod
            if (this.zod == 1) {//做多 收益 = (平仓价 - 开仓价) / * 开仓数量 / 平仓价
                this.income = this.global_get_tofixed((((this.closeprice - this.openprice) * this.openamount) / this.closeprice), this.global_get_decimal(this.symblefrom).a)
            } else {
                this.income = this.global_get_tofixed((((this.openprice - this.closeprice) * this.openamount) / this.closeprice), this.global_get_decimal(this.symblefrom).a)
            }
            this.rate = this.income / this.opensecurity
        },
        caluType2() {//盈利百分比，目标价计算
            if (this.zod == 1) {//做多
                this.targetprice = this.global_get_tofixed(parseFloat(this.openprice) + (((parseFloat(this.openprice) * parseFloat(this.roe)) / 100) / parseFloat(this.sod)), 2);
            } else {
                this.targetprice = this.global_get_tofixed(parseFloat(this.openprice) - (((parseFloat(this.openprice) * parseFloat(this.roe)) / 100) / parseFloat(this.sod)), 2);
            }
        },
        caluType3() {//爆仓价计算
            if (this.zod == 1) {//做多
                this.liquidationprice = this.global_get_tofixed((parseFloat("0.01") * parseFloat(this.openprice) * parseFloat(this.openamount) +
                    parseFloat(this.sod) * parseFloat(this.openprice) * parseFloat(this.openamount)) / (parseFloat(this.sod) * parseFloat(this.accountequity) +
                        parseFloat(this.sod) * parseFloat(this.openamount)), 2);
            } else {
                this.liquidationprice = this.global_get_tofixed((parseFloat("0.01") * parseFloat(this.openprice) * parseFloat(this.openamount) -
                    parseFloat(this.sod) * parseFloat(this.openprice) * parseFloat(this.openamount)) / (parseFloat(this.sod) * parseFloat(this.accountequity) -
                        parseFloat(this.sod) * parseFloat(this.openamount)), 2);
            }
        },
        caluType4() {//计算可开数量
            this.openamount = this.global_get_tofixed(parseFloat(this.sod) * parseFloat(this.accountequity), this.global_get_decimal(this.symblefrom).a)
            this.targetprice = this.global_get_tofixed(parseFloat(this.sod) * parseFloat(this.accountequity) * parseFloat(this.openprice), 2)
        },
        caluType5() {//计算开仓价格
             var total=0;
             var total_amount=0;
             this.inputList.forEach(item=>{
                  total+=(parseFloat(item.price)*parseFloat(item.amount));
                  total_amount+=parseFloat(item.amount);
             });
             this.targetprice=this.global_get_tofixed(total/total_amount,2);
        }
    },
    mounted() { }
};
</script>

<style lang="scss" >
#currency-calu-modal {
    .disabled-btn {
        background: #4B4E52 !important;
        color: #fff !important;
        border: none !important;
    }

    .ant-modal-content {
        background: #1E2125;
        border-radius: 12px;

        .ant-modal-body {
            padding: 0;
        }
    }

    .ant-modal-close-x {
        display: none;
    }

    .ant-select-selection {
        background: #191C1F;
        border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
        color: #7E7E7E;
    }

    .ant-select-selection-selected-value {
        color: #7E7E7E;
    }

    .ant-select-arrow {
        color: #7E7E7E;
    }

    .ant-slider-mark-text-active {
        color: #7E7E7E;
    }

    .ant-input {
        border: 1px solid #d0d5dd;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 6px;
        background: transparent;
        font-weight: 500;
        font-size: 12px;
        color: #ffffff;

        &::placeholder {
            color: #555A5F;
            font-weight: 500 !important;

        }
    }

    .usdt-txt {
        font-weight: 500;
        font-size: 12px;
        color: #555A5F;
        font-weight: 500 !important;

    }

    .ant-divider.ant-divider-horizontal {
        background: #3E3E3E;
        height: 0.9px;
    }

    .ant-tabs-nav .ant-tabs-tab:first-child {
        margin-left: 0px !important;
    }

    .ant-tabs-ink-bar {
        background-color: #FF9600 !important;
    }

    .ant-tabs-nav-container-scrolling {
        padding: 0;
    }

    .open-price-tab {
        .ant-tabs-bar {
            border: none;
            margin-bottom: 0;
        }

        .ant-tabs-nav .ant-tabs-tab {
            padding-bottom: 0px;
            margin: 0px 0 20px 0;
        }
    }
    .ant-tabs-nav .ant-tabs-tab {
        padding: 15px 12px !important;

}
    .ant-tabs-nav-wrap {
        padding: 0 !important;
    }
    .ant-tabs-nav.ant-tabs-nav-animated {
        background: transparent !important;
    }
    .ant-tabs-nav .ant-tabs-tab {
        background: transparent !important;
        font-weight: 500;
font-size: 14px;
color: #7E7E7E !important;
    }
    .ant-tabs-bar {
        border-bottom: 1px solid #3E3E3E !important;
        margin-bottom: 15px !important;
    }

    .long-btn {
        background: #0ECB81;
        border-radius: 3px;
        height: 35px;
        font-weight: 500;
        font-size: 14px;
        border: none;
        color: #fff;
    }

    .neutral-btn {
        background: #4B4E52;
        border-radius: 3px;
        height: 35px;
        font-weight: 500;
        font-size: 14px;
        border: none;
        color: #fff;
    }

    .short-btn {
        background: #f6465d;
        border-radius: 3px;
        height: 35px;
        font-weight: 500;
        font-size: 14px;
        border: none;
        color: #fff;
    }

    .ant-slider-rail {
        background: #555A5F;
        height: 2px;
    }

    .ant-slider-mark-text {
        color: #7E7E7E;
    }

    .ant-slider-track {
        height: 2px;
    }

    .ant-slider:hover .ant-slider-rail {
        background: #555A5F;
    }

    .futures-calu {
        font-weight: 500;
        font-size: 14px;
        color: #fff;
    }

    .openprice-title {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #555A5F;
        font-weight: 500 !important;

    }

    .result-desc {
        color: #7E7E7E;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
    }

    .addposition-txt {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #FFA500;
    }

    .openprice-card {
        background: transparent;
        border: 1px solid #555A5F;
        border-radius: 4px;

        .ant-card-body {
            padding: 11px 10px;

            .ant-form-item {
                margin-bottom: 0;
            }

            .openprice-input {
                height: 38px !important;
                border: 1px solid transparent !important;
                color: #7E7E7E;
                padding-left: 0 !important;
                &:hover {
                    border: 1px solid #555A5F !important;
                    padding-left: 10px !important;

                }

                &:focus {
                    border: 1px solid #555A5F !important;
                    padding-left: 10px !important;

                }
            }
        }

    }

    .result-card {
        background: #191C1F;
        border: 1px solid #3E3E3E;
        border-radius: 3px;

        .ant-card-body {
            padding: 10px 20px;

            .result-heading {
                font-weight: 500;
                font-size: 12px;
                color: #FFFFFF;
            }


        }
    }
}</style>
