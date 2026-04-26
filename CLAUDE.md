# CLAUDE.md — design-system

Instruções obrigatórias para qualquer agente trabalhando neste repo OU em qualquer repo de fazolin (site, portal, works). Ler antes de qualquer ação.

## Quem é fazolin

Artista digital. Trabalha na intersecção arte/tecnologia: point cloud, glitch, datamosh, VHS/CRT, webcam interativo, áudio reativo, dado em tempo real, generativo. O trabalho é sobre dado corrompido, identidade mediada por máquina, tecnologia como medium falho.

**NÃO É**: designer de produto, dev de startup, UI designer, freelancer de site.

Nada produzido pode parecer SaaS, Awwwards, Dribbble, portfolio template, Webflow, Squarespace, ou "clean and professional". Se o resultado parece "moderno e elegante", está errado.

## Paleta — 4 cores

```css
--color-void:        #000000;
--color-signal:      #F0F0F0;
--color-mesh:        #00FFFF;
--color-mesh-dim:    rgba(0, 255, 255, 0.4);
--color-corrupt:     #FF0033;
--color-corrupt-dim: rgba(255, 0, 51, 0.5);
```

Regras:
- Fundo SEMPRE `--color-void`.
- Texto base SEMPRE `--color-signal`.
- `--color-mesh` = dado vivo, foco, scan ativo, processo em curso.
- `--color-corrupt` = erro real, glitch destrutivo, hover de risco. NUNCA decorativo.
- Sem gradiente entre cores. Transições são corte ou substituição.
- Sem cor fora da paleta. Sem cinza médio — use opacity sobre `signal`.

## Tipografia — 2 fontes

- **Display**: `Oswald` weight `700`. Uso: wordmark FAZOLIN, headings de works, impacto. Sempre uppercase. `letter-spacing` levemente negativo em ≥48px (`-0.005em` a `-0.01em`).
- **HUD**: `JetBrains Mono` weight `500`. Uso: labels, dado, parâmetros, navegação, status — qualquer texto entre 10–14px. Uppercase com `letter-spacing: 0.1em–0.2em` quando funcional.

Carregamento: `@fontsource/oswald/700.css` + `@fontsource/jetbrains-mono/500.css`. Sem outras fontes. Fallback técnico apenas: `sans-serif` / `monospace`.

```css
font-family: 'Oswald', sans-serif;
font-family: 'JetBrains Mono', monospace;
```

## Como referenciar tokens

Sempre via variáveis CSS, nunca literais:

```css
/* sim */
color: var(--color-mesh);
border: 1px solid var(--color-signal);

/* não */
color: #00FFFF;
```

Em TS, importar de `tokens/colors.ts`. Nunca redeclarar valores localmente.

## Anti-padrões — NUNCA

- Gradiente (linear, radial, conic).
- `border-radius` acima de 2px. Default é 0.
- Glassmorphism, `backdrop-filter: blur` decorativo.
- Spinner de loading.
- `box-shadow` decorativo. Sombra só funcional (RGB split, glow de dado).
- Cor fora da paleta.
- Serifa em qualquer fonte.
- Hover suave (transição >120ms em cor/posição).
- Easing curvado (`ease-in-out` etc.). Use `linear` ou `steps()`.
- shadcn, Radix, Material, qualquer component library.
- Tailwind sem mapear pros tokens.
- Emoji.
- Texto sem hierarquia clara display vs HUD.

## Padrões de nomenclatura

- Arquivos: kebab-case (`rgb-split.glsl`, `audio-visualizer.html`).
- Componentes: spec em `<name>.md` + referência em `<name>.html`, mesmo radical.
- Shaders: nome descreve o efeito (`datamosh.glsl`, nunca `effect-1.glsl`).
- Tokens CSS: `--color-*`, `--time-*`, `--size-*`, `--font-*`.
- Classes: `.<componente>__<elemento>--<modificador>`.

