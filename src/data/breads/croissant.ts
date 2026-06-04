import { BreadData } from "../types";

const croissant: BreadData = {
  id: "croissant",
  name: "可颂 Croissant",
  city: "维也纳",
  country: "奥地利",
  latitude: 48.2082,
  longitude: 16.3738,
  continent: "欧洲",
  breadType: "起酥面包",
  difficulty: "困难",
  modelPath: "/models/croissant.glb",
  description: "经典起酥面包，层层叠叠的黄油酥皮，金黄香酥",
  history: "可颂的起源有多种说法。最著名的传说与1683年奥斯曼帝国围攻维也纳有关：维也纳的面包师在清晨发现了敌军的地道，拯救了城市。为了纪念胜利，他们制作了新月形（奥斯曼帝国标志）的面包。后来，奥地利公主玛丽·安托瓦内特嫁到法国，将可颂带入了法国宫廷。",
  culture: "法国人将可颂视为早餐的灵魂。传统法式早餐就是一杯咖啡配一个可颂。正宗的可颂使用纯黄油制作，呈菱形；使用人造黄油的则做成弯月形以示区别。一个标准可颂包含约27层酥皮。",
  recipe: {
    time: "约12小时（含冷藏）",
    servings: "8个",
    ingredients: [
      { name: "高筋面粉", amount: "500g" },
      { name: "牛奶", amount: "300ml" },
      { name: "白砂糖", amount: "50g" },
      { name: "盐", amount: "10g" },
      { name: "干酵母", amount: "7g" },
      { name: "无盐黄油（面团用）", amount: "30g" },
      { name: "无盐黄油（折叠用，片状）", amount: "250g" },
      { name: "蛋液（刷面用）", amount: "1个" },
    ],
    steps: [
      { step: 1, title: "制作面团", description: "将面粉、糖、盐、酵母混合，加入温牛奶搅拌成团。加入软化黄油揉至光滑。包保鲜膜，冰箱冷藏至少4小时（最好过夜）。", tips: "面团不需要揉到完全光滑，稍微粗糙即可", duration: "15分钟 + 4小时冷藏" },
      { step: 2, title: "准备黄油片", description: "将250g黄油放在两张油纸之间，用擀面杖敲打并擀成约20×20cm的正方形。冷藏至硬但可弯曲。", tips: "黄油的硬度要和面团接近，太硬会碎裂，太软会融化", duration: "10分钟" },
      { step: 3, title: "第一次折叠", description: "将面团擀成黄油片两倍大的正方形。将黄油片放在中间，像信封一样将面团四角折向中心包住黄油。擀成长方形，做一次三折（像折信纸）。包保鲜膜，冷藏30分钟。", tips: "每次擀面方向要一致，折叠后旋转90度再擀", duration: "15分钟 + 30分钟冷藏" },
      { step: 4, title: "第二、三次折叠", description: "重复擀开+三折的步骤两次，每次之间冷藏30分钟。总共完成三次三折。", tips: "如果操作中黄油开始融化，立即放回冰箱冷藏", duration: "30分钟 + 1小时冷藏" },
      { step: 5, title: "整形", description: "将面团擀成约5mm厚的长方形。切成等腰三角形（底边约10cm，高约20cm）。从底边向尖端卷起，将尖端压在底部。弯成月牙形。", tips: "卷的时候稍微拉伸三角形，卷出的层次更多", duration: "20分钟" },
      { step: 6, title: "最终发酵与烘烤", description: "将可颂放在铺了烘焙纸的烤盘上，室温发酵1.5-2小时至体积明显膨大。刷蛋液。烤箱预热200°C，烘烤15-18分钟至深金色。", tips: "发酵时温度不要超过28°C，否则黄油会融化导致酥层失败", duration: "2小时发酵 + 18分钟烘烤" },
    ],
  },
};

export default croissant;
