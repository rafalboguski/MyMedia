using Storage.Repositories;

namespace Storage
{
    public class ImageService
    {
        AppDbContext _context;

        public ImageService(AppDbContext context)
        {
            this._context = context;
        }
    }
}