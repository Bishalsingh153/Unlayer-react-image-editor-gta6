import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'
import { pickRandomBounty, pickRandomCrime } from '../data/crimes'

const posterVariants = {
  hidden: { opacity: 0, scale: 0.4, rotateX: 25, y: 80 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Poster({ editedImage, onStartOver }) {
  const posterRef = useRef(null)
  const [crime] = useState(pickRandomCrime)
  const [bounty] = useState(pickRandomBounty)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(false)

  const handleDownload = async () => {
    if (!posterRef.current || isDownloading) return

    setIsDownloading(true)
    setDownloadError(false)
    try {
      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      })

      const link = document.createElement('a')
      link.download = 'gta-vi-wanted-poster.png'
      link.href = dataUrl
      link.click()
    } catch {
      setDownloadError(true)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="poster-step">
      <motion.div
        ref={posterRef}
        className="wanted-poster"
        variants={posterVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="wanted-poster__border" variants={itemVariants}>
          <motion.h2 className="wanted-poster__title" variants={itemVariants}>
            WANTED
          </motion.h2>

          <motion.div
            className="wanted-poster__photo-frame"
            variants={itemVariants}
          >
            <img
              src={editedImage}
              alt="Suspect photo"
              className="wanted-poster__photo"
            />
          </motion.div>

          <motion.p className="wanted-poster__label" variants={itemVariants}>
            For the crime of
          </motion.p>

          <motion.p className="wanted-poster__crime" variants={itemVariants}>
            {crime}
          </motion.p>

          <motion.p className="wanted-poster__bounty" variants={itemVariants}>
            REWARD: {bounty}
          </motion.p>

          <motion.div
            className="wanted-poster__divider"
            variants={itemVariants}
            aria-hidden="true"
          />

          <motion.p className="wanted-poster__dept" variants={itemVariants}>
            VICE CITY POLICE DEPARTMENT
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="poster-step__actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <button
          type="button"
          className="poster-step__btn poster-step__btn--download"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? 'Rendering…' : 'Download Poster'}
        </button>
        <button
          type="button"
          className="poster-step__btn poster-step__btn--reset"
          onClick={onStartOver}
        >
          Start Over
        </button>
      </motion.div>

      {downloadError && (
        <p className="poster-step__error" role="alert">
          Download failed — please try again.
        </p>
      )}
    </div>
  )
}
