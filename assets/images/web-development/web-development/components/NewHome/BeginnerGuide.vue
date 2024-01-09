<template>
    <div class="beginner-guide mt-10 mb-10">
        <div class="main-content">
            <p class="mb-2 text-black trading-text fw-5 text-center">{{$t('beginer_guide.bg1')}}</p>
            <p class="text-black fw-4 mb-6 text-center product-title">{{$t('beginer_guide.bg15')}}</p>

            <a-row :gutter="24" class="step-container">
                <a-col :lg="6" class="step" v-for="(step, key) in beginnersGuide" :key="key">
                        <a-tag class="tags mb-3">{{ step.tag }}</a-tag>
                        <p class="fw-5 text-black product-title mb-1 step-title">{{ step.title }}</p>
                        <p class="fw-4 text-black mb-0 pr-5">{{ step.desc }}</p>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            beginnersGuide: [
                {
                    tag: "Step 1"/* `${this.$t('activity.commission_4')} 1` */,
                    title: this.$t('beginer_guide.bg7'),
                    desc: this.$t('beginer_guide.bg8')
                },
                {
                    tag: "Step 2"/* `${this.$t('activity.commission_4')} 2` */,
                    title: this.$t('beginer_guide.bg11'),
                    desc: this.$t('beginer_guide.bg12')
                },
                {
                    tag:"Step 3"/*  `${this.$t('activity.commission_4')} 3` */,
                    title: this.$t('beginer_guide.bg9'),
                    desc: this.$t('beginer_guide.bg10')
                },
                {
                    tag:"Step 4"/*  `${this.$t('activity.commission_4')} 4` */,
                    title: this.$t('beginer_guide.bg13'),
                    desc: this.$t('beginer_guide.bg14')
                }
            ]
        }
    }
}
</script>

<style></style>