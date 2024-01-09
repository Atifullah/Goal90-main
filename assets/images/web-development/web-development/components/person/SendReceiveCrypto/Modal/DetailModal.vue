<template>
    <a-modal id="detail-modal" v-model="sendDetailModal" width="30%" :footer="false" :title="false" @cancel="close">
        <a-row :gutter="16" class="col-alignment mb-4 mx-4">
                    <a-col :lg="12">
                        <p class="deposit-heading fw-5 mb-0">{{type}} {{$t('person.pm1')}}</p>
                    </a-col>
                    <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" @click="close" class="pointer"/></a-col>
                </a-row>
                <a-row :gutter="16" class="mx-4">
                    <a-col :lg="24" class="text-center">
                        <p class="mb-2 amount-txt fw-4">{{$t('person.pm2')}}</p>
                        <p class="mb-0 usdt-price-txt fw-5">{{row.amount}}<span class="small-price fw-4"> {{row.currencyname}}</span> </p>
                        <p class="success-txt mb-0 fw-5" :class="row.status!=1?'red-active':''">
                            <svg height="14" width="14" class="svg-icon pointer header-icon-img"  alt="tick">
      <use :xlink:href="row.status==1? '/images/svg/sprite.svg#green-check-icon':'/images/svg/sprite.svg#red-cross-icon'"></use>
    </svg>
                             {{global_get_charge_state(row.status)}}</p>
                    </a-col>
                </a-row>
                <a-divider />
                <a-row :gutter="16" class="pb-3 mx-4">
                        <a-col :lg="12"><p class="mb-0 gray-list  fw-4">{{$t('person.pm3')}}</p></a-col>
                        <a-col :lg="12" align="end"><p class="mb-0 gray-list  fw-4 black-list">{{row.touserid}}</p></a-col>
                </a-row>
                <a-row :gutter="16" class="pb-3 mx-4">
                        <a-col :lg="12"><p class="mb-0 gray-list  fw-4">{{$t('person.Note_person')}}</p></a-col>
                        <a-col :lg="12" align="end"><p class="mb-0 gray-list  fw-4 black-list">{{row.remark?row.remark:'--'}}</p></a-col>
                </a-row>
                <a-row :gutter="16" class="pb-3 mx-4">
                        <a-col :lg="12"><p class="mb-0 gray-list  fw-4">{{$t('person.pm4')}}</p></a-col>
                        <a-col :lg="12" align="end"><p class="mb-0 gray-list  fw-4 black-list">{{ global_get_local_time(row.createtime).format('HH:mm:ss')}}</p></a-col>
                </a-row>
                <a-row :gutter="16" class="pb-3 mx-4">
                        <a-col :lg="12"><p class="mb-0 gray-list  fw-4">{{$t('person.pm5')}}</p></a-col>
                        <a-col :lg="12" align="end"><p class="mb-0 gray-list  fw-4 black-list">{{row.id}}</p></a-col>
                </a-row>
                <a-row :gutter="16" class="pb-3 mx-4">
                        <a-col :lg="12"><p class="mb-0 gray-list  fw-4">{{$t('person.pm6')}}</p></a-col>
                        <a-col :lg="12" align="end"><p class="mb-0 gray-list  fw-4 black-list">{{$t('person.pm7')}}</p></a-col>
                </a-row>
                <a-row :gutter="16" class="pb-3 mx-4">
                        <a-col :lg="12"><p class="mb-0 gray-list  fw-4">{{$t('person.pm8')}}</p></a-col>
                        <a-col :lg="12" align="end"><p class="mb-0 gray-list  fw-4 black-list">{{row.currencyname}}</p></a-col>
                </a-row>
    </a-modal>
    </template>

    <script>
    export default {
        props: {
            sendDetailModal: {
                type: Boolean
            },
            row:{
                type:Object
            },
            type:{
                type:String,
            },
            close:{
                type: Function
            }
        },
        data() {
            return {
                getDetail: [
                    {
                        name: this.$t('leverage.To'),
                        status: '482642128',
                    },
                    {
                        name: this.$t('Waddress.nickname'),
                        status: '--',
                    },
                    {
                        name: this.$t('person.pm4'),
                        status: '2022-11-04  17:22:03',
                    },
                    {
                        name: this.$t('extra.extra28'),
                        status: '192688816053936128',
                    },
                    {
                        name: this.$t('c2c.PaymentMethod'),
                        status: this.$t('extra.extra29'),
                    },
                    {
                        name: this.$t('legalTrad.Currencies'),
                        status: '100 USDT',
                    },
                ]
            }
        },
        mounted(){

        }
    }
    </script>

    <style>

    </style>
