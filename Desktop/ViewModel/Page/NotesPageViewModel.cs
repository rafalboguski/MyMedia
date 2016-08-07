using PropertyChanged;
using Storage;
using Storage.Models;
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
    [ImplementPropertyChanged]
    class NotesPageViewModel
    {
        public ObservableCollection<NoteViewModel> Notes { get; set; }
        public NoteViewModel NewNote { get; set; }
        public SettingsViewModel Settings { get; set; }

        public NotesPageViewModel()
        {
            Notes = new ObservableCollection<NoteViewModel>();
            NewNote = new NoteViewModel();
        }

        internal void LoadNotes()
        {
            using (var uow = new UnitOfWork())
            {
                Notes.Clear();
                uow.NotesRepository.OrderBy(n => n.Position).ToList()
                    .ForEach(note => Notes.Add((NoteViewModel)note));
            }
        }

        internal void AddNote()
        {
            if (string.IsNullOrWhiteSpace(NewNote.Title))
                return;

            using (var uow = new UnitOfWork())
            {
                uow.NotesRepository.Add((Note)NewNote);
                uow.Complete();
            }
            NewNote.Title = "";
            LoadNotes();
        }
    }
}
