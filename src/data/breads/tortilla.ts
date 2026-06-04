import { BreadData } from "../types";

const tortilla: BreadData = {
  id: "tortilla",
  name: "玉米薄饼 Tortilla",
  city: "墨西哥城",
  country: "墨西哥",
  latitude: 19.4326,
  longitude: -99.1332,
  continent: "美洲",
  breadType: "无酵面包",
  difficulty: "简单",
  modelPath: "/models/tortilla.glb",
  description: "墨西哥传统玉米薄饼，柔韧微甜，是墨西哥菜的基石",
  history: "Tortilla 的历史可追溯到一万年前的中美洲文明。阿兹特克人和玛雅人将玉米视为神圣的食物，用石灰水（nixtamalization）处理玉米粒后研磨成面团（masa），再压成薄饼烤制。西班牙殖民者到来后，将这种食物命名为\"tortilla\"（西班牙语中\"小蛋糕\"的意思）。",
  culture: "在墨西哥，tortilla 不仅是食物，更是文化符号。墨西哥人平均每人每年消耗约90公斤玉米饼。它是 taco、enchilada、quesadilla 等经典墨西哥菜的基础。传统上由女性手工制作，用专门的玉米饼压（tortilla press）压成圆形。",
  recipe: {
    time: "约40分钟",
    servings: "12片",
    ingredients: [
      { name: "玉米面粉（Masa Harina）", amount: "300g" },
      { name: "温水", amount: "350ml" },
      { name: "盐", amount: "3g" },
    ],
    steps: [
      { step: 1, title: "和面", description: "将玉米面粉和盐混合，逐渐加入温水，用手揉成柔软不粘手的面团。面团应该像橡皮泥一样柔软。", tips: "水量根据面粉品牌调整，面团太干会裂开，太湿会粘手", duration: "5分钟" },
      { step: 2, title: "醒面", description: "用保鲜膜包裹面团，静置15分钟。", tips: "醒面让水分均匀渗透，更容易整形", duration: "15分钟" },
      { step: 3, title: "分割搓圆", description: "将面团分成12个等份（每个约30g），揉成光滑的小球。", tips: "没用到的面团要盖上保鲜膜防干", duration: "5分钟" },
      { step: 4, title: "压饼", description: "用玉米饼压或两张油纸之间，将面球压成约15cm直径、2mm厚的薄饼。", tips: "没有饼压可以用平底锅底部压，或用擀面杖擀", duration: "10分钟" },
      { step: 5, title: "烤制", description: "平底锅中火预热（不放油），放入薄饼烤约1分钟至底部出现焦斑，翻面再烤30秒至1分钟。烤好的饼用干净毛巾包裹保温。", tips: "锅温够热饼会鼓起大气泡，这是正常的", duration: "每片2分钟" },
    ],
  },
};

export default tortilla;
