import Hero from '@/components/Homepage/Hero';
import AboutPreview from '@/components/Homepage/AboutPreview';
import Services from '@/components/Homepage/Services';
import WhyChooseUs from '@/components/Homepage/WhyChooseUs';
import Stats from '@/components/Homepage/Stats';
import FeaturedProjects from '@/components/Homepage/FeaturedProjects';
import Testimonials from '@/components/Homepage/Testimonials';
import CTA from '@/components/Homepage/CTA';
import HomeBlog from '@/components/Homepage/HomeBlog';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
      <HomeBlog />
      <CTA />
    </>
  );
}