# Vini Rocha Art — Site Portfólio

Site institucional/portfólio para o artista visual Vinicius Rocha, em HTML/CSS/JS puro (sem dependências de build).

## Estrutura

```
vini-rocha-art/
├── index.html          → Home (hero + galeria vertical)
├── ilustracoes.html     → Galeria completa com filtro e lightbox
├── projetos.html        → Cards de projetos/coleções
├── projeto-01.html       → Página individual: Space Hamburger
├── projeto-02.html       → Página individual: Japan Collection
├── projeto-03.html       → Página individual: Docinhos da Ana
├── contato.html          → Bio, CTA WhatsApp, Instagram/Behance/E-mail
├── css/                  → style.css (base) + 1 arquivo por página
├── js/                   → main.js (header, menu, scroll reveal) + ilustracoes.js (grid/lightbox)
└── images/               → 8 obras reais enviadas pelo cliente
```

## Como publicar

Não tem build, não tem dependências. Basta:

1. Subir a pasta inteira para qualquer hospedagem de arquivos estáticos
   (Vercel, Netlify, GitHub Pages, cPanel, etc.)
2. Garantir que `index.html` é o arquivo raiz.

Na Vercel: arraste a pasta no painel, ou rode `vercel` dentro dela via CLI.

## O que falta preencher (pontos marcados no código)

### WhatsApp (contato.html)
Procure por `id="whatsappCta"` no final do arquivo `contato.html`. Preencha o
atributo `data-whatsapp-number` com o número completo (DDI+DDD+número, só
dígitos). Exemplo:

```html
<a id="whatsappCta" data-whatsapp-number="5548999999999" ...>
```

O link `wa.me` com mensagem pré-pronta é montado automaticamente pelo JS.
Sem número preenchido, o botão cai para e-mail como fallback.

### Instagram / Behance / E-mail (contato.html)
Os três links em `.contact-list` estão com `href="#"` ou `mailto:contato@vinirochaart.com`
(placeholder). Troque pelos links reais.

### Mais ilustrações
Para adicionar novas peças à galeria de Ilustrações, edite o array
`illustrations` no início de `js/ilustracoes.js` — cada objeto vira um card
e uma entrada no lightbox automaticamente. Use `lightBg: true` se a imagem
tiver fundo claro/branco (como as peças do Docinhos da Ana).

### Mais projetos
1. Duplique um dos `projeto-0X.html` existentes.
2. Atualize título, meta tags, textos e imagens.
3. Adicione um novo card em `projetos.html` apontando para o novo arquivo.

## Imagens atuais

8 obras reais do artista já aplicadas:
- Space Hamburger (nave + Pork Ribs)
- Japan Collection (dragão, robô Barril Noodle, Mister Cup)
- Docinhos da Ana (logo, sticker, caixa)

Faltam (mencionadas mas não recebidas): Godizilla, Cat. Quando tiver os
arquivos, basta colocá-los em `images/` e seguir o mesmo padrão de inserção
usado nas outras peças (Home → galeria vertical, Ilustrações → array JS).

## Customização rápida

- Cores: variáveis CSS no topo de `css/style.css` (`:root`).
- Tipografia: Inter, carregada via Google Fonts no topo do mesmo arquivo.
- Textos institucionais: diretamente em `contato.html`.
