using Desktop.ViewModel;
using Desktop.ViewModel.Page;
using Storage;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Desktop.View
{
    public partial class NotesPage : Page
    {
        Window window;
        NotesPageViewModel model;

        public NotesPage(Window mainWindow)
        {
            InitializeComponent();
            window = mainWindow;

            model = new NotesPageViewModel();

            using (var uow = new UnitOfWork())
            {
                var notes = uow.NotesRepository.OrderBy(n => n.Position).ToList();


                foreach (var note in notes)
                {
                    model.Notes.Add(new NoteViewModel() { Title = note.Title });
                }
            }

            DataContext = model;
        }
    }
}
