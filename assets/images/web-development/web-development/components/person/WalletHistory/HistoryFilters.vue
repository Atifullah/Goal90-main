<template>
    <div class="history-filters px-4 pt-3">
        <a-form-model :model="walletHistoryModel" :hide-required-mark="true" label-align="left">
            <a-row :gutter="16">
                <a-col :lg="5">
                    <a-form-model-item has-feedback :label="$t('labels.lbl73')" prop="billingDetails" :colon="false"
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
                            <a-select-option value="Yiminghe">
                                {{$t('person.pm17')}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :lg="5">
                    <a-form-model-item has-feedback :label="$t('labels.lbl47')" prop="coins" :colon="false" :wrapper-col="{
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
                            <a-select-option value="Yiminghe">
                                {{$t('person.pm17')}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :lg="3" class="code-btn-space mt-3">
                    <a-button block class="primary-btn fw-5">{{$t('person.pdd10')}}</a-button>
                </a-col>
                <a-col :lg="3" class="code-btn-space mt-3">

                    <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
            <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 2 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
            {{ $t('memberCenter.reset')
                    }}</a-button>
            </span>

                </a-col>
            </a-row>
        </a-form-model>
    </div>
</template>

<script>
export default {
data() {
    return {
        hoverKey: -1,
        walletHistoryModel: {}
    }
}
}
</script>

<style>

</style>
