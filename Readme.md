## Buffet App

#### Objetivo

A aplicação é um sistema full stack que monitora os pesos registratos por balanças de um buffet e faz o registro automático das refeições, indicando se a refeição será classificada como "Buffet por quilo" ou "Buffet livre".

#### Tecnologias e Ferramentas

- [Node.Js](https://nodejs.org/en)
- [Angular](https://angular.dev/)

#### Pré requisitos para rodar o projeto

- Node.Js (versão >= 18.19)
- [Socat](https://linux.die.net/man/1/socat)

#### Rodando o projeto localmente

Clone este repositório

        git clone git@github.com:larissaperinoto/buffet-app.git

Instale as dependências

        npm run install

Inicie a aplicação do cliente

        npm run start:app

Inicie o simulador de balança

        npm run start:scale

Dentro de **/server** se encontra o arquivo **.env-example** com a configuração abaixo

        SOCKET_PORT=3001
        DETECTION_INTERVAL=4000
        PER_KG_BUFFET_PRICE=59.90
        OPEN_BUFFET_PRICE=29.90
        SCALE_1_PATH=/dev/ttyScale

Renomeie o arquivo para **.env**. Caso seja necessário, ajuste os valores do buffet por kg (PER_KG_BUFFET_PRICE) e buffet livre (OPEN_BUFFET_PRICE)

Na raiz do projeto, inicie o servidor com o comando abaixo

        npm run start:server

Abra em seu navegador o endereço abaixo e acompanhe as pesagens

        http://localhost:4200

---

Desenvolvido por [Larissa Perinoto](https://www.linkedin.com/in/larissaperinoto).
