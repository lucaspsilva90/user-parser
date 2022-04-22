# Teste LinkApi 

## Stack

* NodeJs
* [Hapi](https://hapi.dev/api/?v=20.2.1)
* MongoDB()
* Docker

## Descrição

A aplicação pode ser dividida em duas grande funcionalidades.

1. Uma rotina de automação de conversão de dados
2. CRUD de pastas e arquivos utilizando a API GoFile

## Documentação

### Como rodar

* Criar documento .env (informacoes disponíveis neste gist privado [AQUI](https://gist.github.com/lucaspsilva90/f12d448731d7cecbeb18d68323148059)
* Executar o comando docker-compose up --build (as vezes pode ser necessário da a permissão de administrador sudo)

### Como utilizar

1. Conversão de dados
* A rotina é executada toda hora "cheia" exemplo: 13:00, 14:00, 15:00
* Também pode ser forçada ao realizar uma requisição

```curl --location --request GET 'localhost:3000/v1/users'```

2. CRUD de Pastas e arquivos API GoFile

### Criar Pasta

* Realizar requisição do com método PUT para o endpoint localhost:3000/v1/goFile/folder contendo um JSON com nome da pasta ```"{ folderName": "string" }```

#### Exemplo
```curl --location --request PUT 'localhost:3000/v1/goFile/folder' \ --header 'Content-Type: application/json' \ --data-raw '{ "folderName": linkApi"}' ```

### Upload de Arquivo

* Realizar requisição do com método POST para o endpoint localhost:3000/v1/goFile/file/ contendo um multipart/form-data com ```"folderName"="string" ``` e ```file=@"arquivo```

#### Exemplo
``` curl --location --request POST 'localhost:3000/v1/goFile/file' \ --form 'folderName="linkApi"' \ --form 'file=@"/arquivo.jpg"'```

### Deletar Arquivo

* Realizar requisição com método DELETE para o endpoint localhost:3000/v1/goFile/file/ contendo ```{ "folderName":"string", "fileName": "string"}``` 

``` curl --location --request DELETE 'localhost:3000/v1/goFile/file' \ --header 'Content-Type: application/json' \ --data-raw '{ "folderName": "linkApi", "fileName": "arquivo.jpg"}' ```

## RoadMap

1. Adicionar validação nas requsições
2. Adicionar documentção via swagger
3. Criar rotina de criação de arquivos e upload para o GoFile