# 面包百科 - 资源维护手册

> **重要**：代码结构变更时，必须同步更新本文档。

## 目录

- [项目结构总览](#项目结构总览)
- [面包数据维护](#面包数据维护)
- [3D 模型维护](#3d-模型维护)
- [地球贴图维护](#地球贴图维护)
- [星空背景维护](#星空背景维护)
- [UI 组件说明](#ui-组件说明)
- [常见操作速查](#常见操作速查)
- [素材来源推荐](#素材来源推荐)
- [模型朝向调试指南](#模型朝向调试指南)
- [部署排障记录](#部署排障记录)

---

## 项目结构总览

```
bread_encyclopedia/
├── public/
│   ├── models/              # 面包 3D 模型（.glb 格式）
│   │   ├── baguette.glb
│   │   ├── croissant.glb
│   │   └── ...
│   └── textures/            # 地球贴图
│       ├── earth.png
│       └── ...
├── src/
│   ├── data/
│   │   ├── types.ts         # 所有数据类型定义
│   │   ├── earthTextures.ts # 地球贴图配置列表
│   │   ├── backgrounds.ts    # 背景配置列表
│   │   └── breads/          # 面包数据（每个面包一个文件）
│   │       ├── index.ts     # 汇总导出
│   │       ├── baguette.ts
│   │       ├── croissant.ts
│   │       └── ...
│   ├── components/
│   │   ├── Earth.tsx        # 地球球体（接收贴图路径）
│   │   ├── EarthScene.tsx   # 3D 场景总控
│   │   ├── BreadModel.tsx   # 单个面包模型
│   │   ├── Starfield.tsx    # 星空背景（支持生成/图片两种模式）
│   │   └── ui/
│   │       ├── AppUI.tsx            # UI 覆盖层容器
│   │       ├── TopStats.tsx         # 顶部标题与计数
│   │       ├── ControlPanel.tsx     # 底部筛选栏
│   │       ├── BreadDetailPanel.tsx # 面包详情面板
│   │       ├── RecipeSteps.tsx      # 制作步骤卡片
│   │       ├── TextureSwitcher.tsx  # 地球贴图切换按钮
│   │       └── BackgroundSwitcher.tsx # 星空背景切换按钮
│   ├── store/
│   │   └── AppContext.tsx   # 全局状态管理
│   └── utils/
│       └── coordinates.ts   # 经纬度转 3D 坐标
```

---

## 面包数据维护

### 数据类型定义

所有类型定义在 `src/data/types.ts`：

```typescript
interface BreadData {
  id: string;           // 唯一标识，同时对应模型文件名
  name: string;         // 显示名称，如 "法棍 Baguette"
  city: string;         // 所在城市
  country: string;      // 所在国家
  latitude: number;     // 纬度
  longitude: number;    // 经度
  continent: string;    // 大洲（用于筛选）
  breadType: string;    // 面包类型（用于筛选）
  difficulty: string;   // 制作难度（用于筛选）
  modelPath: string;    // 3D 模型路径
  modelScale?: number;  // 模型缩放比例，默认 0.08
  modelRotation?: [number, number, number]; // 模型局部旋转修正 [x, y, z]，弧度，默认 [0,0,0]
  description: string;  // 一句话简介
  history: string;      // 历史介绍
  culture: string;      // 文化背景
  recipe: Recipe;       // 制作教程
}
```

### 修改现有面包

直接编辑 `src/data/breads/<id>.ts` 即可。

**改配方示例**（修改法棍的步骤）：
```
编辑文件：src/data/breads/baguette.ts
修改 recipe.steps 数组中的对应步骤
```

**改模型示例**（替换法棍的 3D 模型）：
1. 将新模型放到 `public/models/baguette.glb`（覆盖旧文件）
2. 如果新模型大小不同，在 `src/data/breads/baguette.ts` 中调整 `modelScale`：
   ```typescript
   modelScale: 0.12,  // 默认 0.08，数字越大模型越大
   ```

### 新增面包

**三步完成**：

#### 第 1 步：创建数据文件

新建 `src/data/breads/<id>.ts`，参考已有面包文件的格式：

```typescript
import { BreadData } from "../types";

const ciabatta: BreadData = {
  id: "ciabatta",
  name: "恰巴塔 Ciabatta",
  city: "维罗纳",
  country: "意大利",
  latitude: 45.4384,
  longitude: 10.9916,
  continent: "欧洲",
  breadType: "发酵面包",
  difficulty: "中等",
  modelPath: "/models/ciabatta.glb",
  // modelScale: 0.08,  // 可选，不写则默认 0.08
  description: "...",
  history: "...",
  culture: "...",
  recipe: {
    time: "...",
    servings: "...",
    ingredients: [...],
    steps: [...],
  },
};

export default ciabatta;
```

#### 第 2 步：注册到汇总文件

编辑 `src/data/breads/index.ts`，添加两处：

```typescript
// 顶部添加 import
import ciabatta from "./ciabatta";

// 数组中添加
const breads: BreadData[] = [
  // ...已有面包
  ciabatta,  // ← 新增
];

// 底部 export 中添加
export {
  // ...已有面包
  ciabatta,  // ← 新增
};
```

#### 第 3 步：放入 3D 模型

将 `.glb` 模型文件放到 `public/models/ciabatta.glb`，文件名必须与 `modelPath` 中的一致。

### 删除面包

1. 从 `src/data/breads/index.ts` 中移除 import 和数组中的引用
2. 删除 `src/data/breads/<id>.ts`
3. 可选：删除 `public/models/<id>.glb`

### 筛选值说明

筛选选项是从数据中自动提取的，无需手动维护。只要面包数据中的字段值一致，筛选就能正常工作：

| 筛选维度 | 字段 | 已有值 |
|---------|------|--------|
| 大洲 | `continent` | 欧洲、亚洲、美洲、非洲、大洋洲 |
| 面包类型 | `breadType` | 发酵面包、无酵面包、起酥面包、蒸制面包 |
| 难度 | `difficulty` | 简单、中等、困难 |

新值会自动出现在筛选面板中，无需改代码。

---

## 3D 模型维护

### 文件规范

| 项目 | 要求 |
|------|------|
| 格式 | `.glb`（单文件 glTF Binary） |
| 位置 | `public/models/<id>.glb` |
| 命名 | 与面包 `id` 一致（纯英文小写） |
| 大小 | 建议 < 1MB（越小加载越快） |
| 风格 | 建议统一为低多边形/卡通风格 |

### 替换模型

1. 将新模型放到 `public/models/<id>.glb`，覆盖旧文件
2. 如果大小比例不同，修改对应面包文件中的 `modelScale`
3. 清除浏览器缓存或硬刷新查看效果

### 模型缩放调整

在 `src/data/breads/<id>.ts` 中设置 `modelScale`：

```typescript
modelScale: 0.05,  // 缩小
modelScale: 0.08,  // 默认值
modelScale: 0.15,  // 放大
```

### 模型朝向修正

不同 GLB 模型的内部坐标系可能不一致（有些 Y 朝上，有些 Z 朝上）。
如果模型放到地球上后顶部没有朝外（歪了/倒了），用 `modelRotation` 修正：

在 `src/data/breads/<id>.ts` 中设置 `modelRotation`：

```typescript
// 模型 Z 轴朝上的情况：绕 X 轴旋转 -90°
modelRotation: [-Math.PI / 2, 0, 0],

// 模型上下颠倒的情况：绕 X 轴旋转 180°
modelRotation: [Math.PI, 0, 0],

// 组合旋转（先 X 再 Y 再 Z，单位弧度）
modelRotation: [-Math.PI / 2, 0, Math.PI / 4],
```

**排查方法**：在本地 `npm run dev` 中调整值，实时查看效果。

实际渲染逻辑在 `src/components/BreadModel.tsx`：
```typescript
<primitive
  object={clonedScene}
  scale={bread.modelScale ?? 0.08}
  rotation={bread.modelRotation ?? [0, 0, 0]}
/>
```

### 模型格式转换

如果下载的模型不是 `.glb` 格式：

- **`.gltf` + 贴图文件** → 用 Blender 打开后导出为 `.glb`
- **`.fbx` / `.obj`** → 用 Blender 导入后导出为 `.glb`
- **在线转换** → [gltf.report](https://gltf.report/) 可预览和导出

### 模型压缩

推荐使用 [gltf-transform](https://gltf-transform.dev/) 压缩：

```bash
npx @gltf-transform/cli optimize input.glb output.glb --compress draco
```

---

## 地球贴图维护

### 配置文件

贴图列表在 `src/data/earthTextures.ts`：

```typescript
interface EarthTexture {
  id: string;       // 唯一标识
  name: string;     // UI 上显示的名称
  path: string;     // 贴图路径（本地或远程 URL）
  preview?: string; // 可选，缩略图路径
}
```

### 添加新贴图

**两步完成**：

#### 第 1 步：放入贴图文件

将图片放到 `public/textures/` 目录下：
```
public/textures/earth_night.jpg
```

支持的图片格式：`.jpg`、`.png`、`.webp`

贴图分辨率建议：
| 场景 | 分辨率 | 文件大小 |
|------|--------|---------|
| 快速加载 | 2048×1024 | ~500KB |
| 平衡 | 4096×2048 | ~2MB |
| 高清 | 8192×4096 | ~8MB |

#### 第 2 步：注册到配置

编辑 `src/data/earthTextures.ts`，在数组中新增一项：

```typescript
const earthTextures: EarthTexture[] = [
  // ...已有贴图
  {
    id: "night",
    name: "夜晚灯光",
    path: "/textures/earth_night.jpg",
  },
];
```

UI 上会自动出现新的切换按钮。

### 删除贴图

1. 从 `src/data/earthTextures.ts` 数组中移除对应项
2. 可选：删除 `public/textures/` 中的文件
3. 注意：不要删除数组中的第一项（它是默认贴图）

### 使用远程贴图

`path` 支持完整 URL，可用于 CDN 或远程资源：

```typescript
{
  id: "blue-marble",
  name: "蓝色弹珠",
  path: "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg",
},
```

但建议优先使用本地文件，避免 CDN 不可用导致加载失败。

### 贴图来源推荐

| 来源 | 说明 |
|------|------|
| [NASA Visible Earth](https://visibleearth.nasa.gov/collection/1484/blue-marble) | 官方卫星图，公共领域 |
| [Solar System Scope](https://www.solarsystemscope.com/textures/) | 2K/8K，CC BY 4.0 |
| [Natural Earth](https://www.naturalearthdata.com/) | 矢量/栅格地图数据，公共领域 |

---

## 星空背景维护

### 配置文件

背景列表在 `src/data/backgrounds.ts`：

```typescript
interface Background {
  id: string;              // 唯一标识
  name: string;            // UI 上显示的名称
  type: "generated" | "image";  // generated=代码生成星点，image=全景图片
  path?: string;           // type 为 "image" 时的图片路径
}
```

### 两种背景类型

| 类型 | 说明 |
|------|------|
| `generated` | 代码随机生成 2000 个白色星点，无需图片文件 |
| `image` | 使用一张全景图片作为天空球，包裹整个场景 |

### 添加全景图片背景

**两步完成**：

#### 第 1 步：放入图片

将图片放到 `public/textures/` 目录下。

**图片要求**：
- 投影类型：**equirectangular（等距柱状投影）**，宽高比 2:1
- 格式：`.jpg`、`.png`、`.webp`
- 分辨率建议：4096×2048（平衡质量和加载速度）
- 搜索关键词：`equirectangular space HDRI`、`starry sky panorama`

#### 第 2 步：注册到配置

编辑 `src/data/backgrounds.ts`，在数组中新增一项：

```typescript
const backgrounds: Background[] = [
  {
    id: "default",
    name: "默认星空",
    type: "generated",
  },
  {
    id: "deep-space",
    name: "深空",
    type: "image",
    path: "/textures/sky_deep_space.jpg",
  },
];
```

UI 左侧会自动出现切换按钮（只有一个背景时按钮自动隐藏）。

### 删除背景

1. 从 `src/data/backgrounds.ts` 数组中移除对应项
2. 可选：删除 `public/textures/` 中的文件
3. 注意：不要删除数组中的第一项（它是默认背景）

### 背景素材来源

| 来源 | 说明 |
|------|------|
| [Poly Haven - HDRIs](https://polyhaven.com/hdris/skies) | 搜 "starry sky"，免费 CC0 |
| [ambientCG](https://ambientcg.com/) | 搜 "space"，免费 CC0 |
| [Humus Textures](http://www.humus.name/index.php?page=Textures) | 免费天空全景 |

---

## UI 组件说明

| 组件 | 文件 | 说明 |
|------|------|------|
| 顶部标题 | `src/components/ui/TopStats.tsx` | 显示"面包百科"和面包计数 |
| 筛选面板 | `src/components/ui/ControlPanel.tsx` | 底部，按大洲/类型/难度筛选 |
| 详情面板 | `src/components/ui/BreadDetailPanel.tsx` | 右侧，显示选中面包的完整信息 |
| 制作步骤 | `src/components/ui/RecipeSteps.tsx` | 详情面板内的步骤卡片 |
| 贴图切换 | `src/components/ui/TextureSwitcher.tsx` | 右侧中部，切换地球贴图 |
| 背景切换 | `src/components/ui/BackgroundSwitcher.tsx` | 左侧中部，切换星空背景（仅多于一个时显示） |

### 状态管理

全局状态在 `src/store/AppContext.tsx`，主要状态：

| 状态 | 说明 |
|------|------|
| `selectedBreadId` | 当前选中的面包 id |
| `continentFilter` | 大洲筛选 |
| `typeFilter` | 面包类型筛选 |
| `difficultyFilter` | 难度筛选 |
| `earthTextureId` | 当前地球贴图 id |
| `backgroundId` | 当前背景 id |

---

## 常见操作速查

### 改某个面包的制作教程
```
编辑 src/data/breads/<id>.ts → recipe.steps
```

### 换某个面包的 3D 模型
```
1. 新模型放到 public/models/<id>.glb
2. 可选：调整 src/data/breads/<id>.ts 中的 modelScale
3. 如果模型朝向不对，设置 modelRotation（见「模型朝向修正」）
```

### 新增一种面包
```
1. 新建 src/data/breads/<id>.ts
2. 在 src/data/breads/index.ts 中 import 并加入数组
3. 模型放到 public/models/<id>.glb
```

### 新增一套地球贴图
```
1. 图片放到 public/textures/
2. 在 src/data/earthTextures.ts 数组中添加一项
```

### 新增一套星空背景
```
1. 全景图放到 public/textures/（equirectangular 格式，2:1 宽高比）
2. 在 src/data/backgrounds.ts 数组中添加一项（type: "image"）
```

### 调整面包在地球上的位置
```
编辑 src/data/breads/<id>.ts → latitude / longitude
```

### 调整模型大小
```
编辑 src/data/breads/<id>.ts → modelScale（默认 0.08）
```

### 修正模型朝向
```
编辑 src/data/breads/<id>.ts → modelRotation（默认 [0, 0, 0]）
常见：模型 Z 朝上 → [-Math.PI / 2, 0, 0]
```

### 本地开发
```bash
npm run dev          # 启动开发服务器 http://localhost:3000
npx next build       # 构建检查
```

---

## 素材来源推荐

### 3D 面包模型

| 来源 | 说明 |
|------|------|
| [Sketchfab](https://sketchfab.com) | 搜索 bread/baguette/croissant 等，筛选 CC 协议，下载 GLB |
| [Poly Pizza](https://poly.pizza/) | 低多边形风格，免费商用（CC BY） |
| [Quaternius](https://quaternius.com/) | 免费低多边形食物包 |
| [CGTrader](https://www.cgtrader.com/free-3d-models/food) | 部分免费 |
| [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free/bread) | 免费区有少量面包模型 |

### 地球贴图

| 来源 | 说明 |
|------|------|
| [NASA Visible Earth](https://visibleearth.nasa.gov/collection/1484/blue-marble) | 卫星真实照片，公共领域 |
| [Solar System Scope](https://www.solarsystemscope.com/textures/) | 多种风格，CC BY 4.0 |
| [Natural Earth](https://www.naturalearthdata.com/) | 制图风格地图，公共领域 |
| [Three.js textures](https://threejs.org/examples/textures/) | 2K 快速预览用 |

### 星空背景

| 来源 | 说明 |
|------|------|
| [Poly Haven](https://polyhaven.com/hdris/skies) | 搜 "starry sky"，免费 CC0 |
| [ambientCG](https://ambientcg.com/) | 搜 "space"，免费 CC0 |
| [Humus Textures](http://www.humus.name/index.php?page=Textures) | 免费天空全景 |

---

## 模型朝向调试指南

### 原理说明

每个面包模型在地球上的放置分两层旋转：

```
<group position={球面坐标} quaternion={法线对齐}>      ← 外层：让 Y+ 指向球面外侧
  <primitive rotation={modelRotation} />                ← 内层：修正模型自身坐标系
</group>
```

1. **外层（自动）**：`BreadModel.tsx` 用 `setFromUnitVectors(Y+, 球面法线)` 计算四元数，把模型的 Y 轴对齐到球面法线方向。这样只要模型自身的"顶部"是 Y+，放上去就是顶部朝外的。
2. **内层（手动）**：不同建模软件导出的 GLB 坐标系不一致，需要通过 `modelRotation` 做局部修正。

### 不同建模软件的坐标系差异

| 软件 | 默认"上"方向 | 导出 GLB 后通常需要的 modelRotation |
|------|-------------|-------------------------------------|
| Blender（默认 Z-up） | Z+ | `[-Math.PI / 2, 0, 0]` |
| Blender（已设 Y-up） | Y+ | `[0, 0, 0]`（无需修正） |
| Maya / 3ds Max | Y+ | `[0, 0, 0]`（无需修正） |
| SketchUp | Z+ | `[-Math.PI / 2, 0, 0]` |

> GLB/glTF 规范要求 Y-up，但很多导出器不做转换，所以实际拿到的模型可能是任意朝向。

### 调试步骤

#### 第 1 步：放入模型，不设 modelRotation

```typescript
// src/data/breads/baguette.ts
modelPath: "/models/baguette.glb",
// 先不写 modelRotation
```

运行 `npm run dev`，观察模型在地球上的状态：
- **正常**：面包顶部朝外，底部贴着球面 → 不需要修正
- **侧躺**：面包横着 → 多半是 Z-up 模型
- **倒立**：面包底部朝外 → 上下颠倒
- **其他角度**：需要组合旋转

#### 第 2 步：确定修正值

| 观察到的现象 | 原因 | 修正值 |
|-------------|------|--------|
| 面包侧躺（Z 轴方向朝外） | 模型是 Z-up | `[-Math.PI / 2, 0, 0]` |
| 面包倒立（底部朝外） | 上下颠倒 | `[Math.PI, 0, 0]` |
| 面包侧躺且倒立 | Z-up + 颠倒 | `[Math.PI / 2, 0, 0]` |
| 面包正面朝外但绕 Y 轴歪了 | 需要绕 Y 轴转 | `[0, 需要的弧度, 0]` |

#### 第 3 步：写入配置

```typescript
// src/data/breads/baguette.ts
modelRotation: [-Math.PI / 2, 0, 0],
```

保存后热更新会立即生效，反复微调直到满意。

#### 第 4 步：用浏览器 DevTools 精调

如果角度比较微妙，可以在浏览器控制台临时调试：

```javascript
// 找到场景中的面包模型
const scene = document.querySelector('canvas').__r$;
// 或者直接在 React DevTools 中找到 BreadModel 组件的 props
```

更方便的方式是在代码中临时加一个 `<axesHelper args={[0.3]} />` 来可视化坐标轴：

```tsx
// BreadModel.tsx 临时调试用，调完删掉
<group ref={groupRef} position={position} quaternion={rotation}>
  <axesHelper args={[0.3]} />  {/* 红=X 绿=Y 蓝=Z */}
  <primitive ... />
</group>
```

绿色轴（Y）应该指向球面外侧。如果不是，说明 `modelRotation` 还需要调整。

### 弧度速查

| 角度 | 弧度 |
|------|------|
| 30° | `Math.PI / 6` ≈ 0.524 |
| 45° | `Math.PI / 4` ≈ 0.785 |
| 90° | `Math.PI / 2` ≈ 1.571 |
| 180° | `Math.PI` ≈ 3.142 |
| -90° | `-Math.PI / 2` ≈ -1.571 |

### 相关代码文件

| 文件 | 作用 |
|------|------|
| `src/components/BreadModel.tsx:52-56` | 外层：法线对齐四元数计算 |
| `src/components/BreadModel.tsx:148` | 内层：应用 `modelRotation` |
| `src/data/types.ts` | `modelRotation` 类型定义 |
| `src/utils/coordinates.ts` | `latLngToPosition` 经纬度转球面坐标 |

---

## 部署排障记录

本项目从 Vercel 迁移到 GitHub Pages 的过程中遇到过以下问题，记录在此供后续参考。

### 问题 1：GitHub Pages 3D 场景空白（已解决）

**现象**：本地 `npm run dev` 正常显示，GitHub Pages 上只有空白画布，控制台仅有 `THREE.Clock: This module has been deprecated` 警告，无报错。

**根因 A — 资源路径缺少 basePath 前缀**：

GitHub Pages 部署在子路径 `/bread_encyclopedia/` 下，但 Three.js 的 `useTexture` / `useGLTF` 不经过 Next.js 路由，直接用 fetch 请求 `/textures/xxx.png`，实际应请求 `/bread_encyclopedia/textures/xxx.png`。

最初在 `next.config.ts` 的 `env` 字段设置 `NEXT_PUBLIC_BASE_PATH`，但 Turbopack 没有正确内联这个值，导致运行时拿到空字符串。

**修复**：改用 `.env.production` 文件设置环境变量：

```
# .env.production
NEXT_PUBLIC_BASE_PATH=/bread_encyclopedia
```

`src/lib/basePath.ts` 中的 `assetPath()` 函数读取该变量拼接路径：

```typescript
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
```

**验证方法**：构建后在 `out/_next/static/chunks/` 的 JS 文件中搜索 `simple-sketches`，确认周围的 `assetPath` 函数已被内联为 `` `/bread_encyclopedia${e}` ``。

**根因 B — 缺少 Suspense 边界**：

`<Earth>` 和 `<Starfield>` 组件使用了 `useTexture`（drei 的纹理加载 hook），该 hook 内部使用 React Suspense 机制。但这两个组件没有被 `<Suspense>` 包裹，导致 suspend 时整个 R3F 场景挂起，没有 fallback 可以接住。

在本地开发模式下因 HMR 和缓存可能偶尔能显示，但在生产构建中稳定复现空白。

**修复**（`src/components/EarthScene.tsx`）：

```tsx
// 修复前 — Earth 和 Starfield 没有 Suspense 边界
<Starfield background={background} />
<Earth ref={earthRef} ...>
  <BreadsLayer ... />
</Earth>

// 修复后 — 每个使用 useTexture/useGLTF 的组件都用 Suspense 包裹
<Suspense fallback={null}>
  <Starfield background={background} />
</Suspense>
<Suspense fallback={null}>
  <Earth ref={earthRef} ...>
    <BreadsLayer ... />
  </Earth>
</Suspense>
```

> **经验**：在 R3F 中，任何使用 `useTexture`、`useGLTF`、`useLoader` 等 drei hook 的组件都必须被 `<Suspense>` 包裹。`BreadsLayer` 内的每个 `<BreadModel>` 已有独立 Suspense 边界，但 Earth 和 Starfield 被遗漏了。

### 问题 2：GitHub Pages 部署 404（已解决）

**现象**：Pages 部署后访问返回 404。

**根因**：GitHub Pages 默认使用 Jekyll 处理，会忽略以 `_` 开头的目录（如 `_next/`）。

**修复**：在 `public/` 下添加空文件 `.nojekyll`，构建后会被复制到 `out/` 根目录。

### 问题 3：电脑端已部署但仍显示空白（缓存）

**现象**：手机端已能正常显示，电脑端仍然空白。

**根因**：浏览器缓存了旧的 JS 文件。

**修复**：`Ctrl + Shift + R` 强制刷新，或打开 DevTools → Network → 勾选 "Disable cache" 后刷新。

### 问题 4：Windows `nul` 保留文件名导致 git 操作失败（已解决）

**现象**：`git checkout` 或 `git clean` 时报错，提示无法创建文件 `nul`。

**根因**：仓库历史中有名为 `nul` 的文件（Windows 保留设备名），Windows 无法创建该文件。

**修复**：用 `cmd /c del \\?\<绝对路径>` 强制删除。

### 部署相关配置一览

| 文件 | 用途 |
|------|------|
| `next.config.ts` | `output: "export"`，`basePath`/`assetPrefix` 设为 `/bread_encyclopedia` |
| `.env.production` | `NEXT_PUBLIC_BASE_PATH=/bread_encyclopedia`（构建时内联到 JS） |
| `src/lib/basePath.ts` | `assetPath()` 函数，Three.js 资源路径拼接 |
| `.github/workflows/deploy.yml` | GitHub Actions 自动构建 + 部署到 Pages |
| `public/.nojekyll` | 防止 Jekyll 忽略 `_next/` 目录 |

### GitHub Pages 设置

在仓库 Settings → Pages 中：
- **Source** 必须选 **GitHub Actions**（不是 "Deploy from a branch"）
- 部署后访问 `https://<用户名>.github.io/bread_encyclopedia/`
