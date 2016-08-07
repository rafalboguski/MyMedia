using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media.Imaging;

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

    public class ByteToImageConverter : IValueConverter
    {
        public object Convert(object value, Type t, object parameter, CultureInfo culture)
        {
            var imageData = (byte[])value;
            if (imageData == null || imageData.Length == 0) return null;
            var image = new BitmapImage();
            using (var mem = new MemoryStream(imageData))
            {
                mem.Position = 0;
                image.BeginInit();
                image.CreateOptions = BitmapCreateOptions.PreservePixelFormat;
                image.CacheOption = BitmapCacheOption.OnLoad;
                image.UriSource = null;
                image.StreamSource = mem;
                image.EndInit();
            }
            image.Freeze();
            return image;
        }

        public object ConvertBack(object value, Type t, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();

        }
    }
}



