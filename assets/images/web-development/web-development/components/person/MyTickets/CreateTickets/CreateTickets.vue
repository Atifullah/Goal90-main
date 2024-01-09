<template>
  <div class="create-tickets">


    <a-card class="create-ticket-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :lg="24">
          <p class="mb-0 ticket-txt fw-5 col-alignment"><img src="/images/arrow-left.svg"
              class="mr-3 pointer" @click="goback" />{{ edit ? 'Edit' : 'Create' }}{{ $t('person.pi13') }}</p>

        </a-col>
      </a-row>
    </a-card>

   
    <a-card class="create-tabs mt-3" :bordered="false">


      <!-- <a-tabs default-active-key="1" @change="callback" v-model="activeTab" class="">
        <a-tab-pane key="1" :tab="$t('home_page.hp2')"></a-tab-pane>
        <a-tab-pane key="2" :tab="$t('person.Withdraw_person')"></a-tab-pane>
        <a-tab-pane key="3" :tab="$t('btntxt.bt6')"></a-tab-pane>
        <a-tab-pane key="4" :tab="$t('lv4form.lvf1')">
        </a-tab-pane>
        <a-tab-pane key="5" :tab="$t('btntxt.bt7')">
        </a-tab-pane>
        <a-tab-pane key="6" :tab="$t('stratergybot.sb13')">
        </a-tab-pane>
        <a-tab-pane key="7" :tab="$t('lv4form.lvf7')"> </a-tab-pane>
      </a-tabs> -->
      <TicketForm :tab="activeTab" :row="row" :edit="edit" />
    </a-card>
  </div>
</template>

<script>
import TicketForm from './TicketForm.vue';
import TicketsCard from '@/components/person/MyTickets/Tickets/TicketsCard.vue'
export default {
  components: {
    TicketForm,
    TicketsCard
  },
  props: {
    edit: {
      type: Boolean
    },
    row: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      activeTab: 1,
      options: [
        { value: 1, label: 'home_page.hp2' },
        { value: 2, label: 'person.Withdraw_person' },
        { value: 3, label: 'btntxt.bt6' },
        { value: 4, label: 'lv4form.lvf1' },
        { value: 5, label: 'btntxt.bt7' },
        { value: 6, label: 'stratergybot.sb13' },
        { value: 7, label: 'lv4form.lvf7' },
      ]
    }
  },
  methods: {
    callback(key) {

    },
    goback() {
      this.$router.go(-1);
    },
    getIndex(typename) {
      switch (typename) {
        case 'Deposit':
          return '1'
        case 'Withdraw':
          return '2'
        case 'Redeem':
          return '3'
        case 'P2P Trading':
          return '4'
        case 'Spot/Margin':
          return '5'
        case 'Strategy Bot':
          return '6'
        case 'Others':
          return '7'
      }
    }
  },
  mounted() {
    //console.log('this.row', this.row);
    if (this.row) {
      this.activeTab = this.getIndex(this.row.typename);
    }
    const query = this.$route.query

    if (query.tab == 'others') {
      //console.log('CreateTicket component query: ', query);
      this.activeTab = this.getIndex('Others')
    }


  }
}
</script>

<style></style>
