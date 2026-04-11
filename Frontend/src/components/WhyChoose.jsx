import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const WhyChoose = () => (
  <section className="text-center mt-12">
    <motion.h2
      className="text-3xl sm:text-4xl font-semibold mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={8}
    >
      De ce să alegi MusicDNA?
    </motion.h2>

    <motion.p
      className="text-lg sm:text-xl max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={9}
    >
      Motorul nostru de recomandări bazat pe AI se adaptează la comportamentul
      tău de ascultare și la gusturile tale în continuă evoluție, oferindu-ți o
      experiență muzicală cu adevărat personalizată. Descoperă melodii ascunse
      și bucură-te de o explorare muzicală fără întreruperi.
    </motion.p>
  </section>
);

export default WhyChoose;
