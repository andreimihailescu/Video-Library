namespace Vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class SeedUsers : DbMigration
    {
        public override void Up()
        {
            Sql(@"
            INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'60b48921-2b0d-4f22-8b2e-0fa286134716', N'guest@vidly.com', 0, N'AHdnxyxWe2JADbVnyJ4DyCGYhOsFmOGnjUhDGscdPWKP0IytMpvJonxHXqQ0r2oN9Q==', N'6e3f8429-5ade-4d91-b175-69beee9ac25c', NULL, 0, 0, NULL, 1, 0, N'guest@vidly.com')
            INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'e2b45239-567b-42e5-abad-30dc7f04741a', N'admin@vidly.com', 0, N'AIxJP0bf+kY3U6R6OWFyn8GObV5z+K8nyvEv8nS2HrnWTgrOFY8TgsYEtoJnmsuvLQ==', N'1928fb4d-97e5-433a-8a8d-d5b6fea792db', NULL, 0, 0, NULL, 1, 0, N'admin@vidly.com')
            
            INSERT INTO [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'3fb76059-bd66-47f5-931b-516169374054', N'CanManageMovies')

            INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'e2b45239-567b-42e5-abad-30dc7f04741a', N'3fb76059-bd66-47f5-931b-516169374054')
            ");
        }

        public override void Down()
        {
        }
    }
}
