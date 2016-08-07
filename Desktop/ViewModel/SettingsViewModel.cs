using PropertyChanged;

namespace Desktop.ViewModel.Page
{
    [ImplementPropertyChanged]
    public class SettingsViewModel
    {
        public int NoteItemSize { get; set; }
    }
}