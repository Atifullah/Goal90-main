<template>
  <div class="steps">
    <div class="pt-4">
      <a-steps :current="1" label-placement="vertical">
        <a-step
          v-for="item in activities"
          :key="item.content"
          :title="item.content"
          :description="item.timestamp"
        />
      </a-steps>

      <div class="steps-content">
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props:{
    activities:{
      type: Array
    }
  },
  data() {
    return {
      steps: [
        {
          title: this.$t('index.sub1'),
          desc: '2022-09-09',
        },
        {
          title: this.$t('index.sub2'),
          desc: '2022-09-09',
        },
        {
          title: this.$t('index.sub3'),
          desc: '2022-09-09',
        },
      ],
    }
  },
}
</script>

<style></style>
