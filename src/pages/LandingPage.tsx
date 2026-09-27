import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  ArrowDown,
  GraduationCap,
  Microscope,
  Palette,
  Briefcase,
  Zap,
  Users,
  Star,
  Sparkles,
  Library,
  Shield,
  Globe,
  Award,
} from "lucide-react";
import { faculties } from "../data/faculties";
import bookVideo from "../assets/book-flip.mp4";

/* ============================================================
   HERO — VIDEO ON LOOP, WITH WARM ACCENTS
   ============================================================ */
function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setVideoReady(true))
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={bookVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Warm amber radial glow behind the book */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,147,90,0.15)_0%,_transparent_60%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 border border-carton/40 bg-carton/10 backdrop-blur-md text-carton px-5 py-2 rounded-full text-xs tracking-[0.3em] uppercase mb-8"
        >
          <BookOpen size={14} />
          MCF UNN E-Library
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] max-w-5xl"
        >
          Explore a new way
          <br />
          to enjoy{" "}
          <span className="italic bg-gradient-to-r from-carton via-amber-300 to-carton bg-clip-text text-transparent">
            knowledge
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white/70 text-base md:text-lg mt-8 max-w-xl"
        >
          Every faculty. Every page. One library built just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <button
            onClick={() =>
              document.getElementById("faculties")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-carton to-amber-500 text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_20px_60px_rgba(184,147,90,0.4)] transition-all"
          >
            Browse Faculties
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="px-8 py-4 rounded-full border border-carton/40 bg-white/5 backdrop-blur-md hover:bg-carton/10 hover:border-carton text-white font-semibold transition-all"
          >
            Create Account
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-carton/70 z-10"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}

/* ============================================================
   COUNTER
   ============================================================ */
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

/* ============================================================
   STATS
   ============================================================ */
function StatsSection() {
  const stats = [
    { label: "Study Materials", value: 500, suffix: "+", icon: BookOpen, hex: "#B8935A" },
    { label: "Active Students", value: 2000, suffix: "+", icon: Users, hex: "#0EA5E9" },
    { label: "Faculties", value: 5, suffix: "", icon: GraduationCap, hex: "#10B981" },
    { label: "Free Access", value: 100, suffix: "%", icon: Award, hex: "#8B5CF6" },
  ];

  return (
    <section className="relative py-28 px-6 bg-black border-t border-white/5">
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
                className="relative border border-white/10 rounded-3xl p-6 md:p-8 text-center hover:border-white/30 transition-colors group overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.hex}15 0%, transparent 70%)`,
                  }}
                />

                <div
                  className="relative w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{
                    background: `${stat.hex}15`,
                    border: `1px solid ${stat.hex}40`,
                  }}
                >
                  <Icon size={22} style={{ color: stat.hex }} />
                </div>

                <div className="relative font-serif text-3xl md:text-4xl font-bold text-white mb-1">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="relative text-xs md:text-sm text-white/50 tracking-wide uppercase">
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

/* ============================================================
   FACULTIES
   ============================================================ */
