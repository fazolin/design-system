// rgb-split.glsl
// hard chromatic split — samples R, G, B at offset positions along an angled axis.
// use for glitch moments and brief flashes. raise u_intensity to 0.5+ for visibility.
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
    // split axis drifts so the artifact does not feel static
    float angle = u_time * 0.3;
    vec2  dir   = vec2(cos(angle), sin(angle));

    // pixel-space jitter mapped to uv
    float jitter = u_intensity * 12.0;
    vec2  px     = jitter / u_resolution;

    float r = texture(u_texture, v_uv +  dir * px).r;
    float g = texture(u_texture, v_uv            ).g;
    float b = texture(u_texture, v_uv + -dir * px).b;

    fragColor = vec4(r, g, b, 1.0);
}
