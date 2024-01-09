<template>
    <div class="second-step">
        <a-row>
            <a-col :lg="12" :offset="6">
                <p class="text-left mb-2 uid-txt fw-5">{{$t('person.pm35')}}</p>
                <a-card class="light-orange-card mb-3" :bordered="false">
                    <a-row>
                    <a-col :lg="6"><img src="/images/crypto-user.svg" /></a-col>
                    <a-col :lg="18">
                        <p class="mb-0 user-email fw-5">khokharacebpo@gmail.com</p>
                    </a-col>
                </a-row>
                </a-card>
                <a-form-model :hide-required-mark="true" :model="secondForm">
                    <a-row class="mb-3">
                        <a-col :lg="24">
                            <a-form-model-item has-feedback :label="$t('labels.lbl64')" prop="type" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                <a-select default-value="search" style="width: 100%">
                                    <a-select-option value="jack">
                                        {{$t('person.pm14')}}
                                    </a-select-option>
                                    <a-select-option value="search">
                                        USDT
                                    </a-select-option>
                                    <a-select-option value="disabled" disabled>
                                        {{$t('person.pm16')}}
                                    </a-select-option>
                                    <a-select-option value="Yiminghe">
                                        {{$t('person.pm17')}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-row class="add-box text-left mb-3">
                        <a-col :lg="24" align="end" class="add-txt">
                            <p class="network-inch fw-5">0.00000000 1INCH</p>
                        </a-col>
                        <a-col :lg="24">

                            <a-form-model-item has-feedback :label="$t('labels.lbl30')" prop="amount" :colon="false" :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                                <a-input :placeholder="$t('placeholders.plh28')" suffix="All" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-row class="add-box text-left mb-3">
                        <a-col :lg="24" align="end" class="add-txt">
                            <p class="network-inch fw-5">0.00000000 1INCH</p>
                        </a-col>
                        <a-col :lg="24">

                            <a-form-model-item has-feedback :label="$t('labels.lbl65')" prop="amount" :colon="false" :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                                <a-input :placeholder="$t('placeholders.plh28')" suffix="0/50" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-row class="mb-4">
                        <a-card class="third-gray-card">
                            <p class="sendto-heading fw-5 text-center mb-0">0.5 USDT</p>
                            <p class="sendto-num fw-5 mb-4">≈ £0.42175000</p>
                            <a-row :gutter="16" class="text-left">
                                <a-col :lg="6"><p class="mb-0 send-email fw-5 gray-email">{{$t('person.pm35')}}</p><p class="mb-0 send-email fw-5 gray-email">{{$t('person.Note_person')}}</p></a-col>
                                <a-col :lg="18" align="end"><p class="mb-0 send-email fw-5 ">Shoaib.dhu@outlook.com</p><p class="mb-0 send-email fw-5">{{$t('person.pm38')}}</p></a-col>
                            </a-row>
                        </a-card>
                    </a-row>
                    <a-row class="mb-3">
                        <a-col :lg="24">
                            <a-form-model-item has-feedback :label="$t('labels.lbl66')" prop="type" :colon="false"  :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                <a-select default-value="search" style="width: 100%">
                                    <a-select-option value="jack">
                                        {{$t('person.pm14')}}
                                    </a-select-option>
                                    <a-select-option value="search">
                                        USDT
                                    </a-select-option>
                                    <a-select-option value="disabled" disabled>
                                        {{$t('person.pm16')}}
                                    </a-select-option>
                                    <a-select-option value="Yiminghe">
                                        {{$t('person.pm17')}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="8">
                        <a-col :lg="12"><a-button block class="back-btn">{{$t('person.pm36')}}</a-button></a-col>
                        <a-col :lg="12"><a-button class="primary-btn" block>{{$t('person.pm37')}}</a-button></a-col>
                    </a-row>
                </a-form-model>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
