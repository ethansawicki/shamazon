USE [master]
GO
IF DB_ID('Shamazon') IS NULL
		CREATE DATABASE [Shamazon]
GO
USE [Shamazon]
GO

DROP TABLE IF EXISTS [productCategory]
DROP TABLE IF EXISTS [OrderHistory]
DROP TABLE IF EXISTS [Users]
DROP TABLE IF EXISTS [Orders]
DROP TABLE IF EXISTS [Products]

CREATE TABLE [Orders] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[userId] int NOT NULL,
	[productId] int NOT NULL,
	[orderTotal] DECIMAL NOT NULL,
	[orderAddress] nvarchar(255) NOT NULL,
	[dateCreated] datetime NOT NULL
)
GO

CREATE TABLE [OrderHistory] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[userId] int NOT NULL,
	[orderNumber] int NOT NULL
)
GO

CREATE TABLE [Products] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[productCategoryId] int,
	[productName] nvarchar(255),
	[productPrice] DECIMAL,
	[productQuantity] int,
	[productDescription] nvarchar(255),
	[productImg] nvarchar(255)
)
GO

CREATE TABLE [productCategory] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[categoryName] nvarchar(255)
)
GO

CREATE TABLE [Users] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[email] nvarchar(255),
	[firebaseId] nvarchar(255),
	[firstName] nvarchar(255),
	[lastName] nvarchar(255),
	[address] nvarchar(255)
)
GO

ALTER TABLE [Orders] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Orders] ADD FOREIGN KEY ([productId]) REFERENCES [Products] ([id])
GO

ALTER TABLE [OrderHistory] ADD FOREIGN KEY ([orderNumber]) REFERENCES [Orders] ([id])
GO

ALTER TABLE [OrderHistory] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Products] ADD FOREIGN KEY ([productCategoryId]) REFERENCES [productCategory] ([id])

INSERT INTO dbo.[Users]([email],[firebaseid],[firstName],[lastName],[address]) VALUES ('FakeEmail@fake.com','uid1234','Fake','User','1234 BS BLVD')

INSERT INTO dbo.[productCategory]([categoryName]) VALUES ('PC Components')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'NVIDIA RTX 4090', 1599.99, 3, 'This is a graphics card', 'https://www.shopmyexchange.com/products/images/xlarge/3441153_1007_alt3.jpg')