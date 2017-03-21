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
    public class BROClientes:ComunCompartido
    {
        public CRespuesta ClaveCliente()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos, "ClaveCliente", new List<SqlArgs>(), ref sMessage))
            {

                if (datos.Tables[0].Rows.Count > 0)
                {
                    var Resultado = (from d in datos.Tables[0].AsEnumerable()
                                     select new
                                     {
                                         inClaveCliente = d.Field<int>("inClaveCliente")
                                     }).ToList();

                    Res.shStatus = (short)Definitions.OK_;
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

        public CRespuesta GuardarCliente(string nvNombre, string nvApellidoPaterno, string nvApellidoMaterno, int inClaveCliente, string nvRFC)
        {
            CRespuesta Res = new CRespuesta();
            args.Add(new SqlArgs("nvNombre", nvNombre, SqlDbType.NVarChar));
            args.Add(new SqlArgs("nvApellidoPaterno", nvApellidoPaterno, SqlDbType.NVarChar));
            args.Add(new SqlArgs("nvApellidoMaterno", nvApellidoMaterno, SqlDbType.NVarChar));
            args.Add(new SqlArgs("inClaveCliente", inClaveCliente, SqlDbType.Int));
            args.Add(new SqlArgs("nvRFC", nvRFC, SqlDbType.NVarChar));

            if (ExecStoreProcedure("GuardarCliente", args, ref sMessage))
            {
                Res.shStatus = (short)Definitions.OK_;
            }
            else
            {
                Res.sDescription = sMessage;
            }

            return Res;
        }

        public CRespuesta ObtenerClientes()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos, "ObtenerClientes", new List<SqlArgs>(), ref sMessage))
            {
                Res.shStatus = (short)Definitions.OK_;
                if (datos.Tables[0].Rows.Count > 0)
                {
                    var Resultado = (from d in datos.Tables[0].AsEnumerable()
                                     select new
                                     {
                                         unID = d.Field<Guid>("unID"),
                                         nvNombre = d.Field<string>("nvNombre"),
                                         nvApellidoPaterno = d.Field<string>("nvApellidoPaterno"),
                                         nvApellidoMaterno = d.Field<string>("nvApellidoMaterno"),
                                         nvRFC = d.Field<string>("nvRFC"),
                                         inClaveCliente = d.Field<int>("inClaveCliente"),
                                         nvNombreCompleto = d.Field<string>("nvNombreCompleto")
                                     }).ToList();

                    Res.shStatus = (short)Definitions.OK_;
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