<template>
    <div class="exclusive-benefits mb-3">
        <a-card class="exclusive-card" :bordered="false">
            <a-row :gutter="24" class="px-5">
                <a-col :lg="8" v-for="(list, key) in getCardDetail" :key="key">
                    <a-card class="vip-detail-card" :bordered="false">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="24"> <img :src="list.img" class="mb-4 detail-list-img" />
                                <p class="welcome-txt fw-5 mb-0">{{ list.title }}</p>
                            </a-col>
                        </a-row>
                        <p class="my-3 welcome-txt-desc fw-4">{{ list.desc }}</p>
                        <span class="chat-now fw-4 mb-0" @click="openChatPopover">{{ $t('trade.tp9') }} ></span>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
        <a-card :bordered="false" class="mt-3 exclusive-vip-benefits">
            <a-row>
                <a-col :lg="{span:20,offset:2}" :xl="{span:22,offset:1}">
                    <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12">
                    <p class="mb-1 vip-heading fw-5">{{ $t('trade.tp6') }}</p>
                    <p class="vip-note text-black fw-5 mb-0">{{ $t('trade.tp7') }}</p>
                </a-col>
                <a-col :lg="12" align="end"><span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                    <a-button
                        class="primary-btn fw-5" @click="vipModel = true">{{ $t('trade.tp8') }} <img src="/images/white-arrow.svg" height="10px" class="ml-2"/></a-button>
                        <!-- <a-button
                        class="outline-btn fw-5" @click="vipModel = true">{{ $t('trade.tp8') }} <img
                        :src="hoverKey == 2 ? '/images/white-arrow.svg' : '/images/black-arrow-home.svg'"
                        class="ml-2" height="10px" /></a-button> -->
                    </span>
                </a-col>
            </a-row>
                </a-col>
            </a-row>
          
        </a-card>
        <VipModal :vipModel="vipModel" :close="close" />

    </div>
</template>

<script>
import VipModal from './VipModal.vue'
import { mapState, mapMutations } from 'vuex';

export default {
    components: {
        VipModal,
    },
    data() {
        return {
            vipModel: false,
            hoverKey: -1,
            getCardDetail: [
                {
                    title: this.$t("tableskeys.sc5"),
                    desc: this.$t('description.des29'),
                    img: '/images/vip-gift.svg',
                    // img1: '/images/orange-arrow.svg'

                },
                {
                    title: this.$t("tableskeys.sc6"),
                    desc: this.$t('description.des30'),
                    img: '/images/account-manager.svg',
                    // img1: '/images/orange-arrow.svg'

                },
                {
                    title: this.$t("tableskeys.sc7"),
                    desc: this.$t('description.des31'),
                    img: '/images/customer-service.svg',
                    // img1: '/images/orange-arrow.svg'

                }
            ],
        }
    },
      computed: {
    ...mapState({
      showPopover: (state) => state.popoverstate.showPopover,
    }),
  },
    methods: {
            ...mapMutations(['setShowPopover']),
    openChatPopover() {
      this.setShowPopover(true);
    },
        close() {
            this.vipModel = false
        }
    },
}
</script>

<style></style>
