<template>
    <div>
  <a-select v-if="showSearch" style="width: 100%" :open="open"  :placeholder="$t('placeholders.plh61')"  v-on:select="setOpen(false)" @dropdownVisibleChange="onOpen" v-model="selectVal"  @change="changeVal">
    <a-icon v-if="open" slot="suffixIcon" type="up" />
    <a-icon v-else slot="suffixIcon" type="down" v-on:click="setOpen(true)"/>
    <div slot="dropdownRender" slot-scope="menu">                     
      <div
        style="padding: 4px 8px; cursor: pointer;"
      >
        <a-input v-if="open" :placeholder="$t('placeholders.plh5')" ref="search" v-on:blur="setOpen(false)" v-model="searchValue" class="all-input-search"/>
      </div>
      <a-divider style="margin: 4px 0;" />
      <v-nodes :vnodes="menu" />
    </div>
    <a-select-option v-for="(item,index) in getCurrencyList" :key="index" v-if="filterOptions(item.value.toLowerCase())">
      <img v-if="item.icon" :src="item.icon" width="auto" height="15" class="mr-2"/><span class="mr-2" v-if="item.color" style="height:100%;" :style="{background:`${item.color}`}">&nbsp;</span>{{global_get_uppercase(item.value?(item.tcurrencyname ==
              "YX"?item.fcurrencyname+$t('contract.swap'):item.value):item.currencyname)}}
    </a-select-option>
  </a-select>
  <a-select v-else :placeholder="$t('placeholders.plh61')" style="width:100%;" v-model="selectVal"  @change="changeVal"  >
      <a-select-option v-for="(item,index) in getCurrencyList" :key="index" >
        <img v-if="item.icon" :src="item.icon" width="auto" height="15" class="mr-2"/><span class="mr-2" v-if="item.color" style="height:100%;" :style="{background:`${item.color}`}">&nbsp;</span>{{global_get_uppercase(item.value?(item.tcurrencyname ==
              "YX"?item.fcurrencyname+$t('contract.swap'):item.value):item.currencyname)}}
      </a-select-option>
  </a-select>
