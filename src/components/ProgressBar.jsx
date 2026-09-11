const STEPS = [
  { id: 1, label: 'Choose Photo' },
  { id: 2, label: 'Edit in Editor' },
  { id: 3, label: 'Get Poster' },
]

export default function ProgressBar({ currentStep = 1 }) {
  return (
    <nav className="progress-bar" aria-label="Creation steps">
      <ol className="progress-steps">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep
          const isComplete = step.id < currentStep
          const isLast = index === STEPS.length - 1

          return (
            <li
              key={step.id}
              className={`progress-step${isActive ? ' active' : ''}${isComplete ? ' complete' : ''}`}
            >
              <div className="step-indicator">
                <span className="step-number">{step.id}</span>
              </div>
              <span className="step-label">{step.label}</span>
              {!isLast && <div className="step-connector" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
