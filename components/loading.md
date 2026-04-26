# loading

estado de carregamento. **proibido spinner**. fundo sempre `var(--color-void)`, fonte sempre HUD.

## variantes

### counter

contador de bytes ou porcentagem em fonte HUD. atualiza em tempo real. tabular-nums.

```
LOADING ... 0.43 MB / 1.20 MB
```

### scanline

linha horizontal de 1px translateY-ndo verticalmente em `linear` infinite. cor `var(--color-mesh)` ou `var(--color-mesh-dim)`. velocidade entre 800ms (rápido) e 2400ms (lento, contemplativo).

### glitch-text

texto fixo (ex: `INITIALIZING`) com letras embaralhando a cada 80ms via `steps(N, end)`. quando carregamento termina, texto assenta na palavra final.

### cardinal-pulse

4 pontos quadrados em cruz (`+`), cada um piscando em sequência horária. cada pisca é 120ms `linear`. resto fica off (signal 15%). on = mesh.

## quando usar qual

- **counter** — quando há progresso mensurável (download, upload, fetch chunked)
- **scanline** — operação contínua sem progresso conhecido (analyzing, scanning)
- **glitch-text** — boot, init, esperando handshake
- **cardinal-pulse** — espera de rede, pequeno indicador inline

## anti-padrões aplicados

- nada de spinner circular
- nada de skeleton com gradiente
- nada de progress bar com sombra ou easing
- nada de transição de opacidade longa (>200ms)

## referência

ver `loading.html`.
