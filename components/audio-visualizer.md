# audio-visualizer

renderização de áudio via canvas. waveform ou frequência. sem decoração — apenas dado.

## modos

### waveform

amplitude no tempo. linha contínua, 1px de espessura, `var(--color-mesh)`. canvas full-width, altura tipicamente 80–160px.

### frequency

barras de magnitude por bin. cada barra 2–4px de largura, gap 1px, `var(--color-mesh)` base. picos acima de 0.85 (normalizado) viram `var(--color-corrupt)` no frame em que ocorrem.

### oscilloscope

x-y mode. canal esquerdo no eixo x, direito no y. linha 1px mesh. uso: instalações onde áudio é o conteúdo, não o complemento.

## rendering rules

- fundo sempre `var(--color-void)` — nunca transparent (pra evitar artifact)
- linha sempre 1px — não engrossar pra "destacar"
- sem grid, sem axis labels, sem dB scale visível
- sem ease ou smoothing temporal além do `analyser.smoothingTimeConstant` padrão (~0.8)
- 60fps target via `requestAnimationFrame`

## HUD opcional

acima ou abaixo do canvas, fonte HUD 11px:

```
INPUT: MIC_DEFAULT  |  RATE: 48000 Hz  |  FFT: 2048
```

## anti-padrões aplicados

- zero gradiente vertical nas barras
- zero "rainbow" colorido por frequência
- zero círculo polar
- zero blur, glow, ou afterglow
- zero label "Frequency (Hz)" — o canvas é o dado, fim

## estrutura HTML

```html
<div class="audio-visualizer">
    <canvas class="audio-visualizer__canvas" width="800" height="120"></canvas>
    <div class="audio-visualizer__hud">
        <span>INPUT: MIC_DEFAULT</span>
        <span>RATE: 48000 Hz</span>
        <span>FFT: 2048</span>
    </div>
</div>
```

## API esperada (em utils/, futuro)

```ts
const av = createAudioVisualizer(canvasEl, {
    mode: 'waveform' | 'frequency' | 'oscilloscope',
    fftSize: 2048,
    peakThreshold: 0.85,
});
av.connect(audioStream);
av.start();
```

## referência

ver `audio-visualizer.html` — mostra os 3 modos com fontes de áudio sintéticas (sine, noise, mix) pra preview sem precisar de mic.
