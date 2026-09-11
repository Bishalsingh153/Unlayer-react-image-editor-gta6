import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'
import { resolveNarrative } from '../data/posterReport'

export default function Poster({ editedImage, posterReport, onStartOver }) {
  const posterRef = useRef(null)
  const narrative = resolveNarrative(posterReport)
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
        backgroundColor: '#e5d5bc',
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
        className="lcpd-poster"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <header className="lcpd-poster__top">
          <div className="lcpd-poster__top-col">
            <span>Detective Bureau</span>
            <span>Artist Unit</span>
          </div>
          <div className="lcpd-poster__top-col lcpd-poster__top-col--center">
            <strong>Police Department</strong>
            <span>City of Vice City</span>
          </div>
          <div className="lcpd-poster__top-col lcpd-poster__top-col--right">
            <span>Please Post in a</span>
            <span>Conspicuous</span>
            <span>Place</span>
          </div>
        </header>

        <svg className="lcpd-poster__filters" aria-hidden="true">
          <defs>
            <filter
              id="wanted-stamp-grunge"
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05"
                numOctaves="3"
                seed="8"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <div className="lcpd-poster__hero">
          <div className="lcpd-poster__hero-text">
            <div className="lcpd-poster__wanted-stamp">
              <span className="lcpd-poster__wanted-stamp-frame">
                <h2 className="lcpd-poster__wanted">WANTED</h2>
              </span>
            </div>
            <p className="lcpd-poster__charge">{posterReport.crime}</p>
          </div>
          <div className="lcpd-poster__portrait">
            <img src={editedImage} alt="Suspect portrait" />
          </div>
        </div>

        <table className="lcpd-poster__table">
          <thead>
            <tr>
              <th colSpan={4}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sex:</strong> {posterReport.sex}</td>
              <td><strong>Race:</strong> {posterReport.race}</td>
              <td><strong>Weight:</strong> {posterReport.weight}</td>
              <td><strong>Eyes:</strong> {posterReport.eyes}</td>
            </tr>
            <tr>
              <td><strong>Age:</strong> {posterReport.age}</td>
              <td><strong>Height:</strong> {posterReport.height}</td>
              <td><strong>Hair:</strong> {posterReport.hair}</td>
              <td><strong>Complexion:</strong> {posterReport.complexion}</td>
            </tr>
          </tbody>
        </table>

        <p className="lcpd-poster__narrative">{narrative}</p>

        <footer className="lcpd-poster__contact">
          <div className="lcpd-poster__badge" aria-hidden="true">
            <svg viewBox="0 0 80 96" fill="none">
              <path
                d="M40 4 L72 18 V46 C72 68 40 92 40 92 C40 92 8 68 8 46 V18 L40 4Z"
                stroke="#111"
                strokeWidth="2"
                fill="#fff"
              />
              <text
                x="40"
                y="36"
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill="#111"
                fontFamily="Arial, sans-serif"
              >
                VICE CITY
              </text>
              <text
                x="40"
                y="48"
                textAnchor="middle"
                fontSize="7"
                fontWeight="bold"
                fill="#111"
                fontFamily="Arial, sans-serif"
              >
                POLICE
              </text>
              <text
                x="40"
                y="60"
                textAnchor="middle"
                fontSize="7"
                fontWeight="bold"
                fill="#111"
                fontFamily="Arial, sans-serif"
              >
                DEPT.
              </text>
            </svg>
          </div>
          <div className="lcpd-poster__contact-text">
            <p>
              Notify the <strong>VICE CITY POLICE DEPARTMENT</strong> with any
              information regarding the above subject.
            </p>
            <p>
              Detective {posterReport.detective} Assigned Re: {posterReport.assignmentRef}, Case#{posterReport.caseNumber}
            </p>
            <p>
              Email: <strong className="lcpd-poster__email">tips@vicecitypolice.com</strong>
            </p>
          </div>
        </footer>

        <div className="lcpd-poster__branding">
          <div className="lcpd-poster__esrb">
            <span className="lcpd-poster__esrb-rating">RP</span>
            <span className="lcpd-poster__esrb-label">rating pending</span>
          </div>
          <div className="lcpd-poster__game">
            <span className="lcpd-poster__game-title">grand theft auto</span>
            <span className="lcpd-poster__game-num">VI</span>
            <span className="lcpd-poster__game-url">www.rockstargames.com/VI</span>
          </div>
          <div className="lcpd-poster__rockstar" aria-hidden="true">
            <span>R</span>
            <span className="lcpd-poster__rockstar-star">★</span>
          </div>
        </div>
      </motion.div>

      <motion.footer
        className="poster-step__footer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {downloadError && (
          <p className="poster-step__error" role="alert">
            Download failed — please try again.
          </p>
        )}
        <div className="poster-step__actions">
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
        </div>
      </motion.footer>
    </div>
  )
}
