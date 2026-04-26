// datamosh.glsl
// 8x8 block displacement + previous-frame bleeding — mimics video codec p-frame failure
// where motion vectors persist after the i-frame drops.
// requires u_prev: feedback texture from the previous frame's output.
// uniforms: u_texture (current frame, sampler2D), u_prev (previous output, sampler2D),
//           u_resolution (vec2), u_time (float), u_intensity (float, 0..1)

#version 300 es
precision mediump float;

uniform sampler2D u_texture;
uniform sampler2D u_prev;
uniform vec2      u_resolution;
uniform float     u_time;
uniform float     u_intensity;

in  vec2 v_uv;
out vec4 fragColor;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // quantise to 8x8 px blocks; refresh decisions ~4× per second
    vec2  block = floor(v_uv * u_resolution / 8.0);
    float h     = hash(block + floor(u_time * 4.0));

    // each block picks a small directional offset for the previous frame
    vec2 offset = (vec2(hash(block), hash(block + 17.0)) - 0.5) * 0.05 * u_intensity;

    vec3 cur  = texture(u_texture, v_uv         ).rgb;
    vec3 prev = texture(u_prev,    v_uv + offset).rgb;

    // probability that this block ghosts (uses smeared previous frame)
    float ghost = step(1.0 - u_intensity * 0.6, h);

    // bleed: ghost block keeps mostly previous frame, light current overlay
    vec3 col = mix(cur, prev * 0.92 + cur * 0.08, ghost);

    fragColor = vec4(col, 1.0);
}
