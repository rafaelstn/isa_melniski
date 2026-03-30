# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Site portfólio/landing page da piloto de automobilismo **Isabelly Melniski**, em transição do kart para Fórmula (F4/F3). O site é estático, sem framework — HTML + CSS + JS vanilla.

## Estrutura

```
index.html      — Página única com todas as seções
styles.css      — CSS completo (tokens, componentes, responsivo)
scripts.js      — Loader, nav mobile, scroll reveal, galeria slider, parallax
assets/img/     — Imagens (placeholder por enquanto)
```

## Arquitetura

- **Single-page** com smooth scroll entre seções: Hero → Sobre → Carreira → Galeria → Patrocinadores → Contato
- **CSS custom properties** em `:root` para tokens (cores, fonts, spacing)
- **Fontes**: Anton (display), Barlow Condensed (headings), Barlow (body) via Google Fonts
- **Tema**: Dark motorsport — fundo preto (`#070707`), vermelho F1 (`#e10600`) como accent
- **Scroll reveal** via IntersectionObserver (classe `.reveal` → `.visible`)
- **Galeria**: slider horizontal com translateX controlado por JS
- **Nav**: hide-on-scroll-down, show-on-scroll-up, menu mobile com overlay

## Convenções

- BEM-like naming: `.bloco__elemento--modificador`
- Seções numeradas com `.section-tag` (01, 02, 03...)
- Placeholders visuais para fotos/logos (serão substituídos por imagens reais)
- WhatsApp como CTA principal: `+55 11 97032-1190`
- Responsivo com breakpoints em 900px e 680px

## Como rodar

Abrir `index.html` direto no navegador ou usar qualquer server local:
```bash
npx serve .
# ou
python -m http.server 8000
```
