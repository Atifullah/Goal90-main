<template>
  <a-modal
    id="ad-sharing"
    :visible="adSharing"
    :footer="false"
    :title="false"
    @cancel="close"
    width="593px"
  >
    <a-row :gutter="16" class="col-alignment">
      <a-col :lg="12">
        <p class="adsharing-title fw-5 mb-0">{{ $t("adsharing.as1") }}</p>
      </a-col>
      <a-col :lg="12" align="end"
        ><img
          src="/images/ud-cross.svg"
          class="pointer"
          @click="close"
        />
      </a-col>
    </a-row>
    <a-row :gutter="16" class="pt-4" id="downloadArea">
      <a-col :lg="13">
        <p class="sharing-desc fw-5 mb-5">{{ $t("adsharing.as2") }}</p>
        <a-row :gutter="16">
          <a-col :lg="14">
            <p class="total-orders fw-5 mb-0">{{ $t("adsharing.as3") }}</p>
          </a-col>
          <a-col :lg="10">
            <p class="total-price fw-5 mb-0">
              {{ counterParty?.completionrate_thirtydays }}%
            </p>
          </a-col>
        </a-row>
        <a-divider class="sharing-divider my-2" />
        <a-row :gutter="16" class="mb-5">
          <a-col :lg="14">
            <p class="total-orders fw-5 mb-0">{{ $t("adsharing.as3") }}</p>
          </a-col>
          <a-col :lg="10">
            <p class="total-price fw-5 mb-0">
              {{ counterParty?.trades_thirtydays }}
            </p>
          </a-col>
        </a-row>
        <p class="total-price fw-5 mb-0">{{ $t("adsharing.as4") }}</p>
        <p class="total-orders fw-5">{{ $t("adsharing.as2") }}</p>
        <a-row :gutter="16" class="col-alignment">
          <a-col :lg="21"
            ><a-card class="link-card">
              <a-tooltip>
                <template slot="title">
                  {{
                    $store.state.hex_config.DomanUrl
                  }}/p2p/counter-party?userid={{ $userinfo.uid }}&advid={{
                    item.id
                  }}
                </template>
                <p
                  class="mb-0"
                  id="keycopy"
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{
                    $store.state.hex_config.DomanUrl
                  }}/p2p/counter-party?userid={{ $userinfo.uid }}&advid={{
                    item.id
                  }}
                </p>
              </a-tooltip>
            </a-card></a-col
          >
          <a-col :lg="3" id="keycopy">
            <AppClipboard target="#keycopy" element-class="link-url1" />
          </a-col>
        </a-row>
        <div class="mt-4">
          <img
            src="/images/facebook-active.svg"
            class="mr-2 pointer"
            @click="shareOnFacebook"
          />
          <img
            src="/images/recom-twitter-active.svg"
            class="mr-2 pointer"
            @click="shareOnTwitter"
          />
          <img
            src="/images/send-active.svg"
            class="mr-2 pointer"
            @click="shareOnTelegram"
          />
          <img
            src="/images/whatsapp.svg"
            class="mr-2 pointer"
            @click="shareOnWhatsApp"
          />
        </div>
      </a-col>
      <a-col :lg="11">
        <a-card :bordered="false" class="light-orange-card">
          <a-row class="mb-3">
            <img src="/images/share-logo.svg" />
          </a-row>
          <a-row :gutter="16" class="mb-3 col-alignment">
            <a-col :lg="6">
              <span
                class="photo"
                :style="{
                  'background-color': global_get_random_color(
                    $userinfo.uid
                      ? $userinfo.uid.substring($userinfo.uid.length - 1)
                      : 0
                  ),
                }"
              >
                {{ getname($userinfo.realname) }}
              </span>
            </a-col>
            <a-col :lg="18">
              <p class="mb-0 total-price fw-5">{{ $userinfo.realname }}</p>
              <p
                class="mb-0 verified-user fw-5"
                v-if="$usersettings.moreconfig.applyadv"
              >
                <img src="/images/green-dot-tick.svg" class="mr-1" />{{
                  $t("adsharing.as5")
                }}
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="mb-3">
            <a-col :lg="9">
              <p
                class="total-orders fw-5 mb-0"
                :class="item.direction == 1 ? 'buy-txt' : 'sell-txt'"
              >
                {{ item.direction == 1 ? "Buy" : "Sell" }}
              </p>
            </a-col>
            <a-col :lg="15" class="pl-0">
              <p class="usdt-txt fw-6 mb-0 usdt-bold col-alignment">
                {{ item.currencyname
                }}<img
                  :src="getCurrencyIcon(item)"
                  height="14"
                  width="14"
                  class="ml-2"
                />
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="mb-3">
            <a-col :lg="9">
              <p class="total-orders fw-5 mb-0">{{ $t("adsharing.as6") }}</p>
            </a-col>
            <a-col :lg="15" class="pl-0">
              <p class="usdt-txt fw-6 mb-0">
                {{
                  item.price > 0
                    ? item.price.toFixed(2)
                    : item.limitprice.toFixed(2)
                }}
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="mb-3">
            <a-col :lg="9">
              <p class="total-orders fw-5 mb-0">{{ $t("adsharing.as7") }}</p>
            </a-col>
            <a-col :lg="15" class="pl-0">
              <p class="usdt-txt fw-6 mb-0">
                {{
                  global_get_tofixed(
                    item.enableamount,
                    global_get_decimal(item.currencyname).a
                  )
                }}
                USTD
              </p>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="rqcode-card" :bordered="false">
          <div
            class="mx-auto"
            id="shareCanvas01"
            style="height: 119px; width: 120px; background: white; padding: 5px"
          >
            <img src="/images/qrcode3.svg" />
          </div>
        </a-card>
        <span
          @mouseover="hoverKey = 2"
          @mouseleave="hoverKey = -1"
          data-html2canvas-ignore
        >
          <a-button
            class="outline-btn fw-5 pointer mt-3"
            block
            @click="download()"
            :loading="loading"
            ><img
              :src="
                hoverKey == 2
                  ? '/images/save-qr-active.svg'
                  : '/images/save-qr.svg'
              "
              class="mr-2"
            />{{ $t("adsharing.as8") }}</a-button
          >
        </span>
      </a-col>
    </a-row>
  </a-modal>
