"use client";

import Player from "@vimeo/player";
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type VSLPlayerProps = {
  videoId: string;
  unlockAt?: number;
  onUnlock?: () => void;
  onSoundEnabled?: () => void;
  onVideoComplete?: (data: { duration: number; seconds: number }) => void;
};

const PROGRESS_STORAGE_KEY = "blueprint_vsl_video_progress";
const UNLOCK_STORAGE_KEY = "blueprint_vsl_form_unlocked";

const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 1.75, 2];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function VSLPlayer({
  videoId,
  unlockAt = 300,
  onUnlock,
  onSoundEnabled,
  onVideoComplete,
}: VSLPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  const hideControlsTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const unlockTriggeredRef = useRef(false);
  const restoredProgressRef = useRef(false);
  const lastSavedSecondRef = useRef(-1);
  const durationRef = useRef(0);
  const currentTimeRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [started, setStarted] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [muted, setMuted] = useState(true);
  const [volume] = useState(0.85);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [speedAvailable, setSpeedAvailable] = useState(true);

  const [controlsVisible, setControlsVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  /*
   * ---------------------------------------------------------
   * CONTROLES
   * ---------------------------------------------------------
   */

  const showControls = useCallback(() => {
    setControlsVisible(true);

    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }

    if (playing && !speedMenuOpen) {
      hideControlsTimerRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2500);
    }
  }, [playing, speedMenuOpen]);

  /*
   * ---------------------------------------------------------
   * VIMEO PLAYER
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return;
    }

    const player = new Player(iframe);

    playerRef.current = player;

    /*
     * -------------------------------------------------------
     * LOADED
     * -------------------------------------------------------
     */

    async function handleLoaded() {
      try {
        const videoDuration = await player.getDuration();

        durationRef.current = videoDuration;
        setDuration(videoDuration);
        setReady(true);
        setBuffering(false);

        /*
         * Autoplay precisa começar mutado
         * na maioria dos navegadores.
         */
        try {
          await player.setVolume(0);
          setMuted(true);
        } catch (error) {
          console.warn(
            "Não foi possível iniciar o vídeo mutado:",
            error,
          );
        }

        /*
         * ---------------------------------------------------
         * RESTAURA PROGRESSO
         * ---------------------------------------------------
         */

        if (!restoredProgressRef.current) {
          restoredProgressRef.current = true;

          try {
            const savedProgress = Number(
              localStorage.getItem(PROGRESS_STORAGE_KEY) || "0",
            );

            if (
              Number.isFinite(savedProgress) &&
              savedProgress > 5 &&
              savedProgress < videoDuration - 10
            ) {
              await player.setCurrentTime(savedProgress);

              currentTimeRef.current = savedProgress;
              setCurrentTime(savedProgress);
            }
          } catch {
            // localStorage pode estar indisponível.
          }
        }

        /*
         * ---------------------------------------------------
         * AUTOPLAY
         * ---------------------------------------------------
         */

        try {
          await player.play();
        } catch (error) {
          console.warn(
            "Autoplay bloqueado pelo navegador:",
            error,
          );

          setPlaying(false);
        }
      } catch (error) {
        console.error(
          "Erro ao inicializar o Vimeo:",
          error,
        );
      }
    }

    /*
     * -------------------------------------------------------
     * PLAY
     * -------------------------------------------------------
     */

    function handlePlay() {
      setPlaying(true);
      setStarted(true);
      setBuffering(false);
    }

    /*
     * -------------------------------------------------------
     * PAUSE
     * -------------------------------------------------------
     */

    function handlePause() {
      setPlaying(false);
      setControlsVisible(true);
    }

    /*
     * -------------------------------------------------------
     * BUFFER
     * -------------------------------------------------------
     */

    function handleBufferStart() {
      setBuffering(true);
    }

    function handleBufferEnd() {
      setBuffering(false);
    }

    /*
     * -------------------------------------------------------
     * FIM DO VÍDEO
     * -------------------------------------------------------
     */

    function handleEnded() {
      setPlaying(false);
      setControlsVisible(true);

      onVideoComplete?.({
        duration: durationRef.current,
        seconds: currentTimeRef.current,
      });

      try {
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
      } catch {
        // Ignorar.
      }
    }

    /*
     * -------------------------------------------------------
     * PROGRESSO
     * -------------------------------------------------------
     */

    function handleTimeUpdate(data: {
      seconds: number;
      duration: number;
      percent: number;
    }) {
      const seconds = data.seconds || 0;

      currentTimeRef.current = seconds;
      setCurrentTime(seconds);

      /*
       * Salva o progresso a cada 5 segundos.
       */
      const roundedSecond = Math.floor(seconds);

      if (
        roundedSecond > 0 &&
        roundedSecond % 5 === 0 &&
        roundedSecond !== lastSavedSecondRef.current
      ) {
        lastSavedSecondRef.current = roundedSecond;

        try {
          localStorage.setItem(
            PROGRESS_STORAGE_KEY,
            String(roundedSecond),
          );
        } catch {
          // Ignorar.
        }
      }

      /*
       * ---------------------------------------------------
       * DESBLOQUEIA FORMULÁRIO
       * ---------------------------------------------------
       */

      if (
        seconds >= unlockAt &&
        !unlockTriggeredRef.current
      ) {
        unlockTriggeredRef.current = true;

        try {
          localStorage.setItem(
            UNLOCK_STORAGE_KEY,
            "true",
          );
        } catch {
          // Ignorar.
        }

        onUnlock?.();
      }
    }

    /*
     * -------------------------------------------------------
     * PLAYBACK RATE
     * -------------------------------------------------------
     */

    function handlePlaybackRateChange(data: {
      playbackRate: number;
    }) {
      if (data.playbackRate) {
        setPlaybackRate(data.playbackRate);
      }
    }

    /*
     * -------------------------------------------------------
     * EVENTOS
     * -------------------------------------------------------
     */

    player.on("loaded", handleLoaded);
    player.on("play", handlePlay);
    player.on("pause", handlePause);

    player.on(
      "bufferstart",
      handleBufferStart,
    );

    player.on(
      "bufferend",
      handleBufferEnd,
    );

    player.on("ended", handleEnded);

    player.on(
      "timeupdate",
      handleTimeUpdate,
    );

    player.on(
      "playbackratechange",
      handlePlaybackRateChange,
    );

    /*
     * -------------------------------------------------------
     * CLEANUP
     * -------------------------------------------------------
     */

    return () => {
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }

      player.off("loaded", handleLoaded);
      player.off("play", handlePlay);
      player.off("pause", handlePause);

      player.off(
        "bufferstart",
        handleBufferStart,
      );

      player.off(
        "bufferend",
        handleBufferEnd,
      );

      player.off("ended", handleEnded);

      player.off(
        "timeupdate",
        handleTimeUpdate,
      );

      player.off(
        "playbackratechange",
        handlePlaybackRateChange,
      );

      player.destroy().catch(() => undefined);

      playerRef.current = null;
    };
  }, [onUnlock, onVideoComplete, unlockAt]);

  /*
   * ---------------------------------------------------------
   * FULLSCREEN
   * ---------------------------------------------------------
   */

  useEffect(() => {
    function handleFullscreenChange() {
      setFullscreen(
        document.fullscreenElement === containerRef.current,
      );
    }

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * AUTO HIDE DOS CONTROLES
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!playing) {
      const frame = window.requestAnimationFrame(() => {
        setControlsVisible(true);
      });

      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const frame = window.requestAnimationFrame(() => {
      showControls();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [playing, showControls]);

  /*
   * ---------------------------------------------------------
   * PLAY / PAUSE
   * ---------------------------------------------------------
   */

  async function togglePlay() {
    const player = playerRef.current;

    if (!player || !ready) {
      return;
    }

    try {
      if (playing) {
        await player.pause();
      } else {
        await player.play();
      }
    } catch (error) {
      console.error(
        "Erro ao controlar o vídeo:",
        error,
      );
    }
  }

  /*
   * ---------------------------------------------------------
   * SOM
   * ---------------------------------------------------------
   */

  async function toggleMute() {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    try {
      if (muted) {
        await player.setVolume(volume);

        setMuted(false);
        onSoundEnabled?.();
      } else {
        await player.setVolume(0);

        setMuted(true);
      }
    } catch (error) {
      console.error(
        "Erro ao alterar o áudio:",
        error,
      );
    }
  }

  /*
   * ---------------------------------------------------------
   * VELOCIDADE
   * ---------------------------------------------------------
   */

  async function changePlaybackRate(rate: number) {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    try {
      await player.setPlaybackRate(rate);

      setPlaybackRate(rate);
      setSpeedMenuOpen(false);
      setSpeedAvailable(true);

      showControls();
    } catch {
      /*
       * Se o Vimeo não permitir velocidade
       * para este vídeo/conta, removemos
       * o controle para evitar novos erros.
       */
      console.warn(
        "O Vimeo não habilitou alteração de velocidade para este vídeo.",
      );

      setSpeedAvailable(false);
      setSpeedMenuOpen(false);

      /*
       * Não usamos console.error aqui,
       * porque isso não deve quebrar a página.
       */
    }
  }

  /*
   * ---------------------------------------------------------
   * FULLSCREEN
   * ---------------------------------------------------------
   */

  async function toggleFullscreen() {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(
        "Erro ao ativar tela cheia:",
        error,
      );
    }
  }

  /*
   * ---------------------------------------------------------
   * CLIQUES NOS CONTROLES
   * ---------------------------------------------------------
   */

  function stopPropagation(
    event: ReactMouseEvent<HTMLElement>,
  ) {
    event.stopPropagation();
  }

  /*
   * ---------------------------------------------------------
   * BARRA DE PROGRESSO
   *
   * IMPORTANTE:
   *
   * Esta barra é SOMENTE VISUAL.
   *
   * Não existe:
   * - onClick
   * - onChange
   * - input range
   * - drag
   * - seek
   *
   * Portanto o visitante não consegue
   * avançar o vídeo através da interface.
   * ---------------------------------------------------------
   */

  const progress =
    duration > 0
      ? Math.min(
          (currentTime / duration) * 100,
          100,
        )
      : 0;

  return (
    <div
      ref={containerRef}
      className="group relative aspect-video w-full overflow-hidden bg-black select-none"
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onTouchStart={showControls}
    >
      {/* =====================================================
          VIMEO
      ===================================================== */}

      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&badge=0&autopause=0&playsinline=1&speed=1&skipping_forward=0`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        title="Checkmate Blueprint"
      />

      {/* =====================================================
          ÁREA PRINCIPAL DE PLAY / PAUSE
      ===================================================== */}

      <button
        type="button"
        onClick={togglePlay}
        aria-label={
          playing
            ? "Pausar vídeo"
            : "Reproduzir vídeo"
        }
        className="absolute inset-0 z-10 cursor-pointer bg-transparent"
      />

      {/* =====================================================
          GRADIENTE DOS CONTROLES
      ===================================================== */}

      <div
        className={`pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-transparent to-transparent transition-opacity duration-300 ${
          controlsVisible || !playing
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* =====================================================
          LOADING
      ===================================================== */}

      {buffering && started && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <div className="h-11 w-11 animate-spin rounded-full border-2 border-white/20 border-t-[#d6ac4b]" />
        </div>
      )}

      {/* =====================================================
          PLAY CENTRAL
      ===================================================== */}

      {!playing && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/20 bg-black/55 shadow-2xl backdrop-blur-xl transition-transform duration-300 group-hover:scale-105 md:h-[88px] md:w-[88px]">
            <PlayIcon />
          </div>
        </div>
      )}

      {/* =====================================================
          ATIVAR SOM
      ===================================================== */}

      {playing && muted && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggleMute();
          }}
          className="absolute left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-2xl backdrop-blur-xl transition duration-300 hover:bg-black/90 md:top-7 md:px-5"
        >
          <MutedIcon />

          <span>
            Clique para ativar o som
          </span>
        </button>
      )}

      {/* =====================================================
          CONTROLES
      ===================================================== */}

      <div
        className={`absolute bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
          controlsVisible || !playing
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        onClick={stopPropagation}
      >
        {/* =================================================
            PROGRESSO

            SOMENTE VISUAL.
            NÃO É CLICÁVEL.
        ================================================= */}

        <div className="px-4 md:px-6">
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="absolute bottom-0 left-0 top-0 bg-[#d6ac4b]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* =================================================
            BARRA INFERIOR
        ================================================= */}

        <div className="flex h-[58px] items-center gap-1 px-3 sm:gap-2 md:h-[64px] md:px-5">
          {/* PLAY / PAUSE */}

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label={
              playing
                ? "Pausar"
                : "Reproduzir"
            }
          >
            {playing ? (
              <PauseIcon />
            ) : (
              <SmallPlayIcon />
            )}
          </button>

          {/* SOM */}

          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label={
              muted
                ? "Ativar som"
                : "Silenciar"
            }
          >
            {muted ? (
              <MutedIcon />
            ) : (
              <VolumeIcon />
            )}
          </button>

          {/* TEMPO ATUAL */}

          <div className="ml-1 text-[10px] font-medium tabular-nums text-white/55 sm:text-[11px]">
            {formatTime(currentTime)}
          </div>

          <div className="flex-1" />

          {/* =================================================
              VELOCIDADE
          ================================================= */}

          {speedAvailable && (
            <div className="relative">
              {speedMenuOpen && (
                <div className="absolute bottom-[48px] right-0 min-w-[116px] overflow-hidden rounded-xl border border-white/10 bg-[#101010]/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  <div className="px-3 pb-2 pt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    Velocidade
                  </div>

                  {PLAYBACK_SPEEDS.map(
                    (speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() =>
                          changePlaybackRate(
                            speed,
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[11px] transition ${
                          playbackRate === speed
                            ? "bg-[#d6ac4b]/15 text-[#e2bd62]"
                            : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <span>
                          {speed === 1
                            ? "Normal"
                            : `${speed}x`}
                        </span>

                        {playbackRate ===
                          speed && (
                          <span className="text-[#d6ac4b]">
                            ✓
                          </span>
                        )}
                      </button>
                    ),
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setSpeedMenuOpen(
                    (current) => !current,
                  );

                  setControlsVisible(true);
                }}
                className="flex h-9 min-w-[50px] items-center justify-center rounded-lg px-2 text-[11px] font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Alterar velocidade"
              >
                {playbackRate}x
              </button>
            </div>
          )}

          {/* FULLSCREEN */}

          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label={
              fullscreen
                ? "Sair da tela cheia"
                : "Tela cheia"
            }
          >
            {fullscreen ? (
              <ExitFullscreenIcon />
            ) : (
              <FullscreenIcon />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          BORDA
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-50 border border-white/[0.07]" />
    </div>
  );
}

/* =========================================================
   ÍCONES
========================================================= */

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ml-1 h-8 w-8 fill-white md:h-9 md:w-9"
      aria-hidden="true"
    >
      <path d="M8 5.2v13.6c0 .8.9 1.3 1.6.8l10.1-6.8c.6-.4.6-1.2 0-1.6L9.6 4.4C8.9 3.9 8 4.4 8 5.2Z" />
    </svg>
  );
}

function SmallPlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ml-0.5 h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M8 5.2v13.6c0 .8.9 1.3 1.6.8l10.1-6.8c.6-.4.6-1.2 0-1.6L9.6 4.4C8.9 3.9 8 4.4 8 5.2Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <rect
        x="6.5"
        y="5"
        width="4"
        height="14"
        rx="1"
      />

      <rect
        x="13.5"
        y="5"
        width="4"
        height="14"
        rx="1"
      />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />

      <path d="M15 9.5a4 4 0 0 1 0 5" />

      <path d="M17.8 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />

      <path d="m16 10 5 5" />

      <path d="m21 10-5 5" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3H3v5" />
      <path d="m3 3 6 6" />

      <path d="M16 3h5v5" />
      <path d="m21 3-6 6" />

      <path d="M8 21H3v-5" />
      <path d="m3 21 6-6" />

      <path d="M16 21h5v-5" />
      <path d="m21 21-6-6" />
    </svg>
  );
}

function ExitFullscreenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 9H4V4" />
      <path d="M4 4l6 6" />

      <path d="M15 9h5V4" />
      <path d="m20 4-6 6" />

      <path d="M9 15H4v5" />
      <path d="m4 20 6-6" />

      <path d="M15 15h5v5" />
      <path d="m20 20-6-6" />
    </svg>
  );
}