function FacultiesSection() {
  const navigate = useNavigate();

  const handleFacultyClick = (facultyName: string) => {
    const encodedName = encodeURIComponent(facultyName);
    navigate(`/dashboard/${encodedName}`);
  };

  const facultyStyles: Record<string, { icon: any; gradient: string; glow: string }> = {
    "Faculty Of Engineering": {
      icon: Zap,
      gradient: "from-amber-500 to-orange-600",
      glow: "rgba(245,158,11,0.4)",
    },
    "Faculty Of Science": {
      icon: Microscope,
      gradient: "from-emerald-500 to-teal-600",
      glow: "rgba(16,185,129,0.4)",
    },
    "Faculty Of Art": {
      icon: Palette,
      gradient: "from-rose-500 to-pink-600",
      glow: "rgba(244,63,94,0.4)",
    },
    "Faculty Of Social Sciences": {
      icon: Briefcase,
      gradient: "from-violet-500 to-purple-600",
      glow: "rgba(139,92,246,0.4)",
    },
    "Faculty Of Education": {
      icon: GraduationCap,
      gradient: "from-sky-500 to-blue-600",
      glow: "rgba(14,165,233,0.4)",
    },
  };

  const fallback = {
    icon: Library,
    gradient: "from-carton to-amber-600",
    glow: "rgba(184,147,90,0.4)",
  };

  return (
    <section id="faculties" className="relative py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 border border-carton/40 bg-carton/10 text-carton px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
            <GraduationCap size={14} />
            Faculties
          </span>

          <h2 className="mt-6 font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
            Browse Materials
            <br />
            <span className="italic bg-gradient-to-r from-carton via-amber-300 to-carton bg-clip-text text-transparent">
              By Your Faculty
            </span>
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-base md:text-lg">
            Every faculty has its own dedicated dashboard with carefully organized materials, lecture notes, and examination resources.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((faculty, index) => {
            const style = facultyStyles[faculty.name] || fallback;
            const Icon = style.icon;

            return (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
                onClick={() => handleFacultyClick(faculty.name)}
                className="group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer"
                style={
                  {
                    "--glow": style.glow,
                  } as React.CSSProperties
                }
              >
                <div className={`h-1 bg-gradient-to-r ${style.gradient}`} />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top left, var(--glow) 0%, transparent 70%)`,
                  }}
                />

                <div className="relative p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-bold text-white transition-colors">
                    {faculty.name}
                  </h3>

                  <p className="mt-3 text-sm text-white/60 leading-relaxed">
                    {faculty.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                    <span className="text-sm font-medium">Explore Faculty</span>
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
   LEATHER BOOK — CSS-only 3D book
   ============================================================ */
function LeatherBook({
  title,
  subtitle,
  edition,
}: {
  title: string;
  subtitle: string;
  edition: string;
}) {
  return (
    <div
      className="relative group"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Shadow under book */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/60 blur-2xl rounded-full" />

      {/* The book itself */}
      <div
        className="relative w-56 h-72 transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 25px 40px rgba(184,147,90,0.25))",
        }}
      >
        {/* Front cover */}
        <div
          className="absolute inset-0 rounded-r-xl rounded-l-sm overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, #8A6D3F 0%, #B8935A 20%, #A67C48 50%, #8A6D3F 80%, #6B5432 100%)
            `,
            boxShadow: `
              inset 0 1px 0 rgba(255, 220, 160, 0.25),
              inset 0 -2px 6px rgba(0, 0, 0, 0.4),
              0 1px 0 rgba(255, 255, 255, 0.05)
            `,
          }}
        >
          {/* Leather grain texture */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Gold border frame */}
          <div
            className="absolute inset-4 rounded-md border-2 pointer-events-none"
            style={{
              borderColor: "rgba(255, 215, 150, 0.5)",
              boxShadow:
                "inset 0 0 20px rgba(255, 215, 150, 0.15), 0 0 12px rgba(0,0,0,0.3)",
            }}
          />

          {/* Inner gold frame */}
          <div
            className="absolute inset-6 rounded border pointer-events-none"
            style={{ borderColor: "rgba(255, 215, 150, 0.3)" }}
          />

          {/* Top edition text */}
          <div className="absolute top-10 left-0 right-0 text-center">
            <div
              className="font-serif text-[10px] tracking-[0.4em]"
              style={{ color: "rgba(255, 230, 180, 0.7)" }}
            >
              {edition}
            </div>
          </div>

          {/* Center gold emblem */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: "rgba(255, 215, 150, 0.6)" }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(255, 215, 150, 0.8)" }} />
              <div className="w-6 h-px" style={{ background: "rgba(255, 215, 150, 0.6)" }} />
            </div>

            <div
              className="font-serif text-2xl font-bold tracking-wider text-center px-6"
              style={{
                color: "#F5E6D3",
                textShadow:
                  "0 1px 0 rgba(0,0,0,0.6), 0 0 12px rgba(255,215,150,0.4), 0 -1px 0 rgba(255,215,150,0.3)",
                letterSpacing: "0.15em",
              }}
            >
              {title}
            </div>

            <div
              className="font-serif text-sm tracking-[0.3em] mt-2 text-center"
              style={{
                color: "rgba(255, 230, 180, 0.85)",
                textShadow: "0 1px 0 rgba(0,0,0,0.5)",
              }}
            >
              {subtitle}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-px" style={{ background: "rgba(255, 215, 150, 0.6)" }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(255, 215, 150, 0.8)" }} />
              <div className="w-6 h-px" style={{ background: "rgba(255, 215, 150, 0.6)" }} />
            </div>
          </div>

          {/* Bottom small text */}
          <div className="absolute bottom-10 left-0 right-0 text-center">
            <div
              className="font-serif text-[9px] tracking-[0.3em]"
              style={{ color: "rgba(255, 230, 180, 0.6)" }}
            >
              MCF · UNN
            </div>
          </div>
        </div>

        {/* Spine */}
        <div
          className="absolute left-0 top-0 bottom-0 w-3 rounded-l-sm"
          style={{
            background: `linear-gradient(to right, #4A3820 0%, #6B5432 50%, #8A6D3F 100%)`,
            transform: "translateX(-3px) rotateY(-90deg)",
            transformOrigin: "right",
            boxShadow: "inset -1px 0 2px rgba(0,0,0,0.5)",
          }}
        />

        {/* Page edges */}
        <div
          className="absolute right-0 top-2 bottom-2 w-2 rounded-r-sm"
          style={{
            background: `repeating-linear-gradient(
              to bottom,
              #E8D5B7 0px,
              #E8D5B7 1px,
              #D4B483 1px,
              #D4B483 2px
            )`,
            transform: "translateX(2px) rotateY(90deg)",
            transformOrigin: "left",
            boxShadow: "inset 1px 0 2px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   WHY CHOOSE
   ============================================================ */
function WhyChooseSection() {
  const features = [
    { icon: Shield, title: "Faculty-Exclusive Access", desc: "Only see materials relevant to your faculty. No clutter, no noise.", color: "#B8935A" },
    { icon: Zap, title: "Powered by Google Drive", desc: "Materials are stored securely and served directly from Google Drive.", color: "#F59E0B" },
    { icon: Globe, title: "Access Anywhere", desc: "Any device, any time. Your library follows you.", color: "#0EA5E9" },
    { icon: Sparkles, title: "Always Updated", desc: "When new materials are added, you see them instantly.", color: "#10B981" },
  ];

  return (
    <section className="relative py-32 px-6 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
              Why Choose Us
            </span>

            <h2 className="mt-6 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              A Library Built
              <br />
              <span className="italic bg-gradient-to-r from-emerald-400 via-sky-400 to-carton bg-clip-text text-transparent">
                Around You
              </span>
            </h2>

            <p className="mt-6 text-white/60 text-base md:text-lg leading-relaxed">
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
                    className="flex gap-4 group"
                  >
                    <div
                      className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        background: `${f.color}15`,
                        border: `1px solid ${f.color}40`,
                      }}
                    >
                      <Icon size={20} style={{ color: f.color }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: Brown leather 3D books */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[600px] hidden lg:flex items-center justify-center"
          >
            {/* Ambient warm glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,147,90,0.18)_0%,_transparent_60%)] blur-2xl" />

            {/* Book 1 */}
            <div
              className="absolute top-0 left-4 animate-float"
              style={{ animationDelay: "0s", transform: "rotate(-8deg)" }}
            >
              <LeatherBook title="FACULTY" subtitle="COLLECTION" edition="Vol. I" />
            </div>

            {/* Book 2 */}
            <div
              className="absolute top-20 right-4 animate-float"
              style={{ animationDelay: "1s", transform: "rotate(6deg)" }}
            >
              <LeatherBook title="STUDY" subtitle="NOTES" edition="Vol. II" />
            </div>

            {/* Book 3 */}
            <div
              className="absolute bottom-0 left-20 animate-float"
              style={{ animationDelay: "2s", transform: "rotate(-4deg)" }}
            >
              <LeatherBook title="EXAMS" subtitle="& MORE" edition="Vol. III" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function TestimonialsSection() {
  const testimonials = [
    { name: "Chidi Okafor", faculty: "Engineering", text: "The faculty-specific dashboard saved me hours of searching. Everything I need is right there.", color: "#F59E0B" },
    { name: "Amaka Nwosu", faculty: "Science", text: "Clean, fast, and it just works. This is what our library should have been from day one.", color: "#10B981" },
    { name: "Tunde Adeyemi", faculty: "Arts", text: "Finally a place where I don't have to dig through 20 tabs to find one PDF.", color: "#F43F5E" },
  ];

  return (
    <section className="relative py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 border border-carton/40 bg-carton/10 text-carton px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Star size={14} />
            Loved by Students
          </span>

          <h2 className="mt-6 font-serif text-4xl md:text-6xl font-bold text-white">
            What They're{" "}
            <span className="italic bg-gradient-to-r from-carton via-amber-300 to-carton bg-clip-text text-transparent">
              Saying
            </span>
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
              className="relative border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top right, ${t.color}15 0%, transparent 60%)`,
                }}
              />

              <div className="relative flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} style={{ fill: t.color, color: t.color }} />
                ))}
              </div>
              <p className="relative text-white/85 leading-relaxed mb-6 font-serif italic">
                "{t.text}"
              </p>
              <div className="relative flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
                  style={{ background: t.color }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-white/50">{t.faculty}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden border border-carton/30 p-12 md:p-20 text-center"
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-carton/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />

          <div className="relative z-10">
            <Sparkles className="text-carton mx-auto mb-6" size={32} />
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Your Faculty Library
              <br />
              <span className="italic bg-gradient-to-r from-carton via-amber-300 to-carton bg-clip-text text-transparent">
                Awaits You
              </span>
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10">
              Sign up in seconds. Free forever. No credit card. Just knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/signup")}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-carton to-amber-500 text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_20px_60px_rgba(184,147,90,0.5)] transition-all"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold transition-all hover:bg-white/10 hover:border-carton"
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

/* ============================================================
   FOOTER
   ============================================================ */
function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-carton to-amber-500 flex items-center justify-center text-black shadow-lg shadow-carton/30">
                <BookOpen size={22} />
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-white leading-none">
                  MCF E-Library
                </div>
                <div className="text-[10px] text-carton tracking-widest uppercase">UNN</div>
              </div>
            </div>
            <p className="text-white/50 text-sm max-w-md leading-relaxed">
              A faculty-specific digital library for students of the University of Nigeria, Nsukka. Built with love, powered by Google Drive.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <a href="/" className="hover:text-carton transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#faculties" className="hover:text-carton transition-colors">
                  Faculties
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-carton transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="hover:text-carton transition-colors">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>University of Nigeria</li>
              <li>Nsukka, Enugu State</li>
              <li className="text-carton">mcf@unn.edu.ng</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} MCF E-Library. All rights reserved.</p>
          <p>Made with 💛 for UNN students</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function LandingPage() {
  return (
    <div className="bg-black overflow-x-hidden min-h-screen">
      <VideoHero />
      <StatsSection />
      <FacultiesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}