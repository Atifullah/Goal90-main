<template>
  <div>
    <a-card :bordered="false" class="market-detail-bg">
      <div class="main-content">
        <a-breadcrumb separator=">" class="pt-4 mt-3">
          <a-breadcrumb-item>
            <nuxt-link to="/">{{ $t("extra.extra22") }}</nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <nuxt-link :to="selfRoute.market">{{
              $t("strtable.stab2")
            }}</nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item href="">
            {{ currencyDetail.fullname }} {{ $t("marketdetail.markdet19") }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <!-- record.row. -->

        <a-row :gutter="16" class="mt-4 pt-2">
          <a-col :lg="16">
            <a-card class="left-side-card" :bordered="false">
              <a-row :gutter="16" class="col-alignment mt-2">
                <a-col :lg="12">
                  <p class="currency-heading fw-5 mb-0">
                    <img :src="spotMarket.logo" class="mr-1 mb-1" height="35" />
                    {{ currencyDetail.fullname }}
                    <span v-if="currencyData.currencyname" class="currency-name fw-5 ml-2 text-uppercase">
                      ({{ currencyData.currencyname }})
                    </span>
                  </p>
                </a-col>
                <a-col :lg="12" align="end" class="pr-4">
                  <a-popover :title="false" overlayClassName="market-socialicon-popover">
                    <template slot="content">
                      <SocialLinks />
                    </template>
                    <img src="/images/export.svg" class="mr-2 mb-1" />
                  </a-popover>

                  <img src="/images/star.svg" class="mr-2 mb-2 cursor" @click="favorite()" v-if="!spotMarket.self" />

                  <img src="/images/orange-star.svg" class="mr-2 mb-2 cursor" @click="favorite()" v-else />

                  <FiatCurrenciesList />
                </a-col>
              </a-row>
              <a-row :gutter="16" class="mt-1 left-mt">
                <a-col :lg="24">
                  <p class="last-price-heading fw-5 mb-0 col-alignment">
                    {{ lastPrice }}

                    <!-- <span class="grey-active busd-heading fw-5">
                                            ≈
                                            {{ $store.getters.get_client_exchange_rate_name.mark }}
                                            {{ fiatPrice }}
                                        </span> -->

                    <span class="busd-heading fw-5 pt-2 mt-1 ml-1"
                      :class="percentage > 0 ? 'success-active' : 'red-active'">
                      {{ percentage > 0 ? "+" + percentage : percentage }}%

                      <img :src="percentage < 0
                        ? '/images/red-up-arrow.svg'
                        : '/images/green-blue-up-arrow.svg'
                        " height="12" width="auto" class="ml-1 mb-1" />
                    </span>
                  </p>
                </a-col>
              </a-row>
              <a-row :gutter="16" class="pb-3">
                <a-col :lg="24" class="p-0">
                  <a-tabs v-model="tab" @change="changeGraphTab" class="graph-tabs">
                    <a-tab-pane key="0" tab="5 Min" :disabled="fetchingGraphData">
                    </a-tab-pane>
                    <a-tab-pane key="1" tab="30 Min" :disabled="fetchingGraphData">
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="1 Hour" :disabled="fetchingGraphData">
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
                <a-col :xl="24">
                  <div id="Chart" class="currency-curve">
                    <AppLoading height="100%" v-if="fetchingGraphData" />
                    <div id="echarts" class="echarts" v-if="!fetchingGraphData"></div>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :lg="24">
                  <p class="mt-4 mb-4 pb-2 market-statistics fw-5">
                    Market Statistics
                  </p>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :lg="4">
                  <p class="currency-sub-heading fw-4 mb-0">
                    {{ $t("marketdetail.markdet5") }} (USD)
                  </p>
                  <p class="currency-price fw-6">
                    {{ numFormatter(currencyData.marketcapacity) }}
                  </p>
                </a-col>
                <a-col :lg="4">
                  <p class="currency-sub-heading fw-4 mb-0">
                    {{ $t("marketdetail.markdet6") }}
                  </p>
                  <p class="currency-price fw-6">
                    {{ numFormatter(currencyData.marketcapacity) }}
                  </p>
                </a-col>
                <a-col :lg="4">
                  <p class="currency-sub-heading fw-4 mb-0">
                    {{ $t("marketdetail.markdet7") }}
                  </p>
                  <p class="currency-price fw-6">
                    {{ numFormatter(currencyData.circulation) }}
                  </p>
                </a-col>
                <a-col :lg="4">
                  <p class="currency-sub-heading fw-4 mb-0">
                    {{ $t("marketdetail.markdet8") }}
                  </p>
                  <p class="currency-price fw-6">
                    {{ numFormatter(currencyData.maximumsupply) }}
                  </p>
                </a-col>
                <a-col :lg="4">
                  <p class="currency-sub-heading fw-4 mb-0">
                    {{ $t("marketdetail.markdet17") }}
                  </p>
                  <p class="currency-price fw-6">
                    {{ currencyData.alltimehigh }}
                  </p>
                </a-col>
                <a-col :lg="4">
                  <p class="currency-sub-heading fw-4 mb-0">
                    {{ $t("marketdetail.markdet9") }}
                  </p>
                  <p class="currency-price fw-6">{{ currencyData.iorder }}</p>
                </a-col>
              </a-row>
              <a-row :gutter="16" class="mt-3">
                <a-col :lg="24">
                  <a-tabs>
                    <a-tab-pane key="0" :tab="$t('tabkeys.tab65')">
                      <p class="market-statistics fw-5 mb-2 mt-4 pt-2">
                        {{ $t("marketdetail.markdet10") }}  <span class="currency-name fw-5 ml-2 text-uppercase">
                      ({{ currencyData.currencyname }})
                    </span>
                      </p>
                      <div class="content-detail mb-3">
                        <div v-if="!showFullContent" class="market-detail-txt fw-4">
                          {{ currencyDescription.substring(0, 800) }}
                          <span class="more-less">
                            <a href="javascript:;" @click="showFullContent = true">
                              <img src="/images/show-more.svg" class="pl-2" />

                              {{ $t("noti_fication.noti5") }}
                            </a>
                          </span>
                        </div>
                        <div v-else>
                          <div v-html="currencyDetail.remark" class="market-detail-txt fw-5"></div>
                          <span class="more-less less">
                            <a href="javascript:;" @click="showFullContent = false">
                              <img src="/images/show-less.svg" class="pl-2" />
                              {{ $t("marketdetail.markdet16") }}
                            </a>
                          </span>
                        </div>
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="1" :tab="$t('tabkeys.tab57')">
                      <a-table :columns="tradeColumns" :pagination="false" class="mt-4" :data-source="tradeData"
                        :rowKey="(record, index) => index">
                        <div slot="markettitle" slot-scope="text, row">
                          <div class="currency-sub-heading fw-7 mb-0" v-html="row.markettitle"></div>
                        </div>

                        <div slot="price" slot-scope="text, row">
                          <p class="mb-0">
                            {{
                              global_get_tofixed(
                                row.c,
                                global_get_decimal(row.symble).p
                              )
                            }}
                          </p>
                          <img class="equivalent" src="/images/delta.svg" />
                          <span>
                            {{
                              $store.getters.get_client_exchange_rate_name.mark
                            }}
                            {{ getClientExchangeRate(row) }}
                          </span>
                        </div>

                        <div slot="change" slot-scope="text, row">
                          <span :class="row.c - row.o < 0
                            ? 'red-active'
                            : 'success-active'
                            ">{{ getlimitprice(row) }}%<img :src="limitPrice(row.c, row.o) < 0
    ? '/images/red-up-arrow.svg'
    : '/images/green-blue-up-arrow.svg'
    " height="12" width="auto" class="ml-1 mb-1" /></span>
                        </div>
                        <span slot="action" slot-scope="text, row">
                          <nuxt-link :to="row.redirecTo">
                            <a-button class="outline-btn fw-5 trade-btn">
                              {{ $t("public.ph24") }}
                            </a-button>
                          </nuxt-link>
                        </span>
                      </a-table>
                    </a-tab-pane>
                    <a-tab-pane key="2" :tab="$t('tabkeys.tab66')">
                      <div class="pt-4">
                        <span @mouseover="hoverKey = 4" @mouseleave="hoverKey = -1">
                          <a class="p-2 link-social-icon fw-5" target="_blank" :href="currencyInfo.github">Github
                            <img :src="hoverKey == 4
                              ? '/images/link1-active.svg'
                              : '/images/link1.svg'
                              " /></a></span>
                        <span @mouseover="hoverKey = 5" @mouseleave="hoverKey = -1">
                          <a class="p-2 link-social-icon fw-5" target="_blank" :href="currencyInfo.twitter">Twitter
                            <img :src="hoverKey == 5
                              ? '/images/link1-active.svg'
                              : '/images/link1.svg'
                              " /></a></span>

                        <span @mouseover="hoverKey = 6" @mouseleave="hoverKey = -1">
                          <a class="p-2 link-social-icon fw-5" target="_blank" :href="currencyInfo.blockchain">Blockchain
                            <img :src="hoverKey == 6
                              ? '/images/link1-active.svg'
                              : '/images/link1.svg'
                              " /></a></span>
                        <span @mouseover="hoverKey = 7" @mouseleave="hoverKey = -1">
                          <a class="p-2 link-social-icon fw-5" target="_blank" :href="currencyInfo.website">Eebsite
                            <img :src="hoverKey == 7
                              ? '/images/link1-active.svg'
                              : '/images/link1.svg'
                              " /></a>
                        </span>
                        <span @mouseover="hoverKey = 8" @mouseleave="hoverKey = -1">
                          <a class="p-2 link-social-icon fw-5" target="_blank" :href="currencyInfo.whitepaper">White Paper
                            <img :src="hoverKey == 8
                              ? '/images/link1-active.svg'
                              : '/images/link1.svg'
                              " /></a>
                        </span>
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
              </a-row>

              <a-row :gutter="16">
                <a-col :lg="24">
                  <a-card :bordered="false" class="mt-4 news-details">
                    <p class="top-news mb-4 fw-5 mt-2">
                      {{ $t("marketdetail.markdet2") }}
                    </p>
                    <div class="news-tabs">
                      <div>
                        <a-radio-group default-value="all" button-style="solid" :disabled="loadingArticlesList"
                          @change="getNewsList" v-model="currentNewsChannel">
                          <a-radio-button value="all">
                            {{ $t("tabkeys.tab1") }}
                          </a-radio-button>
                          <a-radio-button :value="channel.id" v-for="(channel, channelIndex) in newsChannels"
                            v-bind:key="channelIndex">
                            {{ channel.channelname }}
                          </a-radio-button>
                        </a-radio-group>
                      </div>

                      <AppLoading v-if="loadingArticlesList" height="50vh" />

                      <template v-else>
                        <a-row :gutter="24" class="mt-4 pt-2">
                          <a-col class="mb-5" :lg="24" v-for="(news, key) in subItems" :key="key">
                            <a :href="news.articlehref" v-if="news.articlehref">
                              <BlogCardWithImage :news="news" />
                            </a>
                            <nuxt-link :to="news.redirectTo" v-else>
                              <BlogCardWithImage :news="news" />
                            </nuxt-link>
                            <!-- <div class="py-2">
                              <a-divider class="my-4" />
                            </div> -->
                          </a-col>
                        </a-row>
                      </template>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </a-card>
          </a-col>

          <a-col :lg="8" class="pl-5 detail-right-pl">
            <a-card class="right-side-card" :bordered="false">
              <a-card class="gray-card gray-card1">
                <a-row class="mb-4 pb-2">
                  <a-col :lg="12">
                    <a-button block class="gray-market-btn " :class="TradeTab?'active-btn':''" @click="TradeTab=1">
                      Buy
                    </a-button>
                    <!-- <p class="detail-heading fw-5 my-2">
                      {{ $t("marketdetail.markdet3") }}
                    </p> -->
                  </a-col>
                  <!-- <a-col :lg="8">
                    <a-button block class="gray-market-btn"> Trade </a-button>
                  </a-col> -->
                  <a-col :lg="12">
                    <a-button block class="gray-market-btn" :class="TradeTab?'':'active-btn'" @click="TradeTab=0">
                      Exchange
                    </a-button>
                  </a-col>
                </a-row>

                <a-form-model class="form-spacing" ref="convertForm" :model="input" label-align="left">
                  <a-card class="from-card">
                    <a-row :gutter="16" class="mb-3">
                      <a-col :lg="24">
                        <p class="mb-0 from-heading fw-7" v-if="TradeTab">
                          {{ $t("memberCenter.buy") }}
                        </p>
                        <p class="mb-0 from-heading fw-7" v-else>
                          {{ $t("labels.lbl14") }}
                    </p>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16" class="col-alignment">
                      <a-col :lg="24">
                        <a-form-model-item has-feedback prop="from" :colon="false" :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                        }">
                          <a-input type="number" v-model="input.from" placeholder="0" @change="onFromChange">
                            <div slot="suffix" class="ustd-list">
                              <p class="usdt-divider fw-5 mb-0">
                                <img src="/images/ustd-icon.svg" class="mr-2" height="20px" />USDT
                              </p>
                            </div>
                          </a-input>
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-card>

                  <a-row :gutter="16" class="my-3">
                    <a-col :lg="24">
                      <p class="limit-price fw-5 mb-0">
                        1 {{ currencyData.currencyname }}≈ $
                        {{
                          $store.getters.get_exchange_rate_by_name(
                            currencyData.currencyname,
                            "USDT"
                          )
                        }}
                      </p>
                    </a-col>
                  </a-row>
                  <a-card class="from-card">
                    <a-row :gutter="16" class="mb-3">
                      <a-col :lg="24">
                        <p class="mb-0 from-heading fw-7">
                          {{ $t("contract.price") }}
                        </p>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16" class="col-alignment">
                      <a-col :lg="24">
                        <a-form-model-item has-feedback prop="to" :colon="false" :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                        }">
                          <a-input type="number" v-model="input.to" placeholder="0" @change="onToChange">
                            <div slot="suffix" class="ustd-list">
                              <p class="usdt-divider fw-5 mb-0">
                                <img :src="spotMarket.logo" class="mr-2" height="20px" />{{ currencyData.currencyname }}
                              </p>
                            </div>
                          </a-input>
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-card>
<!--  -->
                  <!-- <a-card class="from-card mt-4">
                    <p class="mb-3 from-heading fw-7">
                          {{ $t("labels.lbl14") }}
                    </p>
                    <p class="mb-0 btc-icon-heading text-black fw-5"><img src="/images/ustd-icon.svg" class="mr-2" height="24px" /> BTC</p>
                    </a-card>
                    <a-row class="my-4">
                                    <a-col :lg="24" class="text-center">
                                    
                                        <span @mouseover="hoverKey = 3" @mouseleave="hoverKey = -1">
                                            <img :src="hoverKey == 3 ? '/images/convert-swap-active.svg' : '/images/convert-swap.svg'"
                                                class="pointer"  />
                                        </span>
                                    </a-col>
                                </a-row>
                                <a-card class="coin-from-card">
                                  <p class="mb-0 from-heading fw-7">
                                    {{ $t("labels.lbl15") }}
                        </p>
                                  <a-row :gutter="16" class="col-alignment">
                      <a-col :lg="24">
                        <a-form-model-item has-feedback prop="to" :colon="false" >
                          <a-select default-value="lucy" style="width:100%" class="select-coin" @change="handleChange">
                            <a-select-option value="jack">
                              Jack
                            </a-select-option>
                            <a-select-option value="lucy">
                              <img src="/images/ustd-icon.svg" class="mr-2" height="24px" />  Lucy
                            </a-select-option>
                            <a-select-option value="disabled" disabled>
                              Disabled
                            </a-select-option>
                            <a-select-option value="Yiminghe">
                              yiminghe
                            </a-select-option>
                          </a-select>
                        </a-form-model-item>
                        </a-col>
                        </a-row>
                                  </a-card>
                  <a-row :gutter="16" class="mt-4">
                    <a-col :lg="24">
                      <nuxt-link :to="spotMarket.redirecTo">
                        <a-button class="market-trade-btn fw-5" block> {{ $t('legalSet.exchange') }}
                  </a-button>
                      </nuxt-link>
                    </a-col>
                  </a-row> -->
                  <!--  -->
                  <a-row :gutter="16" class="mt-4">
                    <a-col :lg="24">
                      <nuxt-link :to="spotMarket.redirecTo" v-if="TradeTab">
                        <a-button class="market-trade-btn fw-5" block>{{
                          $t("marketdetail.markdet15")
                        }} {{ currencyDetail.fullname }} <span class="ml-2 text-uppercase">
                      ({{ currencyData.currencyname }})
                    </span>
                  </a-button>
                      </nuxt-link>
                      <a-button v-else class="market-trade-btn fw-5" block @click="goToConvert()"> {{ $t('legalSet.exchange') }}
                  </a-button>
                    </a-col>
                  </a-row>
                </a-form-model>
              </a-card>
              <a-card class="gift-card mt-3">
                <p class="mb-2 bitcoin-today fw-5">
                  How do you feel about Bitcoin today?
                </p>
                <p class="vote-community mb-4">
                  Vote to see what the community thinks
                </p>
                <a-row>
                  <a-col :lg="12">
                    <div class="vote-button">
                      <button class="item good cursor" v-if="isUserVotedToday">{{ (supportPercentagex).toFixed(2)
                      }}%</button>
                      <button class="item good cursor" v-else data-text="Bullish"
                        @click="handleBullishClick(true, false)"></button>
                    </div>
                  </a-col>
                  <a-col :lg="12">
                    <div class="red-button">
                      <button class="item good cursor" v-if="isUserVotedToday">{{ (notSupportPercentagex).toFixed(2)
                      }}%</button>
                      <button class="item good cursor" v-else data-text="Bearish"
                        @click="handleBullishClick(false, true)">
                      </button>
                    </div>
                  </a-col>
                </a-row>

              </a-card>
              <a-card class="gray-card mt-3">
                <a-tabs default-active-key="0" v-model="activeTab1" class="news-tabs">
                  <a-tab-pane key="0" :tab="$t('tabkeys.tab22')">
                    <SpotMarket :getClientExchangeRate="getClientExchangeRate" :marketdata="marketData" tab="0" key="0" />
                  </a-tab-pane>
                  <a-tab-pane key="1" :tab="$t('tabkeys.tab23')">
                    <SpotMarket :getClientExchangeRate="getClientExchangeRate" :marketdata="marketData" tab="1" key="1" />
                  </a-tab-pane>
                  <a-tab-pane key="2" :tab="$t('tabkeys.tab24')">
                    <SpotMarket :getClientExchangeRate="getClientExchangeRate" :marketdata="marketData" tab="2" key="2" />
                  </a-tab-pane>
                </a-tabs>
              </a-card>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { currencyIntroductionId,bitnasdaqNewsChannelId } from "~/plugins/constants";
