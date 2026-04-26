// glitch-engine.ts
// programmatic control over glitch state — schedule, trigger, envelope.
// works in two modes:
//   1. dom: applies CSS classes (.fx-flash / .fx-jitter / .fx-alive) to elements
//   2. canvas: emits an intensity float over time, consumed by shader uniforms

export type GlitchEffect = 'flash' | 'jitter' | 'alive';

export interface GlitchEngineOptions {
    minIntervalMs?: number;
    maxIntervalMs?: number;
}

export class GlitchEngine {
    private intensity = 0;
    private decay = 0;
    private lastTick = 0;
    private nextScheduled = 0;
    private opts: Required<GlitchEngineOptions>;

    constructor(opts: GlitchEngineOptions = {}) {
        this.opts = {
            minIntervalMs: opts.minIntervalMs ?? 4_000,
            maxIntervalMs: opts.maxIntervalMs ?? 9_000,
        };
        this.scheduleNext(performance.now());
    }

    /** Trigger a one-shot glitch on a DOM element by toggling the matching .fx-* class. */
    triggerDom(target: Element, effect: GlitchEffect, durationMs = 80) {
        const cls = `fx-${effect}`;
        target.classList.remove(cls);
        // force reflow so the animation restarts
        void (target as HTMLElement).offsetWidth;
        target.classList.add(cls);
        if (effect !== 'alive') {
            window.setTimeout(() => target.classList.remove(cls), durationMs);
        }
    }

    /** Spike the canvas intensity to `peak` and decay back to 0 over `durationMs`. */
    spike(peak: number, durationMs = 80) {
        this.intensity = peak;
        this.decay = peak / Math.max(durationMs, 1);
    }

    /** Read current intensity (0..1) — meant to be sampled per frame and pushed as a uniform. */
    sample(now: number): number {
        const dt = now - this.lastTick;
        this.lastTick = now;
        this.intensity = Math.max(0, this.intensity - this.decay * dt);

        if (now >= this.nextScheduled) {
            this.spike(0.4 + Math.random() * 0.4, 60 + Math.random() * 60);
            this.scheduleNext(now);
        }

        return this.intensity;
    }

    private scheduleNext(now: number) {
        const { minIntervalMs, maxIntervalMs } = this.opts;
        this.nextScheduled = now + minIntervalMs + Math.random() * (maxIntervalMs - minIntervalMs);
    }
}
