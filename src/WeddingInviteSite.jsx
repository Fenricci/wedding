import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeddingCalendar from "./WeddingCalendar";
import { ReactComponent as LetterIcon } from "./assets/letter_az1tgt43mo6z.svg";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TapHint() {
  return (
    <div className="relative flex flex-col items-center justify-center mt-6">
      {/* Пульсирующий круг на пальце */}
      <motion.div
        className="absolute -top-1 left-[42px] -translate-x-3.5 w-5 h-5 rounded-full border-2 border-blue-950"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Твоя SVG иконка */}
      <img
        src={process.env.PUBLIC_URL + "/icons/hand.svg"}
        alt="Tap here"
        className="w-14 h-14 relative z-10"
      />

      {/* Текст-подсказка */}
      <div className="mt-3 text-gray-700 text-sm">Коснитесь экрана</div>
    </div>
  );
}

export default function WeddingInviteSite() {
  // ====== CONFIG (edit to your real data) ======
  const COUPLE = "Вюсал и Лилия";
  const [showIntro, setShowIntro] = useState(true);
  const DATE_ISO = "2025-09-25T16:00:00+03:00";
  const ADDRESS = "Солнечная улица 11, Новосибирск";
  const VIDEO_SRC = process.env.PUBLIC_URL + "/603605_Wedding_Person.mp4";
  const VIDEO_POSTER = "/poster.jpg";
  const query = useQuery();
  const guest = query.get("guest") || "гость"; // если имя не передано
  const family = query.get("family"); // "1" или null
  const male = query.get("male");
  const dearWord = male === "1" ? "Дорогая" : "Дорогой";

  const targetTs = useMemo(() => new Date(DATE_ISO).getTime(), [DATE_ISO]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetTs));
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowScrollHint(false);
    } else {
      setShowScrollHint(true);
    }
  };

  // сразу вызвать при монтировании
  handleScroll();

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetTs)), 1000);
    return () => clearInterval(id);
  }, [targetTs]);

  useEffect(() => {
  if (showIntro) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";   // фиксируем высоту
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";        // возвращаем как было
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}, [showIntro]);

  return (
      <div className="min-h-screen text-gray-900 bg-white">
        {/* Intro экран поверх всего */}
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fdf6ee] text-center p-6 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => setShowIntro(false)}
        >
          <div className="font-calendar text-5xl mb-6">Приглашение на свадьбу</div>
          <LetterIcon className="w-[130px] h-[130px] mx-auto mb-6" />
          <div className="text-sm text-gray-700">Для просмотра коснитесь экрана</div>
          <TapHint />
        </motion.div>
      )}
    </AnimatePresence>
        {/* NAV */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-black/5">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-serif tracking-wide">Свадьба • {COUPLE}</div>
            <div className="hidden sm:flex gap-2 text-sm">
              <a href="#details" className="px-2 py-1 rounded hover:bg-black/5">Инфо</a>
              <a href="#calendar" className="px-2 py-1 rounded hover:bg-black/5">Календарь</a>
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
              loop
              muted
              playsInline
              preload="auto"
              poster={VIDEO_POSTER}
              webkit-playsinline="true"
              x5-playsinline="true"
          >
            <source src={VIDEO_SRC} type="video/mp4"/>
          </video>

          {/* тёмный слой для читаемости */}
          <div className="absolute inset-0 bg-black/40"/>

          {/* Контент справа (на мобиле центр) */}
          <div className="relative z-10 h-full">
            <div className="max-w-6xl mx-auto h-full flex items-center justify-center md:justify-end px-6 md:px-10">
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1.1, ease: 'easeOut'}}
                  className="text-white text-center md:text-right select-none"
              >
                {/* Имена — как в примере */}
                <div className="leading-[0.9] drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
                  <div className="font-calendar text-[64px] sm:text-[84px] md:text-[112px]">Вюсал</div>
                  <div className="font-calendar text-[36px] sm:text-[44px] md:text-[56px] -mt-1 sm:-mt-1 opacity-90">и
                  </div>
                  <div className="font-calendar text-[64px] sm:text-[84px] md:text-[112px] md:mr-8">Лилия</div>
                </div>

                {/* Тонкая линия */}
                <div className="h-px bg-white/70 w-44 sm:w-56 md:w-64 md:ml-auto md:mr-8 my-6 mx-auto"/>

                {/* Дата с широким кернингом как на скрине */}
                <p className="font-serif text-base sm:text-xl md:text-2xl tracking-[.35em] md:mr-8">
                  {formatDateForHero(DATE_ISO)}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Стрелка вниз (как было) */}
          <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
              onClick={() =>
                  window.scrollTo({top: window.innerHeight, behavior: "smooth"})
              }
              initial={{opacity: 1}}
              animate={{opacity: showScrollHint ? 1 : 0}}
              transition={{duration: 0.6}}
          >
            {/* Мигающий текст */}
            <motion.p
                className="text-white text-center text-sm mb-2"
                animate={{opacity: [1, 0.4, 1]}}
                transition={{duration: 1.5, repeat: Infinity}}
            >
              Прокрутите страницу вниз
            </motion.p>

            {/* Стрелка вниз */}
            <svg
                className="w-10 h-10 text-white animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </motion.div>
        </section>


        {/* Второй экран с картинкой, текстом и фоном */}
        <section
            className="relative grid md:grid-cols-2 gap-8 items-center px-8 py-10 w-full min-h-[60vh] md:min-h-[80vh] bg-cover bg-center"
            style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/marble.jpg"})`}}
        >
          {/* Текст */}
          <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 1}}
              viewport={{once: true}}
              className="relative z-10"
          >
            <h2 className="font-title text-center text-6xl mb-6">Этот момент настал!</h2>
            <p className="text-base text-center text-gray-700 leading-relaxed border-t pt-4">
              <span className="font-bold">{dearWord} {guest}!</span>
              </p>
            <p className="text-base text-gray-700 leading-relaxed pt-4">
                <span className="font-bold">
                 С радостью приглашаем Вас{family === "1" ? " с семьей" : ""} присоединиться к торжественному моменту создания нашей семьи и
                украсить его своим присутствием!
                <br/>
                Мы будем счастливы видеть Вас рядом в этот важный для нас день!
                  </span>
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
                src={process.env.PUBLIC_URL + "/IMG_3664.jpg"}
                alt="wedding"
                className="rounded-2xl shadow-lg w-[250px] mx-auto md:w-[400px]"
            />
          </motion.div>
        </section>

        {/* Календарь */}
        <section id="calendar" className="py-16 sm:py-20 px-4 bg-[#e8e6e6] text-white">
          <WeddingCalendar/>
        </section>

        {/* ЛОКАЦИЯ */}
        <section id="location" className="py-20 px-4 bg-[#f5f5f5]">
          <div className="max-w-5xl mx-auto text-center">
            {/* Заголовок */}
            <h2 className="font-title text-6xl mb-4 flex items-center justify-center">
              <span className="w-16 border-t border-gray-400 mx-4"></span>
              Локация
              <span className="w-16 border-t border-gray-400 mx-4"></span>
            </h2>

            {/* Текст */}
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Наша свадьба пройдет в <b>Банкетный зал "Шамирам"</b><br />
              {ADDRESS}
            </p>

            {/* Фото места */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <img
                src={process.env.PUBLIC_URL + "/locations.png"}
                alt="Локация свадьбы"
                className="w-full object-cover"
              />
            </div>

            {/* Сбор гостей + кнопка */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <p className="text-lg font-medium">
                Сбор гостей <span className="font-bold">16:00</span>
              </p>
              <button
                onClick={() =>
                  document.getElementById("map")?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-gray-600 px-6 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Как добраться
              </button>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="details" className="py-16 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Заголовок */}
            <h2 className="font-title text-6xl mb-10 text-center flex items-center justify-center">
              <span className="w-16 border-t border-black mx-4"></span>
              Тайминг
              <span className="w-16 border-t border-black mx-4"></span>
            </h2>

            {/* Timeline wrapper */}
            <div className="relative">

              {/* Горизонтальная линия (desktop) */}
              <div className="hidden sm:block absolute top-1/2 left-0 w-full border-t border-gray-300"></div>
              {/* Вертикальная линия (mobile) */}
              <div className="sm:hidden absolute left-8 top-0 h-full border-l border-gray-300"></div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start relative">
                {/* Item */}
                <div className="flex sm:flex-col items-center sm:items-center mb-10 sm:mb-0 relative sm:text-center">
                  {/* Иконка */}
                  <div
                      className="w-18 h-18 flex items-center justify-center rounded-full bg-white border-gray-400 z-10">
                    <img src={process.env.PUBLIC_URL + "/icons/map.png"} alt="Сбор гостей" className="w-16 h-16"/>
                  </div>
                  {/* Соединительная линия (mobile) */}
                  <div className="sm:hidden absolute left-6 top-12 bottom-0 border-l border-gray-300"></div>
                  {/* Текст */}
                  <div className="ml-16 sm:ml-0 sm:mt-4">
                    <p className="font-bold">17:00</p>
                    <p className="text-gray-600">Сбор гостей</p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex sm:flex-col items-center sm:items-center mb-10 sm:mb-0 relative sm:text-center">
                  <div
                      className="w-18 h-18 flex items-center justify-center rounded-full bg-white border-gray-400 z-10">
                    <img src={process.env.PUBLIC_URL + "/icons/rings.png"} alt="Церемония" className="w-16 h-16"/>
                  </div>
                  <div className="sm:hidden absolute left-6 top-12 bottom-0 border-l border-gray-300"></div>
                  <div className="ml-16 sm:ml-0 sm:mt-4">
                    <p className="font-bold">17:30</p>
                    <p className="text-gray-600">Обмен кольцами</p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex sm:flex-col items-center sm:items-center mb-10 sm:mb-0 relative sm:text-center">
                  <div
                      className="w-18 h-18 flex items-center justify-center rounded-full bg-white border-gray-400 z-10">
                    <img src={process.env.PUBLIC_URL + "/icons/cocktail.png"} alt="Банкет" className="w-16 h-16"/>
                  </div>
                  <div className="sm:hidden absolute left-6 top-12 bottom-0 border-l border-gray-300"></div>
                  <div className="ml-16 sm:ml-0 sm:mt-4">
                    <p className="font-bold">18:00</p>
                    <p className="text-gray-600">Банкет</p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex sm:flex-col items-center sm:items-center relative sm:text-center">
                  <div
                      className="w-18 h-18 flex items-center justify-center rounded-full bg-white border-gray-400 z-10">
                    <img src={process.env.PUBLIC_URL + "/icons/balloons.png"} alt="Завершение" className="w-16 h-16"/>
                  </div>
                  <div className="ml-16 sm:ml-0 sm:mt-4">
                    <p className="font-bold">24:00</p>
                    <p className="text-gray-600">Завершение вечера</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* MAP */}
        <section id="map" className="py-16 sm:py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-title text-6xl mb-6 text-center flex items-center justify-center">
              <span className="w-16 border-t border-black mx-4"></span>
              Как добраться
              <span className="w-16 border-t border-black mx-4"></span>
            </h2>
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
        <section
            id="countdown"
            className="py-12 sm:py-20 px-4 bg-cover bg-center bg-no-repeat"
            style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/countdown_bg.jpg"})`}}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="font-title text-6xl mb-6 text-center flex items-center justify-center">
              <span className="w-16 border-t border-black mx-4"></span>
              До нашей свадьбы осталось
              <span className="w-16 border-t border-black mx-4"></span>
            </h2>

            <div
                className="flex justify-center font-bold gap-2 sm:gap-6 max-w-[260px] sm:max-w-2xl mx-auto scale-75 sm:scale-100"
                role="timer"
                aria-live="polite"
            >
              <TimeGroup label="дней" value={timeLeft.days}/>
              <TimeGroup label="часов" value={timeLeft.hours}/>
              <TimeGroup label="минут" value={timeLeft.minutes}/>
              <TimeGroup label="секунд" value={timeLeft.seconds}/>
            </div>
          </div>
        </section>


        {/* ФИНАЛЬНЫЙ ЭКРАН */}
        <section className="relative h-[70vh] sm:h-screen overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={VIDEO_POSTER}
            webkit-playsinline="true"
            x5-playsinline="true"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          {/* затемнение */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Контент */}
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-wedding mb-2 opacity-90">До скорой встречи!</p>
              <div className="h-px bg-white/70 w-40 mx-auto mb-6"></div>
              <p className="italic font-calendar text-xl mb-4 opacity-90">с любовью,</p>
              <h2 className="font-calendar text-6xl sm:text-6xl md:text-7xl">
                Вюсал и Лилия
              </h2>
            </motion.div>
          </div>
        </section>
      </div>
  );
}

function DigitBox({value}) {
  return (
      <div className="w-12 h-16 sm:w-14 sm:h-20 flex items-center justify-center
      bg-white/70 text-black text-3xl sm:text-4xl font-light rounded-t-2xl
      shadow-md mx-[1px]">
      {value}
    </div>
  );
}

function TimeGroup({ label, value }) {
  const digits = String(value).padStart(2, "0").split("");

  return (
    <div className="flex flex-col items-center mx-2">
      <div className="flex">
        {digits.map((d, i) => (
          <DigitBox key={i} value={d} />
        ))}
      </div>
      <div className="text-sm text-gray-700 mt-2">{label}</div>
    </div>
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

function formatDateForHero(iso) {
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd} / ${mm} / ${yy}`;
  } catch {
    return iso;
  }
}

