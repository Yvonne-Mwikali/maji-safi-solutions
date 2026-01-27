import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Community water pump"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/20" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 pt-16 md:pt-24 flex justify-start">
        <div className="max-w-4xl space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-2 px-4 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-bold tracking-widest mb-6 backdrop-blur-sm">
              CLEAN WATER SOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              Bridging the gap between
              <br />
              <span className="text-secondary">scarcity</span> and{" "}
              <span className="italic">sustainability</span>.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed"
          >
            We deliver reliable, affordable, and clean water infrastructure to
            rural communities in Kenya . We don't just give water; we build
            solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mb-4 pt-4"
          >
            <Link href="/donate" data-testid="link-hero-donate">
              <Button
                size="lg"
                className="bg-secondary text-primary font-bold text-base md:text-lg px-8 shadow-xl shadow-secondary/20 hover:bg-secondary/90 tracking-wider"
              >
                DONATE NOW <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/projects" data-testid="link-hero-projects">
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-8 bg-transparent text-secondary border-secondary/50 hover:bg-secondary/10 hover:border-secondary tracking-wider font-semibold"
              >
                VIEW OUR SOLUTIONS
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary/60 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-secondary/60 to-transparent"
        />
      </motion.div>
    </div>
  );
}
