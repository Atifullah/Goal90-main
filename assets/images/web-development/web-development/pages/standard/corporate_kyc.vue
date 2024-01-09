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
    width: 300px;
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
    height: 510px;
    overflow-y: auto;
}
.reveal-modal {
    background: none;
    top: calc((100vh - 495px)/2)!important;
    left: calc((100% - 760px)/2)!important;
    box-shadow: none;
    z-index: 101;
}
.nn_wid_ti1 .black_titlt {
    width: 40%;
    position: fixed;
}
.black_titlt {
    background: none;
    color: #fff;
    line-height: 40px;
    font-size: 17px;
    text-align: center;
    height: 510px;
    overflow-y: auto;
}
.black_titlt p {
    background: #00a2a6;
}
.black_titlt .pos_d {
    position: fixed;
    font-size: 18px;
    width:40%;
}
.reveal-modal2 .close-reveal-modal, .reveal-modal .close-reveal-modal {
    float: right;
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
.reveal-modal .cuowu_white {
    position: static;
    margin-right: 15px;
}

.black_titlt img {
    margin-top: 40px;
}
.black_titlt img, .black_titlt p {
    width: 100%;
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
                    <div class="box02">
                        <h2>{{$t('corporatekyc.corkyc1')}}</h2>
                        <p class="font_p"><span class="sp" style="color:red;">*&nbsp;</span>{{$t('corporatekyc.corkyc2')}}<br></p>
                            <p class="font_p"><span class="sp" style="color:red;">*</span>
                                <strong>{{$t('corporatekyc.corkyc3')}}<br>
                                    &nbsp; &nbsp;{{$t('corporatekyc.corkyc4')}}</strong><br>
                            </p>
                            <p class="font_p"><span class="sp" style="color:red;">*</span>
                                <strong> {{$t('corporatekyc.corkyc5')}}</strong><br>
                            </p>
                            <p class="font_p"><span class="sp" style="color:red;">*</span>
                              {{$t('corporatekyc.corkyc6')}} <br>
                            </p>
                            <p class="font_p"><span class="sp" style="color:red;">*</span>
                               {{$t('corporatekyc.corkyc7')}} <br>
                            </p>

                            <div style="overflow: auto; margin-top: 30px;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="kyc_tb pkt1">
                                    <tbody>
                                        <tr class="th-bule">
                                            <td width="18%">{{$t('corporatekyc.corkyc8')}}</td>
                                            <td colspan="2">{{$t('corporatekyc.corkyc9')}}</td>
                                            <td width="30%">{{$t('corporatekyc.corkyc10')}}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">1. {{$t('corporatekyc.corkyc11')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a id="firstlink2" class="venobox vbox-item"
                                                                title="Certificate of Incorporation" href="javascript:;"
                                                                 @click="msg=1">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td rowspan="9" style="vertical-align: middle;">
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li><a id="firstlink" class="venobox vbox-item"
                                                                title="Unqualified Sample" href="javascript:;"  @click="msg=2">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_ngeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_ngeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_ngeg_en.png">
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td class="no_background">
                                               {{$t('corporatekyc.corkyc12')}}<br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">2. {{$t('corporatekyc.corkyc13')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a id="firstlink2" class="venobox vbox-item"
                                                                title="Memorandum and Articles of Association" href="javascript:;"
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
                                               {{$t('corporatekyc.corkyc14')}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">3. {{$t('corporatekyc.corkyc15')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a class="venobox vbox-item" title="Register of Directors"
                                                                href="javascript:;"  @click="msg=4">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td class="no_background">
                                                {{$t('corporatekyc.corkyc16')}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">4. {{$t('corporatekyc.corkyc17')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a class="venobox vbox-item" title="Register of Shareholder"
                                                                href="javascript:;"  @click="msg=5">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td class="no_background">
                                                {{$t('corporatekyc.corkyc18')}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">5. {{$t('corporatekyc.corkyc19')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a class="venobox vbox-item" title="Personal identification of Directors"
                                                                href="javascript:;"  @click="msg=6">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td class="no_background" rowspan="4">
                                                 {{$t('corporatekyc.corkyc20')}}<br><br>
                                                 {{$t('corporatekyc.corkyc21')}}<br><br>
                                                <strong>{{$t('corporatekyc.corkyc22')}}</strong><br>
                                                 {{$t('corporatekyc.corkyc23')}}<br>
                                                 {{$t('corporatekyc.corkyc24')}}<br><br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">6. {{$t('corporatekyc.corkyc25')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a class="venobox vbox-item" title="Residence certificate of Directors"
                                                                href="javascript:;"  @click="msg=7">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">7. {{$t('corporatekyc.corkyc26')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a class="venobox vbox-item" title="Personal identification of shareholders who hold more than 25% shares"
                                                                href="javascript:;"  @click="msg=8">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">8. {{$t('corporatekyc.corkyc27')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a class="venobox vbox-item" title="Residence certificate of shareholders who hold more than 25% shares "
                                                                href="javascript:;"  @click="msg=9">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;" class="font-wei">9. {{$t('corporatekyc.corkyc28')}}
                                            </td>
                                            <td>
                                                <div class="block">
                                                    <ul class="thumbs">
                                                        <li>
                                                            <a class="venobox vbox-item" title="Certificate of Incumbency or Certificate of good standing. (Optional)"
                                                                href="javascript:;"  @click="msg=10">
                                                                <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_okeg_jp.png">
                                                                <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_okeg_en.png"> 
                                                                <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_okeg_en.png"> 
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td class="no_background">
                                                {{$t('corporatekyc.corkyc29')}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-show="msg===1">
                                <div class="reveal-modal none_box_shadow over_none img_width nn_wid_ti1 media_ipad768">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc11')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc01.png">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                </div>
                                <div v-show="msg===2">
                                <div class="reveal-modal none_box_shadow qit_img over_none img_width nn_wid_ti1 media_new_i_pad">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('personkyc.perkyc36')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img v-if="$store.state.hex_lang.locale=='ja_jp'" src="../../static/images/kyc_ng_jp.png">
                                        <img v-if="$store.state.hex_lang.locale=='en_us'" src="../../static/images/kyc_ng_en.jpg"> 
                                        <img v-if="$store.state.hex_lang.locale=='zh_cn'" src="../../static/images/kyc_ng_en.jpg">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                </div>
                                <div v-show="msg===3">
                                <div class="reveal-modal none_box_shadow over_none nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc30')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc02.png">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                </div>
                                 <div v-show="msg===4">
                                <div class="reveal-modal none_box_shadow over_none wid920_mo wit876 nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d pos_d40">{{$t('corporatekyc.corkyc15')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc03.png">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                 </div>
                                 <div v-show="msg===5">
                                <div  class="reveal-modal none_box_shadow over_none nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc17')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                        <img src="../../static/images/kyc04.png">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                 </div>
                                 <div v-show="msg===6">
                                <div  class="reveal-modal none_box_shadow over_none left_48 nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc31')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc_a1_en.jpg">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                 </div>
                                 <div v-show="msg===7">
                                <div  class="reveal-modal none_box_shadow over_none nn_wid_ti1">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc25')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc_b2_en.jpg">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                 </div>
                                 <div v-show="msg===8">
                                <div  class="reveal-modal none_box_shadow over_none left_48 nn_wid_ti1 text_heigh">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc32')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc_a1_en.jpg">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                 </div>
                                 <div v-show="msg===9">
                                <div class="reveal-modal none_box_shadow over_none wi90_title img_width tilt90_1360 nn_wid_ti1 new_media_9 text_heigh">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc27')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc_b2_en.jpg">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                 </div>
                                 <div v-show="msg===10">
                                <div class="reveal-modal none_box_shadow over_none img_width mwr_1360 nn_wid_ti1 new_media_9 text_heigh">
                                    <div class="black_titlt new_green_title">
                                        <p class="title_p pos_d">{{$t('corporatekyc.corkyc28')}}<a class="close-reveal-modal cuowu_white" @click="msg=0">×</a></p>
                                            <img src="../../static/images/kyc05.png">
                                    </div>

                                </div>
                                <div class="reveal-modal-bg" style="cursor: pointer;" @click="msg=0"></div>
                                </div>
                            </div>
                            <br>
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
    name: 'corporate_kyc',
    components: {},
    mounted() {},
    data() {
      return {
                msg: 0
      		}
		}
  }
</script>
