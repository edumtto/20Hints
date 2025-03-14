function levenshteinDistance(s: string, t: string): number {
  const m = s.length
  const n = t.length
  
  let v0: number[] = new Array(n + 1)
  let v1: number[] = new Array(n + 1)
  
  for (let i = 0; i < n + 1; i++) {
    v0[i] = i
  }
  
  for (let i = 0; i < m; i++) {
    v1[0] = i + 1
    
    for (let j = 0; j < n; j++) {
      const deletionCost = v0[j + 1] + 1
      const insertionCost = v1[j] + 1
      const substitutionCost = s[i] === t[j] ? v0[j] : v0[j] + 1
      v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost)
    }
    
    const temp = v0
    v0 = v1
    v1 = temp
  }
  return v0[n]
}

export default levenshteinDistance;