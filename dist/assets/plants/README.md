# Plant Image Assets — Farmácia Viva em Rede

## Directory Convention

```
public/assets/plants/
└── {especie-slug}/          ← EspeciePlanta.slug
    ├── folha.webp
    ├── flor.webp
    ├── fruto.webp
    ├── caule.webp
    ├── raiz.webp
    ├── semente.webp
    └── habito.webp          ← visão geral da planta
```

## Naming Rules
- **Slug**: lowercase, hyphen-separated, ASCII (sem acentos), e.g. `erva-cidreira`, `boldo-brasileiro`.
- **Format**: `.webp` preferido (máx. 150 kB). Fallback `.jpg` aceito.
- **Resolution**: mínimo 800×600 px para galeria, 400×300 px para thumbnail.
- **Source**: imagens de domínio público (Wikimedia Commons, Embrapa, Herbário Virtual REFLORA).

## Covered Species (MVP)
| Slug | Nome popular | Nome científico |
|------|-------------|-----------------|
| erva-cidreira | Erva-cidreira | *Lippia alba* (Mill.) N.E.Br. |
| guaco | Guaco | *Mikania glomerata* Spreng. |
| boldo-brasileiro | Boldo-brasileiro | *Plectranthus barbatus* Andrews |
| alecrim | Alecrim | *Salvia rosmarinus* Spenn. |
| capim-santo | Capim-santo | *Cymbopogon citratus* (DC.) Stapf |
| hortela | Hortelã | *Mentha × piperita* L. |
| manjericao | Manjericão | *Ocimum basilicum* L. |
| camomila | Camomila | *Matricaria chamomilla* L. |
