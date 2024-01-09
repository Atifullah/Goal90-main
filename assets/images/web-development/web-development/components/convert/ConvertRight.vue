<template>
  <div class="convert-right">
    <a-row class="form">
      <a-col :lg="19" align="end"
        ><p class="form-txt">{{$t('confirm.con16')}}</p></a-col
      >
      <a-col :lg="5" align="end"
        ><p class="form-txt">
          <img src="/images/black-down.svg" class="mr-2" />
          0.0999 <span class="usdt-txt"> USDT</span>
        </p></a-col
      >
    </a-row>
    <a-row class="convert-icon p-0 m-0">
      <a-col :lg="24" align="center">
        <img src="/images/convert-icon.svg" />
      </a-col>
    </a-row>
    <a-form-model
      ref="resigterForm"
      :model="resigterForm"
      :rules="setValidation.rules"
      :hide-required-mark="true"
      label-align="left"
      :has-feedback="false"
    >
      <a-row :gutter="16" class="">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-form-model-item
            has-feedback
            :label="$t('labels.lbl14')"
            prop="from"
            :colon="false"
            :wrapper-col="{
              xl: 24,
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24,
            }"
          >
            <a-input
              v-model="resigterForm.from"
              :placeholder="$t('placeholders.plh16')"
            >
              <a-tooltip slot="suffix">
                <img src="/images/up-down.svg" class="mr-2" />
                <span class="mb-0 max-txt">MAX</span>
              </a-tooltip>
              <div slot="addonAfter" class="ustd-list">
                <img src="/images/ustd-icon.svg" /> USTD
                <a-select>
                  <a-select-option value="ustd">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/btc-icon.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">BTC</p>
                            <span class="bitcoin">{{$t('titles.title18')}}</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end" class="pt-2"
                        ><p class="mb-0 btc-num">0.0999</p>
                        <span class="btc-num gray-btc"
                          >=$0.02418579</span
                        ></a-col
                      >
                    </a-row>
                  </a-select-option>
                  <a-select-option value="luna">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/luna.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">LUNA</p>
                            <span class="bitcoin">Terra</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end"></a-col> </a-row
                  ></a-select-option>
                  <a-select-option value="eth">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/eth.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">ETH</p>
                            <span class="bitcoin">{{$t('titles.title19')}}</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end"></a-col>
                    </a-row>
                  </a-select-option>
                  <a-select-option value="doge">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/doge.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">DOGE</p>
                            <span class="bitcoin">Dogecoin</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end"></a-col>
                    </a-row>
                  </a-select-option>
                </a-select>
              </div>
            </a-input>
          </a-form-model-item>
          <a-form-model-item
            has-feedback
            :label="$t('labels.lbl15')"
            prop="to"
            :colon="false"
            :wrapper-col="{
              xl: 24,
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24,
            }"
          >
            <a-input
              v-model="resigterForm.to"
              :placeholder="$t('placeholders.plh16')"
            >
              <div slot="addonAfter" class="ustd-list">
                <img src="/images/ustd-icon.svg" /> USTD
                <a-select>
                  <a-select-option value="ustd">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/btc-icon.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">BTC</p>
                            <span class="bitcoin">{{$t('titles.title18')}}</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end" class="pt-2"
                        ><p class="mb-0 btc-num">0.0999</p>
                        <span class="btc-num gray-btc"
                          >=$0.02418579</span
                        ></a-col
                      >
                    </a-row>
                  </a-select-option>
                  <a-select-option value="luna">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/luna.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">LUNA</p>
                            <span class="bitcoin">Terra</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end"></a-col> </a-row
                  ></a-select-option>
                  <a-select-option value="eth">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/eth.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">ETH</p>
                            <span class="bitcoin">{{$t('titles.title19')}}</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end"></a-col>
                    </a-row>
                  </a-select-option>
                  <a-select-option value="doge">
                    <a-row class="py-1">
                      <a-col :lg="12">
                        <a-row :gutter="16">
                          <a-col :lg="3" class="pt-1"
                            ><img src="/images/doge.svg"
                          /></a-col>
                          <a-col :lg="21"
                            ><p class="mb-0 btc-txt">DOGE</p>
                            <span class="bitcoin">Dogecoin</span></a-col
                          >
                        </a-row>
                      </a-col>
                      <a-col :lg="12" align="end"></a-col>
                    </a-row>
                  </a-select-option>
                </a-select>
              </div>
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :lg="12">
          <ul class="covert-price-list">
            <li v-for="(value, key) in myObject" :key="key">
              {{ value }}
            </li>
          </ul>
        </a-col>
        <a-col :lg="12" align="end">
          <ul class="covert-price-list">
            <li v-for="(item, key) in items" :key="key">
              {{ item }}
            </li>
          </ul>
        </a-col>
      </a-row>
      <a-divider class="my-1" />
      <a-row :gutter="16">
        <a-col :lg="24" class="py-4">
          <a-button class="amount" block type="primary" @click="handleSubmit"
            >{{$t('confirm.con17')}}</a-button
          >
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>

export default {
  data() {
    return {
      resigterForm: {
        from: '',
        to: '',
      },
      preview:false,
      myObject: {
        price: 'Price',
        price2: 'Inverse Price',
        price3: ' You will receive',
      },
      items: {
        price: '1 USDT = 0.00005106 BTC',
        price2: '1 BTC = 19586.6 USDT',
        price3: '0.00005106 BTC',
      },
      setValidation:{
        rules: {
          from: [
            {
              required: true,
              message: this.$t('messages.msg20'),
            },
          ],
          to: [
            {
              required: true,
              message: this.$t('messages.msg20'),
            },
          ],
        },
      },
    }
  },
  methods: {
    async handleSubmit(formName) {
      await this.$refs.resigterForm.validate(async (valid) => {
        if (valid) {
           this.preview=true;
        }
      })
    },
  },
}
</script>

<style></style>
