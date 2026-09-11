import { useState } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from './components/ProgressBar'
import PalmTrees from './components/PalmTrees'
import ChoosePhoto from './components/ChoosePhoto'
import EditPhoto from './components/EditPhoto'
import Poster from './components/Poster'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)
  const [editedImage, setEditedImage] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)

  const handleEditorSave = ({ dataUrl }) => {
    setEditedImage(dataUrl)
    setCurrentStep(3)
  }

  const handleStartOver = () => {
    setCurrentStep(1)
    setSelectedImage(null)
    setEditedImage(null)
    setSessionKey((key) => key + 1)
  }

  const activeStep =
    (currentStep === 2 && !selectedImage) ||
    (currentStep === 3 && !editedImage)
      ? 1
      : currentStep

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <ChoosePhoto
            key={sessionKey}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
            onContinue={() => setCurrentStep(2)}
          />
        )
      case 2:
        if (!selectedImage) return null
        return (
          <EditPhoto
            key={sessionKey}
            selectedImageUrl={selectedImage}
            onSave={handleEditorSave}
            onBack={() => setCurrentStep(1)}
          />
        )
      case 3:
        if (!editedImage) return null
        return (
          <Poster
            key={sessionKey}
            editedImage={editedImage}
            onStartOver={handleStartOver}
          />
        )
      default:
        return null
    }
  }

  const isCompactHeader = activeStep !== 1

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className="scene" aria-hidden="true">
        <div className="sky" />
        <div className="sun" />
        <PalmTrees />
        <div className="grid-container">
          <div className="grid-floor" />
        </div>
        <div className="horizon-glow" />
      </div>

      <div className="app-content">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <ProgressBar currentStep={activeStep} />
        </motion.div>

        <motion.header
          className={`app-header${isCompactHeader ? ' app-header--compact' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <h1 className="title">GTA VI WANTED</h1>
          <p className="tagline">Create your own wanted poster</p>
        </motion.header>

        <motion.main
          className={`app-main${activeStep === 2 ? ' app-main--editor' : ''}${activeStep === 3 ? ' app-main--poster' : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <div
            className={`step-panel${activeStep === 2 ? ' step-panel--editor' : ''}${activeStep === 3 ? ' step-panel--poster' : ''}`}
          >
            {renderStep()}
          </div>
        </motion.main>
      </div>
    </motion.div>
  )
}

export default App
