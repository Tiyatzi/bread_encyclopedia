import { BreadData } from "../types";

const damper: BreadData = {
  id: "damper",
  name: "丹波面包 Damper",
  city: "悉尼",
  country: "澳大利亚",
  latitude: -33.8688,
  longitude: 151.2093,
  continent: "大洋洲",
  breadType: "无酵面包",
  difficulty: "简单",
  modelPath: "/models/damper.glb",
  description: "澳大利亚传统丛林面包，用篝火灰烬烤制",
  history: "Damper 是澳大利亚最具标志性的传统面包，起源于19世纪的澳大利亚丛林牧民（stockmen）和赶牛人（drovers）。他们在长途赶牛旅程中只有面粉、水和盐，用篝火灰烬烤制这种简单的面包。原住民也有类似的传统，他们用本地种子研磨制作类似的面包已有数千年历史。",
  culture: "Damper 代表着澳大利亚的丛林精神（bush spirit）和自力更生的文化。传统上在篝火余烬中直接烤制，外皮硬脆内部柔软。现代澳大利亚人在露营和户外聚会时仍然喜欢制作 damper。常搭配黄油和金色糖浆（golden syrup）食用。",
  recipe: {
    time: "约45分钟",
    servings: "1个",
    ingredients: [
      { name: "自发粉（或中筋面粉+泡打粉）", amount: "300g" },
      { name: "牛奶", amount: "180ml" },
      { name: "黄油", amount: "30g" },
      { name: "盐", amount: "3g" },
    ],
    steps: [
      { step: 1, title: "混合干料", description: "将自发粉和盐在碗中混合。如果用中筋面粉，加入2茶匙泡打粉。", duration: "2分钟" },
      { step: 2, title: "加入湿料", description: "将冷黄油切小块加入面粉中，用指尖搓成面包屑状。慢慢加入牛奶，用刀切拌成粗糙的面团。", tips: "不要过度搅拌，面团粗糙有结块是正常的", duration: "5分钟" },
      { step: 3, title: "整形", description: "将面团轻轻整成一个圆球，放在铺了烘焙纸的烤盘上，稍微压扁。用刀在顶部划一个十字。", tips: "十字划痕帮助面包均匀受热膨胀", duration: "3分钟" },
      { step: 4, title: "烘烤", description: "烤箱预热200°C，烘烤25-30分钟至表面金黄、敲击底部有空心声。", tips: "户外版：将面团包在锡纸里，埋入篝火余烬中烤30-40分钟", duration: "30分钟" },
    ],
  },
};

export default damper;
