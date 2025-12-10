import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Phone } from "lucide-react";
import pactBg from "/pact.png";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | IMPACT 2026 College Cultural Fest</title>
        <meta
          name="description"
          content="Faculty and student coordinators of IMPACT 2026. Reach out for event-related queries."
        />
      </Helmet>

      {/* ================= BG WRAPPER ================= */}
      <div className="relative min-h-screen text-foreground">
        {/* ✅ BACKGROUND IMAGE */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url(${pactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55)",
          }}
        />

        <Navbar />

        <main className="pt-28 pb-28">
          <div className="container mx-auto px-4 max-w-5xl">

            {/* ================= HEADER ================= */}
            <div className="text-center mb-24">
              <h1 className="font-samarkan text-6xl md:text-7xl text-yellow-400 mb-6 drop-shadow-lg">
                Contact Us
              </h1>
              <p className="font-['Poppins'] text-lg text-foreground/80 max-w-2xl mx-auto">
                For any queries related to events, coordination, or participation,
                feel free to reach out to the contacts below.
              </p>
            </div>

            {/* ================= FACULTY ================= */}
            <section className="mb-24">
              <h2 className="font-['Rye'] text-3xl tracking-wide mb-10 text-yellow-300">
                Faculty Coordinators
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { name: "Prof. Sanghamitra Poddar", phone: "+919433310775" },
                  { name: "Prof. Nayantara Mitra" },
                  { name: "Prof. Sanhita Ghosh" },
                  { name: "Prof. Ajanta Ghosh" },
                  { name: "Prof. Royel Ganguly" },
                  { name: "Prof. Sohini Dutta" },
                ].map((faculty, i) => (
                  <div
                    key={i}
                    className="
                      rounded-2xl
                      border border-yellow-400/30
                      bg-black/40 backdrop-blur-md
                      px-6 py-5
                      shadow-lg
                    "
                  >
                    <p className="font-['Rye'] text-lg font-semibold text-yellow-100">
                      {faculty.name}
                    </p>

                    {faculty.phone && (
                      <a
                        href={`tel:${faculty.phone}`}
                        className="mt-3 inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 font-['Poppins'] transition-colors"
                      >
                        <Phone size={16} />
                        {faculty.phone.replace("+91", "+91 ")}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ================= STUDENT ================= */}
            <section>
              <h2 className="font-['Rye'] text-3xl tracking-wide mb-10 text-yellow-300">
                Student Coordinators
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    name: "Priyanshu Pathak",
                    role: "Cultural Secretary",
                    phone: "+919609569944",
                  },
                  {
                    name: "Bratyabandhu Bhattacharyya",
                    role: "Cultural Secretary",
                    phone: "+918240005041",
                  },
                ].map((student, i) => (
                  <div
                    key={i}
                    className="
                      rounded-2xl
                      border border-yellow-400/30
                      bg-black/40 backdrop-blur-md
                      px-6 py-5
                      shadow-lg
                    "
                  >
                    <p className="font-['Rye'] text-lg font-semibold text-yellow-100">
                      {student.name}
                    </p>
                    <p className="font-['Poppins'] text-foreground/80">
                      ({student.role})
                    </p>

                    <a
                      href={`tel:${student.phone}`}
                      className="mt-3 inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 font-['Poppins'] transition-colors"
                    >
                      <Phone size={16} />
                      {student.phone.replace("+91", "+91 ")}
                    </a>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
