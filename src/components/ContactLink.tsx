"use client";

import { useEffect } from "react";
import type { ComponentProps, ReactNode } from "react";

type ContactLinkProps = ComponentProps<"a"> & {
  children: ReactNode;
  lineClassName: string;
};

const markerSoundUrl = "/sounds/marker-stroke.wav";
type MarkerVoice = {
  audio: HTMLAudioElement;
  target: HTMLAnchorElement | null;
  request: number;
};

let markerVoice: MarkerVoice | undefined;

function getMarkerVoice() {
  markerVoice ??= (() => {
    const audio = new Audio(markerSoundUrl);
    audio.preload = "auto";
    audio.volume = 0.2;
    audio.load();

    return { audio, target: null, request: 0 };
  })();

  return markerVoice;
}

function playMarkerSound(target: HTMLAnchorElement) {
  const voice = getMarkerVoice();
  voice.request += 1;
  const request = voice.request;
  voice.target = target;
  voice.audio.pause();
  voice.audio.currentTime = 0;

  void voice.audio.play().then(
    () => {
      if (voice.request !== request) {
        voice.audio.pause();
        voice.audio.currentTime = 0;
      }
    },
    () => {
      if (voice.request === request) voice.target = null;
    },
  );
}

function stopMarkerSound(target: HTMLAnchorElement) {
  const voice = getMarkerVoice();
  if (voice.target !== target) return;

  voice.target = null;
}

export function ContactLink({
  children,
  className,
  lineClassName,
  onPointerEnter,
  onPointerLeave,
  ...props
}: ContactLinkProps) {
  useEffect(() => {
    const sound = getMarkerVoice().audio;

    const unlockAudio = () => {
      const wasMuted = sound.muted;
      sound.muted = true;
      sound.currentTime = 0;
      void sound.play().then(
        () => {
          sound.pause();
          sound.currentTime = 0;
          sound.muted = wasMuted;
        },
        () => {
          sound.muted = wasMuted;
        },
      );
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    return () => window.removeEventListener("pointerdown", unlockAudio);
  }, []);

  return (
    <a
      {...props}
      data-ui-sound="off"
      className={`contact-link relative inline-block ${className ?? ""}`}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        playMarkerSound(event.currentTarget);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        stopMarkerSound(event.currentTarget);
      }}
    >
      {children}
      <span aria-hidden="true" className={lineClassName} />
    </a>
  );
}
