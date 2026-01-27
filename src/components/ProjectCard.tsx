import { motion } from "framer-motion";
import { type Project } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin, Droplet } from "lucide-react";
import DonationModal from "./DonationModal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const percentFunded = Math.min(
    100,
    Math.round((project.currentAmount / project.targetAmount) * 100),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      data-testid={`card-project-${project.id}`}
    >
      <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-primary text-secondary px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 tracking-wide">
            <Droplet className="w-3 h-3" />
            {project.category.toUpperCase()}
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-heading font-bold text-primary line-clamp-2">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            {project.location}
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-secondary font-bold">
                {percentFunded}% Funded
              </span>
              <span className="text-primary">
                ${project.currentAmount.toLocaleString()} / $
                {project.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentFunded}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-secondary rounded-full"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-6">
          <DonationModal
            projectId={project.id}
            projectTitle={project.title}
            trigger={
              <Button
                className="w-full bg-primary text-secondary font-bold tracking-wide hover:bg-primary/90"
                data-testid={`button-donate-project-${project.id}`}
              >
                DONATE TO THIS PROJECT
              </Button>
            }
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
