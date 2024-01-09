<template>
    <div class="anonymous-pic text-center">
        <img src="~/static/images/anonymous_black.svg" alt="" />
        <p class="text-center">{{ $t('there_is_no_record') }}</p>
    </div>
</template>

<script>
export default {
    name: 'AppNoData',
    props: {
        label: {
            type: Number | String,
            default: null
        },
        prop: {
            type: String,
            default: null
        }
    },
}
</script>

<style lang="scss" scoped></style>