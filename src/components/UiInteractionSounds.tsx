"use client";

import { useEffect } from "react";

const hoverSoundUrl = "/sounds/ui-hover.mp3";
const clickSoundUrl = "/sounds/ui-click.mp3";

type SoundVoice = {
  audio: HTMLAudioElement;
  target: HTMLElement | null;
  request: number;
};

function getInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;

  const element = target.closest<HTMLElement>(
    "a, button, [role='button'], [role='tab']",
  );

  if (!element || element.closest("[data-ui-sound='off']")) return null;

  return element;
}

function createSoundPool(src: string, count = 2) {
  return Array.from({ length: count }, () => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = 0.25;

    return { audio, target: null, request: 0 } satisfies SoundVoice;
  });
}

function playSound(pool: SoundVoice[], target: HTMLElement | null = null) {
  const voice = pool.find(({ audio }) => audio.paused) ?? pool[0];
  if (!voice) return;

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

function stopSoundForTarget(pool: SoundVoice[], target: HTMLElement) {
  for (const voice of pool) {
    if (voice.target !== target) continue;

    voice.request += 1;
    voice.target = null;
    voice.audio.pause();
    voice.audio.currentTime = 0;
  }
}

function unlockSounds(pool: SoundVoice[]) {
  for (const { audio } of pool) {
    const wasMuted = audio.muted;
    audio.muted = true;
    audio.currentTime = 0;

    void audio.play().then(
      () => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = wasMuted;
      },
      () => {
        audio.muted = wasMuted;
      },
    );
  }
}

export function UiInteractionSounds() {
  useEffect(() => {
    const hoverSounds = createSoundPool(hoverSoundUrl);
    const clickSounds = createSoundPool(clickSoundUrl, 1);

    const unlockAudio = () => {
      unlockSounds(hoverSounds);
      unlockSounds(clickSounds);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const element = getInteractiveElement(event.target);
      if (!element || element.contains(event.relatedTarget as Node | null)) return;

      playSound(hoverSounds, element);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const element = getInteractiveElement(event.target);
      if (!element || element.contains(event.relatedTarget as Node | null)) return;

      stopSoundForTarget(hoverSounds, element);
    };

    const onClick = (event: MouseEvent) => {
      if (!getInteractiveElement(event.target)) return;

      playSound(clickSounds);
    };

    window.addEventListener("pointerdown", unlockAudio, {
      capture: true,
      once: true,
    });
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio, true);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
