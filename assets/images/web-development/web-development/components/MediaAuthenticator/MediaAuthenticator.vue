<template>
    <div class="media-authenticator">

        <a-card class="pt-4">
            <div class="pb-5">
                <div class="bit-details">
                    <a-row :gutter="16" class="m-0">
                        <a-col :xxl="{ span: 10, offset: 7 }" :xl="{ span: 10, offset: 7 }" :lg="{ span: 14, offset: 5 }"
                            :md="{ span: 14, offset: 5 }" :sm="{ span: 20, offset: 2 }" :xs="{ span: 22, offset: 1 }">
                            <p class="mb-3 media-heading fw-5 pt-4 mt-4 text-center">
                                <img src="/images/bit-logo.svg" class="pr-2 mb-1" />
                                {{ $t('media.med1') }}
                            </p>
                            <a-row>
                                <a-col :lg="24" class="text-center">
                                    {{ verificationResult }}
                                </a-col>
                            </a-row>
                            <a-row class="mb-4 mt-2 py-2">
                                <a-col :lg="16" :offset="4">
                                    <a-input-search :placeholder="$t('placeholders.plh22')" v-model="searchValue"
                                        enter-button="Search" size="large" @search="onSearch" :loading="verifying" />
                                </a-col>
                            </a-row>

                            <p class="text-center media-txt fw-5 px-5">
                                {{ $t('media.med2') }}
                            </p>

                            <p class="text-center verify-account-txt fw-5">
                                {{ $t('media.med3') }}
                                <a href="mailto:service@bitnasdaq.com">service@bitnasdaq.com</a>
                                {{ $t('media.or_have_your_queries_answered_at') }}
                                <nuxt-link to="/help-center"> {{ $t('express.help_center') }} </nuxt-link>
                            </p>

                        </a-col>
                    </a-row>
                </div>
                <a-row :gutter="16" class="m-0 pt-4">
                    <a-col :xxl="{ span: 8, offset: 8 }" :xl="{ span: 8, offset: 8 }" :lg="{ span: 12, offset: 6 }"
                        :md="{ span: 14, offset: 5 }" :sm="{ span: 20, offset: 2 }" :xs="{ span: 22, offset: 1 }">
                        <p class="mb-0 media-heading fw-5 text-center pt-5 pb-3">{{ $t('security_tips.st1') }}</p>
                        <a-row :gutter="16">
                            <a-col :lg="8" align="center" class="py-3 orange-bg-col">
                                <a :href="artileDirectLinks.privactyAndSecurityTipe" target="_blank">
                                <img src="/images/security-safe.svg" class="mb-2" />
                                <p class="mb-0 principles-txt fw-5">{{ $t('security_tips.privacy_and_security_tips') }}</p>
                            </a>
                            </a-col>
                            <a-col :lg="8" align="center" class="py-3 orange-bg-col">
                                <a :href="artileDirectLinks.cryptoFraudAndScams" target="_blank">
                                <img src="/images/hacker.svg" class="mb-2" />
                                <p class="mb-0 principles-txt fw-5">{{ $t('security_tips.crypto_fraud_scams') }}</p>
                            </a>
                            </a-col>

                            <a-col :lg="8" align="center" class="py-3 orange-bg-col">
                                <a :href="artileDirectLinks.howToAvoidPhishing" target="_blank">
                                <img src="/images/phishing.svg" class="mb-2" />
                                <p class="mb-0 principles-txt fw-5">{{ $t('security_tips.how_to_avoid_phishing') }}</p>
                            </a>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>

            <a-modal id="agent-apply-modal" v-model="verified" :footer="false" :title="false" @cancel="verified = false"
                width="400px">
                <a-row>
                    <a-col :lg="24" align="center">
                        <img :src="source.isOfficial ? successImage : warningImage" class="pt-2" />

                        <p class="success-txt fw-5 pt-3 mb-2 pb-1 text-center">{{ source.title }}</p>

                        <p class="success-desc fw-5 text-center mb-4">{{ source.message }}</p>

                        <a-button class="primary-btn fw-5" block @click="verified = false">Ok</a-button>
                    </a-col>
                </a-row>

            </a-modal>

        </a-card>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { artileDirectLinks } from '~/plugins/constants'
export default {
    data() {
        return {
            verificationResult: '',
            verifying: false,
            verified: false,
            source: {},
            searchValue: '',
            successImage: '/images/success-img.svg',
            warningImage: '/images/warning.svg'
        }
    },
    computed: {
        ...mapGetters('constants', ['getConstants']),
        platforms: function () {
            return this.getConstants
        },
        artileDirectLinks() {
             return artileDirectLinks;
       }
    },
    methods: {
        checkData(val) {
            const { domains, contacts, emails, social_links } = this.platforms;

            const normalizedInput = val.replace(/^(https?:\/\/)?(www\.)?/i, "").toLowerCase();


            if (domains.includes(normalizedInput)) {
                this.verificationResult = this.$t('media.med5');
                this.source = {
                    title: this.$t('media.med5'),
                    message: this.$t('media.med6'),
                    value: val,
                    isOfficial: true
                }
            } else if (contacts.includes(normalizedInput)) {
                this.source = {
                    title: this.$t('media.med7'),
                    message: this.$t('media.med8'),
                    value: val,
                    isOfficial: true
                }

            } else if (emails.includes(normalizedInput)) {

                this.source = {
                    title: this.$t('media.med9'),
                    message: this.$t('media.med10'),
                    value: val,
                    isOfficial: true
                }

            }// Check for social links
            else {

                const matchingSocialLink = social_links.find(link => {
                    const f = link.url.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/i, "")
                    return normalizedInput.includes(f)
                });
                console.log('matchingSocialLink', matchingSocialLink);
                if (matchingSocialLink) {

                    this.source = {
                        title: this.$t('media.med11'),
                        message: this.$t('media.med12') + matchingSocialLink.name + this.$t('media.med13'),
                        value: val,
                        isOfficial: true
                    }
                } else {
                    this.source = {
                        title: this.$t('media.med14'),
                        message: this.$t('media.med15'),
                        value: val,
                        isOfficial: false
                    }
                }
            }
            this.verified = true
            this.verifying = false
            this.searchValue = ''
        },
        onSearch(val) {

            if (val == '') {
                return
            }

            this.verifying = true
            setTimeout(() => {
                this.checkData(val)
            }, 1500);
        }
    }
}
</script>

<style></style>
