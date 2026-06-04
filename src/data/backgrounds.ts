export interface Background {
  id: string;
  /** 显示名称 */
  name: string;
  /** "generated" 使用代码生成的星点，"image" 使用全景图片 */
  type: "generated" | "image";
  /** type 为 "image" 时的图片路径 */
  path?: string;
}

/**
 * 背景列表。
 *
 * 新增背景时：
 * 1. 准备一张 equirectangular（等距柱状投影，2:1 宽高比）全景图
 * 2. 放到 public/textures/
 * 3. 在此数组中新增一项
 */
const backgrounds: Background[] = [
  {
    id: "baking-room",
    name: "烘焙间",
    type: "image",
    path: "/textures/baking-room.jpg",
  },
];

export default backgrounds;
