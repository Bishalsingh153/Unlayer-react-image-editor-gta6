import gtaViBg from '../assets/gta-vi-bg.png'

export default function ViceCityScene() {
  return (
    <div className="vice-scene" aria-hidden="true">
      <img className="vice-scene__bg" src={gtaViBg} alt="" />
      <div className="vice-scene__overlay" />
      <div className="vice-scene__scanlines" />
      <div className="vice-scene__vignette" />
    </div>
  )
}
