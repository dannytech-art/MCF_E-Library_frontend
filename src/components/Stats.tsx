import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Users,
  Building2,
} from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    number: "500+",
    title: "Study Materials",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: GraduationCap,
    number: "12",
    title: "Faculties",
    color: "text-blue-900",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    number: "1000+",
    title: "Students",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Building2,
    number: "24/7",
    title: "Library Access",
    color: "text-blue-900",
    bg: "bg-blue-50",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: .6 }}

          className="text-center"

        >

          <h2 className="text-4xl font-black text-slate-900">

            Trusted By Students

          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">

            Thousands of students rely on the Methodist Campus Fellowship
            Digital Library to strengthen their academics and faith.

          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div

                key={item.title}

                initial={{ opacity: 0, y: 40 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{
                  delay: index * .15,
                }}

                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}

                className="rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 p-8 transition-all"

              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg}`}
                >

                  <Icon
                    className={`w-8 h-8 ${item.color}`}
                  />

                </div>

                <h1 className="mt-6 text-5xl font-black text-slate-900">

                  {item.number}

                </h1>

                <p className="mt-2 text-gray-500">

                  {item.title}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}