

<template>
  <div class="exchange-block_slider">
    <div class="block_slider_dot">
      <span class="dot" @click="buydecimals = item" :class="{ 'active': buydecimals >= item }"
        :style="{ 'left': `${item}%` }" v-for="(item, index) in [0, 25, 50, 75, 100]" :key="index"></span>
    </div>
    <a-slider @mousedown="isdown = true" @mouseup="isdown = false" :format-tooltip="formattip"
      tooltip-class="block_slider" v-model="buydecimals"></a-slider>
  </div>
</template>
<script>
export default {
  name: "HexSlider",
  props: {
    dec: {
      type: Number,
      default: 0
    }
  },
  watch: {
    'dec': function (val) {
      if (!val) {
        val = 0
      }
      const newval = parseInt(val.toFixed(0))
      if (newval == this.copebuydecimals) {
        return
      }
      this.copebuydecimals = newval
    },
    'copebuydecimals': function (val) {
      this.buydecimals = parseInt(val)
    },
    'buydecimals': function (val) {
      if (this.copebuydecimals == val) {
        return
      }
      this.$emit('slider:change', val / 100)
    }
  },
  computed: {},
  data() {
    return {
      copebuydecimals: 0,
      buydecimals: 0,
      isdown: false
    }
  },
  mounted() {
  },
  methods: {
    formattip(val) {
      return val + '%'
    }
  }
};
</script>
<style lang="less">
@import '../../static/styles/color.less';

.exchange-block_slider {
  position: relative;
  margin: 28px 6px 15px 12px;

  .block_slider_dot {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    background: #5E6573;
    z-index: 1;

    .dot {
      width: 10px;
      height: 10px;
      display: block;
      position: absolute;
      top: -4px;
      cursor: pointer;
      transform: translateX(-50%) rotate(45deg) !important;
      border-radius: 2px;
      border: 2px solid @cl_5E6573;
      transition: box-shadow 0.2s ease 0s;
      background: @cl_1E252B;
    }

    .dot.active {
      background-color: @cl_fff;
      border-color: @cl_fff;
    }

    .ant-slider:hover .ant-slider-track {
      background-color: @cl_fff;
    }

  }

  .ant-slider {
    padding: 0px;
    margin: 0px;
  }

  .ant-slider:hover .ant-slider-track {
    background-color: @cl_fff;
  }

  .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
    border-color: @cl_fff;
  }


  .ant-slider-rail {
    height: 2px;
    padding: 0px;
    background-color: @cl_5E6573;
  }

  .ant-slider-track {
    height: 2px;
    background-color: @cl_fff;
    z-index: 5;
  }



  .ant-slider:hover .ant-slider-rail {
    background-color: @cl_5E6573;
  }

  .ant-slider__button-wrapper {
    top: -3px;
    width: initial;
    height: initial;
  }

  .ant-slider-handle {
    position: absolute;
    width: 15px;
    margin-top: -6px;
    height: 15px;
    transform: translateX(-50%) rotate(45deg) !important;
    background-color: #1e2329;
    border-radius: 3px;
    border: 4px solid whitesmoke;
    z-index: 20;
    cursor: grab;
    transition: box-shadow 0.2s ease 0s;
  }

  .ant-slider__button {
    width: 8px;
    height: 8px;
    border: 0;
    background-color: #ffb11a;
  }

  .ant-slider__button-wrapper .a-tooltip,
  .ant-slider__button-wrapper::after {
    display: block;
  }
}

.block_slider.a-tooltip__popper {
  background-color: #15181F;

  .popper__arrow {
    border-top-color: #15181F;
  }

  .popper__arrow:after {
    border-top-color: #15181F;
  }
}
</style>

