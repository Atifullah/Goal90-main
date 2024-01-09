<template>
    <div class="">
        <div id="black-header">
            <a-row :gutter="16" class="m-0 p-0 header-row">
                <a-col :xs="14" :sm="14" :md="14" :lg="4" :xl="3" :xxl="2" class="pr-0 pl-0">
                    <span class="header-logo">
                        <nuxt-link to="/">
                            <img src="/images/black-logo.svg" height="28" />
                        </nuxt-link>
                    </span>
                    <a-popover :title="false" trigger="hover" overlay-class-name="menu-popover promotion-popover"
                        placement="bottomLeft">
                        <template slot="content">
                            <span @mouseover="hoverKey = 35" @mouseleave="hoverKey = -1">
                                <a-row :gutter="16" class="">

                                    <a-col :lg="13" class="left-side pr-0">
                                        <p class="finance-txt fw-6 mb-0 py-4 pl-4">{{ $t('public.ph1') }}</p>

                                        <a-row>
                                            <a-col :lg="24" v-for="(list, key) in promotionList" :key="key">
                                                <div class="px-4 header-list">
                                                    <nuxt-link :to="list.link">
                                                        <a-row :gutter="16" class="user-sec1 pr-4">
                                                            <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">
                                                                <svg  class="svg-icon" width="17" height="17">
                                                               <use :xlink:href="`/images/svg/sprite.svg#${list.img}`"></use>
                                                               </svg>  
                                                                </a-col>
                                                            <a-col :xs="20" :sm="20" :md="20" :lg="20">
                                                                <p class="mb-0 promotion-title fw-5">{{ list.title }}</p>
                                                                <span class="promotion-desc-txt fw-5">
                                                                    {{ list.desc }}
                                                                </span>
                                                            </a-col>
                                                        </a-row>
                                                    </nuxt-link>
                                                    <a-divider v-if="key != 4" class="my-0 header-divider" />
                                                </div>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :lg="11" class="pl-0 financial-sec-tab">
                                        <p class="finance-txt fw-6 mb-0 py-4 pl-4">{{ $t('public.ph2') }}</p>

                                        <div class="px-4 header-list pl-4">
                                            <nuxt-link :to="{ path: '/contract/data', query: { tab: 1 } }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">            
                                                            <svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#settlement-data-icon"></use>
                                                               </svg></a-col>
                                                    <a-col :xs="20" :sm="20" :md="20" :lg="20" class="pr-0">

                                                        <p class="promotion-title fw-5 mb-0">{{ $t('public.ph3') }}</p>
                                                        <span class="promotion-desc-txt fw-5">{{ $t('public.ph4') }}</span>

                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />

                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="{ path: '/contract/data', query: { tab: 2 } }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">
                                                        <svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#settlement-logs-icon"></use>
                                                               </svg>
                                                    </a-col>
                                                    <a-col :xs="20" :sm="20" :md="20" :lg="20" class="pr-0">

                                                        <p class="promotion-title fw-5 mb-0">{{ $t('public.ph5') }}</p>
                                                        <span class="promotion-desc-txt fw-5">{{ $t('public.ph6') }}</span>

                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />

                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="{ path: '/contract/data', query: { tab: 3 } }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">
                                                        <svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#funding-rate-icon"></use>
                                                               </svg>
                                                            </a-col>
                                                    <a-col :xs="20" :sm="20" :md="20" :lg="20" class="pr-0">

                                                        <p class="promotion-title fw-5 mb-0">{{ $t('public.ph7') }}</p>
                                                        <span class="promotion-desc-txt fw-5">{{ $t('public.ph8') }}</span>

                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                        </div>
                                    </a-col>
                                </a-row>
                            </span>
                        </template>
                        <div class="logo1-icon-img" @mouseover="hoverKey = 35" @mouseleave="hoverKey = -1">
                            <img :src="hoverKey == 35 ? '/images/category-active.svg' : '/images/white-category.svg'" 
                                class="pointer" />
                        </div>
                    </a-popover>
                </a-col>
                <a-col :xs="4" :sm="4" :md="4" :lg="9" :xl="11" :xxl="13" class="header-menu pl-3">
                    <a-menu v-model="current" mode="horizontal">
                        <a-menu-item key="buyCrypto">
                            <nuxt-link to="/p2p/buy-and-sell"> {{ $t('public.ph16') }} </nuxt-link>
                            <!-- <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                overlay-class-name="menu-popover">
                                <template slot="content">
                                    <span class="icon-img" @mouseover="hoverKey = 23" @mouseleave="hoverKey = -1">
                                        <div class="px-4 header-list">
                                            <nuxt-link
                                                :to="{ path: '/p2p/buy-and-sell', query: { direction: 1, tabkey: 1 } }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/express.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('public.ph9') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph10') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link
                                                :to="{ path: '/p2p/buy-and-sell', query: { direction: -1, tabkey: 2 } }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/bankaccount.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">P2P</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph11') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link
                                                :to="{ path: '/p2p/buy-and-sell', query: { direction: 1, tabkey: 3 } }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/third-party.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('public.ph12') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph13') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link
                                                :to="{ path: '/p2p/buy-and-sell', query: { direction: 1, tabkey: 4 } }">
                                                <a-row :gutter="16" class="user-sec1 pb-3">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/banktransfer.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('public.ph14') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph15') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                        </div>
                                    </span>
                                </template>
                                <div class="icon-img" @mouseover="hoverKey = 23" @mouseleave="hoverKey = -1"
                                    :class="hoverKey == 23 ? 'active-up-arrow' : ''">
                                    {{ $t('public.ph16') }}
                                    <img
                                        :src="hoverKey == 23 ? '/images/up-active-arrow.svg' : '/images/white-down-arrow.svg'" />
                                </div>
                            </a-popover> -->
                        </a-menu-item>
                        <a-menu-item key="market">
                            <nuxt-link to="/market">
                                {{ $t('public.ph17') }}
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="trade" @mouseover="hoverKey = 22" @mouseleave="hoverKey = -1">
                            <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                overlay-class-name="menu-popover">
                                <template slot="content">
                                    <span class="icon-img" @mouseover="hoverKey = 22" @mouseleave="hoverKey = -1">
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="'/deal-pro/btc_usdt?ctid=' + defaultCoinCtid">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img :src="'/images/spot.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('public.ph18') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph19') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="'/margin-pro/btc_usdt?ctid=' + defaultCoinCtid">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img :src="'/images/margin.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('public.ph20') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph21') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link to="/convert">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img :src="'/images/convert.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('public.ph22') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph23') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />

                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link to="/strategy-bot">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/strategy-bot-header.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('stratergybot.sb16') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('public.ph70') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />

                                        </div>
                                        <div class="px-4 header-list" v-if="!environment">
                                            <a :href="demoTrade">
                                                <a-row :gutter="16" class="user-sec1 pb-3">
                                                    <a-col :lg="4" class="pt-1"><img :src="'/images/demo-trade.svg'"
                                                            height="17px" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('deposit.dc10') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('deposit.dc11') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </a>
                                        </div>
                                        <div class="px-4 header-list" v-else>
                                            <a href="https://bitnasdaq.com/deal-pro/btc_usdt?ctid=1575964013659730564">
                                                <a-row :gutter="16" class="user-sec1 pb-3">
                                                    <a-col :lg="4" class="pt-1"><img :src="'/images/demo-trade.svg'"
                                                            height="17px" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">{{ $t('deposit.dc13') }}</p>
                                                        <span class="menu-sub-txt fw-5">{{ $t('deposit.dc14') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </a>
                                        </div> 
                                    </span>
                                </template>
                                <div class="icon-img" @mouseover="hoverKey = 22" @mouseleave="hoverKey = -1"
                                    :class="hoverKey == 22 ? 'active-up-arrow' : ''">
                                    {{ $t('public.ph24') }}
                                    <img
                                        :src="hoverKey == 22 ? '/images/up-active-arrow.svg' : '/images/white-down-arrow.svg'" />
                                </div>
                            </a-popover>
                        </a-menu-item>
                        <a-menu-item key="futures">
                            <nuxt-link :to="'/contract-pro/btc_yx?ctid=' + defaultCoinCtid  + '&contractType=1' ">
                                {{ $t('public.ph25') }}
                            </nuxt-link>
                        </a-menu-item>
                        <!-- <a-menu-item key="play-card">
                            <a href="javascript:;" @click="redirectTo('/play-card')">
                                {{ $t('home.headBull') }}
                            </a>
                        </a-menu-item> -->
                        <a-menu-item key="financial">
                            <nuxt-link to="/financial">
                                {{ $t('public.ph26') }}
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="buybnq">
                            <nuxt-link to="/buy-bnq">
                                <!-- {{ $t('public.ph17') }} -->{{$t('deal.buy')}} BNQ
                            </nuxt-link>
                        </a-menu-item>
                    </a-menu>
                </a-col>
                <a-col :xs="8" :sm="8" :md="9" :lg="11" :xl="10" :xxl="9" align="end" class="right-side-icons">
                    <div style="display:flex; justify-content:flex-end; align-items:center;">
                        <div v-if="!$store.state.hex_uid.value" class="mr-1">
                            <a-button type="default" class="login-btn fw-5 mr-1 header-menu"><nuxt-link to="/login">{{
                                $t('public.ph27')
                            }}</nuxt-link></a-button><a-button type="primary"
                                class="register fw-5 header-menu"><nuxt-link to="/register">{{ $t('public.ph28')
                                }}</nuxt-link></a-button>
                        </div>
                        <div v-else>

                            <a href="https://bitnasdaq.com/deal-pro/btc_usdt?ctid=1575964013659730564"
                                class="pt-2 pr-3 col-left-space wallet fw-5" v-if="environment"> {{$t('deposit.dc13')}}</a>

                            <span class="wallet fw-5 header-menu">
                                <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                    overlay-class-name="menu-popover wallet-popover" @mouseover="hoverKey = 20"
                                    @mouseleave="hoverKey = -1">
                                    <template slot="content" class="mt-4">
                                        <span class="icon-img" @mouseover="hoverKey = 20" @mouseleave="hoverKey = -1">
                                            <div class="px-4 header-list">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="20">
                                                        <p class="total-wallet fw-7 mb-1">{{ $t('public.ph29') }}</p>
                                                        <p class="wallet-usd fw-7 mb-2"
                                                            v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                                $store.getters.get_client_exchange_rate_name.mark
                                                            }} {{ $store.getters.get_client_exchange_rate('USDT',
    $userassets.totalassetes) }}</p>
                                                        <span class="wallet-usd fw-7" v-else>
                                                            {{ $store.getters.get_client_exchange_rate_name.mark }}
                                                            ******</span>
                                                    </a-col>
                                                    <a-col :lg="4" class="pt-2">

                                                            <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="toggleFundVisible">
                                    <use :xlink:href="$usersettings.moreconfig?.fundsvisible  ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
                                                    </a-col>
                                                </a-row>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/wallet">

                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1">     <svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#assets-icon"></use>
                                                               </svg></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph30') }}</p>
                                                            <span class="menu-sub-txt fw-5"
                                                                v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                                    $store.getters.get_client_exchange_rate_name.mark
                                                                }} {{ $store.getters.get_client_exchange_rate('USDT',
    $userassets.totalfunding)
}}</span>
                                                            <span class="menu-sub-txt fw-5" v-else>{{
                                                                $store.getters.get_client_exchange_rate_name.mark
                                                            }}
                                                                ******</span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">

                                                <nuxt-link to="/person/p2p">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1">
                                                            <svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#p2p-account-icon"></use>
                                                               </svg></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph33') }}</p>
                                                            <span class="menu-sub-txt fw-5"
                                                                v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                                    $store.getters.get_client_exchange_rate_name.mark
                                                                }} {{ $store.getters.get_client_exchange_rate('USDT',
    $userassets.totalctwoc) }}</span>
                                                            <span class="menu-sub-txt fw-5" v-else>{{
                                                                $store.getters.get_client_exchange_rate_name.mark
                                                            }}
                                                                ******</span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <!-- <div class="px-4 header-list">

                                                <nuxt-link to="/person/game-account">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/p2p-account.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('game.gameaccount') }}</p>
                                                            <span class="menu-sub-txt fw-5"
                                                                v-if="$usersettings.moreconfig?.fundsvisible">
                                                                {{
                                                                    $store.getters.get_client_exchange_rate_name.mark
                                                                }} {{$store.getters.get_client_exchange_rate('USDT',$userassets.totalgame)}}</span>
                                                            <span class="menu-sub-txt fw-5" v-else>{{
                                                                $store.getters.get_client_exchange_rate_name.mark
                                                            }}
                                                                ******</span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div> -->
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/margin">

                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/margin-account.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph31') }}</p>
                                                            <span class="menu-sub-txt fw-5"
                                                                v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                                    $store.getters.get_client_exchange_rate_name.mark
                                                                }} {{
    $store.getters.get_client_exchange_rate('USDT',
        $userassets.totalmargin)
}}</span>
                                                            <span class="menu-sub-txt fw-5" v-else>{{
                                                                $store.getters.get_client_exchange_rate_name.mark
                                                            }}
                                                                ******</span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/contract">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/future-account.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph32') }}</p>
                                                            <span class="menu-sub-txt fw-5"
                                                                v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                                    $store.getters.get_client_exchange_rate_name.mark
                                                                }} {{ $store.getters.get_client_exchange_rate('USDT',
    $userassets.totalcontract)
}}</span>
                                                            <span class="menu-sub-txt fw-5" v-else>{{
                                                                $store.getters.get_client_exchange_rate_name.mark
                                                            }}
                                                                ******</span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/rewards-hub">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1">
                                                            <svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#institution-icon"></use>
                                                               </svg>
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 pt-1">{{ $t('tableskeys.bh5') }}
                                                            </p>
                                                            <span class="menu-sub-txt fw-5"
                                                                v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                                    $store.getters.get_client_exchange_rate_name.mark
                                                                }} {{
    $store.getters.get_client_exchange_rate('USDT',
        $userassets.totalgift)
}}</span>
                                                            <span class="menu-sub-txt fw-5" v-else>{{
                                                                $store.getters.get_client_exchange_rate_name.mark
                                                            }}
                                                                ******</span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>


                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/wallet-history">
                                                    <a-row :gutter="16" class="user-sec1 pb-4">
                                                        <a-col :lg="4">       <svg  class="svg-icon" width="17" height="17">
                                        <use xlink:href="/images/svg/sprite.svg#billing-details-icon"></use>
                                        </svg></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 pt-1">{{ $t('public.ph34') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                            </span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                            </div>
                                        </span>
                                    </template>

                                    <div class="icon-img orderimg-icon" @mouseover="hoverKey = 20"
                                        @mouseleave="hoverKey = -1" :class="hoverKey == 20 ? 'active-up-arrow' : ''">
                                        {{ $t('public.ph35') }}
                                        <img
                                            :src="hoverKey == 20 ? '/images/up-active-arrow.svg' : '/images/white-down-arrow.svg'" />
                                    </div>

                                </a-popover>
                            </span>
                            <span class="wallet fw-5 ml-3 col-left-space header-menu" @mouseover="hoverKey = 21"
                                @mouseleave="hoverKey = -1">
                                <a-popover :title="false" trigger="hover" placement="bottom"
                                    overlay-class-name="menu-popover order-popover">
                                    <template slot="content">
                                        <span class="icon-img" @mouseover="hoverKey = 21" @mouseleave="hoverKey = -1">

                                            <div class="header-list px-4">
                                                <nuxt-link to="/p2p/orders-history">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/bankaccount.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">C2C</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t('public.ph44') }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4">
                                                <nuxt-link to="/person/financial-deal">

                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1">
                                                                <svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#financial-icon"></use>
                                                               </svg>
                                                            </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph36') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t('public.ph37') }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4 ">
                                                <nuxt-link to="/person/deal">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/spot.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph38') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t('public.ph39') }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4">
                                                <nuxt-link to="/person/margin/margin-deal">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/margin.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph40') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t('public.ph41') }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4">
                                                <nuxt-link to="/person/contract/contract-deal">

                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/future-account.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph42') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t('public.ph43') }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <!-- <div class="header-list px-4">
                                                <nuxt-link to="/person/game-history">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/bankaccount.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('game.game') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                The card opening is determined by the future block Hash,
                                                                which is completely credible!
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div> -->

                                            <div class="header-list px-4">
                                                <nuxt-link to="/person/convert-history">

                                                    <a-row :gutter="16" class="user-sec1 pb-3">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/convert.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">{{ $t('public.ph45') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t('public.ph46') }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                            </div>
                                        </span>
                                    </template>
                                    <div class="icon-img orderimg-icon" @mouseover="hoverKey = 21"
                                        @mouseleave="hoverKey = -1" :class="hoverKey == 21 ? 'active-up-arrow' : ''">
                                        {{ $t('public.ph47') }}
                                        <img
                                            :src="hoverKey == 21 ? '/images/up-active-arrow.svg' : '/images/white-down-arrow.svg'" />
                                    </div>
                                </a-popover>
                            </span>

                            <span class="ml-3 col-left-space">
                                <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                    overlay-class-name="menu-popover user-popover">
                                    <template slot="content">
                                        <span @mouseover="hoverKey = 26" @mouseleave="hoverKey = -1">
                                            <a-row class="verified-user px-3 col-alignment">
                                                <a-col :lg="5"><img
                                                        :src="$userinfo.avatar ? $userinfo.avatar : '/images/vector-img1.svg'"
                                                        height="43" width="43" class="circle-border" />
                                                    <div class="verified-user1">
                                                        <!-- <img :src="$userinfo.securitylevel > 1 ? '/images/verified-user1.svg' : '/images/unverified-user.svg'" /> -->
                                                            <svg width="16" height="18" class="svg-icon" >
                                                            <use :xlink:href="$userinfo.securitylevel > 1 ? '/images/svg/sprite.svg#verified-user1-icon' : '/images/svg/sprite.svg#unverified-user-icon'"></use>
                                                            </svg>
                                                    </div>
                                                </a-col>
                                                <a-col :lg="19" class="pl-1">
                                                    <p class="verified-email fw-7 mb-0" v-if="$userinfo.email">
                                                        {{ global_string_split($userinfo.email) }}</p>
                                                    <p class="mb-0 fw-7"
                                                        :class="$userinfo.securitylevel > 1 ? 'verified-txt' : 'gray-txt-color'">
                                                        {{ $userinfo.securitylevel > 1 ? 'Verified' : 'Unverified' }}
                                                    </p>
                                                </a-col>

                                            </a-row>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4">
                                                            <!-- <img :src="'/images/dashboard.svg'" /> -->
                                                            <svg width="15.75" height="15.75" class="svg-icon" >
                                                            <use xlink:href="/images/svg/sprite.svg#dashboard-icon"></use>
                                                            </svg>

                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">{{ $t('public.ph50') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/invitation">
                                                    <div class="header-list">
                                                        <a-row :gutter="16" class="user-sec col-alignment">
                                                            <a-col :lg="4"><svg  class="svg-icon" width="17" height="17">
                                                               <use xlink:href="/images/svg/sprite.svg#recommend-friend-icon"></use>
                                                               </svg></a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5 mb-0">{{ $t('public.ph51') }}
                                                                </p>
                                                                <span class="menu-sub-txt fw-5">
                                                                </span>
                                                            </a-col>
                                                        </a-row>
                                                    </div>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/authentication">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4">
                                                            <!-- <img :src="'/images/identity1.svg'" /> -->
                                                            <svg width="15.75" height="15.75" class="svg-icon" >
                                                            <use xlink:href="/images/svg/sprite.svg#identity1-icon"></use>
                                                            </svg>
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">{{ $t('public.ph52') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                            </span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/security">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4">
                                                            <!-- <img :src="'/images/security.svg'" /> -->
                                                            <svg width="15.75" height="15.75" class="svg-icon" >
                                                            <use xlink:href="/images/svg/sprite.svg#security-icon"></use>
                                                            </svg>
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">{{ $t('public.ph53') }}</p>
                                                            <span class="menu-sub-txt fw-5">
                                                            </span>
                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/api">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4"><img :src="'/images/api.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">API</p>

                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/login-history">
                                                    <a-row :gutter="16" class=" user-sec col-alignment">
                                                        <a-col :lg="4"><img :src="'/images/login-history.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0"> {{ $t('public.ph54') }}</p>

                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person">
                                                    <a-row :gutter="16" class="pb-4 pt-3 col-alignment">
                                                        <a-col :lg="4">
                                                            <!-- <img :src="'/images/logout-2.svg'" /> -->
                                                            <svg width="15.75" height="15.75" class="svg-icon" >
                                                            <use xlink:href="/images/svg/sprite.svg#logout-2-icon"></use>
                                                            </svg>
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0" @click="quitAccount">
                                                            <p class="menu-list-text fw-5 mb-0"> {{ $t('public.ph55') }}</p>

                                                        </a-col>
                                                    </a-row>

                                                </nuxt-link>
                                            </div>
                                        </span>
                                    </template>
                                    <span @mouseover="hoverKey = 26" @mouseleave="hoverKey = -1">
                                      
                                        <!-- <img :src="hoverKey == 26 ? '/images/user-active.svg' : '/images/white-user.svg'"
                                            class="pointer header-icon-img" /> -->
                                            <svg width="24" height="24" class="svg-icon pointer header-icon-img" >
      <use :xlink:href="hoverKey ==  26  ? '/images/svg/sprite.svg#user-active-icon':'/images/svg/sprite.svg#white-user-icon'"></use>
    </svg>
                                    </span>
                                </a-popover>
                            </span>
                            <span @mouseover="getListNotifications" class="ml-3 col-left-space header-menu">
                                <span @mouseover="hoverKey = 30" @mouseleave="hoverKey = -1">

                                    <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                        overlay-class-name="menu-popover notification-popover">
                                        <template slot="content">
                                            <span @mouseover="hoverKey = 30" @mouseleave="hoverKey = -1">
                                                <a-card class="notifications-card">
                                                    <a-row :gutter="16" class="user-sec col-alignment">

                                                        <a-col :lg="19">
                                                            <p class="mb-0 num-color fw-6">{{ $t('public.ph48') }} <a-badge
                                                                    :count="notificationCount" class="ml-1"></a-badge></p>
                                                        </a-col>
                                                        <a-col :lg="5" align="end">
                                                            <nuxt-link to="/all-notification">
                                                                <p class="mb-0 all-notification-view fw-5 pointer">
                                                                    {{ $t('public.ph49') }}</p>
                                                            </nuxt-link>
                                                        </a-col>

                                                    </a-row>
                                                </a-card>
                                                <div class="pb-3">
                                                    <a-row class="pt-2">
                                                        <a-col :lg="24" v-for="(list, key) in notifications" :key="key">
                                                            <div class="px-4 header-list">
                                                                <a-row :gutter="16" class="user-sec1">
                                                                    <a-col :lg="3" class="pt-1"><img
                                                                            src="/images/notification-icon1.svg" /></a-col>
                                                                    <a-col :lg="20">
                                                                        <span class="pointer" @click="goTo(list.typeid)">
                                                                            <p class="mb-1 view-txt fw-5">{{ list.title }}
                                                                            </p>
                                                                            <p
                                                                                class="view-task fw-5 mb-0 truncateLongTexts">
                                                                                {{
                                                                                    list.content
                                                                                }}</p>
                                                                            <p
                                                                                class="view-task fw-5 mb-0 truncateLongTexts">
                                                                                {{
                                                                                    global_get_local_time(list.createtime).format('HH:mm:ss')
                                                                                }}</p>
                                                                        </span>
                                                                    </a-col>
                                                                </a-row>
                                                                <a-divider v-if="key != 4" class="my-0 header-divider" />

                                                            </div>
                                                        </a-col>
                                                    </a-row>
                                                </div>
                                            </span>
                                        </template>
                                        <span @mouseover="hoverKey = 30" @mouseleave="hoverKey = -1">
                                            <img :src="hoverKey == 30 ? '/images/notification-active.svg' : '/images/white-notification.svg'"
                                                class="pointer header-icon-img" />
                                        </span>
                                    </a-popover>
                                </span>
                            </span>
                        </div>
                        <div class="list-sub-menu">
                            <span @mouseover="hoverKey = 27" @mouseleave="hoverKey = -1"
                                class="ml-3 col-left-space header-menu">
                                <a-popover :title="false" trigger="hover" placement="bottom"
                                    overlay-class-name="menu-popover download-popover">
                                    <template slot="content">
                                        <span @mouseover="hoverKey = 27" @mouseleave="hoverKey = -1">
                                            <div class="text-center">
                                                <img src="/images/bitnasdaqapk.png" class="mt-3" height="118px" />

                                                <a :href="androidLink" target="_blank"> <a-button
                                                        class="cancel-outline-btn fw-5 mt-2 download-app-btn mb-3" block>

                                                        {{ $t('depositModal.dm12') }}
                                                    </a-button></a>
                                            </div>
                                        </span>
                                    </template>
                                    <span @mouseover="hoverKey = 27" @mouseleave="hoverKey = -1">
                                        <img :src="hoverKey == 27 ? '/images/download-active.svg' : '/images/white-download.svg'"
                                            class="pointer header-icon-img" />
                                    </span>
                                </a-popover>
                            </span>
                            <span @mouseover="hoverKey = 24" @mouseleave="hoverKey = -1" class="ml-3">
                                <img :src="hoverKey == 24 ? '/images/global-active.svg' : '/images/white-global.svg'"
                                    class="pointer header-icon-img" @click="handleLanguageModal()" />
                            </span>
                            <span @mouseover="hoverKey = 25" @mouseleave="hoverKey = -1" class="ml-3">
                                <img :src="hoverKey == 25 ? '/images/exchange-active.svg' : '/images/white-exchange.svg'"
                                    class="pointer header-icon-img" @click="handleExchangeModal()" />
                            </span>
                        </div>
                    </div>
                </a-col>
                <a-col :md="1" :sm="2" :xs="2" class="drawer-btn pt-1" align="right">
                    <a-icon type="menu-fold" @click="toggleDrawer" />
                </a-col>
            </a-row>
        </div>

        <template v-if="routeName == 'p2p-merchant'">
            <div class="merchant-header">
                <div class="main-content">
                    <a-row :gutter="16" class="py-3">
                        <a-col :lg="24" class="pt-2">
                            <p class="merchant-heading fw-5 mb-0">{{ $t('public.ph57') }}</p>
                            <span class="merchant-desc fw-5">{{ $t('public.ph58') }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>
        <template
            v-if="routeName == 'p2p-buy-and-sell' || routeName == 'p2p-payment' || routeName == 'p2p-trading-faqs' || routeName == 'p2p-video-tutorial' || routeName == 'p2p-beginners-guide' || routeName == 'p2p-p2p-account' || routeName == 'p2p-orders-history' || routeName == 'p2p-in-process' || routeName == 'p2p-orders-history-id'">
            <div class="p2p-account-header">
                <div class="main-content">
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <p class="p2p-account-heading fw-5 mb-1">{{ $t('public.ph59') }}</p>
                            <span class="p2p-account-desc fw-5 mr-5">{{ $t('public.ph60') }} <br />
                                {{ $t('public.ph61') }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>

        <template v-if="routeName == 'p2p-p2p-account-buy-method' || routeName == 'p2p-p2p-account-sell-account'">
            <div class="p2p-account-header p2p-all-header">
                <div class="main-content">
                    <a-row :gutter="24">
                        <a-col :lg="12" class="pt-2">
                            <p class="p2p-account-heading fw-5 mb-1">{{ $t('public.ph59') }}</p>
                            <span class="p2p-account-desc fw-5 mr-5">{{ $t('public.ph60') }} <br>{{ $t('public.ph61')
                            }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>

        <template v-if="routeName == 'p2p-my-ads' || routeName == 'p2p-post-new-add' || routeName == 'p2p-closed-ads'">
            <div class="p2p-myads-header">
                <div class="main-content">
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <p class="p2p-myads-heading fw-5 mb-0">{{ $t('public.ph62') }}</p>
                            <span class="p2p-myads-desc fw-5 mr-5">{{ $t('public.ph63') }}<br /> {{ $t('public.ph64')
                            }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>

        <template
            v-if="routeName == 'register' || routeName == 'login' || routeName == 'reset-password' || routeName == 'auth-verification' || routeName == 'auth'">
            <a-row class="verification-bg">
                <a-col :lg="24" align="center">
                    <p class="mb-0">
                        <img src="/images/lock.svg" class="lock-img" /> {{ $t('public.ph69') }}:<span
                            class="http-txt">https://</span><span class="BitNasdaq-txt">www.bitnasdaq.com</span>
                    </p>
                </a-col>
            </a-row>
        </template>
        <Language :isLanguage="isLanguage" :handleLanguageModal="handleLanguageModal" />
        <Exchange :isExchange="isExchange" :handleExchangeModal="handleExchangeModal" />
        <Notification :notificationModel="notificationModel" />
        <MenuDrawer :show="showMenuDrawer" @onClose="showMenuDrawer = false" />
    </div>
</template>

<script>
import MenuDrawer from './MenuDrawer.vue'
import Notification from '@/components/AllNotification/NotificationModal/Notification.vue'
// import ProfitCard from "../financial/ProfitCard.vue"
import lang from "./lang";
import exchange from "./exchange"
import crypto from "@/plugins/axios/crypto";
import { btcCtid, androidLink } from '~/plugins/constants';
import init from '~/init';
import { isTradeView } from '~/plugins/helpers';
export default {
    components: {
        // ProfitCard,
        Language: lang,
        Exchange: exchange,
        Notification,
        MenuDrawer
    },
    data() {
        return {
            notificationModel: false,
            showMenuDrawer: false,
            current: ['mail'],
            hoverKey: -1,
            promotionList: [
                {
                    title: this.$t('tableskeys.bh1'),
                    img: 'vip-plan-icon',
                    desc: this.$t('description.des1'),
                    link: '/vip-program'
                },
                {
                    title: this.$t("tableskeys.bh2"),
                    img: 'recommend-friend-icon',
                    desc: this.$t('description.des2'),
                    link: '/recommend-friend'

                },
                {
                    title: this.$t("tableskeys.bh3"),
                    img: 'agent-plan-icon',
                    desc: this.$t('description.des3'),
                    link: '/institution-service'

                },
                {
                    title: this.$t("tableskeys.bh4"),
                    img: 'reward-hub-icon',
                    desc: this.$t('description.des4'),
                    link: '/affiliate-program'

                },

                {
                    title: this.$t("tableskeys.bh5"),
                    img: 'institution-icon',
                    desc: this.$t('description.des5'),
                    link: '/rewards-hub'

                },

            ],
            notifications: [],
            notificationCount: 0,
            types: [
                {
                    typeid: 1,
                    route: 'person/wallet-history'
                },
                {
                    typeid: 2,
                    route: 'person/wallet-history'
                },
                {
                    typeid: 4,
                    route: '/person/login-history'
                },
                {
                    typeid: 9,
                    route: '/person/send-recieve-crypto/send-crypto'
                },
            ],
            isLanguage: false,
            isExchange: false,
        }
    },
    computed: {
        environment() {

            if (init.obj.server.port == 9088) {
                if (isTradeView(this)) {
                    return true
                }
            }
            return false
        },
        routeName() {
            return this.$route.name
        },
        defaultCoinCtid() {
            return btcCtid
        },
        androidLink: function () {
            return androidLink
        },
        demoTrade() {
            if (this.$userinfo.uid) {
                var loginkey = crypto.md5String(this.$userinfo.uid + this.$userinfo.secretkey);
                return "https://test.bitnasdaq.com/deal/btc_usdt?userid=" + this.$userinfo.uid + "&loginkey=" + loginkey + ""
            } else {
                return '/login?returnurl=' + this.$route.path
            }
        }
    },
    methods: {
        toggleDrawer() {
            //console.log('fsfg')
            // this.$root.$emit('toogle-drawer')
            this.showMenuDrawer = !this.showMenuDrawer
        },
        // async gotoDemoTrade() {
        //     if (this.$userinfo.uid) {
        //         var loginkey=crypto.md5String(this.$userinfo.uid+this.$userinfo.secretkey);
        //         this.$router.push("https://test.bitnasdaq.com/deal/btc_usdt?userid="+this.$userinfo.uid+"&loginkey="+loginkey+"");
        //     } else {
        //         this.$router.push('/login?returnurl=' + this.$route.path)
        //     }
        // },
        handleLanguageModal() {
            this.isLanguage = !this.isLanguage;
        },
        handleExchangeModal() {
            this.isExchange = !this.isExchange;
        },
        quitAccount() {
            this.$router.push("/");
            this.$store.commit("remove_user_info");
        },
        toggleFundVisible() {
            const _self = this;
            _self.$store.dispatch('user_user_settings_save', {
                moreConfig: {
                    fundsVisible: !_self.$usersettings.moreconfig.fundsvisible
                },
            }).then(({
                data
            }) => {
                if (data) {
                    this.global_refresh_user_settings();
                }
            })
        },
        goTo(type) {
            const typeFound = this.types.filter(item => item.typeid == type)
            if (typeFound.length > 0) {
                this.$router.push(typeFound[0].route)
            }

        },
        async getListNotifications() {
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('user_msg_notice_get', {
                    pageIndex: '1',
                    pageSize: '5'
                });
                if (data) {
                    _self.notifications = data.pagedata;
                    _self.notificationCount = data.totalitemcount
                }
                else {
                    _self.notifications = [];
                    _self.notificationCount = 0
                }


            } catch (error) {
                return false;
            }
        },

        redirectTo(to) {
            if (this.$userinfo.uid) {
                this.$router.push(to)
            } else {
                this.$router.push('/login?returnurl=' + this.$route.path)
            }
        }
    },
    mounted() {
        if (this.$userinfo.uid && !this.$userassets.totalassetes)
            this.global_refresh_user_assets()
        if (this.$userinfo.uid && !this.$usersettings.moreconfig)
            this.global_refresh_user_settings();
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/header/black-header.scss';
</style>
