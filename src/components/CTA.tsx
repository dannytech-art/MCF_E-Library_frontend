import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28 bg-slate-900">

      {/* Background Blur */}

      <div className="absolute -top-32 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 lg:p-20 text-center"
        >

          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full text-white">

            <BookOpen className="text-red-500" />

            <span className="font-semibold">
              Methodist Campus Fellowship
            </span>

          </div>

          <h2 className="mt-8 text-5xl lg:text-6xl font-black text-white leading-tight">

            Start Your Academic
            <br />

            <span className="text-red-500">
              Journey Today
            </span>

          </h2>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto leading-8">

            Join hundreds of Methodist Campus Fellowship students already
            accessing lecture notes, study materials, devotionals, and
            faculty resources from one beautiful digital library.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link to="/signup">

              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 rounded-full px-10"
              >
                Create Free Account

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </Link>

            <Link to="/login">

              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 border-white text-black hover:bg-white hover:text-slate-900"
              >
                Login

              </Button>

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}