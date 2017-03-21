using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace LaVendimia.Models
{
    public class CVentas
    {
        public decimal deImporteAbono { set; get; }
        public decimal deImporteAhorro { set; get; }
        public decimal deTotalaPagar { set; get; }
        public int inMeses { set; get; }
        public decimal deCantidad { set; get; }
        public decimal deImporte { set; get; }
        public int inFolioVenta { set; get; }
        public Guid unArticuloID { set; get; }
        public Guid unClienteID { set; get; }
        public decimal dePrecio { set; get; }
    }
}