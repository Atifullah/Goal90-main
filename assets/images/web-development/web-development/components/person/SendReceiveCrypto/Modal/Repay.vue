<template>
  <div class="repay">
    <a-modal id="repay-modal" v-model="repayModal" width="30%" :footer="false" :title="false" @cancel="close">
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="12"><p class="repay-heading fw-5 mb-0">{{$t('person.pm12')}}</p><p></p></a-col>
            <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" @cancel="close"/></a-col>
        </a-row>
        <a-row :gutter="16" class="mt-4 mb-3">
            <a-col :lg="24">
                <p class="repayment-txt fw-5 mb-2">{{$t('person.pm13')}}</p>
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
            </a-col>

        </a-row>
        <a-row :gutter="16">
            <a-col :lg="12"><p class="mb-2 repayment-txt fw-5">{{$t('person.pm18')}}</p></a-col>
            <a-col :lg="12" align="end"><p class="mb-2 available-usdt">{{$t('person.pm19')}}</p></a-col>
            <a-col :lg="24">
            <a-input  addon-after="USDT" default-value="mysite" suffix="All"/></a-col>
        </a-row>
        <a-row :gutter="16" class="mt-3">
            <a-col :lg="24">
                <a-button class="repay-btn fw-7">{{$t('person.pm20')}}</a-button>
                <a-card class="transfr-in-card">
                    <a-row :gutter="16">
                        <a-col :lg="12"><p class="transfer-heading fw-4 gray-txt-color">{{$t('person.pm21')}}</p><p class="transfer-heading fw-4 gray-txt-color">{{$t('person.pm23')}}</p><p class="transfer-heading fw-4 gray-txt-color">{{$t('person.pm22')}}</p></a-col>
                        <a-col :lg="12" align="end"><p class="transfer-heading fw-4">18.3846000000</p><p class="transfer-heading fw-4">18.3846000000</p><p class="transfer-heading fw-4">18.3846000000</p></a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="16" class="mt-4">
            <a-col :lg="12"><a-button class="cancel-btn fw-7" block>{{$t('person.pd18')}}</a-button></a-col>
            <a-col :lg="12"><a-button class="primary-btn fw-5" block>{{$t('person.pd19')}}</a-button></a-col>

        </a-row>
</a-modal>
  </div>
</template>

<script>
export default {
    props: {
        repayModal: {
                type: Boolean
            },
            close:{
                type: Function
            }
        },
}
</script>

<style>

</style>
