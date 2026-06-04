# 面包百科 Bread Encyclopedia

一个 3D 互动地球仪面包百科全书。世界各地的代表性面包以 3D 模型的形式"生长"在地球表面，点击即可查看面包的历史、文化背景和详细制作教程。

## 预览

- 3D 地球仪，支持拖拽旋转、缩放
- 点击面包模型，相机自动飞行聚焦，右侧展开详情面板
- 底部筛选栏：按大洲、面包类型、制作难度过滤
- 支持切换地球贴图和背景

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 15 | React 框架 |
| React Three Fiber | Three.js 的 React 封装 |
| drei | R3F 辅助工具 |
| GSAP | 相机飞行动画 |
| Framer Motion | UI 动画 |
| Tailwind CSS | 样式 |
| TypeScript | 类型安全 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npx next build
```

打开 http://localhost:3000 查看效果。

## 项目结构

```
src/
├── data/
│   ├── types.ts              # 数据类型定义
│   ├── earthTextures.ts      # 地球贴图配置
│   ├── backgrounds.ts        # 背景配置
│   └── breads/               # 面包数据（每个面包一个文件）
│       ├── index.ts
│       ├── baguette.ts
│       └── ...
├── components/
│   ├── Earth.tsx              # 地球球体
│   ├── EarthScene.tsx         # 3D 场景
│   ├── BreadModel.tsx         # 面包模型
│   ├── Starfield.tsx          # 背景
│   └── ui/                    # UI 组件
├── store/
│   └── AppContext.tsx          # 全局状态
└── utils/
    └── coordinates.ts          # 经纬度转 3D 坐标
```

## 收录面包

| 面包 | 地区 | 难度 |
|------|------|------|
| 法棍 Baguette | 法国巴黎 | 中等 |
| 可颂 Croissant | 奥地利维也纳 | 困难 |
| 馕 Naan | 印度德里 | 简单 |
| 馒头 Mantou | 中国济南 | 简单 |
| 玉米薄饼 Tortilla | 墨西哥城 | 简单 |
| 酸面包 Sourdough | 美国旧金山 | 困难 |
| 佛卡夏 Focaccia | 意大利热那亚 | 简单 |
| 碱水面包 Pretzel | 德国慕尼黑 | 中等 |
| 英吉拉 Injera | 埃塞俄比亚 | 中等 |
| 皮塔饼 Pita | 黎巴嫩贝鲁特 | 简单 |
| 丹波面包 Damper | 澳大利亚悉尼 | 简单 |

## 维护

资源替换和内容维护的详细操作见 [MAINTENANCE.md](./MAINTENANCE.md)。

## 致谢

基于 [3D-Earth-Garden](https://github.com/Katrina55553/3D-Earth-Garden) 改造。

## License

MIT
