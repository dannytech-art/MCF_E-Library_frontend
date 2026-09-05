import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Library,
} from "lucide-react";

import { Button } from "./ui/button";
import HeroBackground from "./HeroBackground";
import students from "../assets/students.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 lg:py-20">

        <div className="grid lg:grid-cols-2 items-center gap-10">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-50 border border-red-100 mb-8">

              <BookOpen
                size={18}
                className="text-red-600"
              />

              <span className="text-red-600 font-semibold text-sm">
                Methodist Campus Fellowship
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-slate-900">

              Access
              <span className="text-red-600">
                {" "}Knowledge
              </span>

              <br />

              Grow in

              <span className="text-blue-900">
                {" "}Faith
              </span>

            </h1>

            {/* Paragraph */}

            <p className="mt-8 text-gray-600 text-lg leading-8 max-w-xl">

              Discover faculty-specific study materials,
              lecture notes, devotionals and Christian
              resources designed to help every Methodist
              Campus Fellowship student excel spiritually
              and academically.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex gap-4 flex-wrap">

              <Link to="/signup">

                <Button
                  size="lg"
                  className="rounded-full px-8 bg-red-600 hover:bg-red-700"
                >
                  Get Started

                  <ArrowRight className="ml-2 h-5 w-5" />

                </Button>

              </Link>

              <Link to="/login">

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  Browse Library
                </Button>

              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>

                <Library className="text-blue-900 mb-3"/>

                <h2 className="font-black text-3xl">
                  500+
                </h2>

                <p className="text-gray-500">
                  Books
                </p>

              </div>

              <div>

                <GraduationCap className="text-red-600 mb-3"/>

                <h2 className="font-black text-3xl">
                  12
                </h2>

                <p className="text-gray-500">
                  Faculties
                </p>

              </div>

              <div>

                <Users className="text-blue-900 mb-3"/>

                <h2 className="font-black text-3xl">
                  1000+
                </h2>

                <p className="text-gray-500">
                  Students
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div

            initial={{ opacity:0,x:50 }}

            animate={{
              opacity:1,
              x:0,
              y:[0,-15,0]
            }}

            transition={{
              duration:.9,
              y:{
                repeat:Infinity,
                duration:5
              }
            }}

            className="relative hidden lg:flex justify-end"

          >

            {/* Glow */}

            <div className="absolute w-[450px] h-[450px] rounded-full bg-blue-100 blur-[120px]"/>

            <img

              src={students}

              className="relative w-[700px] object-contain drop-shadow-2xl"

              alt="Students"

            />

          </motion.div>

        </div>

      </div>

      {/* Scroll */}

      <motion.div

        animate={{
          y:[0,12,0]
        }}

        transition={{
          repeat:Infinity,
          duration:2
        }}

        className="absolute bottom-8 left-1/2 -translate-x-1/2"

      >

        <div className="w-8 h-14 rounded-full border-2 border-gray-400 flex justify-center">

          <div className="w-2 h-2 bg-red-600 rounded-full mt-3"/>

        </div>

      </motion.div>

    </section>
  );
}