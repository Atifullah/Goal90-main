<template>
    <div id="p2p-filters">
        <div class="shadow-card pt-4 px-4 pb-4">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="24">
                    <a-form-model ref="filterForm" :model="filterForm" :hide-required-mark="true" label-align="left">
                        <a-row :gutter="16">
                            <a-col :lg="5">
                                <a-form-model-item has-feedback :label="$t('labels.lbl75')" prop="email" :colon="false"
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
                            <a-col :lg="5">
                                <a-form-model-item has-feedback :label="$t('labels.lbl76')" prop="email" :colon="false"
                                    :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">

                                    <a-select default-value="lucy">
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
                            <a-col :lg="5">
                                <a-form-model-item has-feedback :label="$t('labels.lbl78')" prop="email" :colon="false" :wrapper-col="{
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
                            <a-col :lg="5">
                                <a-form-model-item has-feedback :label="$t('labels.lbl79')" prop="email" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                    <a-range-picker  style="width: 100%">
                                        <span slot="suffixIcon">
                                            <img src="/images/calender.svg"/>
                                        </span>
                                    </a-range-picker>
                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="2" class="code-p2pbtn-space">
                                <a-button class="filters-orange-btn fw-7" block>{{$t('adsharing.as28')}}<img
                                        src="/images/orange-down-arrow.svg" class="ml-2" /> </a-button>
                            </a-col>
                            <a-col :lg="2" class="code-p2pbtn-space">
                                <a-button class="reset-btn" block><img src="/images/reset-icon.svg"
                                        class="mr-2" />{{$t('person.pdd11')}}</a-button>
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
            filterForm: {},
        };
    },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/p2p-modules/p2p-filters.scss";
</style>
