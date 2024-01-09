<template>
  <div class="crypto-table mt-3">
    <a-table
            :columns="sendCryptocolumns"
            :pagination="false"
            :data-source="sendCryptodata"
            :rowKey="(record,index ) => index"
            :loading="loading"
          >
          <div slot="createtime" slot-scope="text,row">
            {{global_get_local_time(row.createtime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <div slot="withdrawstatus" slot-scope="text,row">
            <span :class="row.status==1?'success-active':'red-active'">{{global_get_mention_state(row.status)}}</span>
          </div>
          <div slot="depositstatus" slot-scope="text,row">
            <span :class="row.status==1?'success-active':'red-active'">{{global_get_charge_state(row.status)}}</span>
          </div>
          <span slot="action" slot-scope="text,row" class="detail-txt pointer" @click="openModel(row)">
            <span>{{$t('texts.txt42')}}</span>
          </span>
          <span slot="commonaction" slot-scope="text,row" class="detail-txt pointer" @click="send(row)">
            <span>{{$t('person.Send_person')}}</span>
          </span>
    </a-table>
    <DetailModal v-if="sendDetailModal" :row="row" :sendDetailModal="sendDetailModal" :type="type" :close="close"/>

  </div>
</template>

<script>
import DetailModal from './Modal/DetailModal.vue'

export default {
    components: {
        DetailModal,
    },
    props: {
      sendCryptocolumns: {
        type: Array,
        default: null,
      },
      sendCryptodata: {
        type: Array,
        default: null,
      },
      loading:{
        type:Boolean
      },
      type:{
        type:String,
      },
      send:{
        type: Function
      }
    },
data() {
    return {
        row:{},
        sendDetailModal: false,
    }
},
methods: {
    openModel(row){
      this.sendDetailModal=true;
      this.row=row;
    },
    close() {
        this.sendDetailModal=false;
    }
  }
}
</script>

<style>

</style>
