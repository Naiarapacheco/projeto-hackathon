# Instalação e preparação do ambiente

Este projeto foi desenvolvido utilizando Angular para construção da interface e Tailwind CSS para estilização rápida e moderna.

Abaixo está o passo a passo completo da preparação do ambiente e configuração inicial do projeto.

# Pré-requisitos

Antes de iniciar, é necessário possuir instalado na máquina:

Node.js

npm

Angular CLI

No ambiente utilizado neste projeto, as versões verificadas foram:

node -v
v22.20.0

npm -v
10.9.3

# Verificar se node e npm estão instalados

Execute no terminal:

node -v
npm -v

Se ambos retornarem versões, o ambiente já está pronto para continuar.

# Instalação do angular CLI

O Angular CLI é a ferramenta responsável por criar projetos Angular, rodar o servidor local e gerar componentes.

Para instalar globalmente:

npm install -g @angular/cli

Depois verifique se a instalação foi concluída corretamente:

ng version

Esse comando exibirá a versão do Angular CLI instalada.

# Criação do projeto angular

Para criar o projeto, execute:

ng new hackathon-dashboard

Durante a criação do projeto, escolha as seguintes opções recomendadas para um ambiente simples de desenvolvimento:

Pergunta	Resposta recomendada
Stylesheet format	CSS
Enable SSR / SSG	No
Zoneless application	No

Após a criação do projeto, acesse a pasta:

cd hackathon-dashboard

# Estrutura inicial do projeto

Após a criação, o Angular gera automaticamente a seguinte estrutura:

hackathon-dashboard/
├── .vscode/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

# Explicação dos arquivos principais
Arquivo / Pasta	Função
.vscode/	Configurações do editor VS Code
node_modules/	Dependências instaladas pelo npm
public/	Arquivos estáticos acessíveis publicamente
src/	Código principal da aplicação
src/app/	Componentes e lógica da aplicação
src/index.html	Página base onde o Angular é carregado
src/main.ts	Ponto de entrada da aplicação Angular
src/styles.css	Estilos globais da aplicação
angular.json	Configuração de build e execução do Angular
package.json	Dependências e scripts do projeto
tsconfig.json	Configuração global do TypeScript

# Rodar o projeto localmente

Para iniciar o servidor local:

ng serve

Ou para já abrir no navegador automaticamente:

ng serve --open

A aplicação estará disponível em:

http://localhost:4200

# Instalação do Tailwind CSS

Para estilização da interface foi utilizado Tailwind CSS, instalado diretamente no projeto.

Instalar dependências
npm install tailwindcss @tailwindcss/postcss postcss

# Configuração do PostCSS

Na raiz do projeto, crie o arquivo:

.postcssrc.json

Conteúdo do arquivo:

{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}

Esse arquivo permite que o Angular processe as classes do Tailwind durante o build do projeto.

# Importar Tailwind no CSS global

Abra o arquivo:

src/styles.css

Adicione:

@import "tailwindcss";

Isso ativa o Tailwind globalmente em toda a aplicação.

# Criação do Componente da dashboard

Para criar o componente principal da aplicação:

ng generate component dashboard

ou a forma abreviada:

ng g c dashboard

Esse comando cria automaticamente os arquivos necessários para o componente.

# Estrutura do componente criado

Após executar o comando, será criada a seguinte estrutura:

src/app/dashboard/
├── dashboard.ts
├── dashboard.html
├── dashboard.css
└── dashboard.spec.ts

# Resumo dos comandos utilizados para preparar o projeto:

node -v
npm -v

npm install -g @angular/cli
ng version

ng new hackathon-dashboard
cd hackathon-dashboard

ng serve --open

npm install tailwindcss @tailwindcss/postcss postcss

ng generate component dashboard

# Motivo da escolha do Tailwind

Foi escolhido Tailwind CSS instalado diretamente no projeto em vez de utilizar CDN.

Principais vantagens:

melhor integração com Angular

ambiente mais profissional

melhor controle de dependências

compatível com build e deploy

maior desempenho em produção