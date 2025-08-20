import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import WeddingCalendar from "./WeddingCalendar";

/**
 * FIX: The previous file was raw HTML (starting with <!DOCTYPE html>) but the canvas
 * is set to React. The bundler tried to parse it as JS/JSX and blew up at char 0.
 * This is a proper React component with the same UI: hero with video background,
 * info block, map, and countdown. Drop a video file at /public/video.mp4 or change
 * VIDEO_SRC below.
 */

export default function WeddingInviteSite() {
  // ====== CONFIG (edit to your real data) ======
  const COUPLE = "Вюсал и Лиля";
  const DATE_ISO = "2025-09-25T16:00:00+03:00"; // ISO with timezone
  const ADDRESS = "Шамирам, Новосибирск, Солнечная улица 11";
  const VIDEO_SRC = "/603605_Wedding_Person.mp4"; // put file into /public/video.mp4
  const VIDEO_POSTER = "/poster.jpg"; // optional poster image in /public

  const targetTs = useMemo(() => new Date(DATE_ISO).getTime(), [DATE_ISO]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetTs));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetTs)), 1000);
    return () => clearInterval(id);
  }, [targetTs]);

  return (
      <div className="min-h-screen text-gray-900 bg-white">
        {/* NAV */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-black/5">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-serif tracking-wide">Свадьба • {COUPLE}</div>
            <div className="hidden sm:flex gap-2 text-sm">
              <a href="#details" className="px-2 py-1 rounded hover:bg-black/5">Инфо</a>
              <a href="#map" className="px-2 py-1 rounded hover:bg-black/5">Карта</a>
              <a href="#countdown" className="px-2 py-1 rounded hover:bg-black/5">Таймер</a>
            </div>
          </nav>
        </header>

        {/* HERO WITH VIDEO BACKGROUND */}
        <section className="relative h-[90vh] sm:h-screen overflow-hidden" id="top">
          <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={VIDEO_POSTER}
          >
            <source src={VIDEO_SRC} type="video/mp4"/>
            {/* Optional extra formats if you have them:
          <source src="/video.webm" type="video/webm" /> */}
          </video>
          {/* dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30"/>

          <div className="relative z-10 h-full flex items-center justify-center">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1.1, ease: "easeOut"}}
                className="text-center text-white px-6"
            >
              <h1 className="font-wedding text-6xl">{COUPLE}</h1>
              <p className="mt-3 text-lg sm:text-2xl opacity-90">
                {formatHumanDate(DATE_ISO)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Второй экран с картинкой, текстом и фоном */}
        <section
            className="relative grid md:grid-cols-2 gap-8 items-center px-8 py-20 w-full min-h-screen bg-cover bg-center"
            style={{backgroundImage: "url('/marble.jpg')"}} // 👉 твой фон (положи marble.jpg в public/)
        >
          {/* Текст */}
          <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 1}}
              viewport={{once: true}}
              className="relative z-10"
          >
            <h2 className="font-wedding text-5xl mb-6">Этот момент настал!</h2>
            <p className="text-lg text-gray-700 leading-relaxed border-t pt-4">
              Совсем скоро состоится день нашей свадьбы, и мы будем счастливы, если
              Вы разделите с нами этот чудесный день!
            </p>
          </motion.div>

          {/* Картинка */}
          <motion.div
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              transition={{duration: 1}}
              viewport={{once: true}}
              className="relative z-10"
          >
            <img
                src="/IMG_3664.jpg"   // 👉 твоя картинка (клади в public/)
                alt="wedding"
                className="rounded-2xl shadow-lg"
            />
          </motion.div>
        </section>

        {/* 👉 НОВЫЙ КАЛЕНДАРЬ */}
        <WeddingCalendar />

        {/* INFO */}
        <section id="details" className="py-16 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-20%"}}
                transition={{duration: 0.6}}
                className="rounded-2xl border border-black/10 shadow-sm p-6 bg-white"
            >
              <h2 className="font-serif text-2xl mb-2">Информация</h2>
              <p className="text-gray-600"><span className="font-medium">Дата:</span> {formatHumanDate(DATE_ISO)}</p>
              <p className="text-gray-600 mt-1"><span className="font-medium">Адрес:</span> {ADDRESS}</p>
              <p className="text-gray-500 text-sm mt-3">Пожалуйста, заранее дайте знать о присутствии.</p>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-20%"}}
                transition={{duration: 0.6, delay: 0.1}}
                className="rounded-2xl border border-black/10 shadow-sm p-6 bg-white"
            >
              <h2 className="font-serif text-2xl mb-2">Расписание</h2>
              <ul className="text-gray-700 space-y-3">
                <li><b>16:00</b> Сбор гостей</li>
                <li><b>16:30</b> Выездная регистрация</li>
                <li><b>17:00</b> Банкет</li>
                <li><b>22:00</b> Торт и танцы</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* MAP */}
        <section id="map" className="py-16 sm:py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-wedding text-5xl mb-6 text-center">Как добраться</h2>
            <p className="text-gray-600 mb-4">Нажмите на карту, чтобы открыть маршрут.</p>
            <div className="rounded-2xl overflow-hidden border border-black/10 shadow-sm">
              <iframe
                  title="venue-map"
                  src="https://yandex.ru/map-widget/v1/?ll=83.056749%2C55.090969&mode=search&oid=1176120871&ol=biz&z=16.82"
                  width="100%"
                  height="360"
                  frameBorder="0"
                  allowFullScreen
                  style={{position: "relative"}}
              />
            </div>
            <a
                href="https://yandex.ru/maps/org/banketny_zal_shamiram/1176120871/?utm_medium=mapframe&utm_source=maps"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-sm underline"
            >
              Открыть в Яндекс.Картах
            </a>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section id="countdown" className="py-16 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-wedding text-5xl mb-6 text-center">До нашей свадьбы осталось</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="timer" aria-live="polite">
              <TimeBox label="дней" value={timeLeft.days}/>
              <TimeBox label="часов" value={pad2(timeLeft.hours)}/>
              <TimeBox label="минут" value={pad2(timeLeft.minutes)}/>
              <TimeBox label="секунд" value={pad2(timeLeft.seconds)}/>
            </div>
          </div>
        </section>

        <footer className="py-12 text-center text-gray-500">С любовью, {COUPLE}</footer>
      </div>
  );
}

function TimeBox({label, value}) {
  return (
      <motion.div
          initial={{opacity: 0, y: 10}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.4}}
          className="bg-white border border-black/10 rounded-2xl p-5 text-center shadow-sm"
      >
        <div className="text-3xl font-semibold font-mono">{value}</div>
        <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{label}</div>
      </motion.div>
  );
}

// ===== utils =====
function getTimeLeft(targetTs) {
  const now = Date.now();
  let diff = Math.max(0, targetTs - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatHumanDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
