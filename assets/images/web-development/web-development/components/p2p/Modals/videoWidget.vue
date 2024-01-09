<template>
    <div class="video-widget" >

        <div class="video-container">
            <button class="close-button" @click="closeVideo"><a-icon type="close" /></button>
            <iframe width="850" height="550" frameborder="0" allowfullscreen :src="src"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>

    </div>
</template>
  
<script>
export default {
    props: {
        src: {
            type: String,
            required: true,
        },
        close: {
            type: Function,
            required: true,
        },
    },
    methods: {
        playVideo() {
            // Use the contentWindow property to access the iframe's document
            const iframe = this.$el.querySelector("iframe");
            const iframeDocument = iframe.contentWindow.document;

            // Use postMessage to send a play command to the iframe's document
            iframeDocument.postMessage('{"event":"command","func":"playVideo","args":""}', "*");

        },
        closeVideo() {
            this.close(); // Emit the "close" function passed as a prop
        },
    },
};
</script>
  
<style scoped>
.video-widget {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;

}

.video-container {
    position: relative;
    /* border:2px yellow solid; */
}

iframe {
    display: block;
    border: none;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    color: #fff;
    fill: #fff;
    padding: 5px 10px;
    cursor: pointer;
}

.close-icon {
    width: 20px;
    height: 20px
}
</style>
  