## Como comentar shaders

- Comentários sempre em inglês.
- Header: nome do arquivo, descrição em 1–2 linhas, uniforms esperados.
- Uniforms padronizados: `u_time`, `u_resolution`, `u_intensity`, `u_texture`.
- `#version 300 es` + `precision mediump float;` no topo.
- Standalone: compila e roda sozinho com canvas + uniforms.

Modelo:

```glsl
// rgb-split.glsl
// chromatic aberration — samples texture per channel along an angled offset
// uniforms: u_texture (sampler2D), u_time (float), u_intensity (float 0..1), u_resolution (vec2)

#version 300 es
precision mediump float;

uniform sampler2D u_texture;
uniform float u_time;
uniform float u_intensity;
uniform vec2 u_resolution;

in vec2 v_uv;
out vec4 fragColor;

void main() {
    // ...
}
```

## Signal vs mesh — regra de decisão

- `signal` = elemento estrutural, texto base, traço fixo, presença.
- `mesh` = dado em movimento, valor lido em tempo real, indicador de "vivo".

Se o elemento **não muda** durante a interação → `signal`. Se **muda em resposta** a input ou stream de dado → `mesh`.

## Quando usar corrupt

- Erro real (câmera negada, fetch falhou, arquivo não carregou).
- Hover em ação destrutiva (delete, reset).
- Glitch intencional como parte da obra.

NÃO use `corrupt` pra "destacar" algo importante. Destaque é `mesh`.

## Estados de loading

Nunca spinner. Opções:
- Contador de bytes/progresso em fonte HUD.
- Scanline animando (`translateY` linear).
- Texto glitchando — letras embaralhando.
- Pontos cardinais piscando em sequência.

Fundo sempre `--color-void`. Texto sempre HUD.

## Performance

- 30fps mínimo em qualquer work, 60fps alvo.
- Detectar GPU low-end via `utils/detect-gpu.ts` e cair em fallback estático.
- Respeitar `prefers-reduced-motion`: substituir glitch por estado parado, não animar.

## Escopo das regras — interface vs obra

As regras deste design-system valem para **interface**: tudo que envolve, embala ou conduz à obra. A obra em si pode quebrar qualquer regra.

**Interface (segue design-system, sem exceção):**
- página de entrada da work (request de permissão, call-to-action)
- loading state, error state, denied state
- HUD sobreposto, controles, parâmetros expostos
- nav, footer, créditos, links externos
- mobile fallback / aviso de incompatibilidade
- qualquer texto explicativo, label, status

**Obra / interior (pode quebrar tudo):**
- o canvas em si — a coisa renderizada que é a obra
- cores fora da paleta, sim
- tipografia diferente (ou nenhuma)
- formas, gradientes, animações com easing curvado, ruído fora do vocabulário fx-*
- duração de motion arbitrária, easing arbitrário
- regras próprias documentadas no `CLAUDE.md` local da work

A obra é onde fazolin testa o que quer testar. A interface é onde fazolin **não** quer ter que pensar — ela é coerente em todo o universo, a obra é onde a coerência se rompe propositalmente.

Ponto de transição: o instante em que o usuário "entra" na obra (clica GRANT ACCESS, dispara START, fecha o aviso de mobile). Antes desse ponto, design-system. Depois, regras da work.

## Ao começar trabalho em qualquer repo de fazolin

1. Ler este `CLAUDE.md` (do design-system).
2. Ler o `CLAUDE.md` local do repo da work — pode ter regras próprias para o **interior** da obra.
3. Ler `docs/works-checklist.md` se for publicar.
4. Garantir que `tokens/` está disponível.
5. Só então código.

Conflito entre regras locais e design-system:
- **interface** → design-system vence sempre.
- **interior da obra** → CLAUDE.md local da work vence, mesmo se contradiz o design-system.

## Repo

https://github.com/fazolin/design-system.git
