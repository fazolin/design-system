# button

botão padrão fazolin. zero ornamento, zero suavização. existe pra disparar ação ou abrir caminho — não pra parecer convidativo.

## anatomia

- background: `transparent`
- border: `1px solid var(--color-signal)`
- padding: `10px 18px`
- font: `var(--font-hud)` 500, `12px`, uppercase, `letter-spacing: 0.16em`
- color: `var(--color-signal)`
- border-radius: `0`
- cursor: `pointer`

## estados

| estado | mudança |
|---|---|
| **default** | borda + texto em `signal` |
| **hover** | borda e texto viram `corrupt`. RGB-split flash de 80ms (`text-shadow: -1px 0 mesh, 1px 0 corrupt` por 80ms, depois assenta no estado corrupt sólido) |
| **active** | inverte: `background: signal`, `color: void`, sem borda visível (a borda fica do mesmo tom do bg) |
| **focus-visible** | outline `1px solid var(--color-mesh)`, `outline-offset: 2px`. nunca outline padrão do browser |
| **disabled** | `opacity: 0.3`, `cursor: not-allowed`, sem hover |

## variantes

- `.btn--destructive` — borda já em `corrupt`, texto em `corrupt`. hover: bg vira `corrupt`, texto `void`. uso: delete, reset, abort.
- `.btn--ghost` — sem borda, só texto em `signal`. hover RGB-split. uso: nav inline, ações secundárias.

## anti-padrões aplicados

- zero `border-radius`
- zero `box-shadow`
- zero `transition` em transformação geométrica
- zero ícone pré-empacotado
- transição de cor permitida apenas em `border-color` e `color`, máx `120ms linear`

## estrutura HTML

```html
<button class="btn">SCAN</button>
<button class="btn btn--destructive">ABORT</button>
<button class="btn btn--ghost">CANCEL</button>
<button class="btn" disabled>OFFLINE</button>
```

## referência

ver `button.html`.
