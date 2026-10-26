/** Versioned, defensive localStorage helpers. Never throw. */
const PREFIX = 'velara:v1:'

export function readStore<T>(key: string, fallback: T, guard: (v: unknown) => v is T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return guard(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function writeStore(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
