import { motion } from "framer-motion";

const playlists = [
  {
    src: "/img1.png",
    title: "Vibe-uri chill",
    description:
      "Relaxează-te cu piese line și calme, perfecte pentru momentele tale de pauză.",
  },
  {
    src: "/img2.jpg",
    title: "Boost pentru antrenament",
    description:
      "Melodii energice care te motivează în timpul antrenamentelor.",
  },
  {
    src: "/img3.jpg",
    title: "Groove de noapte",
    description: "Beat-uri perfecte pentru relaxare și seri târzii.",
  },
];

const SamplePlaylists = () => (
  <section className="text-center mt-12">
    <motion.h2
      className="text-3xl sm:text-4xl font-semibold mb-6"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      custom={10}
    >
      Playlisturi și melodii exemplu
    </motion.h2>

    <p className="text-lg sm:text-xl text-gray-300 mb-6">
      Explorează câteva exemple de playlisturi și melodii recomandate de
      MusicDNA.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((item, index) => (
        <motion.div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="rounded-lg w-full h-64 object-cover"
          />
          <h3 className="text-xl font-bold mt-4">{item.title}</h3>
          <p className="text-gray-300">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SamplePlaylists;
