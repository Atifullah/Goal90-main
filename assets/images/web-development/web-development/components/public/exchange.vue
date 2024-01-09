<template>
    <div class="language">
      <a-modal
        id="language"
        v-model="isExchange"
        width="593px"
        :footer="false"
        :title="false"
        @cancel="handleExchangeModal"
      >
      <a-row :gutter="16" class="px-4 ml-2">
        <a-col :lg="12"><p class="rate-title fw-5 mb-0">{{$t('public.pe1')}}</p></a-col>
        <a-col :lg="12" align="end" @click="handleCancel" class="pointer">
            <img src="/images/ud-cross.svg"/>
        </a-col>
      </a-row>
      <a-divider class="language-divider"/>
      <div class="scroll_div">
        <a-row :gutter="16" class="pl-4 pr-2 mx-2 mb-4">
          <a-col :lg="12" class="pt-2"
            ><p class="mb-0 region-text fw-5">{{$t('public.pe2')}}</p></a-col
          >
          <a-col :lg="12">
            <a-input ref="userNameInput" :placeholder="$t('placeholders.plh50')" v-model="search">
                <span slot="prefix">
                    <img src="/images/search123.svg" />
                </span>
            </a-input>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="pt-4 mt-3 px-4 mx-2">
          <a-col v-for="(list, key) in exchange" :key="key" :lg="6">
            <p class="mb-1 language-txt fw-4 pointer" @click="setExchange(list.name)"><img  class="mr-3" :src="list.icon" height="21" width="21"/>{{ list.name }}</p>
          </a-col>
        </a-row>
        </div>
      </a-modal>
    </div>
  </template>

  <script>
  import * as jsCokie from "js-cookie";
  export default {
    props:{
        isExchange:{
            type: Boolean
        },
        handleExchangeModal:{
            type: Function
        }
    },
    data(){
      return{
        search:'',
      }
    },
    computed: {
        exchange: function () {
          const _self=this;
          const exchangedata=this.$store.state.hex_client_exchange;
          if(_self.search!=''){
              const filtered = exchangedata.infos.filter(function (item) {
                const str=item.name.toLowerCase();
                return str.indexOf(_self.search.toLowerCase()) !== -1;
              });
                return filtered
            }
            return exchangedata.infos;
        },

    },
    methods: {
      setExchange(e) {
        this.$store.commit("set_client_exchange", e);
        jsCokie.set(this.$store.state.hex_client_exchange.type, e);
        this.handleExchangeModal();
    },
    handleCancel() {
        this.handleExchangeModal()
    }
    },

  }
  </script>

  <style></style>