</template>
<style>
#shareCanvas01 canvas {
  max-width: 119px !important;
  max-height: 119px !important;
  width: 100%;
}

.buy-txt {
  color: rgba(3, 191, 123, 1) !important;
}

.sell-txt {
  color: rgba(233, 108, 66, 1) !important;
}
.photo {
  display: inline-block;
  border-radius: 200px;
  text-align: center;
  width: 39px;
  height: 39px;
  line-height: 36px;
  vertical-align: middle;
  margin-right: 0px;
  color: #ffffff;
  position: relative;
}
</style>
<script>
import AppClipboard from "~/components/App/AppClipboard.vue";

import Qrlogo from "@/static/images/qrlogo.png";
import html2canvas from "html2canvas";
import Clipboard from "clipboard";
export default {
  props: {
    adSharing: {
      type: Boolean,
    },
    close: {
      type: Function,
    },
    item: {
      type: Object,
    },
    counterParty: {
      type: Object,
    },
  },
  components: {
    AppClipboard,
  },
  data() {
    return {
      hoverKey: -1,
      QRCodeStyling: null,
      loading: false,
      invitationUrl: "",
    };
  },

  methods: {
    getCurrencyIcon(item) {
      const icon = this.$store.state.currencyinfos.filter(
        (_i) => _i.currencyname == item.currencyname
      )[0].icon;
      return icon;
    },
    getname(val) {
      return val ? val.substring(0, 1) : "--";
    },
    bindQRcode() {
      const _self = this;
      let code = {
        id: this.item.id,
        touserid: this.$userinfo.uid,
        price:
          this.item.price > 0
            ? this.item.price.toFixed(2)
            : this.item.limitprice,
      };
      const param = JSON.stringify(code);
      const qrCode = new _self.QRCodeStyling({
        width: 500,
        height: 500,
        margin: 0,
        type: "canvas",
        data: "p2pAdv:" + param,
        image: Qrlogo,
        dotsOptions: {
          color: "#000",
        },
        qrOptions: {
          errorCorrectionLevel: "H",
          mode: "Byte",
        },
        backgroundOptions: {
          color: "#fff",
        },
      });
      let x = document.getElementById("shareCanvas01");
      x.innerHTML = null;
      qrCode.append(document.getElementById("shareCanvas01"));
    },
    download() {
      const _self = this;
      if (!_self.loading) {
        _self.loading = true;
        var element = document.getElementById("downloadArea");
        //console.log("nisar",element.offsetWidth)
        // Use html2canvas to capture a screenshot of the element
        html2canvas(element, {
          x: -20, // left padding
          y: -20, // top padding
          width: element.offsetWidth + 40, // set width
          height: element.offsetHeight + 20, // set height
        }).then(function (canvas) {
          // Convert the canvas to an image
          var img = new Image();
          img.src = canvas.toDataURL("image/png");

          // Create a new anchor element with the download attribute
          var link = document.createElement("a");
          link.download = "screenshot.png";
          link.href = img.src;

          // Append the anchor element to the document and click it to download the image
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          _self.loading = false;
        });
      }
    },
    shareOnFacebook() {
      const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
        this.computedInvitationUrl
      )}`;
      window.open(url);
    },
    shareOnTwitter() {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        this.computedInvitationUrl
      )}`;
      window.open(url);
    },
shareOnTelegram() {
    const message = encodeURIComponent(`Check out this invitation: ${this.computedInvitationUrl}`);
    const url = `https://web.telegram.org/#/im?text=${message}`;
    window.open(url);
},
shareOnWhatsApp() {
    const message = encodeURIComponent(this.computedInvitationUrl);
    const url = `https://web.whatsapp.com/send?text=${message}`;
    window.open(url);
}

  },
  computed: {
    computedInvitationUrl() {
      return `${this.$store.state.hex_config.DomanUrl}/p2p/counter-party?userid=${this.$userinfo.uid}&advid=${this.item.id}`;
    },
  },
  mounted() {
    const _self = this;
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      _self.QRCodeStyling = QRCodeStyling;
      _self.bindQRcode();
    });
  },
};
</script>

<style></style>
