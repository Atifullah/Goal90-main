<template>
     <div class="card__contaier my-3">
                <a-card class="agent-social-card commission-card" :bordered="false" v-for="(list,key) in earnCommissionDetail" :key="key">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="2" class="mb-3"><p class="num-txt mb-0 fw-6">{{ list.num }}</p></a-col>
                <a-col :lg="24" class="mb-3"><p class="mb-3 agent-main-heading fw-5">{{ list.title }}</p><p class="mb-0 agent-main-desc fw-5">{{ list.desc }}</p>
                </a-col>
                <a-col>
                    <nuxt-link to="/person/authentication"><a-button v-if="list.isSubmitForm" class="primary-btn fw-5 mb-3 submit-btn aff-btn-radius"
                       >{{ $t("agentplan.agent13") }}</a-button></nuxt-link>
                    
                </a-col>
            </a-row>
        </a-card>
            </div>
</template>

<script>
export default {
    data() {
        return {
            earnCommissionDetail: [
            {
                    num: '01',
                    title: this.$t('agent_plan.ap9'),
                    desc: this.$t('agent_plan.ap10'),
                    isSubmitForm:true
                },
                {
                    num: '02',
                    title: this.$t('agent_plan.ap11'),
                    desc: this.$t('agent_plan.ap12'),
                    isSubmitForm:false
                },
                {
                    num: '03',
                    title: this.$t('agent_plan.ap13'),
                    desc: this.$t('agent_plan.ap14'),
                    isSubmitForm:false
                },
            ]
        }
    }
}
</script>