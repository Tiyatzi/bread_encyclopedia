import { BreadData } from "../types";

const pretzel: BreadData = {
  id: "pretzel",
  name: "碱水面包 Pretzel",
  city: "慕尼黑",
  country: "德国",
  latitude: 48.1351,
  longitude: 11.5820,
  continent: "欧洲",
  breadType: "发酵面包",
  difficulty: "中等",
  modelPath: "/models/pretzel.glb",
  description: "德国经典碱水面包，深棕色外皮，咸香有嚼劲",
  history: "碱水面包的历史可追溯到7世纪的欧洲修道院。一种说法是意大利修道士将面团条折叠成祈祷的双臂形状作为奖励给学习祷告的孩子们的零食。\"Pretzel\"一词源自拉丁语\"bracellae\"（小手臂）。碱水浸泡工艺据说是19世纪巴伐利亚一位面包师的意外发现——他误将碱水（用于清洁烤盘）当成了糖水。",
  culture: "碱水面包是巴伐利亚文化的象征，是慕尼黑啤酒节的标配食物，搭配白肠和甜芥末酱。传统的碱水面包外形是一个三环扭结，代表着太阳和祈祷。在德国，面包师行会的标志就是碱水面包。",
  recipe: {
    time: "约3小时（含发酵）",
    servings: "8个",
    ingredients: [
      { name: "高筋面粉", amount: "500g" },
      { name: "温水", amount: "300ml" },
      { name: "无盐黄油", amount: "30g" },
      { name: "红糖", amount: "15g" },
      { name: "干酵母", amount: "7g" },
      { name: "盐", amount: "10g" },
      { name: "食用碱（烘焙碱/小苏打）", amount: "60g" },
      { name: "水（碱水用）", amount: "1000ml" },
      { name: "粗盐（表面用）", amount: "适量" },
    ],
    steps: [
      { step: 1, title: "和面", description: "酵母和红糖溶于温水，静置5分钟。加入面粉、盐和软化黄油，揉成光滑有弹性的面团。", tips: "面团要揉到有一定韧性，碱水面包需要较强的面筋", duration: "15分钟" },
      { step: 2, title: "发酵", description: "面团放入抹油的碗中，覆盖保鲜膜，室温发酵至体积翻倍。", tips: "约需1-1.5小时", duration: "1-1.5小时" },
      { step: 3, title: "整形", description: "将面团分成8等份。每份搓成约60cm长的绳状，中间粗两端细。将两端交叉扭转，再翻折到粗端形成经典的碱水面包形状。", tips: "搓长条时从中间向两端搓，保持粗细均匀", duration: "15分钟" },
      { step: 4, title: "碱水浸泡", description: "将60g食用碱溶于1000ml开水中（注意安全）。将整形好的面包逐个放入碱水中浸泡30秒，取出沥干放在烤盘上。", tips: "碱水有腐蚀性，务必戴手套操作。也可用小苏打替代（效果稍弱但更安全）", duration: "10分钟" },
      { step: 5, title: "烘烤", description: "在每个碱水面包粗处用刀片割一道口。撒上粗盐。烤箱预热220°C，烘烤15-18分钟至深棕色。", tips: "碱水面包的深色是碱水与高温的美拉德反应，不是烤焦", duration: "18分钟" },
    ],
  },
};

export default pretzel;
