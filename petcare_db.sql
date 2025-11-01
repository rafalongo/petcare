-- ==========================================================
-- PETCARE_DB - Estrutura completa com dados iniciais
-- Stack: MySQL 8+
-- ==========================================================

-- Criação do banco
DROP DATABASE IF EXISTS petcare_db;

CREATE DATABASE petcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE petcare_db;

-- ==========================================================
-- Usuários
-- ==========================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================================
-- Pets
-- ==========================================================
CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    species ENUM('dog', 'cat', 'other') DEFAULT 'dog',
    breed VARCHAR(100),
    birth_date DATE,
    weight DECIMAL(5, 2),
    gender ENUM('male', 'female', 'other') DEFAULT 'other',
    photo_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- ==========================================================
-- Catálogo de Vacinas
-- ==========================================================
CREATE TABLE vaccines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    species ENUM('dog', 'cat', 'other') DEFAULT 'dog',
    recommended_age_weeks INT,
    periodicity_months INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- Vacinas aplicadas / agendadas
-- ==========================================================
CREATE TABLE pet_vaccines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    vaccine_id INT NOT NULL,
    application_date DATE,
    next_due_date DATE,
    notes TEXT,
    status ENUM(
        'pendente',
        'aplicada',
        'atrasada'
    ) DEFAULT 'pendente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
    FOREIGN KEY (vaccine_id) REFERENCES vaccines (id)
);

-- ==========================================================
-- Catálogo de Medicamentos
-- ==========================================================
CREATE TABLE medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM(
        'vermicida',
        'antipulgas',
        'antiparasitário',
        'outro'
    ) DEFAULT 'outro',
    description TEXT,
    species ENUM('dog', 'cat', 'other') DEFAULT 'dog',
    periodicity_days INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- Medicamentos aplicados / agendados
-- ==========================================================
CREATE TABLE pet_medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    medication_id INT NOT NULL,
    application_date DATE,
    next_due_date DATE,
    notes TEXT,
    status ENUM(
        'pendente',
        'aplicado',
        'atrasado'
    ) DEFAULT 'pendente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
    FOREIGN KEY (medication_id) REFERENCES medications (id)
);

-- ==========================================================
-- Lembretes automáticos
-- ==========================================================
CREATE TABLE reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT,
    title VARCHAR(150) NOT NULL,
    message TEXT,
    reminder_date DATETIME NOT NULL,
    sent BOOLEAN DEFAULT FALSE,
    channel ENUM('email', 'whatsapp', 'push') DEFAULT 'email',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE
);

-- ==========================================================
-- Anexos (exames, receitas, etc.)
-- ==========================================================
CREATE TABLE attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    type ENUM(
        'exame',
        'receita',
        'vacina',
        'outro'
    ) DEFAULT 'outro',
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE
);

-- ==========================================================
-- Perfis de usuário
-- ==========================================================
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN role_id INT,
ADD CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles (id);

INSERT INTO
    roles (name, description)
VALUES (
        'admin',
        'Full access to the system'
    ),
    (
        'manager',
        'Can manage users and data, but not system settings'
    ),
    (
        'user',
        'Standard user with basic permissions'
    );

-- ==========================================================
-- Refresh Tokens
-- ==========================================================
CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- ==========================================================
-- DADOS INICIAIS
-- ==========================================================

-- Usuários
INSERT INTO
    users (
        name,
        email,
        password_hash,
        phone,
        role_id
    )
VALUES (
        'Rafael Longo',
        'rafalongo@gmail.com',
        '$2b$10$0DgSzZkjUPKZK/G6eTzM..MR50Bls4RAGuvPEoJlQGGD4uB9XBBTa',
        '+55 11 98871-9926',
        1
    );

-- Pets
INSERT INTO
    pets (
        user_id,
        name,
        species,
        breed,
        birth_date,
        weight,
        gender,
        photo_url
    )
VALUES (
        1,
        'Moka',
        'dog',
        'Pastor Australiano',
        '2016-11-10',
        22.5,
        'female',
        'moka.jpg'
    ),
    (
        1,
        'Sol',
        'dog',
        'Podengo Português',
        '2021-11-15',
        12.0,
        'female',
        'sol.jpg'
    ),
    (
        1,
        'Beth',
        'dog',
        'Puddle',
        '1943-06-05',
        8.5,
        'female',
        'beth.jpg'
    ),
    (
        1,
        'Moretta',
        'cat',
        'Capeta',
        '2018-12-12',
        4.2,
        'female',
        'moretta.jpg'
    );

