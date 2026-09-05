import { motion } from "framer-motion";
import {
  UserPlus,
  GraduationCap,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up using your name, email, password, and select your faculty to get started.",
    icon: UserPlus,
    color: "bg-red-600",
  },
  {
    number: "02",
    title: "Choose Your Faculty",
    description:
      "You'll be directed to your faculty dashboard where all relevant study materials are organized.",
    icon: GraduationCap,
    color: "bg-blue-900",
  },
  {
    number: "03",
    title: "Start Reading",
    description:
      "Read books, lecture notes, devotionals, and past questions directly inside the website.",
    icon: BookOpen,
    color: "bg-red-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-sm font-semibold">
            How It Works
          </span>

          <h2 className="text-5xl font-black mt-6 text-slate-900">
            Start Learning in
            <span className="text-red-600"> Three Easy Steps</span>
          </h2>

          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Getting started with the MCF E-Library takes less than two minutes.
          </p>
        </motion.div>

        {/* Steps */}

        <div className="grid lg:grid-cols-3 gap-10 mt-20 relative">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .2 }}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-3xl shadow-xl p-10"
              >

                {/* Number */}

                <div className="absolute top-6 right-6 text-6xl font-black text-gray-100">
                  {step.number}
                </div>

                {/* Icon */}

                <div
                  className={`w-20 h-20 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-gray-500 leading-7">
                  {step.description}
                </p>

                <button className="mt-8 flex items-center gap-2 text-red-600 font-semibold">
                  Learn More
                  <ArrowRight size={18} />
                </button>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}