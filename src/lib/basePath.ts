/**
 * 返回带 basePath 前缀的资源路径，确保 GitHub Pages 等子路径部署正常加载。
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
