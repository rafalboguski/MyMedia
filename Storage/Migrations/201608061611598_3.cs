namespace Storage.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _3 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        No = c.Int(nullable: false),
                        Text = c.String(),
                        Thumbnail = c.Binary(),
                        Image = c.Binary(),
                        Checked = c.Boolean(),
                        Note_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Notes", t => t.Note_Id)
                .Index(t => t.Note_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Lines", "Note_Id", "dbo.Notes");
            DropIndex("dbo.Lines", new[] { "Note_Id" });
            DropTable("dbo.Lines");
            DropTable("dbo.Images");
        }
    }
}
