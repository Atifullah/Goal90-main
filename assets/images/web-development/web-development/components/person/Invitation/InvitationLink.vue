<template>
    <div class="invitation-link pt-3">
        <a-card :bordered="false" class="left-invitataion-card">

            <a-row>
                <a-col :lg="24">
                    <p class="main-heading fw-5 mb-2 invitation-link1 mt-3">{{ $t('invitation.myInvitationLink') }}</p>
                    <span class="invite-desc fw-4 desc1">{{ $t('invitation.friendthrough') }}
                    </span>


                    <a href="/affiliate-program">
                        {{ $t('invitation.joinaffpro') }}
                    </a>

                </a-col>
            </a-row>

            <a-row class="pt-4 pb-2">
                <a-col :lg="18" :xl="18">
                    <p class="mb-2 sub-heading main-heading fw-5 invite1-desc pt-3 first-link-p">{{ $t('Invite.invitation_link') }}</p>

                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="24" :xl="24" :xxl="18">
                            <p class="link-card fw-5">

                                <span id='keycopy'>{{ invitationLink }}?ref={{ $userinfo.invitationcode }}</span>
                                <!--{{ $store.state.hex_config.DomanUrl }}-->

                                <!-- <span class="link-url ml-1" data-clipboard-target="#keycopy" @click="copy('link-url','copyimage')">
                                    <img id="copyimage" src="/images/copy-icon.svg" class=" pointer mb-2" height="17px" />
                                </span> -->

                                <AppClipboard target="#keycopy" element-class="link-url" />

                            </p>
                        </a-col>

                    </a-row>


                </a-col>
            </a-row>
            <a-row class="pb-2 invite-row">

                <a-col :lg="15" :xl="6">
                    <p class="mb-2 sub-heading main-heading fw-5 invite1-desc">{{ $t('Invite.invitation_code') }}</p>

                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="12" :xl="24" :xxl="17">
                            <p class="link-card fw-5 mb-2">
                                <span id='invitation'>{{ $userinfo.invitationcode }}</span>
                                <AppClipboard target="#invitation" element-class="invitation" />

                            </p>
                        </a-col>
                        <!-- <a-col :lg="14"> -->
                            <!-- <span class=" invitation" data-clipboard-target="#invitation"
                                @click="copy('invitation', 'invitation-checkicon')"><img id="invitation-checkicon"
                                    src="/images/copy-icon.svg" class=" pointer mb-2" height="17px" />
                            </span> -->

                        <!-- </a-col> -->
                    </a-row>

                </a-col>

            </a-row>

        </a-card>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import AppClipboard from '~/components/App/AppClipboard.vue';
import { invitationLink } from '~/plugins/constants';
export default {
    data() {
        return {};
    },
    computed: {
        invitationLink: function () {
            return invitationLink;
        }
    },
    methods: {
    },
    components: { AppClipboard }
}
</script>

<style></style>
