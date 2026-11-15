# Oficina de Gestão Ambiental

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

Site da oficina para a disciplina de Gestão Ambiental na USP–EACH. Cada grupo abre a reportagem do seu tema, com números da matéria, resumo rápido e link da fonte. A Carta da Juventude guarda o rascunho (diagnóstico, propostas e demandas) no próprio celular.

No ar em [gabrielteramae.github.io/gestao-ambiental](https://gabrielteramae.github.io/gestao-ambiental/).

React, a fonte e as imagens ficam no repositório. A página não depende de CDN para abrir.

## Grupos

| Grupo | Tema |
| --- | --- |
| 1 | Saúde |
| 2 | Inclusão e Vulnerabilidades |
| 3 | Educação |
| 4 | Políticas Públicas e Participação |
| 5 | Trabalho e Economia |
| 7 | Comunicação e Consciência |

Não há grupo 6 neste roteiro. O 7 segue a numeração da atividade.

## Stack

- React 18 (UMD, sem build e sem bundler)
- JavaScript (ES6+)
- CSS com variáveis, safe area e `prefers-reduced-motion`
- Inter, arquivo local

## Estrutura

```text
index.html
styles.css
script.js
data.js
vendor/
  react.production.min.js
  react-dom.production.min.js
  inter-latin.woff2
qr.png
icone-play.png
pixel.mp4
```

## Como rodar

O jeito previsto é o GitHub Pages. Para ver na máquina:

```bash
git clone https://github.com/gabrielteramae/gestao-ambiental.git
cd gestao-ambiental
python3 -m http.server 8080
```

Abra `http://localhost:8080`. Dá para abrir o `index.html` direto no navegador; o rascunho da carta usa `localStorage` e fica mais confiável servido por HTTP.

© 2026 Gabriel Teramae Chan
