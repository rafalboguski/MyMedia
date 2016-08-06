namespace Storage.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _5 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Images", "Thumbnail", c => c.Binary());
            AddColumn("dbo.Images", "FullImage", c => c.Binary());
            AddColumn("dbo.Lines", "Position", c => c.Int(nullable: false));
            AddColumn("dbo.Lines", "Image_Id", c => c.Int());
            AddColumn("dbo.Notes", "Position", c => c.Int(nullable: false));
            AddColumn("dbo.Notes", "Image_Id", c => c.Int());
            CreateIndex("dbo.Lines", "Image_Id");
            CreateIndex("dbo.Notes", "Image_Id");
            AddForeignKey("dbo.Lines", "Image_Id", "dbo.Images", "Id");
            AddForeignKey("dbo.Notes", "Image_Id", "dbo.Images", "Id");
            DropColumn("dbo.Lines", "No");
            DropColumn("dbo.Lines", "Thumbnail");
            DropColumn("dbo.Lines", "Image");
            DropColumn("dbo.Notes", "Thumbnail");
            DropColumn("dbo.Notes", "Image");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Notes", "Image", c => c.Binary());
            AddColumn("dbo.Notes", "Thumbnail", c => c.Binary());
            AddColumn("dbo.Lines", "Image", c => c.Binary());
            AddColumn("dbo.Lines", "Thumbnail", c => c.Binary());
            AddColumn("dbo.Lines", "No", c => c.Int(nullable: false));
            DropForeignKey("dbo.Notes", "Image_Id", "dbo.Images");
            DropForeignKey("dbo.Lines", "Image_Id", "dbo.Images");
            DropIndex("dbo.Notes", new[] { "Image_Id" });
            DropIndex("dbo.Lines", new[] { "Image_Id" });
            DropColumn("dbo.Notes", "Image_Id");
            DropColumn("dbo.Notes", "Position");
            DropColumn("dbo.Lines", "Image_Id");
            DropColumn("dbo.Lines", "Position");
            DropColumn("dbo.Images", "FullImage");
            DropColumn("dbo.Images", "Thumbnail");
        }
    }
}
