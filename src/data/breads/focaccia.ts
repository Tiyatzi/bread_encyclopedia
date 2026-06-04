import { BreadData } from "../types";

const focaccia: BreadData = {
  id: "focaccia",
  name: "佛卡夏 Focaccia",
  city: "热那亚",
  country: "意大利",
  latitude: 44.4056,
  longitude: 8.9463,
  continent: "欧洲",
  breadType: "发酵面包",
  difficulty: "简单",
  modelPath: "/models/focaccia.glb",
  description: "意大利经典橄榄油扁面包，表面布满指压小坑",
  history: "佛卡夏起源于古罗马时期的意大利利古里亚地区，名字来源于拉丁语\"focus\"（壁炉），因为最初是在壁炉灰烬上烘烤的。热那亚是佛卡夏的故乡，当地的 Focaccia di Genova 有着数百年的传统。古罗马人将它作为祭祀面包献给众神。",
  culture: "在热那亚，佛卡夏是早餐的首选，当地人喜欢蘸着卡布奇诺吃。佛卡夏表面标志性的指压小坑不仅美观，还能让橄榄油均匀分布。各地区有不同变体：热那亚式（薄脆，大量橄榄油）、巴里式（配番茄和橄榄）、梅西纳式（加奶酪和凤尾鱼）。",
  recipe: {
    time: "约3小时（含发酵）",
    servings: "1大张",
    ingredients: [
      { name: "高筋面粉", amount: "400g" },
      { name: "温水", amount: "300ml" },
      { name: "特级初榨橄榄油", amount: "60ml + 30ml（表面用）" },
      { name: "干酵母", amount: "5g" },
      { name: "盐", amount: "8g" },
      { name: "粗海盐（表面用）", amount: "适量" },
      { name: "迷迭香（可选）", amount: "适量" },
    ],
    steps: [
      { step: 1, title: "混合面团", description: "将酵母溶于温水，静置5分钟。加入面粉、盐和30ml橄榄油，搅拌成湿润的面团。不需要过度揉面。", tips: "佛卡夏面团含水量高，比较湿粘是正常的", duration: "10分钟" },
      { step: 2, title: "折叠发酵", description: "每30分钟做一次拉伸折叠（4个方向各一次），共做3-4次。期间覆盖保鲜膜。之后让面团继续发酵至体积翻倍。", tips: "折叠代替揉面，既省力又能形成好的面筋结构", duration: "2小时" },
      { step: 3, title: "入盘整形", description: "在烤盘上倒入30ml橄榄油。将面团转移到烤盘上，轻轻拉伸至铺满烤盘。如果面团回缩，静置10分钟再拉。", tips: "用指尖而非指甲按压，动作轻柔", duration: "10分钟" },
      { step: 4, title: "二次发酵与指压", description: "覆盖保鲜膜，室温发酵30分钟。然后用手指均匀地在面团表面按出小坑，撒上粗海盐和迷迭香。", tips: "小坑要按到底，这样烤出来才有标志性的凹凸感", duration: "35分钟" },
      { step: 5, title: "烘烤", description: "烤箱预热220°C，烘烤18-22分钟至表面金黄。出炉后再淋一点橄榄油。", tips: "烤盘放在烤箱中下层，底部更脆", duration: "22分钟" },
    ],
  },
};

export default focaccia;
