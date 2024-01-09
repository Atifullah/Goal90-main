<template>
    <a-modal v-model="show" :footer="false" centered :title="false" @cancel="$emit('close')" width="450px">
        <div> {{ text }} </div>
    </a-modal>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
        },
        text: {
            type: String,
            default: null
        }
    },
};
</script>
