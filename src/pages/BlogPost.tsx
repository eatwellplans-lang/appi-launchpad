import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/site/CTASection";
import Reveal from "@/components/site/Reveal";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="relative">
        {/* Cover */}
        <div className="relative h-[42vh] md:h-[60vh] overflow-hidden">
          <img src={post.cover} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>

        <div className="container relative -mt-32 md:-mt-48 max-w-3xl">
          <Reveal>
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" /> Back to blog
              </Link>

              <span className="text-xs uppercase tracking-wider text-primary font-medium">
                {post.category}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mt-3 mb-6 gradient-text">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground pb-8 mb-8 border-b border-border">
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              </div>

              <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
                {post.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Related */}
      <section className="container py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Keep reading</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/blog">All articles <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-primary font-medium">{p.category}</span>
                <h3 className="font-display text-lg font-semibold mt-2 group-hover:text-primary transition-colors">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default BlogPost;
