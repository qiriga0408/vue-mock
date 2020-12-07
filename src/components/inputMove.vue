<template>
  <div class="input_div">
    <!--   -->
    <div
      v-show="isPhShow"
      :class="isMove?'placeHolder_div move_ph_div':'placeHolder_div'"
      :style="{'left':isNumSelect?'20.8%':''}"
    >{{pbText}}</div>
    <input
      :class="isNumSelect?'pl20':''"
      @focus="inputFocus()"
      :value="value"
      @input="$emit('input', $event.target.value)"
      ref="input"
      @blur="inputBlur()"
      :type="type"
    />
    <div
      v-if="isVcode"
      :class="count_down?'getVCode':'getVCode getVCode_after'"
      @click="VCodeClick"
    >
      <span v-show="count_down">获取验证码</span>
      <span v-show="!count_down">{{time_60}}s后重新获取</span>
    </div>
    <div class="error_div">{{errorText}}</div>
    <areacode-select class="select_div" :dataList="allMarketData" v-if="isNumSelect"></areacode-select>
  </div>
</template>
<script>
export default {
  props: {
    type:String,//输入框类型
    pbText: String, //提示输入内容
    errorText: String, //错误提示内容
    isVcode: Boolean, //是否显示发送验证码
    isNumSelect: Boolean, //是否显示手机区号选择
    value: String //输入框的值
  },
  data() {
    return {
      isMove: false, //提示(placeHolder)是否移动
      isPhShow: true, //提示(placeHolder)是否显示
      time_60: 60,
      count_down: true,
      allMarketData: [
        {
          city: "中国大陆",
          code: "+86"
        },
        {
          city: "中国香港",
          code: "+852"
        },
        {
          city: "中国澳门",
          code: "+853"
        },
        {
          city: "中国台湾",
          code: "+886"
        },
        {
          city: "新加坡",
          code: "+65"
        },
        {
          city: "阿富汗",
          code: "+93"
        },
        {
          city: "阿尔巴尼亚",
          code: "+355"
        },
        {
          city: "阿尔格拉",
          code: "+213"
        },
        {
          city: "安道尔",
          code: "+376"
        },
        {
          city: "安哥拉",
          code: "+244"
        },
        {
          city: "安圭拉",
          code: "+1264"
        },
        {
          city: "阿森松岛",
          code: "+247"
        },
        {
          city: "安提瓜和巴布达",
          code: "+1268"
        },
        {
          city: "阿根廷",
          code: "+54"
        },
        {
          city: "亚美尼亚",
          code: "+374"
        },
        {
          city: "阿鲁巴",
          code: "+297"
        },
        {
          city: "澳大利亚",
          code: "+61"
        },
        {
          city: "奥地利",
          code: "+43"
        },
        {
          city: "阿塞拜疆",
          code: "+994"
        },
        {
          city: "巴哈马",
          code: "+1242"
        },
        {
          city: "巴林",
          code: "+973"
        },
        {
          city: "孟加拉国",
          code: "+880"
        },
        {
          city: "巴巴多斯",
          code: "+1246"
        },
        {
          city: "白俄罗斯",
          code: "+375"
        },
        {
          city: "比利时",
          code: "+32"
        },
        {
          city: "伯利兹",
          code: "+501"
        },
        {
          city: "贝宁",
          code: "+229"
        },
        {
          city: "百慕大",
          code: "+1441"
        },
        {
          city: "不丹",
          code: "+975"
        },
        {
          city: "玻利维亚",
          code: "+591"
        },
        {
          city: "波斯尼亚和黑塞哥维那",
          code: "+387"
        },
        {
          city: "博茨瓦纳",
          code: "+267"
        },
        {
          city: "巴西",
          code: "+55"
        },
        {
          city: "文莱",
          code: "+673"
        },
        {
          city: "保加利亚",
          code: "+359"
        },
        {
          city: "布基纳法索",
          code: "+226"
        },
        {
          city: "布隆迪",
          code: "+257"
        },
        {
          city: "柬埔寨",
          code: "+855"
        },
        {
          city: "喀麦隆",
          code: "+237"
        },
        {
          city: "加拿大",
          code: "+1"
        },
        {
          city: "佛得角",
          code: "+238"
        },
        {
          city: "开曼群岛",
          code: "+1345"
        },
        {
          city: "中非共和国",
          code: "+236"
        },
        {
          city: "乍得",
          code: "+235"
        },
        {
          city: "智利",
          code: "+56"
        },
        {
          city: "哥伦比亚",
          code: "+57"
        },
        {
          city: "科摩罗",
          code: "+269"
        },
        {
          city: "刚果共和国",
          code: "+242"
        },
        {
          city: "刚果民主共和国",
          code: "+243"
        },
        {
          city: "库克群岛",
          code: "+682"
        },
        {
          city: "哥斯达黎加",
          code: "+506"
        },
        {
          city: "科特迪沃",
          code: "+225"
        },
        {
          city: "克罗地亚",
          code: "+385"
        },
        {
          city: "古巴",
          code: "+53"
        },
        {
          city: "塞浦路斯",
          code: "+357"
        },
        {
          city: "+捷克共和国",
          code: "+420"
        },
        {
          city: "丹麦",
          code: "+45"
        },
        {
          city: "吉布提",
          code: "+253"
        },
        {
          city: "多米尼加",
          code: "+1767"
        },
        {
          city: "多米尼加共和国",
          code: "+1809"
        },
        {
          city: "厄瓜多尔",
          code: "+593"
        },
        {
          city: "埃及",
          code: "+20"
        },
        {
          city: "艾萨尔瓦多",
          code: "+503"
        },
        {
          city: "爱沙尼亚",
          code: "+372"
        },
        {
          city: "埃塞俄比亚",
          code: "+251"
        },
        {
          city: "法罗群岛",
          code: "+298"
        },
        {
          city: "斐济",
          code: "+679"
        },
        {
          city: "芬兰",
          code: "+358"
        },
        {
          city: "法国",
          code: "+33"
        },
        {
          city: "法属圭亚那",
          code: "+594"
        },
        {
          city: "法属波利尼西亚",
          code: "+689"
        },
        {
          city: "加蓬",
          code: "+241"
        },
        {
          city: "冈比亚",
          code: "+220"
        },
        {
          city: "格鲁吉亚",
          code: "+995"
        },
        {
          city: "德国",
          code: "+94"
        },
        {
          city: "加纳",
          code: "+233"
        },
        {
          city: "直布罗陀",
          code: "+350"
        },
        {
          city: "希腊",
          code: "+30"
        },
        {
          city: "格陵兰",
          code: "+299"
        },
        {
          city: "格林纳达",
          code: "+1473"
        },
        {
          city: "瓜德罗普",
          code: "+590"
        },
        {
          city: "关岛",
          code: "+1671"
        },
        {
          city: "危地马拉",
          code: "+502"
        },
        {
          city: "几内亚",
          code: "+240"
        },
        {
          city: "根西",
          code: "+44"
        },
        {
          city: "几内亚",
          code: "+224"
        },
        {
          city: "圭亚那",
          code: "+592"
        },
        {
          city: "海地",
          code: "+509"
        },
        {
          city: "洪都拉斯",
          code: "+504"
        },
        {
          city: "缅甸",
          code: "+95"
        },
        {
          city: "匈牙利",
          code: "+36"
        },
        {
          city: "冰岛",
          code: "+354"
        },
        {
          city: "印度",
          code: "+91"
        },
        {
          city: "印度尼西亚",
          code: "+62"
        },
        {
          city: "伊朗",
          code: "+98"
        },
        {
          city: "伊拉克",
          code: "+964"
        },
        {
          city: "爱尔兰",
          code: "+353"
        },
        {
          city: "马恩岛",
          code: "+44"
        },
        {
          city: "以色列",
          code: "+972"
        },
        {
          city: "意大利",
          code: "+93"
        },
        {
          city: "牙买加",
          code: "+1876"
        },
        {
          city: "日本",
          code: "+81"
        },
        {
          city: "泽西岛",
          code: "+44"
        },
        {
          city: "约旦",
          code: "+962"
        },
        {
          city: "哈萨克斯坦",
          code: "+7"
        },
        {
          city: "肯尼亚",
          code: "+254"
        },
        {
          city: "科索沃",
          code: "+383"
        },
        {
          city: "科威特",
          code: "+965"
        },
        {
          city: "吉尔吉斯斯坦",
          code: "+996"
        },
        {
          city: "老挝",
          code: "+856"
        },
        {
          city: "拉脱维亚",
          code: "+371"
        },
        {
          city: "黎巴嫩",
          code: "+961"
        },
        {
          city: "莱索托",
          code: "+266"
        },
        {
          city: "利比里亚",
          code: "+231"
        },
        {
          city: "利比亚",
          code: "+218"
        },
        {
          city: "列支敦士登",
          code: "+423"
        },
        {
          city: "立陶宛",
          code: "+370"
        },
        {
          city: "卢森堡",
          code: "+352"
        },
        {
          city: "马其顿",
          code: "+389"
        },
        {
          city: "马达加斯加",
          code: "+261"
        },
        {
          city: "马拉维",
          code: "+265"
        },
        {
          city: "马来西亚",
          code: "+60"
        },
        {
          city: "马尔代夫",
          code: "+960"
        },
        {
          city: "马里",
          code: "+223"
        },
        {
          city: "马耳他",
          code: "+356"
        },
        {
          city: "马提尼克",
          code: "+596"
        },
        {
          city: "毛里塔尼亚",
          code: "+222"
        },
        {
          city: "毛里求斯",
          code: "+230"
        },
        {
          city: "马约特",
          code: "+262"
        },
        {
          city: "墨西哥",
          code: "+52"
        },
        {
          city: "摩尔多瓦",
          code: "+373"
        },
        {
          city: "摩纳哥",
          code: "+377"
        },
        {
          city: "蒙古",
          code: "+976"
        },
        {
          city: "黑山",
          code: "+382"
        },
        {
          city: "蒙特塞拉特",
          code: "+1664"
        },
        {
          city: "摩洛哥",
          code: "+212"
        },
        {
          city: "莫桑比克",
          code: "+258"
        },
        {
          city: "纳米比亚",
          code: "+264"
        },
        {
          city: "尼泊尔",
          code: "+977"
        },
        {
          city: "荷兰",
          code: "+31"
        },
        {
          city: "荷属安的列斯",
          code: "+599"
        },
        {
          city: "新喀里多尼亚",
          code: "+687"
        },
        {
          city: "新西兰",
          code: "+64"
        },
        {
          city: "尼加拉瓜",
          code: "+505"
        },
        {
          city: "尼日尔",
          code: "+227"
        },
        {
          city: "尼日利亚",
          code: "+234"
        },
        {
          city: "挪威",
          code: "+47"
        },
        {
          city: "阿曼",
          code: "+968"
        },
        {
          city: "巴基斯坦",
          code: "+92"
        },
        {
          city: "巴勒斯坦",
          code: "+970"
        },
        {
          city: "巴拿马",
          code: "+507"
        },
        {
          city: "巴布亚新几内亚",
          code: "+675"
        },
        {
          city: "巴拉圭",
          code: "+595"
        },
        {
          city: "秘鲁",
          code: "+51"
        },
        {
          city: "菲律宾",
          code: "+63"
        },
        {
          city: "波兰",
          code: "+48"
        },
        {
          city: "葡萄牙",
          code: "+351"
        },
        {
          city: "波多黎各",
          code: "+1"
        },
        {
          city: "库塔",
          code: "+974"
        },
        {
          city: "留尼汪",
          code: "+262"
        },
        {
          city: "罗马尼亚",
          code: "+40"
        },
        {
          city: "俄罗斯",
          code: "+7"
        },
        {
          city: "卢旺达",
          code: "+250"
        },
        {
          city: "萨摩亚东部",
          code: "+684"
        },
        {
          city: "萨摩亚西部",
          code: "+685"
        },
        {
          city: "圣马力诺",
          code: "+378"
        },
        {
          city: "圣多美和普林西比",
          code: "+239"
        },
        {
          city: "沙特阿拉伯",
          code: "+966"
        },
        {
          city: "塞内加尔",
          code: "+221"
        },
        {
          city: "塞尔维亚",
          code: "+381"
        },
        {
          city: "塞舌尔",
          code: "+248"
        },
        {
          city: "塞拉利昂",
          code: "+232"
        },
        {
          city: "斯洛伐克",
          code: "+421"
        },
        {
          city: "斯洛文尼亚",
          code: "+386"
        },
        {
          city: "南非",
          code: "+27"
        },
        {
          city: "韩国",
          code: "+82"
        },
        {
          city: "西班牙",
          code: "+34"
        },
        {
          city: "斯里兰卡",
          code: "+94"
        },
        {
          city: "圣基茨和尼维斯",
          code: "+1869"
        },
        {
          city: "圣卢西亚",
          code: "+1758"
        },
        {
          city: "圣文森特",
          code: "+1784"
        },
        {
          city: "苏丹",
          code: "+249"
        },
        {
          city: "苏里南",
          code: "+597"
        },
        {
          city: "斯威士兰",
          code: "+268"
        },
        {
          city: "瑞典",
          code: "+46"
        },
        {
          city: "瑞士",
          code: "+41"
        },
        {
          city: "叙利亚",
          code: "+963"
        },
        {
          city: "塔吉克斯坦",
          code: "+992"
        },
        {
          city: "坦桑尼亚",
          code: "+255"
        },
        {
          city: "泰国",
          code: "+66"
        },
        {
          city: "东帝汶",
          code: "+670"
        },
        {
          city: "多哥",
          code: "+228"
        },
        {
          city: "汤加",
          code: "+676"
        },
        {
          city: "特立尼达和多巴哥",
          code: "+1868"
        },
        {
          city: "突尼斯",
          code: "+216"
        },
        {
          city: "土耳其",
          code: "+90"
        },
        {
          city: "土库曼斯坦",
          code: "+993"
        },
        {
          city: "特克斯和凯科斯群岛",
          code: "+1649"
        },
        {
          city: "乌干达",
          code: "+256"
        },
        {
          city: "乌克兰",
          code: "+380"
        },
        {
          city: "阿拉伯联合酋长国",
          code: "+971"
        },
        {
          city: "英国",
          code: "+44"
        },
        {
          city: "美国",
          code: "+1"
        },
        {
          city: "乌拉圭",
          code: "+598"
        },
        {
          city: "乌兹别克斯坦",
          code: "+998"
        },
        {
          city: "瓦努阿图",
          code: "+678"
        },
        {
          city: "委内瑞拉",
          code: "+58"
        },
        {
          city: "越南",
          code: "+84"
        },
        {
          city: "维尔京群岛",
          code: "+1340"
        },
        {
          city: "也门",
          code: "+967"
        },
        {
          city: "赞比亚",
          code: "+260"
        },
        {
          city: "津巴布韦",
          code: "+263"
        }
      ],
      selectedCode: { city: "", code: "" }
    };
  },
  components: {
 
  },
  mounted() {
    this.inputBlur()
  },
  updated() {
  },
  methods: {
    inputFocus() {
      this.isMove = true;
      this.isPhShow = true;
    },
    inputBlur() {
      if (this.value) {
        // this.isPhShow = false;
        this.isMove = true;
      } else {
        // this.isPhShow = true;
        this.isMove = false;
      }
      this.$emit('leaveInput', this.value)
    },
    VCodeClick() {
      if (this.count_down) {
        this.count_down = false;
        var timer = window.setInterval(() => {
          this.time_60 -= 1;
          if (this.time_60 <= 0) {
            this.time_60 = 60;
            this.count_down = true;
            window.clearInterval(timer);
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input_div {
  width: 100%;
  height: 100%;
  position: relative;
  background: #1F222A;

  .placeHolder_div {
    border-radius: 5%;
    position: absolute;
    left: 4%;
    top: 30%;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #999;
    z-index: 0;
    transition: 0.375s;
  }
  .l17 {
    left: 17%;
  }
  .getVCode {
    position: absolute;
    right: 4%;
    top: 35%;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 153, 0, 1);
    &:hover {
      cursor: pointer;
    }
    z-index: 3;
  }
  .getVCode_after {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(90, 100, 119, 1);
  }
  @media screen and (max-width: 992px) {
    .placeHolder_div {
      font-size: 12px;
    }
  }
  .move_ph_div {
    top: -24%;
    display: inline-block;
    padding: 1px 8px;
    background: #1F222A;
    border-radius: 5%;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    // color: rgba(255, 255, 255, 1);
    z-index: 4;
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 4%;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    outline: none;
    background: none;
    z-index: 3;
    
    &:hover{
      border-color: #999;
    }
    &:focus{
      border-color: #00A0FF;
    }
  }
  .pl20 {
    padding-left: 20.8% !important;
  }
  .error_div {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(241, 68, 29, 1);
    position: absolute;
    top: 110%;
  }
  .select_div {
    width: 100%;
    position: absolute;
    left: 0;
    height: 100%;
  }
}
</style>
