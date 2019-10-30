USE [master]
GO
/****** Object:  Database [Test]    Script Date: 22/02/2019 12:05:14 ******/
CREATE DATABASE [Test]
GO
USE [Test]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 22/02/2019 12:05:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Products](
        [ProductID] [int] IDENTITY(1,1) NOT NULL,
        [ProductName] [varchar](50) NULL,
        [ProductPrice] [decimal](18, 0) NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
        [ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[student]    Script Date: 22/02/2019 12:05:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[user]    Script Date: 22/02/2019 12:05:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([ProductID], [ProductName], [ProductPrice]) VALUES (5, N'HeadPhone', CAST(45 AS Decimal(18, 0)))
INSERT [dbo].[Products] ([ProductID], [ProductName], [ProductPrice]) VALUES (10, N'KeyBoard', CAST(89 AS Decimal(18, 0)))
INSERT [dbo].[Products] ([ProductID], [ProductName], [ProductPrice]) VALUES (11, N'Mouse', CAST(465 AS Decimal(18, 0)))
INSERT [dbo].[Products] ([ProductID], [ProductName], [ProductPrice]) VALUES (13, N'Ubs memory', CAST(435 AS Decimal(18, 0)))INSERT [dbo].[Products] ([ProductID], [ProductName], [ProductPrice]) VALUES (20, N'Disk', CAST(546 AS Decimal(18, 0)))
INSERT [dbo].[Products] ([ProductID], [ProductName], [ProductPrice]) VALUES (21, N'Ram 200', CAST(789 AS Decimal(18, 0)))

-- =============================================
-- Author:              <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
USE [Test]
GO
CREATE PROCEDURE [dbo].[Usp_DeleteProduct]
        -- Add the parameters for the stored procedure here
        @ProductID int
AS
BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

    -- Insert statements for procedure here
        delete from products where ProductID=@ProductID
END

GO
/****** Object:  StoredProcedure [dbo].[Usp_InsertProduct]    Script Date: 22/02/2019 12:05:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:              <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
USE [Test]
GO
CREATE PROCEDURE [dbo].[Usp_InsertProduct]
        -- Add the parameters for the stored procedure here
        @ProductName varchar(50),
        @ProductPrice decimal(18, 0)
AS
BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

    -- Insert statements for procedure here
        insert into products(ProductName,ProductPrice) values(@ProductName,@ProductPrice)
END

GO
/****** Object:  StoredProcedure [dbo].[Usp_UpdateProduct]    Script Date: 22/02/2019 12:05:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:              <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
USE [Test]
GO
CREATE PROCEDURE [dbo].[Usp_UpdateProduct]
        -- Add the parameters for the stored procedure here
        @ProductID int,
        @ProductName varchar(50),
        @ProductPrice decimal(18, 0)
AS
BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

    -- Insert statements for procedure here
        update products set ProductName=@ProductName, ProductPrice=@ProductPrice where ProductID=@ProductID
END

GO
USE [master]
GO
ALTER DATABASE [Test] SET  READ_WRITE 
GO