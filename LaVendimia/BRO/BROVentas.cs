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
using System.Threading;

namespace LaVendimia.BRO
{
    public class BROVentas : ComunCompartido
    {
        public CRespuesta ObtenerVentas()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos, "ObtenerVentas", new List<SqlArgs>(), ref sMessage))
            {
                Res.shStatus = (short)Definitions.OK_;
                if (datos.Tables[0].Rows.Count > 0)
                {
                    var Resultado = (from d in datos.Tables[0].AsEnumerable()
                                     select new
                                     {
                                        inFolioVenta = d.Field<int>("inFolioVenta"),
                                        inClaveCliente = d.Field<int>("inClaveCliente"),
                                        nvNombreCompleto = d.Field<string>("nvNombreCompleto"),
                                        deTotal = d.Field<decimal>("deTotal"),
                                        daFechaRegistro = d.Field<DateTime>("daFechaRegistro").ToShortDateString(),
                                        Estatus = d.Field<Int16>("Estatus")
                                     });
                    Res.data = Resultado.ToList();
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

        public CRespuesta FolioVenta()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos, "FolioVenta", new List<SqlArgs>(), ref sMessage))
            {

                if (datos.Tables[0].Rows.Count > 0)
                {
                    var Resultado = (from d in datos.Tables[0].AsEnumerable()
                                     select new
                                     {
                                         inFolioVenta = d.Field<int>("inFolioVenta")
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

        public CRespuesta ObtenerArticulos_Ventas()
        {
            CRespuesta Res = new CRespuesta();

            if (ExecStoreProcedure(ref datos, "ObtenerArticulos_Ventas", new List<SqlArgs>(), ref sMessage))
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
                                         inClaveArticulo = d.Field<int>("inClaveArticulo"),
                                         deEngache = d.Field<int>("deEngache"),
                                         deTasaFinanciamiento = d.Field<decimal>("deTasaFinanciamiento"),
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

        public CRespuesta GuardarVenta(string args, string args2)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<CVentas> Cabecero = new List<CVentas>();
            List<CVentas> Detalle = new List<CVentas>();

            Cabecero = serializer.Deserialize<List<CVentas>>(args);
            Detalle = serializer.Deserialize<List<CVentas>>(args2);

            xml.Add(new XElement("Cabecero",
                    from item1 in Cabecero
                    select new XElement("lstCabecero",
                            new XElement("deImporteAbono", item1.deImporteAbono),
                            new XElement("deImporteAhorro", item1.deImporteAhorro),
                            new XElement("deTotalaPagar", item1.deTotalaPagar),
                            new XElement("inMeses", item1.inMeses),
                            new XElement("unClienteID", item1.unClienteID),
                            new XElement("inFolioVenta", item1.inFolioVenta),
                                new XElement("lstDetalle",
                                    from item2 in Detalle
                                    select new XElement("lstDetalle",
                                       new XElement("deCantidad", item2.deCantidad),
                                       new XElement("deImporte", item2.deImporte),
                                        new XElement("unArticuloID", item2.unArticuloID),
                                        new XElement("dePrecio",item2.dePrecio)
                                       )))));

            if (BeginTran(ref sMessage))
            {
                if (this.ExecStoreProcedure("GuardarVenta", xml.ToString(), ref sMessage))
                {
                    Commit();
                    Respuesta.shStatus = (short)Definitions.OK_;
                }
                else
                {
                    Respuesta.sDescription = this.sMessage;
                }
            }
            else
            {
                Respuesta.sDescription = this.sMessage;
            }

            return Respuesta;
        }
    }
}