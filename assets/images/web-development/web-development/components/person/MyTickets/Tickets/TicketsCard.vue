<template>
  <div class="tickets">
    <a-row :gutter="16" class="pt-3">
      <a-col v-for="(list, key) in getTicketsList" :key="key" :lg="8">
        <a-card class="tickets-card" :bordered="false">
          <p class="count-tickets fw-7 mb-0">{{ list.title }}</p>
          <span class="tickets-desc fw-5">{{ list.desc }}</span>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        getTicketsList: [
                    {
                        title:'2' ,
                        desc: this.$t('description.des15'),
                    },
                    {
                        title:'6' ,
                        desc: this.$t('description.des16'),
                    },
                    {
                        title:'1' ,
                        desc: this.$t('description.des17'),
                    },
                ]
    }
  },

}
</script>

<style></style>
