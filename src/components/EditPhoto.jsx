import ImageEditor from '@unlayer/react-image-editor'

const EDITOR_OPTIONS = {
  theme: 'dark',
  features: {
    imageEditor: {
      tools: {
        filter: true,
        text: true,
        stickers: true,
        draw: true,
        crop: false,
        resize: false,
        shapes: false,
        frame: false,
      },
    },
  },
}

export default function EditPhoto({
  selectedImageUrl,
  onSave,
  onBack,
}) {
  return (
    <div className="edit-photo">
      <button type="button" className="edit-photo__back" onClick={onBack}>
        ← Back
      </button>

      <div className="edit-photo__editor">
        <ImageEditor
          image={selectedImageUrl}
          options={EDITOR_OPTIONS}
          minHeight="min(600px, 55dvh)"
          style={{ width: '100%', height: '100%', minHeight: 'min(600px, 55dvh)' }}
          onSave={onSave}
          onCancel={onBack}
        />
      </div>

      <p className="edit-photo__caption">
        Add GTA-style filters, neon text and stickers, then hit Save.
      </p>
    </div>
  )
}
