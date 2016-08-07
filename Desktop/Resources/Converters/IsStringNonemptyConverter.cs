using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

namespace Desktop.Resources.Converters
{

    sealed class IsStringNonemptyConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            var res = string.IsNullOrEmpty(value as string)? "Hidden" : "Visible";
            return res;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }

    
    public class MultiplyInt : IValueConverter
    {
        public object Convert(object value, Type t, object parameter, CultureInfo culture)
        {
            var val = (int)value;
            var par = double.Parse((string)parameter, CultureInfo.InvariantCulture);
            var res = (int)(val * par);

            return res;
        }

        public object ConvertBack(object value, Type t, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();

        }
    }
}
