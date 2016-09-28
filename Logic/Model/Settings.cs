using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Logic.Model
{
    public class Settings : IAppXml<Settings>
    {
        public Settings()
        {

        }

        public Settings(string path)
        {
            Path = path;
        }

        [XmlIgnore]
        public string Path { get; set; }
        public List<DataSource> DataSources { get; set; }

        public string FolderInfoFileName { get; set; }

        public Settings LoadXml()
        {
            using (var fileStream = new FileStream(Path, FileMode.Open))
                return (Settings)new XmlSerializer(typeof(Settings)).Deserialize(fileStream);
        }

        public void SaveXml()
        {
            using (var file = File.Create(Path))
                new XmlSerializer(typeof(Settings)).Serialize(file, this);
        }
    }

    public class DataSource
    {
        public string Name { get; set; }
        public string Path { get; set; }
    }
}
