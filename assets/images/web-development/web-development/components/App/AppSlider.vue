
<template>
    <div class="app-slider-container my-3">
        <a-slider v-model="multiple" :default-value="multiple" :min="min" :max="max" @afterChange="sliderChange($event)"
            @change="changing($event)" :range="false" :marks="marks"/>
        <!-- :max="max" :marks="marks"-->
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [Number, String],
        },
        min: {
            type: [Number, String],
            default: 1
        },
        step: {
            type: [Number, String],
            default: 2
        },
        max: {
            type: [Number, String],
            default: 100
        },
        dec: {
            type: [Number, String],
            default: ''
        },
    },
    model: {
        prop: 'value',
        event: 'updateValue'
    },
    emits: ['changing'],
    watch: {
        value: function (val) {
            this.multiple = val
        }
    },

    data() {
        return {
            multiple: 10,
            marks: {
                0: 0,
                25: 25,
                50: 50,
                75: 75,
                100: 100
            },
        }
    },

    methods: {
        sliderChange(num) {
            this.$emit('changing', num * 0.01)
        },
        changing(num) {
            this.$emit('changing', num * 0.01)
        }
    },
    mounted() {
        this.multiple = this.value ? parseInt(this.value) : 0;
    },
}
</script>

<style lang="scss">
    @import '@/assets/scss/components/app/app-slider.scss';
</style>
