import { useState } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from './components/ProgressBar'
import ViceCityScene from './components/ViceCityScene'
import ChoosePhoto from './components/ChoosePhoto'
import EditPhoto from './components/EditPhoto'
import Poster from './components/Poster'
import { createDefaultPosterReport } from './data/posterReport'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)
  const [editedImage, setEditedImage] = useState(null)
  const [posterReport, setPosterReport] = useState(createDefaultPosterReport)
  const [sessionKey, setSessionKey] = useState(0)

  const handleEditorSave = ({ dataUrl }) => {
    setEditedImage(dataUrl)
    setCurrentStep(3)
  }

  const handleStartOver = () => {
    setCurrentStep(1)
    setSelectedImage(null)
    setEditedImage(null)
    setPosterReport(createDefaultPosterReport())
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
            posterReport={posterReport}
            onReportChange={setPosterReport}
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
            posterReport={posterReport}
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
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <ViceCityScene />

      <div className="app-content">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <ProgressBar currentStep={activeStep} />
        </motion.div>

        <motion.header
          className={`app-header${isCompactHeader ? ' app-header--compact' : ''}`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <p className="app-header__brand">Grand Theft Auto VI</p>
          <h1 className="title">WANTED</h1>
          <p className="tagline">Create your own wanted poster</p>
        </motion.header>

        <motion.main
          className={`app-main${activeStep === 1 ? ' app-main--choose' : ''}${activeStep === 2 ? ' app-main--editor' : ''}${activeStep === 3 ? ' app-main--poster' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
        >
          <div
            className={`step-panel${activeStep === 1 ? ' step-panel--choose' : ''}${activeStep === 2 ? ' step-panel--editor' : ''}${activeStep === 3 ? ' step-panel--poster' : ''}`}
          >
            {renderStep()}
          </div>
        </motion.main>
      </div>
    </motion.div>
  )
}

export default App
