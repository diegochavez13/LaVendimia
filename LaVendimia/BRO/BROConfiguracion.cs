using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using System.Web.Script.Serialization;
using System.Runtime.Serialization.Json;
using LaVendimia.Models;
using System.Configuration;
using LaVendimia.Clases;
using System.Globalization;

namespace LaVendimia.BRO
{
    public class BROConfiguracion:ComunCompartido
    {
        public CRespuesta GuardarConfiguracion(decimal deTasaFinanciamiento, int inEnganche, int inPlazoMaximo)
        {
            CRespuesta Res = new CRespuesta();
            
            args.Add(new SqlArgs("deTasaFinanciamiento",deTasaFinanciamiento,SqlDbType.Decimal));
            args.Add(new SqlArgs("inEnganche",inEnganche,SqlDbType.Int));
            args.Add(new SqlArgs("inPlazoMaximo",inPlazoMaximo,SqlDbType.Int));

            if (ExecStoreProcedure("GuardarConfiguracion", args, ref sMessage))
            {
                Res.shStatus = (short)Definitions.OK_;
            }
            else {
                Res.sDescription = sMessage;
            }

            return Res;
        }

        public CRespuesta CancelarConfiguracion()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos,"CancelarConfiguracion", new List<SqlArgs>(), ref sMessage))
            {
                Res.shStatus = (short)Definitions.OK_;

                if(datos.Tables[0].Rows.Count > 0)
                {
                    var Resultado = (from d in datos.Tables[0].AsEnumerable() 
                                     select new 
                                     {
                                         deTasaFinanciamiento = d.Field<decimal>("deTasaFinanciamiento"),
                                         inEnganche = d.Field<int>("deEnganche"),
                                         inPlazoMaximo = d.Field<int>("inPlazoMaximo")
                                     }).ToList();

                    Res.data = Resultado;
                }
                else
                {
                    return Res;
                }
            }
            else
            {
                Res.sDescription = sMessage;
            }

            return Res;
        }
    }
}