using Logic.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Console;

namespace Logic
{
    class Program
    {
        static void Main(string[] args)
        {
            var settings = new Settings(@"C:\Users\user\Desktop\Programowanie\Github\MyMedia\TEST_FOLDER\global_settings.txt");
            settings.FolderInfoFileName = "_myMedia.txt";
            settings.DataSources = new List<DataSource>
            {
                new DataSource {Name = "FOLDER_A" , Path = @"C:\Users\user\Desktop\Programowanie\Github\MyMedia\TEST_FOLDER\FOLDER_A" },
                new DataSource {Name = "FOLDER_B" , Path = @"C:\Users\user\Desktop\Programowanie\Github\MyMedia\TEST_FOLDER\FOLDER_B" }
            };

            settings.SaveXml();
            settings.LoadXml();

            var ds = new DataService(settings);

            ds.LoadData();

            ReadLine();
        }
    }
}
