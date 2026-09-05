import { motion } from "framer-motion";
import {
  GraduationCap,
  Microscope,
  Briefcase,
  Scale,
  Cpu,
  HeartPulse,
  Palette,
  ArrowRight,
} from "lucide-react";

const faculties = [
  {
    title: "Engineering",
    books: "120 Materials",
    icon: Cpu,
    color: "from-blue-600 to-blue-800",
  },
  {
    title: "Science",
    books: "98 Materials",
    icon: Microscope,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Arts",
    books: "74 Materials",
    icon: Palette,
    color: "from-red-500 to-red-700",
  },
  {
    title: "Business",
    books: "90 Materials",
    icon: Briefcase,
    color: "from-indigo-600 to-blue-900",
  },
  {
    title: "Law",
    books: "68 Materials",
    icon: Scale,
    color: "from-red-600 to-pink-600",
  },
  {
    title: "Medicine",
    books: "112 Materials",
    icon: HeartPulse,
    color: "from-blue-700 to-cyan-700",
  },
];

export default function FacultySection() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-semibold">
            <GraduationCap size={16} />
            Faculties
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Browse Study Materials
            <span className="text-red-600"> By Faculty</span>
          </h2>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-lg">
            Every faculty has its own dedicated dashboard with carefully
            organized materials, lecture notes, devotionals and examination
            resources.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {faculties.map((faculty, index) => {
            const Icon = faculty.icon;

            return (
              <motion.div
                key={faculty.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${faculty.color}`}
                />

                <div className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${faculty.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {faculty.title}
                  </h3>

                  <p className="mt-3 text-gray-500">
                    {faculty.books}
                  </p>

                  <button className="mt-8 flex items-center gap-2 text-red-600 font-semibold group-hover:gap-4 transition-all duration-300">
                    Explore Faculty
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}