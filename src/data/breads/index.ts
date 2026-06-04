import baguette from "./baguette";
import croissant from "./croissant";
import naan from "./naan";
import mantou from "./mantou";
import tortilla from "./tortilla";
import sourdough from "./sourdough";
import focaccia from "./focaccia";
import pretzel from "./pretzel";
import injera from "./injera";
import pita from "./pita";
import damper from "./damper";
import { BreadData } from "../types";
export type { BreadData, Recipe, RecipeStep, Ingredient } from "../types";

/**
 * 所有面包数据汇总。
 * 新增面包时：
 * 1. 在此目录新建 <id>.ts 文件
 * 2. 在此处 import 并加入数组
 * 3. 将对应 .glb 模型放入 public/models/<id>.glb
 */
const breads: BreadData[] = [
  baguette,
  croissant,
  naan,
  mantou,
  tortilla,
  sourdough,
  focaccia,
  pretzel,
  injera,
  pita,
  damper,
];

export default breads;

// 同时导出各个面包，方便按需引用
export {
  baguette,
  croissant,
  naan,
  mantou,
  tortilla,
  sourdough,
  focaccia,
  pretzel,
  injera,
  pita,
  damper,
};
