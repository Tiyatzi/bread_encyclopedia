# 面包百科全书 - 开发文档

## 1. 项目概述

基于抖音"麻省理工Rui同学"的花卉百科项目（"如果地球是一座花园"），改造为面包百科全书。

核心体验：沉浸式 3D 地球仪，全世界的代表性面包以 3D 模型的形式"生长"在地球表面对应位置。用户可旋转地球、点击面包查看详情（历史、文化、详细制作教程）。底部筛选栏按大洲、面包类型、制作难度过滤。

部署到 Vercel，免费，无需服务器。

## 2. 基线项目分析

**基线仓库**：[Katrina55553/3D-Earth-Garden](https://github.com/Katrina55553/3D-Earth-Garden)

### 2.1 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 15.5.6 | React 框架 |
| React | ^19.2.4 | UI |
| Three.js | ^0.184.0 | 3D 引擎 |
| @react-three/fiber | ^9.6.1 | Three.js 的 React 封装 |
| @react-three/drei | ^10.7.7 | R3F 辅助工具（OrbitControls, useTexture, useGLTF） |
| GSAP | ^3.15.0 | 相机飞行动画 |
| Framer Motion | ^12.38.0 | UI 面板进出动画 |
| Tailwind CSS | ^3.4.17 | 样式 |
| TypeScript | - | 类型安全 |

### 2.2 架构总览

```
page.tsx
└── AppProvider (React Context 全局状态)
    ├── EarthScene (Canvas 3D 场景)
    │   ├── Starfield         — 星空背景（支持代码生成星点或全景图片）
    │   ├── Earth             — 球体 r=1.2，64 段，动态贴图（支持切换），自转 delta*0.08
    │   │   └── BreadsLayer   — 作为 Earth 子节点，跟随地球自转
    │   │       └── BreadModel ×11 — 加载 GLB 模型，定位到球面 r=1.22，法线朝外
    │   └── OrbitControls     — 阻尼 0.08，距离范围 2.5~12
    └── AppUI (fixed 定位覆盖层)
        ├── TopStats          — 顶部居中："面包百科" + "展示 X/Y 种面包"
        ├── BreadDetailPanel  — 右侧：选中面包的详情（历史/文化/食谱）
        ├── ControlPanel      — 底部：大洲标签 + 面包类型下拉 + 难度下拉
        └── TextureSwitcher   — 右侧中部：地球贴图切换按钮组
        └── BackgroundSwitcher — 左侧中部：星空背景切换按钮组
```

### 2.3 源码详解（总计 ~989 行）

#### 数据层

**`src/data/plants.ts`**（81 行）

```typescript
export interface PlantData {
  id: string;              // "osmanthus-01"
  name: string;            // "桂花"
  latinName: string;       // "Osmanthus fragrans"
  latitude: number;        // 30.2741
  longitude: number;       // 120.1551
  continent: string;       // "亚洲"
  vegetationType: string;  // "常绿灌木/小乔木"
  climateFeature: string;  // "亚热带季风气候"
  modelPath: string;       // "/models/桂花.glb"
  description: string;     // "木犀科木犀属..."
}
```

7 个物种，51 株植物：桂花(8)、桉树(8)、百合(8)、毛竹(7)、红杉(7)、猴面包树(7)、雪莲(6)。

#### 坐标转换

**`src/utils/coordinates.ts`**（36 行）

```typescript
// 经纬度 → Three.js 球面坐标 (x, y, z)
export function latLngToPosition(lat, lng, radius = 1.2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),  // X 取反以对齐纹理
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
}
```

#### 3D 组件

**`src/components/Earth.tsx`**（42 行）
- 球体 `<sphereGeometry args={[1.2, 64, 64]}`
- 纹理从 CDN 加载：`threejs.org/.../land_ocean_ice_cloud_2048.jpg`
- `useFrame` 驱动自转，`roughness=0.85, metalness=0.05`
- 接收 `onClick` 用于取消选中

**`src/components/PlantModel.tsx`**（165 行）
- `useGLTF(modelPath)` 加载 GLB，`clone()` 复制场景
- 定位到 `latLngToPosition(lat, lng, 1.22)`（略高于球面）
- 四元数旋转使模型法线朝外（`setFromUnitVectors(UP, surfaceNormal)`）
- 基础缩放 `0.08`
- 悬浮时 `useFrame` 插值放大到 1.35x
- 被筛选掉时透明度渐变到 0.12
- 选中/悬浮时显示绿色光环（`RingGeometry`），选中为金色
- 模块末尾预加载所有 7 个 GLB 模型

**`src/components/EarthScene.tsx`**（249 行）
- Canvas 配置：`camera={{ position: [0, 1.5, 5], fov: 45 }}`
- 背景色 `#020210`
- 灯光：ambient(0.4) + directional(1.2, 0.3)
- **相机飞行**（GSAP）：
  - `flyToSpecies(name)`: 计算物种所有点的质心 → 相机飞到 `质心 + 法线 * (0.7 + count*0.04)`，1.2s
  - `flyBackToDefault()`: 回到 `[0, 1.5, 5]`，1s
- **选择逻辑**：点击植物 → 选中物种+飞行；再点同一物种 → 取消+飞回；点地球空白 → 取消+飞回

**`src/components/Starfield.tsx`**（51 行）
- 2000 个随机点，半径 20-50 的球壳上，`size=0.03, opacity=0.8`，加法混合

#### 状态管理

**`src/store/AppContext.tsx`**（98 行）

| 状态 | 类型 | 说明 |
|------|------|------|
| `selectedSpeciesName` | `string \| null` | 当前选中的物种名 |
| `continentFilter` | `string` | 大洲筛选（默认"全部"） |
| `typeFilter` | `string` | 植被类型筛选 |
| `climateFilter` | `string` | 气候筛选 |

派生值：`filteredPlants`（三重过滤后的数组）、`selectedSpeciesPlants`、`visibleCount`/`totalCount`。

`getFilterOptions()` 从数据中提取去重的筛选选项。

#### UI 组件

**`TopStats.tsx`**（23 行）— 顶部居中胶囊，标题 + 计数

**`ControlPanel.tsx`**（100 行）— 底部面板：大洲标签按钮 + 植被类型下拉 + 气候下拉，Framer Motion 入场动画

**`PlantInfoCard.tsx`**（79 行）— 右侧详情卡片：植物名+数量徽章、拉丁学名、信息行、描述、关闭按钮，Framer Motion 从右侧滑入

**`AppUI.tsx`**（15 行）— 固定覆盖容器，`pointer-events-none, z-10`

#### 资源文件

- `public/models/`：11 个 GLB 面包模型（当前为植物占位模型）
- `public/textures/`：地球贴图、星空背景全景图
- 贴图配置：`src/data/earthTextures.ts`
- 背景配置：`src/data/backgrounds.ts`

> 资源替换与维护的详细操作步骤见 [MAINTENANCE.md](./MAINTENANCE.md)

## 3. 改造计划

### 3.1 改造总览

| 改动类型 | 文件 | 工作量 |
|---------|------|--------|
| **替换** | `data/plants.ts` → `data/breads.ts` | 中 |
| **替换** | `public/models/*.glb` → 面包模型 | 大 |
| **改造** | `store/AppContext.tsx` | 小 |
| **改造** | `PlantModel.tsx` → `BreadModel.tsx` | 小 |
| **改造** | `ui/ControlPanel.tsx` | 小 |
| **改造** | `ui/TopStats.tsx` | 极小 |
| **重写** | `ui/PlantInfoCard.tsx` → `ui/BreadDetailPanel.tsx` | 大 |
| **新增** | `ui/RecipeSteps.tsx` | 中 |
| **改造** | `Earth.tsx` | 小（动态贴图 + 子节点包裹） |
| **改造** | `EarthScene.tsx` | 中（单点飞行 + 贴图传递） |
| **新增** | `ui/TextureSwitcher.tsx` | 小 |
| **新增** | `data/earthTextures.ts` | 极小 |
| **新增** | `data/types.ts` | 极小（类型抽离） |
| **不动** | `Starfield.tsx` `coordinates.ts` | 0 |

### 3.2 数据结构

面包数据已拆分为独立文件，详见 [MAINTENANCE.md](./MAINTENANCE.md)。

**目录结构**：

```
src/data/
├── types.ts              # 类型定义（BreadData, Recipe, RecipeStep, Ingredient）
├── earthTextures.ts      # 地球贴图配置
├── backgrounds.ts        # 背景配置
└── breads/               # 每个面包一个文件
    ├── index.ts           # 汇总导出
    ├── baguette.ts
    ├── croissant.ts
    └── ...（共 11 个）
```

**类型定义** `src/data/types.ts`：

```typescript
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
  modelScale?: number;    // 模型缩放，默认 0.08
  description: string;
  history: string;
  culture: string;
  recipe: Recipe;
}
```

字段映射（全局替换参考）：

| 原字段 | 新字段 |
|--------|--------|
| `latinName` | `city` |
| `vegetationType` | `breadType` |
| `climateFeature` | `difficulty` |
| `selectedSpeciesName` | `selectedBreadId` |

### 3.3 状态管理

`AppContext.tsx` 状态：

| 状态 | 类型 | 说明 |
|------|------|------|
| `selectedBreadId` | `string \| null` | 当前选中面包 |
| `continentFilter` | `string` | 大洲筛选（默认"全部"） |
| `typeFilter` | `string` | 面包类型筛选 |
| `difficultyFilter` | `string` | 难度筛选 |
| `earthTextureId` | `string` | 当前地球贴图 id |
| `earthTexturePath` | `string` | 派生：当前贴图的实际路径 |
| `backgroundId` | `string` | 当前背景 id |
| `background` | `Background` | 派生：当前背景配置对象 |

派生值：`filteredBreads`、`selectedBread`、`visibleCount`/`totalCount`。

### 3.4 详情面板（重写）

原 `PlantInfoCard`（79 行）只显示简单信息，需重写为 `BreadDetailPanel`：

```
┌──────────────────────────┐
│ ✕                        │
│ 法棍 Baguette            │
│ 巴黎，法国                │
│ ────────────────────────│
│ 历史                     │
│ 法棍的历史可追溯到...     │
│                          │
│ 文化                     │
│ 法国法律规定...           │
│                          │
│ 制作教程                  │
│ 难度：中等 | 时长：4小时   │
│ 份量：2根                 │
│                          │
│ 食材                     │
│ · 高筋面粉 500g          │
│ · 水 350ml               │
│ · 干酵母 5g              │
│ · 盐 10g                 │
│                          │
│ 步骤                     │
│ ┌─ Step 1 ────────────┐ │
│ │ 混合材料 (10分钟)     │ │
│ │ 将面粉倒入大碗...     │ │
│ │ 💡 水温控制在25-28°C  │ │
│ └─────────────────────┘ │
│ ┌─ Step 2 ────────────┐ │
│ │ 揉面 (15-20分钟)     │ │
│ │ ...                  │ │
│ └─────────────────────┘ │
└──────────────────────────┘
```

- 桌面端：右侧 400px 宽，可滚动
- 移动端：底部上滑覆盖 85% 高度

### 3.5 相机飞行逻辑调整

原项目 `flyToSpecies` 计算同物种多株植物的质心。面包是每种一个点，改为：
- 点击面包 → 飞到该面包坐标上方（`质心 + 法线 * 0.8`）
- 再次点击或点空白 → 飞回默认视角

### 3.6 筛选面板调整

`ControlPanel.tsx`：
- 大洲标签按钮：不变
- 下拉一：`植被类型` → `面包类型`
- 下拉二：`气候特征` → `制作难度`

## 4. 3D 面包模型来源

| 来源 | 费用 | 说明 |
|------|------|------|
| **Sketchfab** | 免费/付费 | 搜索 "bread" "baguette" "croissant"，下载 GLB，注意 CC 许可 |
| **Poly Pizza** | 免费 | 低多边形，风格统一 |
| **AI 生成（Meshy / Tripo3D）** | 免费额度 | 文字/图片生成 3D 模型 |
| **降级方案** | - | 改用 Billboard 2D 贴片，代码改动小 |

建议：先用 2-3 个免费模型跑通，再批量收集。

## 5. 面包数据规划（初版 ~25 种）

| 大洲 | 面包 | 城市 | 类型 | 难度 |
|------|------|------|------|------|
| 欧洲 | Baguette 法棍 | 巴黎 | 发酵面包 | 中等 |
| 欧洲 | Pretzel 碱水面包 | 慕尼黑 | 发酵面包 | 中等 |
| 欧洲 | Ciabatta 恰巴塔 | 维罗纳 | 发酵面包 | 中等 |
| 欧洲 | Croissant 可颂 | 维也纳 | 起酥面包 | 困难 |
| 欧洲 | Focaccia 佛卡夏 | 热那亚 | 发酵面包 | 简单 |
| 欧洲 | Pumpernickel 黑麦面包 | 多特蒙德 | 发酵面包 | 困难 |
| 欧洲 | Soda Bread 苏打面包 | 都柏林 | 无酵面包 | 简单 |
| 亚洲 | Naan 馕 | 德里 | 发酵面包 | 简单 |
| 亚洲 | 馒头 Mantou | 济南 | 蒸制面包 | 简单 |
| 亚洲 | Shokupan 生吐司 | 东京 | 发酵面包 | 中等 |
| 亚洲 | Pita 皮塔饼 | 贝鲁特 | 发酵面包 | 简单 |
| 亚洲 | Roti Canai 印度飞饼 | 吉隆坡 | 无酵面包 | 中等 |
| 亚洲 | Lavash 拉瓦什 | 埃里温 | 无酵面包 | 简单 |
| 亚洲 | Banh Mi 越南法棍 | 胡志明市 | 发酵面包 | 中等 |
| 非洲 | Injera 英吉拉 | 亚的斯亚贝巴 | 发酵面包 | 中等 |
| 非洲 | Msemen 姆塞门 | 非斯 | 无酵面包 | 中等 |
| 美洲 | Sourdough 酸面包 | 旧金山 | 发酵面包 | 困难 |
| 美洲 | Tortilla 玉米薄饼 | 墨西哥城 | 无酵面包 | 简单 |
| 美洲 | Arepa 玉米饼 | 波哥大 | 无酵面包 | 简单 |
| 美洲 | Pão de Queijo 奶酪面包 | 贝洛奥里藏特 | 发酵面包 | 简单 |
| 美洲 | Cornbread 玉米面包 | 纳什维尔 | 无酵面包 | 简单 |
| 大洋洲 | Damper 丹波面包 | 悉尼 | 无酵面包 | 简单 |

## 6. 开发步骤

### Phase 1：Fork 与数据替换（1-2 天）

1. Fork [3D-Earth-Garden](https://github.com/Katrina55553/3D-Earth-Garden) 到自己的 GitHub
2. 创建 `src/data/breads.ts`，写 5 条测试数据（先不含教程详情）
3. 从 Sketchfab 下载 2-3 个面包 GLB 模型 → `public/models/`
4. 修改 `AppContext.tsx`：数据源和筛选字段替换
5. 修改 `PlantModel.tsx` → `BreadModel.tsx`：改导入、调缩放、改预加载列表
6. 修改 `EarthScene.tsx`：引用 BreadModel，调整选择逻辑（单点飞行）
7. **验收**：地球上能看到面包模型，点击能选中+飞行

### Phase 2：UI 改造（2-3 天）

8. 修改 `TopStats.tsx`：标题改为"面包百科"，计数文案
9. 修改 `ControlPanel.tsx`：筛选项改为大洲/面包类型/制作难度
10. 重写 `PlantInfoCard.tsx` → `BreadDetailPanel.tsx`：完整详情面板
11. 新建 `RecipeSteps.tsx`：分步教程卡片组件
12. 移动端适配（底部上滑面板，可滚动）

### Phase 3：内容填充（3-5 天）

13. 收集 25 种面包的历史、文化资料
14. 整理详细制作教程（精确用量、分步说明、技巧提示）
15. 收集/制作面包 3D 模型（统一风格）
16. 填充完整 `breads.ts`

### Phase 4：优化与部署（1-2 天）

17. 地球纹理本地化（下载到 `public/textures/` 避免 CDN 依赖）
18. 加载动画（模型加载时 loading 提示）
19. 性能优化（模型精简、懒加载）
20. 部署到 Vercel

## 7. 部署

```bash
# 推送到 GitHub
git init && git add . && git commit -m "init: bread encyclopedia"
git remote add origin https://github.com/你的用户名/bread-encyclopedia.git
git push -u origin main

# vercel.com → GitHub 登录 → Import 仓库 → 自动识别 Next.js → Deploy
# 获得地址：https://bread-encyclopedia.vercel.app
# 之后 git push 自动重新部署
```

### 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
                     # 手机同 WiFi：http://电脑IP:3000
```

## 8. 后续扩展

- **用户标记**：localStorage 记录"已做过"的面包
- **搜索功能**：按名称搜索
- **面包对比**：选两种面包并排对比原料和工艺
- **扩充数据**：目标 100+ 种面包
- **多语言**：中英文切换
- **高清纹理**：8K 地球纹理替换当前 2K
