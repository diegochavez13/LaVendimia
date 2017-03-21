using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaVendimia.Models
{
    public class CRespuesta
    {
        public short shStatus { get; set; }
        public string sDescription { get; set; }
        public Object data;
        public string sTitle { get; set; }

        public CRespuesta() 
        {
            this.shStatus = (short)Definitions.ERR_;
            this.sDescription = "DEFAULT";
            this.sTitle = "Mensaje";
            this.data = null;
        }
    }

    public enum Definitions
    {
        OK_                                 = 1,
        DEFAULT_                            = 0,
        ERR_                                = -1,
        NO_DATOS                            = 2
    }
}