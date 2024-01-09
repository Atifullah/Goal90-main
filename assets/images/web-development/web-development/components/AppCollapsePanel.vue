<template>
    <a-collapse v-model="activeKey">
        <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel v-for="(item, jsonIndex) in items" :key="'jsonIndex' + jsonIndex" :header="item.question"
            class="faqs-item">
            <p class="mb-0">{{ item.answer }}</p>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [] //[{question:'', answer:''}]
        },

    },
    data() {
        return {
            activeCollapseableChild: '',
            activeKey: ['jsonIndex0']
        }
    },



}
</script>

<style lang="scss" scoped></style>