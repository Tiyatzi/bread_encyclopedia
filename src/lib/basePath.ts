/**
 * Three.js 手动加载的资源（GLB、贴图）需要通过此函数手动拼接 basePath。
 * Next.js basePath 只处理页面路由和框架管理的资源，Three.js loader 不经过 Next.js。
 */
export function assetPath(path: string): string {
  // Next.js 在构建时会把 basePath 写入 <script> tag 中的 __NEXT_DATA__
  // 但在 App Router + static export 下最可靠的方式是直接从 document.baseURI 推断，
  // 或者直接用编译时常量。这里用环境变量，在 .env.production 中设置。
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
