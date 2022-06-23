# Quasar App (storeapp)

A Quasar Project

Projeto desenvolvido para oportunidade na companhia M2 Digital.
A ideia consiste em apresentar 3 produtos, plano de internet, televisão e telefone fixo.
Foi utilizado a lib json-server para criar uma api fake com os produtos.

Foi utilizado a vuex para centralizar os endpoints e fazer o gerenciamento de estado das variáveis.
Utilizamos também axios para fazer os request.

Conseguimos clicar nos produtos para adicionarmos ao carrinho de compra. A soma do total é feita conforme adicionamos ou alteramos cada produto do carrinho. Não é possível adicionarmos mais de um produto da mesma categoria. Os produtos de telefonia e televisão só são adicionado após ter escolhido um plano de internet.

Para instalar as dependências, rodamos o npm install, após as dependências estarem instaladas, podemos rodar npm run json para subir a api fake e para rodar o projeto rodamos quasar dev.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run json
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
