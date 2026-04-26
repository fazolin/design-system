// chromatic-aberration.glsl
// soft optical fringing — RGB channels diverge radially from center, mimicking lens aberration.
// distance-dependent: edges fringe more than center. always subtle compared to rgb-split.
// uniforms: u_texture (sampler2D), u_resolution (vec2), u_intensity (float, 0..1)

#version 300 es
precision mediump float;

uniform sampler2D u_texture;
uniform vec2      u_resolution;
uniform float     u_intensity;

in  vec2 v_uv;
out vec4 fragColor;

void main() {
    vec2  center = vec2(0.5);
    vec2  dir    = v_uv - center;
    float dist   = length(dir);

    // strength scales with distance — center stays clean
    float k = u_intensity * 0.04 * dist;

    float r = texture(u_texture, v_uv + dir * k       ).r;
    float g = texture(u_texture, v_uv                 ).g;
    float b = texture(u_texture, v_uv - dir * k * 0.7 ).b;

    fragColor = vec4(r, g, b, 1.0);
}
