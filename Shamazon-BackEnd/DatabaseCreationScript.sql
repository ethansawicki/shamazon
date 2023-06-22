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
DROP TABLE IF EXISTS [OrderItem]
DROP TABLE IF EXISTS [UserProfile]

CREATE TABLE [Orders] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[userId] int NOT NULL,
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

CREATE TABLE [OrderItem](
	[id] int PRIMARY KEY IDENTITY,
	[OrderId] int NOT NULL,
	[ProductId] int NOT NULL,
	[ProductQuantity] int NOT NULL
)
GO

CREATE TABLE [productCategory] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[categoryName] nvarchar(255)
)
GO

CREATE TABLE [UserProfile](
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[userId] int,
	[firstName] nvarchar(255),
	[lastName] nvarchar(255),
	[address] nvarchar(255),
	[displayName] nvarchar(255)
)
GO

CREATE TABLE [Users] (
	[id] int PRIMARY KEY IDENTITY NOT NULL,
	[firebaseId] nvarchar(255),
	[email] nvarchar(255)
)
GO

ALTER TABLE [Orders] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
GO

ALTER TABLE [OrderItem] ADD FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([id])
GO

ALTER TABLE [OrderHistory] ADD FOREIGN KEY ([orderNumber]) REFERENCES [Orders] ([id])
GO

ALTER TABLE [OrderHistory] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Products] ADD FOREIGN KEY ([productCategoryId]) REFERENCES [productCategory] ([id])
GO

INSERT INTO dbo.[Users]([firebaseid], [email]) VALUES ('C2IKGQgCCfgR5aljv0nXLxu7WQi2','FakeEmail@fake.com')

INSERT INTO dbo.[Users]([firebaseid], [email]) VALUES ('hi5MvSPW8tbORuiLQ96L3giqEXg1','test@test.com')

INSERT INTO dbo.[UserProfile]([userId],[firstName],[lastName],[address], [displayName]) VALUES (2,'Test','User','1234 Fake Way','TestUser')

INSERT INTO dbo.[UserProfile]([userId],[firstName],[lastName],[address], [displayName]) VALUES (1,'Fake','User','1235 Fake Way', 'FakeUser')

INSERT INTO dbo.[productCategory]([categoryName]) VALUES ('PC Components')

INSERT INTO dbo.[productCategory]([categoryName]) VALUES ('Network Equipment')

INSERT INTO dbo.[productCategory]([categoryName]) VALUES ('Grocery')

INSERT INTO dbo.[productCategory]([categoryName]) VALUES ('Home Improvement')

INSERT INTO dbo.[Orders]([userId],[orderTotal],[orderAddress],[dateCreated]) VALUES (1,1999.98,'1234 BS BLVD','2023-05-18')

INSERT INTO dbo.[OrderItem]([OrderId],[ProductId],[ProductQuantity]) VALUES (1,2,1)

INSERT INTO dbo.[OrderItem]([OrderId],[ProductId],[ProductQuantity]) VALUES (1,1,1)

INSERT INTO dbo.[OrderHistory]([userId], [orderNumber]) VALUES (1,1)

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'NVIDIA RTX 4090', 1599.99, 3, 'This is a graphics card', 'https://www.shopmyexchange.com/products/images/xlarge/3441153_1007_alt3.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'Ryzen 5800x3D', 399.99, 4, 'This is a CPU', 'https://m.media-amazon.com/images/I/61Kq99IRdcL.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'4TB WD Red SN700', 359.99, 4, 'This is a drive', 'https://m.media-amazon.com/images/I/612zWbxDzDL._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (2,'Aruba Instant On AP22', 169.49, 4, 'This is a wireless AP', 'https://m.media-amazon.com/images/I/41knj3CpvgL._AC_SL1073_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'LG 27" Ultragear OLED Monitor', 933.72, 4, 'This is a monitor', 'https://m.media-amazon.com/images/I/91fQy7Q0GvL._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'Corsair SF1000L', 199.99, 4, 'Fully modular 1000w power supply', 'https://m.media-amazon.com/images/I/71cmBEbYL7L._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (2,'Aruba Instant On 1930 Switch', 599.99, 4, '24 port poe network switch', 'https://m.media-amazon.com/images/I/61xzhsDmCRL._SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (4,'Dewalt 20v Drill', 99.00, 4, '20v Max Cordless Drill / Driver Kit', 'https://m.media-amazon.com/images/I/71n1TZHn6BS._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (3,'Bounty Paper Towls (8 Count)', 24.42, 4, 'Paper Towels', 'https://m.media-amazon.com/images/I/81t6ws1HsWL._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (3,'Cascade Dishwasher Pods', 18.99, 4, 'Cascade Platinum Dishwasher pods', 'https://m.media-amazon.com/images/I/81a7Rqq+8lL._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (3,'Dixie 10 Inch Paper Plates', 23.36, 4, 'Paper Plates 204 Count (3 Packs of 68 Plates)', 'https://m.media-amazon.com/images/I/817-aVPlB6L._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (3,'GLAD ForceFlex', 20.88, 4, 'Tall Kitchen Drawstring Trash Bags', 'https://m.media-amazon.com/images/I/81uXwVIixJL._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (4,'First Alert HOME1', 24.98, 4, 'Fire Extinguisher', 'https://m.media-amazon.com/images/I/51OoQZPGVgL._AC_SL1200_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (3,'Science Diet Dry Dog Food', 75.04, 4, 'Adult Dog Food Small Bites Chicken & Barley 35lb', 'https://m.media-amazon.com/images/I/71-W2-dk-dL._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'Elgato Stream Deck MK.2', 149.99, 4, 'Stream Deck MK.2 Studio Controller', 'https://m.media-amazon.com/images/I/71AsjjEAwqL._AC_SL1364_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'Logitech G502 HERO', 44.99, 4, 'Computer Mouse', 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg')

INSERT INTO dbo.[products]([productCategoryId],[productName],[productPrice],[productQuantity],[productDescription],[productImg]) VALUES (1,'SteelSeries Arctis 7+', 149.00, 4, 'Wireless Gaming Headset', 'https://m.media-amazon.com/images/I/81mlnSHshlL._AC_SL1500_.jpg')