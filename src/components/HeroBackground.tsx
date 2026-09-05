import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* White Base */}

      <div className="absolute inset-0 bg-white" />

      {/* Blue Gradient */}

      <div className="absolute -top-32 right-[-150px] w-[700px] h-[700px] rounded-full bg-blue-100 blur-[120px]" />

      {/* Red Gradient */}

      <div className="absolute bottom-[-180px] left-[-120px] w-[500px] h-[500px] rounded-full bg-red-100 blur-[120px]" />

      {/* Large Navy Wave */}

      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          fill="#0B1F4D"
          fillOpacity=".08"
          d="M0,288L60,266.7C120,245,240,203,360,202.7C480,203,600,245,720,245.3C840,245,960,203,1080,197.3C1200,192,1320,224,1380,240L1440,256L1440,400L0,400Z"
        />
      </svg>

      {/* Red Wave */}

      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#DC2626"
          fillOpacity=".08"
          d="M0,160L60,181.3C120,203,240,245,360,245.3C480,245,600,203,720,181.3C840,160,960,160,1080,176C1200,192,1320,224,1380,240L1440,256L1440,320L0,320Z"
        />
      </svg>

      {/* Dot Pattern */}

      <div className="absolute top-24 left-24 grid grid-cols-6 gap-3 opacity-30">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-900"
          />
        ))}
      </div>

      {/* Right Dot Pattern */}

      <div className="absolute bottom-24 right-32 grid grid-cols-5 gap-3 opacity-20">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-red-600"
          />
        ))}
      </div>

      {/* Floating Circle */}

      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute top-36 right-52 w-20 h-20 rounded-full bg-red-200/40 backdrop-blur-xl"
      />

      {/* Floating Circle */}

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute bottom-44 left-60 w-16 h-16 rounded-full bg-blue-200/40 backdrop-blur-xl"
      />

      {/* Big Outline Circle */}

      <div className="absolute top-44 right-24 w-80 h-80 border border-blue-200 rounded-full opacity-30" />

      {/* Small Outline */}

      <div className="absolute bottom-16 left-24 w-44 h-44 border border-red-200 rounded-full opacity-30" />

    </div>
  );
}