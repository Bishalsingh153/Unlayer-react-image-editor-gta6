export const CRIMES = [
  'Grand Theft Auto',
  'Excessive Drifting in a Neon Zone',
  'Unlicensed Rocket Launcher Joyride',
  'Disturbing the Peace at a Pool Party',
  'Felony Jaywalking on the Highway',
  'Operating a Stolen Supercar Without Chill',
  'Public Intoxication on Pure Adrenaline',
  'Evading Arrest While Looking Too Good',
]

export function pickRandomCrime() {
  return CRIMES[Math.floor(Math.random() * CRIMES.length)]
}

export function pickRandomBounty() {
  const amounts = [
    500000,
    750000,
    1000000,
    1250000,
    2000000,
    2500000,
    3500000,
    5000000,
  ]
  const amount = amounts[Math.floor(Math.random() * amounts.length)]
  return `$${amount.toLocaleString('en-US')}`
}

export function pickRandomCaseRef() {
  const year = 26
  const id = Math.floor(10000 + Math.random() * 90000)
  return `VCPD-${year}-${id}`
}

export function pickDangerLevel() {
  return Math.floor(3 + Math.random() * 3)
}
