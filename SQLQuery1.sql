SELECT TOP (1000) [Id]
      ,[FirstName]
      ,[LastName]
      ,[Username]
      ,[Password]
      ,[Token]
      ,[Role]
      ,[Email]
  FROM [AuthAPIDb].[dbo].[users]

update [AuthAPIDb].[dbo].[users] set Role = 'Admin' where id = 2;

update [AuthAPIDb].[dbo].[users] set Username = 'Deepa@123' where id = 2;

update [AuthAPIDb].[dbo].[users] set Username = 'Deepa' where id = 2;

Delete [AuthAPIDb].[dbo].[users];

