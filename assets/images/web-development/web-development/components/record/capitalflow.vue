<template>
  <div class="traded">
    <div class="traded-block">
      <div class="left search-market  clearfix">
        <div class="traded-block-search">
          <hex-select ref="capitaltypes"
                      :type="$i18n.t('leverage.zj_capitalflow')"
                      :order="capitaltypes"
                      :market="capitaltypetext"
                      @searchData="searchData"
                      @change="change"
                      @clearCurrentState="clearCurrentState"/>
        </div>
        <div class="traded-block-search">
          <hex-select ref="currencyDetails"
                      :type="$i18n.t('Waddress.selectCion')"
                      :order="currencyDetails"
                      :market="currencyid"
                      @searchData="searchData"
                      @change="change"
                      @clearCurrentState="clearCurrentState"/>
        </div>
        <span class="traded-block-search_button" @click="getcapitalDetails(false,1)">{{$t('wallet.inquire')}}</span>
        <span class="traded-block-reset_button" @click="resetSelect">{{$t('memberCenter.reset')}}</span> 
      </div>
        <table class="hex_table abc">
            <thead class="hex_table_header padding br">
                <tr>
                    <th class="lt" style="width:180px">
                        <div>{{$t('leverage.flow')}}</div>
                    </th>
                    <th class="lt">
                        <div>{{$t('leverage.Currency')}}</div>
                    </th>
                    <th class="rt" style="width:260px">
                        <div>{{$t('leverage.Tradetype')}}</div>
                    </th>
                    <th class="rt">
                        <div>{{$t('leverage.totalAssetsBeforeTheChange')}}</div>
                    </th>
                    <th class="rt">
                        <div>{{$t("leverage.thisNumberOfTimes")}}</div>
                    </th>
                    <th class="rt">
                        <div>{{$t('leverage.totalAssetsAfterTheChange')}}</div>
                    </th>
                    <th class="rt">
                        <div>{{$t('leverage.CreateTime')}}</div>
                    </th>
                </tr>
            </thead>
            <tbody class="deal-tbody"> 
                <tr class="hex_table_body padding"
                    v-for="(coins,index) in capitalDetails"
                    :key="index">
                    <td class="lt">
                    {{coins.id}}
                    </td>
                    <td class="lt">
                    {{global_get_uppercase(coins.currencyname)}}
                    </td>
                    <td class="rt">
                    {{coins.typename}}
                    </td>
                    <td class="rt">
                    {{global_get_tofixed(coins.amountbefore, global_get_decimal(coins.currencyname).a)}}
                    </td>
                    <td class="rt">
                    {{global_get_tofixed(coins.amount, global_get_decimal(coins.currencyname).a)}}
                    </td>
                    <td class="rt">
                    {{global_get_tofixed(coins.amountafter, global_get_decimal(coins.currencyname).a)}}
                    </td>
                    <td class="rt">
                    {{getRecordTime(coins)}}
                    </td> 
                </tr> 
            </tbody>
        </table>
        <div class="anonymous" v-if="total==0 && loading==false">
           <div class="anonymous-pic">
              <img src="~/static/images/anonymous.svg" alt="">
           </div>
           <nuxt-link tag="p" to="/deal/btc_usdt" class="anonymous-tip">
              {{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>
           </nuxt-link>
        </div>
    </div>
    <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div> 
    <div class="paging-source" v-if="total>0">
    <a-pagination
        background
        @current-change="handChange"
        :page-size="serachOrder.pagesize"
        :current-page.sync="serachOrder.pageindex"
        popper-class="paging"
        layout="prev, pager, next"
        :total="total">
      </a-pagination>
    </div>
  </div>
</template>

<script> 
  import select from '@/components/security/deal_select' 
  export default {
    name: 'capitalflow', 
    components: { 
      "hex-select": select
    },
    computed: { 
      capitaltypes: function () {
         return [
           {
              id: 0,
              value: this.$t('leverage.zj_capitalflow'),//资产流水
              type: 'type'
           },
            {//类型
              id: -1,//状态
              value: this.$t('leverage.margin_capitalflow'),//杠杆流水
              type: 'type'
            }, {
              id: -2,
              value: this.$t('leverage.contract_capitalflow'),//合约流水
              type: 'type'
            }, {
              id: -3,
              value: this.$t('leverage.contract_P2P'),//P2P流水
              type: 'type'
            }]
      }
    },
    data() {
      return {
        loading:true, 
        total: 0, 
        serachOrder: {
          pagesize: 20,
          pageindex: 1
        },
        searchParam: {},
        currencyid: this.$t('formMenu.select'),
        capitaltypetext: this.$t('leverage.zj_capitalflow'),  
        capitalDetails: [],
        currencyDetails:[],
        market: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
      }
    },
    mounted() {
      this.getcapitalDetails(true,1);
      this.getallcoininfos();
    },
    methods: {
      handChange(val) {
        this.getcapitalDetails(false, val);
      },
      getRecordTime: function (coins) {
        return (coins.createtime) ? this.global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss') : '--'
      },
      change(val) {
        const _self = this;
        switch (val) { 
          case 'capitaltypes':
            _self.$refs.capitaltypes.changeBack(); 
            break; 
          case 'currencyDetails':
            _self.$refs.currencyDetails.changeBack(); 
            break;
        }
      },  
      clearCurrentState(id) {
        this.searchParam[id] = {};
      },
      resetSelect() { 
        this.$refs.capitaltypes.clearStatus(); 
        this.$refs.currencyDetails.clearStatus(); 
        this.searchParam = {};
      },
      searchData(val) {//用于存子组件传过来数据
        this.searchParam[val.type] = val.id;
      }, 
      getallcoininfos(){ 
        this.$store.state.currencyinfos.forEach(item=>{
                  this.currencyDetails.push({
                       id: item.id, 
                       value: item.currencyname, 
                       type: 'currencyid'
                  });
              });  
      },
      // 过去用户交易记录
      getcapitalDetails(val, pageIndex) {  
          this.capitalDetails =[];
          this.total = 0;
          this.loading=true; 
          var postData = Object.assign(this.searchParam, this.page, {uid: this.$userinfo.uid, key: this.$userinfo.secretkey,pagesize:15}); 
          pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1; 
          this.$store.dispatch('user_assets_record_getlist', postData).then(({data}) => {
            if (data) {
              this.capitalDetails = data.pagedata;
              this.total = data.totalitemcount; 
            } else { 
              this.total = 0;
              this.capitalDetails = [];
            }
            this.loading = false;
          })
      }
    }
  }
</script>
<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/person";
@import "../../static/styles/table";
  .traded_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }

  .traded_info {
    font-size: 14px;
  }

  .traded_info .btc {
    color: #00C076;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }

  .traded_info .cny {
    color: #ffb11a;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }

  .traded_info .br {
    margin: 0 20px;
    border-right: 1px solid @cl_858;
    display: inline-block;
    height: 20px;
  }

  .traded_info_title {
  }
  .tooltip-icon {
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: sub;
      background-repeat: no-repeat;
      background-size: 14px 14px;
      background-position: center;
      background-image: url("../../static/images/tip-active.svg");
      cursor: pointer;
    }
  .tooltip-icon:hover {
    background-image: url("../../static/images/tip-active.svg");
  }
  .traded_info_num {
    padding: 4px 0;
  }

  .traded_info_address_button {
    color: #ffb11a;
    margin-top: 16px;
  }

  .traded-block {
    margin-top: 10px;
    background-color: #ffffff;
  }

  .traded-block-title {
    padding: 18px 20px 8px 20px;
  }

  .traded-block-title .title_tip {
    font-size: 16px;
    font-weight: bold;
  }

  .traded-block-search {
    margin-right: 10px;
    font-size: 14px;
    min-width: 130px;
    display: inline-table;
    border-collapse: separate;
  }

  .traded-block-search input {
    height: 30px;
    line-height: 30px;
    border: 1px solid #DDDDDD;
    display: table-cell;
    width: 100%;
    padding: 5px 10px;
  }

  .traded-block-search .search-tip {
    display: table-cell;
    width: 60px;
    background-color: #ffb11a;
    color: #ffffff;
    border: 1px solid #ffb11a;
    text-align: center;
  }

  .traded-block-search .search-tip::placeholder {
    color: @cl_bbb;
  }

  .traded-block-search_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    background-color: #ffb11a;
    font-size: 14px;
    width: 60px;
    cursor: pointer;
  }

  .traded-block-reset_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffb11a;
    font-size: 14px;
    width: 60px;
    margin-left: 10px;
    cursor: pointer;

  }

  .traded .person-block_info {
    line-height: 36px;
  }

  .person-block {
    padding: 18px 20px 16px 20px;
  }

  .traded-block .search-market {
    margin: 14px 0 10px 20px;
  }

  .ordertab {
    padding: 10px 20px;
  }

  .ordertab span {
    font-size: 14px;
    padding-bottom: 3px;

  }

  .ordertab span.entrust {
    margin-right: 20px;
  }

  .ordertab span.cur {
    color: #14a2a5;
    border-bottom: 2px solid #14a2a5;
  }

  .hex_table .rt {
    text-align: right;
  }

  .hex_table_body td {
    padding: 0 7px;
    line-height: 20px;
    min-width: 40px;
  }

  .hex_table_body td:first-child{
    width: 100px;
    word-break: break-word;
    line-height: 20px;
  }

  .hex_table_header th {
    padding: 0 7px;
  }

  .rt.orderstatus {
    width: 82px;
    line-height: 22px;
  }

  .hex_table_body.padding td.rt.orderstatus {
    padding-right: 15px !important;
  }

  .hex_table_body.padding td, .hex_table_header.padding th {
    padding: 10px 2px;
  }
</style>