'use strict';

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default async({app, store}) => {
  const locale = store.state.hex_lang.locale.split('_')[0];
  const messages = await import(`~/locales/${locale}.json`);
  app.i18n = new VueI18n({
    locale: store.state.hex_lang.locale,
    silentTranslationWarn: false
  })
  app.i18n.mergeLocaleMessage(store.state.hex_lang.locale, messages.default);
};
