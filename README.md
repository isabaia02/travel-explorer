# Travel Explorer

Aplicação web desenvolvida em React para explorar países e suas principais informações, utilizando a API REST Countries. A aplicação permite pesquisar países, filtrar por região e idioma e ordenar os resultados.

## API externa

[REST Countries API](https://restcountries.com/docs/countries)

## Tecnologias

- React
- Vite
- Material UI (MUI) — biblioteca React utilizada para os componentes da interface
- CSS
- JavaScript / JSX

### Hook utilizado

O projeto utiliza o hook **`useMemo`** do React para memorizar a lista de países após a aplicação da ordenação, evitando recalcular a ordenação quando ela não é necessária.

## Estrutura do projeto

```text
src/
├── components/
│   ├── CountryCard/
│   ├── CountryGrid/
│   ├── SearchBar/
│   ├── RegionFilter/
│   ├── LanguageFilter/
│   ├── SortSelect/
│   ├── Loading/
│   ├── ErrorState/
│   └── EmptyState/
│
├── services/
│   └── countriesApi.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx

.env
.env.example
.gitignore
index.html
package.json
vite.config.js
```

- **`components/`**: componentes reutilizáveis da interface.
- **`services/countriesApi.js`**: comunicação com a API REST Countries.
- **`App.jsx`**: componente principal e gerenciamento dos estados da aplicação.
- **`.env`**: configuração do token da API.

## Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar o `.env`

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_REST_COUNTRIES_TOKEN=seu_token_aqui
```

O token deve ser obtido na API REST Countries.

> O arquivo `.env` não deve ser versionado. O projeto já possui regras no `.gitignore` para arquivos de ambiente.

### 3. Iniciar a aplicação

```bash
npm run dev
```

Depois, acesse a URL exibida pelo Vite no terminal.