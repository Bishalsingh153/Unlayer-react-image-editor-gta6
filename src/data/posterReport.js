import { pickRandomCrime } from './crimes'
import {
  buildNarrative,
  pickAssignmentRef,
  pickCaseNumber,
  pickDetective,
  pickSuspectProfile,
} from './posterCopy'

export const SEX_OPTIONS = ['MALE', 'FEMALE']
export const RACE_OPTIONS = [
  'CAUCASIAN',
  'HISPANIC',
  'AFRICAN AMERICAN',
  'ASIAN',
  'UNKNOWN',
]
export const COMPLEXION_OPTIONS = ['LIGHT', 'MEDIUM', 'TAN', 'OLIVE', 'DARK']

export function createDefaultPosterReport() {
  const profile = pickSuspectProfile()

  return {
    crime: pickRandomCrime(),
    lastSeen: 'VICE BEACH DISTRICT OF LEONIDA',
    narrative: '',
    sex: profile.sex,
    age: profile.age,
    race: profile.race,
    height: profile.height,
    weight: profile.weight,
    hair: profile.hair,
    eyes: profile.eyes,
    complexion: profile.complexion,
    detective: pickDetective(),
    assignmentRef: pickAssignmentRef(),
    caseNumber: pickCaseNumber(),
  }
}

export function resolveNarrative(report) {
  const custom = report.narrative?.trim()
  if (custom) return custom.toUpperCase()

  return buildNarrative(report.crime, report.lastSeen)
}

export function isReportValid(report) {
  return Boolean(report.crime?.trim())
}
