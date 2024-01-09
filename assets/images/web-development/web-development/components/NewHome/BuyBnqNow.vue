<template>
    <a-modal v-model="showBuyBnq" id="bybnq-modal" :footer="false" :title="false" @cancel="close" width="450px"
        :maskClosable="false">
        <div class="by-bnq-bg">
            <a-row :gutter="16" class="px-4 pt-4">

                <a-col :lg="24" align="end"> <img src="/images/white-cross.svg" class="pointer" @click="close" />
                </a-col>

            </a-row>
            <p class="buy-now">BUY BNQ NOW</p>
        </div>

        <div>
            <a-row :gutter="16" class="mt-4 pt-2 mx-4">
                <a-col :lg="6" v-for="(list, key) in getListBuybnq" :key="key" align="center">
                    <img :src="list.img">
                    <p class="text-black list-title mb-4">{{ list.title }}</p>
                </a-col>
                <p class="mx-4 mb-4 py-2 text-black text-center high-purchase">High ROI on early purchase, with early
                    investment benefits! </p>
            </a-row>
            <a-row :gutter="16" class="px-4 pb-4">
                <a-col :lg="12" align="center">
                    <a-button class="cancel-outline-btn fw-5" block @click="close()">{{ $t('texts.cancel') }}</a-button>

                </a-col>
                <a-col :lg="12" align="center">

                    <a-button class="primary-btn fw-5" block @click="buyNow">

                        {{ $t('manage.Buynow') }}

                    </a-button>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</template>

<script>
import AppFormModelItem from '../App/AppFormModelItem.vue';

export default {
    name: "BuyBnqNow",
    components: { AppFormModelItem },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showBuyBnq: true,
            getListBuybnq: [
                {
                    img: '/images/buybnq1.svg',
                    title: 'Purchase'
                },
                {
                    img: '/images/buybnq2.svg',
                    title: 'Invest'
                },
                {
                    img: '/images/buybnq3.svg',
                    title: 'Stake'
                },
                {
                    img: '/images/buybnq4.svg',
                    title: 'Earn'
                }
            ],
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
    emits: ['onClose', 'onOk'],
    computed: {
        loggedIn() {
            return this.$userinfo.uid != undefined;
        },
    },
    methods: {
        close() {
            this.showBuyBnq = false
            localStorage.setItem('buyBnqModalClosed', true)

        },
        buyNow() {
            localStorage.setItem('buyBnqModalClosed', true)
            return this.$router.push('/buy-bnq')
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
        this.showBuyBnq = !JSON.parse(localStorage.getItem('buyBnqModalClosed'));
    },

}
</script>
