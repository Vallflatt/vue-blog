export function assert(obj: unknown, message: string): asserts obj {
  if (!obj) {
    throw new Error(message)
  }
}
