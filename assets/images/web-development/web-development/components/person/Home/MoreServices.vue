<template>
  <div class="more-services">
    <a-card class="main-card more-services-card" :bordered="false">
      <a-row :gutter="16" class="px-4">
        <a-col :lg="12" :xl="14">
          <p class="all-main-heading mb-2">{{ $t('person.ph3') }}</p>
        </a-col>
        <a-col :lg="12" :xl="10" align="end">
        </a-col>
      </a-row>

      <a-row v-for="(list, key) in Services" :key="key" class="services-list px-4">
        <a-col :lg="24">
          <div @mouseover="hoverKey = key" @mouseleave="hoverKey = -1">
            <nuxt-link :to="list.link">
              <a-row :gutter="16" class="col-alignment pointer pb-2 pt-2 mb-1">
                <a-col :xl="2" :lg="3" :md="3" class="pt-2"><img :src="hoverKey == key ? list.img_active : list.img"
                    height="20px" /></a-col>
                <a-col :xl="20" :lg="21" :md="21" class="pt-2 pl-3">
                  <p class="mb-0 service-heading fw-5">{{ list.title }}</p>
                  <span class="services-desc fw-4">{{ list.desc }}</span>
                </a-col>
                <a-col :xl="2" :lg="2" class="pt-2"><span @mouseover="hoverKey = key" @mouseleave="hoverKey = -1"> <img
                      :src="hoverKey == key ? list.img1 : ''" /> </span></a-col>
              </a-row>
            </nuxt-link>
          </div>
          <a-divider class="my-0 recent-list-divider" v-if="key != 5" />

        </a-col>
      </a-row>
    </a-card>

  </div>
</template>

<script>

export default {
  data() {
    return {
      hoverKey: -1,
      Services: [
        {
          title: this.$t("tableskeys.pna4"),
          img: '/images/referral.svg',
          img_active: '/images/referral-active.svg',
          desc: this.$t('description.des6'),
          img1: '/images/us-orange-arrow.svg',
          link: '/recommend-friend'
        },
        {
          title: this.$t("tableskeys.pna5"),
          img: '/images/finance.svg',
          img_active: '/images/finance-active.svg',
          desc: this.$t('description.des7'),
          img1: '/images/us-orange-arrow.svg',
          link: '/financial'
        },
        {
          title: 'P2P',
          img: '/images/p2p.svg',
          img_active: '/images/p2p-active.svg',
          desc: this.$t('description.des8'),
          img1: '/images/us-orange-arrow.svg',
          link: '/p2p/buy-and-sell'
        },
        {
          title: this.$t("tableskeys.pna6"),
          img: '/images/p2p-orders.svg',
          img_active: '/images/p2p-orders-active.svg',
          desc: this.$t('description.des9'),
          img1: '/images/us-orange-arrow.svg',
          link: '/p2p/orders-history'
        },
        {
          title: this.$t("tableskeys.pna7"),
          img: '/images/us-convert.svg',
          img_active: '/images/convert-active.svg',
          desc: this.$t('description.des10'),
          img1: '/images/us-orange-arrow.svg',
          link: '/convert'
        },
        {
          title: this.$t("tableskeys.pna8"),
          img: '/images/vip.svg',
          img_active: '/images/vip-active.svg',
          desc: this.$t('description.des11'),
          img1: '/images/us-orange-arrow.svg',
          link: '/vip-program'
        },

      ]
    }
  }

}
</script>

<style></style>
