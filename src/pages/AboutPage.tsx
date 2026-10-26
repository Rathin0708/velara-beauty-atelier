import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/hooks'
import { PageHead } from '../components/layout/PageHead'
import { ParallaxLayer } from '../components/motion/ParallaxLayer'
import { Reveal } from '../components/motion/Reveal'
import { Atmosphere } from '../components/sections/Atmosphere'
import { BookButton } from '../components/ui/BookButton'
import { Photo } from '../components/ui/Photo'

export default function AboutPage() {
  useDocumentMeta('About', 'The VELARA atelier: our philosophy, space and approach to products.')
  return (
    <div className="page">
      <PageHead eyebrow="The atelier" title="The art of *becoming* you" lede="VELARA is a beauty atelier built on listening first, working slowly and finishing in good light." />
      <div className="container split-2">
        <ParallaxLayer speed={6}><Photo name="vanity" alt="A white wooden vanity mirror with lights" className="arch ratio-34" sizes="(min-width: 1024px) 40vw, 90vw" eager /></ParallaxLayer>
        <Reveal>
          <h2 className="display d-md">Our philosophy</h2>
          <p className="lede">Beauty is not a template. Every visit begins with a conversation, and every result is shaped around the person in the chair.</p>
          <p className="muted">We keep the pace unhurried, explain what we are doing and why, and leave you with simple guidance you can use at home.</p>
          <p className="note">This is placeholder brand copy. Replace it with the salon’s own story.</p>
        </Reveal>
      </div>
      <section className="section section--champagne" aria-labelledby="products-title">
        <div className="container split-2">
          <Reveal>
            <p className="eyebrow">Products</p>
            <h2 id="products-title" className="display d-lg">Chosen for <em>you</em>, not for shelves.</h2>
          </Reveal>
          <Reveal>
            <p className="lede">We choose products for your skin and hair on the day, and we tell you plainly what we used. Specific brands and partnerships are confirmed by the salon.</p>
            <BookButton>Book Appointment</BookButton>
          </Reveal>
        </div>
      </section>
      <Atmosphere />
      <p className="container center"><Link to="/team" className="link-u">Meet the team</Link></p>
    </div>
  )
}
