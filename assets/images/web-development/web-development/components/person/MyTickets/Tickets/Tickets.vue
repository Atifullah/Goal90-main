<template>
  <div class="my-tickets">
    <a-card class="" :bordered="false">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="12"><p class="mb-0 ticket-txt fw-5">{{$t('person.Ticket_list_person')}}</p></a-col>
            <a-col :lg="12" align="end">
                <nuxt-link to="/person/my-tickets/create-ticket">
            <a-button class="outline-btn fw-5 ml-3"><a-icon type="plus" /> {{$t('person.create_ticket_person')}}</a-button></nuxt-link
          >
            </a-col>
      </a-row>
    </a-card>
    <a-row>
      <TicketsTabs />
    </a-row>
  </div>
</template>

<script>
import TicketsTabs from './TicketsTabs';
export default {
  components:{
    TicketsTabs
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/my-tickets.scss';
</style>
