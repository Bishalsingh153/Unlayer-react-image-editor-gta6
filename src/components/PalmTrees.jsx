function PalmTree({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 280"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M58 280 L58 140 Q58 120 62 100 L58 95 Q50 80 45 60 Q42 45 48 30 Q55 15 58 0 Q61 15 68 30 Q74 45 71 60 Q66 80 58 95 L54 100 Q58 120 58 140 Z" />
      <path d="M58 110 Q30 90 10 75 Q5 70 8 65 Q20 72 40 85 Q50 92 58 100 Z" />
      <path d="M58 100 Q85 80 105 60 Q112 52 108 48 Q95 58 75 72 Q65 82 58 90 Z" />
      <path d="M58 125 Q25 105 5 88 Q0 82 5 78 Q22 90 48 108 Q55 115 58 120 Z" />
      <path d="M58 120 Q90 100 112 82 Q118 76 114 72 Q98 85 72 102 Q62 110 58 115 Z" />
      <path d="M58 145 Q35 135 18 125 Q12 120 16 116 Q32 128 52 138 Q56 142 58 145 Z" />
      <path d="M58 145 Q82 135 100 122 Q106 117 102 113 Q86 125 66 138 Q60 142 58 145 Z" />
    </svg>
  )
}

export default function PalmTrees() {
  return (
    <div className="palm-trees" aria-hidden="true">
      <PalmTree className="palm palm-left" />
      <PalmTree className="palm palm-left-2 palm--flip" />
      <PalmTree className="palm palm-right palm--flip" />
      <PalmTree className="palm palm-right-2" />
    </div>
  )
}
