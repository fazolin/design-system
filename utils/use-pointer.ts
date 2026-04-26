// use-pointer.ts
// unified pointer state for cursor / touch / pen — framework-agnostic.
// returns a live `state` object (mutated in place per frame) plus a `destroy` cleanup.
// works adapt to React/Vue/Svelte by reading state.x/y inside their own render loop.

export interface PointerState {
    x: number;          // last position, css px relative to target
    y: number;
    nx: number;         // normalised 0..1 across target width / height
    ny: number;
    down: boolean;
    moving: boolean;    // true within `idleAfterMs` of last movement
    vx: number;         // velocity in css px / ms (smoothed)
    vy: number;
    lastEventAt: number;
}

export interface UsePointerOptions {
    target?: Element | Window;
    idleAfterMs?: number;
    velocitySmoothing?: number;
}

export function usePointer(opts: UsePointerOptions = {}) {
    const target = opts.target ?? window;
    const idleAfterMs = opts.idleAfterMs ?? 120;
    const smooth = opts.velocitySmoothing ?? 0.2;

    const state: PointerState = {
        x: 0, y: 0, nx: 0.5, ny: 0.5,
        down: false, moving: false,
        vx: 0, vy: 0, lastEventAt: 0,
    };

    let prevX = 0, prevY = 0, prevT = 0;
    let idleTimer = 0;

    const onMove = (e: PointerEvent) => {
        const rect = target instanceof Window
            ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
            : (target as Element).getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const now = e.timeStamp;
        const dt = Math.max(now - prevT, 1);

        const instantVx = (x - prevX) / dt;
        const instantVy = (y - prevY) / dt;
        state.vx = state.vx * (1 - smooth) + instantVx * smooth;
        state.vy = state.vy * (1 - smooth) + instantVy * smooth;

        state.x = x;
        state.y = y;
        state.nx = rect.width  > 0 ? x / rect.width  : 0.5;
        state.ny = rect.height > 0 ? y / rect.height : 0.5;
        state.lastEventAt = now;
        state.moving = true;

        prevX = x; prevY = y; prevT = now;

        clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => { state.moving = false; }, idleAfterMs);
    };

    const onDown = () => { state.down = true; };
    const onUp   = () => { state.down = false; };

    const t = target as EventTarget;
    t.addEventListener('pointermove',   onMove as EventListener, { passive: true });
    t.addEventListener('pointerdown',   onDown as EventListener, { passive: true });
    t.addEventListener('pointerup',     onUp   as EventListener, { passive: true });
    t.addEventListener('pointercancel', onUp   as EventListener, { passive: true });

    const destroy = () => {
        t.removeEventListener('pointermove',   onMove as EventListener);
        t.removeEventListener('pointerdown',   onDown as EventListener);
        t.removeEventListener('pointerup',     onUp   as EventListener);
        t.removeEventListener('pointercancel', onUp   as EventListener);
        clearTimeout(idleTimer);
    };

    return { state, destroy };
}
