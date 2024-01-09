import { meta } from "~/plugins/constants";
import * as CryptoJS from 'crypto-js';
export default function ({ app, store, route }) {
  if (true) {

    //ADDING CONICAL TAGS
    store.commit('setCurrentRouteSeo', 'https://www.bitnasdaq.com' + route.fullPath);
    if (route.name && route?.params?.id) {
      const arr = route.params.id.split('_');
      switch (route.name) {
        case 'deal-id':
          store.commit('setDescriptionSeo', `Trade ${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} with BitNasdaq's Deal platform. Access cryptocurrency deals and enhance your trading experience. Join BitNasdaq for deals now!`);
          store.commit('setTitleSeo', `${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} - Deal - BitNasdaq`);
          break;
        case 'deal-pro-id':
          store.commit('setDescriptionSeo', `Trade ${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} with BitNasdaq's Deal Pro platform. Access advanced cryptocurrency deals for a professional trading experience. Join BitNasdaq now!`);
          store.commit('setTitleSeo', `${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} - Deal Pro - BitNasdaq`);
          break;
        case 'margin-id':
          store.commit('setDescriptionSeo', `Trade ${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} with BitNasdaq's Margin platform. Explore cryptocurrency margin trading and enhance your trading experience. Join BitNasdaq now!`);
          store.commit('setTitleSeo', `${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} - Margin Trading - BitNasdaq`);
          break;
        case 'margin-pro-id':
          store.commit('setDescriptionSeo', `Trade ${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} with BitNasdaq's Margin Pro platform. Enhance your margin trading experience with advanced cryptocurrency tools. Join BitNasdaq now!`);
          store.commit('setTitleSeo', `${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} - Margin Pro - BitNasdaq`);
          break;
        case 'contract-id':
          store.commit('setDescriptionSeo', `Trade ${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} with BitNasdaq's contract platform. Explore cryptocurrency contracts and enhance your trading experience. Join BitNasdaq now!`);
          store.commit('setTitleSeo', `${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} - Contract - BitNasdaq`);
          break;
        case 'contract-pro-id':
          store.commit('setDescriptionSeo', `Trade ${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} with BitNasdaq's Contract Pro platform. Explore advanced cryptocurrency contracts for enhanced trading. Join BitNasdaq now for pro trading!`);
          store.commit('setTitleSeo', `${arr[0].toUpperCase()} to ${arr[1].toUpperCase()} - Contract Pro - BitNasdaq`);
          break;
        default:
          break;
      }
    }
    else {

      if (!(route.name == 'blogs-slug' || route.name == 'news-slug' || route.name == 'market-detail')) {
        const subItemTitle = route.query.subItemTitle


        if (subItemTitle == undefined || (subItemTitle != undefined && subItemTitle.includes('_faqs'))) {

          let hash
          if (route.name == 'login') {
            hash = CryptoJS.SHA1(JSON.stringify(route.path)).toString();
          }
          else {
            hash = CryptoJS.SHA1(JSON.stringify(route.fullPath)).toString();
          }
          store.commit('setTitleSeo', app.i18n.t(`seo.${hash}.name`));
          store.commit('setDescriptionSeo', app.i18n.t(`seo.${hash}.content`));
          store.commit('setH1Seo', app.i18n.t(`seo.${hash}.h1`));
        }


      }

    }
  }


  //SEO HAS FURTHER IN LAYOUTS DEFAULTS AND KNOCKDOWN IN TRADE 









}