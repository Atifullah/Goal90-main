<template>
    <div class="agent-apply-modal">
        <a-modal id="agent-apply-modal" v-model="applyAgentModel" :footer="false" :title="false" @cancel="close"
            width="450px">
            <a-form-model ref="applyForm" :model="applyForm" :rules="rules" :hide-required-mark="true" label-align="left">
                <a-row :gutter="16">
                    <a-col :lg="1"></a-col>
                    <a-col :lg="21" align="center">
                        <p class="mb-2 apply-heading fw-5">{{ metada.title }}</p>
                    </a-col>
                    <a-col :lg="2" class=""> <img src="/images/ud-cross.svg" class="pointer"
                            @click="close" />
                    </a-col>

                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="24" align="center">
                        <p class="my-3 apply-desc fw-5">{{ metada.description }} </p>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-model-item has-feedback :label="$t('labels.lbl1')" prop="firstName" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model="applyForm.firstName" :placeholder="$t('placeholders.plh1')" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-model-item has-feedback :label="$t('labels.lbl2')" prop="lastName" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model="applyForm.lastName" :placeholder="$t('placeholders.plh2')" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-form-model-item has-feedback :label="$t('labels.lbl3')" prop="emailAddress" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model="applyForm.emailAddress" :placeholder="$t('placeholders.plh3')" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-form-model-item has-feedback :label="$t('labels.lbl4')" prop="country" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model="applyForm.country" :placeholder="$t('placeholders.plh4')" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mt-3">
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <a-button class="cancel-outline-btn fw-5" block @click="close">{{ $t('agent_plan.ap8') }} </a-button>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <a-button class="primary-btn fw-5" :loading="loading" block @click="applyAgentPlan">{{
                            $t('agent_plan.ap4') }} </a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        applyAgentModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
        metada: {
            default: () => {
                return {
                    title: 'Apply as a join Agent', //{{ $t('agent_plan.ap1') }}
                    description: 'You will get a higher commission and get the chance to join us.' //{{ $t('agent_plan.ap2') }}
                }
            }
        }
    },
    data() {
        return {
            loading: false,
            applyForm: {
                firstName: '',
                lastName: '',
                emailAddress: '',
                country: ''
            },
            rules: {
                emailAddress: [
                    { required: true, message: this.$t('messages.msg1') },
                    {
                        type: 'email',
                        message: this.$t('messages.msg2'),
                    },
                ],
                firstName: [
                    { required: true, message: this.$t('messages.msg3') },
                ],
                lastName: [
                    { required: true, message: this.$t('messages.msg4') },
                ],
                country: [
                    { required: true, message: this.$t('messages.msg5') },
                ],
            }
        }
    },
    methods: {
        async applyAgentPlan() {
            const _self = this;
            await this.$refs['applyForm'].validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    const postData = {
                        typeName: 'Others',
                        content: this.$t('community.com19'),
                        jsonContent: JSON.stringify(_self.applyForm),
                    }
                    try {
                        const data = await this.$store.dispatch('work_order_update', postData)
                        if (data.code == 200) {
                            this.applyForm = {
                                firstName: '',
                                lastName: '',
                                emailAddress: '',
                                country: ''
                            }

                            _self.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt1') + ' ' + this.metada.title });
                            _self.close();
                        }
                        this.loading = false;
                    } catch (error) {
                       //console.log('Error', error)
                        this.loading = false;
                    }
                }
            })

        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/modals/success.scss';
</style>
