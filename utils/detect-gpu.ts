// detect-gpu.ts
// classify GPU into a coarse tier so works can fall back gracefully on weak hardware.
// uses WEBGL_debug_renderer_info (when available) plus a tiny benchmark fallback.

export type GpuTier = 'high' | 'medium' | 'low' | 'none';

export interface GpuInfo {
    tier: GpuTier;
    renderer: string | null;
    vendor: string | null;
    benchmarkMs: number | null;
}

const LOW_PATTERNS = [
    /intel.*hd graphics (3000|2500|4000)/i,
    /intel.*uhd graphics 6\d{2}/i,
    /microsoft basic render/i,
    /llvmpipe/i,
    /swiftshader/i,
    /software/i,
];

const HIGH_PATTERNS = [
    /apple m[1-9]/i,
    /(rtx|gtx 1[0-9]\d{2})/i,
    /radeon (rx|pro) [5-9]/i,
];

export function detectGpu(): GpuInfo {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return { tier: 'none', renderer: null, vendor: null, benchmarkMs: null };

    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = ext ? (gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string) : null;
    const vendor = ext ? (gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) as string) : null;

    let tier: GpuTier = 'medium';

    if (renderer) {
        if (HIGH_PATTERNS.some(rx => rx.test(renderer))) tier = 'high';
        else if (LOW_PATTERNS.some(rx => rx.test(renderer))) tier = 'low';
    }

    const benchmarkMs = benchmark(gl);
    if (benchmarkMs !== null) {
        if (benchmarkMs > 50) tier = 'low';
        else if (benchmarkMs < 6 && tier !== 'low') tier = 'high';
    }

    return { tier, renderer, vendor, benchmarkMs };
}

/** Fill a 256×256 framebuffer once; report elapsed ms. Returns null if anything fails. */
function benchmark(gl: WebGLRenderingContext | WebGL2RenderingContext): number | null {
    try {
        const start = performance.now();
        gl.viewport(0, 0, 256, 256);
        for (let i = 0; i < 8; i++) {
            gl.clearColor(Math.random(), Math.random(), Math.random(), 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.finish();
        }
        return performance.now() - start;
    } catch {
        return null;
    }
}
