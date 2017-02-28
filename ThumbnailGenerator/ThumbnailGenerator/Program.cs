using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;
using System.IO;

namespace ThumbnailGenerator
{
    // requires FFmpeg installed
    class Program
    {
        public static readonly List<string> ImageExtensions = new List<string> { ".JPG", ".JPE", ".BMP", ".GIF", ".PNG" };
        public static readonly List<string> VideoExtensions = new List<string> { ".WMV", ".MOV", ".FLV", ".AVI", ".MP4", ".DIVX", ".WEBM", ".MPEG", ".MKV" };

        // source:       ../pic/1.jpg
        // destination:  ../pic/_thumbnails/1.jpg.jpg

        static void Main(string[] args) // source[path] destination[path] x[int] y[int] hidden[true/false] forceUpdate[true/false]
        {
            if (args == null || args.Length < 6)
            {
                Console.WriteLine("source[path] x[int] y[int] hidden[true/false] forceUpdate[true/false]");
                return;
            }

            string source = @"C:/Users/user/Desktop/Obrazy/test";
            string dest = null;
            var size = new Size(300, 200);
            var hideDictionary = false;
            var forceUpdate = true;

            source = args[0];
            dest = args[1];
            if (dest == "null")
            {
                dest = null;
            }

            size = new Size(int.Parse(args[2]), int.Parse(args[3]));
            hideDictionary = bool.Parse(args[4]);
            forceUpdate = bool.Parse(args[5]);


            var files = new List<string>();

            if (File.GetAttributes(source).HasFlag(FileAttributes.Directory))
            {
                files.AddRange(Directory.GetFiles(source, "*.*", SearchOption.AllDirectories).Where(x => !x.Contains("_thumbnails")));
            }
            else
            {
                files.Add(source);
            }

            System.Threading.Tasks.Parallel.ForEach(files, file =>
            {
                // set destination extension to jpg
                var destination = dest ?? Path.Combine(Path.GetDirectoryName(file), "_thumbnails", Path.GetFileName(file) + ".jpg");

                // check if source is newer than destination
                if (forceUpdate || File.GetLastWriteTime(file) > File.GetLastWriteTime(destination))
                {
                    // create destination folder
                    var folder = Directory.CreateDirectory(Path.GetDirectoryName(destination));
                    if (hideDictionary)
                        folder.Attributes = FileAttributes.Directory | FileAttributes.Hidden;
                    else
                        folder.Attributes = FileAttributes.Directory;

                    // create thumbnails
                    try
                    {
                        if (!CreateThumbnaliFromImage(file, destination, size))
                            CreateThumbnailFromVideo(file, destination, size);
                    }
                    catch (Exception)
                    {
                    }
                }

            });
        }

        private static bool CreateThumbnaliFromImage(string path, string destination, Size newSize)
        {
            if (!ImageExtensions.Contains(Path.GetExtension(path).ToUpper()))
            {
                return false;
            }

            var oryginal = (Bitmap)Image.FromFile(path);


            var thumbWidth = 0;
            var thumbHeight = 0;

            if (oryginal.Height > oryginal.Width)
            {
                thumbWidth = newSize.Width;
                thumbHeight = (int)((oryginal.Height / (float)oryginal.Width) * newSize.Width);
            }
            else
            {
                thumbHeight = newSize.Height;
                thumbWidth = (int)((oryginal.Width / (float)oryginal.Height) * newSize.Height);
            }

            var x = (newSize.Width - thumbWidth) / 2;
            var y = (newSize.Height - thumbHeight) / 2;

            var thumbnail = new Bitmap(newSize.Width, newSize.Height);
            var g = Graphics.FromImage(thumbnail);
            g.SmoothingMode = SmoothingMode.HighQuality;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            var rect = new Rectangle(x, y, thumbWidth, thumbHeight);
            g.DrawImage(oryginal, rect, 0, 0, oryginal.Width, oryginal.Height, GraphicsUnit.Pixel);

            if (thumbnail != null)
            {
                thumbnail.Save(destination, ImageFormat.Jpeg);
            }
            return true;
        }

        public static void CreateThumbnailFromVideo(string source, string destination, Size newSize)
        {
            if (!VideoExtensions.Contains(Path.GetExtension(source).ToUpper()))
            {
                return;
            }

            // delete previous, ffmpeg requires manual confirmation to override file
            if (File.Exists(destination))
            {
                File.Delete(destination);
            }

            var cmd = $"ffmpeg  -itsoffset -1  -i \"{source}\" -vcodec mjpeg -vframes 1 -an -f rawvideo -s {newSize.Width}x{newSize.Height} \"{destination}\"";

            var startInfo = new System.Diagnostics.ProcessStartInfo
            {
                WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden,
                FileName = "cmd.exe",
                Arguments = "/C " + cmd
            };

            var process = new System.Diagnostics.Process
            {
                StartInfo = startInfo
            };

            process.Start();
            process.WaitForExit(500);
        }

    }
}
