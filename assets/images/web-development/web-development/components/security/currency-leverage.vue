
<template>
    <div class="currency-leverage">
        <a-modal id="currency-leverage-modal" v-model="currencyLeverageModal" :footer="false" :title="false" width="450px"
            @cancel="close(0)">
            <a-row :gutter="16" class="col-alignment mb-2 ">
                <a-col :lg="20">
                    <p class="mb-0 title-txt">{{ $t('depositModal.dm17') }}</p>
                </a-col>
                <a-col :lg="4" align="end"> <img src="/images/ud-cross.svg" class="pointer" @click="close(0)"></a-col>
            </a-row>

            <a-row :gutter="16">
                <a-col :lg="24" class="mt-4">
                    <a-form-model-item has-feedback :label="''" prop="email" :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                        <a-input class="increase-num" :value="multiple" readOnly>
                            <span class="pointer" slot="addonAfter"><a-icon type="plus" @click="add" /></span>
                            <span class="pointer" slot="addonBefore"><a-icon type="minus" @click="subtract" /></span>
                        </a-input>

                    </a-form-model-item>

                </a-col>
                <a-col :lg="24" class="mt-4">
                    <a-slider :marks="marks" v-model="multiple" :min="1" class="pb-4" />
                    <ul class="currency-list pt-4 mt-2">
                        <li>{{ $t('bscard.bsc41') }}</li>
                        <li>{{ $t('bscard.bsc42') }}</li>
                    </ul>
                    <a-row :gutter="16">
                        <a-col :lg="1"><img src="/images/red-info-circle.svg" /></a-col>
                        <a-col :lg="23" class="pl-3">
                            <p class="mb-0 red-txt">{{ $t('bscard.bsc43') }}
                            </p>
                        </a-col>
                    </a-row>
                    <!-- <p class="margin-txt mb-2 mt-3">Check on Leverage & Margin Table ></p>
                    <p class="margin-txt">Position Limit Enlarge ?</p> -->

                    <a-button class="primary-btn fw-5 mt-4" block @click="setCvalue(multiple)">{{ $t('bscard.bsc44')
                    }}</a-button>
                </a-col>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
