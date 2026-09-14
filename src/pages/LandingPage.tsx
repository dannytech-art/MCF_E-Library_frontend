import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  ArrowRight,
  ArrowDown,
  GraduationCap,
  Microscope,
  Palette,
  Briefcase,
  Shield,
  Zap,
  Users,
  Star,
  Sparkles,
  Library,
  Globe,
  Award,
} from "lucide-react";
import { faculties } from "../data/faculties";

gsap.registerPlugin(ScrollTrigger);

const facultyIcons: Record<string, { icon: any; gradient: string }> = {
  "Faculty Of Engineering": { icon: Zap, gradient: "from-amber-500 to-orange-600" },
  "Faculty Of Science": { icon: Microscope, gradient: "from-teal to-emerald-600" },
  "Faculty Of Art": { icon: Palette, gradient: "from-rose-500 to-pink-600" },
  "Faculty Of Social Sciences": { icon: Briefcase, gradient: "from-indigo-500 to-purple-600" },
  "Faculty Of Education": { icon: GraduationCap, gradient: "from-cyan-500 to-blue-600" },
};
const defaultFacultyIcon = { icon: Library, gradient: "from-carton to-carton-dark" };

function BookScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pages = pagesRef.current.filter(Boolean) as HTMLDivElement[];

      // Slight book tilt + scale as we scroll
      gsap.to(bookRef.current, {
        rotateY: -15,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
        },
      });

      // Page flipping animation
      pages.forEach((page, i) => {
        gsap.to(page, {
          rotateY: -180,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${i * 120} top`,
            end: `top+=${(i + 1) * 120} top`,
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const goToFaculties = () => {
    document.getElementById("faculties")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
        {/* Ambient gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-bg to-black" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-carton/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal/10 rounded-full blur-3xl" />

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-28 left-1/2 -translate-x-1/2 flex items-center gap-2 text-carton text-xs tracking-[0.4em] uppercase"
        >
          <BookOpen size={14} />
          MCF UNN E-Library
        </motion.div>

        {/* 3D Book */}
        <div className="relative" style={{ perspective: "2000px" }}>
          <div
            ref={bookRef}
            className="relative w-[280px] h-[380px] md:w-[380px] md:h-[520px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-carton-dark via-black to-black z-30 rounded-l" />

            {/* Back cover */}
            <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-br from-[#1a1a1a] to-black border border-carton/20 shadow-2xl" />

            {/* Flipping pages */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                ref={(el) => { pagesRef.current[i] = el; }}
                className="absolute inset-0 rounded-r-2xl bg-gradient-to-br from-cream to-[#E8D5B7] origin-left shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  zIndex: 20 - i,
                }}
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="font-serif text-2xl md:text-3xl font-bold text-black mb-6">
                    Chapter {i + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    {[...Array(9)].map((_, line) => (
                      <div
                        key={line}
                        className="h-2 bg-black/10 rounded"
                        style={{ width: `${50 + ((i * line * 7) % 45)}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-black/40 text-center mt-6 font-serif italic">
                    — Page {i * 2 + 1} —
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 text-center px-6 max-w-3xl relative z-10"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] mb-6">
            Knowledge That
            <br />
            <span className="gradient-text">Fits Your Faculty</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Access carefully curated learning materials from your faculty — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goToFaculties}
              className="group px-8 py-4 rounded-full bg-carton hover:bg-carton-light text-black font-semibold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-carton/40 flex items-center justify-center gap-2"
            >
              Browse Faculties
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="px-8 py-4 rounded-full glass hover:border-carton text-cream font-semibold transition-all"
            >
              Create Account
            </button>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-carton/60"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function StatsSection() {
  const stats = [
    { label: "Study Materials", value: 500, suffix: "+", icon: BookOpen },
    { label: "Active Students", value: 2000, suffix: "+", icon: Users },
    { label: "Faculties", value: 5, suffix: "", icon: GraduationCap },
    { label: "Free Access", value: 100, suffix: "%", icon: Award },
  ];

  return (
    <section className="relative py-24 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass rounded-3xl p-6 md:p-8 text-center hover:border-carton/40 transition-colors group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-carton/10 border border-carton/20 flex items-center justify-center mb-4 group-hover:bg-carton/20 transition-colors">
                  <Icon size={22} className="text-carton" />
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-cream mb-1">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-gray-400 tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FacultiesSection() {
  const navigate = useNavigate();

  const handleFacultyClick = (facultyName: string) => {
    const encodedName = encodeURIComponent(facultyName);
    navigate(`/dashboard/${encodedName}`);
  };

  return (
    <section id="faculties" className="relative py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-carton/10 border border-carton/20 text-carton px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
            <GraduationCap size={14} />
            Faculties
          </span>

          <h2 className="mt-6 font-serif text-4xl md:text-6xl font-bold text-cream leading-tight">
            Browse Materials
            <br />
            <span className="gradient-text">By Your Faculty</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Every faculty has its own dedicated dashboard with carefully organized materials, lecture notes, and examination resources.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((faculty, index) => {
            const { icon: Icon, gradient } =
              facultyIcons[faculty.name] || defaultFacultyIcon;

            return (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
                onClick={() => handleFacultyClick(faculty.name)}
                className="group relative overflow-hidden rounded-3xl bg-surface border border-carton/10 hover:border-carton/40 transition-all duration-500 cursor-pointer"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-carton/0 via-carton/0 to-carton/0 group-hover:from-carton/5 group-hover:to-teal/5 transition-all duration-500" />

                <div className={`h-1 bg-gradient-to-r ${gradient}`} />

                <div className="relative p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-bold text-cream group-hover:text-carton transition-colors">
                    {faculty.name}
                  </h3>

                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                    {faculty.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-carton font-medium text-sm group-hover:gap-4 transition-all duration-300">
                    Explore Faculty
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. WHY CHOOSE SECTION
   ============================================================ */
function WhyChooseSection() {
  const features = [
    {
      icon: Shield,
      title: "Faculty-Exclusive Access",
      desc: "Only see materials relevant to your faculty. No clutter, no noise.",
    },
    {
      icon: Zap,
      title: "Powered by Google Drive",
      desc: "Materials are stored securely and served directly from Google Drive.",
    },
    {
      icon: Globe,
      title: "Access Anywhere",
      desc: "Any device, any time. Your library follows you.",
    },
    {
      icon: Sparkles,
      title: "Always Updated",
      desc: "When new materials are added, you see them instantly.",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 text-teal px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
              Why Choose Us
            </span>

            <h2 className="mt-6 font-serif text-4xl md:text-5xl font-bold text-cream leading-tight">
              A Library Built
              <br />
              <span className="gradient-text">Around You</span>
            </h2>

            <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed">
              We've designed MCF E-Library to feel less like a website and more like a personal reading room — just for your faculty.
            </p>

            <div className="mt-10 space-y-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-carton/10 border border-carton/20 flex items-center justify-center">
                      <Icon size={20} className="text-carton" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream mb-1">{f.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Floating books */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[500px] hidden lg:block"
          >
            <div className="absolute top-10 left-10 w-64 h-80 rounded-2xl bg-gradient-to-br from-carton to-carton-dark shadow-2xl shadow-carton/30 rotate-[-8deg] animate-float p-6 flex flex-col justify-between">
              <BookOpen className="text-black/70" size={32} />
              <div>
                <div className="font-serif text-2xl font-bold text-black">Vol. I</div>
                <div className="text-xs text-black/60 uppercase tracking-widest">Faculty Collection</div>
              </div>
            </div>

            <div
              className="absolute top-32 right-10 w-64 h-80 rounded-2xl bg-gradient-to-br from-teal to-teal-dark shadow-2xl shadow-teal/30 rotate-[6deg] animate-float p-6 flex flex-col justify-between"
              style={{ animationDelay: "1s" }}
            >
              <Library className="text-cream/80" size={32} />
              <div>
                <div className="font-serif text-2xl font-bold text-cream">Vol. II</div>
                <div className="text-xs text-cream/60 uppercase tracking-widest">Study Notes</div>
              </div>
            </div>

            <div
              className="absolute bottom-10 left-20 w-56 h-72 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-black border border-carton/30 shadow-2xl rotate-[-4deg] animate-float p-6 flex flex-col justify-between"
              style={{ animationDelay: "2s" }}
            >
              <Sparkles className="text-carton" size={32} />
              <div>
                <div className="font-serif text-2xl font-bold text-cream">Vol. III</div>
                <div className="text-xs text-carton uppercase tracking-widest">Exams & More</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Chidi Okafor",
      faculty: "Engineering",
      text: "The faculty-specific dashboard saved me hours of searching. Everything I need is right there.",
    },
    {
      name: "Amaka Nwosu",
      faculty: "Science",
      text: "Clean, fast, and it just works. This is what our library should have been from day one.",
    },
    {
      name: "Tunde Adeyemi",
      faculty: "Arts",
      text: "Finally a place where I don't have to dig through 20 tabs to find one PDF.",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-carton/10 border border-carton/20 text-carton px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Star size={14} />
            Loved by Students
          </span>

          <h2 className="mt-6 font-serif text-4xl md:text-6xl font-bold text-cream">
            What They're <span className="gradient-text">Saying</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-8 hover:border-carton/40 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} className="fill-carton text-carton" />
                ))}
              </div>
              <p className="text-cream/90 leading-relaxed mb-6 font-serif italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-carton to-carton-dark flex items-center justify-center text-black font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-cream text-sm">{t.name}</div>
                  <div className="text-xs text-carton">{t.faculty}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden glass p-12 md:p-20 text-center"
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-carton/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <Sparkles className="text-carton mx-auto mb-6" size={32} />
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream leading-tight mb-6">
              Your Faculty Library
              <br />
              <span className="gradient-text">Awaits You</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10">
              Sign up in seconds. Free forever. No credit card. Just knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/signup")}
                className="group px-8 py-4 rounded-full bg-carton hover:bg-carton-light text-black font-semibold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-carton/40 flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-full glass hover:border-carton text-cream font-semibold transition-all"
              >
                I Already Have an Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="relative border-t border-carton/10 bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-carton to-carton-dark flex items-center justify-center text-black">
                <BookOpen size={22} />
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-cream leading-none">MCF E-Library</div>
                <div className="text-[10px] text-carton tracking-widest uppercase">UNN</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              A faculty-specific digital library for students of the University of Nigeria, Nsukka. Built with love, powered by Google Drive.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/" className="hover:text-carton transition-colors">Home</a></li>
              <li><a href="/#faculties" className="hover:text-carton transition-colors">Faculties</a></li>
              <li><a href="/login" className="hover:text-carton transition-colors">Login</a></li>
              <li><a href="/signup" className="hover:text-carton transition-colors">Sign Up</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>University of Nigeria</li>
              <li>Nsukka, Enugu State</li>
              <li className="text-carton">mcf@unn.edu.ng</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-carton/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MCF E-Library. All rights reserved.</p>
          <p className="text-carton/70">Made with 💛 for UNN students</p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-bg overflow-x-hidden grain min-h-screen">
      <BookScrollHero />
      <StatsSection />
      <FacultiesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}