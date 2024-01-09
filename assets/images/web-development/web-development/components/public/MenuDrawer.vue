<template>
    <div>
        <a-drawer :placement="placement" :closable="true" class="menu-drawer" :visible="show" @close="onClose">
            <a-row class="">
                <a-col :xs="24" :sm="24" :md="24">
                    <a-menu style="width: 260px" :default-selected-keys="['1']" :open-keys.sync="openKeys" mode="inline"
                        @click="handleClick">
                        <a-menu-item key="buyCrypto">
                            <nuxt-link to="/p2p/buy-and-sell"> {{ $t('public.ph16') }} </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="market">
                            <nuxt-link to="/market">
                                {{ $t('public.ph17') }}
                            </nuxt-link>
                        </a-menu-item>
                        <a-sub-menu key="sub1" @titleClick="titleClick">
                            <span slot="title"><span>  {{ $t('public.ph24') }} </span></span>
                            <a-menu-item-group key="g1">
                                <a-menu-item key="2">
                                    <nuxt-link :to="'/deal-pro/btc_usdt?ctid=' + defaultCoinCtid">
                                        <p class="menu-list-text fw-5 mb-0">{{ $t('public.ph18') }}</p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="3">
                                    <nuxt-link :to="'/margin-pro/btc_usdt?ctid=' + defaultCoinCtid">
                                        <p class="menu-list-text fw-5">{{ $t('public.ph20') }}</p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="4">
                                    <nuxt-link to="/convert">
                                        <p class="menu-list-text fw-5">{{ $t('public.ph22') }}</p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="4">
                                    <nuxt-link to="/strategy-bot">
                                        <p class="menu-list-text fw-5">{{ $t('stratergybot.sb16') }}</p>
                                    </nuxt-link>
                                </a-menu-item>

                            </a-menu-item-group>
                        </a-sub-menu>
                        <a-menu-item key="futures">
                                    <nuxt-link :to="'/contract-pro/btc_yx?ctid=' + defaultCoinCtid  + '&contractType=1' ">
                                        {{ $t('public.ph25') }}
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="financial">
                            <nuxt-link to="/financial">
                                {{ $t('public.ph26') }}
                            </nuxt-link>
                        </a-menu-item>
                    </a-menu>
                </a-col>
            </a-row>
        </a-drawer>
    </div>
</template>
<script>
import { btcCtid } from '~/plugins/constants';

export default {
    props: {
        type: {
            type: String,
            default: null,
        },
        show: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            placement: 'left', hoverKey: -1,
            current: ['mail'],
            openKeys: ['sub1'],
        }
    },

    computed: {
        defaultCoinCtid() {
            return btcCtid
        }
    },
    watch: {
        openKeys(val) {
             //console.log('openKeys', val);
        },
    },
    mounted() {

    },
    methods: {
        handleClick(e) {
             //console.log('click', e);
        },
        titleClick(e) {
             //console.log('titleClick', e);
        },
        onClose() {
            this.$emit('onClose', true)
        },
    },

}
</script>
<style lang="scss">
@import '@/assets/scss/pages/header/menu-drawer.scss';
</style>
