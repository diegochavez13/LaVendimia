using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Xml.Linq;

namespace LaVendimia.Models
{
        public class ComunCompartido : CConexion
        {
            protected string sMessage;
            protected CRespuesta Respuesta;
            protected DataSet datos;
            protected XDocument xml;
            protected List<SqlArgs> args;

            public ComunCompartido()
            {
                this.sMessage = string.Empty;
                this.Respuesta = new CRespuesta();
                this.datos = new DataSet();
                this.xml = new XDocument();
                this.args = new List<SqlArgs>();
            }

            public ComunCompartido(DataBase database)
                : base(database)
            {
                this.sMessage = string.Empty;
                this.Respuesta = new CRespuesta();
                this.datos = new DataSet();
                this.xml = new XDocument();
                this.args = new List<SqlArgs>();
            }
        }
    }