<template>
  <div id="agent-plan">
        <AgentPlan />
  </div>
</template>

<script>
import AgentPlan from '@/components/AgentPlan/AgentPlan.vue'
export default {
components: {
    AgentPlan,
}
}
</script>

<style lang="scss">
    @import '@/assets/scss/pages/agent-plan/agent-plan.scss';
</style>
