<template>
    <div class="security-setting">
        <a-card class="security-card" :bordered="false">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12">
                    <p class="mb-0 main-heading fw-5">{{ $t('person.Security_Setting_person') }}</p>
                </a-col>
                <a-col :lg="12" align="end">
                            <p class="mb-0 identity-tow-factor fw-5">
                                <span class="mr-2">
                                    <img :src="($userinfo.isemailauthed && $userinfo.isphoneauthed) ? '/images/verify-icon.svg' : '/images/filled-red-icon.svg'"
                                    class="mr-2" />{{ $t('person.2FA_person') }}
                                </span>
                                <span>
                                    <nuxt-link to="/person/authentication">
                                <span class="mb-0 identity-tow-factor fw-5"><img
                                        :src="($userinfo.isemailauthed && $userinfo.isphoneauthed && $userinfo.securitylevel >= 2) ? '/images/verify-icon.svg' : '/images/filled-red-icon.svg'"
                                        class="mr-2" />{{ $t('person.id_var_person') }}</span>
                            </nuxt-link>
                                </span>
                               
                            </p>
                        </a-col>

            </a-row>

        </a-card>
        <a-row class="mt-3">
            <SecurityLevelCard />
        </a-row>
        <SecuritySuggestions />
    </div>
</template>

<script>
import SecurityLevelCard from './SecurityLevelCard.vue'
import SecuritySuggestions from './SecuritySuggestions.vue';
export default {
    components: {
        SecurityLevelCard,
        SecuritySuggestions
    },
}
</script>

<style></style>
