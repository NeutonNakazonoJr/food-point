## Documentação dos Endpoints API

### Cadastrar um Novo Usuário

**Descrição:** Este endpoint permite cadastrar um novo usuário.

- **URL:** `/user`
- **Método HTTP:** POST
- **Corpo da Requisição (JSON):**
  ```json
  {
    "fullname": "Nome completo do usuário (string)",
    "email": "email@example.com (string)",
    "password": "Senha do usuário (string)"
  }

- **response 201 (JSON):**
  ```json
  {
    "message": "Usuário cadastrado com sucesso"
  }

- **response 400 (JSON):**
  ```json
  {
	  "error": "O nome completo deve conter apenas letras"
  }

- **response 500 (JSON):**
  ```json
  {
	  "error": "Erro interno no servidor",
  }

#### Regras de Validação dos Dados do Usuário

Para garantir a integridade dos dados do usuário, são aplicadas as seguintes regras de validação:

**fullname:**
Deve conter apenas letras e espaços.
Deve ser fornecido e não pode estar vazio.

**Email:**
Deve ser um endereço de email válido.
Deve ser fornecido e não pode estar vazio.

**password:**
Deve conter no mínimo 8 caracteres.
Deve incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.

**Aqui estão as expressões regulares utilizadas para validar os dados:**

- Expressão Regular para fullname: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/
- Expressão Regular para email: joi.string().email(), uso da lib Joi
- Expressão Regular para password: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


### Atualizar Informações do Usuário

**Descrição:** Este endpoint permite atualizar as informações nome completo e email do usuário.

- **URL:** `/user`
- **Método HTTP:** PATCH
- **cookie:** session_token
- **Corpo da Requisição (JSON):**  

  
  - Exemplo 1 (Atualização de Nome Completo):
    ```json
    {
      "fullname": "Solange Aragão"
    }
    ```

  - Exemplo 2 (Atualização de Nome Completo e Email):
    ```json
    {
      "fullname": "Solange Aragão",
      "email": "solange_aragao@hotmail.com"
    }
    ```

- **response 200 EX (JSON):**
    ```json
    {
      "message": "Informação atualizada com sucesso",
      "updatedInfos": {
        "fullname": "Solange Aragão"
      }
    }
    ```

    ```json
    {
      "message": "Informação atualizada com sucesso",
      "updatedInfos": {
        "fullname": "Solange Aragão",
        "email": "solange_aragao@hotmail.com"
      }
    }
    ```

- **response 400 EX (JSON):**
    ```json
    {
      "error": "ID inválido."
    }
    ```

- **response 404 EX (JSON):**
    ```json
    {
      "error": "Usuário não encontrado."
    }
    ```

- **response 500 (JSON):**
    ```json
    {
      "error": "Erro interno no servidor"
    }
    ```

#### Regras de Validação dos Dados do Usuário

Ao atualizar as informações do usuário, são aplicadas as seguintes regras de validação:
- **id:** 
  - Id deve ser válido e registrado no banco.

- **Nome Completo:**
  - Deve conter apenas letras e espaços.

- **Email:**
  - Deve ser um endereço de email válido.

As informações são atualizadas com sucesso apenas se estiverem em conformidade com essas regras.

### Atualizar Senha do Usuário

**Descrição:** Este endpoint permite atualizar a senha de um usuário existente.

- **URL:** `/user`
- **Método HTTP:** PUT
- **cookie:** session_token
- **Corpo da Requisição (JSON):**  

  - Exemplo de Entrada:
    ```json
    {
      "password": "aAbB123@"
    }
    ```

- **response 200 (JSON):**
    ```json
    {
      "message": "Senha atualizada com sucesso"
    }
    ```

- **response 400 (JSON):**
    - Exemplo 1:
    ```json
    {
      "error": "A senha deve possuir 8 caracteres"
    }
    ```
    - Exemplo 2:
    ```json
    {
      "error": "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    }
    ```

#### Regras de Validação da Senha

Ao atualizar a senha do usuário, são aplicadas as seguintes regras de validação:

- A senha deve conter no mínimo 8 caracteres.
- Deve incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.

O regex utilizado para validação da senha é o seguinte:

```regex
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
```

### Login

**Descrição:** Este endpoint permite o usuário logar no sistema.

- **URL:** `/login`
- **Método HTTP:** POST
- **Corpo da Requisição (JSON):** 

  ```json
    {
      "email": "email@example.com (string)",
      "password": "aB1231!x (string)"
    }
  ```

- **response 200 (JSON):**
  ```json
  {
    "success": true "Retorno do token com o id do usuário pelo cookie session_token, options cookie:  Max-Age=28800;  HttpOnly; SameSite=Strict"
  }
  ```

- **response 400 (JSON):**
  ```json
  {
	  "error": "A senha deve posssuir 8 caracteres"
  }
  ```

- **response 401 (JSON):**
```json
  {
	  "error": "Email e/ou Senha inválido"
  }
```

- **response 500 (JSON):**
  ```json
  {
	  "error": "Erro interno no servidor",
  }
  ```