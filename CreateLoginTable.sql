Use Test;
CREATE TABLE accounts(
    id int not null IDENTITY(1,2) primary key,
    username VARCHAR (50) not null,
    password VARCHAR (50) NOT NULL);
Go


