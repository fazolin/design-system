# design-system

identidade visual e código compartilhado entre fazolin.com, o portal interativo e a série de works. não roda — é documento. agentes leem aqui antes de produzir qualquer coisa em qualquer repo de fazolin.

## prompt pra um agente novo

cola o bloco abaixo no início da conversa com qualquer agente (Claude Code, Claude.ai, ChatGPT, Cursor, Copilot Chat). ele puxa o CLAUDE.md e segue as regras pelo resto da sessão.

```
Você vai trabalhar dentro do universo visual fazolin.com. Antes de qualquer
resposta, leia obrigatoriamente:

  https://raw.githubusercontent.com/fazolin/design-system/main/CLAUDE.md

Esse arquivo define paleta (4 cores), tipografia (Oswald 700 + JetBrains
Mono 500), anti-padrões, vocabulário de motion (fx-flash, fx-jitter,
fx-alive) e a regra de interface vs interior da obra.

Tudo que você produzir relacionado a interface (UI, loading, error, HUD,
navegação, layouts, componentes) segue essas regras sem exceção. O
interior da obra (canvas, áudio-reativo, point cloud) pode quebrar tudo,
mas a interface ao redor é coerente.

Leia sob demanda quando precisar de mais detalhe:
  https://raw.githubusercontent.com/fazolin/design-system/main/docs/visual-language.md
  https://raw.githubusercontent.com/fazolin/design-system/main/docs/works-checklist.md
  https://raw.githubusercontent.com/fazolin/design-system/main/docs/manifesto.md

Componentes prontos (spec + referência HTML):
  https://github.com/fazolin/design-system/tree/main/components

Tokens importáveis:
  https://raw.githubusercontent.com/fazolin/design-system/main/tokens/colors.css
  https://raw.githubusercontent.com/fazolin/design-system/main/tokens/typography.css
  https://raw.githubusercontent.com/fazolin/design-system/main/tokens/glitch.css

Confirme que leu o CLAUDE.md antes de continuar e me diga em uma frase
qual é a regra principal que você vai seguir.
```

a última linha é diagnóstica: se o agente não consegue fetchar a URL, ele inventa uma resposta genérica — aí você sabe que precisa colar o conteúdo do CLAUDE.md manualmente.

### variante curta (mid-conversa)

```
Antes de continuar, leia
https://raw.githubusercontent.com/fazolin/design-system/main/CLAUDE.md
e siga essas regras pra qualquer interface ou componente daqui em diante.
```

### se o agente não tem acesso à web

abre o CLAUDE.md e cola o conteúdo inteiro no chat, prefixado com:

```
Use estas regras pra tudo que produzir nesta sessão. Não invente exceções.
```

### dentro de um repo de work clonado

no `CLAUDE.md` da raiz do repo da work, deixa a primeira seção referenciando o design-system:

```markdown
# work / nome

## design-system (leitura obrigatória)
https://raw.githubusercontent.com/fazolin/design-system/main/CLAUDE.md

regras de interface seguem o link acima. interior da obra pode quebrar tudo.

## interior — regras desta work
[...]
```

Claude Code lê o CLAUDE.md local em toda sessão, então toda sessão começa com o design-system carregado.

---

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

## links

- vitrine ao vivo: https://fazolin.github.io/design-system/
- repo: https://github.com/fazolin/design-system.git
