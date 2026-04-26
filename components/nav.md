# nav

navegação. lista de links em HUD. zero ícone, zero underline, zero borda. hover usa `fx-flash` mais corrupt sutil.

## anatomia

- container: `display: flex` ou `grid`
- gap entre items: 24px (horizontal) ou 14px (vertical)
- cada item:
    - font: HUD 12px, weight 500, uppercase, letter-spacing 0.16em
    - color: `var(--color-signal)`
    - text-decoration: none
    - cursor: pointer
    - padding: 4px 0
    - sem borda, sem background

## estados

| estado | mudança |
|---|---|
| **default** | signal |
| **hover** | vira `corrupt`. dispara `fx-flash` 1×. |
| **active / current** | vira `mesh`. nada mais — sem underline, sem ponto antes. |
| **focus-visible** | outline 1px mesh, offset 4px |
| **disabled** | opacity 0.3, pointer-events none |

## variantes

- `.nav--horizontal` (default) — items lado a lado
- `.nav--vertical` — coluna, gap 14px
- `.nav--counter` — cada item prefixado por contador HUD `01_`, `02_`, etc., em mesh-dim. uso: índice de works.

## anti-padrões aplicados

- zero hover com underline ou border-bottom
- zero ícone à esquerda do texto
- zero badge / pill
- zero menu suspenso ou hambúrguer no desktop. mobile: lista vertical sempre.
- zero animação de slide ou collapse

## estrutura HTML

```html
<nav class="nav nav--horizontal">
    <a class="nav__item" href="/">HOME</a>
    <a class="nav__item nav__item--current" href="/works">WORKS</a>
    <a class="nav__item" href="/manifesto">MANIFESTO</a>
    <a class="nav__item" href="/contact">CONTACT</a>
</nav>
```

## referência

ver `nav.html`.
