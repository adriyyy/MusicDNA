import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const FeatureGrid = () => {
  const features = [
    "Autentificare cu Google",
    "Playlisturi muzicale personalizate",
    "Recomandări în timp real bazate pe stare",
    "Panou vizual de statistici pentru preferințele tale muzicale",
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center relative z-10">
      {features.map((title, index) => (
        <motion.div
          key={index}
          className="p-6 bg-gray-800 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={index + 4}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300">
            {index === 0
              ? "Autentifică-te în siguranță cu contul tău Google pentru a începe călătoria ta muzicală personalizată."
              : index === 1
                ? "Primești playlisturi create special pentru gustul tău, cu ajutorul AI."
                : index === 2
                  ? "Primești recomandări muzicale în funcție de starea ta și activitatea ta curentă."
                  : "Urmărește stările, artiștii preferați și vizualizează copertile albumelor în panoul tău interactiv de statistici."}
          </p>
        </motion.div>
      ))}
    </section>
  );
};

export default FeatureGrid;
