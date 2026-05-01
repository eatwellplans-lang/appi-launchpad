import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTASection from "@/components/site/CTASection";
import Reveal, { StaggerGrid, StaggerItem } from "@/components/site/Reveal";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        eyebrow="Blog & Articles"
        title="Insights, ideas & engineering notes"
        description="Field notes from the Appi Technologies team on product, design, AI, and the craft of shipping software that works."
      />

      {/* FEATURED */}
      <section className="container py-16 md:py-20">
        <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-8 glass-card rounded-3xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-elegant"
          >
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-secondary">
              <img
                src={featured.cover}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-medium text-primary border border-primary/30">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-primary font-medium">
                {featured.category}
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold mt-3 mb-4 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-5 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* GRID */}
      <section className="container pb-20 md:pb-28">
        <StaggerGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="group glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-elegant h-full flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">
                    {post.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <CTASection />
    </>
  );
};

export default Blog;
