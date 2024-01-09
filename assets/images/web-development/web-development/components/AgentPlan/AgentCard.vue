<template>
    <div class="agent-card my-3">
        <!-- <a-card :bordered="false"> -->
            <a-row :gutter="24" class="mx-0">
                <a-col :lg="6" v-for="(list, key) in affiliateEasy" :key="key">
                    <a-card class="agent-social-card py-2" :bordered="false">
                        <a-row :gutter="16" class="content-center">
                            <a-col :lg="24">
                                <a-row class="agent-new-card">
                                    <a-col class="content-center"> <div class="agent-img-circle"><img :src="list.img" /></div> </a-col>
                                    
                                    <a-col><p class="mt-4 mb-3 agent-main-title fw-5"> {{ list.title }} </p>
                                <p class="mb-3 agent-main-desc fw-4 agent-card-h">{{ list.subTitile }}</p></a-col>
                                </a-row>
                            </a-col>
                        </a-row>

                    </a-card>
                </a-col>
            </a-row>
        <!-- </a-card> -->
        <!-- <a-card :bordered="false" class="mt-3 p-24">
            <p class="agent-main-heading fw-5 mb-0">{{$t('agent_plan.ap6')}}</p>

        </a-card> -->
        <!-- <a-card :bordered="false" class="mt-3"> -->

           <!--  <div class="card__contaier">
                <a-card class="agent-social-card commission-card" :bordered="false" v-for="(list,key) in earnCommissionDetail" :key="key">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="2" class="mb-3"><p class="num-txt mb-0 fw-6">{{ list.num }}</p></a-col>
                <a-col :lg="24" class="mb-3"><p class="mb-3 agent-main-heading fw-5">{{ list.title }}</p><p class="mb-0 agent-main-desc fw-5">{{ list.desc }}</p>
                </a-col>
                <a-col>
                    <a-button v-if="list.isSubmitForm" class="primary-btn fw-5 mb-3 submit-btn aff-btn-radius"
                       >{{ $t("agentplan.agent13") }}</a-button>
                </a-col>
            </a-row>
        </a-card>
            </div> -->
        <!-- </a-card> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            affiliateEasy: [
                {
                    img: '/images/discount-shape.png',
                    title: this.$t('agent_plan.ap17'),
                    subTitile: this.$t('agentcard.subtitle1')
                },
                {
                    img: '/images/ranking.png',
                    title: this.$t('agent_plan.ap5'),
                    subTitile: this.$t('agentcard.subtitle2')
                },
                {
                    img: '/images/presention-chart.png',
                    title: this.$t('agent_plan.ap15'),
                    subTitile: this.$t('agentcard.subtitle3')
                },
                {
                    img: '/images/card.png',
                    title: this.$t('agent_plan.ap16'),
                    subTitile: this.$t('agentcard.subtitle4')
                }
            ],
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

<style></style>
