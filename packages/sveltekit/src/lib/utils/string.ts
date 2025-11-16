/**
 * Truncate a string to a specified length, optionally breaking at word boundaries
 */
export function truncate(
  str: string,
  options: {
    length?: number
    separator?: string | RegExp
    omission?: string
  } = {}
): string {
  const { length = 30, separator, omission = "..." } = options

  if (str.length <= length) {
    return str
  }

  let truncatedStr = str.slice(0, length - omission.length)

  if (separator) {
    // Find the last occurrence of the separator before the truncation point
    let separatorRegex: RegExp
    if (typeof separator === "string") {
      separatorRegex = new RegExp(separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
    } else {
      // Ensure the regex has the global flag for matchAll
      const flags = separator.flags.includes("g") ? separator.flags : separator.flags + "g"
      separatorRegex = new RegExp(separator.source, flags)
    }

    const matches = [...truncatedStr.matchAll(separatorRegex)]
    if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1]
      if (lastMatch.index !== undefined) {
        truncatedStr = truncatedStr.slice(0, lastMatch.index)
      }
    }
  }

  return truncatedStr + omission
}
