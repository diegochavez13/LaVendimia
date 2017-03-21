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
    public class VentasController : Controller
    {
        //
        // GET: /Ventas/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ObtenerVentas()
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROVentas Ventas = new BROVentas();
                Res = Ventas.ObtenerVentas();
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult FolioVenta()
        {
             CRespuesta Res = new CRespuesta();

            try
            {
                BROVentas Ventas = new BROVentas();
                Res = Ventas.FolioVenta();
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ObtenerArticulos_Ventas()
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROVentas Ventas = new BROVentas();
                Res = Ventas.ObtenerArticulos_Ventas();
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GuardarVenta(string args,string args2)
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROVentas Ventas = new BROVentas();
                Res = Ventas.GuardarVenta(args, args2);
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }
        
	}
}