</div>
</template>
<script>
export default {
  name: 'deal_select',
  components: {
    VNodes: {
        functional: true,
        render: (h, ctx) => ctx.props.vnodes,
    },
  },
  props: ["order", 'market', 'type', 'frenchcurrency', 'margin', 'label', 'showSearch'],
  // frenchcurrency 用于判断获取币种or交易对
  data() {
    return {
      lang: this.$store.state.hex_lang.locale,
      getCurrencyList: [],
      ulShow: false, //下拉状态
      selectVal: '', //模拟select获取到option的值
      searchCoin: '', //搜索币种的input
      statusa: false, //没有搜到显示‘暂无改币种’的状态
      stockpile: '',
      active: '',
      inputStyle: false,
      typestate: '',
      changeStype: false,
      open:false,
      searchValue:'',
    }
  },
  watch: {
    '$store.state.hex_lang.locale': function (val) {
      this.lang = val;
      this.inputStyle = false;
      this.statueShow();
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      if (this.ulShow) {
        this.ulShow = false
      }
    })
    this.statueShow();
  },
  methods: {
    onOpen(){
      this.open=true
      if(this.open==true){
        setTimeout(()=>{
          this.$refs.search?.focus()
        }, 100);
        
      }
    },
    setOpen(bool) {
      if(this.open==bool){
        return
      }
      if(!bool){
        setTimeout(()=>{
          this.open=bool
          this.searchValue='';
        }, 100);
      }
      else{
        this.open = bool;
      }  
    },
    filterOptions(str) {
      const _self=this;
      if(_self.searchValue!==''){ 
          return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)              
      }
      return true    
    },
    statueShow() {
      this.getCurrencyList = this.order;
      this.typestate = this.market;
      switch (this.typestate) {
        case 'c2ccurrecy':
          var _self = this;
          this.selectVal=_self.market;
          this.$store.dispatch('frenchcurrency_get_c2c', {}).then(({ data }) => {
            if (data) {
              this.$store.state.currencyinfos.forEach(item => {
                if (data.filter(citem => { return citem == item.currencyname }).length > 0) {
                  item.type='currencyid';
                  _self.getCurrencyList.push(item);
                }
              });
            }
          })
          break;
        case 'Select'://订单类型
          this.selectVal = this.type;
          break; 
        case 'symble'://市场交易对
          this.getSymbols();
          this.selectVal = this.$t('memberCenter.market');
          break;
        case 'ordertype'://订单类型
          this.selectVal = this.$t('memberCenter.type');
          break;
        case 'direction'://交易方向
          this.selectVal = this.$t('memberCenter.direction');
          break;
        case 'orderstatus'://订单状态
          this.selectVal = this.$t('memberCenter.statue');
          break;
        case 'cycleend'://理财周期
          this.selectVal = this.$t('manage.cycle');
          break;
        case 'status'://理财状态
          this.selectVal = this.$t('legalDeal.Status');
          break;
        case 'alltypes'://理财状态
          this.selectVal = this.$t('manage.all');
          break;
        case 'financial'://理财币种
          this.getfinancial();
          this.selectVal = this.$t('legalTrad.Currencies');
          break;
      }
    },
    getfinancial() {
      this.$store.state.currencyinfos.forEach(item => {
        if (item.isfinancing) {
          this.getCurrencyList.push(item);
        }
      });
    },
    clearStatus() {
      this.selectVal = this.type;
      this.ulShow = false;
      this.inputStyle = false;
      this.$emit('clearCurrentState', this.market);
    },
    changeBack() {
      this.ulShow = false;
    },
    changeVal(val) {//选中给select赋值
      const value=this.getCurrencyList[val]; 
      this.ulShow = false;
      this.searchCoin = '';
      this.inputStyle = true;
      this.changeStype = false;
      if (this.market == "symble") {
        value.type = 'symble'
      }
      if (this.market == "financial") {
        value.type = 'financial'
      }
      this.$emit('searchData', value)
    },
    getSymbols() {//获取所有交易对
      const symbleobjs = this.$store.state.symbleinfos;
      if (this.margin == "contract") {
        symbleobjs.map((item) => {
          if (item.itype == 1) {
            item.value = item.descriptions;
            this.getCurrencyList.push(item);
          }
        });
      } else {
        symbleobjs.map((item) => {
          if (item.itype == 0) {
            item.value = item.descriptions;
            this.getCurrencyList.push(item);
          }
        });
      }
    },
    showdown() {
      this.ulShow = !this.ulShow;
      if (this.ulShow) {
        this.$emit("change", this.typestate);
      }
    },
    search(val) {
      if (val) {
        var searchStr = this.searchCoin.replace(/ /g, '').toUpperCase();
        let searchCurrency = [];
        this.stockpile.forEach((item) => {
          if ((item.fullname).indexOf(searchStr) != -1) {
            searchCurrency.push(item)
          }
        });
        if (searchCurrency != '') {
          this.getCurrencyList = searchCurrency;
          this.statusa = false;

        } else {
          this.statusa = true;
        }
      } else {
        this.statusa = false;
        this.getCurrencyList = this.stockpile;
      }
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[1].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  }
}
</script>
<style lang='less' scoped>
.bar-scroll {
  max-height: 300px !important;
}
input.all-input-search.ant-input {
    height: 32px !important;
    border-radius: 4px !important;
}
.baseselect {
  position: relative;

  .searchBox {
    .ipt_hover {
      width: 100%;
      line-height: 30px;
      height: 32px;
      padding: 0 25px 0 10px;
      border: 1px solid rgba(221, 221, 221, 1);
      color: rgb(187, 187, 187);
      position: relative;
    }

    .ipt_hover:after {
      content: '';
      display: inline-block;
      width: 7px;
      height: 6px;
      background-image: url('./../../static/images/an_select_down.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .ipt_hover.cl_333 {
      color: #333;
    }

    .ipt_hover.cl_66 {
      color: #aea9a9;
    }

    .ipt_hover:hover {
      border: 1px solid #8583ac;
    }

    .hovers {
      border: 1px solid #8583ac;
    }

    .hovers.ipt_hover:after {
      background-image: url('../../static/images/an_select_up.png')
    }
  }

  .skill {
    position: absolute;
    width: 99%;
    background: white;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, .2);
    z-index: 1;
    left: 0.5%;

    .skill-ipt {
      padding: 0 10px;
      box-sizing: border-box;

      input {
        height: 40px;
        display: block;
        border: none;
        border-bottom: 1px solid rgba(216, 216, 216, 1);
        width: 100%;
        font-size: 14px;
      }
    }

    ul {

      li {
        line-height: 32px;
        font-size: 14px;
        color: rgb(51, 51, 51);
        padding: 0 10px;

      }

      li:first-child {
        margin-top: 5px;
      }

      li.clearStatue {
        line-height: 26px;
        background: rgba(240, 239, 247, 1);
        font-size: 12px;
        color: rgba(131, 140, 172, 1);
        text-align: center;
      }

      li:hover,
      li.cur {
        background: rgba(240, 239, 247, 1);
      }

    }

    ul::-webkit-scrollbar {
      width: 8px;
      height: 1px;
    }

    ul::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(144, 147, 153, .3);
    }

    ul::-webkit-scrollbar-track {
      border-radius: 5px;
    }
  }
}
</style>
