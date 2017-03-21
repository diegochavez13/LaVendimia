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
    public class ConfiguracionController : Controller
    {
        //
        // GET: /Configuracion/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GuardarConfiguracion(decimal deTasaFinanciamiento, int inEnganche, int inPlazoMaximo)
        {

            CRespuesta Res = new CRespuesta();

            try
            {
                BROConfiguracion Conf = new BROConfiguracion();
                Res = Conf.GuardarConfiguracion(deTasaFinanciamiento, inEnganche, inPlazoMaximo);
            }
            catch(Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CancelarConfiguracion()
        {
            CRespuesta Res = new CRespuesta();

            try
            {
                BROConfiguracion Conf = new BROConfiguracion();
                Res = Conf.CancelarConfiguracion();
            }
            catch(Exception Ex)
            {
                Res.sDescription = Ex.Message;
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }
	}
}