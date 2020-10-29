export function getLibraryName(url: string): string {
  return url.replace(/\//g, '')
}
