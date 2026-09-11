import { useRef } from 'react'
import { PRESET_CHARACTERS } from '../data/presets'

export default function ChoosePhoto({ selectedImage, onSelectImage, onContinue }) {
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

  const isPresetSelected = (preset) => selectedImage === preset.image

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
            disabled={!selectedImage}
            onClick={onContinue}
          >
            Start Editing →
          </button>
        </section>
      </div>
    </div>
  )
}
