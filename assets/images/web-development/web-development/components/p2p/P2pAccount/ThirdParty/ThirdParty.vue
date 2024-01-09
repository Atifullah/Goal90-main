<template>
    <div class="bank-transfer">
        <a-form-model ref="thirdPartyForm" :model="thirdPartyForm" :hide-required-mark="true" label-align="left">
            <a-card :bordered="false" class="bank-transfer-card mt-5 py-4 mx-4">
                <div class="px-4">
                    <a-row :gutter="16">
                        <a-col :lg="8">
                            <a-form-model-item has-feedback :label="$t('thirdparty.tdp12')" prop="wantToPay" :colon="false"
                                :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                <a-input :default-value="$t('placeholders.plh28')">
                                    <div slot="suffix">
                                        <a-select default-value="lucy" dropdownClassName="third-party-transfer">
                                            <a-select-option value="jack">
                                                {{$t('express.exp9')}}
                                            </a-select-option>
                                            <a-select-option value="lucy">
                                                {{$t('express.exp10')}}
                                            </a-select-option>
                                            <a-select-option value="disabled">
                                                {{$t('express.exp11')}}
                                            </a-select-option>
                                            <a-select-option value="Yiminghe">
                                                {{$t('express.exp12')}}
                                            </a-select-option>
                                        </a-select>
                                    </div>
                                </a-input>

                            </a-form-model-item>
                        </a-col>
                        <a-col :lg="5">
                            <a-form-model-item has-feedback :label="$t('express.exp46')" prop="wantToPay" :colon="false"
                                :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">

                                <a-select default-value="lucy">
                                    <a-select-option value="jack">
                                        {{$t('express.exp9')}}
                                    </a-select-option>
                                    <a-select-option value="lucy">
                                        {{$t('express.exp10')}}
                                    </a-select-option>
                                    <a-select-option value="disabled">
                                        {{$t('express.exp11')}}
                                    </a-select-option>
                                    <a-select-option value="Yiminghe">
                                        {{$t('express.exp12')}}
                                    </a-select-option>
                                </a-select>

                            </a-form-model-item>
                        </a-col>
                        <a-col :lg="1" align="center">
                            <a-divider type="vertical" class="vertical-payment" />
                        </a-col>
                        <a-col :lg="7">
                            <p class="reminder-txt fw-5 mt-1"><span class="reminder-line pl-1">{{$t('thirdparty.tdp1')}}</span> </p>
                            <p>{{$t('thirdparty.tdp2')}}</p>
                        </a-col>
                    </a-row>

                </div>
            </a-card>
            <a-card :bordered="false" class="bank-transfer-card my-5 py-4 mx-4 px-4">
                <a-row :gutter="16">
                    <a-col :lg="12">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="2">
                                <p class="payment-type mb-0">1</p>
                            </a-col>
                            <a-col :lg="22">
                                <p class="payment-type-txt fw-5 mb-0">{{$t('thirdparty.tdp3')}}</p>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">

                            <a-col :lg="20" class="">
                                <a-divider />

                                <a-form-model-item has-feedback prop="wantToPay" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                    <a-select default-value="lucy" class="bank-account-tag">
                                        <p slot="suffixIcon">
                                            <a-tag class="bank-tag fw-5"><img src="/images/visa-small.svg" /></a-tag>
                                            <a-tag class="bank-tag fw-5"><img src="/images/master-small.svg" /></a-tag>
                                            <a-tag class="bank-tag fw-5"><img src="/images/apple-black.svg"
                                                    height="14" /></a-tag>
                                            <a-tag class="bank-tag fw-5">{{$t('thirdparty.tdp4')}}</a-tag>

                                        </p>

                                        <a-select-option value="jack">
                                            {{$t('express.exp9')}}
                                        </a-select-option>
                                        <a-select-option value="lucy">
                                            <img src="/images/img-select.svg" /> {{$t('thirdparty.tdp5')}}

                                        </a-select-option>
                                        <a-select-option value="disabled">
                                            {{$t('express.exp11')}}
                                        </a-select-option>
                                        <a-select-option value="Yiminghe">
                                            {{$t('express.exp12')}}
                                        </a-select-option>
                                    </a-select>

                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="20" class="pt-4">
                                <a-form-model-item has-feedback prop="wantToPay" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                    <a-select default-value="lucy" class="bank-account-tag">
                                        <p slot="suffixIcon">
                                            <a-tag class="bank-tag fw-5"><img src="/images/visa-small.svg" /></a-tag>
                                            <a-tag class="bank-tag fw-5"><img src="/images/master-small.svg" /></a-tag>
                                            <a-tag class="bank-tag fw-5"><img src="/images/apple-black.svg"
                                                    height="14" /></a-tag>
                                            <a-tag class="bank-tag fw-5">{{$t('thirdparty.tdp4')}}</a-tag>

                                        </p>

                                        <a-select-option value="jack">
                                            {{$t('express.exp9')}}
                                        </a-select-option>
                                        <a-select-option value="lucy">
                                            <img src="/images/img-select.svg" /> {{$t('thirdparty.tdp5')}}

                                        </a-select-option>
                                        <a-select-option value="disabled">
                                            {{$t('express.exp11')}}
                                        </a-select-option>
                                        <a-select-option value="Yiminghe">
                                            {{$t('express.exp12')}}
                                        </a-select-option>
                                    </a-select>

                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="20" class="pt-4">
                                <a-form-model-item has-feedback prop="wantToPay" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                    <a-select default-value="lucy" class="bank-account-tag">
                                        <p slot="suffixIcon">
                                            <a-tag class="bank-tag fw-5"><img src="/images/visa-small.svg" /></a-tag>
                                            <a-tag class="bank-tag fw-5"><img src="/images/master-small.svg" /></a-tag>
                                            <a-tag class="bank-tag fw-5"><img src="/images/apple-black.svg"
                                                    height="14" /></a-tag>
                                            <a-tag class="bank-tag fw-5">{{$t('thirdparty.tdp4')}}</a-tag>

                                        </p>

                                        <a-select-option value="jack">
                                            {{$t('express.exp9')}}
                                        </a-select-option>
                                        <a-select-option value="lucy">
                                            <img src="/images/img-select.svg" /> {{$t('thirdparty.tdp5')}}

                                        </a-select-option>
                                        <a-select-option value="disabled">
                                            {{$t('express.exp11')}}
                                        </a-select-option>
                                        <a-select-option value="Yiminghe">
                                            {{$t('express.exp12')}}
                                        </a-select-option>
                                    </a-select>

                                </a-form-model-item>
                            </a-col>
                        </a-row>

                    </a-col>
                    <a-col :lg="12">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="2">
                                <p class="payment-type mb-0">2</p>
                            </a-col>
                            <a-col :lg="22">
                                <p class="payment-type-txt fw-5 mb-0">{{$t('thirdparty.tdp7')}}</p>
                            </a-col>
                        </a-row>
                        <a-divider />
                        <a-row>
                            <a-col :lg="24">
                                <p class="mb-2 payment-type-txt fw-5">{{$t('thirdparty.tdp8')}}</p>
                                <p class="mb-0 disclaimer-desc pr-5">{{$t('thirdparty.tdp9')}}
                                </p>
                                <p>
                                <a-checkbox class="mt-4">
                                    {{$t('thirdparty.tdp11')}}
                                </a-checkbox>
                            </p>
                                <a-button class="primary-btn my-4" block>{{$t('thirdparty.tdp11')}}</a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-card>
        </a-form-model>
    </div>
</template>

<script>
export default {
    data() {
        return {
            thirdPartyForm: {

            }
        }
    }
}
</script>

<style>

</style>
