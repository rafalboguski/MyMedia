using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Utils
{
    public static class FileSystem
    {
        public static string DictionaryName(string path)
        {
            return Path.GetFileName(Path.GetDirectoryName(path));
        }

        public static string FileName(string path)
        {
            return Path.GetFileName(path);
        }
    }
}
