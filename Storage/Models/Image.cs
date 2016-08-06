using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Models
{
    public class Image
    {
        public int Id { get; set; }
        public byte[] Thumbnail { get; set; }
        public byte[] FullImage { get; set; }
    }
}
