erDiagram
    USERS {
        int id PK
        string nome
        string email
        string senha_hash
        enum perfil "ADMIN, MEDICO, CLIENTE"
        string foto "URL Cloudinary"
        boolean email_verificado
    }

    PETS {
        int id PK
        int dono_id FK
        string nome
        string especie
        string raca
        int idade
        float peso
        string tutor "Nome Responsável"
        string foto "URL Cloudinary"
    }

    SERVICOS {
        int id PK
        string nome
        string descricao
        float preco
    }

    AGENDAMENTOS {
        int id PK
        int usuario_id FK
        int pet_id FK
        int servico_id FK
        string data_hora
        string observacoes
    }

    %% Relacionamentos
    USERS ||--o{ PETS : "possui"
    USERS ||--o{ AGENDAMENTOS : "agenda"
    PETS ||--o{ AGENDAMENTOS : "recebe"
    SERVICOS ||--o{ AGENDAMENTOS : "contém"