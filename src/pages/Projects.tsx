import { useProjects } from "@/hooks/use-projects";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? projects?.filter((project) => project.category === selectedCategory)
    : projects;

  const categories = ["Borehole", "Piping", "School", "Irrigation"];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="bg-primary text-white py-16 md:py-24 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://pixabay.com/get/g929b53ad2fe1413d84999350a6805af5024a6402349fcfd38fdee21881f6ce58e43c7cdd9c3398efefd750a987d1c43829a534b9f2647d41f65b92410ac3434c_1280.jpg"
            alt="Water background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              Active Projects
            </h1>
            <p className="text-xl text-white/80">
              Transparency is our core value. Track the progress of every
              borehole and pipeline we build.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-primary" : ""}
              >
                All Projects
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects?.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            {filteredProjects?.length === 0 && (
              <div className="text-center py-20 border rounded-xl bg-muted/20">
                <p className="text-xl text-muted-foreground">
                  No projects found in this category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
