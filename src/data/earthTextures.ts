export interface EarthTexture {
  id: string;
  /** 显示名称 */
  name: string;
  /** 贴图路径，放在 public/textures/ 下 */
  path: string;
  /** 缩略图预览（可选，不设则用 path 本身） */
  preview?: string;
}

/**
 * 地球贴图列表。
 *
 * 新增贴图时：
 * 1. 将图片放到 public/textures/
 * 2. 在此数组中新增一项
 */
const earthTextures: EarthTexture[] = [
  {
    id: "simple-sketches",
    name: "简笔画",
    path: "/textures/simple-sketches.png",
  },
  {
    id: "middle-ages",
    name: "中世纪",
    path: "/textures/middle-ages.png",
  },
  // 示例：你可以继续添加更多贴图
  // {
  //   id: "night",
  //   name: "夜晚灯光",
  //   path: "/textures/earth_night.jpg",
  // },
  // {
  //   id: "topo",
  //   name: "地形图",
  //   path: "/textures/earth_topo.jpg",
  // },
];

export default earthTextures;
