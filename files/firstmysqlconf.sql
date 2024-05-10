CREATE TABLE IF NOT EXISTS publications (
    name VARCHAR(250) NOT NULL,
    avatar VARCHAR(250),
    PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS reviewers (
    name VARCHAR(250) NOT NULL,
    publication VARCHAR(250),
    avatar VARCHAR(250),
    PRIMARY KEY (name),
    FOREIGN KEY (publication)
        REFERENCES publications(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS movies (
    title VARCHAR(250) NOT NULL,
    release_year VARCHAR(250),
    score INT(11),
    reviewer VARCHAR(250),
    publication VARCHAR(250),
    PRIMARY KEY (title),
    FOREIGN KEY (reviewer)
        REFERENCES reviewers(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

