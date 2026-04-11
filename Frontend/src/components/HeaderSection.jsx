import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const HeaderSection = () => (
  <header className="relative text-center mb-8">
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={0}
    >
      Bine ai venit la MusicDNA: recomandările tale muzicale personalizate cu AI
    </motion.h1>
    <motion.p
      className="text-xl sm:text-2xl"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={1}
    >
      Descoperă playlisturi și melodii personalizate, create special pentru tine
      cu ajutorul algoritmilor AI avansați.
    </motion.p>
  </header>
);

export default HeaderSection;
