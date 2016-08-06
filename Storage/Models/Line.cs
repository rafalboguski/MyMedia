using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Models
{
    public class Line
    {
        [Key]
        public int Id { get; set; }
        public int Position { get; set; }
        public string Text { get; set; }
        public bool? Checked { get; set; }

        public Image Image { get; set; }

        public Note Note { get; set; }
    }
}
