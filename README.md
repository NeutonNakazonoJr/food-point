# food-point
Plataforma de planejamento de eventos gatronômicos.

## Ferramentas utilizadas
- Figma
- Github
- Linux
- Trelo
- PgAdmin4


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

#### Regras de Validação dos Dados do Usuário

Para garantir a integridade dos dados do usuário, são aplicadas as seguintes regras de validação:

**Nome Completo:**
Deve conter apenas letras e espaços.
Deve ser fornecido e não pode estar vazio.

**Email:**
Deve ser um endereço de email válido.
Deve ser fornecido e não pode estar vazio.

**Senha:**
Deve conter no mínimo 8 caracteres.
Deve incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.

**Aqui estão as expressões regulares utilizadas para validar os dados:**

- Expressão Regular para Nome Completo: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/
- Expressão Regular para Email: joi.string().email(), uso da lib Joi
- Expressão Regular para Senha: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/