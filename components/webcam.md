# webcam

componente de captura de vídeo. **a câmera é a obra** — sem moldura, sem aspect-ratio decorativo, sem efeito hover. apenas pixels.

## fluxo de estados

```
request → loading → active
              ↓
            denied  (terminal)
              ↓
            error   (terminal)
```

### request

tela inicial pré-permissão. zero usar o popup nativo do browser como única explicação.

- texto centralizado HUD 14px:
    ```
    CAMERA_REQUIRED
    grant access to continue
    ```
- botão `.btn` com label `GRANT ACCESS`
- nenhum ícone de câmera, nenhuma ilustração
- ao clicar, dispara `getUserMedia` e transiciona pra `loading`

### loading

estado entre permissão concedida e primeiro frame disponível.

- usa loading variant `counter` ou `glitch-text` (ver `loading.md`)
- texto: `OPENING_STREAM ... <bytes>` ou similar
- duração típica 200–800ms — se demorar mais que 2s, mostrar HUD adicional `STREAM_BLOCKED?`

### active

stream ao vivo.

- `<video>` element preenche o container 100%
- `object-fit: cover`
- sem border, sem padding, sem shadow
- HUD opcional sobreposto (canto top-left ou bottom-right): status do feed (resolução, fps, latency)
- HUD usa `var(--color-mesh)`, mix-blend-mode: difference (ou sólido com bg `var(--color-void)` a 60% opacity)

### denied

usuário negou permissão.

- mensagem HUD em `var(--color-corrupt)`:
    ```
    CAMERA_DENIED
    permission required — check browser settings
    ```
- botão `.btn--ghost` com `RETRY`
- nenhum efeito de erro decorativo

### error

falha técnica (sem câmera, ocupada por outro app, etc.).

- mensagem HUD em `var(--color-corrupt)`:
    ```
    STREAM_FAILED
    <error message from getUserMedia>
    ```
- botão `RETRY`

## anti-padrões aplicados

- zero borda em volta do vídeo
- zero `border-radius` no `<video>`
- zero overlay decorativo (gradiente, vinheta, corner brackets fofos)
- zero usar emoji ou ícone de câmera
- zero "smile :)" ou copy convidativo. tudo é diretivo.

## permissão de áudio

se a obra precisa de áudio também: pedir `getUserMedia({ video: true, audio: true })` na MESMA chamada. dois prompts seguidos é hostil.

## estrutura HTML

```html
<div class="webcam" data-state="request">
    <div class="webcam__layer webcam__layer--request">
        <p class="webcam__title">CAMERA_REQUIRED</p>
        <p class="webcam__sub">grant access to continue</p>
        <button class="btn">GRANT ACCESS</button>
    </div>
    <video class="webcam__video" autoplay muted playsinline></video>
    <div class="webcam__hud">
        <span>1280×720</span><span>30 FPS</span><span>LANDMARKS: 468</span>
    </div>
</div>
```

## referência

ver `webcam.html` — mostra os 4 estados side-by-side. JS real fica nos repos das works.
