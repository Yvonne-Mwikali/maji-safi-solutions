import { useTeam } from "@/hooks/use-team";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Loader2, Mail } from "lucide-react";

export default function Team() {
  const { data: team, isLoading } = useTeam();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">
            Our People
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Meet the Solvers
          </h1>
          <p className="text-lg text-muted-foreground">
            A diverse team of engineers, hydrologists, and community leaders
            united by a single purpose: clean water for all.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {team?.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          className="text-white hover:text-accent transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.facebook && (
                        <a
                          href={member.facebook}
                          className="text-white hover:text-accent transition-colors"
                          aria-label={`${member.name} Facebook`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-white hover:text-accent transition-colors"
                          aria-label={`${member.name} Email`}
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-primary">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
