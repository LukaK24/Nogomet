

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab29ad_klub SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab29ad_klub COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab29ad_klub SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO





CREATE TABLE klubovi (
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    naziv VARCHAR(30) NOT NULL,
    osnovan int NOT NULL,
    stadion VARCHAR(50) NOT NULL,
    drzava VARCHAR(50) NOT NULL,
    liga VARCHAR(50) NOT NULL
);

CREATE TABLE treneri (
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    ime VARCHAR(20) NOT NULL,
    prezime VARCHAR(20) NOT NULL,
    klub_id INT NOT NULL REFERENCES klubovi(sifra), 
    iskustvo INT NOT NULL
);

CREATE TABLE utakmice (
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    datum datetime NOT NULL,
    domaci_klub INT NOT NULL REFERENCES klubovi(sifra), 
    gostujuci_klub INT NOT NULL REFERENCES klubovi(sifra),
    CONSTRAINT chk_klubovi CHECK (domaci_klub <> gostujuci_klub) 
);



CREATE TABLE igraci (
    sifra INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    ime VARCHAR(40) NOT NULL,
    prezime VARCHAR(30) NOT NULL,
    pozicija VARCHAR(50) NOT NULL,
    klub_id INT NOT NULL REFERENCES klubovi(sifra), 
    oib CHAR(11) NOT NULL UNIQUE
);



INSERT INTO klubovi (naziv, osnovan, stadion, drzava, liga)
VALUES 
('Real Madrid', 1902, 'Santiago Bernabéu', 'Španjolska', 'LaLiga'), 
('Manchester City', 1880, 'Etihad', 'Engleska', 'Premier League'),
('Barcelona', 1899, 'Spotify Camp Nou', 'Španjolska', 'LaLiga'),
('Bayer Leverkusen', 1904, 'BayArena', 'Njemačka', 'Bundesliga');



INSERT INTO treneri (ime, prezime, klub_id, iskustvo)
VALUES 
('Carlo', 'Ancelotti', 1, 29),  
('Pep', 'Guardiola', 2, 17),     
('Hansi', 'Flick', 3, 18),       
('Xabi', 'Alonso', 4, 6);        



INSERT INTO utakmice (datum, domaci_klub, gostujuci_klub)
VALUES
('2024-05-20 18:00', 1, 2),
('2024-06-14 16:00', 3, 4),
('2024-04-20 19:00', 2, 4),
('2024-05-25 16:00', 3, 4),
('2024-03-23 18:00', 2, 3),
('2024-04-01 20:00', 1, 4),
('2024-03-05 18:00', 1, 2);



INSERT INTO igraci (ime, prezime, pozicija, klub_id, oib)
VALUES
('Federico', 'Valverde', 'RB', 1, '08057077736'),
('Luka', 'Modrić', 'CM', 1, '07837540514'),
('Mateo', 'Kovačić', 'CM', 2, '26981510319'),
('Joško', 'Gvardiol', 'CB', 2, '44021291244'),
('Dani', 'Olmo', 'CAM', 3, '44337232806'),
('Lamine', 'Yamal', 'RW', 3, '25169325706'),
('Jeremie', 'Frimpong', 'RB', 4, '99598162856'),
('Florian', 'Wirtz', 'CAM', 4, '38124701663');

﻿