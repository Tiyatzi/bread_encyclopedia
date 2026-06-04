import { BreadData } from "../types";

const naan: BreadData = {
  id: "naan",
  name: "馕 Naan",
  city: "德里",
  country: "印度",
  latitude: 28.6139,
  longitude: 77.2090,
  continent: "亚洲",
  breadType: "发酵面包",
  difficulty: "简单",
  modelPath: "/models/naan.glb",
  description: "印度传统烤饼，外焦里软，是咖喱的完美搭档",
  history: "馕的历史可追溯到2500年前的古波斯。\"Naan\"一词源自波斯语，意为\"面包\"。最早的文字记载出现在1300年的印度诗人阿米尔·库斯罗的作品中。馕通过丝绸之路传播到中亚和南亚各地，在不同文化中发展出了各种变体。中国新疆的馕也有着同样悠久的历史。",
  culture: "在印度，馕传统上在坦都尔（tandoor）泥炉中烤制，饼贴在炉壁上高温烘烤。馕是北印度餐桌上不可或缺的主食，用手撕下一块蘸咖喱食用。不同地区有不同变体：黄油馕（Butter Naan）、蒜香馕（Garlic Naan）、芝士馕（Cheese Naan）等。",
  recipe: {
    time: "约2小时（含发酵）",
    servings: "6片",
    ingredients: [
      { name: "中筋面粉", amount: "300g" },
      { name: "酸奶", amount: "80g" },
      { name: "温水", amount: "100ml" },
      { name: "干酵母", amount: "3g" },
      { name: "白砂糖", amount: "10g" },
      { name: "盐", amount: "5g" },
      { name: "植物油", amount: "15ml" },
      { name: "黄油（刷面用）", amount: "30g" },
    ],
    steps: [
      { step: 1, title: "活化酵母", description: "将干酵母和糖加入温水中，静置5-10分钟至表面起泡。", tips: "水温38-40°C最佳，手感微温不烫", duration: "10分钟" },
      { step: 2, title: "和面", description: "将面粉和盐混合，加入酵母水、酸奶和植物油，揉成柔软光滑的面团。", tips: "面团应该柔软略粘，不要加太多面粉", duration: "10分钟" },
      { step: 3, title: "发酵", description: "面团放入抹油的碗中，覆盖湿布，温暖处发酵至体积翻倍。", tips: "可以放在关闭的烤箱中，旁边放一杯热水加速发酵", duration: "1小时" },
      { step: 4, title: "整形", description: "将面团分成6等份，每份揉圆后擀成约5mm厚的泪滴形或椭圆形。", tips: "不需要擀得太薄，馕需要一定厚度才有嚼劲", duration: "10分钟" },
      { step: 5, title: "烤制", description: "铸铁锅或平底锅大火预热至冒烟。将馕放入锅中，盖盖烤约2分钟至底部起焦斑和大气泡。翻面再烤1-2分钟。取出后立即刷上融化的黄油。", tips: "也可以用烤箱最高温（250°C）烤5-6分钟，放在预热的烤石上效果更好", duration: "每片3-4分钟" },
    ],
  },
};

export default naan;
