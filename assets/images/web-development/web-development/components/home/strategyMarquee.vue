<template>
  <div class="marqueeArea" ref="marqueeArea">
    <div class="marqueeBox" ref="marqueeBox" :style="boxStyles">
      <template v-for="index in copyTimes">
        <a-card :bordered="false" :lg="8" v-for="(product, listIndex) in list" :key="`marqueeItem-${index}-${listIndex}`"
          class="marqueeItem">
          <div class="user-marquee">

            <a-card :bordered="false" class="marquee-gray-card mt-3">
              <!-- <div class="white-marquee-img"> -->
              <a-row :gutter="16" class="mb-3 col-alignment"> 
                <a-col :xl="14">
                  <p class="product-txt fw-5 mb-0"><img class="user-img-new mr-2"
                      :src="product.avatar != null ? product.avatar : '/images/user-img.svg'" height="43" width="43"
                      v-if="imgLoaded" />
                    {{ product.nikename.substr(0, 18) }}
                  </p>
                </a-col>
                <a-col :xl="10" align="end">
                  <p class="mb-0 copynum-txt fw-5">
                    <svg height="24" width="24" class="svg-icon mb-1">
                      <use xlink:href="/images/svg/home.svg#home-users-icon"></use>
                    </svg>
                    {{ product.copynum }}<span class="grey-active"> /{{ product.tradenum }} </span>
                  </p>
                </a-col>
              </a-row>
              <a-row :gutter="16" class="mb-3 col-alignment">
                <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <p class="mb-1 symbol-txt fw-5">P&L</p>
                  <p class="symbol-btc fw-5 green-txt  mb-0">{{ product.incomerate }}%</p>
                </a-col>
                <a-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" align="end">
                  <canvas class="curve" :ref="`${index}${listIndex}str`" height="60" width="131"></canvas>
                </a-col>
              </a-row>

              <a-row :gutter="16" class="mb-4">
                <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <p class="mb-0 symbol-txt fw-5">P&L (USD)</p>
                  <p class="product-txt fw-5  mb-0 ">{{ product.profit }}</p>
                </a-col>
                <a-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" align="right">
                  <p class="mb-0 symbol-txt fw-5">Runtime</p>
                  <p class="product-txt fw-5 mb-0">{{ product.running_days }}d {{ product.running_hours }}h {{
                    product.running_mints }}m</p>
                </a-col>
              </a-row>

              <a-row :gutter="16" class="col-alignment">
                <a-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15">
                  <p class="mb-0 symbol-txt fw-5">{{ $t('home_page.hp13') }}</p>
                  <p class="fw-5 mb-0">
                    <span class="product-txt fw-7">{{ product.fcurrencyname }}</span>
                    <span v-if="product.directiontype != '1'" class="symbol-txt grey-active read-more fw-5">
                      /{{ getSymble(product.fcurrencyname).to }}
                    </span>
                    <span v-else class="symbol-txt gray-active fw-5">
                      /{{ $t("contract.swap") }}
                    </span>
                    <span class="margin-trade-txt"
                      v-if="product.directiontype == -1 && $store.state.symbleinfos?.length > 0">
                      {{ $store.state.symbleinfos.filter((item) => {
                        return item.id == product.ctid;
                      })[0].borrowmultiple
                      }}X
                    </span>
                  </p>
                </a-col>
                <a-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" align="right">
                  <a-button class="gray-btn fw-5" block>
                    <nuxt-link :to="product.redirecTo">
                      {{ $t('home_page.hp12') }}
                    </nuxt-link>
                  </a-button>
                </a-col>

              </a-row>
            </a-card>
          </div>
        </a-card>
      </template>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },

  },
  data() {
    return {
      imgLoaded: false,
      copyTimes: 2,
      movingDistance: 0,
      windowWidth: null,
      marqueeBox: null,
      marqueeArea: null,
      time: 5,
      bg: {
        buy: "rgba(74,196,158,0.000089)",
        buydark: "rgba(74,196,158,0.45)",
        buyline: "rgba(74,196,158,0.85)",
        sell: "rgba(255,129,141,000089)",
        selldark: "rgba(255,129,141,0.0045)",
        sellline: "rgba(255,129,141,0.85)",
      },
    };
  },
  computed: {
    boxStyles() {
      return {
        transform: `translateX(-${this.movingDistance}px)`,
        animationDuration: `${this.time}s`,
      };
    },
  },
  methods: {
    getSymble(s) {
      const symble = s.toLowerCase();
      //console.log('symb:', s);

      const obj = this.$store.state.symbleinfos.find((sinfo) => sinfo.descriptions.toLowerCase().includes(symble))
      //console.log('objJJ: ', obj)
      const des = obj.descriptions.split("/");
      return {
        from: des[0],
        to: des[1],
      };
    },
    setMarquee() {
      this.copyTimes = 1;
      this.$nextTick(() => {
        const marqueeArea = this.$refs.marqueeArea
        const marqueeBox = this.$refs.marqueeBox
        const areaWidth = marqueeArea ? Math.floor(marqueeArea.offsetWidth) : 0;
        const boxWidth = marqueeBox ? Math.floor(marqueeBox.offsetWidth) : 0;
        // console.log(areaWidth,boxWidth)
        this.copyTimes = Math.max(2, Math.ceil((areaWidth * 2) / boxWidth)) || 2;
        this.movingDistance = boxWidth * Math.floor(this.copyTimes / 2);

        this.time = parseFloat(((this.time * this.movingDistance) / 375).toFixed(2));

        this.$nextTick(() => {
          for (let k = 0; k <= this.copyTimes; k++) {
            for (const i in this.list) {
              const refindex = `${k}${i}str`;
              const ref = this.$refs[refindex]
              this.drawline(this.list[i].datas, ref)
            }
          }
        })
      });
    },
    onWidthChange() {
      // this.windowWidth = window.innerWidth;
      this.setMarquee();
    },
    limitPrice: function (c, o) {
      let limit_price = Number((((c - o) / o) * 100).toFixed(2));
      return isNaN(limit_price) ? 0 : limit_price;
    },
    drawline(data, canvas) {
      
      if (!canvas || canvas.length <= 0) return;
      const k = data
      if (!k) return;
      const _length = k.length;
      if (_length <= 0) return;
     
      const isup = true
      canvas = canvas[0]
      const { offsetHeight, offsetWidth } = canvas;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      const width = offsetWidth;
      const height = offsetHeight;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, width, height);
      const _sort = k.sort((a, b) => {
        return b.income - a.income;
      });
      let _max = _sort[_sort.length - 1].income;

      let _min = _sort[0].income;
      let _range = _max - _min;

      const _k = k.sort((a, b) => {
        return a.time - b.time;
      });
      context.beginPath();
      var my_gradient = context.createLinearGradient(0, 0, 0, height);
      my_gradient.addColorStop(0, isup ? this.bg.buydark : this.bg.sell);
      my_gradient.addColorStop(1, isup ? this.bg.buy : this.bg.selldark);
      context.fillStyle = my_gradient;
      context.strokeStyle = isup ? this.bg.buyline : this.bg.sellline;
       
      const getxy = function (item, index) {
        const x = (width / _length) * index;
        const _y = 2 * ((item.income - _min) / _range - 0.5);
        const y = (-_y * height * 0.8) / 2 + height / 2;
        return { x, y };
      };
      _k.forEach((item, index) => {
        const { x, y } = getxy(item, index);
        context.fillRect(x, y, width / _length, height - y);
        context.lineTo(x, y);
        if (index == _length - 2) context.stroke();
      });
    },
  },
  watch: {
    windowWidth(newWidth) {
      this.onWidthChange();
    },
    // list: {
    //   handler(val, oldVal) {
         
    //     console.log('val::', val);
    //     console.log('oldVal::', oldVal);
    //     this.setMarquee()
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  mounted() {
    const self = this
    this.setMarquee()
    window.addEventListener("resize", () => {
      self.windowWidth = window.offsetWidth
    })
    window.addEventListener("scroll", () => {
      self.imgLoaded = true
    })


  },
  beforeDestroy() {
    const self = this
    window.removeEventListener("resize", self.onWidthChange);
    window.removeEventListener("resize", () => {
      self.imgLoaded = false
    })
  },
};
</script>
  
<style scoped>
@keyframes boxMove {
  from {
    transform: translateX(0);
  }
}

.marqueeArea {
  position: relative;
  overflow: hidden;
}

.marqueeBox {
  display: inline-block;
  white-space: nowrap;
  animation: boxMove 10s linear infinite;
}

.marqueeBox:hover {
  animation-play-state: paused;
}

.marqueeItem {
  display: inline-block;
}
</style>
  
  
  