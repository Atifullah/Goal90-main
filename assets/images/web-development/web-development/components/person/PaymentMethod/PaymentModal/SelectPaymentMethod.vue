<template>
  <div class="success-message">
    <a-modal
      id="add-payment"
      v-model="model"
      width="674px"
      :footer="false"
      @cancel="close"
      :maskClosable="false"
    >
    <div v-if="showAlphabetically">
      <a-row  class="px-4 pt-4" >
          <a-col :lg="16">
              <p class="payment-heading fw-5">
              {{$t('person.pp1')}}
            </p>
          </a-col>
          <a-col :lg="8" align="end" class=" pointer">
            <img src="/images/cross.svg" @click="close"/>
          </a-col>

        </a-row>
        <a-row class="px-4">
          <a-col :lg="24" >
            <div class="">
              <p class="payment-txt mb-2">{{$t('person.pp2')}}</p>
              <a-row class="pl-1">
                <a-col v-if="i<showrecommend"  v-for="(item,i) in paymentMethodCollection.recommend" :key="i" class="col-mg-b" :lg="12" style="margin: 5px 0">
                  <a @click="redirect(item)" class="text-grey" style="cursor:pointer;"><span class="recommended-txt fw-5" :style="{borderLeft:`3px solid ${item.bgcolor}`}"><span class="pl-2">{{item.name}}</span></span></a>
                </a-col>

              </a-row>
              <div class="pt-2 show-more-txt fw-5" v-if="showrecommend<paymentMethodCollection.recommend?.length" @click.prevent="showrecommend=paymentMethodCollection.recommend.length">{{$t('manage.showMore')}}</div>
              <div class="show-more-txt fw-5" v-else-if="paymentMethodCollection.recommend?.length>4" @click.prevent="showrecommend=4">{{$t('manage.showLess')}}</div>

            </div>
          </a-col>
        </a-row>
        <a-divider class="mt-3 payment-divider" />
        <a-row class="mx-4 mb-4">
          <a-col :lg="12" class="p-0">
            <p class="mb-0 sub-heading my-2">{{$t('person.pp3')}}</p>

          </a-col>
          <a-col :lg="12">
            <a-input :placeholder="$t('placeholders.plh5')" v-model="search" class="search-payment-method">
              <span slot="prefix">
                <img src="/images/search-icon.svg"
              /></span> </a-input
          ></a-col>
        </a-row>
        <a-row class="mx-4">
          <a-col :lg="24" class="pl-0">
              <span
              class="mr-1 pointer fw-6"
              :class="''==showAlpha?'active':'blue-list'"
              @click.prevent="showAlpha=''"
            >
            {{$t('manage.All')}}
          </span>
            <span
              v-for="(item, key) in sortAlphas"
              :key="key"
              class="pointer fw-6 "
              :class="item==showAlpha?'active':'blue-list'"
              @click.prevent="showAlpha=item, search=''"
            > {{ item }}
        </span>
          </a-col>

          
        </a-row>
        <a-row class="mx-4 pt-2 list-scroll" >
          <a-col :lg="12" v-for="(item, key) in showAlphabetically" class="p-0"
                :key="key">
            <ul class="payment-list" >
              <li
                class="mb-2 payment-txt"

              >
              <a  @click="redirect(item)" style=" cursor:pointer;"><span class="recommended-txt fw-5" :style="{borderLeft:`3px solid ${item.bgcolor}`}"><span class="pl-2">{{item.name}}</span></span></a>
              </li>
            </ul>
          </a-col>
        </a-row>
      </div>
      <div v-else>
        <a-spin style="height:50vh; display:flex; justify-content:center; align-items:center; background:#FDFDFD;" >
          <a-icon slot="indicator" type="loading" style="font-size: 24px; " spin />
        </a-spin>
      </div>
    </a-modal>
  </div>
</template>

<script>

export default {
  props:{
    model:{
      type: Boolean
    },
    paymentMethodCollection:{
      type:Object
    },
    toggleModel:{
      type: Function
    },
    stateChange:Boolean,
    default:false
  },
  data() {
    return {
      sortAlphas:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      showAlpha:'',
      showrecommend:4,
      search:'',
    }
  },
  computed:{
    showAlphabetically(){
      const _self=this;
      const data=_self.paymentMethodCollection.all;
      if(_self.search!=''){
        const filtered = data.filter(function (item) {
          const str=item.name.toLowerCase();
          return str.indexOf(_self.search.toLowerCase()) !== -1;
        });
        return filtered
      }
      if(_self.showAlpha==''){
        return data;
      }
      return data.filter(_d=>_d.name.charAt(0)==_self.showAlpha);
    }
  },
  methods:{
    close(){
      this.toggleModel(false);
    },
    redirect(item){
      this.$store.commit('setSelectedPayment',item)
      if(!this.stateChange){
        this.$router.push({ path: '/p2p/payment/add-method'});
      }
      else this.close()

    }
  }



}
</script>

<style>

</style>
