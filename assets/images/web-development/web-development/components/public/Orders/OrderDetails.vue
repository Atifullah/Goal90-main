<template>
    <div class="currency-detail px-4">
          <a-row :gutter="16" class="px-3">
              <a-col :lg="3"><p class="type-coin-txt fw-4">{{$t('public.pub9')}}</p></a-col>
              <a-col :lg="4"><p class="type-coin-txt fw-4">{{$t('public.pub10')}}</p></a-col>
              <a-col :lg="3"><p class="type-coin-txt fw-4">{{$t('public.pub11')}}</p></a-col>
              <a-col :lg="4"><p class="type-coin-txt fw-4">{{$t('public.pub12')}}</p> </a-col>
              <a-col :lg="4"><p class="type-coin-txt fw-4">{{$t('public.pub13')}}</p></a-col>
              <a-col :lg="3"><p class="type-coin-txt fw-4">{{$t('public.pub14')}}</p></a-col>
              <a-col :lg="3" align="end"><p class="type-coin-txt fw-4">{{$t('public.pub15')}}</p> </a-col>

          </a-row>
          <a-card :bordered="false" class="currency-detail-card first-card">
              <a-row class="px-3 curency-detail-bg">
                  <a-col :lg="14"><p class="mb-0 currency-txt fw-5"><span class="buy-txt">{{$t('public.pub16')}}</span>  <a-divider type="vertical" class="mx-2"/> 2022-11-19 15:25:23</p></a-col>
                  <a-col :lg="10" align="end"><p class="mb-0 copy-link-txt fw-5 pointer">20427229712<img src="/images/copy-icon.svg" class="pl-3 mb-1" height="15px"/> </p></a-col>
              </a-row>
              <a-row :gutter="16" class="px-3 py-4">
              <a-col :lg="3"><p class="col-alignment currency-txt fw-5 usdt-txt"><img src="/images/usdt.svg" class="pr-2"/> USDT</p></a-col>
              <a-col :lg="4"><p class="currency-txt fw-5 usdt-txt">100.00 CNY</p></a-col>
              <a-col :lg="3"><p class="currency-txt fw-5 usdt-txt">7.44 CNY</p></a-col>
              <a-col :lg="4"><p class="currency-txt fw-5 usdt-txt"> 13.44 USDT </p></a-col>
              <a-col :lg="4"><p class="currency-txt fw-5 usdt-txt">{{$t('public.pub17')}}</p></a-col>
              <a-col :lg="3"><p class="currency-txt fw-5 usdt-txt">{{$t('public.pub18')}}</p></a-col>
              <a-col :lg="3" align="end"><a-button class="contact-btn fw-5">{{$t('public.pub19')}}</a-button></a-col>
          </a-row>
      </a-card>
      <a-card :bordered="false" class="currency-detail-card">
            <a-row class="px-3 curency-detail-bg">
                <a-col :lg="14"><p class="mb-0 currency-txt fw-5"><span class="sell-txt">{{$t('public.pub20')}}</span>  <a-divider type="vertical" class="mx-2"/> 2022-11-19 15:25:23</p></a-col>
                <a-col :lg="10" align="end"><p class="mb-0 pointer">20427229712<img src="/images/copy-icon.svg" class="pl-3 mb-1" height="15px"/> </p></a-col>
            </a-row>
                <a-row :gutter="16" class="px-3 py-4">
                <a-col :lg="3"><p class="col-alignment currency-txt fw-5 usdt-txt"><img src="/images/usdt.svg" class="pr-2"/> USDT</p></a-col>
                <a-col :lg="4"><p class="currency-txt fw-5 usdt-txt">100.00 CNY</p></a-col>
                <a-col :lg="3"><p class="currency-txt fw-5 usdt-txt">7.44 CNY</p></a-col>
                <a-col :lg="4"><p class="currency-txt fw-5 usdt-txt"> 13.44 USDT </p></a-col>
                <a-col :lg="4"><p class="currency-txt fw-5 usdt-txt">{{$t('public.pub17')}}</p></a-col>
                <a-col :lg="3"><p class="currency-txt fw-5 usdt-txt">{{$t('public.pub18')}}</p></a-col>
                <a-col :lg="3" align="end"><a-button class="contact-btn fw-5">{{$t('public.pub19')}}</a-button></a-col>
             </a-row>
      </a-card>
    </div>
  </template>

  <script>
  export default {

  }
  </script>

  <style>

  </style>
