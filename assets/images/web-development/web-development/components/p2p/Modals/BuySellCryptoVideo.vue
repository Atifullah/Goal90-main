<template>
    <div class="buy-sell-video">
        <a-modal id="buy-sell-video" v-model="buySellVideo" :footer="false" :title="false" width="1000px" @cancel="close">
            <div>
                <a-row>
                    <a-col :lg="12">
                        <!-- Buying Video Thumbnail -->
                        <div class="thumbnail-container">
                            <img src="/images/Buyvideo.png"
                                alt="Buying Video Thumbnail" style="width: 500px;"
                                @click="toggleVideo('buyingVideo', 'https://images.bitnasdaq.io/videos/p2p-buying-guide.mp4')" />
                        </div>
                    </a-col>
                    <a-col :lg="12" class="right-side">
                        <!-- Selling Video Thumbnail -->
                        <div class="thumbnail-container">
                            <img src="/images/Sellvideo.png"
                                alt="Selling Video Thumbnail" style="width: 500px;"
                                @click="toggleVideo('sellingVideo', 'https://images.bitnasdaq.io/videos/p2p-selling-guide.mp4')" />
                        </div>
                    </a-col>
                </a-row>
                <!-- Video Widget Component -->
                <videoWidget v-if="videoVisible" :title="currentVideoTitle" :src="currentVideoSrc" :close="closeVideo" />
            </div>
            <a-card class="gray-card" :bordered="false">
                <a-row :gutter="16">
                    <a-col :lg="12" align="center">
                        <p class="crypto-heading mb-0">{{ $t('bitapp.bta6') }}</p>
                    </a-col>
                    <a-col :lg="12" align="center">
                        <p class="crypto-heading mb-0">{{ $t('bitapp.bta7') }}</p>
                    </a-col>
                </a-row>
            </a-card>
        </a-modal>
    </div>
</template>
  
<script>
import videoWidget from './videoWidget.vue';
export default {
    props: {
        show: {
            type: Boolean
        },
        close: {
            type: Function
        },
    },
    data() {
        return {
            buyingVideoSrc: '', // Initialize with empty strings
            sellingVideoSrc: '', // Initialize with empty strings
            buyingVideoVisible: false,
            sellingVideoVisible: false,
            buySellVideo: this.show, // Use a data property to control modal visibility
            videoVisible: false, currentVideoTitle: "",
            currentVideoSrc: "",

        };
    },
    components: {
        videoWidget
    },
    watch: {
        show(newShowValue) {
            // Reset the video URLs and visibility when the popover is opened or closed
            this.buySellVideo = newShowValue;

            if (newShowValue) {
                this.buyingVideoSrc = "https://images.bitnasdaq.io/videos/p2p-buying-guide.mp4";
                this.sellingVideoSrc = "https://images.bitnasdaq.io/videos/p2p-selling-guide.mp4";
                this.buyingVideoVisible = false;
                this.sellingVideoVisible = false;

            }
        },
    },
    methods: {
        toggleVideo(title, src) {
            this.currentVideoTitle = title;
            this.currentVideoSrc = src;
            this.videoVisible = true;
        },
        closeVideo() {
            this.currentVideoTitle = "";
            this.currentVideoSrc = "";
            this.videoVisible = false;
            this.close();
        }
    },
}
</script>

<style lang="scss">
#buy-sell-video {
    .right-side {
        border-left: 1px solid #F9F9F9;
    }

    .ant-modal-content {
        border-radius: 13px;
    }

    .ant-modal-body {
        padding: 0;
    }

    button.ant-modal-close {
        display: none;
    }

    .gray-card {
        background: #F9F9F9;
        border-radius: 0 0 13px 13px;

        .crypto-heading {
            color: #081131;
            font-size: 25px;
            font-weight: 700;
        }
    }

    .close-icon {
        position: absolute;
        top: -10px;
        /* Adjust the top position as needed */
        right: 5px;
        /* Adjust the right position as needed */
        z-index: 1;
        /* Ensure the close icon is on top of the video */
    }


}
</style>
