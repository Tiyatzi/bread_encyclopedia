import { BreadData } from "../types";

const pita: BreadData = {
  id: "pita",
  name: "皮塔饼 Pita",
  city: "贝鲁特",
  country: "黎巴嫩",
  latitude: 33.8938,
  longitude: 35.5018,
  continent: "亚洲",
  breadType: "发酵面包",
  difficulty: "简单",
  modelPath: "/models/pita.glb",
  description: "中东传统口袋饼，烤制时膨胀形成天然口袋",
  history: "皮塔饼是世界上最古老的面包之一，考古学家在约旦发现了14000年前的类似面包残留物。现代皮塔饼的形式在中东地区已有4000多年历史。\"Pita\"一词可能源自希腊语，意为\"平的\"或\"扁的\"。它是整个中东、地中海和北非地区的主食。",
  culture: "皮塔饼最神奇的特点是烘烤时会像气球一样膨胀，形成天然的口袋。冷却后可以从中间切开，填入各种馅料。在中东，皮塔饼是沙瓦尔玛（shawarma）、法拉费尔（falafel）和鹰嘴豆泥（hummus）的经典搭配。每天，仅以色列就消耗约800万个皮塔饼。",
  recipe: {
    time: "约2小时（含发酵）",
    servings: "8个",
    ingredients: [
      { name: "高筋面粉", amount: "400g" },
      { name: "温水", amount: "240ml" },
      { name: "橄榄油", amount: "15ml" },
      { name: "干酵母", amount: "5g" },
      { name: "白砂糖", amount: "5g" },
      { name: "盐", amount: "8g" },
    ],
    steps: [
      { step: 1, title: "和面", description: "酵母和糖溶于温水，静置5分钟。加入面粉、盐和橄榄油，揉成光滑柔软的面团。", tips: "面团要柔软但不粘手", duration: "10分钟" },
      { step: 2, title: "发酵", description: "面团放入抹油的碗中，覆盖保鲜膜，温暖处发酵1小时至体积翻倍。", duration: "1小时" },
      { step: 3, title: "整形", description: "将面团分成8份，每份揉圆。擀成约15cm直径、5mm厚的圆饼。", tips: "厚度均匀是鼓起口袋的关键，不要擀太薄", duration: "10分钟" },
      { step: 4, title: "醒发", description: "将擀好的圆饼盖上湿布，静置15分钟。", duration: "15分钟" },
      { step: 5, title: "烘烤", description: "烤箱预热到最高温（250°C以上），烤石或倒扣的烤盘一起预热。将饼放上去烤3-5分钟，饼会像气球一样鼓起。", tips: "温度要足够高才能产生蒸汽让饼鼓起来。不要打开烤箱门偷看！", duration: "每个3-5分钟" },
    ],
  },
};

export default pita;
