<template>
  <div class="athentication-card pt-4">
    <a-card class="info-card text-center" :bordered="false">
      <a-row :gutter="24" class="py-4">
        <a-col :lg="24">
          <p class="info-heading fw-5 mb-2" :class="{'active-heading':active}">{{ authenticationData.title }}</p>
          <p class="info-desc fw-4 mb-0">{{ authenticationData.desc }}</p>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    authenticationData: {
      type: Object,
      default: () => {},
    },
    active:{
      type:Boolean
    }
  },
}
</script>

<style></style>
