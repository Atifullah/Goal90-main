<template>
    <div class="main-card">
        <a-card class="vip-main-card">
            <p class="recharge-txt fw-5 px-3 pt-4 mb-0"> {{ title }} <span class="active"> VIP {{ vipLevel + 1 }} </span></p>
            <a-divider class="mb-3 mt-4 vip-deivider" />
            <a-row :gutter="16" class="px-3">
                <a-col :lg="20">
                    <p class="progress-txt fw-4 mb-0" style="text-align: left">{{ $t('trade.tp10') }} <span class="fw-5">{{ progress }}%</span> </p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="px-3">
                <a-col :lg="24">
                    <a-slider id="test" v-model="progress" />
                    <p class="progress-txt fw-4 mb-0" style="text-align: right">{{ $t('trade.tp12') }}: <span class="fw-5">{{ nextLevelAmount + amount }} USDT</span></p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="my-4">
                <a-col :lg="24" align="end">
                    <a-button class="gray-usdt-btn fw-5">
                      {{ $t('trade.tp11') }} {{ amount }} USDT
                    </a-button>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-4 mb-2 px-3 col-alignment">
                <a-col :lg="24" :xl="21">
                    <p class="card-desc fw-4">{{ $t('trade.tp13') }} {{ days }} {{ $t('trade.tp14') }}
                            {{ nextLevelAmount }} USDT  {{ $t('trade.tp15') }} <span class="active fw-5"> VIP {{ vipLevel + 1
                            }}</span> </p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="px-3 mb-4">
                <a-col :lg="24"><a-button class="vip-primary-btn fw-5" block @click="goTo"> {{ goToButton }} </a-button></a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
export default {
    props: {
        amount: {
            type: Number
        },
        nextLevelAmount: {
            type: Number
        },
        vipLevel: {
            type: Number
        },
        title: {
            type: String
        },
        type: {
            type: Number
        },
        days: {
            type: Number,
            default: 0
        }

    },
    computed: {
        progress() {
            let progress = (this.amount / (this.nextLevelAmount + this.amount) * 100);
                return parseInt(progress);
        },
        goToButton() {
            if (this.type < 2) {
                return this.$t('trade.tp22')
            }
            return this.$t('trade.tp23')
        }
    },
    methods: {
        goTo() {
            switch (this.type) {
                case 1:
                    this.$router.push('/person/wallet')
                    break;
                case 2:
                    this.$router.push('/deal/btc_usdt')
                    break;
                case 3:
                    if (this.$store.getters.get_contractType == 1) {
                        this.$router.push({path : '/contract/btc_yx', query: { contractType : 1}})
                    } else {
                        this.$router.push('/contract/btc_yx')
                    }
                    break;
            }
        }
    }

}
</script>

<style></style>
