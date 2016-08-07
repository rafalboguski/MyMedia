using PropertyChanged;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desktop.ViewModel.Page
{
    [ImplementPropertyChanged]
    class MainPageViewModel
    {
        public SettingsViewModel Settings { get; set; }

        public MainPageViewModel()
        {
            Settings = new SettingsViewModel();
        }
    }
}
