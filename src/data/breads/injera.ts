import { BreadData } from "../types";

const injera: BreadData = {
  id: "injera",
  name: "英吉拉 Injera",
  city: "亚的斯亚贝巴",
  country: "埃塞俄比亚",
  latitude: 9.0192,
  longitude: 38.7525,
  continent: "非洲",
  breadType: "发酵面包",
  difficulty: "中等",
  modelPath: "/models/injera.glb",
  description: "埃塞俄比亚传统发酵薄饼，海绵状质地，微酸口感",
  history: "英吉拉的历史与苔麸（teff）紧密相连。苔麸是一种原产于埃塞俄比亚高原的古老谷物，已有3000多年的种植历史。英吉拉的制作方法代代相传，是埃塞俄比亚文明的活化石。传统上，英吉拉由苔麸面粉自然发酵3天制成，这种发酵过程赋予了它独特的酸味和海绵般的质地。",
  culture: "英吉拉不仅是食物，更是餐具。埃塞俄比亚人用右手撕下一块英吉拉，包裹各种炖菜（wat）一起吃，不用筷子或刀叉。共享一张大英吉拉是社交和家庭团聚的象征。在埃塞俄比亚的传统\"gursha\"仪式中，人们会亲手喂对方吃英吉拉包裹的食物以表达亲密和敬意。",
  recipe: {
    time: "约3天（含发酵）",
    servings: "8片",
    ingredients: [
      { name: "苔麸面粉（或荞麦面粉替代）", amount: "300g" },
      { name: "水", amount: "450ml" },
      { name: "盐", amount: "3g" },
    ],
    steps: [
      { step: 1, title: "调面糊", description: "将苔麸面粉和水混合搅拌至无颗粒的稀面糊。覆盖纱布，室温放置。", tips: "如果买不到苔麸面粉，可以用荞麦面粉或全麦面粉混合替代", duration: "5分钟" },
      { step: 2, title: "自然发酵", description: "让面糊在室温下自然发酵2-3天，直到表面冒泡，闻起来有酸味。每天搅拌一次。", tips: "发酵时间取决于室温，夏天2天，冬天可能需要3-4天。表面出现气泡是好现象", duration: "2-3天" },
      { step: 3, title: "调整浓度", description: "发酵好的面糊加入盐搅拌均匀。浓度应该像薄煎饼面糊，可以自由流动。太稠就加少量水。", tips: "倒出面糊时应该能画出细线", duration: "5分钟" },
      { step: 4, title: "烤制", description: "不粘锅中火加热（不放油）。从边缘开始，以螺旋方式倒入面糊，覆盖锅底。盖上锅盖烤约2分钟至表面布满小洞、边缘翘起。不要翻面。", tips: "英吉拉只烤一面。表面的小洞（眼睛）越多越好，说明发酵充分", duration: "每片2-3分钟" },
    ],
  },
};

export default injera;
