import { motion } from "framer-motion";

/* ✅ Updated event data: Using your PNGs */
const events = [
  {
    id: 1,
    title: "Illusion Jam",
    subheading: "Battle of Bands",
    image: "/events/Battle of Bands.png",
  },
  {
    id: 2,
    title: "Stepistan",
    subheading: "Dance Competition",
    image: "/events/Step is tan.png",
  },
  {
    id: 3,
    title: "Halla Bol",
    subheading: "Street Play",
    image: "/events/Halla bol.png",
  },
  {
    id: 4,
    title: "BGMI",
    subheading: "E-Sports Tournament",
    image: "/events/bgmi.png",
  },
  {
    id: 5,
    title: "Step Up",
    subheading: "Western Dance",
    image: "/events/Step up.png",
  },
  {
    id: 6,
    title: "Raagify",
    subheading: "Eastern Music",
    image: "/events/Raagify.png",
  },
];

export function EventsSection() {
  return (
    <section className="w-full pt-10 pb-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.6 }}
            className="
              group relative overflow-hidden rounded-2xl
              bg-black/60
              border border-white/15
              transition-all duration-300
              hover:shadow-[0_0_45px_rgba(255,210,90,0.18)]
              hover:border-yellow-300/70
            "
          >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors z-10" />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 text-center">
              <h3
                className="
                  font-samarkan
                  text-[1.9rem] md:text-[2.1rem]
                  text-white mb-1
                  tracking-wide
                "
              >
                {event.title}
              </h3>

              <p
                className="
                  text-[0.7rem]
                  uppercase tracking-[0.25em]
                  text-white/70
                "
              >
                {event.subheading}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
