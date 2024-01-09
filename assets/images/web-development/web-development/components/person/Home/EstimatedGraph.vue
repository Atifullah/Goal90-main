<template>
  <div class="estimated-graph">
    <a-card class="graph-card main-card" :bordered="false">
      <a-row :gutter="16" class="px-4">
        <a-col :lg="10" :xl="12">
          <p class="estimated-heading text-black mb-1 fw-5"> {{$t('person.estimated_value')}} 
            <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="toggleFundVisible">
                                    <use :xlink:href="$usersettings.moreconfig?.fundsvisible  ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
          </p>
          <p class="grap-desc">
          {{$usersettings.moreconfig?.fundsvisible?global_get_tofixed(currencyData.totalassetesbtc,global_get_decimal('btc').a):'*****'}} BTC <span class="estimated-price fw-4">≈ {{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('btc', currencyData.totalassetesbtc):'*****'}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</span>
          </p>
        </a-col>
        <a-col :lg="14" :xl="12" align="end" class="pt-2">
          <a-radio-group default-value="a" button-style="solid">
            <nuxt-link to="/person/wallet"> <a-radio-button value="a">{{$t('person.Deposit_person')}}  </a-radio-button></nuxt-link>
            <nuxt-link to="/person/wallet"> <a-radio-button value="b"> {{$t('person.Withdraw_person')}} </a-radio-button></nuxt-link>
            <nuxt-link to="/person/send-recieve-crypto/receive-crypto"><a-radio-button value="c"> {{$t('person.Recieve_person')}} </a-radio-button></nuxt-link>
            <nuxt-link to="/person/send-recieve-crypto/send-crypto"><a-radio-button value="d"> {{$t('person.Send_person')}} </a-radio-button></nuxt-link>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-divider class="mt-0 mb-0 estimated-divider"/>
      <a-row :gutter="16" class="pt-2 px-4">
        <a-col :lg="14" class="pt-4">
            <a-row :gutter="16">
                <a-col :lg="8" >
                    <nuxt-link to="/person/wallet">
                    <a-row class="col-alignment">
                      <a-col :lg="24">  <p class="graph-title fw-4 mb-0">{{$t('person.Spot_person')}}</p></a-col>
                    </a-row>
                    <!--  -->
                    <a-tooltip>
                      <template slot="title">
                        {{ $usersettings.moreconfig?.fundsvisible ? global_get_tofixed($store.getters.get_btc_exchange_rate('usdt', currencyData.totalfunding), global_get_decimal('btc').a) : '*****' }} BTC
                      </template>
                        <p class="d-flex graph-num fw-5 num mb-0">
                         <span class="numeric-value">{{ $usersettings.moreconfig?.fundsvisible ? global_get_tofixed($store.getters.get_btc_exchange_rate('usdt', currencyData.totalfunding), global_get_decimal('btc').a) : '*****' }}</span>
                         <span class="unit"> BTC</span>
                        </p>
                    </a-tooltip>
              

                    <a-tooltip>
                      <template slot="title">
                        {{ $usersettings.moreconfig?.fundsvisible ? $store.getters.get_client_exchange_rate('usdt', currencyData.totalfunding) : '*****' }} {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}
                      </template>
                        <p class="d-flex graph-subtitle fw-5">≈
                        <span class="numeric-value">{{ $usersettings.moreconfig?.fundsvisible ? $store.getters.get_client_exchange_rate('usdt', currencyData.totalfunding) : '*****' }}</span>
                          <span class="unit"> {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}</span>
                        </p>
                    </a-tooltip>
                    <!--  -->
                    <!-- <p class="graph-subtitle fw-5">≈ {{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalfunding):'*****'}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</p> -->
                </nuxt-link>
                </a-col>
                <a-col :lg="8" >
                    <nuxt-link to="/person/margin">
                    <a-row class="col-alignment">
                      <a-col :lg="24">  <p class="graph-title fw-4 mb-0">{{$t('person.Margin_person')}}</p></a-col>
                    </a-row>
                    <!--  -->
                    <a-tooltip >
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalmargin)   ,global_get_decimal('btc').a) :'*****'}} BTC
                      </template>
                        <p class="d-flex graph-num fw-5 num1 mb-0">
                         <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalmargin)   ,global_get_decimal('btc').a) :'*****'}}</span>
                         <span class="unit">BTC</span>
                        </p>
                    </a-tooltip>
              

                    <a-tooltip>
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalmargin):'*****'}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}
                      </template>
                        <p class="d-flex graph-subtitle fw-5">≈
                        <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalmargin):'*****'}}</span>
                          <span class="unit">{{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</span>
                        </p>
                    </a-tooltip>
                    <!--  -->
              </nuxt-link>
                </a-col>
                <a-col :lg="8" >
                    <nuxt-link to="/person/contract">
                    <a-row class="col-alignment">
                      <a-col :lg="24">  <p class="graph-title fw-4 mb-0">{{$t('person.Future_person')}}</p></a-col>
                    </a-row>
                                      <!--  -->
                                      <a-tooltip >
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalcontract)   ,global_get_decimal('btc').a) :'*****'}} BTC
                      </template>
                        <p class="d-flex graph-num fw-5 num2 mb-0">
                         <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalcontract)   ,global_get_decimal('btc').a) :'*****'}}</span>
                         <span class="unit">BTC</span>
                        </p>
                    </a-tooltip>
              

                    <a-tooltip>
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalcontract):'*****'}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}
                      </template>
                        <p class="d-flex graph-subtitle fw-5">≈
                        <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalcontract):'*****'}}</span>
                          <span class="unit">{{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</span>
                        </p>
                    </a-tooltip>
                    <!--  --> 
               </nuxt-link>
                </a-col>
                </a-row>
                <a-row :gutter="16" class="pt-3">
                <a-col :lg="8">
                    <nuxt-link to="/person/p2p">
                    <a-row class="col-alignment">
                      <a-col :lg="24">  <p class="graph-title fw-4 mb-0">{{$t('person.p2p_person')}}</p></a-col>
                    </a-row>
                                      <!--  -->
                    <a-tooltip >
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalctwoc)   ,global_get_decimal('btc').a) :'*****'}} BTC
                      </template>
                        <p class="d-flex graph-num fw-5 num3 mb-0">
                         <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalctwoc)   ,global_get_decimal('btc').a) :'*****'}}</span>
                         <span class="unit">BTC</span>
                        </p>
                    </a-tooltip>
                    
                    <a-tooltip>
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalctwoc):'*****'}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}
                      </template>
                        <p class="d-flex graph-subtitle fw-5">≈
                        <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalctwoc):'*****'}}</span>
                          <span class="unit">{{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</span>
                        </p>
                    </a-tooltip>
                    <!--  --> 
               </nuxt-link>
                </a-col>
                <!-- moved to playcard branh -->
                <!-- <a-col :lg="8" >
                    <nuxt-link to="/play-card">
                    <a-row class="col-alignment">
                      <a-col :lg="24">  <p class="graph-title fw-5 mb-0">{{$t('person.Game_person')}}</p></a-col>
                    </a-row>
                    <p class="graph-num fw-6 num4 mb-0">{{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalgame)   ,global_get_decimal('btc').a) :'*****'}} BTC</p>
                    <p class="graph-subtitle fw-5 mb-0">≈ {{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalgame):'*****'}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</p>
                    </nuxt-link>
                </a-col> -->
                <a-col :lg="8" >
                    <nuxt-link to="/rewards-hub">
                    <a-row class="col-alignment">
                      <a-col :lg="24">  <p class="graph-title fw-4 mb-0">{{$t('person.Gifts_person')}}</p></a-col>
                    </a-row>
                                                          <!--  -->
                                                          <a-tooltip >
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalgift)   ,global_get_decimal('btc').a) :'*****'}} BTC
                      </template>
                        <p class="d-flex graph-num fw-5 num4 mb-0">
                         <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?global_get_tofixed( $store.getters.get_btc_exchange_rate('usdt', currencyData.totalgift)   ,global_get_decimal('btc').a) :'*****'}}</span>
                         <span class="unit">BTC</span>
                        </p>
                    </a-tooltip>
                    <a-tooltip>
                      <template slot="title">
                        {{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalgift):'*****'}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}
                      </template>
                        <p class="d-flex graph-subtitle fw-5">≈
                        <span class="numeric-value">{{$usersettings.moreconfig?.fundsvisible?$store.getters.get_client_exchange_rate('usdt', currencyData.totalgift):'*****'}} </span>
                          <span class="unit">{{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</span>
                        </p>
                    </a-tooltip>
                    <!--  --> 
                </nuxt-link>
                </a-col>
            </a-row>
        </a-col>
        <a-col :lg="10">
          <div id="Chart" class="piechart-curve " >
                <div id="echarts" class="echarts"></div>
          </div>
        </a-col>
    </a-row>
    </a-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    components: {
    },
    data() {
        return {
          currencyData: [],
        }
    },
  methods:{
    getAssetInfo() {
      const _self = this;
      this.loading = true;
      _self.$store.dispatch('trading_total_assets_get', {}).then(({
        data
      }) => {
        if (data) {
          this.currencyData = data;
          this.mcharts();
        }
        this.loading = false;
      })
    },
    toggleFundVisible(){
      const _self = this;
      _self.$store.dispatch('user_user_settings_save', {
        moreConfig: {
          fundsVisible: !_self.$usersettings.moreconfig.fundsvisible
        },
      }).then(({
        data
      }) => {
        if (data) {
          this.global_refresh_user_settings();
        }
      })
    },
    mcharts() {
      const _self=this;
      const myChart = echarts.init(document.getElementById('echarts'));
      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '0%',
          left: 'center',
          itemWidth: 6,
          itemHeight:6,
        },
        tooltip:{
          show:true,
          formatter: function (params) {

          return `${params.name}: ${_self.$usersettings.moreconfig?.fundsvisible?params.data.value:'*****'} (${params.percent}%)`;
        },
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: _self.currencyData.totalfunding.toFixed(2), name: this.$t('person.Spot_person') },
              { value: _self.currencyData.totalctwoc?.toFixed(2),name: this.$t('person.p2p_person') },
              { value: _self.currencyData.totalcontract.toFixed(2),name: this.$t('person.Future_person') },
              { value: _self.currencyData.totalmargin.toFixed(2),name: this.$t('person.Margin_person') },
              
            
              // { value: _self.currencyData.totalgame.toFixed(2),name: this.$t('person.Game_person') }, <!-- moved to playcard branh -->
              { value: _self.currencyData.totalgift.toFixed(2),name: this.$t('person.Gifts_person') },
            ]
          }
        ]
      };
      myChart.setOption(option)
    },
  },
  mounted(){
    this.getAssetInfo();
  }
}
</script>

<style lang="scss">
.piechart-curve {
        width: 100%;
        height: 200px;
    }
    .echarts {
    width: 100%;
    height: 100%;
}

.numeric-value {
  text-overflow: ellipsis; /* Display ellipsis for overflowed text */
  overflow: hidden;    /* Hide any overflowed text */
  max-width: 75%; /* You can adjust this width as needed */
}

.unit {
margin-left: 2px;
}

</style>


