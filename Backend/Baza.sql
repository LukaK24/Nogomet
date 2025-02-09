

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab29ad_nogomet SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab29ad_nogomet COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab29ad_nogomet SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO



CREATE TABLE klub(
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    naziv VARCHAR(30) NOT NULL,
    osnovan INT NOT NULL,
    stadion VARCHAR(50) NOT NULL,
    drzava VARCHAR(50) NOT NULL,
    liga VARCHAR(50) NOT NULL
);

CREATE TABLE trener(
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    ime VARCHAR(20) NOT NULL,
    prezime VARCHAR(20) NOT NULL,
    klub INT NOT NULL REFERENCES klub(sifra), -- Ispravljeno sa VARCHAR(30) na INT
    iskustvo INT NOT NULL
);

CREATE TABLE utakmice(
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    datum DATETIME NOT NULL,
    vrijeme TIME,
    domaci_klub INT NOT NULL REFERENCES klub(sifra), -- Ispravljeno sa VARCHAR(30) na INT
    gostojuci_klub INT NOT NULL REFERENCES klub(sifra) -- Ispravljeno sa VARCHAR(30) na INT
);

CREATE TABLE igrac(
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    ime VARCHAR(40) NOT NULL,
    prezime VARCHAR(30) NOT NULL,
    pozicija VARCHAR(50) NOT NULL,
    klub INT NOT NULL REFERENCES klub(sifra), -- Ispravljeno sa VARCHAR(30) na INT
    oib CHAR(11)
);

-- 3. Unos podataka u tabelu klub
INSERT INTO klub (naziv, osnovan, stadion, drzava, liga)
VALUES 
('Real Madrid', 1902, 'Santiago Bernabéu', 'Španjolska', 'LaLiga'), 
('Manchester City', 1880, 'Etihad', 'Engleska', 'Premier League'),
('Barcelona', 1899, 'Spotify Camp', 'Španjolska', 'LaLiga'),
('Bayern Leverkusen', 1904, 'BayArena', 'Njemaèka', 'Bundesliga');

-- 4. Unos podataka u tabelu trener (SADA KORISTIMO ID KLUBA UMJESTO NAZIVA)
INSERT INTO trener (ime, prezime, klub, iskustvo)
VALUES 
('Carlo', 'Ancelotti', 1, 29),  -- Real Madrid (ID = 1)
('Pep', 'Guardiola', 2, 17),     -- Manchester City (ID = 2)
('Hansi', 'Flick', 3, 18),       -- Barcelona (ID = 3)
('Xabi', 'Alonso', 4, 6);        -- Bayern Leverkusen (ID = 4)

-- 5. Unos podataka u tabelu utakmice
INSERT INTO utakmice (datum, domaci_klub, gostojuci_klub)
VALUES
('2024-05-20 18:00', 1, 2),
('2024-06-14 16:00', 3, 4),
('2024-04-20 19:00', 2, 4),
('2024-05-25 16:00', 3, 4),
('2024-03-23 18:00', 2, 3),
('2024-04-01 20:00', 1, 4),
('2024-03-05 18:00', 1, 2);

-- 6. Unos podataka u tabelu igrac
INSERT INTO igrac (ime, prezime, pozicija, klub, oib)
VALUES
('Federico', 'Valverde', 'RB', 1, '08057077736'),
('Luka', 'Modriæ', 'CM', 1, '07837540514'),
('Mateo', 'Kovaèiæ', 'CM', 2, '26981510319'),
('Joško', 'Gvardiol', 'CB', 2, '44021291244'),
('Dani', 'Olmo', 'CAM', 3, '44337232806'),
('Lamine', 'Yamal', 'RW', 3, '25169325706'),
('Jeremie', 'Frimpong', 'RB', 4, '99598162856'),
('Florian', 'Wirtz', 'CAM', 4, '38124701663');