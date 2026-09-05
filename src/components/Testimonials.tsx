import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Daniel Okafor",
    faculty: "Faculty of Engineering",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "The MCF E-Library has made studying much easier. Everything I need is organized in one place and accessible anytime.",
  },
  {
    name: "Grace Emmanuel",
    faculty: "Faculty of Science",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "I love how the platform combines academic resources with spiritual materials. It has truly helped my growth.",
  },
  {
    name: "John Samuel",
    faculty: "Faculty of Law",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "The interface is beautiful, fast, and very easy to navigate. I can find materials in seconds.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-semibold">
            Testimonials
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            What Students Say
          </h2>

          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Hear from students who use the Methodist Campus Fellowship
            E-Library every day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="relative bg-slate-50 rounded-3xl p-8 shadow-lg border border-gray-100"
            >
              <Quote className="absolute top-6 right-6 text-red-100 w-12 h-12" />

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.faculty}
                  </p>
                </div>

              </div>

              <div className="flex gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 text-gray-600 leading-7">
                "{item.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}