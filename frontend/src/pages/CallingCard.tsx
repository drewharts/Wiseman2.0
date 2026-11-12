import { useEffect, useId, useRef, useState } from "react";
import "@fontsource/limelight/latin-400.css";
import "@fontsource/jost/latin-500.css";
import paperUrl from "../assets/paper.webp";
import paperBackUrl from "../assets/paper-back.webp";

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

  const frontStock = {
    ["--paper" as string]: `url(${paperUrl})`,
  };
  const backStock = {
    ["--paper" as string]: `url(${paperBackUrl})`,
  };

  return (
    <main className="page">
      <svg className="ink-defs" aria-hidden="true" width="0" height="0">
        <filter id="ink-name" x="-15%" y="-80%" width="130%" height="260%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves="2" seed="4" result="tooth" />
          <feDisplacementMap in="SourceGraphic" in2="tooth" scale="1.35" xChannelSelector="R" yChannelSelector="G" result="spread" />
          <feGaussianBlur in="spread" stdDeviation="0.4" result="bled" />
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="9" result="speck" />
          <feColorMatrix in="speck" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" result="speckA" />
          <feComponentTransfer in="speckA" result="speckAlpha">
            <feFuncA type="table" tableValues="0.25 0.72 0.9 0.97 1 1 1 1" />
          </feComponentTransfer>
          <feComposite in="bled" in2="speckAlpha" operator="in" result="holed" />
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="wash" />
          <feColorMatrix
            in="wash"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0.2 0 0 0 0.82"
            result="washAlpha"
          />
          <feComposite in="holed" in2="washAlpha" operator="in" result="ink" />
          <feColorMatrix in="ink" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="inkA" />
          <feComponentTransfer in="inkA" result="inv">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur in="inv" stdDeviation="0.5" result="invBlur" />
          <feOffset in="invBlur" dx="-0.9" dy="-0.8" result="biteOff" />
          <feComposite in="biteOff" in2="ink" operator="in" result="biteRaw" />
          <feColorMatrix
            in="biteRaw"
            type="matrix"
            values="0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0 0.03  0 0 0 0.55 0"
            result="bite"
          />
          <feOffset in="invBlur" dx="0.75" dy="0.7" result="lipOff" />
          <feComposite in="lipOff" in2="ink" operator="in" result="lipRaw" />
          <feColorMatrix
            in="lipRaw"
            type="matrix"
            values="0 0 0 0 0.97  0 0 0 0 0.93  0 0 0 0 0.85  0 0 0 0.4 0"
            result="lip"
          />
          <feMerge>
            <feMergeNode in="ink" />
            <feMergeNode in="bite" />
            <feMergeNode in="lip" />
          </feMerge>
        </filter>
        <filter id="ink-small" x="-20%" y="-90%" width="140%" height="280%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" result="tooth" />
          <feDisplacementMap in="SourceGraphic" in2="tooth" scale="0.95" xChannelSelector="R" yChannelSelector="G" result="spread" />
          <feGaussianBlur in="spread" stdDeviation="0.5" result="bled" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="13" result="speck" />
          <feColorMatrix in="speck" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" result="speckA" />
          <feComponentTransfer in="speckA" result="speckAlpha">
            <feFuncA type="table" tableValues="0.15 0.62 0.86 0.95 1 1 1 1" />
          </feComponentTransfer>
          <feComposite in="bled" in2="speckAlpha" operator="in" result="holed" />
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="wash" />
          <feColorMatrix
            in="wash"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0.24 0 0 0 0.78"
            result="washAlpha"
          />
          <feComposite in="holed" in2="washAlpha" operator="in" result="ink" />
          <feColorMatrix in="ink" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="inkA" />
          <feComponentTransfer in="inkA" result="inv">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur in="inv" stdDeviation="0.32" result="invBlur" />
          <feOffset in="invBlur" dx="-0.45" dy="-0.4" result="biteOff" />
          <feComposite in="biteOff" in2="ink" operator="in" result="biteRaw" />
          <feColorMatrix
            in="biteRaw"
            type="matrix"
            values="0 0 0 0 0.08  0 0 0 0 0.05  0 0 0 0 0.03  0 0 0 0.45 0"
            result="bite"
          />
          <feOffset in="invBlur" dx="0.4" dy="0.36" result="lipOff" />
          <feComposite in="lipOff" in2="ink" operator="in" result="lipRaw" />
          <feColorMatrix
            in="lipRaw"
            type="matrix"
            values="0 0 0 0 0.97  0 0 0 0 0.93  0 0 0 0 0.85  0 0 0 0.32 0"
            result="lip"
          />
          <feMerge>
            <feMergeNode in="ink" />
            <feMergeNode in="bite" />
            <feMergeNode in="lip" />
          </feMerge>
        </filter>
        <filter id="ink-rule" x="-4%" y="-400%" width="108%" height="900%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="3" result="tooth" />
          <feDisplacementMap in="SourceGraphic" in2="tooth" scale="0.7" xChannelSelector="R" yChannelSelector="G" result="spread" />
          <feGaussianBlur in="spread" stdDeviation="0.28" result="bled" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="6" result="speck" />
          <feColorMatrix in="speck" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" result="speckA" />
          <feComponentTransfer in="speckA" result="speckAlpha">
            <feFuncA type="table" tableValues="0.2 0.65 0.88 0.96 1 1 1 1" />
          </feComponentTransfer>
          <feComposite in="bled" in2="speckAlpha" operator="in" />
        </filter>
      </svg>
      <div className="stage">
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
                <span className="rule" aria-hidden="true" />
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
