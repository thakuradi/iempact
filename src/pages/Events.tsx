"use client";

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import pactBg from "/pact.png";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Ticket, ArrowRight } from "lucide-react";

type EventType = {
  title: string;
  desc: string;
  image: string;
  rules: string;
};

export default function Events() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const toggleCard = (key: string) =>
    setActiveCard(activeCard === key ? null : key);

  return (
    <>
      <Helmet>
        <title>Events | IEMPACT 2026</title>
      </Helmet>

      <div className="relative min-h-screen overflow-x-hidden text-yellow-200">
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url(${pactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
          }}
        />

        <Navbar />

        <main className="container mx-auto px-4 pt-28 pb-32">
          <h1 className="font-['Rye'] text-7xl text-center mt-24 mb-12 text-yellow-300">
            ALL EVENTS
          </h1>

{/* ================= MUSIC ================= */}
<EventSection title="Music" activeCard={activeCard} toggleCard={toggleCard} events={[
{
title:"Westwood",
desc:"Western Solo Singing",
image:"/events/Westwood.png",
rules:`Solo performance (1 singer)

College ID mandatory

One accompanist allowed OR self-instrument (not both)

Instruments: Guitar / Percussion / Beatbox

Time limit: 4 mins (3 + 1 buffer)

Karaoke (if any):

Email + pen drive required

Must be mailed 5 days prior

No lyrics display allowed

2 rounds: Prelims + Finals

Judging: Singing skill, uniqueness, stage presence, soundcheck

Max slots: 18 → Finals: 8

All instruments to be brought by participant`
},
{
title:"Raagify",
desc:"Eastern Music",
image:"/events/Raagify.png",
rules:`Solo eastern vocal

College ID mandatory

One accompanist allowed OR self-instrument

Instruments: Guitar / Percussion / Beatbox

Time limit: 4 mins (3 + 1)

Backing track / e-Tanpura / e-Tabla allowed

Songs allowed:

Indian classical

Semi-classical

Folk

Rabindra Sangeet

Bengali Adhunik

❌ Bollywood & Western songs not allowed

Karaoke (if any): mail 5 days prior

2 rounds: Prelims + Finals

Judging: Singing skill, uniqueness, stage presence

Max slots: 18 → Finals: 8`
},
{
title:"Illusion Jam",
desc:"Battle of Bands",
image:"/events/Battle of Bands.png",
rules:`Team size: 4–7 members

Cross-college teams allowed

College ID mandatory

Time limit: 12 mins (8 + 4)

Live instruments only

❌ No backing tracks / no laptop / no MIDI

2 rounds: Prelims + Finals

Negative marking if time exceeded

Original compositions allowed (lyrics to judges beforehand)

Language: Any

Drum kit provided (5-piece)

Double pedal to be brought by band

Disqualification for:

Vulgarity

Obscenity

Misconduct

Max slots: 15 → Finals: 8 teams`
},
{
title:"Instrumental Echoes",
desc:"Battle of Instruments",
image:"/events/Instrumental echoes.png",
rules:`Solo instrumental performance

College ID mandatory

Time limit: 5 mins (4 + 1)

Eastern & Western instruments allowed

Multi-instrumentalist allowed

Backing track / Metronome / e-Tanpura / e-Tabla allowed
(No instrumental or vocal stems)

Backing track mail 5 days prior

2 rounds: Prelims + Finals

Judging:

Rhythm / Taal

Raga / composition

Overall impression

Drum kit provided (5-piece)

Max slots: 15 → Finals: 8`
},
{
title:"Voxbox",
desc:"Beatbox Battle",
image:"/events/VOXBOX.png",
rules:`Solo beatboxers only

Elimination battles

Rounds:

Eliminations: 60 sec

Top 8 → Top 4: 60 sec

Finals: 2 rounds × 90 sec

Entirely vocal sounds only

Judges’ rules may change on spot

Direct knockout format`
},
]} />

{/* ================= DANCE ================= */}
<EventSection title="Dance" activeCard={activeCard} toggleCard={toggleCard} events={[
{
title:"Eastern Euphoria",
desc:"Eastern Dance",
image:"/events/Eastern euphoria.png",
rules:`Categories: Solo / Duet / Group

Time limits (Empty stage to empty stage):

Solo: 3 + 1

Duet: 4 + 1

Group: 6 + 2

Group theme mandatory:
“Mela: A Tapestry of Tales”

Group size: 6–10

Minimum 5 dancers on stage at all times

Tracks (MP3):

Email 3 days prior

Backup pen drive required

❌ No item numbers

❌ No abir/gulaal

Props allowed (extra marks)

Vulgarity = direct disqualification

Max qualifiers:

Solo: 10

Duet: 8

Group: 5

Judges’ decision final`
},
{
title:"Step Up",
desc:"Western Dance",
image:"/events/Step up.png",
rules:`Categories: Solo / Duet / Group

Time limit:

Solo: 3 + 1

Duet: 3 + 1

Group: 6 + 1

Group size: 6–12

Minimum 6 dancers on stage

Tracks to be mailed 2–3 days prior

Props list must be mailed beforehand

Contestants arrange own props & costumes

❌ Vulgar acts / revealing outfits prohibited

Finals rules may change

Max slots:

Solo: 20

Duet: 20

Group: 15

Finals: 5 solo, 5 duet, 5 group`
},
{
title:"Street Dance Battle",
desc:"Freestyle Battle",
image:"/events/Step is tan.png",
rules:`Solo dancers only

Knockout / 1v1 battle format

Prelims: 40 sec

Battles: 60 sec

Tie-breaker: 30–40 sec

Music by official DJ only

Judging:

Musicality

Technique

Originality

Execution

Battle presence

❌ No physical contact

❌ No vulgar gestures

Disqualification for misconduct/late reporting

Max slots: 32`
},
]} />

{/* ================= DRAMA ================= */}
<EventSection title="Drama & Theatre" activeCard={activeCard} toggleCard={toggleCard} events={[
{
title:"Shrutirawngo",
desc:"Audio Drama",
image:"/events/AAudio Drama.png",
rules:`Team size: Max 8 (6 performers + 2 technical)

Time limit: 8 + 2 mins

Language: Bengali / Hindi

Voice-only performance (no physical acting)

Backing audio:

Mail before event

Bring pen drive backup

Script can be original or adapted (credits needed)

Sound check: 5 mins

Judging:

Script

Voice acting

Sound & music

Time accuracy

Vulgarity / political comments → disqualification

Max slots: 10`
},
{
title:"Halla Bol",
desc:"Street Play",
image:"/events/Halla bol.png",
rules:`Team size: Max 20

Time limit: 12 + 3 mins

Language: Bengali / Hindi

Theme: Open

❌ Cross-college teams NOT allowed

One team per college

Only live music

Open-air performance

❌ Fire / smoke / liquids prohibited

Props must be cleared within time

Vulgar content = disqualification

Max slots: 8`
},

]} />

{/* ================= GAMES & SPORTS ================= */}
<EventSection title="Games" activeCard={activeCard} toggleCard={toggleCard} events={[
{
title:"Futsal",
desc:"3v3 Football",
image:"/events/futsal.png",
rules:`Team: 3 + 2 substitutes

Foot throw-ins

No spikes allowed

Jerseys not provided

Draw → penalties + sudden death

Reporting late → disqualification

Max slots: 48`
},
{
title:"IEM Panja Arena",
desc:"Arm Wrestling",
image:"/events/arm wrestling.png",
rules:`Weight categories:

<60 | <70 | <80 | 80+

Match: Best of 3 rounds

Knockout format

Weigh-in on same day

Fouls → round loss

Safety mandatory

Max slots: 100`
},
{
title:"Quizzard",
desc:"Quiz Competition",
image:"/events/quiz.png",
rules:`Team: Solo or Duo

Prelims: 20 questions

Star questions decide tie

Top 6 teams → Finals

No unfair means

Quizmaster’s decision final`
},
{
title:"Mind Over Moves",
desc:"Chess",
image:"/events/Chess.png",
rules:`1 male + 1 female

Knockout format

OTSE allowed

Max slots:

Male: 64

Female: 32`
},
{
title:"Table Tennis",
desc:"Table Tennis",
image:"/events/Table tennis.png",
rules:`1 male + 1 female

Knockout format

OTSE allowed

Same slot limits as Chess`
},
{
title:"BGMI",
desc:"Battle Royale",
image:"/events/bgmi.png",
rules:`Squad only

All 4 players must record POV (mic ON)

Level 40+ ID only

❌ Emulators / iPad not allowed

Missed matches = disqualification

Strict slot & timing rules

No POV = no prize / ban possible`
},
{
title:"Free Fire",
desc:"Clash Squad",
image:"/events/freefire.png",
rules:`Mode: Clash Squad (4v4)

Best of 13 rounds

No skills / no grenades

Mobile only

No hacks / toxicity

Referee decision final`
},
{
title:"E-Football",
desc:"Virtual Football",
image:"/events/e football.png",
rules:`Online qualifiers, offline knockouts

Match time:

Qualifiers: 7 min

Knockout: 9 min

Dream team only

Sportsmanship mandatory

Toxicity = disqualification`
},
{
title:"8 Ball Pool",
desc:"Cue Sports",
image:"/events/8 ball pool.png",
rules:`1v1 online

Call-pocket rule

Fouls = ball in hand

Early 8-ball = loss

Stable internet required

Referee decision final`
},
]} />

{/* ================= PHOTOGRAPHY & MEDIA ================= */}
<EventSection title="Fusion" activeCard={activeCard} toggleCard={toggleCard} events={[
{
title:"Vision Alchemy",
desc:"Photography",
image:"/events/vision alchemy.png",
rules:`Not theme-based

Mobile / DSLR allowed

Images from fest venue only (2 days)

Aspect ratio 16:9

No watermark

Submit 2 best photos/day

Caption required

Max entries: 200`
},
{
title:"Stand-Up Comedy",
desc:"Solo Comedy",
image:"/events/stand up comedy.png",
rules:`• Solo performer
• Time: 3 + 1
• Original content
• No obscene jokes`
},
{
title:"Reel-O-Mania",
desc:"Reel Making",
image:"/events/reel o mania.png",
rules:`Solo participant

Reel length: 30–60 sec

Vertical (9:16) preferred

Only original content

Min 2 reels

Tags provided on spot

Languages: EN / HI / BN`
},

]} />


{/* ================= CTA ================= */}
<section className="mt-40 flex flex-col items-center gap-10 text-center">


  <div className="flex flex-col sm:flex-row gap-8">
    <Link
      to="/auth"
      className="relative group flex items-center gap-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-amber-950 px-8 py-4 font-black text-sm font-['Rye'] uppercase tracking-wider border-2 border-amber-700 shadow-[0_5px_0_#b45309]"
      style={{ clipPath:"polygon(16px 0,100% 0,100% 100%,16px 100%,0 50%)" }}
    >
      <Ticket size={18} />
      Register Now
      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
    </Link>

    <a
      href="/IEMPACT_2026_Brochure.pdf"
      download
      className="relative group flex items-center gap-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-amber-950 px-8 py-4 font-black text-sm font-['Rye'] uppercase tracking-wider border-2 border-amber-700 shadow-[0_5px_0_#b45309]"
      style={{ clipPath:"polygon(16px 0,100% 0,100% 100%,16px 100%,0 50%)" }}
    >
      Download Brochure
      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
    </a>
  </div>
</section>

        </main>

        <Footer />

        <style>{`
          .flip-card { perspective: 1400px; }
          .flip-inner { transform-style: preserve-3d; transition: transform .85s ease; }
          .flip-hover:hover .flip-inner,
          .flip-active { transform: rotateY(180deg); }
          .flip-front,.flip-back {
            backface-visibility: hidden;
            border-radius: 1.25rem;
            overflow: hidden;
          }
          .flip-back {
            position: absolute;
            inset: 0;
            transform: rotateY(180deg);
            overflow-y: auto;
          }
        `}</style>
      </div>
    </>
  );
}

/* ================= SECTION ================= */

function EventSection({
  title,
  events,
  activeCard,
  toggleCard,
}: {
  title: string;
  events: EventType[];
  activeCard: string | null;
  toggleCard: (k: string) => void;
}) {
  return (
    <section className="mb-32">
      <h2 className="font-samarkan text-6xl text-center mb-16 text-yellow-300">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {events.map((e) => (
          <div key={e.title} className="flip-card flip-hover cursor-pointer" onClick={() => toggleCard(e.title)}>
            <div className={`flip-inner ${activeCard === e.title ? "flip-active" : ""}`}>
              <div className="flip-front bg-[#8b3a2f]">
                <div className="aspect-[4/3] bg-black">
                  <img src={e.image} alt={e.title} className="w-full h-full object-contain" />
                </div>
                <div className="border-t border-yellow-300/40 py-3 text-center">
                  <h3 className="text-xl font-semibold text-[#fde68a]">{e.title}</h3>
                  <p className="text-sm text-[#facc74]">{e.desc}</p>
                </div>
              </div>

              <div className="flip-back bg-gradient-to-br from-yellow-100 to-amber-200 p-6 text-sm text-[#7c2d12] whitespace-pre-line">
                {e.rules}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}