<template>
  <div class="chat-header">
    <a-row :gutter="16" class="col-alignment">
      <a-col :lg="4">
        <p class="mb-0"><span class="photo mr-3" :class="{ 'online': orderdata.online == 1 }"
            :style="{ 'background-color': `${color}` }">
            {{ getname }}
          </span></p>
      </a-col>
      <a-col :lg="20">
        <p class="mb-0 header-txt fw-5">
          <span class="pointer" @click="goCounterParty(orderdata)">{{ orderdata.nikename }}</span>
        </p>
        <p class="mb-0 view-all-txt fw-5 success-active" >{{counterParty?.merchantfrozen > 0?'Verified Merchant':'Verified User'}}</p>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="pt-4">
      <a-col :lg="4"></a-col>
      <a-col :lg="20">
        <a-row :gutter="16">
          <a-col :lg="10">
            <p class="trades-d fw-7 mb-0">{{$t('adsharing.as19')}}</p>
            <p class="trades-numd fw-5">{{ counterParty?.trades_thirtydays }} {{ counterParty?.trades_thirtydays > 1 ? 'Times'
              : 'Time' }}</p>
          </a-col>
          <a-col :lg="14" class="p-0">
            <p class="trades-d fw-7 mb-0">{{$t('adsharing.as20')}}</p>
            <p class="trades-numd fw-5">{{ counterParty?.completionrate_thirtydays }}%</p>
          </a-col>

        </a-row>
      </a-col>
    </a-row>
  </div>
</template> 
<script>
export default {
  props: {
    orderdata: {
      type: Object,
    },
    color: {
      type: String
    }
  },
  computed: {
    getname() {
      return this.orderdata.nikename ? this.orderdata.nikename.substring(0, 1) : '--'
    },
    getCounterPartyID() {
      return this.orderdata.orderuserid == this.$userinfo.uid ? this.orderdata.userid : this.orderdata.orderuserid
    }
  },
  data() {
    return {
      counterParty: null
    }
  },
  methods: {
    async getCounterPartyInfo() {
      const _self = this;
      try {
        const { data } = await _self.$store.dispatch('trading_statistics_p2p', {
            toUid: this.getCounterPartyID,
            advid:this.orderdata.orderid
        });
        _self.counterParty = data;
      } catch (error) {
        //console.log('Error', error);
      }
    },
    goCounterParty(item) {
      var userid=item.userid==this.$userinfo.uid?item.orderuserid:item.userid
      this.$router.push({
        path: '/p2p/counter-party', query: {
          userid: userid,
          advid: item.orderid
        }
      })
    },
  },
  mounted() {
    this.getCounterPartyInfo();
  }
}
</script>

<style lang="scss" scoped>
.photo {
  display: inline-block;
  border-radius: 200px;
  text-align: center;
  width: 36px;
  height: 36px;
  line-height: 36px;
  vertical-align: middle;
  margin-right: 10px;
  color: #ffffff;
  position: relative;
}

.photo:after {
  content: '';
  display: inline-block;
  width: 8px;
  position: absolute;
  height: 8px;
  border-radius: 50%;
  background-color: #DDDDDD;
  background-clip: content-box;
  border: 2px solid #ffffff;
  bottom: 0;
  right: 0;
}

.photo.online:after {
  background-color: #0ED12A;
}</style>
