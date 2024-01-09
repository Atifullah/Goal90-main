<template>
    <div class="partner-modal">
        <a-modal id="partner-modal" v-model="show" :footer="false" :title="false" @cancel="close" width="540px">
            <a-form-model ref="partnerForm" :rules="rules" :model="partnerForm" :hide-required-mark="true"
                label-align="left">
                <a-row :gutter="16" class="mb-4">
                    <a-col :lg="17">
                        <p class="mb-1 partner-heading fw-5">Become A BitNasdaq Partner Here</p>
                        <p class="mb-0 partner-desc fw-5">Sign-up here today to partner with BitNasdaq on the Partner
                            Program</p>
                    </a-col>
                    <a-col :lg="7" align="end"> <img src="/images/ud-cross.svg" class="pointer"
                            @click="close" />
                    </a-col>

                </a-row>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <a-form-model-item has-feedback label="Name" prop="name" :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                            <a-input v-model="partnerForm.name" placeholder="Enter your first name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <a-form-model-item has-feedback label="Email" prop="email" :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                            <a-input v-model="partnerForm.email" placeholder="Enter your last name" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-form-model-item has-feedback label="Subject" prop="subject" :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                            <a-input v-model="partnerForm.subject" placeholder="Enter your subject here" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-form-model-item has-feedback label="Submit Your Query" prop="query" :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                            <a-textarea v-model="partnerForm.query" class="query-desc" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mt-4">
                    <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="close">Cancel</a-button></a-col>
                    <a-col :lg="12"><a-button class="primary-btn fw-5" :loading="loading"  :disabled="loading" block
                            @click="submitForm">Submit</a-button></a-col>
                </a-row>
            </a-form-model>
        </a-modal>
        <ApplySuccessModal :applySuccessModel="successModel" @applySuccessModelClose="successModel = {}" />
    </div>
</template>

<script>
import ApplySuccessModal from "../AgentPlan/ApplySuccessModal.vue";

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        // close: {
        //     type: Function
        // },
    },
    components: {
        ApplySuccessModal,
    },
    data() {
        return {
            loading: false,
            partnerForm: {
                name: '',
                email: '',
                subject: '',
                query: ''
            },
            successModel: {},
            rules: {
                name: [{ required: true, message: "Please enter your name" }],
                email: [
                    { required: true, message: "please enter your email" },
                    {
                        type: "email",
                        message: "Please enter your valid email",
                    },
                ],
                subject: [{ required: true, message: "Please enter your subject" }],
                query: [{ required: true, message: "Please enter your your query" }],

            },
        }
    },
    emits: ['onClose'],
    methods: {
        async submitForm() {
            const _self = this;
            await this.$refs["partnerForm"].validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    const postData = {
                        typeName: "Others",
                        content: "Partner Form",
                        jsonContent: JSON.stringify(_self.partnerForm),
                    };
                    try {
                        const data = await this.$store.dispatch(
                            "work_order_update",
                            postData
                        );
                        if (data.code == 200) {
                            this.partnerForm = {
                                name: "",
                                email: "",
                                subject: "",
                                query: "",
                            };
                            this.successModel = {
                                ServerMessage: this.$t("messages.msg70"),
                            };
                            this.close()
                        }
                        this.loading = false;
                        
                    } catch (error) {
                        //console.log("Error", error);
                        this.loading = false;
                    }
                }
            });
        },
        
        close() {
            this.$emit('onClose', true)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/partner/partner.scss';
</style>