create database db_MiniProject_25_03_21
DROP COLUMN cartId;

INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (1, N'Product 1', 1200.0000, N'assets/Pictures/1.jpg', 50)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (2, N'Product 2', 600.0000, N'assets/Pictures/2.jpg', 40)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (3, N'Product 3', 400.0000, N'assets/Pictures/3.jpg', 10)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (4, N'Product 4', 100.0000, N'assets/Pictures/4.jpg', 5)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (5, N'Product 5', 50.0000, N'assets/Pictures/5.jpg', 50)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (6, N'Product 6', 120.0000, N'assets/Pictures/6.jpg', 10)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (7, N'Product 7', 320.0000, N'assets/Pictures/7.jpg', 20)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (8, N'Product 8', 900.0000, N'assets/Pictures/8.jpg', 30)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (9, N'Product 9', 800.0000, N'assets/Pictures/9.jpg', 36)
INSERT [dbo].[tbl_product] ([productId], [productName], [price], [produtImg], [quantity]) VALUES (10, N'Product 10', 400.0000, N'assets/Pictures/5.jpg', 22)
SET IDENTITY_INSERT [dbo].[tbl_product] OFF