export default {
    name: "CurrencyLeverage",
    props: {
        symbleinfo: {
            type: Object,
            default: function () {
                return {}
            },
        },
        listhaveorderinfos: {
            type: Array,
            default: function () {
                return [{
                    cansellamount: 0
                }], [{
                    cansellamount: 0
                }]
            }
        },
        currencyLeverageModal: {
            type: Boolean
        },
    },
    data() {
        return {
            marks: {
                0: '1x',
                20: '5x',
                35: '10x',
                50: '15x',
                65: '20x',
                85: '25x',
                100: '100'
            },
            multipleDatas: [],
            multiple: 10,
            multipleDisabled: false,
        };
    },
    watch: {
        'listhaveorderinfos': function (val) {
            //console.log("listhaveorderinfos changed",val)

            if (val && val.length > 0) {
                this.multiple = val[0].multiple
                this.multipleDisabled = true
                this.$emit("reloadLeverage", this.multiple)
            } else {
                if (this.$userinfo.uid) {
                    var _self = this;
                    let param = { ctid: this.symbleinfo.id }
                    if (this.$route.query.contractType == 1) {
                        param.contractType = 1
                    }
                    this.$store.dispatch("get_contractorder_multiple", param).then(data => {
                        if (data.data) {
                            _self.multiple = data.data;
                            if (_self.multiple > 0) {
                                _self.multipleDisabled = true
                                _self.$emit("reloadLeverage", _self.multiple)
                            }
                        }
                    });
                }
            }
        }
    },
    mounted() {
        this.getcontractinfo();
    },
    methods: {
        setCvalue(multiple) {

            const assetInfo = this.listhaveorderinfos.length > 0 ? this.listhaveorderinfos[0] : {}

            if (multiple <= assetInfo.multiple) {
                this.$store.commit('set_message', {
                    type: 'error',
                    text: 'The leverage multiple must be greater than to the previous multiple'
                })
                return
            }

            this.$emit("confirmCurrencyLeverage", multiple);
            this.$emit("closePopup", 0);
            this.multiple = multiple
        },
        close() {
            this.$emit("closePopup", 0);
        },
        add() {
            if (!this.multiple) {
                this.multiple = this.multipleDatas[0]
            }
            if (this.multiple < parseInt(this.multipleDatas[this.multipleDatas.length - 1])) {
                this.multiple++;
            }
        },
        subtract() {
            if (!this.multiple) {
                this.multiple = this.multipleDatas[0]
            }
            if (this.multiple > parseInt(this.multipleDatas[0])) {
                this.multiple--;
            }
        },
        getcontractinfo() {
            this.$store.dispatch("com_constants_getconstantsinfo", { key: 'sys_contract_rate' }).then(data => {
                if (data) {
                    var dataobj = JSON.parse(data.data);
                    dataobj.forEach(cur => {
                        if (this.symbleinfo.fcurrencyname.toUpperCase() == cur.symbol) {
                            this.multipleDatas = cur.available_level_rate.split(","); //字符分割
                            let obj = {}
                            this.multipleDatas.forEach(item => {
                                obj[item] = item + 'x';
                            })
                            this.marks = obj
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
#currency-leverage-modal {

    .red-txt {
        font-weight: 400;
        font-size: 12px;
        color: #F6465D;
    }

    .margin-txt {
        font-weight: 500;
        font-size: 13px;
        color: #FFA500;
    }

    .ant-modal-content {
        background: #1E2125;
        border-radius: 6px;

        .ant-modal-body {
            padding: 18px 20px 30px;

            .title-txt {
                font-size: 20px;
                color: #fff;
                font-weight: 700;
            }

            .ant-slider-rail {
                background: #555A5F !important;
                height: 4px;
                margin-top: 1px;
            }

            .ant-slider-track {
                margin-top: 1px;
                background: rgb(245, 245, 245) !important;
            }

            .ant-slider:hover .ant-slider-track {
                margin-top: 1px;
                background: rgb(245, 245, 245) !important;
            }

            // .ant-slider-step {
            //     margin-top: 1px;

            //     background: rgb(245, 245, 245) !important;
            // }
            .ant-slider-mark-text {
                margin-top: 11px;
                font-weight: 700;
                font-size: 14px;
                color: #666E79;
            }

            .ant-slider-mark-text-active {
                margin-top: 11px;
                color: #666E79;
                font-weight: 700;
                font-size: 14px;
            }

            .ant-slider-dot:first-child {
                background: rgb(245, 245, 245) !important;
            }

            .ant-slider-mark-text:last-child {
                transform: translateX(-80%) !important;
            }

            .currency-list {
                padding-left: 20px;
                margin-bottom: 0;

                li {
                    font-weight: 500;
                    font-size: 14px;
                    color: rgba(227, 227, 227, 0.5);
                    margin-bottom: 7px;
                }
            }

            .increase-num {
                .ant-input-wrapper.ant-input-group {
                    background: #171B1E;
                    border-radius: 4px;
                    border: none !important;
                }

                input.ant-input {
                    text-align: center !important;
                    border-left: none;
                    border-right: none;
                    background: transparent;
                    border: none;
                    color: #E3E3E3;
                    height: 50px !important;
                }
            }

            .ant-form-item-label>label {
                color: #E3E3E3 !important;
            }

            .ant-input-group-addon {
                background: transparent;
                padding: 0 15px;
                border: none;
                border-radius: 0px;
                color: #E3E3E3;
            }

            .ant-input-group-addon:last-child {
                border: none;
                border-radius: 0px;
            }

            .title-desc {
                border-top: 1px solid #d1d3df;
                padding-top: 10px;
                font-size: 13px;
                text-align: center;
                color: #e09300;
            }

            .counter-card {
                border-radius: 4px;
                font-size: 32px;
                border: 1px solid #d1d3df;
                height: 60px;
                line-height: 60px;
                text-align: center;
                color: #9194a4;
                cursor: pointer;

                &:hover {
                    color: #14a2a5;
                }

                .ant-card-body {
                    padding: 0;
                }
            }


            .activeCard {
                background: #14a2a5 !important;
                color: #fff;

                &:hover {
                    color: #fff;
                }
            }
        }
    }

    .ant-slider-handle {
        position: absolute;
        width: 16px;
        height: 16px;
        transform: translateX(-50%) rotate(45deg) !important;
        background-color: rgb(30, 35, 41);
        border-radius: 4px;
        border: 4px solid rgb(245, 245, 245);
        z-index: 20;
        cursor: grab;
        transition: box-shadow 0.2s ease 0s;
    }

    span.ant-slider-dot.ant-slider-dot-active {
        background: rgb(245, 245, 245);
    }

    .ant-slider-dot {
        box-sizing: content-box;
        position: absolute;
        transform: translateX(-50%) rotate(45deg);
        background-color: #1E2125;
        color: rgb(132, 142, 156);
        width: 6px;
        height: 6px;
        border-radius: 2px;
        border: 2px solid #555A5F;
        z-index: 10;
        overflow: visible;
        cursor: pointer;

        &:hover {
            background-color: #474D57;
        }
    }

    // .ant-slider-handle::after {
    //     content: "";
    //     display: block;
    //     width: 16px;
    //     height: 16px;
    //     border: 2px solid rgb(24, 26, 32);
    //     border-radius: 4px;
    //     background: transparent;
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    // }
    .ant-modal-close-x {
        display: none;
    }
}
</style>
