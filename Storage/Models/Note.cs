using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        public int Position { get; set; }
        public string Title { get; set; }

        public Image Image { get; set; }
        public List<Line> Lines { get; set; }

        [Timestamp]
        public byte[] Timestamp { get; set; }
    }
}
