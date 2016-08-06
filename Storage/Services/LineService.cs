using Storage.Repositories;

namespace Storage
{
    public class LineService
    {
        AppDbContext _db;

        public LineService(AppDbContext _db)
        {
            this._db = _db;
        }
    }
}