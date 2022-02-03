
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
    ('Flags',0),
    ('Continents',0);


-- ADD SOME CARDS
INSERT INTO cards (did, img_path, question, answer)
VALUES
(1,'image_path_url', 'where is this flag from?','USA'),
(1,'image_path_url', 'where is this flag from?','Russia'),
(1,'image_path_url','where is this flag from?','China'),
(2,'image_path_url','what is the name of this continent?','North America'),
(2,'image_path_url','what is the name of this continent?','Asia'),
(2,'image_path_url','what is the name of this continent?','Europe');

