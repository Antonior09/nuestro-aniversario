"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lobster } from "next/font/google";
import { Tangerine } from "next/font/google";
import { Niconne } from "next/font/google";

const lobster = Lobster({
    subsets: ["latin"],
    weight: "400",
});

const tangerine = Tangerine({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal"],
});

const niconne = Niconne({
    subsets: ["latin"],
    weight: "400",
});


export default function Home() {
    const [leerMas, setLeerMas] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const pathname = usePathname();

    // Reproducir o pausar con un clic
    const toggleMusic = () => {
        if (clickTimer.current) {
            clearTimeout(clickTimer.current);
        }

        clickTimer.current = setTimeout(async () => {
            const audio = audioRef.current;
            if (!audio) return;

            if (audio.paused) {
                try {
                    await audio.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.error("No se pudo reproducir la música:", error);
                    setIsPlaying(false);
                }
            } else {
                audio.pause();
                setIsPlaying(false);
            }

            clickTimer.current = null;
        }, 250);
    };

    // Reiniciar la canción con doble clic
    const restartMusic = async () => {
        if (clickTimer.current) {
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
        }

        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = 0;

        try {
            await audio.play();
            setIsPlaying(true);
        } catch (error) {
            console.error("No se pudo reiniciar la música:", error);
            setIsPlaying(false);
        }
    };

    // Detener la música al cambiar de página o salir de esta página
    useEffect(() => {
        const audio = audioRef.current;

        return () => {
            if (clickTimer.current) {
                clearTimeout(clickTimer.current);
                clickTimer.current = null;
            }

            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [pathname]);

    // Detener la música inmediatamente al pulsar una tarjeta
    const stopMusic = () => {
        if (clickTimer.current) {
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
        }

        const audio = audioRef.current;

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        setIsPlaying(false);
    };

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

            {/* =========================
          NAVBAR
      ========================== */}
            <nav className="fixed top-0 z-50 flex h-16 w-full items-center bg-gradient-to-b from-black/90 to-transparent px-4 sm:px-6 md:px-12">

                {/* Logo Netflix */}
                <div className="flex shrink-0 items-center">
                    <img
                        src="/Netflix_Logo_PMS.png"
                        alt="Netflix"
                        className="h-16 w-auto sm:h-20"
                    />
                </div>

                {/* Menú */}
                <div className="ml-6 hidden items-center gap-5 text-sm text-gray-300 md:ml-10 md:flex md:gap-6">
                    <span className="cursor-pointer text-white">
                        Inicio
                    </span>

                    <span className="cursor-pointer hover:text-white">
                        Nuestra historia
                    </span>

                    <span className="cursor-pointer hover:text-white">
                        Momentos
                    </span>

                    <span className="cursor-pointer hover:text-white">
                        Mi lista
                    </span>
                </div>

                {/* Iconos */}
                <div className="ml-auto flex items-center gap-3 sm:gap-5">
                    <span className="cursor-pointer text-lg sm:text-xl">
                        🔍
                    </span>

                    <span className="cursor-pointer text-lg sm:text-xl">
                        🖤
                    </span>
                </div>
            </nav>


            {/* =========================
          HERO
      ========================== */}
            <section className="relative flex min-h-[800px] items-center overflow-hidden sm:min-h-[750px] lg:min-h-[700px]">

                {/* Imagen / Fondo principal */}
                {/* =========================
            IMAGEN PRINCIPAL
           ========================== */}
                <div className=" absolute inset-0 -left-[50%] right-0 md:inset-0">
                    <img
                        src="/imagen13.jpeg"
                        alt="Nuestra historia"
                        className="
                         h-full w-full object-cover

                         scale-100
                         translate-x-[30%]
                         translate-y-[-30%]
                         object-[65%_40%]

                         md:scale-100
                         md:translate-x-[30%]
                         md:translate-y-[0%]
                         md:object-[50%_50%]
                        "
                    />

                    {/* Degradado oscuro desde la izquierda */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent
                    md:bg-gradient-to-r
                    md:from-black
                    md:via-black/100
                    md:to-transparent" />

                    {/* Degradado inferior */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/90  to-transparent

                     md:bg-gradient-to-t
                     md:from-[#070707]
                     md:via-black/50
                     md:to-transparent
                     "
                    />
                </div>


                {/* =========================
            CONTENIDO HERO
        ========================== */}
                <div className="relative z-10 w-full max-w-4xl px-6 pt-24 sm:px-8 md:px-16 lg:max-w-5xl">

                    {/* SERIE */}
                    <div className="mb-4 flex items-center gap-3">

                        <img
                            src="/Netflix_Symbol_PMS.png"
                            alt="Netflix"
                            className="h-12 w-auto sm:h-15"
                        />

                        <p className="text-xs font-semibold uppercase tracking-[0.55em] text-white sm:text-sm sm:tracking-[0.90em]">
                            PELICULA
                        </p>

                    </div>


                    {/* TÍTULO */}
                    <h1
                        className={`${niconne.className} text-4xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl`}
                    >
                        FELIZ
                        <br />
                        ANIVERSARIO
                    </h1>


                    {/* =========================
              100% + 4K
          ========================== */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">

                        {/* 100% PARA TI */}
                        <span className="text-base font-bold text-green-500 sm:text-lg">
                            100 % Para ti
                        </span>

                        {/* 4K */}
                        <img
                            src="/img-4k.png"
                            alt="4K"
                            className="h-6 w-auto object-contain sm:h-7"
                        />

                    </div>


                    {/* =========================
              TOP 10 + RECUERDOS
          ========================== */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">

                        {/* TOP 10 */}
                        <img
                            src="/top-10.png"
                            alt="Top 10"
                            className="h-8 w-auto object-contain sm:h-9"
                        />

                        {/* INFORMACIÓN */}
                        <p className="mb-0.5 text-base font-bold text-white sm:text-lg">
                            Nuestro primer año.
                        </p>

                    </div>


                    {/* =========================
              DESCRIPCIÓN
          ========================== */}
                    <p className="mt-5 w-full max-w-[850px] text-base leading-7 text-gray-300 sm:text-lg">
                        hoy 13 de octubre de 2026 celebramos nuestro primer año de amor, complicidad y crecimiento juntos.
                        Cada momento compartido, desde las risas espontaneas hasta los silencios que dicen mas de mil palabras
                        han sido parte de esta hermosa historia que estamos escribiendo juntos.


                        {/* Solo móvil: texto adicional */}
                        <span className={`${leerMas ? "inline" : "hidden"} md:inline`}>
                            {" "}Anque no siempre es perfecto, ha sido real, fuerte y lleno de amor, por que juntos podemos superar
                            cualquier obstáculo, por pequeño que sea y eso lo hace aún mas especial.
                            gracias por caminar a mi lado con paciencia, comprensión y amor incondicional.
                            Un año puede parecer poco para algunos, pero para nosotros significa miles de recuerdos,desafios superados
                            y sueños construidos en equipo. Y lo mejor de todo es que lo mejor aún esta por venir. Que este aniversario
                            sea solo el primero de muchos que celebraremos juntos.
                            Te amo hoy mas que nunca, feliz aniversario mi amor🖤.
                        </span>

                        {/* Botón solo móvil */}
                        <button
                            onClick={() => setLeerMas(!leerMas)}
                            className="ml-2 font-semibold text-white underline md:hidden"
                        >
                            {leerMas ? "Leer menos" : "Leer más"}
                        </button>
                    </p>


                    {/* =========================
              BOTONES
          ========================== */}
                    <div className="mt-8 flex flex-wrap gap-3">

                        <audio
                            ref={audioRef}
                            src="/musica5.mp3"
                            preload="auto"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                        />

                        <button
                            onClick={toggleMusic}
                            onDoubleClick={restartMusic}
                            className="rounded bg-white px-5 py-3 font-bold text-black transition hover:bg-gray-200 sm:px-6"
                        >
                            {isPlaying ? "⏸ Pausar música" : "▶ Reproducir música"}
                        </button>

                        <button
                            className="rounded bg-gray-600/80 px-5 py-3 font-semibold text-white transition hover:bg-gray-600 sm:px-6"
                        >
                            ✓ Favorito
                        </button>

                    </div>

                </div>
            </section>


            {/* =========================
          TENDENCIAS / MOMENTOS
      ========================== */}
            <section className="relative z-20 px-6 pb-16 pt-8 sm:px-8 md:px-12">
                <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
                    Tendencias
                </h2>

                {/* GRID */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {[
                        {
                            titulo: "Nuestro primer año",
                            imagen: "/imagen1.jpeg",
                            link: "/",
                        },
                        {
                            titulo: "Nuestro comienzo",
                            imagen: "/imagen11.jpeg",
                            link: "/nuestro-comienzo",
                        },
                        {
                            titulo: "Contigo todo es posible",
                            imagen: "/imagen2.jpeg",
                            link: "/contigo-todo-es-posible",
                        },
                        {
                            titulo: "Sara & Antonio",
                            imagen: "/imagen5.jpeg",
                            link: "/sara-y-antonio",
                        },
                        {
                            titulo: "Caminando juntos",
                            imagen: "/imagen3.jpeg",
                            link: "/caminando-juntos",
                        },
                        {
                            titulo: "Mi lugar seguro siempre seras tú",
                            imagen: "/imagen9.jpeg",
                            link: "/mi-lugar-favorito",
                        },
                    ].map((tendencia) => (
                        <Link
                            key={tendencia.titulo}
                            href={tendencia.link}
                            className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-md bg-gray-800 transition duration-300 hover:-translate-y-2 hover:scale-105"
                        >
                            {/* FOTO */}
                            <img
                                src={tendencia.imagen}
                                alt={tendencia.titulo}
                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            {/* TÍTULO */}
                            <div className="relative flex h-full items-end p-4">
                                <h3 className="font-bold text-white">
                                    {tendencia.titulo}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>


            {/* =========================
          FINAL
      ========================== */}
            <section className="border-t border-white/10 px-6 py-20 text-center sm:py-24">

                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 sm:text-sm">
                    Temporada 1
                </p>

                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                    Y esto apenas comienza... 🖤
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                    Gracias por compartir este año conmigo.
                    Espero que nuestra historia tenga muchísimas temporadas más.
                </p>

            </section>

        </main>
    );
}