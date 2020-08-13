# Desenvolvimento de uma API RESTful com NodeJS + Express & MongoDB
Back-end de aplicação para conectar usuários clientes com profissionais autônomos da cidade de Garanhuns. 
A premissa deste aplicativo é que muitas pessoas procuram tais profissionais com frequência e por diversos motivos, como fazer uma reforma em casa.
Em geral, as pessoas tendem a recorrer a amigos, vizinhos ou parentes próximos em busca de certo profissional, como encanador ou marceneiro, por exemplo. 
No entanto, o cliente não sabe do portfolio do profissional e de outros trabalhos já feitos pelo mesmo, bem como se é bem avaliado pela maioria de seus trabalhos.
Tal aplicativo visa facilitar essa interação cliente-profissional para melhor avaliação antes da contratação do serviço.

## Ferramentas utilizadas:

- NodeJS
- ExpressJS
- CORS
- MongoDB;
- Docker (containerização de Banco de Dados);
- Visual Studio Code
- Mongoose;
- JSON data (para retornar os dados);
- ESLint & Prettier (Qualidade de código).

## Rotas

### Profissional

  ROTA                            |     HTTP(Método)   |      Descrição            | 
-------------------------         | -----------------  | ---------------------     |
/api/freelancers                  |     GET            | Selecionar Todos          | 
/api/freelancers                  |     POST           | Criar profissional        | 
/api/freelancers/:id              |     GET            | Selecionar Por ID         | 
/api/freelancers/:id              |     PUT            | Atualizar Por ID          |    
/api/freelancers/:id              |     DELETE         | Excluir Por ID            |
/api/freelancers/service/:service |     GET            | Selecionar por serviço    |

### Usuário

  ROTA                            |     HTTP(Método)   |      Descrição            | 
-------------------------         | -----------------  | ---------------------     |
/api/users                        |       GET          | Selecionar Todos          | 
/api/users                        |       POST         | Criar Usuário             | 
/api/users/:id                    |       GET          | Selecionar Por ID         | 
/api/users/:id                    |       PUT          | Atualizar Por ID          |    
/api/users/:id                    |       DELETE       | Excluir Por ID            |
/api/users/photo/:id              |       PUT          | Inserir Foto (opcional)   |
/api/users/photo/update/:id       |       PUT          | Atualizar Foto por ID     |