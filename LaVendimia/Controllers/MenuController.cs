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
    public class MenuController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult iniDatos()
        {
            CRespuesta Respuesta = new CRespuesta();

            try
            {
                Respuesta.data = DateTime.Now.Day + "/" + DateTime.Now.Month +"/"+ DateTime.Now.Year;
                Respuesta.shStatus = (short)Definitions.OK_;
            }
            catch (Exception Ex)
            {
                Respuesta.sDescription = Ex.Message;
            }

            return Json(Respuesta, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CargarMenu()
        {
            CRespuesta Respuesta = new CRespuesta();
            
            try
            {
                BROMenu BROMenu = new BROMenu();
                Respuesta = BROMenu.CargarMenu();
            }
            catch (Exception Ex)
            {
                Respuesta.sDescription = Ex.Message;
            }
            
            return Json(Respuesta, JsonRequestBehavior.AllowGet);
        }
	}
}