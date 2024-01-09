<template>
    <div>
        <a-modal v-model="show" :footer="false" :title="false" @cancel="close()" width="400px" :mask-closable="false">
            <div id="shufti-pro-modal">
                <a-row :gutter="16">

                    <a-col :lg="24" class="text-right">
                        <img src="/images/ud-cross.svg" class="pointer" @click="close()" />
                    </a-col>

                    <a-col :lg="24">

                        <template v-if="responseObject.status == 'request.pending'">

                            <div class="p-2 text-center">

                                <h2 class="text-capitalize">
                                    Verifying Document
                                </h2>
                                <AppLoading height="120px" iconSize="50px" /> 
                            </div>

 
                        </template>

                        <template v-else-if="responseObject.status == 'verification.accepted'">
                            <div class="p-2 text-center">
                                <img src="/images/success-img.svg" height="55px" />
                                <h2>Verification Completed</h2> 
                                <p> {{ responseObject.message }} </p>
                            </div>
                        </template>


                        <template v-else>



                            <div class="p-2 text-center">
                                <img src="/images/red-info-circle.svg" height="55px"/>
                                <h2 class="text-capitalize">
                                    {{ responseObject.status ? responseObject.status.replace('.', ' ') : '' }}
                                </h2>

                                <p> {{ responseObject.message }} </p>
                            </div>


                        </template>
                    </a-col>

                </a-row>

            </div>
        </a-modal>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import AppLoading from '~/components/AppLoading.vue'
export default {
    name: 'ShuftiResponseModal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    emits: ['onClose'],
    computed: {
        ...mapGetters('shufti-pro', ['getDocumentResponse', 'getAddressResponse']),

        documentResponse() {
            return this.getDocumentResponse;
        },
        addressResponse() {
            return this.getAddressResponse;
        },
        responseObject() {
            let object = {
                hasResponse: true,
                message: null,
                status: 'request.pending',
            }
            if (this.documentResponse.hasResponse) {
                object = this.documentResponse;
            }
            else if (this.addressResponse.hasResponse) {
                object = this.addressResponse;
            }

            return object
        }
    },
    methods: {
        ...mapMutations('shufti-pro', ['setDocumentResponse', 'setAddressResponse']),
        close() {
            const object = {
                hasResponse: false,
                message: null,
                status: null,
            }
            this.setDocumentResponse(object)
            this.setAddressResponse(object)
            this.$emit('onClose', true);
        }
    },
    components: { AppLoading }
}
</script>

<style lang="scss" scoped></style>