using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Logic.Model
{
    public class MediaFolder : IAppXml<MediaFolder>
    {
        [XmlIgnore]
        public string FolderName { get; internal set; }
        [XmlIgnore]
        public string Path { get; internal set; }



        public MediaFolder LoadXml()
        {
            using (var fileStream = new FileStream(Path, FileMode.Open))
                return (MediaFolder)new XmlSerializer(typeof(MediaFolder)).Deserialize(fileStream);
        }

        public void SaveXml()
        {
            using (var file = File.Create(Path))
                new XmlSerializer(typeof(MediaFolder)).Serialize(file, this);
        }
    }
}
