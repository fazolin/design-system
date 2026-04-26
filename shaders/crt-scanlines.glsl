// crt-scanlines.glsl
// horizontal scanlines + per-row phosphor mask + soft vignette. CRT TV signal aesthetic.
// uniforms: u_texture (sampler2D), u_resolution (vec2), u_time (float), u_intensity (float, 0..1)

#version 300 es
precision mediump float;

uniform sampler2D u_texture;
uniform vec2      u_resolution;
uniform float     u_time;
uniform float     u_intensity;

in  vec2 v_uv;
out vec4 fragColor;

void main() {
    vec4 base = texture(u_texture, v_uv);

    // dark line per scan row, slow vertical drift
    float line = sin(v_uv.y * u_resolution.y * 1.05 - u_time * 1.2);
    float scan = mix(1.0, 0.75 + 0.25 * step(0.0, line), u_intensity);

    // RGB sub-pixel mask cycling every 3 rows
    float row = mod(v_uv.y * u_resolution.y, 3.0);
    vec3  mask = vec3(
        row <  1.0                  ? 1.0 : 0.85,
        row >= 1.0 && row < 2.0     ? 1.0 : 0.85,
        row >= 2.0                  ? 1.0 : 0.85
    );

    // vignette stronger at edges
    vec2  vc  = v_uv - 0.5;
    float vig = 1.0 - dot(vc, vc) * 0.6 * u_intensity;

    vec3 col = base.rgb * scan * mask * vig;
    fragColor = vec4(col, base.a);
}
