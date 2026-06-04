import { BreadData } from "../types";

const baguette: BreadData = {
  id: "baguette",
  name: "法棍 Baguette",
  city: "巴黎",
  country: "法国",
  latitude: 48.8566,
  longitude: 2.3522,
  continent: "欧洲",
  breadType: "发酵面包",
  difficulty: "中等",
  modelPath: "/models/baguette.glb",
  description: "法国经典长棍面包，外皮金黄酥脆，内部柔软多孔",
  history: "法棍的历史可追溯到19世纪的拿破仑时代。1920年，法国法律禁止面包师在凌晨4点之前工作，迫使他们寻找更快速的面包制作方式。细长的法棍因为烘烤时间短而应运而生。1993年，法国颁布了\"面包法令\"（Décret Pain），规定传统法棍只能使用面粉、水、酵母和盐四种原料。",
  culture: "法国人每天消耗约3000万根法棍。传统上，法棍不用刀切，而是用手掰开。法棍的斜切口（割纹）不仅是装饰，更是让面包在烘烤时均匀膨胀的关键。2022年，法棍被联合国教科文组织列入人类非物质文化遗产名录。",
  recipe: {
    time: "约4小时（含发酵）",
    servings: "2根",
    ingredients: [
      { name: "高筋面粉（T65）", amount: "500g" },
      { name: "水", amount: "350ml" },
      { name: "干酵母", amount: "5g" },
      { name: "盐", amount: "10g" },
    ],
    steps: [
      { step: 1, title: "混合材料", description: "将面粉倒入大碗，加入酵母搅拌均匀。缓缓加入水，用刮刀搅拌成粗糙面团，最后加入盐。", tips: "水温控制在25-28°C，过热会杀死酵母", duration: "10分钟" },
      { step: 2, title: "揉面", description: "将面团转移到撒了面粉的台面上，用掌根推出去再折回来。反复揉搓直到面团光滑有弹性，可以拉出半透明的薄膜（窗口测试）。", tips: "揉面时不要加太多面粉，面团略微粘手是正常的", duration: "15-20分钟" },
      { step: 3, title: "第一次发酵", description: "将面团放入抹了薄油的碗中，覆盖保鲜膜，室温发酵至体积翻倍。", tips: "夏天约1小时，冬天约1.5-2小时。用手指戳一个洞，不回弹即发酵完成", duration: "1-2小时" },
      { step: 4, title: "整形", description: "将面团取出轻轻排气，分成两等份。将每份面团拍成长方形，从长边向内折叠三分之一，再折叠另一侧三分之一，最后对折捏紧接缝。用手掌搓成约50cm长的棍状。", tips: "整形时动作轻柔，避免过度排气", duration: "10分钟" },
      { step: 5, title: "第二次发酵", description: "将整形好的面团放在撒了面粉的烘焙布上，面团之间留出间距。覆盖湿布，室温发酵30-45分钟。", tips: "二次发酵不要过度，面团膨胀约70%即可", duration: "30-45分钟" },
      { step: 6, title: "割纹与烘烤", description: "烤箱预热至240°C，底部放一个装水的烤盘制造蒸汽。用锋利的刀片在面团表面以15度角割3-5道斜纹，每道约5mm深。迅速放入烤箱，烘烤20-25分钟至金黄。", tips: "割纹要果断迅速，犹豫会导致面团塌陷。开烤前5分钟可以喷水增加蒸汽", duration: "25分钟" },
    ],
  },
};

export default baguette;
