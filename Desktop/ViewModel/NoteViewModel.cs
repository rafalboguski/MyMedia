using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Storage.Models;
using System.Runtime.CompilerServices;
using System.ComponentModel;

namespace Desktop.ViewModel
{
    class NoteViewModel : INotifyPropertyChanged
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public string Title { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
