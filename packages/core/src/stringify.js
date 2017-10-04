//@flow

export function stringify<-T>(value: T): string {
  try {
    return JSON.stringify(value)
  } catch (error) {
    return String(value)
  }
}
