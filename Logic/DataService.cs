using Logic.Model;
using Logic.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic
{
    class DataService
    {
        private readonly bool DEBUG = true;

        private Settings _settings;

        public DataService(Settings settings)
        {
            _settings = settings;
        }

        public void LoadData()
        {
            var mediaFoolders = new List<MediaFolder>();

            foreach (var dataSource in _settings.DataSources)
            {
                var dictionariesToScan = Directory.GetDirectories(dataSource.Path, "*.*", SearchOption.AllDirectories).ToList();
                dictionariesToScan.Add(dataSource.Path);

                foreach (var dictionary in dictionariesToScan)
                {
                    if (DEBUG)
                        Console.WriteLine(string.Concat(dictionary.ToString().Skip(dataSource.Path.Length - dataSource.Name.Length)));

                    // check if it is MediaFolder
                    foreach (var file in Directory.GetFiles(dictionary))
                    {
                        if (FileSystem.FileName(file) == _settings.FolderInfoFileName)
                        {
                            mediaFoolders.Add(new MediaFolder
                            {
                                Path = dictionary,
                                FolderName = FileSystem.DictionaryName(dictionary)
                            });
                        }
                    }
                }
                Console.WriteLine();
            }

            if (DEBUG)
                Console.WriteLine("found mediaFoolders --------------------------------");
            foreach (var mediaFolder in mediaFoolders)
            {
                Console.WriteLine(mediaFolder.Path);

                /// todo: load data into media folders
            }
        }
    }
}
