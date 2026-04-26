# slider

input numérico contínuo. valor sempre visível ao lado em HUD/mesh. zero label acima — label vai em texto separado, fora do componente.

## anatomia

- track: 1px de altura, `var(--color-signal)` a 20% opacity (`rgba(240,240,240,0.2)`)
- track preenchido (esquerda do thumb): `var(--color-mesh)`
- thumb: quadrado 8×8px, sólido `var(--color-mesh)`. zero `border-radius`.
- valor numérico: `var(--font-hud)` 500, 12px, `var(--color-mesh)`, alinhado à direita do track, padding 12px do thumb. 4 colunas mínimas (ex: `0.50`, `120 `, `0.872`).

## estados

| estado | mudança |
|---|---|
| **default** | thumb mesh, track signal-dim, fill mesh |
| **hover** thumb | thumb vira `corrupt`, valor numérico vira `corrupt`. dispara `fx-flash` no valor. |
| **active** (drag) | thumb continua mesh, mas dispara `fx-jitter` 1× no início do drag. valor atualiza em tempo real. |
| **focus-visible** | outline 1px mesh no thumb, offset 2px |
| **disabled** | tudo a 0.3 opacity, cursor `not-allowed` |

## anti-padrões aplicados

- thumb sem `border-radius`
- track sem gradiente — corte exato no fill
- sem tooltip ou popover decorativo
- sem ícone min/max
- sem ticks decorativos (ticks funcionais sim, em casos específicos, sempre `var(--color-signal)` 20%)

## estrutura HTML sugerida

```html
<div class="slider">
    <input type="range" min="0" max="100" value="50" class="slider__track">
    <span class="slider__value">50</span>
</div>
```

## referência

ver `slider.html`.
