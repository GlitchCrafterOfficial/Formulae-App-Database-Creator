PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Matter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    color TEXT
);

CREATE TABLE IF NOT EXISTS Tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS Reference (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT UNIQUE,
    url TEXT
);

CREATE TABLE IF NOT EXISTS Unit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matter INTEGER,
    name TEXT,
    description TEXT,
    FOREIGN KEY (matter) REFERENCES Matter(id)
);

CREATE TABLE IF NOT EXISTS UnitTags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit INTEGER,
    tag INTEGER,
    FOREIGN KEY (unit) REFERENCES Unit(id),
    FOREIGN KEY (tag) REFERENCES Tag(id),
    UNIQUE (unit, tag)
);

CREATE TABLE IF NOT EXISTS Formula (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit INTEGER,
    name TEXT,
    formula TEXT,
    FOREIGN KEY (unit) REFERENCES Unit(id)
);

CREATE TABLE IF NOT EXISTS FormulaUnits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formula INTEGER,
    unit INTEGER,
    FOREIGN KEY (formula) REFERENCES Formula(id),
    FOREIGN KEY (unit) REFERENCES Unit(id),
    UNIQUE (formula, unit)
);

CREATE TABLE IF NOT EXISTS FormulaReferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formula INTEGER,
    reference INTEGER,
    FOREIGN KEY (formula) REFERENCES Formula(id),
    FOREIGN KEY (reference) REFERENCES Reference(id),
    UNIQUE (formula, reference)
);

CREATE TABLE IF NOT EXISTS Article (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit INTEGER,
    title TEXT,
    url TEXT,
    FOREIGN KEY (unit) REFERENCES Unit(id)
);

CREATE TABLE IF NOT EXISTS ArticleReferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article INTEGER,
    reference INTEGER,
    FOREIGN KEY (reference) REFERENCES Reference(id),
    FOREIGN KEY (article) REFERENCES Article(id),
    UNIQUE (article, reference)
);

CREATE TABLE IF NOT EXISTS ArticleFormulas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article INTEGER,
    formula INTEGER,
    FOREIGN KEY (article) REFERENCES Article(id),
    FOREIGN KEY (formula) REFERENCES Formula(id),
    UNIQUE (article, formula)
);

CREATE TABLE IF NOT EXISTS Exercise (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit INTEGER,
    name TEXT,
    content TEXT,
    solution TEXT,
    FOREIGN KEY (unit) REFERENCES Unit(id)
);

CREATE TABLE IF NOT EXISTS ExerciseReferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exercise INTEGER,
    reference INTEGER,
    FOREIGN KEY (exercise) REFERENCES Exercise(id),
    FOREIGN KEY (reference) REFERENCES Reference(id),
    UNIQUE (exercise, reference)
);

CREATE TABLE IF NOT EXISTS ExerciseFormulas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exercise INTEGER,
    formula INTEGER,
    FOREIGN KEY (exercise) REFERENCES Exercise(id),
    FOREIGN KEY (formula) REFERENCES Formula(id),
    UNIQUE (exercise, formula)
);