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
  description: string;
  history: string;
  culture: string;
  recipe: Recipe;
}
