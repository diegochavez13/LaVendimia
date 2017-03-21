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
    public class BROMenu : ComunCompartido
    {

        public CRespuesta CargarMenu()
        {
            CRespuesta Respuesta = new CRespuesta();
            List<CMenu> ListaMenu = new List<CMenu>();

            if (ExecStoreProcedure(ref datos, "ObtenerModulos", new List<SqlArgs>(), ref sMessage))
            {
                var query_distinct = (from c in datos.Tables[0].AsEnumerable()
                                      select new
                                      {
                                          sNombreModulo = c.Field<string>("nvNombreModulo"),
                                          unIDModulo = c.Field<Guid>("unIDModulo")
                                      }).Distinct().OrderBy(x => x.sNombreModulo);

                var query = (from c in datos.Tables[0].AsEnumerable()
                             select new
                             {
                                 sNombreFuncionalidad = c.Field<string>("nvNombreFuncionalidad"),
                                 unIDModulo = c.Field<Guid>("unIDModulo"),
                                 sAccion = c.Field<string>("nvAccion"),
                                 unIDFuncionalidad = c.Field<Guid>("unIDFuncionalidad"),
                                 inOrder = c.Field<int>("inOrder"),
                             }).ToList();//.OrderBy(x => x.sNameFunctionalities);;

                foreach (var x in query_distinct)
                {
                    CMenu menu = new CMenu();
                    menu.sNombreModulo = x.sNombreModulo.ToString();
                    List<CFuncionalidades> ListaFuncionalidades = new List<CFuncionalidades>();
                    foreach (var y in query)
                    {
                        CFuncionalidades Funcionalidades = new CFuncionalidades();

                        if (y.unIDModulo.ToString() == x.unIDModulo.ToString())
                        {
                            Funcionalidades.sNombreFuncionalidad = y.sNombreFuncionalidad.ToString();
                            Funcionalidades.sAccion = y.sAccion;
                            Funcionalidades.unIDFuncionalidad = y.unIDFuncionalidad;
                            Funcionalidades.inOrder = y.inOrder;
                            ListaFuncionalidades.Add(Funcionalidades);
                        }

                    }
                    menu.ListaFuncionalidades = ListaFuncionalidades;
                    ListaMenu.Add(menu);
                }

                if (ListaMenu.Count > 0)
                {
                    Respuesta.data = ListaMenu;
                    Respuesta.shStatus = (short)Definitions.OK_;
                }
                else
                {
                    Respuesta.shStatus = (short)Definitions.ERR_;
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