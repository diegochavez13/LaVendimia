using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace LaVendimia.Models
{
    public class CConexionDatos
    {
        public string sNombreServidor { get; set; }
        public string sBaseDatosNombre { get; set; }
        public string sUsuario { get; set; }
        public string sContrasenia { get; set; }

        public CConexionDatos(DataBase db)
        {
            switch (db)
            {
                case DataBase.Vendimia:
                        sNombreServidor = System.Configuration.ConfigurationManager.AppSettings.Get("ServerName");
                        sBaseDatosNombre = System.Configuration.ConfigurationManager.AppSettings.Get("DataBase");
                        sUsuario = System.Configuration.ConfigurationManager.AppSettings.Get("UserName");
                        sContrasenia = System.Configuration.ConfigurationManager.AppSettings.Get("PassWord");
                    break;
            }
        }
    }

    public enum DataBase
    {
        Vendimia = 1
    }
    
    public class CConexion
    {
        private SqlTransaction transaccion;
        private SqlConnection conexion;
        private SqlCommand comando;
        private SqlDataAdapter adaptador;

        public CConexion()
        {
            try
            {
                string sNombreServidor = ConfigurationManager.AppSettings["ConexionBD"].ToString();
                conexion = new SqlConnection(sNombreServidor);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message, ex);
            }
        }

        public class SqlArgs
        {
            public string sNombreParametro { get; set; }
            public Object valor { get; set; }
            public SqlDbType tipo { get; set; }

            public SqlArgs()
            {

            }
            public SqlArgs(string _sNombreParametro, Object _valor, SqlDbType _tipo)
            {
                sNombreParametro = _sNombreParametro;
                valor = _valor;
                tipo = _tipo;
            }
        }

        public CConexion(DataBase DataBase)
        {
            string sServerName = string.Empty;
            try
            {
                switch (DataBase)
                {
                    case DataBase.Vendimia:
                        sServerName = ConfigurationManager.AppSettings["ConexionBD"].ToString();
                        break;
                    default:
                        sServerName = ConfigurationManager.AppSettings["ConexionBD"].ToString();
                        break;
                }

                conexion = new SqlConnection(sServerName);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message, ex);
            }

        }

        public bool BeginTran(ref string sMessage)
        {

            bool bRet = false;

            try
            {
                if (this.conexion.State != ConnectionState.Open)
                {
                    this.conexion.Open();
                }

                this.transaccion = this.conexion.BeginTransaction();

                bRet = true;
            }
            catch (Exception ex)
            {
                sMessage = ex.Message;
            }

            return bRet;
        }

        public void Commit()
        {
            if (this.transaccion != null)
            {
                this.transaccion.Commit();
                this.conexion.Close();
            }
        }
        /// <summary>
        /// Manually rollback (Optional)
        /// </summary>
        public void Rollback()
        {
            if (this.transaccion != null)
            {
                this.transaccion.Rollback();
                this.conexion.Close();
            }
        }

        public bool ExecStoreProcedure(ref DataSet DataSet, string sStoreProcedure, string sXml, ref string sMessage, int iTimeout = 30)
        {
            bool bRet = false;

            bool bExistTransaction = transaccion != null;

            try
            {
                if (this.conexion.State != ConnectionState.Open)
                {
                    this.conexion.Open();
                }

                if (bExistTransaction)
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion, this.transaccion);
                }
                else
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion);
                }

                comando.CommandType = CommandType.StoredProcedure;

                comando.Parameters.AddWithValue("@psXML", sXml);

                comando.CommandTimeout = iTimeout;

                adaptador = new SqlDataAdapter(comando);

                adaptador.Fill(DataSet);

                if (!bExistTransaction)
                {
                    this.conexion.Close();
                }

                bRet = true;
            }
            catch (Exception ex)
            {
                sMessage = ex.Message;

                if (bExistTransaction)
                {
                    this.transaccion.Rollback();
                }

                this.conexion.Close();
            }


            return bRet;
        }

        public bool ExecStoreProcedure(ref DataSet DataSet, string sStoreProcedure, List<SqlArgs> arguments, ref string sMessage, int iTimeout = 30)
        {
            bool bRet = false;

            bool bExistTransaction = transaccion != null;

            try
            {
                if (this.conexion.State != ConnectionState.Open)
                {
                    this.conexion.Open();
                }

                if (bExistTransaction)
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion, this.transaccion);
                }
                else
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion);
                }

                comando.CommandType = CommandType.StoredProcedure;

                comando.CommandTimeout = iTimeout;

                foreach (SqlArgs arg in arguments)
                {
                    comando.Parameters.AddWithValue("@" + arg.sNombreParametro, arg.tipo);
                    comando.Parameters["@" + arg.sNombreParametro].Value = arg.valor ;
                }

                adaptador = new SqlDataAdapter(comando);

                adaptador.Fill(DataSet);

                if (!bExistTransaction)
                {
                    this.conexion.Close();
                }

                bRet = true;
            }
            catch (Exception ex)
            {
                sMessage = ex.Message;

                if (bExistTransaction)
                {
                    this.transaccion.Rollback();
                }

                this.conexion.Close();
            }


            return bRet;
        }

        public bool ExecStoreProcedure(string sStoreProcedure, string sXml, ref string sMessage, int iTimeout = 30)
        {
            bool bRet = false;

            bool bExistTransaction = transaccion != null;

            try
            {
                if (this.conexion.State != ConnectionState.Open)
                {
                    this.conexion.Open();
                }

                if (bExistTransaction)
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion, this.transaccion);
                }
                else
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion);
                }

                comando.CommandType = CommandType.StoredProcedure;

                comando.CommandTimeout = iTimeout;

                comando.Parameters.AddWithValue("@psXML", sXml);

                comando.ExecuteNonQuery();

                if (!bExistTransaction)
                {
                    this.conexion.Close();
                }

                bRet = true;
            }
            catch (Exception ex)
            {
                sMessage = ex.Message;

                if (bExistTransaction)
                {
                    this.transaccion.Rollback();
                }

                this.conexion.Close();
            }
            return bRet;
        }

        public bool ExecStoreProcedure(string sStoreProcedure, List<SqlArgs> arguments, ref string sMessage, int iTimeout = 30)
        {
            bool bRet = false;

            bool bExistTransaction = transaccion != null;

            try
            {
                if (this.conexion.State != ConnectionState.Open)
                {
                    this.conexion.Open();
                }

                if (bExistTransaction)
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion, this.transaccion);
                }
                else
                {
                    comando = new SqlCommand(sStoreProcedure, this.conexion);
                }

                comando.CommandType = CommandType.StoredProcedure;

                comando.CommandTimeout = iTimeout;

                foreach (SqlArgs arg in arguments)
                {
                    comando.Parameters.AddWithValue("@" + arg.sNombreParametro, arg.tipo);
                    comando.Parameters["@" + arg.sNombreParametro].Value = arg.valor;
                }

                comando.ExecuteNonQuery();

                if (!bExistTransaction)
                {
                    this.conexion.Close();
                }

                bRet = true;
            }
            catch (Exception ex)
            {
                sMessage = ex.Message;

                if (bExistTransaction)
                {
                    this.transaccion.Rollback();
                }

                this.conexion.Close();
            }


            return bRet;
        }

        public bool ExecSqlCommand(string sSql, ref string sMessage, int iTimeout = 30)
        {
            bool bRet = false;

            bool bExistTransaction = transaccion != null;

            try
            {
                if (this.conexion.State != ConnectionState.Open)
                {
                    this.conexion.Open();
                }

                if (bExistTransaction)
                {
                    comando = new SqlCommand(sSql, this.conexion, this.transaccion);
                }
                else
                {
                    comando = new SqlCommand(sSql, this.conexion);
                }

                comando.CommandType = CommandType.Text;

                comando.CommandTimeout = iTimeout;

                //command.CommandText = sSql;

                comando.ExecuteNonQuery();

                if (!bExistTransaction)
                {
                    this.conexion.Close();
                }

                bRet = true;
            }
            catch (Exception ex)
            {
                sMessage = ex.Message;

                if (bExistTransaction)
                {
                    this.transaccion.Rollback();
                }
            }

            return bRet;
        }

        public bool ExecSqlCommand(ref DataSet DataSet, string sSql, List<SqlArgs> arguments, ref string sMessage, int iTimeout = 30)
        {
            bool bRet = false;

            bool bExistTransaction = transaccion != null;

            try
            {
                if (this.conexion.State != ConnectionState.Open)
                {
                    this.conexion.Open();
                }

                if (bExistTransaction)
                {
                    comando = new SqlCommand(sSql, this.conexion, this.transaccion);
                }
                else
                {
                    comando = new SqlCommand(sSql, this.conexion);
                }

                comando.CommandType = CommandType.Text;

                comando.CommandTimeout = iTimeout;

                foreach (SqlArgs arg in arguments)
                {
                    comando.Parameters.AddWithValue("@" + arg.sNombreParametro, arg.tipo);
                    comando.Parameters["@" + arg.sNombreParametro].Value = arg.valor;
                }
                //command.CommandText = sSql;

                adaptador = new SqlDataAdapter(comando);

                adaptador.Fill(DataSet);

                if (!bExistTransaction)
                {
                    this.conexion.Close();
                }

                bRet = true;
            }
            catch (Exception ex)
            {
                sMessage = ex.Message;

                if (bExistTransaction)
                {
                    this.transaccion.Rollback();
                }
            }

            return bRet;
        }
    }
}