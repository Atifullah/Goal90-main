<template>
  <div class="bg-white">
    <div class="agent-plan-header">
      <div class="main-content">
        <a-row :gutter="16" class="content-center">
          <a-col :lg="16" :xl="15" class="agent-plan-content">
            <p class="agent-plan-heading fw-5 mb-2">
              {{ $t("agentplan.agent3") }}
            </p>

            <p class="agent-plan-desc fw-4">{{ $t("agent_plan.ap_mon") }}</p>

            <a-button
              class="primary-btn fw-5 px-4 affiliate-btn aff-btn-radius"
              @click="openAgentModel"
              ><!-- {{ $t('agent_plan.ap_join_aff') }} -->
              {{ $t("agentplan.agent14") }}</a-button
            >
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="main-content py-4">
      <a-row :gutter="16" class="affiliate-commission-container pt-5">
        <a-col class="affiliate-commission">
          
            <p class="agent-main-heading fw-5 mb-0">
              {{$t('agentplan.agent1')}}
            </p>
          <a-card :bordered="false" class="affiliate-commission-card mt-3">
            <a-row class="py-4">
              <a-col :lg="{ span: 16, offset: 4 }" :sm="{ offset: 1 }">
                <img src="/images/affiliate-banner.svg" width="100%" />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="16" class="my-5 mx-0 ">
        
          <p class="mb-2 agent-main-heading fw-5">
            {{ $t("agent_plan.ap_aff2") }}
          </p>
       
      </a-row>
      <a-row :gutter="16">
        <AgentCard />
      </a-row>
      <a-row :gutter="16" class="my-5 mx-0 ">
          <p class="mb-2 agent-main-heading fw-5">
            {{$t('agent_plan.ap6')}}
          </p>
        
      </a-row>
      <a-row :gutter="16">
        <AgentComissionCard />
      </a-row>
      <a-row :gutter="16" class="mt-3 join-banner">
        <a-card :bordered="false" class="all-agent-bg">
          <p class="all-agent-heading fw-5 mb-3">
            {{ $t('agentplan.agent9') }}
          </p>
          <p class="mb-3 agent-main-desc fw-4">
            {{ $t('agentplan.agent12') }}
          </p>
          <a-button
            class="primary-btn fw-5 px-4 mt-3 affiliate-btn aff-btn-radius"
            @click="openAgentModel"
            > {{ $t('agent_plan.ap_join_aff') }}!</a-button
          >
        </a-card>
      </a-row>
      <a-card :bordered="false" class="mt-3 financial-card">
        <a-row class="">
          <a-col :lg="24">
            <Faqs :channelid="14" :subtitle="'Affiliate_program_faqs'" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <ApplyAgentModal :applyAgentModel="applyAgentModel" :close="close" />
    <ApplySuccessModal :applySuccessModel="applySuccessModel" :close="close" />
  </div>
</template>

<script>
import ApplyAgentModal from "./ApplyAgentModal.vue";
import AgentCard from "./AgentCard.vue";
import AgentComissionCard from "./AgentComissionCard.vue";
import ApplySuccessModal from "./ApplySuccessModal.vue";
import Faqs from "@/components/public/Faqs.vue";

export default {
  components: {
    AgentCard,
    AgentComissionCard,
    ApplyAgentModal,
    ApplySuccessModal,
    Faqs,
  },
  data() {
    return {
      applyAgentModel: false,
      applySuccessModel: false,
    };
  },
  methods: {
    close() {
      this.applyAgentModel = false;
      this.applySuccessModel = false;
    },
    openAgentModel() {
      if (this.$userinfo.uid) {
        this.applyAgentModel = true;
      } else {
        this.$router.push("/login?returnurl=" + this.$route.path);
      }
    },
  },
};
</script>

<style></style>