-- Vacinas
INSERT INTO
    vaccines (
        name,
        description,
        species,
        recommended_age_weeks,
        periodicity_months
    )
VALUES (
        'V8',
        'Protege contra cinomose, hepatite, parvovirose, parainfluenza e leptospirose.',
        'dog',
        8,
        12
    ),
    (
        'V10',
        'Inclui todas as doenças da V8 + duas cepas adicionais de leptospirose.',
        'dog',
        8,
        12
    ),
    (
        'Antirrábica',
        'Previne raiva canina, obrigatória por lei.',
        'dog',
        12,
        12
    ),
    (
        'Gripe Canina',
        'Previne a tosse dos canis (traqueobronquite infecciosa).',
        'dog',
        12,
        12
    ),
    (
        'Tríplice Felina (V3)',
        'Protege contra rinotraqueíte, calicivirose e panleucopenia.',
        'cat',
        8,
        12
    ),
    (
        'Quádrupla Felina (V4)',
        'Inclui clamidiose felina além das doenças da V3.',
        'cat',
        8,
        12
    ),
    (
        'Antirrábica',
        'Previne raiva felina, obrigatória por lei.',
        'cat',
        12,
        12
    );

-- Medicamentos
INSERT INTO
    medications (
        name,
        type,
        description,
        species,
        periodicity_days
    )
VALUES (
        'Revolution',
        'antiparasitário',
        'Protege contra pulgas, sarna, vermes intestinais e dirofilariose.',
        'dog',
        30
    ),
    (
        'NexGard',
        'antipulgas',
        'Comprimido mastigável contra pulgas e carrapatos.',
        'dog',
        30
    ),
    (
        'Drontal Plus',
        'vermicida',
        'Elimina vermes intestinais (nematódeos e cestódeos).',
        'dog',
        90
    ),
    (
        'Revolution Gato',
        'antiparasitário',
        'Protege contra pulgas, ácaros e vermes intestinais.',
        'cat',
        30
    ),
    (
        'Drontal Gato',
        'vermicida',
        'Comprimido de amplo espectro contra vermes intestinais.',
        'cat',
        90
    );

-- Vacinas aplicadas
INSERT INTO
    pet_vaccines (
        pet_id,
        vaccine_id,
        application_date,
        next_due_date,
        notes,
        status
    )
VALUES (
        1,
        1,
        '2024-06-10',
        '2025-06-10',
        'Aplicada no VetCan Vila Mariana',
        'aplicada'
    ),
    (
        1,
        3,
        '2024-07-01',
        '2025-07-01',
        'Vacina antirrábica aplicada.',
        'aplicada'
    ),
    (
        2,
        5,
        '2024-08-15',
        '2025-08-15',
        'Aplicada por Dr. Silva.',
        'aplicada'
    );

-- Medicamentos aplicados
INSERT INTO
    pet_medications (
        pet_id,
        medication_id,
        application_date,
        next_due_date,
        notes,
        status
    )
VALUES (
        1,
        1,
        '2025-09-01',
        '2025-10-01',
        'Aplicação mensal de Revolution.',
        'aplicado'
    ),
    (
        1,
        3,
        '2025-07-01',
        '2025-10-01',
        'Vermifugação trimestral.',
        'aplicado'
    ),
    (
        2,
        5,
        '2025-09-10',
        '2025-12-10',
        'Drontal administrado.',
        'aplicado'
    );

-- Lembretes
INSERT INTO
    reminders (
        user_id,
        pet_id,
        title,
        message,
        reminder_date,
        channel
    )
VALUES (
        1,
        1,
        'Revolution - Moka',
        'Hora de aplicar Revolution no Moka.',
        '2025-10-30 09:00:00',
        'whatsapp'
    ),
    (
        1,
        1,
        'V10 - Moka',
        'Próxima dose da V10 está próxima!',
        '2025-06-01 10:00:00',
        'email'
    ),
    (
        1,
        4,
        'Vermífugo - Moretta',
        'Lembrete de vermífugo para Moretta.',
        '2025-12-10 08:00:00',
        'email'
    );

-- Anexos
INSERT INTO
    attachments (pet_id, file_url, type)
VALUES (
        1,
        'https://example.com/thor_carteira_vacinacao.pdf',
        'vacina'
    ),
    (
        2,
        'https://example.com/mimi_receita_vet.pdf',
        'receita'
    );