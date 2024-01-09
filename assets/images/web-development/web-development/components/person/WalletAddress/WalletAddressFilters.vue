<template>
  <div class="wallet-address-filters px-4 pt-4">
    <a-form-model :hide-required-mark="true" label-align="left" :model="walletFilters">
                <a-row :gutter="16">
                <a-col :lg="6">
                <a-form-model-item has-feedback :label="$t('labels.lbl71')" prop="asset" :colon="false"
                    :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                    <a-select default-value="lucy" style="width: 100%" @change="handleChange">
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
                <a-col :lg="6">
                <a-form-model-item has-feedback :label="$t('labels.lbl72')" prop="withdrawalMethod" :colon="false"
                    :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                    <a-select default-value="lucy" style="width: 100%" @change="handleChange">
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
                    <a-button class="primary-btn fw-5" block>{{$t('person.pdd10')}}</a-button>
                </a-col>
                <a-col :lg="3" class="code-btn-space mt-3">
                    <a-button block class="light-blue-btn fw-5"><img src="/images/uc-reset-icon.svg"
                            class="pr-2" />{{$t('person.pdd11')}}</a-button>
                </a-col>
                <a-col :lg="3" class="code-btn-space mt-3">
                    <a-button class="light-blue-btn fw-5" @click="addAddressModal= true"><a-icon type="plus" /> {{$t('person.pdd12')}}</a-button>
                </a-col>
            </a-row>
            </a-form-model>
            <AddAddressModal :addAddressModal="addAddressModal" :close="close"/>
  </div>
</template>

<script>
import AddAddressModal from '@/components/person/WalletAddress/AddAddressModal.vue'
export default {
    components: {
        AddAddressModal,
    },
data() {
    return {
        addAddressModal: false,
    }
}
}
</script>

<style>

</style>
