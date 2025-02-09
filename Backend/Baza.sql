use master;
go

drop database if exists nogomet;
go
SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_a98acf_wp6 SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_a98acf_wp6 COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_a98acf_wp6 SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create database nogomet collate Croatian_CI_AS;
go 

use nogomet;
go

create table klub(
sifra int not null primary key identity(1,1),
naziv varchar (30) not null,
osnovan int not null,
stadion Varchar (50) not null,
drzava varchar (50) not null,
liga varchar (50) not null
);


create table trener(
sifra int not null primary key identity (1,1),
ime varchar (20) not null,
prezime varchar (20) not null,
klub varchar (50) not null references klub (sifra),
iskustvo int not null
);

create table utakmice(
sifra int not null primary key identity(1,1),
datum datetime not null,
vrijeme time,
domaci_klub varchar (50) not null references klub(sifra),
gostojuci_klub varchar (50) not null references klub(sifra)
);


create table igrac(
sifra int not null primary key identity (1,1),
ime varchar (40) not null,
prezime varchar (30) not null,
pozicija varchar (50) not null,
klub int not null references klub(sifra),
oib char (11)
);



insert into klub (naziv,osnovan,stadion,drzava,liga )
values 
('Real Madrid',1902,'Santiago Bernabéu','Španjolska','LaLiga'), 
('Manchester City',1880,'Etihad','Engleska','Premier League'),
('Barcelona',1899,'Spotify Camp','Španjolska','LaLiga'),
('Bayern Leverkusen',1904,'BayArena','Njemaèka','Bundesliga');



insert into trener (ime,prezime,klub,iskustvo )
values 
('Carlo','Anchelotti','Real Madrid',29), 
('Pep','Guardiola','Manchester City',17),
('Hansi','Flick','Barcelona',18),
('Xavi','Alonso','Bayern Leverkusen',6);





INSERT INTO utakmice (datum, domaci_klub, gostojuci_klub)
VALUES
('2024-05-20 18:00',1, 2),
('2024-06-14 16:00', 3, 4),
('2024-04-20 19:00', 2, 4),
('2024-05-25 16:00', 3, 4),
('2024-03-23 18:00', 2, 3),
('2024-04-01 20:00', 1,4),
('2024-03-05 18:00',1,2);



INSERT INTO igrac (ime, prezime, pozicija, klub, oib)
VALUES
('Federico', 'Valverde', 'RB', 1, '08057077736'),
('Luka', 'Modriæ', 'CM', 1, '07837540514'),
('Mateo', 'Kovaèiæ', 'CM', 2, '26981510319'),
('Joško', 'Gvardiol', 'CB', 2, '44021291244'),
('Dani', 'Olmo', 'CAM', 3, '44337232806'),
('Lamine', 'Yamal', 'RW', 3, '25169325706'),
('Jeremine', 'Frimpong', 'RB', 4, '99598162856'),
('Florian', 'Wirtz', 'CAM', 4, '38124701663');