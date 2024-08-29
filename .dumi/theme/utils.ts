export function extractNameFromPath(path: string) {
  if (!path) {
    return ''; // 如果路径为空或未定义，返回空字符串
  }

  const match = path.match(/[^/]+$/);
  return match ? match[0] : ''; // 如果匹配成功，返回匹配结果；否则返回空字符串
}
