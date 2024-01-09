<template>
<div>
<textarea name="" id="" cols="30" rows="10" v-model="text">

</textarea>
<input type="text" v-model="filename">
  <input type="text" v-model="fileExtension">
  <input type="number" v-model="height" placeholder="height">
  <input type="number" v-model="width" placeholder="width">
  <div id="canvas">

  </div>
<button @click="bindQRCode">Generate Qrcode</button>

</div>
</template>
<script>
import Qrlogo from '@/static/images/qrlogo.png'

export default {
    computed: {

    },
    methods: {
      bindQRCode() {
       const _self=this
        const qrCode = new _self.QRCodeStyling({
                width: _self.width,
                height: _self.height,
                margin: 0,
                type: "canvas",
                data: _self.text,
                image: Qrlogo,
                dotsOptions: {
                    color: "#000",
                },
                qrOptions: {
                    errorCorrectionLevel: 'H',
                    mode: 'Byte'
                },
                backgroundOptions: {
                    color: "#fff",
                },
            });
            document.getElementById("canvas").innerHTML = null;
            qrCode.append(document.getElementById("canvas"));
             qrCode.download({ name: this.filename, extension: this.fileExtension });

        },

        },
    mounted() {
      const _self=this;
      import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
        });
    },
    data(){
      return {
        QRCodeStyling:'',
        text:'',
        fileExtension:'png',
        filename:'qrcode',
        height:200,
        width:200
      }
    }
}
/*
 JS to toggle scroll axis styles
*/


</script>


