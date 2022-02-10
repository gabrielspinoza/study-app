
-- CREATE DECK TABLE
CREATE TABLE decks (
    did SERIAL PRIMARY KEY,
    d_name VARCHAR(100),
    d_total_cards INTEGER
);

-- CREATE CARDS TABLE
CREATE TABLE cards (
    cid SERIAL PRIMARY KEY,
    did INT,
    img_path VARCHAR(100),
    question VARCHAR(500),
    answer VARCHAR(500),
	CONSTRAINT fk_decks FOREIGN KEY (did) REFERENCES decks(did)
);

-- ADD SOME DECKS
INSERT INTO decks (d_name, d_total_cards)
VALUES
    ('Flags',5),
    ('Continents',7);


-- ADD SOME CARDS
INSERT INTO cards (did, img_path, question, answer)
VALUES
(60,'https://flagpedia.net/data/flags/w1160/ru.png', 'Which country`s flag is this?','Russia'),
(60,'https://flagpedia.net/data/flags/w1160/no.png', 'Which country`s flag is this?','Norway'),
(60,'https://flagpedia.net/data/flags/w1160/se.png', 'Which country`s flag is this?','Sweden'),
(60,'https://flagpedia.net/data/flags/w1160/pt.png', 'Which country`s flag is this?','Portugal'),
(60,'https://flagpedia.net/data/flags/w1160/es.png', 'Which country`s flag is this?','Spain');

INSERT INTO cards (did, img_path, question, answer)
VALUES
(61,'https://dl.airtable.com/.attachmentThumbnails/194d1ede745658029d6cc19978ce8927/f2424e99.png', 'What is the name of this continent?', 'North America'),
(61,'https://dl.airtable.com/.attachmentThumbnails/d453d14d95503788574e22a38dd878c9/75d92257.png', 'What is the name of this continent?', 'Asia'),
(61'https://dl.airtable.com/.attachmentThumbnails/d423e2b2fd5d73491b7d67334e063164/d4e7beb7.png', 'What is the name of this continent?', 'South America'),
(61,'https://dl.airtable.com/.attachmentThumbnails/b071b7110af845db4fcf769e141249f0/4abe06e6.png', 'What is the name of this continent?', 'Africa'),
(61,'https://dl.airtable.com/.attachmentThumbnails/56d81217c3d0196efdf9dcf8ad0d7cb2/d5860dfb.png', 'What is the name of this continent?', 'Antarctica'),
(61,'https://dl.airtable.com/.attachmentThumbnails/d99bde8909f36314725929b4bbba1381/0ba9f271.png', 'What is the name of this continent?', 'Australia'),
(61,'https://dl.airtable.com/.attachmentThumbnails/fa576e5bf05441f62e6cc1d502b93692/bb2f7833.png', 'What is the name of this continent?', 'Europe');