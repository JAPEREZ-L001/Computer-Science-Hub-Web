const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isValidUUID(value: string): boolean {
  return UUID_RE.test(value)
}

export function isSafeUrl(url: string): boolean {
  if (!url) return false
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

export function sanitizeOptionalUrl(raw: string | undefined | null): string | null {
  const trimmed = raw?.trim()
  if (!trimmed || trimmed === '#') return null
  if (!isSafeUrl(trimmed)) return null
  return trimmed
}
