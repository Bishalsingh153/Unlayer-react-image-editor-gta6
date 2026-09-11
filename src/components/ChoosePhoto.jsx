import { useRef } from 'react'
import { CRIMES } from '../data/crimes'
import {
  COMPLEXION_OPTIONS,
  isReportValid,
  RACE_OPTIONS,
  SEX_OPTIONS,
} from '../data/posterReport'
import { PRESET_CHARACTERS } from '../data/presets'

export default function ChoosePhoto({
  selectedImage,
  onSelectImage,
  posterReport,
  onReportChange,
  onContinue,
}) {
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => onSelectImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handlePresetSelect = (preset) => {
    onSelectImage(preset.image)
  }

  const handleFieldChange = (field) => (event) => {
    onReportChange({ ...posterReport, [field]: event.target.value })
  }

  const isPresetSelected = (preset) => selectedImage === preset.image
  const canContinue = selectedImage && isReportValid(posterReport)

  return (
    <div className="choose-photo">
      <div className="choose-photo__layout">
        <section className="choose-photo__options">
          <h2 className="choose-photo__heading">Choose Your Photo</h2>

          <div className="choose-photo__upload">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="choose-photo__file-input"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="choose-photo__upload-btn">
              Upload Photo
            </label>
          </div>

          <p className="choose-photo__divider">
            <span>or pick a character</span>
          </p>

          <div className="choose-photo__presets">
            {PRESET_CHARACTERS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`choose-photo__preset${isPresetSelected(preset) ? ' selected' : ''}`}
                onClick={() => handlePresetSelect(preset)}
                aria-pressed={isPresetSelected(preset)}
                aria-label={`Select ${preset.name}`}
              >
                <img
                  src={preset.image}
                  alt={preset.name}
                  className="choose-photo__preset-img"
                />
                <span className="choose-photo__preset-name">{preset.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="case-report" aria-labelledby="case-report-heading">
          <div className="case-report__header">
            <h2 id="case-report-heading" className="case-report__title">
              VCPD Case Report
            </h2>
            <p className="case-report__subtitle">File incident details for the wanted bulletin</p>
          </div>

          <fieldset className="case-report__section">
            <legend>Incident Details</legend>
            <div className="case-report__field case-report__field--full">
              <label htmlFor="report-crime">Charge / Crime</label>
              <input
                id="report-crime"
                type="text"
                list="crime-suggestions"
                value={posterReport.crime}
                onChange={handleFieldChange('crime')}
                placeholder="e.g. Assault with a Deadly Weapon"
                required
              />
              <datalist id="crime-suggestions">
                {CRIMES.map((crime) => (
                  <option key={crime} value={crime} />
                ))}
              </datalist>
            </div>
            <div className="case-report__field case-report__field--full">
              <label htmlFor="report-last-seen">Last Seen Location</label>
              <input
                id="report-last-seen"
                type="text"
                value={posterReport.lastSeen}
                onChange={handleFieldChange('lastSeen')}
                placeholder="Vice Beach District of Leonida"
              />
            </div>
            <div className="case-report__field case-report__field--full">
              <label htmlFor="report-narrative">
                Case Statement <span className="case-report__optional">(optional)</span>
              </label>
              <textarea
                id="report-narrative"
                rows={3}
                value={posterReport.narrative}
                onChange={handleFieldChange('narrative')}
                placeholder="Leave blank to auto-generate from charge and last seen location."
              />
            </div>
          </fieldset>

          <fieldset className="case-report__section">
            <legend>Physical Description</legend>
            <div className="case-report__grid">
              <div className="case-report__field">
                <label htmlFor="report-sex">Sex</label>
                <select
                  id="report-sex"
                  value={posterReport.sex}
                  onChange={handleFieldChange('sex')}
                >
                  {SEX_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="case-report__field">
                <label htmlFor="report-age">Age</label>
                <input
                  id="report-age"
                  type="text"
                  value={posterReport.age}
                  onChange={handleFieldChange('age')}
                  placeholder="28-32"
                />
              </div>
              <div className="case-report__field">
                <label htmlFor="report-race">Race</label>
                <select
                  id="report-race"
                  value={posterReport.race}
                  onChange={handleFieldChange('race')}
                >
                  {RACE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="case-report__field">
                <label htmlFor="report-height">Height</label>
                <input
                  id="report-height"
                  type="text"
                  value={posterReport.height}
                  onChange={handleFieldChange('height')}
                  placeholder={'5\'11" - 6\'2"'}
                />
              </div>
              <div className="case-report__field">
                <label htmlFor="report-weight">Weight</label>
                <input
                  id="report-weight"
                  type="text"
                  value={posterReport.weight}
                  onChange={handleFieldChange('weight')}
                  placeholder="190-200 lbs"
                />
              </div>
              <div className="case-report__field">
                <label htmlFor="report-hair">Hair</label>
                <input
                  id="report-hair"
                  type="text"
                  value={posterReport.hair}
                  onChange={handleFieldChange('hair')}
                  placeholder="Black, cut short"
                />
              </div>
              <div className="case-report__field">
                <label htmlFor="report-eyes">Eyes</label>
                <input
                  id="report-eyes"
                  type="text"
                  value={posterReport.eyes}
                  onChange={handleFieldChange('eyes')}
                  placeholder="Brown"
                />
              </div>
              <div className="case-report__field">
                <label htmlFor="report-complexion">Complexion</label>
                <select
                  id="report-complexion"
                  value={posterReport.complexion}
                  onChange={handleFieldChange('complexion')}
                >
                  {COMPLEXION_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="case-report__section">
            <legend>Case Assignment</legend>
            <div className="case-report__grid case-report__grid--three">
              <div className="case-report__field">
                <label htmlFor="report-detective">Detective</label>
                <input
                  id="report-detective"
                  type="text"
                  value={posterReport.detective}
                  onChange={handleFieldChange('detective')}
                  placeholder="Moeller"
                />
              </div>
              <div className="case-report__field">
                <label htmlFor="report-assignment">Assignment Ref</label>
                <input
                  id="report-assignment"
                  type="text"
                  value={posterReport.assignmentRef}
                  onChange={handleFieldChange('assignmentRef')}
                  placeholder="UF-61 #71-06835"
                />
              </div>
              <div className="case-report__field">
                <label htmlFor="report-case">Case #</label>
                <input
                  id="report-case"
                  type="text"
                  value={posterReport.caseNumber}
                  onChange={handleFieldChange('caseNumber')}
                  placeholder="450"
                />
              </div>
            </div>
          </fieldset>
        </section>

        <section className="choose-photo__preview-section">
          <div className={`preview-card${selectedImage ? ' has-image' : ''}`}>
            <div className="preview-card__frame">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected photo preview"
                  className="preview-card__image"
                />
              ) : (
                <div className="preview-card__placeholder">
                  <span>No photo selected</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="choose-photo__continue"
            disabled={!canContinue}
            onClick={onContinue}
          >
            Start Editing →
          </button>
          {!selectedImage && (
            <p className="choose-photo__hint">Select a photo to continue</p>
          )}
          {selectedImage && !isReportValid(posterReport) && (
            <p className="choose-photo__hint">Enter a charge / crime to continue</p>
          )}
        </section>
      </div>
    </div>
  )
}
