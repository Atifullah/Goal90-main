<template>
    <div id="p2p-filters">
        <div class="shadow-card pt-4 px-4 pb-4">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="5" class="pt-2">
                    <div class="buy-sell-box">
                        <div class="buy-left"><a-button class="buy-btn fw-5" block>{{$t('deal.buy')}}</a-button></div>
                        <div class="sell-right"><a-button class="sell-btn fw-5" block>{{$t('deal.sell')}}</a-button></div>
                    </div>
                </a-col>
                <a-col :lg="19">
                    <a-form-model ref="filterForm" :model="filterForm" :hide-required-mark="true" label-align="left">
                        <a-row :gutter="16">
                            <a-col :lg="21">
                                <a-row :gutter="16">
                                    <a-col :lg="5">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl80')" prop="email" :colon="false"
                                            :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select default-value="lucy" style="width: 100%">
                                                <a-select-option value="jack">
                                                    {{$t('person.pm14')}}
                                                </a-select-option>
                                                <a-select-option value="lucy">
                                                    {{$t('person.pm15')}}
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
                                    <a-col :lg="8">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl30')" prop="email" :colon="false"
                                            :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input addon-after="Search" default-value="Enter amount">
                                                <div slot="suffix">
                                                    <a-select default-value="lucy"
                                                        dropdownClassName="p2p-filter-drop">
                                                        <a-select-option value="jack">
                                                            {{$t('person.pm14')}}
                                                        </a-select-option>
                                                        <a-select-option value="lucy">
                                                            {{$t('person.pm15')}}
                                                        </a-select-option>
                                                        <a-select-option value="disabled" disabled>
                                                            {{$t('person.pm16')}}
                                                        </a-select-option>
                                                        <a-select-option value="Yiminghe">
                                                            {{$t('person.pm17')}}
                                                        </a-select-option>
                                                    </a-select>
                                                </div>
                                            </a-input>

                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :lg="5">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl81')" prop="email" :colon="false"
                                            :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select default-value="All payment" style="width: 100%">
                                                <a-select-option value="jack">
                                                    {{$t('person.pm14')}}
                                                </a-select-option>
                                                <a-select-option value="lucy">
                                                    {{$t('person.pm15')}}
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
                                    <a-col :lg="6">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl82')" prop="email"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select default-value="All Regions" style="width: 100%">
                                                <a-select-option value="jack">
                                                    {{$t('person.pm14')}}
                                                </a-select-option>
                                                <a-select-option value="lucy">
                                                    {{$t('person.pm15')}}
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
                            </a-col>
                            <a-col :lg="3" class="code-p2pbtn-space">
                                <a-row :gutter="16">
                                    <a-col :lg="13"> <a-button class="filter-btn fw-7">{{$t('adsharing.as28')}} <img
                                                src="/images/down-blue-arrow.svg" class="ml-2" /></a-button></a-col>
                                    <a-col :lg="11"> <a-button class="reset-btn"><img
                                                src="/images/reset-icon.svg" /></a-button></a-col>
                                </a-row>

                            </a-col>
                        </a-row>
                    </a-form-model>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
export default {
data() {
    return {
        filterForm: {

        }
    }
}
}
</script>

<style lang="scss">
@import '@/assets/scss/components/p2p-modules/p2p-filters.scss';
</style>
