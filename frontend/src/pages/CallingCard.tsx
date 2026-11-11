import { useEffect, useId, useRef, useState } from "react";
import "@fontsource/jost/latin-500.css";
import paperUrl from "../assets/paper.webp";
import paperBackUrl from "../assets/paper-back.webp";
import grainUrl from "../assets/grain.webp";
import inkUrl from "../assets/ink.webp";
import edgeMaskUrl from "../assets/edge-mask.png";

type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

const leftLinks: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/drewharts", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/drewhartsfield", external: true },
  { label: "X", href: "https://x.com/drewharts", external: true },
  { label: "Instagram", href: "https://www.instagram.com/drewhartss", external: true },
  { label: "TikTok", href: "https://www.tiktok.com/@drewhartsss", external: true },
];

const rightLinks: LinkItem[] = [
  { label: "Writing", href: "https://medium.com/@drewharts8", external: true },
  {
    label: "Resume",
    href: "https://s3.us-west-1.amazonaws.com/wiseman2.0images/Drew+Hartsfield+Resume+Feb+2026.pdf",
    external: true,
  },
  { label: "Mesa", href: "https://apps.apple.com/us/app/mesa-save-places/id6740463252", external: true },
  { label: "City builder", href: "/grid" },
];

function CardLink({ item, tabbable }: { item: LinkItem; tabbable: boolean }) {
  return (
    <a
      href={item.href}
      tabIndex={tabbable ? 0 : -1}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onClick={(event) => event.stopPropagation()}
    >
      {item.label}
      {item.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

export default function CallingCard() {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const skipFocus = useRef(true);
  const hintId = useId();

  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    const node = flipped ? backRef.current : frontRef.current;
    node?.focus({ preventScroll: true });
  }, [flipped]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFlipped(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const stock = {
    ["--edge" as string]: `url(${edgeMaskUrl})`,
    ["--grain" as string]: `url(${grainUrl})`,
    ["--ink" as string]: `url(${inkUrl})`,
  };
  const frontStock = {
    ...stock,
    ["--paper" as string]: `url(${paperUrl})`,
  };
  const backStock = {
    ...stock,
    ["--paper" as string]: `url(${paperBackUrl})`,
  };

  return (
    <main className="page">
      <svg className="ink-defs" aria-hidden="true" width="0" height="0">
        <filter id="ink-name" x="-8%" y="-45%" width="116%" height="190%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves="2" seed="4" result="tooth" />
          <feDisplacementMap in="SourceGraphic" in2="tooth" scale="1.35" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feGaussianBlur in="warped" stdDeviation="0.42" />
        </filter>
        <filter id="ink-small" x="-8%" y="-35%" width="116%" height="170%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="2" seed="6" result="tooth" />
          <feDisplacementMap in="SourceGraphic" in2="tooth" scale="0.45" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feGaussianBlur in="warped" stdDeviation="0.18" />
        </filter>
      </svg>
      <div className="stage" style={stock}>
        <div className="ground-shadow" aria-hidden="true" />
        <div className={flipped ? "flip is-flipped" : "flip"}>
          <div className="face front" aria-hidden={flipped}>
            <button
              ref={frontRef}
              type="button"
              className="face-hit"
              aria-describedby={hintId}
              aria-pressed={flipped}
              tabIndex={flipped ? -1 : 0}
              onClick={() => setFlipped(true)}
            >
              <span className="paper" style={frontStock} />
              <span className="front-copy">
                <h1 className="name">Drew Hartsfield</h1>
                <p className="corner">Engineer, Palantir</p>
              </span>
            </button>
          </div>

          <div
            ref={backRef}
            className="face back"
            tabIndex={flipped ? -1 : undefined}
            aria-hidden={!flipped}
          >
            <div className="back-copy">
              <p className="role">
                <span className="role-title">Forward deployed engineer</span>
                <span className="role-place">Palantir, Warp Speed</span>
              </p>
              <div className="addresses">
                <div className="address-col">
                  {leftLinks.map((item) => (
                    <CardLink key={item.label} item={item} tabbable={flipped} />
                  ))}
                </div>
                <div className="address-col address-col-right">
                  {rightLinks.map((item) => (
                    <CardLink key={item.label} item={item} tabbable={flipped} />
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="face-hit"
              aria-label="Turn the card back"
              aria-describedby={hintId}
              tabIndex={flipped ? 0 : -1}
              onClick={() => setFlipped(false)}
            >
              <span className="paper paper-back" style={backStock} />
            </button>
          </div>
        </div>
      </div>
      <p id={hintId} className="hint">
        {flipped ? "Turn back" : "Turn over"}
      </p>
    </main>
  );
}
