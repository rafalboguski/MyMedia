using Desktop.ViewModel;
using Desktop.ViewModel.Page;
using Storage;
using Storage.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
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

            DataContext = model = new NotesPageViewModel();

            model.Settings =  (window.DataContext as MainPageViewModel).Settings;
            model.LoadNotes();

            SearchTextBox.Focus();
        }

        void AddButton_click(object sender, RoutedEventArgs e)
        {
            model.AddNote();

        }

        void NewNoteTitle_changed(object sender, TextChangedEventArgs e)
        {
            model.LoadNotes();
        }
    }
}