import { mapActions, mapGetters, mapState } from "vuex";
import FiatCurrenciesList from "../App/FiatCurrenciesList.vue";
import AppLoading from "../AppLoading.vue";
import SpotMarket from "./SpotMarket.vue";
import BlogCardWithImage from "../Blog/BlogCardWithImage.vue";
import SocialLinks from "../App/SocialLinks.vue";

export default {
  components: {
    FiatCurrenciesList,
    AppLoading,
    SpotMarket,
    BlogCardWithImage,
    SocialLinks,
  },

  data() {
    return {
      TradeTab:1,
      currencies: [],
      supportPercentagex: 0,
      notSupportPercentagex: 0,
      selectedCurrency: "usdt",
      selectedCurrency1: "usdt",
      fiats: [],
      activeTab1: "0",
      marketData: [],
      currentNewsChannel: "all",
      dataColor: "#0ECB81",
      showFullContent: false,

      assets: [],
      convertToAssets: [],
      flashData: [],
      currencyFrom: "USDT",
      hoverKey: -1,
      currencyTo: "",
      fminamount: "0",
      fmaxamount: "0",
      tminamount: "0",
      tmaxamount: "0",
      model: false,
      convertData: null,
      settings: {
        fname: "",
        tname: "",
      },
      canUse: "0",
      equalsTo: 0,
      tab: "0",
      realtime_rate: 0,
      echarts_xdatas: [],
      echarts_ydatas: [],
      echart_min: "0",
      echart_max: "0",
      input: {
        from: "",
        to: "",
      },
      preview: false,
      tradeColumns: [
        {
          title: this.$t("titles.title20"),
          dataIndex: "markettitle",
          scopedSlots: { customRender: "markettitle" },
          width: 140,
          key: "title",
        },

        {
          title: this.$t("titles.title21"),
          dataIndex: "c",
          scopedSlots: { customRender: "price" },
          width: 140,
          key: "price",
        },
        {
          title: this.$t("titles.title22"),
          dataIndex: "updownchange",
          scopedSlots: { customRender: "change" },
          width: 140,
          key: "change",
        },
        {
          title: this.$t("titles.title23"),
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          align: "end",
          width: 20,
          key: "action",
        },
      ],
      bullishBearishArticleId: '',
      isUserVotedToday: false,

      setValidation: {
        rules: {
          from: [
            {
              required: true,
              message: this.$t("messages.msg16"),
            },
            {
              validator: async (rule, value, callback) => {
                if (this.input.from === "") {
                  callback(new Error(this.$t("messages.msg16")));
                } else {
                  if (parseFloat(this.input.from) < this.fminamount) {
                    callback(
                      new Error(`${$t("errors.err1")} ${this.fminamount}`)
                    );
                  } else if (parseFloat(this.input.from) > this.fmaxamount) {
                    callback(
                      new Error(`${$t("errors.err2")} ${this.fmaxamount}`)
                    );
                  } else if (parseFloat(this.input.from) > this.canUseFrom) {
                    callback(new Error(`${$t("errors.err3")}`));
                  } else {
                    callback();
                  }
                }
              },
              trigger: "blur",
            },
          ],
          to: [
            {
              validator: async (rule, value, callback) => {
                if (this.input.to === "") {
                  callback(new Error(this.$t("messages.msg16")));
                } else {
                  if (parseFloat(this.input.to) < this.tminamount) {
                    callback(
                      new Error(`${$t("errors.err13")} ${this.tminamount}`)
                    );
                  } else if (parseFloat(this.input.to) > this.tmaxamount) {
                    callback(
                      new Error(`${$t("errors.err2")} ${this.tmaxamount}`)
                    );
                  } else {
                    callback();
                  }
                }
              },
              trigger: "blur",
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters("market", [
      "getCurrencyDetail",
      "getCurrencyGraphData",
      "getSpotMarkets",
      "getCurrencySpotMarket",
      "getCurrencyMarginMarket",
      "getCurrencyFutureMarket",
      "getCurrencyTradeData",
      "getFavoriteList",
    ]),
    ...mapGetters("article", ["getArticleChildren", "getSubItems"]),
    ...mapGetters("general", [
      "addOrRemovingFromFavorite",
      "fetchingGraphData",
      "loadingArticlesList",
    ]),
    ...mapState(['symbleinfos']),
    currencyDetail() {
      return this.getCurrencyDetail;
    },
    currencyData() {
      const detail = this.getCurrencyDetail;

      return detail.shortdescription ? detail.shortdescription : {};
    },
    currencyInfo() {
      return this.currencyData.info ? this.currencyData.info : {};
    },

    graphData() {
      const data = JSON.parse(JSON.stringify(this.getCurrencyGraphData));
      return data? data.reverse() : [];
    },
    lastPrice() {
      const lastObject =
        this.graphData.length > 0
          ? this.graphData[this.graphData.length - 1]
          : {};
      const c = lastObject.c;
      return c;
    },
    fiatPrice() {
      return this.$store.getters.get_client_exchange_rate(
        "usdt",
        this.lastPrice
      );
    },
    percentage() {
      const firstObject = this.graphData.length > 0 ? this.graphData[0] : {};
      const lastPrice = this.lastPrice;
      const firstPrice = firstObject.c;

      const ptg = ((lastPrice - firstPrice) / firstPrice) * 100;
      return ptg.toFixed(2);
    },
    newsChannels() {
      return this.getArticleChildren;
    },
    subItems() {
      return this.getSubItems;
    },
    spotMarket() {
      return this.getCurrencySpotMarket;
    },
    marginMarket() {
      return this.getCurrencyMarginMarket;
    },
    futureMarket() {
      return this.getCurrencyFutureMarket;
    },

    favoriteList() {
      return this.getFavoriteList;
    },
    canUseFrom() {
      const _self = this;
      const token = this.assets.filter(
        (item) => item.currency.currencyname == this.currencyFrom
      );
      if (token.length > 0) {
        return _self.global_get_tofixed(
          token[0].canuseamount,
          _self.global_get_decimal(this.currencyFrom).a
        );
      } else {
        return 0;
      }
    },
    faceBookUrl() {
      return this.facebookPageLink;
    },
    twitterUrl() {
      return this.twitterLink;
    },
    currencyDescription() {
      const des = this.currencyDetail.remark;
      const regex = /(<([^>]+)>)/gi; // Regular expression to match HTML tags
      const plainText = des ? des.replace(regex, "") : ""; // Remove HTML tags
      return plainText;
    },

    selfRoute: function () {
      return this.$store.state.route;
    },

    tradeData() {
      const spot = this.spotMarket;
      const margin = this.marginMarket;
      const future = this.futureMarket;

      let array = [];

      if (spot.symble) {
        array.push(spot);
      }

      if (margin.symble) {
        array.push(margin);
      }

      if (future.symble) {
        array.push(future);
      }

      return array;
    },

  },
  watch: {
    getCurrencyGraphData: function () {
      this.mcharts();
    },
    getSpotMarkets: function (val) {
      this.marketData = val;
    },
  },

  methods: {
    ...mapActions("market", [
      "fetchCurrencyDetail",
      "fetchCurrencyGraphData",
      "fetchQuotationDailyData",
      "markAsFavorite",
      "removeFromFavorite",
    ]),
    ...mapActions("article", ["fetchSubItems", "fetchArticleChannels", "saveSupportNotSupport", "fetchChannelInfos", "fetchBullishBearishData"]),
    getClientExchangeRate(tradeData) {
      if (tradeData.symble) {
        let symble = tradeData.symble.split("/");
        if (symble.length > 1) {
          symble = symble[1];
        }
        return this.$store.getters.get_client_exchange_rate(
          symble,
          tradeData.c
        );
      }
    },

    getNewsList(value) {
      //console.log('value', value);
      const newsObject = {
        channelId:
          this.currentNewsChannel == "all"
            ? bitnasdaqNewsChannelId
            : this.currentNewsChannel,
        pageIndex: 1,
        pageSize: 10,
      };
      this.fetchSubItems(newsObject);
    },
    // 121117750667

    async favorite() {
      if (this.addOrRemovingFromFavorite) {
        return;
      }

      //console.log('sss currencyDetail: ', this.spotMarket)
      const spot = this.spotMarket;

      const params = {
        ismargin: 0,
      };
      if (!spot.self) {
        params.ctids = [spot.ctid];
        const res = await this.markAsFavorite(params);
        if (res.code == 200) {
          this.$store.commit("set_message", {
            type: "ok",
            text: this.$t("texts.txt14"),
          });
        }
      } else {
        const favoriteItem = this.favoriteList.find(
          (item) => item.ctid == spot.ctid
        );
        //console.log('favoriteItem: ', favoriteItem);
        params.ids = [favoriteItem.id];
        const res = await this.removeFromFavorite(params);
        if (res.code == 200) {
          this.$store.commit("set_message", {
            type: "ok",
            text: this.$t("texts.txt15"),
          });
        }
      }
    },

    //call from mounted
    async getGraphData(type = 0) {
      const graphData = {
        fName: this.selectedCurrency,
        tName: this.selectedCurrency1,
        type: type,
      };
      this.fetchCurrencyGraphData(graphData);
    },

    getlimitprice(item) {
      return (
        (item.c - item.o < 0 ? "-" : "+") + this.global_get_limitprice(item)
      );
    },

    limitPrice: function (c, o) {
      let limit_price = Number((((c - o) / o) * 100).toFixed(2));
      return isNaN(limit_price) ? 0 : limit_price;
    },

    changeGraphTab(val) {
      this.getGraphData(val);
    },

    async getAssets() {
      try {
        const { data } = await this.$store.dispatch("user_assets_get", {
          tokens: this.currencyFrom,
        });
        if (data) {
          this.canUse = data[0].canuseamount;
        }
      } catch (error) {
        //console.log('Error', error)
      }
    },
    onFromChange(e) {
      const val = e.target.value;
      if (val != "") {
        const amt =
          (this.$store.getters.get_exchange_rate_by_name(
            this.currencyFrom,
            "USDT"
          ) *
            parseFloat(this.input.from)) /
          this.$store.getters.get_exchange_rate_by_name(
            this.currencyTo,
            "USDT"
          );
        this.input.to = this.global_get_tofixed(
          amt,
          this.global_get_decimal(this.currencyTo).a
        );
      } else {
        this.input.to = "";
      }
    },
    onToChange(e) {
      const val = e.target.value;
      if (val != "") {
        const amt =
          (this.$store.getters.get_exchange_rate_by_name(
            this.currencyTo,
            "USDT"
          ) *
            parseFloat(this.input.to)) /
          this.$store.getters.get_exchange_rate_by_name(
            this.currencyFrom,
            "USDT"
          );
        this.input.from = this.global_get_tofixed(
          amt,
          this.global_get_decimal(this.currencyFrom).a
        );
      } else {
        this.input.from = "";
      }
    },
    getConvertTo(val) {
      this.getAssets();
      const cname = this.currencyFrom.toLowerCase();
      const array = [];
      this.flashData.filter((_d) => {
        if (_d.fname == cname) {
          array.push(_d.tname);
        } else if (_d.tname == cname) {
          array.push(_d.fname);
        }
      });
      this.convertToAssets = this.assets.filter((_a) => {
        const assetCName = _a.currency.currencyname.toLowerCase();
        for (let i = 0; i < array.length; i++) {
          if (assetCName == array[i]) {
            return _a;
          }
        }
      });
      if (val) {
        this.currencyTo = val;
      } else {
        this.currencyTo = this.convertToAssets[0]?.currency.currencyname;
      }

      this.getMinMaxAmount();
    },
    getMinMaxAmount() {
      this.input.from = "";
      this.input.to = "";
      const cFrom = this.currencyFrom.toLowerCase();
      const cTo = this.currencyTo.toLowerCase();
      const settings = this.flashData.filter((_d) => {
        if (
          (cFrom == _d.fname && cTo == _d.tname) ||
          (cFrom == _d.tname && cTo == _d.fname)
        ) {
          return _d;
        }
      })[0];
      this.settings = settings;
      if (settings.fname == cFrom) {
        this.fminamount = this.global_get_tofixed(
          settings.minamount,
          this.global_get_decimal(cFrom).a
        );
        this.fmaxamount = this.global_get_tofixed(
          settings.maxamount,
          this.global_get_decimal(cFrom).a
        );
        this.tminamount = this.currencyConverter(
          settings.minamount,
          cFrom,
          cTo
        );
        this.tmaxamount = this.currencyConverter(
          settings.maxamount,
          cFrom,
          cTo
        );
      } else {
        this.fminamount = this.currencyConverter(
          settings.minamount,
          cTo,
          cFrom
        );
        this.fmaxamount = this.currencyConverter(
          settings.maxamount,
          cTo,
          cFrom
        );
        this.tminamount = this.global_get_tofixed(
          settings.minamount,
          this.global_get_decimal(cTo).a
        );
        this.tmaxamount = this.global_get_tofixed(
          settings.maxamount,
          this.global_get_decimal(cTo).a
        );
      }
      this.tab = "0";
      this.getGraphData(this.tab);
    },

    currencyConverter(amount, cFrom, cTo) {
      const amt =
        (this.$store.getters.get_exchange_rate_by_name(cFrom, "USDT") *
          parseFloat(amount)) /
        this.$store.getters.get_exchange_rate_by_name(cTo, "USDT");
      return this.global_get_tofixed(amt, this.global_get_decimal(cTo).a);
    },

    mcharts(g = []) {
      const chartData = this.graphData;
      const _self = this;
      const echartDom = document.getElementById("echarts");
      if (!echartDom) {
        return;
      }

      const myChart = echarts.init(echartDom);
      const option = {
        grid: {
          left: "1%",
          top: 30,
          right: "1%",
          bottom: 30,
        },
        tooltip: {
          trigger: "axis",
          position(pt) {
            return [pt[0], "10%"];
          },
          backgroundColor: "#FFFFFF",
          padding: [1, 1, 1, 1],
          formatter: function (params) {
            let data = params[0];

            return `
                            <div style="background-color: #FFFFFF;color:#000000; padding:10px 15px;box-shadow: none; border:none">
                                <span ></span>${_self
                .global_get_local_time(data.axisValue)
                .format("MMMM YYYY h A")}<br>
                                <span style="color: #999;"></span>${data.data}
                            </div>
                            `;
          },
        },

        xAxis: {
          type: "category",
          // boundaryGap: ['20%', '20'],
          data: chartData.map((item) => item.t),
          show: true,
          axisLine: {
            show: false, // hide the x-axis line.
          },
          axisTick: false,
          axisLabel: {
            interval: Math.ceil(chartData.length / 8),
            formatter: function (value) {
              return _self.global_get_local_time(value).format("HH:mm");
            },
          },
        },
        yAxis: {
          type: "value",
          // boundaryGap: ['20%', '20'],
          min: Math.min(...chartData.map((item) => item.c)),
          max: Math.max(...chartData.map((item) => item.c)),
          show: false,
          axisLine: {
            show: false,
            showMinLine: false,
            showMaxLine: false,
          },
          axisLabel: {
            showMinLabel: false, // hide the minimum value label on the y-axis side
            showMaxLabel: false, // hide the maximum value label on the y-axis side
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "line",
            symbol: "none",
            sampling: "lttb",

            lineStyle: {
              color: this.percentage > 0 ? "#0ECB8190" : "#f6465d90",
            },

            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.2913,
                    color: this.percentage > 0 ? "#0ecb8160" : "#f6465d60", // Start color
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)", // End color
                  },
                ],
              },
            },
            data: chartData.map((item) => item.c),
          },
        ],
      };

      myChart.setOption(option);
    },

    setBullishBearishid() {
      const currencydata = this.currencyData;
      const symbleinfo = this.$store.state.symbleinfos;

      const currentDate = new Date();
      const year = BigInt(currentDate.getFullYear());
      const day = BigInt(currentDate.getDate());
      const month = BigInt(currentDate.getMonth() + 1);

      symbleinfo.find((item) => {
        if (item.descriptions && item.descriptions.includes(currencydata.currencyname) && item.descriptions.includes('/USDT')) {
          const id = BigInt(item.id);
          const result = id + year + day + month;
          this.bullishBearishArticleId = result.toString();
        }
      });
    },
    // support and vote for bullish and bearish
    async handleBullishClick(support, notsupport) {

      if (this.$userinfo.uid == undefined || this.$userinfo.uid == '') {
        return this.$router.push('/login');
      }

      // First API call to set support
      const object = {
        articleID: this.bullishBearishArticleId + "",
        isSupport: support,
        isNoSupport: notsupport
      };
      const response = await this.saveSupportNotSupport(object);

      if (response.code == 200) {
        this.getBullishBearishData()
      }
 
    },
    async getBullishBearishData() {

      const responsex = await this.fetchBullishBearishData({ articleID: this.bullishBearishArticleId + "" })

      // Calculate the percentage
      const data = responsex.data

      const isSupportNum = data.data.supportnum;
      const isNotSupportNum = data.data.notsupportnum;
      const totalVotes = (isSupportNum + 100) + (isNotSupportNum + 100);
      const supportPercentage = ((isSupportNum + 100) / (totalVotes)) * 100;
      const notsupportPercentage = ((isNotSupportNum + 100) / (totalVotes)) * 100;
      this.supportPercentagex = supportPercentage;
      this.notSupportPercentagex = notsupportPercentage;

      this.isUserVotedToday = data.useroper.issupport == true || data.useroper.isnosupport == true



    },
    goToConvert(){
      this.$router.push({ name: "convert", params: { currencyFrom: this.currencyTo,currencyTo:this.currencyFrom,
      toAmount:this.input.to
    
    } });
    },

  },

  async mounted() {
    const currency = this.$route.query.currency;
    if(this.$route.query.currency1) {
      this.selectedCurrency1 = this.$route.query.currency1
    }
    this.selectedCurrency = currency;
    const object = {
      channelId: currencyIntroductionId,
      subTitle: currency,
    };
    this.fetchCurrencyDetail(object);
    this.getGraphData();

    this.fiats = this.fiatpaymenttypeget(); //defined in mainJs

    const dailyDetailObject = {
      iscontract: 2,
      displaylocation: 0,
      pageIndex: 1,
      pageSize: 100000
    };

    await this.fetchQuotationDailyData(dailyDetailObject);

    this.getNewsList(bitnasdaqNewsChannelId);

    this.fetchArticleChannels({ channelId: bitnasdaqNewsChannelId });
    this.currencyTo = currency.toUpperCase();

    this.$store.commit("market/setCurrentCurrency", currency);

    this.setBullishBearishid()

    if (this.$userinfo.uid) {
      this.getBullishBearishData();
    }

  },
};
</script>

<style lang="scss" scoped>
.currency-curve {
  width: 100% !important;
  height: 400px;
}

.echarts {
  width: 100%;
  height: 100%;
}

.error-note {
  color: red;
  font-size: 12px;
}
</style>
