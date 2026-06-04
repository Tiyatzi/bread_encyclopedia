import { BreadData } from "../types";

const mantou: BreadData = {
  id: "mantou",
  name: "馒头 Mantou",
  city: "济南",
  country: "中国",
  latitude: 36.6512,
  longitude: 116.9968,
  continent: "亚洲",
  breadType: "蒸制面包",
  difficulty: "简单",
  modelPath: "/models/mantou.glb",
  description: "中国传统蒸制面食，白胖柔软，是北方主食之一",
  history: "馒头的历史可追溯到三国时期。相传诸葛亮南征孟获时，需要渡泸水祭祀河神。按当地习俗需用人头祭祀，诸葛亮不忍杀人，便命人用面粉包裹肉馅做成人头形状代替，称为\"蛮头\"，后演变为\"馒头\"。到了宋代，有馅的叫包子，无馅的才专称馒头。",
  culture: "馒头是中国北方最重要的主食之一，地位相当于南方的米饭。山东是馒头文化最深厚的地区，\"山东大馒头\"闻名全国。在中国传统文化中，馒头也是重要的祭祀供品和节庆食物。春节蒸馒头象征\"蒸蒸日上\"，寓意来年好运。",
  recipe: {
    time: "约2.5小时（含发酵）",
    servings: "10个",
    ingredients: [
      { name: "中筋面粉", amount: "500g" },
      { name: "温水", amount: "260ml" },
      { name: "干酵母", amount: "5g" },
      { name: "白砂糖", amount: "20g" },
    ],
    steps: [
      { step: 1, title: "活化酵母", description: "将干酵母和糖加入温水中搅拌，静置5分钟至起泡。", tips: "水温35-38°C，太热会杀死酵母", duration: "5分钟" },
      { step: 2, title: "和面", description: "将面粉放入大盆，慢慢倒入酵母水，边倒边用筷子搅拌成絮状。然后用手揉成光滑的面团，做到\"三光\"：面光、手光、盆光。", tips: "面团稍微硬一点蒸出来更挺，水不要一次倒完", duration: "15分钟" },
      { step: 3, title: "发酵", description: "面团盖上湿布或保鲜膜，放在温暖处发酵至体积翻倍。用手指戳一个洞，不塌不回弹即可。", tips: "冬天可以放烤箱里，开灯用灯泡的余温辅助发酵", duration: "1-1.5小时" },
      { step: 4, title: "揉面排气", description: "将发酵好的面团取出，反复揉搓排出气体，揉至切面没有大气孔。", tips: "这一步很关键，揉得越充分馒头越细腻", duration: "10分钟" },
      { step: 5, title: "整形", description: "将面团搓成长条，切成10等份。每份揉圆，收口朝下放在垫了蒸笼布的蒸笼上，间隔留够（膨胀空间）。", tips: "揉圆时掌心轻轻按压旋转，收口捏紧", duration: "10分钟" },
      { step: 6, title: "二次醒发与蒸制", description: "盖上锅盖，静置醒发15-20分钟至馒头明显变大。冷水上锅，大火烧开后转中火蒸15分钟。关火后不要立即开盖，焖3-5分钟再开。", tips: "关火后立即开盖会导致馒头回缩塌陷", duration: "15分钟醒发 + 20分钟蒸制" },
    ],
  },
};

export default mantou;
