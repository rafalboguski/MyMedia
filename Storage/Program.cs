using Storage.Models;
using Storage.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Storage
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var uow = new UnitOfWork())
            {
                var notes = uow.NotesRepository.OrderBy(n => n.Position).ToList();
                var dd = 34;
            }
        }
    }
}
