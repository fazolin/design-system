# input

campo de texto. zero crômio decorativo. só border-bottom. cursor é quadrado piscando.

## anatomia

- background: `transparent`
- border-top, border-left, border-right: `0`
- border-bottom: `1px solid var(--color-signal)`
- padding: `8px 0` (sem padding lateral — alinha com a baseline visual da página)
- font: `var(--font-hud)` 500, `14px`, `var(--color-signal)`
- letter-spacing: 0.05em
- caret: customizado, quadrado 6×12px piscando linearmente

## estados

| estado | mudança |
|---|---|
| **default** | border-bottom signal |
| **focus** | border-bottom vira `var(--color-mesh)`. caret também mesh. |
| **filled** | mesma coisa que default mas com texto |
| **invalid** | border-bottom vira `var(--color-corrupt)`. valor permanece signal. |
| **disabled** | opacity 0.3, cursor not-allowed |

## placeholder

- `var(--color-signal)` a 20% opacity
- nunca em itálico
- mesmo tracking do texto

## label e helper

- label: HUD 11px, uppercase, letter-spacing 0.18em, opacity 0.6, acima do input com 14px de gap
- helper text: HUD 11px, signal a 50% opacity, abaixo com 8px de gap
- erro: HUD 11px, `corrupt`, abaixo

## anti-padrões aplicados

- zero `border-radius`
- zero floating label animado
- zero ícone embutido (search, clear etc.)
- zero `box-shadow` no focus
- caret nunca animado com easing curvado — `steps(2, end)` ou `linear` no opacity blink

## estrutura HTML

```html
<div class="field">
    <label class="field__label">HOSTNAME</label>
    <input type="text" class="input" placeholder="fazolin.com">
    <span class="field__helper">resolves via dns</span>
</div>
```

## referência

ver `input.html`.
