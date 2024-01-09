<style scoped lang="less">
@import "css/order-list";
</style>
<template>
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">
        <table class="hex_table">
          <thead class="hex_table_header padding br">
            <tr>
              <th class="lt">
                <div>{{ $t('tableskeys.it1') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('tableskeys.wa1') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('tableskeys.wa2') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('tableskeys.wa3') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('tableskeys.wa4') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('tableskeys.wa5') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('tableskeys.wa6') }}</div>
              </th>
             
            </tr>
          </thead>
          <tbody class="deal-tbody">
            <tr class="hex_table_body padding" v-for="(row, index) in capitalDetails" :key="index">
              <td class="lt">
                <img :src="getCurrencyIcon(row)" width="20" height="20" class="mr-2" />{{
                 global_get_uppercase(row.currencyname) }}
              </td>
              <td class="lt">
                {{ row.typename }}
              </td>
              <td class="lt">
                {{ global_get_tofixed(row.amountbefore,
              global_get_decimal(row.currencyname).a) }}
              </td>
              <td class="lt">
                {{ global_get_tofixed(row.amount,
              global_get_decimal(row.currencyname).a) }}
              </td>
              <td class="rt" >
               {{ global_get_tofixed(row.amountafter,
              global_get_decimal(row.currencyname).a) }}
              </td>

              <td class="rt">
                {{ row.id }}
              </td>
              <td class="rt" >
                <span class="last-create-time">{{ getRecordTime(row) }}</span> 
              </td>
            </tr>
          </tbody>
        </table>

        <div class="anonymous" v-if="loading || !found">
          <div class="loadingPic deal" v-hex-loading="loading" v-if="loading"></div>
          <template v-if="!found">
            <div v-if="$userinfo.uid">
              <AppNoData />
            </div>
            <div v-else class="islogin">
              <nuxt-link to="/login">{{ $t('home.headLogin') }}</nuxt-link>
              /
              <nuxt-link to="/register"> {{ $t('home.headRegister') }}</nuxt-link>
            </div>
          </template>
        </div>
      </div>
      <div class="mr-3"
        :class="$store.state.hex_client_background.active == 'night' ? 'deal-paging-source' : 'text-right'"
        v-if="total>0">
        <a-pagination background @change="handChange" :page-size="serachOrder.pagesize" :current="serachOrder.pageindex"
          popper-class="paging" layout="prev, pager, next" :total="total">
        </a-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import AppNoData from '../App/AppNoData.vue';
import AppPagination from '../AppPagination.vue';
export default {
  name: "OrderListEntrust",
  components: { AppPagination, AppNoData },
  data() {
    return {
      capitalDetails:[],
      loading: true,
      found: true,
      serachOrder: {
        pageindex: 1,
        pagesize: 10,
        type:0
      },
      total:0,
    };
  },
  mounted() {
    this.getcapitalDetails(false, 1);
  },
  methods: {
    // my functionality
    getcapitalDetails() {
      if (!this.$userinfo.uid) {
        this.$nextTick(() => {
          this.total = 0;
          this.loading = false;
          this.found = false;
        });
        return;
      }
      this.capitalDetails = [];
      this.loading = true;
      this.$store.dispatch('user_assets_record_getlist', this.serachOrder).then(({ data }) => {
        if (data) {
          console.log(data,"data")
          this.capitalDetails = data.pagedata;
          this.total = data.totalitemcount;
          this.found = true;
        } else {
          this.found = false;
          this.total = 0;
          this.capitalDetails = [];
        }
        this.loading = false;
      })
    },
     getCurrencyIcon(item) {
      const icon = this.$store.state.currencyinfos.filter(_i => _i.currencyname == item.currencyname)[0].icon;
      return icon;
    },
    getRecordTime: function (coinitem) {
      return (coinitem.updatetime && coinitem.status == 1) ? this.global_get_local_time(coinitem.updatetime).format('YYYY-MM-DD hh:mm a') : this.global_get_local_time(coinitem.createtime).format('YYYY-MM-DD hh:mm a')
    },
    handChange(val) {
      this.serachOrder.pageindex = val;
      this.getcapitalDetails();
    },
  },

}
</script>
