<template>
    <div class="anonymous  " v-if="loading || !found">

        <div class="loadingPic deal" v-hex-loading="loading" v-if="loading"></div>

        <template v-if="!found">

            <div v-if="$userinfo.uid">
                <div class="anonymous-pic">
                    <img src="~/static/images/anonymous.svg" alt=""
                        v-if="$store.state.hex_client_background.active == 'day'" />
                    <img src="~/static/images/anonymous_black.svg" v-else alt="" />
                </div>
            </div>

            <div v-else class="islogin">
                <nuxt-link to="/login">{{ $t('home.headLogin') }}</nuxt-link>
                /
                <nuxt-link to="/register"> {{ $t('home.headRegister') }}</nuxt-link>
            </div>

        </template>

    </div>
</template>

<script>
export default {
    props: {
        loading: Boolean,
        found: Boolean
    }
}
</script>

<style lang="scss" scoped></style>