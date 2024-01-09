<style lang='scss' scoped>
  .hex-flex{color:#3B4251;background-color:#fff;}
  img{width: unset;vertical-align: middle;}
  .formbox {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 20px 40px 60px;
}
.box02 h2 {
    font-size: 26px;
    margin-bottom: 20px;
}
.box02 h3{
    font-weight: bolder;
    color: #00a2a6;
    font-size: 1.4em;
}
.font_p{
    font-size: 16px;
}
.pkt1 {
    border-collapse: unset!important;
    border-top: 1px solid #cccdcf!important;
    border-right: 1px solid #cccdcf!important;
    background-color: transparent;
}
tr{
    font-size: 13px;
}
.th-bule {
    font-size: 18px;
}

.pkt1 td, .pkt1 tr {
    border: unset!important;
    border-left: 1px solid #cccdcf!important;
    border-bottom: 1px solid #cccdcf!important;
}
.th-bule td {
    background: #00a2a6;
    color: #fff;
    font-weight:600;
}
.formbox table tr td, .formbox table tr th, .notice {
    text-align: left;
}
.formbox table tr td, .formbox table tr th {
    padding: 15px 10px;
}
.font-wei {
    font-weight: 700;
}
a {
    text-decoration: none;
    font-weight: 700;
}
.p_xtn {
    width: 290px;
}
.p_btn{
    margin-top: 45px;
}
.new_div_fff {
    color: #fff;}
.n-vite {
    line-height: 51px;
}
.n-sign {
    background: #14a2a5;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    font-size: 13px;
}
.n-sign:hover{
    background: linear-gradient(to bottom,  #20D4C2 0%,#12AD9D 100%);
}
.reveal-modal-bg {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.4);
    z-index: 100;
    top: 0;
    left: 0;
}
.nn_wid_ti1 {
    position: fixed;
}
.over_none {
    overflow-y: auto;
    height: 510px;
}
.reveal-modal {
    background: none;
    top: calc((100vh - 495px)/2)!important;
    left: calc((100% - 760px)/2)!important;
    box-shadow: none;
    z-index: 101;
}
.black_titlt {
    background: none;
    color: #fff;
    line-height: 40px;
    font-size: 17px;
    text-align: center;
    height: 510px;
    overflow-y: auto!important;
}
.nn_wid_ti1 .black_titlt {
    width: 40%;
    position: fixed;
}
.black_titlt p {
    background: #00a2a6;
}
.black_titlt .pos_d {
    position: fixed;
    width: 40%;
    font-size: 18px;
}

.reveal-modal .cuowu_white {
    position: static;
    margin-right: 15px;
}
.reveal-modal .close-reveal-modal{
    font-size: 30px;
    line-height: .5;
    top: 0;
    right: 0;
    color: #f1f1f1;
    text-shadow: none;
    font-weight: 400;
    cursor: pointer;
    margin-top: 10px;
}
.reveal-modal2 .close-reveal-modal, .reveal-modal .close-reveal-modal {
    float: right;
}
.black_titlt img {
    margin-top: 40px;
}
.black_titlt img, .black_titlt p {
    width: 100%;
}
.mt30{
    margin-top: 30px;
}
.mt10{
    margin-top: 10px;
}
.id-front-area{
      margin-top: 20px;
    width: 400px;
    line-height: 40px;
    border: 1px solid #dddddd;  
}
.por{
        position: relative;
}
.id-front-picture{
    text-align: center;
    position: relative;
    width: 90%;
    margin: 0 auto;
}
.el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
}
.update-picture{
    width: 30px;
    height: 30px;
    background: #14a2a5;
    color: white;
    font-size: 28px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    top: 72px;
    left: 185px;
}
.el-upload__input{
   display: none; 
}
</style>

<template>
  <div class="hex-flex">
    <div class="auth hex-flex_auto">
     <div class="formbox">
        <div class="wrap">
            <div class="kyc_example">
                <div class="box02" id="en_section">
                    <br>
                    <div class=" box02">
                    <h2>{{$t('personkyc.perkyc1')}}</h2><br>
                    <h3><i><img src="../../static/images/kyc_icon02.png"></i>{{$t('personkyc.perkyc2')}}</h3>
                    <p class="font_p"><span class="sp" style="color:red;">*&nbsp;</span>{{$t('personkyc.perkyc3')}}&nbsp;<strong>{{$t('personkyc.perkyc4')}}</strong>{{$t('personkyc.perkyc5')}}<br>
                        <strong>{{$t('personkyc.perkyc6')}}</strong><br>
                    </p>
                    <div style="overflow: auto; margin-top:30px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="kyc_tb pkt1">
                            <tbody>
                                <tr class="th-bule">
                                    <td width="18%">{{$t('personkyc.perkyc7')}}</td>
                                    <td colspan="2">{{$t('personkyc.perkyc8')}}</td>
                                    <td width="30%">{{$t('personkyc.perkyc9')}}</td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;" class="font-wei">{{$t('personkyc.perkyc10')}}</td>
                                    <td>
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li>
                                                    <a class="venobox vbox-item"
                                                        title="Passport" href="javascript:;" @click="msg=1">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 

                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td rowspan="4" style="vertical-align: middle;">
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li><a class="venobox vbox-item" title="Unqualified Sample"
                                                       href="javascript:;" @click="msg=2">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_ngeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_ngeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_ngeg_en.png">
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="no_background">
                                         {{$t('personkyc.perkyc11')}}<br>
                                         {{$t('personkyc.perkyc12')}}<br>
                                         {{$t('personkyc.perkyc13')}}<br>
                                        <strong> {{$t('personkyc.perkyc14')}}</strong><br>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;" class="font-wei">{{$t('personkyc.perkyc15')}}
                                    </td>
                                    <td>
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li>
                                                    <a class="venobox vbox-item"
                                                        title="Resident Card/National Identity card" href="javascript:;"
                                                         @click="msg=3">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="no_background">
                                        <strong> {{$t('personkyc.perkyc16')}}</strong><br>
                                        {{$t('personkyc.perkyc17')}} <br>
                                        <strong>{{$t('personkyc.perkyc18')}}</strong></td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;" class="font-wei">{{$t('personkyc.perkyc19')}}</td>
                                    <td>
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li>
                                                    <a class="venobox vbox-item" title="Driving License"
                                                        href="javascript:;" @click="msg=4">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="no_background">
                                        <strong> {{$t('personkyc.perkyc20')}}</strong><br>
                                        {{$t('personkyc.perkyc21')}}<br>
                                        <strong>{{$t('personkyc.perkyc22')}}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                </div>
                <div class="box02">
                    <h3><i><img src="../../static/images/kyc_icon02.png"></i>{{$t('personkyc.perkyc23')}}</h3>
                    <p class="font_p"><span class="sp" style="color:red;">*&nbsp;</span>{{$t('personkyc.perkyc24')}}&nbsp;<strong>{{$t('personkyc.perkyc25')}}</strong>{{$t('personkyc.perkyc26')}}<br>
                        <strong>{{$t('personkyc.perkyc27')}}</strong><br>
                    </p>
                    <div style="overflow: auto; margin-top: 30px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="kyc_tb pkt1">
                            <tbody>
                                <tr class="th-bule">
                                    <td width="18%">{{$t('personkyc.perkyc7')}}</td>
                                    <td colspan="2">{{$t('personkyc.perkyc8')}}</td>
                                    <td width="30%">{{$t('personkyc.perkyc9')}}</td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;" class="font-wei">{{$t('personkyc.perkyc28')}}</td>
                                    <td>
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li>
                                                    <a class="venobox vbox-item"
                                                        title="Electricity/Gas/Phone/Water and etc" href="javascript:;"
                                                        @click="msg=5">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 

                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td rowspan="4" style="vertical-align: middle;">
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li><a class="venobox vbox-item" title="Unqualified Sample"
                                                        href="javascript:;" @click="msg=6">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_ngeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_ngeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_ngeg_en.png">
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="no_background">

                                           {{$t('personkyc.perkyc29')}} <br>

                                        <strong> {{$t('personkyc.perkyc30')}}</strong><br>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;" class="font-wei">{{$t('personkyc.perkyc31')}}</td>
                                    <td>
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li>
                                                    <a class="venobox vbox-item"
                                                        title="Bank Statement" href="javascript:;" @click="msg=7">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="no_background">
                                        {{$t('personkyc.perkyc29')}}<br>
                                        <strong>{{$t('personkyc.perkyc30')}}</strong><br>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;" class="font-wei">{{$t('personkyc.perkyc15')}}
                                    </td>
                                    <td>
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li>
                                                    <a class="venobox vbox-item"
                                                        title="Resident Card/National Identity card" href="javascript:;"
                                                        @click="msg=8">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="no_background">
                                        <strong> {{$t('personkyc.perkyc16')}} </strong><br>
                                        {{$t('personkyc.perkyc17')}} <br>
                                        <strong>{{$t('personkyc.perkyc18')}}</strong></td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;" class="font-wei">{{$t('personkyc.perkyc19')}}</td>
                                    <td>
                                        <div class="block">
                                            <ul class="thumbs">
                                                <li>
                                                    <a class="venobox vbox-item" title="Driving License"
                                                        href="javascript:;" @click="msg=9">
                                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="no_background">
                                        <strong> {{$t('personkyc.perkyc20')}} </strong><br>
                                        {{$t('personkyc.perkyc21')}}<br>
                                        <strong>{{$t('personkyc.perkyc22')}}</strong>
                                    </td>
                                </tr>   
                            </tbody>
                        </table>
                        <div v-show="msg===1">
                            <div class="reveal-modal none_box_shadow over_none left_48 nn_wid_ti1 media_ipad768">
                                <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('personkyc.perkyc10')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img src="../../static/images/kyc_a1_en.jpg" class="new_imp_iap">
                                    </div>
                            </div>
                            <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                        </div>
                        <div v-show="msg===2">
                            <div class="reveal-modal none_box_shadow qit_img over_none img_width nn_wid_ti1 new_media_9">
                                <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('personkyc.perkyc36')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                    <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_ng_jp.png">
                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_ng_en.jpg"> 
                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_ng_en.jpg">
                                </div>
                            </div>
                            <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                        </div>
                            <div  v-show="msg===3">
                                <div class="reveal-modal none_box_shadow over_none left_48 nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                            <p class="title_p pos_d">{{$t('personkyc.perkyc15')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img src="../../static/images/kyc_b3_en.jpg" class="new_imp_iap">
                                    </div>
                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                            </div>
                            <div v-show="msg===4">
                                <div class="reveal-modal none_box_shadow over_none left_48 nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                            <p class="title_p pos_d">{{$t('personkyc.perkyc19')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img src="../../static/images/kyc_a2_en.jpg" class="new_imp_iap">
                                    </div>
                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                            </div>
                            <div v-show="msg===5">
                                <div class="reveal-modal none_box_shadow over_none img_width nn_wid_ti1 new_media_9">
                                    <div class="black_titlt new_green_title">
                                            <p class="title_p pos_d">{{$t('personkyc.perkyc37')}} <a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img src="../../static/images/kyc_b1_en.jpg">
                                    </div>
                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                            </div>
                            <div v-show="msg===6">
                                <div class="reveal-modal none_box_shadow qit_img over_none img_width nn_wid_ti1 new_media_9">
                                    <div class="black_titlt new_green_title">
                                            <p class="title_p pos_d">{{$t('personkyc.perkyc36')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_ng_jp.png">
                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_ng_en.jpg"> 
                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_ng_en.jpg">
                                    </div>
                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                            </div>
                            <div v-show="msg===7">
                                <div class="reveal-modal none_box_shadow over_none img_width nn_wid_ti1 new_media_9">
                                    <div class="black_titlt new_green_title">
                                            <p class="title_p pos_d">{{$t('personkyc.perkyc31')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc_b2_en.jpg">
                                    </div>
                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                            </div>
                            <div v-show="msg===8">
                                <div class="reveal-modal none_box_shadow over_none left_48 nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                            <p class="title_p pos_d"> {{$t('personkyc.perkyc15')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img src="../../static/images/kyc_b3_en.jpg" class="new_imp_iap">
                                    </div>
                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                            </div>
                            <div v-show="msg===9">
                                <div class="reveal-modal none_box_shadow over_none left_48 nn_wid_ti1">
                                        <div class="black_titlt new_green_title">
                                                <p class="title_p pos_d">{{$t('personkyc.perkyc19')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc_a2_en.jpg" class="new_imp_iap">
                                        </div>
                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                            </div>
                    </div>
                </div>
     
                <div class="mt30">
                     <h3><i><img src="../../static/images/kyc_icon02.png"></i>{{$t('personkyc.perkyc32')}}</h3>
                     <p class="mt10">{{$t('personkyc.perkyc33')}}</p>
                      <p>{{$t('personkyc.perkyc34')}} </p>
                       <p>{{$t('personkyc.perkyc35')}}</p>
                       <!-- 选择手持身份证文件start -->
                       <div class="id-front-area por">
                           <div class="id-front-picture">
                               <div class="avatar-uploader id-front-picture">
                                   <div class="el-upload" id="my-img">
                                       <img src="~static/images/an_id_head.png" alt="" style="height:186px;width:100%;">
                                       <span class="update-picture">+</span>
                                       <input type="file" name="file" class="el-upload__input" id="img-upload">
                                   </div>
                               </div>
                           </div>
                       </div>
                        <!-- 选择手持身份证文件end -->
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'person_kyc',
    components: {},
    mounted() {},
    data() {
      return {
                msg: 0
      		}
		},
    methods: {
    }

  }
</script>
