const AGES = ['22-26', '28-32', '33-37', '38-42']
const HEIGHTS = ['5\'6" - 5\'9"', '5\'10" - 6\'0"', '5\'11" - 6\'2"', '6\'0" - 6\'3"']
const WEIGHTS = ['150-165 lbs', '170-185 lbs', '190-200 lbs', '205-220 lbs']
const HAIR = ['BLACK, CUT SHORT', 'BROWN, LONG', 'BLONDE, SHORT', 'DARK, SHAVED']
const COMPLEXIONS = ['LIGHT', 'MEDIUM', 'TAN', 'OLIVE']
const RACES = ['CAUCASIAN', 'HISPANIC', 'AFRICAN AMERICAN', 'ASIAN', 'UNKNOWN']

export function pickSuspectProfile() {
  return {
    sex: 'MALE',
    age: AGES[Math.floor(Math.random() * AGES.length)],
    race: RACES[Math.floor(Math.random() * RACES.length)],
    height: HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)],
    weight: WEIGHTS[Math.floor(Math.random() * WEIGHTS.length)],
    hair: HAIR[Math.floor(Math.random() * HAIR.length)],
    eyes: 'BROWN',
    complexion: COMPLEXIONS[Math.floor(Math.random() * COMPLEXIONS.length)],
  }
}

export function pickCaseNumber() {
  const seq = Math.floor(100 + Math.random() * 900)
  return String(seq)
}

export function pickAssignmentRef() {
  const uf = Math.floor(10 + Math.random() * 90)
  const hash = Math.floor(10000 + Math.random() * 90000)
  return `UF-${uf} #71-${hash}`
}

export function pickDetective() {
  const names = ['MOELLER', 'RIVERA', 'CHEN', 'MARTINEZ', 'OKONKWO', 'HAYES', 'SANTOS']
  return names[Math.floor(Math.random() * names.length)]
}

export function buildNarrative(crime, lastSeen = 'VICE BEACH DISTRICT OF LEONIDA') {
  const location = lastSeen.trim() || 'VICE BEACH DISTRICT OF LEONIDA'

  return (
    'SUSPECT IS WANTED FOR QUESTIONING IN CONNECTION WITH ' +
    `${crime.toUpperCase()}. LAST SEEN NEAR A NIGHTCLUB IN THE ${location.toUpperCase()}. ` +
    'TIME TO TURN THEIR DREAM INTO A NIGHTMARE. SHOOT ON SIGHT OR EMAIL US WITH ANY INFORMATION.'
  )
}
