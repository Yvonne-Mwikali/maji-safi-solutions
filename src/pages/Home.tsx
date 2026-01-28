import DonationModal from "@/components/DonationModal";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Droplets, Globe, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  const featuredProjects = projects?.slice(0, 3);

  const stats = [
    { label: "Lives Impacted (projected)", value: "1,200", icon: Users },
    { label: "Borehole Drilled", value: "1 (in progress)", icon: Globe },
    { label: "Liters Delivered (projected)", value: "150,000", icon: Droplets },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Mission Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
                Our Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Water is not just a resource. It is life.
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In rural Kenya, millions walk hours every day just to fetch
                dirty water. This cycle of scarcity prevents education, health,
                and economic growth.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At MajiSafi, we are committed to ending water scarcity by
                drilling sustainable boreholes into deeper aquifers, ensuring
                reliable and clean water for communities facing water
                challenges.
              </p>

              <div className="space-y-4">
                {[
                  "Deliver a solar-powered borehole serving rural villages in Kenya",
                  "Distribute clean water to households, schools, and clinics",
                  "Train local operators to keep systems running for the long term",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="bg-secondary rounded-full p-1">
                      <CheckCircle2 className="text-primary h-5 w-5" />
                    </div>
                    <span className="font-medium text-primary">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-xl md:max-w-lg mx-auto">
                <img
                  src="/kaumbulu.jpeg"
                  alt="Kaumbulu carrying water"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-primary p-8 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-secondary">
                <p className="font-heading text-xl font-bold text-white mb-2">
                  "I walk 4 hours each day for water."
                </p>
                <p className="text-white/70 text-sm italic">
                  - Mwikali, Makueni County Resident
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6"
              >
                <stat.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-4xl md:text-5xl font-bold mb-2 font-heading text-secondary">
                  {stat.value}
                </h3>
                <p className="text-white/70 uppercase tracking-wider text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
                Our Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Current Projects Needing Support
              </h2>
              <p className="text-muted-foreground">
                Directly fund a specific borehole or distribution center
                project. 100% of project donations go to the field.
              </p>
            </div>
            <Link href="/projects" data-testid="link-view-all-projects">
              <Button
                variant="outline"
                className="group border-primary text-primary hover:bg-primary hover:text-white"
              >
                View All Projects{" "}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[400px] bg-muted animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProjects?.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary relative overflow-hidden text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6">
              Be the Solution.
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Your contribution transforms lives immediately. Clean water means
              health, education, and hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DonationModal
                trigger={
                  <Button
                    size="lg"
                    className="bg-secondary text-primary font-bold text-lg px-10 py-6 h-auto shadow-xl hover:bg-secondary/90"
                  >
                    Make a Donation
                  </Button>
                }
              />
              <Link href="/get-involved" data-testid="link-cta-partner">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 h-auto bg-transparent text-secondary border-secondary/50 hover:bg-secondary/10 hover:border-secondary"
                >
                  Partner With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
