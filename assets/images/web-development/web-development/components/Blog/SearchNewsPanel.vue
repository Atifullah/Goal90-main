<template>
    <a-input-search :placeholder="$t('placeholders.plh22')" class="news-search" enter-button="Search" size="large" @search="onSearch" />
</template>

<script>
export default {
    computed: {

        selfRoute: function () {
            return this.$store.state.route;
        },
    },
    methods: {
        onSearch: function (val) {
            window.location.href = this.selfRoute.newsDetail + '?query=' + val
        },
    }
}
</script>

<style lang="scss" scoped></style>
