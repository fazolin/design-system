# design-system

identidade visual e código compartilhado entre fazolin.com, o portal interativo e a série de works. não roda — é documento. agentes leem aqui antes de produzir qualquer coisa em qualquer repo de fazolin.

## paleta — 4 cores

```css
--color-void:        #000000;   /* fundo, sempre */
--color-signal:      #F0F0F0;   /* texto, traço, presença */
--color-mesh:        #00FFFF;   /* dado vivo, foco, scan ativo */
--color-mesh-dim:    rgba(0, 255, 255, 0.4);
--color-corrupt:     #FF0033;   /* erro, glitch, hover destrutivo */
--color-corrupt-dim: rgba(255, 0, 51, 0.5);
```

preto é fundo. branco é traço. ciano é dado vivo. vermelho é erro. nenhuma quinta cor.

## tipografia — 2 fontes

- **display** — Oswald 700 — wordmarks, headings, FAZOLIN
- **HUD** — JetBrains Mono 500 — labels, parâmetros, navegação, tudo de 10–14px

ambas via @fontsource. nada além delas.

## estrutura

```
tokens/       variáveis css e ts — fonte da verdade
components/   spec.md + ref.html por componente
shaders/      glsl standalone, comentado em inglês
utils/        helpers reutilizados nas works
docs/         manifesto, references, works-checklist
examples/     vitrine
```

## como usar em outro repo

1. ler `CLAUDE.md` deste repo
2. importar `tokens/` (copy ou package, mais à frente)
3. seguir spec dos componentes
4. checar `docs/works-checklist.md` antes de publicar

## repo

https://github.com/fazolin/design-system.git
