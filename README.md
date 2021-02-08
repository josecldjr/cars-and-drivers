
## Carros e Motoristas

### O que é a aplicação?
Uma WebAPI para gerenciar carros e motoristas. Sendo uma API, ela deve ser testada com algum cliente de REST,  como por exemplo [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download/). Também é possivel desenvolver alguma aplicação front-end para consumir a API (cors já está desabilitado).

### Tecnologias
Foram utilizadas como tecnologias principais do projeto: Nodejs, Typescript, Nestjs(framework baseado no express), MySQL, Docker e Docker Compose. E é claro, para os testes Jest. 

Também vale informar que foi desenvolvido no Ubuntu ,VSCODE e Postman.

### Iniciando e configurando o projeto

#### Com docker:

> (Espera-se que você já tenha o docker instalado em sua máquina)

Abra o prompt de comando ou terminal na pasta raiz do projeto e execute os comandos:

Para criar os containers da API e banco:
   

     docker-compose up -d

Logo em seguida, para utilizar o bash do lado de dentro do container:

    docker exec -it app-cars-api bash

Após isso, para instalar os pacotes node:

`npm install`
E finalmente para iniciar a aplicação: 

    npm run start 

ou

    npm run start:dev

Pronto!  A aplicação está sendo inteiramente executada dentro do docker.

Obs: Caso precise alterar alguma configuração do projeto, abra o arquivo docker-compose.yaml e vá para a linha 20. As variáveis de ambiente da aplicação estão entre as linhas 21 e 27. 

#### Sem docker:

> Espera-se que você já tenha o nodejs instalado em sua máquina, e também uma instância de banco MySQL

Primeiramente configure as seguintes variáveis de ambiente em sua máquina:
- PORT / Porta da API (recomendável a 3000)
- DATABASE_HOST  / Host do Mysql
- DATABASE_NAME / Nome da base de dados
- DATABASE_USER / Nome do usuário
- DATABASE_PASSWORD / Senha do usuário
- DATABASE_PORT / Porta do banco

Após isso, vá até a pasta raiz do projeto e digite:

    npm run install

Logo em seguida:

    npm run start

ou 

    npm run start:dev


 Finalizando isso, a aplicação estará funcionando.
 Os endpoints estarão disponíveis em [endpoints.md](./endpoints.md)
Qualquer dúvida ou dificuldade, entre em contato pelo email.
Obrigado.
