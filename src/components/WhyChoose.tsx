import { motion } from "framer-motion";
import {
  BookOpen,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";

import students from "../assets/students.png";

const features = [
  {
    icon: BookOpen,
    title: "Faculty-Based Resources",
    description:
      "Study materials are carefully organized according to your faculty, making it easy to find relevant books, lecture notes, and resources.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: HeartHandshake,
    title: "Faith & Academic Growth",
    description:
      "Grow spiritually while excelling academically through faith-centered learning resources and devotionals.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: ShieldCheck,
    title: "Secure Student Access",
    description:
      "Only registered students can access the digital library, ensuring a safe and organized learning environment.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: GraduationCap,
    title: "Read Anywhere",
    description:
      "Access your materials anytime on your laptop, tablet, or phone without carrying physical books everywhere.",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className="relative"
          >
            {/* Background Decoration */}

            <div className="absolute -top-8 -left-8 w-56 h-56 rounded-full bg-red-100 blur-3xl opacity-60" />

            <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-blue-100 blur-3xl opacity-60" />

            {/* Image Card */}

            <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden p-6">

              <img
                src={students}
                alt="Students studying"
                className="w-full object-contain"
              />

              {/* Floating Badge */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="absolute top-8 left-8 bg-white rounded-2xl shadow-xl p-4"
              >
                <h4 className="font-bold text-slate-900">
                  📚 500+ Resources
                </h4>

                <p className="text-sm text-gray-500">
                  Available Online
                </p>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl p-4"
              >
                <h4 className="font-bold text-slate-900">
                  🎓 12 Faculties
                </h4>

                <p className="text-sm text-gray-500">
                  Well Organized
                </p>
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >
            <span className="inline-block bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-semibold">
              Why Choose Us
            </span>

            <h2 className="text-5xl font-black mt-6 leading-tight text-slate-900">
              Learn Smarter.
              <br />
              Grow Spiritually.
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              The Methodist Campus Fellowship E-Library combines academic
              excellence with Christian values, giving students a modern
              platform to study, grow, and succeed.
            </p>

            <div className="grid gap-8 mt-12">

              {features.map((item) => {

                const Icon = item.icon;

                return (

                  <motion.div
                    key={item.title}
                    whileHover={{ x: 8 }}
                    className="flex gap-5"
                  >

                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
                    >
                      <Icon size={24} />
                    </div>

                    <div>

                      <h3 className="font-bold text-xl text-slate-900">

                        {item.title}

                      </h3>

                      <p className="text-gray-500 mt-2">

                        {item.description}

                      </p>

                    </div>

                  </motion.div>

                );

              })}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}