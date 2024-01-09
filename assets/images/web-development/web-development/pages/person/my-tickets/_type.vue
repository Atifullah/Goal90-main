<template>
  <div id="my-tickets">
    <template v-if="type == 'edit-ticket'">
      <AppLoading  backgroundColor="transparent" v-if="loading"/>
      <CreateTickets :edit="true" :row="row" v-else/>
    </template>
    <template v-else-if="type == 'create-ticket'">
      <CreateTickets />
    </template>
  </div>
</template>
  
<script>
import CreateTickets from "@/components/person/MyTickets/CreateTickets/CreateTickets"
import AppLoading from "~/components/AppLoading.vue"


export default {
  components: {
    CreateTickets,
    AppLoading
},
  data() {
    return {
      type: this.$route.params.type,
      row: {},
      loading:true
    }
  },
  methods: {
    async getData() {
      if (this.type == "edit-ticket") {
        console.log("hello")
        console.log(this.$route.query)
        if (this.$route.query.id) {
          const { data } = await this.$store.dispatch('get_work_order_get', { id: this.$route.query.id })
          this.row=data.pagedata[0].infos[0]
          this.loading=false;
        }
      }
    }
  },
  async mounted() {
this.getData()



  }
}
</script>
  
<style></style>
  