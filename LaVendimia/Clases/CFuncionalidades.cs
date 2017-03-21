using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaVendimia.Clases
{
    public class CFuncionalidades
    {
        public Guid unIDModulo { set; get; }
        public Guid unIDFuncionalidad { set; get; }
        public string sNombreFuncionalidad { set; get; }
        public string sAccion { set; get; }
        public int inOrder { set; get; }
    }
}