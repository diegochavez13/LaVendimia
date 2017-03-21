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
    public class ArticulosController : Controller
    {
        //
        // GET: /Articulos/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ClaveArticulo()
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROArticulos Art = new BROArticulos();
                Res = Art.ClaveArticulo();
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GuardarArticulo(string nvDescripcion, decimal dePrecio, decimal inExistencia, int inClaveArticulo, string nvModeloArticulo)
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROArticulos Art = new BROArticulos();
                Res = Art.GuardarArticulo(nvDescripcion,dePrecio,inExistencia,inClaveArticulo,nvModeloArticulo);
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ObtenerArticulos()
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROArticulos Art = new BROArticulos();
                Res = Art.ObtenerArticulos();
            }
            catch (Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }
	}
}