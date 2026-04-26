# works-checklist

checklist obrigatório antes de publicar qualquer work no domínio fazolin.com. se algum item falha, a work não publica.

## identidade visual

- [ ] background `#000000` em todos os contextos (incluindo loading state)
- [ ] paleta restrita: void, signal, mesh, corrupt — nenhuma cor adicional
- [ ] tipografia: Oswald 700 para display + JetBrains Mono 500 para HUD — nada além
- [ ] zero `border-radius` acima de 2px
- [ ] zero gradiente em qualquer lugar
- [ ] zero ícone decorativo
- [ ] zero spinner em loading state

## metadados

- [ ] `meta.json` na raiz da work com:
    - `title` (uppercase, formato `WORK_NAME` ou `00_WORK_NAME`)
    - `slug` (kebab-case)
    - `year`
    - `tools` (lista: webcam, audio, glsl, etc.)
    - `references` (lista de IDs de `docs/references.md` ou URLs externas)
    - `dependencies` (libs específicas: mediapipe, three, p5, etc.)
- [ ] `README.md` com:
    - conceito em ≤ 400 palavras
    - técnica usada
    - referências específicas (não a lista genérica)
    - link de volta pra fazolin.com

## experiência

- [ ] tela inicial / call-to-action quando obra exige permissão (câmera, áudio, fullscreen). nunca depender só do popup nativo.
- [ ] loading state estilizado conforme `components/loading.md`
- [ ] estado de erro em cada ponto de falha real (permissão negada, dispositivo ausente, fetch falhou) usando `corrupt`
- [ ] HUD opcional desligável via tecla `H` quando presente
- [ ] obra reage a interação (mouse, áudio, câmera, dado) — sem interação a obra é estática mas não vazia

## acessibilidade

- [ ] `prefers-reduced-motion: reduce` desliga ou substitui glitch — versão estática deve fazer sentido sozinha
- [ ] foco de teclado visível (outline 1px mesh, offset 2–4px)
- [ ] aria-label nos elementos não textuais que comunicam função (botão de início, controles)
- [ ] contraste suficiente em todo texto sobre fundo void (signal sempre OK; mesh OK; corrupt OK; mesh-dim/corrupt-dim NÃO para texto)

## performance

- [ ] 30fps mínimo em hardware low-tier — testado com `utils/detect-gpu.ts`
- [ ] 60fps alvo em hardware médio
- [ ] fallback estático ou simplificado para `tier === 'low'` ou `'none'`
- [ ] sem memory leak após 10min de execução (testar com Performance > Memory)
- [ ] todas as texturas, samplers, audioContexts liberados em `cleanup()`

## mobile

- [ ] mobile sempre tem comportamento decidido. três opções aceitáveis:
    1. versão adaptada (interação por touch / mic / accelerometer)
    2. versão estática (frame final renderizado)
    3. tela de aviso explicando que a work é desktop-only — em HUD, nunca apologética
- [ ] viewport meta tag presente
- [ ] zero scroll horizontal involuntário

## tecnico

- [ ] tokens importados de `design-system/tokens` — zero valor hardcoded de cor ou fonte
- [ ] componentes reutilizam specs de `design-system/components/` — zero variação visual sem justificativa documentada
- [ ] shaders importados ou copiados de `design-system/shaders/` quando aplicável
- [ ] `CLAUDE.md` da work referencia o `design-system/CLAUDE.md` no topo
- [ ] build de produção sem warnings de console relevantes
- [ ] sourcemaps desativados em produção se há código autoral sensível

## meta

- [ ] commit do work pushado
- [ ] PR ou anúncio em fazolin.com index
- [ ] entrada adicionada em `fazolin.com/works/`
- [ ] post no canal social escolhido (ou nenhum — silêncio também é resposta)

---

a checklist falha barulhentamente: se algum item não está claro, **a work não está pronta**. ambiguidade é sinal de que falta uma decisão.
