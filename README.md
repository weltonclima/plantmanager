<img src="./.github/assets/plantmanager-updated.svg" />

<p align="center">
  <a href="#page_facing_up-descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#art-Layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#clipboard-Funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#closed_book-instalação">Instalação</a>
</p>

## :page_facing_up: Descrição
O Plant Manager é um app para lembrar as pessoas de regar as suas plantinhas.

## :art: Layout
Você pode acessar o Layout pelo <a href="https://www.figma.com">Figma<a> atravês <a href="https://www.figma.com/file/sPtgdHw6gl5iCtOmauO1y1/PlantManager-(Copy)?node-id=0%3A1">desse link<a>.

## 🛠 Tecnologias
Este projeto foi desenvolvido com as seguintes tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lottie React Native](https://docs.expo.io/versions/latest/sdk/lottie/)

## :clipboard: Funcionalidades
- [x] Fazer autenticação com o nome.
- [x] Selecionar planta para ser lembrado de regar.
- [x] Escolher horário para ser lembrado de regar a planta.
- [x] Receber uma notificação lembrando você de regar a planta no horário que você escolheu.
- [x] Remover plantas.
- [x] Todos os dados são salvos no Local Storage do dispositivo.


## :closed_book: Instalação

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Expo](https://expo.io/), Um dispositivo físico ou um emuldador, Baixe o Expo Client no seu dispositivo para [IOS](https://apps.apple.com/br/app/expo-go/id982107779) ou [Android](https://play.google.com/store/apps/details?id=host.exp.exponent), Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

```bash
# Clone este repositório.
$ git clone https://github.com/weltonclima/plantmanager.git

# Vá para a pasta plantmanager
$ cd plantmanager

# Instale as dependências
$ npm install 

# Execute aplicação
$ npm run start

# Leia o Código QR com Expo Client que você baixou no seu dispositivo, não se esqueça de colocar o seu endereço ip lan no diretório ./src/services/api na baseURL.
```
