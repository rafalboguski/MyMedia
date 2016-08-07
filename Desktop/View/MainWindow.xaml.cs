using Desktop.View;
using Desktop.ViewModel.Page;
using MahApps.Metro.Controls;
using System;
using System.Collections.Generic;
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

namespace Desktop
{
    public partial class MainWindow : MetroWindow
    {
        NavigationService _navigator;
        MainPageViewModel model;

        public MainWindow()
        {
            DataContext = model = new MainPageViewModel();

            model.Settings.NoteItemSize = 45;
        }

        void Window_Loaded(object sender, RoutedEventArgs e)
        {
            Content = new NotesPage(this);
        }

        void Settings_Click(object sender, MouseButtonEventArgs e)
        {
            SettingsFlyout.IsOpen = !SettingsFlyout.IsOpen;
        }
    }
}
