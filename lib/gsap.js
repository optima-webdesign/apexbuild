import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sirf client-side par register karein (taaki SSR mein error na aaye)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export * from "gsap";
export { ScrollTrigger };