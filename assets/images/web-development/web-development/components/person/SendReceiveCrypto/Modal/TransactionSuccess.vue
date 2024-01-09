<template>
    <div class="transaction-success">
        <a-modal id="detail-modal" v-model="transactionSuccessModal" width="450px" :footer="false" :title="false" :maskClosable="false">
            <a-row :gutter="16" class="col-alignment px-4">
                <a-col :lg="12">
                    <p class="mb-0 deposit-heading fw-5">{{$t('extra.extra7')}}</p>
                </a-col>
                <a-col :lg="12" align="end">
                    <img src="/images/ud-cross.svg" @click="close" class="pointer" />
                </a-col>
            </a-row>
            <a-row :gutter="16" class="px-4 pt-4">
                <a-col :lg="24" align="center">
                    <img src="/images/send-success.svg" />
                    <p class="send-payment-title fw-5 pt-3">{{$t('extra.extra8')}}</p>
                    <p class="mb-0 bnq-txt fw-7"><span class="bnq-num pr-1">{{ withdraw?.amount }}</span>{{ withdraw?.currencySelected }}</p>
                </a-col>
            </a-row>
            <a-card :bordered="false" class="mx-3 mt-4 gray-success-card">
                <a-row :gutter="16" class="col-alignment" >
                    <a-col :lg="10">
                        <p class="mb-0 from-user fw-5">{{$t('extra.extra9')}}</p>
                    </a-col>
                    <a-col :lg="14" align="end">
                        <p class="right-txt fw-5 mb-0">{{ withdraw?.transactionId }}
                        </p>
                    </a-col>
                </a-row>
                <a-divider class="nickname-divider my-3" />
                <a-row :gutter="16" class="col-alignment">
                    <a-col :lg="10">
                        <p class="mb-0 from-user fw-5">{{$t('extra.extra10')}}</p>
                    </a-col>
                    <a-col :lg="14" align="end">
                        <p class="right-txt fw-5 mb-0">{{ withdraw?.withdrawalAddress }}
                        </p>
                        <p class="n-name fw-5 mb-0">{{ toUserProfile?.nickname }}</p>
                    </a-col>
                </a-row>
                <a-divider class="nickname-divider my-3"  />

                <a-row :gutter="16" class="col-alignment">
                    <a-col :lg="10">
                        <p class="mb-0 from-user fw-5">{{$t('extra.extra11')}}</p>
                    </a-col>
                    <a-col :lg="14" align="end">
                        <p class="right-txt fw-5 mb-0">{{withdraw?.amount}} {{  withdraw?.currencySelected }}
                        </p>
                    </a-col>
                </a-row>
            </a-card>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        transactionSuccessModal: {
            type: Boolean
        },
        close: {
            type: Function
        },
        toUserProfile: {
            type: Object,
            default: () => { }
        },
        withdraw: {
            type: Object,
            default: () => { }
        }
    },
}
</script>

<style></style>
