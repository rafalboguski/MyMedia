using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Desktop.ViewModel.Page
{
    class NotesPageViewModel : INotifyPropertyChanged
    {

        public ObservableCollection<NoteViewModel> Notes { get; set; }

        public NotesPageViewModel()
        {
            Notes = new ObservableCollection<NoteViewModel>();
        }
        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
