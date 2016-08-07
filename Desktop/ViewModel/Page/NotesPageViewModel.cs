using Microsoft.Win32;
using PropertyChanged;
using Storage;
using Storage.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

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
                var notes = uow.NotesRepository.Include(n => n.Image).ToList();
                if (!string.IsNullOrWhiteSpace(NewNote.Title))
                    notes = notes.Where(x => x.Title.ToLower().Contains(NewNote.Title.ToLower())).ToList();
                notes.OrderBy(n => n.Position).ToList()
                .ForEach(note => Notes.Add((NoteViewModel)note));
            }
        }

        internal void AddNote()
        {
            if (string.IsNullOrWhiteSpace(NewNote.Title))
                return;
            var dialog = new OpenFileDialog()
            {
                Filter = "Image files (*.png;*.jpeg;*.jpg)|*.png;*.jpeg;*.jpg|All files (*.*)|*.*"
            };

            var result = dialog.ShowDialog();
            if (result == true)
            {
                using (var uow = new UnitOfWork())
                {
                    var note = (Note)NewNote;
                    note.Image.FullImage = File.ReadAllBytes(dialog.FileName);
                    uow.NotesRepository.Add(note);
                    uow.Complete();
                }


                NewNote.Title = "";
                LoadNotes();
            }
        }
    }
}
