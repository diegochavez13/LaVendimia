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
    public class BROArticulos : ComunCompartido
    {
        public CRespuesta ClaveArticulo()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos, "ClaveArticulo", new List<SqlArgs>(), ref sMessage))
            {
             
                if (datos.Tables[0].Rows.Count > 0)
                {
                    var Resultado = (from d in datos.Tables[0].AsEnumerable()
                                     select new
                                     {
                                         inClaveArticulo = d.Field<int>("inClaveArticulo")
                                     }).ToList();

                    Res.shStatus = (short)Definitions.OK_;
                    Res.data = Resultado;
                }else
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

        public CRespuesta GuardarArticulo(string nvDescripcion, decimal dePrecio, decimal inExistencia, int inClaveArticulo, string nvModeloArticulo)
        {
            CRespuesta Res = new CRespuesta();
            args.Add(new SqlArgs("nvDescripcion", nvDescripcion, SqlDbType.NVarChar));
            args.Add(new SqlArgs("dePrecio", dePrecio, SqlDbType.Decimal));
            args.Add(new SqlArgs("inExistencia", inExistencia, SqlDbType.Decimal));
            args.Add(new SqlArgs("inClaveArticulo", inClaveArticulo, SqlDbType.Int));
            args.Add(new SqlArgs("nvModeloArticulo", nvModeloArticulo, SqlDbType.NVarChar));

            if (ExecStoreProcedure("GuardarArticulo", args, ref sMessage))
            {
                Res.shStatus = (short)Definitions.OK_;
            }
            else
            {
                Res.sDescription = sMessage;
            }

            return Res;
        }

        public CRespuesta ObtenerArticulos()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos, "ObtenerArticulos", new List<SqlArgs>(), ref sMessage))
            {
                Res.shStatus = (short)Definitions.OK_;
                if (datos.Tables[0].Rows.Count > 0)
                {
                    var Resultado = (from d in datos.Tables[0].AsEnumerable()
                                     select new
                                     {
                                         unID = d.Field<Guid>("unID"),
                                         nvDescripcion = d.Field<string>("nvDescripcion"),
                                         nvModelo = d.Field<string>("nvModelo"),
                                         dePrecio = d.Field<decimal>("dePrecio"),
                                         deExistencia = d.Field<decimal>("deExistencia"),
                                         inClaveArticulo = d.Field<int>("inClaveArticulo")
                                     }).ToList();

                    
                    Res.data = Resultado;
                }else
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