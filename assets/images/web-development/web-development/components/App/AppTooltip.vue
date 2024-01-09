<template>
    <a-tooltip overlayClassName="app-tooltip" :placement="placement" :title="title"
        :overlayStyle="{ 'color': 'red', 'display': 'flex' }">
        <span :class="textClass">
            {{ text }}
        </span>
    </a-tooltip>
</template>
<script>

export default {
    name: "AppTooltip",
    props: {

        title: {
            required: true
        },
        text: {
            type: String,
            default: null
        },
        textClass: {
            type: String,
            default: null
        },

        placement: {
            type: String,
            default: 'top'
        },
        iconClass: {
            type: String,
        },
        width: {
            type: String,
            default: '240px'
        },
        backgroundColor: {
            type: String,
            default: 'red'
        }
    },

    data() {
        return {}
    },



};
</script>
<style lang='scss' >
@import 'assets/variables/light.scss';
.ant-tooltip-inner,
.ant-tooltip-arrow::before {
    background-color: $tool_tip_color !important;
}
</style>

