-- Включаем расширение для UUID (делаем это от имени суперпользователя или владельца БД)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создаём таблицу films
CREATE TABLE films
(
    id          uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_films"
            PRIMARY KEY,
    rating      double precision                NOT NULL,
    director    varchar                         NOT NULL,
    tags        text                            NOT NULL,
    image       varchar                         NOT NULL,
    cover       varchar                         NOT NULL,
    title       varchar                         NOT NULL,
    about       varchar                         NOT NULL,
    description varchar                         NOT NULL
);

ALTER TABLE films
    OWNER TO student;

-- Создаём таблицу schedules
CREATE TABLE schedules
(
    id       uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_schedules"
            PRIMARY KEY,
    daytime  varchar                         NOT NULL,
    hall     integer                         NOT NULL,
    "rows"   integer                         NOT NULL,
    seats    integer                         NOT NULL,
    price    double precision                NOT NULL,
    taken    text                            NOT NULL,
    "filmId" uuid
        CONSTRAINT "FK_schedules_films"
            REFERENCES films(id)
);

ALTER TABLE schedules
    OWNER TO student;