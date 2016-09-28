using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Model
{
    interface IAppXml<T>
    {
        T LoadXml();
        void SaveXml();
    }
}
