using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LaVendimia.BRO;
using LaVendimia.Models;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;

namespace LaVendimia.Controllers
{
    public class ClientesController : Controller
    {
        //
        // GET: /Clientes/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ClaveCliente()
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROClientes Clientes = new BROClientes();
                Res = Clientes.ClaveCliente();
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GuardarCliente(string nvNombre, string nvApellidoPaterno,string nvApellidoMaterno,int inClaveCliente,string nvRFC)
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROClientes Clientes = new BROClientes();
                Res = Clientes.GuardarCliente(nvNombre, nvApellidoPaterno, nvApellidoMaterno, inClaveCliente, nvRFC);
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ObtenerClientes()
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROClientes Clientes = new BROClientes();
                Res = Clientes.ObtenerClientes();
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }
	}
}