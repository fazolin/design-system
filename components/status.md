# status

indicador de estado de sistema, conexão, sensor, dispositivo. ponto quadrado 6×6px com label HUD ao lado.

## anatomia

- ponto: 6×6px, sólido, sem `border-radius`
- label: HUD 12px uppercase letter-spacing 0.18em
- gap entre ponto e label: 12px

## estados

| nome | cor do ponto | cor do label | uso |
|---|---|---|---|
| **scanning / active** | `var(--color-mesh)` | `var(--color-signal)` | operação em curso, sensor lendo |
| **idle** | `var(--color-signal)` a 40% | `var(--color-signal)` a 60% | conectado mas inativo |
| **error / corrupt** | `var(--color-corrupt)` | `var(--color-corrupt)` | falha real |
| **offline** | `var(--color-signal)` a 15% | `var(--color-signal)` a 30% | sem conexão, dispositivo ausente |

## modificadores

- `.status--alive` adiciona `fx-alive` ao ponto e ao label. uso: indicar "vivo, mas em standby" (ex: webcam streaming sem rosto detectado)
- `.status--blink` faz o ponto piscar 250ms `steps(2, end)` infinite. uso: alerta crítico contínuo. nunca como decoração.

## anti-padrões aplicados

- nunca círculo
- nunca pulso suave (radial gradient se expandindo)
- nunca borda em volta do ponto
- nunca ícone (cruz, check) no lugar do ponto
- cores fora dos 4 estados acima são proibidas

## estrutura HTML

```html
<div class="status status--scanning">
    <span class="status__dot"></span>
    <span class="status__label">SCAN_ACTIVE</span>
</div>
```

## referência

ver `status.html`.
