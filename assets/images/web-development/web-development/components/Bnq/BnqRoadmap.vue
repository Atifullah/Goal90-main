<template>
    <div class="bnq-roadmap roadmap mt-7">
      <p class="mb-2 text-black main-heading fw-5 text-center">{{$t('roadmap.roadmap')}}</p>
      <p class="bnq-desc mb-0 text-black fw-4 text-center">{{$t('roadmap.roadmap_desc')}}</p>
      <div class=" pl-3 mt-5">
                              <carousel :perPage="cards.length > 4 ? 4 : cards.length" :loop="false" :speed="500"
                              :autoplay="false" :perPageCustom="[[1100, 4], [1200, 5],[1440,6],[1700,7]]" :navigationEnabled="false"
                              :scrollPerPage="false" :paginationEnabled="false" >
                              <slide v-for="(item, index) in cards" :key="index" class="left-col  bottom-col">                    
                                <p class="left-title pl-4 mb-3"> {{ $t(item.title)}}</p>
                                  <ul class="left-list col2">
                                      <li v-for="(card_item, card_item_index) in item.card_items"
                                          :key="card_item_index + index">{{ $t(card_item.text) }}</li>
  
                                  </ul>
                                  <div class="section-pointer">
                                      <p class="subtitle-txt mb-2 fw-7">
                                      {{ $t(item.subTitle) }}  {{ item.subtitle1 }}
                                      </p>
                                      <span><img src="/images/circel-dot.svg" /></span>
                                  </div>
                
                              </slide>
                              </carousel>
                      </div>
                  </div>
  </template>
  
  <script>
  import carousel from '@/plugins/carousel/Carousel';
  import slide from '@/plugins/carousel/Slide';
  export default {
      components: {
          carousel, slide,
      },
  data() {
      return {
          cards: [
                  {
                      id: 1,
                      class: true,
                      title: this.$t('roadmap.design'),
  
                      subTitle: this.$t('roadmap.start'),
                      subtitle1: '',
                      card_items: [
                          {
                              id: 1,
                              text: this.$t('roadmap.arch_design')
                          },
                          {
                              id: 2,
                              text: `${this.$t('bnq.whitepaper')} 1.0`
                          },
                      ]
                  },
                  {
                      id: 2,
                      class: false,
                      title: this.$t('roadmap.rollout'),
                      subTitle: '2022',
                      subtitle1: 'Q1',
                      card_items: [
                          {
                              id: 1,
                              text: this.$t('roadmap.rollout')
                          },
                          {
                              id: 2,
                              text: this.$t('roadmap.bootstrap')
                          },
                      ]
  
                  },
                  {
                      id: 3,
                      class: false,
                      title: `${this.$t('roadmap.development_phase')} 1`,
  
                      subTitle: '2022',
                      subtitle1: 'Q2',
                      card_items: [
                          {
                              id: 1,
                              text: this.$t('roadmap.user_center')
                          },
                          {
                              id: 2,
                              text: this.$t('roadmap.wallet_manage')
                          },
                          {
                              id: 3,
                              text: this.$t('roadmap.order_book')
                          },
                          {
                              id: 4,
                              text: this.$t('roadmap.invite')
                          },
                      ]
  
                  },
                  {
                      id: 4,
                      class: false,
                      title: `${this.$t('roadmap.development_phase')} 2`,
                      subTitle: '2022',
                      subtitle1: 'Q3',
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('home.headCionDeal')
                          },
                          {
                              id: 2,
                              text: this.$t('person.Future_person')
                          },
                          {
                              id: 3,
                              text: this.$t('person.Margin_person')
                          },
                          {
                              id: 4,
                              text: this.$t('roadmap.demo_account')
                          },
                      ]
  
                  },
                  {
                      id: 5,
                      class: false,
                      title: `${this.$t('roadmap.development_phase')} 3`,
                      subTitle: '2022',
                      subtitle1: 'Q4',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('home.headFinancial')
                          },
                          {
                              id: 2,
                              text: 'P2P'
                          },
                          {
                              id: 3,
                              text: this.$t('roadmap.strategy_trade')
                          },
                      ]
  
                  },
                  {
                      id: 6,
                      class: false,
                      title: `${this.$t('roadmap.development_phase')} 4`,
                      subTitle: '2023',
                      subtitle1: 'Q1',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('roadmap.party_payment')
                          },
                          {
                              id: 2,
                              text: 'R&D and AI'
                          },
                      ]
  
                  },
                  {
                      id: 7,
                      class: false,
                      title: this.$t('roadmap.pre_sale'),
                      subTitle: '2023',
                      subtitle1: 'Q2',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('roadmap.presale_detail')
                          },
                          
                      ]
  
                  },
                  {
                      id: 8,
                      class: false,
                      title: this.$t('roadmap.ico'),
                      subTitle: '2023',
                      subtitle1: 'Q3',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('roadmap.airdrop')
                          },
                          {
                              id: 2,
                              text: this.$t('roadmap.launch_pad')
                          },
                          {
                              id: 3,
                              text: this.$t('roadmap.listing')
                          },
                      ]
  
                  },
                  {
                      id: 9,
                      class: false,
                      title: this.$t('roadmap.live'),
                      subTitle: '2023',
                      subtitle1: 'Q4',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('roadmap.live_exc')
                          },
                          {
                              id: 2,
                              text: this.$t('roadmap.apps')
                          },
                      ]
  
                  },
                  {
                      id: 11,
                      class: false,
                      title: this.$t('roadmap.ai_integration'),
                      subTitle: '2024',
                      subtitle1: 'Q1',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('roadmap.voice_help')
                          },
                          {
                              id: 2,
                              text: this.$t('roadmap.spot_bots')
                          },
                          {
                              id: 2,
                              text: this.$t('roadmap.nav')
                          },
                      ]
  
                  },
                  {
                      id: 12,
                      class: false,
                      title: 'DAO',
                      subTitle: '2024',
                      subtitle1: 'Q2',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('roadmap.utility_token')
                          },
                          {
                              id: 2,
                              text: this.$t('roadmap.launch_listing')
                          },
                      ]
  
                  },
                  {
                      id: 13,
                      class: false,
                      title: this.$t('roadmap.public_chain'),
                      subTitle: '2024',
                      subtitle1: 'Q3',
  
                      card_items: [
                      {
                              id: 1,
                              text: 'CEX to DEX'
                          },
                      ]
  
                  },
                  {
                      id: 14,
                      class: false,
                      title: this.$t('roadmap.layer_zero'),
                      subTitle: '2024',
                      subtitle1: 'Q4',
  
                      card_items: [
                      {
                              id: 1,
                              text: this.$t('roadmap.sync')
                          },
                         
                      ]
  
                  },
              ]
      }
  }
  }
  </script>
  
  <style>
  
  </style>