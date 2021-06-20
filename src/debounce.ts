let handler: NodeJS.Timeout | undefined

export function debounce(functionToDebunce: Function, delay: number) {
  if (handler) {
    clearTimeout(handler)
  }
  handler = setTimeout(() => {
    functionToDebunce()
  }, delay)
}
