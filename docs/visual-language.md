# visual-language

referência de aplicação. complementa `CLAUDE.md` com regras concretas de quando usar o quê.

## cor — quando aplicar cada uma

### void (#000000)

- background de toda página, sempre
- background de qualquer canvas, sempre
- texto sobre signal sólido (ex: botão pressionado), única exceção válida pra texto

### signal (#F0F0F0)

- texto base, qualquer tamanho
- borda de input, botão, container estrutural
- traço fixo (linha que não responde a estado)

### mesh (#00FFFF)

- valor numérico em movimento (slider, contador, FPS)
- foco de teclado (outline)
- estado scanning / streaming / active
- linha de scanline em loading
- conteúdo de canvas que representa dado vivo

### corrupt (#FF0033)

- erro real (câmera negada, fetch failed, gpu insuficiente)
- hover em ação destrutiva (delete, reset, abort)
- pico em audio-visualizer acima do threshold
- glitch intencional como obra (não decoração)

### dim variants

- `mesh-dim` (mesh @ 0.4) — bordas decorativas que precisam existir mas não competir com dado vivo (separadores entre seções)
- `corrupt-dim` (corrupt @ 0.5) — picos secundários em audio-visualizer, ou vermelho de fundo em alerta sustentado

## tipografia — hierarquia

| tamanho | fonte | uso típico |
|---|---|---|
| 70–120px | display | wordmark FAZOLIN, hero da work |
| 32–48px | display | título de work em página |
| 18–24px | display ou HUD | subtítulo de work, intro de seção |
| 14–16px | HUD | corpo curto, valor importante |
| 12px | HUD | label, status, parâmetro |
| 10–11px | HUD | metadata, timestamp, footer |

regra geral: se é dado, HUD. se é nome próprio (work, artista, repo), display.

## espaçamento

não há sistema de spacing scale. cada componente declara seus valores localmente. evite padronizar — o ritmo de cada interface é parte da composição.

referências comuns que aparecem repetidas:
- gap entre items HUD horizontais: 24px
- gap entre items vertical em forma de lista: 14px
- padding de container principal: 56–64px
- gap entre label e input: 14px
- gap entre status dot e label: 12px

quando em dúvida: múltiplos de 4 ou 8.

## linhas e bordas

- toda borda é 1px sólida. nunca 2px estrutural, nunca dashed/dotted.
- toda borda é color literal (signal, mesh, corrupt) ou 0.X opacity sobre signal.
- separadores entre seções: 1px solid `mesh-dim` se a seção é HUD, 1px solid `signal` em opacity 0.12 se neutro.
- nunca `border-radius` acima de 0. exceção raríssima: 1px em casos onde o pixel exato falha em devices high-DPI; nunca acima de 2px.

## motion vocabulary

referenciar `tokens/glitch.css`. três efeitos canônicos:

- `fx-flash` — RGB-split de 80ms. uso: hover de botão, confirmação de input.
- `fx-jitter` — translate 1px em 4 steps, 60ms. uso: active de botão, transição de estado.
- `fx-alive` — pulso ocioso assimétrico, 12s loop. uso: wordmark, status, headings de work. proibido em UI de ação.

durações fora desse vocabulário só com justificativa clara (ex: scan da loading, pulse do recording).

## iconografia

não há ícones. nem material icons, nem feather, nem heroicons, nem nada. se um conceito precisa de representação visual, use:

1. label HUD textual
2. ponto quadrado de status
3. forma geométrica simples desenhada in-line via CSS ou SVG (linha, quadrado, asterisco, plus)

ícones decorativos são proibidos. ícones funcionais que substituem leitura também.

## imagens

- nunca stock photography
- nunca render 3D fofo
- imagens permitidas: feed de câmera ao vivo, screenshot de canvas de obra, point-cloud, datamosh exportado. tudo gerado pela própria prática.
- toda imagem em fundo void. zero crop circular ou rounded.

## composição

- páginas tendem ao vazio. áreas largas pretas são desejáveis — espaço de respirar.
- alinhamentos rígidos. tudo a uma grid mental. nada centrado por reflexo — só centra quando faz sentido (hero único, modal pequeno).
- texto e dado vivem em colunas distintas quando possível. dado à direita, label à esquerda.
- uma página pode ter um único elemento. é OK.
