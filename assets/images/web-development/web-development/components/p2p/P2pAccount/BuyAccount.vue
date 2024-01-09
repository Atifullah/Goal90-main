<template>
  <div class="p2p-account" v-if="dataLoaded">
    <a-card :bordered="false" class="account-card">
      <a-tabs v-model="activeKey" id="p2p-tabs">
        <a-tab-pane key="1" :tab="$t('tabkeys.tab28')">
          <Express />
          <!-- Added from p2p -->
          <a-row>
            <a-col :lg="24">
              <WorksCard />
            </a-col>
          </a-row>
          <!-- <a-row class="mx-4 py-5 mt-3">
                        <a-col :lg="24">
                            <Faqs :channelid="77" :subtitle="'p2p_express_faqs'" />
                        </a-col>
                    </a-row> -->
          <a-row class="py-5">
            <a-col :lg="24"> </a-col>
          </a-row>
          <!-- added ended from p2p -->
        </a-tab-pane>
        <a-tab-pane key="2" tab="P2P">
          <P2P :directionprop="direction" />
          <!-- Added from p2p -->
          <a-row>
            <a-col :lg="24">
              <WorksCard />
            </a-col>
          </a-row>

          <a-row class="py-5">
            <a-col :lg="24"> </a-col>
          </a-row>
          <!-- added ended from p2p -->
        </a-tab-pane>

        <div slot="tabBarExtraContent">
          <p class="mb-0 tutorial-txt fw-5">
            <span class="pr-3 pointer" @click="p2pusercenterRoute">
              {{ $t("express.exp38") }} </span
            ><span @click="buySellVideo=true" class="pointer"
              ><img src="/images/playcircle.svg" class="pr-2" />{{
                $t("express.exp39")
              }}</span
            >
            <a-tag class="new-tag fw-5 ml-2 pointer">
              {{ $t("express.exp40") }}
            </a-tag>
          </p>
        </div>
      </a-tabs>
    </a-card>
    <BuySellCryptoVideo  :show="buySellVideo" :close="close"/>
  </div>
</template>

<script>
import BankTransfer from "@/components/p2p/P2pAccount/BankTransfer/BankTransfer.vue";
import ThirdParty from "@/components/p2p/P2pAccount/ThirdParty/ThirdParty.vue";
import Express from "@/components/p2p/P2pAccount/Express/Express.vue";
import P2P from "@/components/p2p/P2pAccount/p2p/p2p.vue";
import WorksCard from "@/components/public/P2pModules/WorksCard.vue";
import Faqs from "@/components/public/Faqs.vue";
import BuySellCryptoVideo from '@/components/p2p/Modals/BuySellCryptoVideo.vue';

export default {
  components: {
    Express,
    BankTransfer,
    ThirdParty,
    P2P,
    WorksCard,
    Faqs,
    BuySellCryptoVideo,
  },    
  data() {
    return {
      direction: -1,
      activeKey: "2",
      dataLoaded: false,
      selectedRadio: "p2p_General_faqs",
      buySellVideo:false
    };
  },
  watch: {
    $route(to, from) {
      if (JSON.stringify(to.query) !== JSON.stringify(from.query)) {
        if (to.query.tabkey) {
          this.activeKey = to.query.tabkey;
        }
        if (to.query.direction) {
          this.direction = to.query.direction;
        }
      }
    },
  },
  mounted() {
    if (this.$route.query.tabkey) {
      this.activeKey = this.$route.query.tabkey;
    }
    if (this.$route.query.direction) {
      this.direction = this.$route.query.direction;
    }
    this.dataLoaded = true;
  },
  methods: {
    p2pusercenterRoute() {
      // Get user info from the store
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;
      if (!email || !userId) {
        // Redirect the user to the login page
        this.$router.push("/login"); // Replace "/login" with your actual login route
        return; // Exit the function
      } else {
        this.$router.push("./profile-info");
      }
    },
    close() {
            this.buySellVideo = false
    }
  },
};
</script>
