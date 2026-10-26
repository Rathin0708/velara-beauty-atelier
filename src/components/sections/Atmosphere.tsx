import { Link } from 'react-router-dom'
import { Photo } from '../ui/Photo'
import { ParallaxLayer } from '../motion/ParallaxLayer'
import { Reveal } from '../motion/Reveal'

export function Atmosphere() {
  return (
    <section className="section atmosphere" aria-labelledby="atmos-title">
      <div className="container atmos-grid">
        <div className="atmos-copy">
          <p className="eyebrow">The space</p>
          <h2 id="atmos-title" className="display d-lg">A room that <em>exhales</em>.</h2>
          <Reveal>
            <p className="lede">Soft light, round mirrors and quiet corners: a room designed to slow the day down before the work even begins.</p>
            <Link to="/contact" className="link-u">Visit the atelier</Link>
          </Reveal>
          <p className="note">Imagery shown is inspiration, not photographs of this salon.</p>
        </div>
        <div className="atmos-collage">
          <ParallaxLayer speed={6} className="atmos-a"><Photo name="interior1" alt="A modern salon interior with chairs and mirrors" className="ratio-45" sizes="(min-width: 1024px) 30vw, 60vw" /></ParallaxLayer>
          <ParallaxLayer speed={-10} className="atmos-b"><Photo name="interior2" alt="Salon chairs facing circular mirrors on a dark wall" className="ratio-11" sizes="(min-width: 1024px) 20vw, 40vw" /></ParallaxLayer>
          <ParallaxLayer speed={12} className="atmos-c"><Photo name="interior3" alt="Salon with black chairs, round mirrors and a brick wall" className="ratio-34" sizes="(min-width: 1024px) 18vw, 36vw" /></ParallaxLayer>
          <ParallaxLayer speed={-6} className="atmos-d"><Photo name="interior4" alt="Barber chairs and sinks in a dimly lit salon" className="ratio-169" sizes="(min-width: 1024px) 22vw, 50vw" /></ParallaxLayer>
        </div>
      </div>
    </section>
  )
}
