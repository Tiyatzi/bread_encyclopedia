import { BreadData } from "../types";

const sourdough: BreadData = {
  id: "sourdough",
  name: "酸面包 Sourdough",
  city: "旧金山",
  country: "美国",
  latitude: 37.7749,
  longitude: -122.4194,
  continent: "美洲",
  breadType: "发酵面包",
  difficulty: "困难",
  modelPath: "/models/sourdough.glb",
  description: "用天然酵母菌发酵的面包，带有独特的酸香风味",
  history: "酸面包是人类最古老的发酵面包，可追溯到公元前3700年的古埃及。19世纪淘金热时期，旧金山的矿工们随身携带酸面种（sourdough starter），因为当时的荒野没有商业酵母。旧金山独特的雾气和微生物环境造就了一种特殊的乳酸菌（Lactobacillus sanfranciscensis），使这里的酸面包风味独特。",
  culture: "旧金山酸面包是这座城市的美食名片。最著名的 Boudin Bakery 自1849年起就一直使用同一份酸面种。酸面包的制作需要\"养\"一份活的酸面种（starter），每天喂养面粉和水，就像养宠物一样。很多面包师的酸面种传承数十年甚至上百年。",
  recipe: {
    time: "约24小时（含发酵）",
    servings: "1个圆面包",
    ingredients: [
      { name: "高筋面粉", amount: "450g" },
      { name: "全麦面粉", amount: "50g" },
      { name: "水", amount: "340ml" },
      { name: "活跃的酸面种", amount: "100g" },
      { name: "盐", amount: "10g" },
    ],
    steps: [
      { step: 1, title: "自溶（Autolyse）", description: "将两种面粉和水混合，粗略搅拌成团（不加盐和酸面种），覆盖静置30-60分钟。", tips: "自溶让面筋自然形成，减少后续揉面时间", duration: "30-60分钟" },
      { step: 2, title: "加入酸面种和盐", description: "将活跃的酸面种和盐加入自溶好的面团，用手捏揉均匀。", tips: "酸面种应该在喂养后4-6小时使用，体积翻倍且顶部呈圆顶状", duration: "5分钟" },
      { step: 3, title: "折叠发酵", description: "接下来4小时内，每30分钟做一次\"拉伸折叠\"：从一侧将面团拉起拉长，折到对面。转90度，重复。共做4个方向。总共做6-8次。", tips: "前几次折叠面团会很松散，后面会逐渐变得紧实有弹性", duration: "4小时" },
      { step: 4, title: "预整形", description: "将面团倒在轻撒面粉的台面上，用刮板将面团向自己方向推，形成一个紧实的圆球。静置20分钟。", tips: "不要过度撒面粉，适当的粘性有助于形成表面张力", duration: "25分钟" },
      { step: 5, title: "最终整形", description: "将面团翻面（光面朝下），拉伸折叠成包裹状，翻转收口朝上放入撒了米粉的发酵篮中。", tips: "发酵篮撒米粉而不是面粉，防粘效果更好", duration: "10分钟" },
      { step: 6, title: "冷藏发酵", description: "用保鲜膜密封发酵篮，放入冰箱冷藏发酵12-16小时。", tips: "长时间冷藏发酵能发展更复杂的酸香风味", duration: "12-16小时" },
      { step: 7, title: "烘烤", description: "铸铁锅（Dutch oven）放入烤箱预热至250°C。取出面团倒扣在烘焙纸上，用剃刀割出花纹。放入铸铁锅加盖烤20分钟，然后去盖再烤20-25分钟至深褐色。", tips: "加盖烘烤锁住蒸汽，是形成酥脆外壳的关键", duration: "45分钟" },
    ],
  },
};

export default sourdough;
