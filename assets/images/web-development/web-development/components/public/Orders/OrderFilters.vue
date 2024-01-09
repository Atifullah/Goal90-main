<template>
    <div class="legal-currency-filters px-4 pt-3">
      <a-form-model :hide-required-mark="true" :model="legalCurrencyFilters">
        <a-row :gutter="16">
          <a-col :lg="5">
            <a-form-model-item
              has-feedback
              :label="$t('labels.lbl75')"
              prop="allCoin"
              :colon="false"
              :wrapper-col="{
                xl: 24,
                lg: 24,
                md: 24,
                sm: 24,
                xs: 24,
              }"
            >
              <a-select
              placeholder="BTC"
                style="width: 100%"
              >
                <a-select-option value="jack"> {{$t('person.pm14')}} </a-select-option>
                <a-select-option value="lucy"> {{$t('person.pm15')}} </a-select-option>
                <a-select-option value="disabled" disabled>
                  {{$t('person.pm16')}}
                </a-select-option>
                <a-select-option value="Yiminghe"> {{$t('person.pm17')}} </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="5">
            <a-form-model-item
              has-feedback
              :label="$t('labels.lbl76')"
              prop="orderType"
              :colon="false"
              :wrapper-col="{
                xl: 24,
                lg: 24,
                md: 24,
                sm: 24,
                xs: 24,
              }"
            >
            <a-select
            :placeholder="$t('placeholders.plh54')"
              style="width: 100%"
            >
              <a-select-option value="jack"> {{$t('person.pm14')}} </a-select-option>
              <a-select-option value="lucy"> {{$t('person.pm15')}} </a-select-option>
              <a-select-option value="disabled" disabled>
                {{$t('person.pm16')}}
              </a-select-option>
              <a-select-option value="Yiminghe"> {{$t('person.pm17')}} </a-select-option>
            </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="5">
            <a-form-model-item
              has-feedback
              :label="$t('legalDeal.Status')"
              prop="status"
              :colon="false"
              :wrapper-col="{
                xl: 24,
                lg: 24,
                md: 24,
                sm: 24,
                xs: 24,
              }"
            >
            <a-select
            :placeholder="$t('placeholders.plh55')"
              style="width: 100%"
            >
              <a-select-option value="jack"> {{$t('person.pm14')}} </a-select-option>
              <a-select-option value="lucy"> {{$t('person.pm15')}} </a-select-option>
              <a-select-option value="disabled" disabled>
                {{$t('person.pm16')}}
              </a-select-option>
              <a-select-option value="Yiminghe"> {{$t('person.pm17')}} </a-select-option>
            </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="6">
            <a-form-model-item
              has-feedback
              :label="$t('labels.lbl77')"
              prop="date"
              :colon="false"
              :wrapper-col="{
                xl: 24,
                lg: 24,
                md: 24,
                sm: 24,
                xs: 24,
              }"
            >
            <a-range-picker>
              <span slot="suffixIcon">
                <img src="/images/calendar.svg" />
                </span>
            </a-range-picker>
            </a-form-model-item>
          </a-col>
          <a-col :lg="3" class="code-btn-space mt-3">
            <a-button class="light-blue-btn fw-5" block
              ><img src="/images/uc-reset-icon.svg" class="pr-2" />
              {{$t('person.pdd11')}}</a-button
            >
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </template>

  <script>
  export default {
    data() {
        return {
            legalCurrencyFilters: {
                orderType: [],
                status: [],
                allCoin: []
            }
        }
    }
  }
  </script>

  <style></style>
