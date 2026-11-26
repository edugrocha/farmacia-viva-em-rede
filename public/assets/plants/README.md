# Plant Image Assets — Farmácia Viva em Rede

Imagens de espécies vegetais organizadas por slug em `public/assets/plants/{slug}/`.

## Convenção

- **Pasta**: `{especie-slug}` (ex.: `alecrim`, `erva-cidreira`, `boldo-brasileiro`)
- **Arquivos**: nomes exatamente como estão no disco (case-sensitive)
- **Formatos**: `.jpg` e `.png`
- **Mapeamento**: definido em `src/data/mocks/imagensEspecies.ts` (fonte única da verdade)

## Espécies com imagens

| Slug | Arquivos |
|------|----------|
| alecrim | alecrim1.jpg, alecrim2.jpg |
| boldo-brasileiro | boldo1.jpg, boldo2.jpg |
| camomila | camomila1.jpg, camomila2.jpg |
| capim-santo | capimsanto1.jpg, capimsanto2.jpg |
| erva-cidreira | ervacidreira1.jpg |
| guaco | Guaco1.png |
| hortela | hortela1.jpg, hortela2.jpg |
| manjericao | manjericao1.jpg, manjericao2.jpg |

Camomila, manjericão e outras espécies listadas no README do projeto podem não ter imagem ainda — o componente exibe um placeholder quando não houver arquivo disponível.
