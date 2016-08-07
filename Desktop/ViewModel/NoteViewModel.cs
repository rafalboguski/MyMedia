using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Storage.Models;
using System.Runtime.CompilerServices;
using System.ComponentModel;
using PropertyChanged;

namespace Desktop.ViewModel
{
    [ImplementPropertyChanged]
    class NoteViewModel
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public string Title { get; set; }

        public static explicit operator Note(NoteViewModel vm)
        {
            var m = new Note()
            {
                Title = vm.Title,
                Position = vm.Position
            };
            return m;
        }

        public static explicit operator NoteViewModel(Note m)
        {
            var vm = new NoteViewModel()
            {
                Title = m.Title,
                Position = m.Position
            };
            return vm;
        }
    }
}
