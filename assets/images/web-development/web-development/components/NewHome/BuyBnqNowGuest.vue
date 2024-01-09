<template>
    <a-modal v-model="show" id="bybnq-modal" :footer="false" :title="false" @cancel="close" width="450px"
        :maskClosable="false">
        <div class="by-bnq-bg">
            <a-row :gutter="16" class="px-4 pt-4">

                <a-col :lg="24" align="end"> <img src="/images/white-cross.svg" class="pointer" @click="close" />
                </a-col>

            </a-row>
            <p class="buy-now">BUY BNQ NOW</p>
            <p class="buy-now-desc px-5 mx-2 text-center">Join the BNQ crew now And bring home the big
                bucks</p>
        </div>
        <div>
            <a-row class="mx-4">
                <a-form-model :model="getStartedForm" ref="ticketForm" :rules="rules" :hide-required-mark="true"
                    label-align="left">
                    <a-col :lg="24" class="my-4 pt-2">
                        <AppFormModelItem prop="email">
                            <a-input class="home-input" v-model="getStartedForm.email"
                                placeholder="Enter Email/Phone number" />
                        </AppFormModelItem>
                    </a-col>
                    <a-col :lg="24">
                        <a-button class="primary-btn register-btn mb-4" block @click="join">Register Now</a-button>
                    </a-col>
                </a-form-model>
            </a-row>
        </div>

    </a-modal>
</template>

<script>
import AppFormModelItem from '../App/AppFormModelItem.vue';

export default {
    name: "BuyBnqNow",
    components: { AppFormModelItem },
    data() {
        return {
            show: true,
            getStartedForm: {
                email: ''
            },
            rules: {
                email: [
                    { required: true, message: "email or phone is required" },
                    {
                        validator: (rule, value) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            const phoneRegex = /^\+?[0-9]{10,}$/;
                            if (!value || phoneRegex.test(value)) {
                                return Promise.resolve();
                            }
                            else if (!value || emailRegex.test(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Enter Valid Email/Phone (with area code)");
                        },
                    },
                ]
            },

        }
    },
    methods: {
        close() {
            this.show = false
            localStorage.setItem('buyBnqGuestModalClosed', true)

        },
        join() {
            this.$refs.ticketForm.validate((valid) => {
                if (valid) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^\+?[0-9]{10,}$/;
                    if (phoneRegex.test(this.getStartedForm.email)) {
                        this.$store.commit('auth/setTempData', {
                            phone: this.getStartedForm.email
                        })
                    }
                    else if (emailRegex.test(this.getStartedForm.email)) {
                        this.$store.commit('auth/setTempData', {
                            email: this.getStartedForm.email
                        })
                    }

                    this.$router.push({ path: '/register' })
                }
            })
        },
    },
    mounted() {
        this.show = !JSON.parse(localStorage.getItem('buyBnqGuestModalClosed'));
    },

}
</script>
