import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const HowItWorks = () => (
  <section className="text-center mb-12">
    <motion.h2
      className="text-3xl sm:text-4xl font-semibold mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={2}
    >
      Cum funcționează?
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={3}
    >
      MusicDNA analizează obiceiurile tale de ascultare și preferințele muzicale
      folosind modele AI pentru a-ți recomanda melodii și playlisturi pe placul
      tău. Sistemul învață continuu din feedback-ul tău pentru a îmbunătăți
      recomandările.
    </motion.p>
  </section>
);

export default HowItWorks;
