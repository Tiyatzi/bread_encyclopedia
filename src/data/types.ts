export interface RecipeStep {
  step: number;
  title: string;
  description: string;
  tips?: string;
  duration: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  time: string;
  servings: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
}

export interface BreadData {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  continent: string;
  breadType: string;
  difficulty: string;
  modelPath: string;
  /** 模型缩放，默认 0.08 */
  modelScale?: number;
  /**
   * 模型局部旋转修正 [x, y, z]，单位为弧度。
   * 用于修正 GLB 模型自身坐标系与"顶部朝上（Y+）"不一致的情况。
   * 例如：模型的顶部沿 Z 轴 → 设置 [-Math.PI / 2, 0, 0] 让它绕 X 轴旋转 -90°。
   * 省略时默认 [0, 0, 0]（不做修正）。
   */
  modelRotation?: [number, number, number];
  description: string;
  history: string;
  culture: string;
  recipe: Recipe;
}
