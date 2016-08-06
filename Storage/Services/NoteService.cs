using Storage.Repositories;

namespace Storage
{
    public class NoteService
    {
        AppDbContext _context;

        public NoteService(AppDbContext context)
        {
            this._context = context;
        }
    }
}