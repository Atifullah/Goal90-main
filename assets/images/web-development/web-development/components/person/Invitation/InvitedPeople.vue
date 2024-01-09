<template>
    <div class="invited-people pt-3">
        <a-card :bordered="false">
            <a-row class="mb-3">
                <a-col :lg="24">
                    <a-card
                        class="invitataion-card invite-user2"
                        :bordered="false"
                    >
                        <p class="main-heading fw-5 col-alignment pl-4 mb-4">
                            <img src="/images/profile-add.svg" class="mr-3" />{{
                                $t("invitation.Invited")
                            }}
                        </p>
                        <p class="count-people fw-5 mb-0">
                            {{ totalitemcount }}
                        </p>
                    </a-card>
                </a-col>
            </a-row>
            <a-row class="mt-3">
                <a-col :lg="24">
                    <a-card class="invitataion-card" :bordered="false">
                        <p class="main-heading fw-5 col-alignment pl-4 mb-4">
                            <img
                                src="/images/invite-wallet.svg"
                                class="mr-3"
                            />{{ $t("invitation.Estimated") }}
                        </p>
                        <p class="count-people fw-5 mb-0">
                            {{ totalPrice }}
                            {{
                                $store.state.hex_client_exchange.active
                                    .toUpperCase()
                                    .toUpperCase()
                            }}
                        </p>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
export default {
    props: {
        totalitemcount: {
            type: Number,
            default: 0,
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style></style>
