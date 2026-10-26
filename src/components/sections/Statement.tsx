import { Link } from 'react-router-dom'
import { Photo } from '../ui/Photo'
import { ParallaxLayer } from '../motion/ParallaxLayer'
import { Reveal } from '../motion/Reveal'
import { ScrollBrighten } from '../motion/ScrollBrighten'

export function Statement() {
  return (
    <section className="section statement" aria-labelledby="statement-title">
      <div className="container statement-grid">
        <ParallaxLayer speed={10} className="statement-img statement-img--a">
          <Photo name="makeupApply1" alt="A makeup artist working with a brush" className="ratio-34" sizes="(min-width: 1024px) 22vw, 40vw" />
        </ParallaxLayer>
        <div className="statement-core">
          <p className="eyebrow">The atelier</p>
          <h2 id="statement-title" className="vh">Beauty is not applied. It is revealed.</h2>
          <ScrollBrighten className="display d-xl statement-text" text="Beauty is not applied. It is *revealed*." />
          <Reveal>
            <p className="lede">We begin with listening, work slowly, and finish in good light, so what you see is you, simply more so.</p>
            <Link to="/about" className="link-u" data-cursor="VIEW">Our story</Link>
          </Reveal>
        </div>
        <ParallaxLayer speed={-12} className="statement-img statement-img--b">
          <Photo name="palette" alt="An assortment of makeup palettes on a table" className="ratio-45" sizes="(min-width: 1024px) 20vw, 36vw" />
        </ParallaxLayer>
      </div>
    </section>
  )
}
