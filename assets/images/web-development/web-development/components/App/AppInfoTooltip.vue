<template>
    <a-tooltip overlayClassName="app-tooltip" :placement="placement" :title="title">
        <img :src="image" class="pointer" :class="iconClass" :height="iconHeight" />
    </a-tooltip>
</template>
<script>

export default {
    name: "AppInfoTooltip",
    props: {
        title: {
            // required: true,
            default: null
        },
        placement: {
            type: String,
            default: 'top'
        },
        iconClass: {
            type: String,
        },
        iconHeight: {
            type: String,
            default: '15px'
        }
    },

    data() {
        return {}
    },
    computed: {
        image() {
            const theme = this.$store.state.hex_client_background.active
            return theme == 'day' ? '/images/info-circle.svg' : '/images/info-circle1.svg'
        }
    }

};
</script>
<style lang='scss'  >
@import 'assets/variables/light.scss';

.app-tooltip .ant-tooltip-inner,
.ant-tooltip-arrow::before {
    background-color: $tool_tip_color !important;
}
</style>

