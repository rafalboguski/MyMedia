using Storage.Models;
using Storage.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage
{
    public class UnitOfWork : IDisposable
    {
        AppDbContext _context;

        public DbSet<Note> NotesRepository => _context.Notes;
        public DbSet<Line> LinesRepository => _context.Lines;
        public DbSet<Image> ImagesRepository => _context.Images;

        public NoteService NoteService { get; private set; }
        public LineService LineService { get; private set; }
        public ImageService ImageService { get; private set; }

        public UnitOfWork()
        {
            _context = new AppDbContext();

            NoteService = new NoteService(_context);
            LineService = new LineService(_context);
            ImageService = new ImageService(_context);
        }

        public void Complete()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
