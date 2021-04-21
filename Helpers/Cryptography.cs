using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MINIPROJECT91.Helpers
{
    public static class Cryptography
    {
        public static string encryptkey = "Knila@123";

        public static string Encrypt(string Value)
        {
            try
            {
                byte[] data = UTF8Encoding.UTF8.GetBytes(Value);
                string Encrypted = string.Empty;
                using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
                {
                    byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(encryptkey));
                    using (TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider()
                    {
                        Key = keys,
                        Mode = CipherMode.ECB,
                        Padding = PaddingMode.PKCS7
                    })
                    {
                        ICryptoTransform transform = tripleDES.CreateEncryptor();
                        byte[] result = transform.TransformFinalBlock(data, 0, data.Length);
                        Encrypted = Convert.ToBase64String(result, 0, result.Length);
                    }
                    return Encrypted;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static string Decrypt(string value)
        {
            try
            {
                byte[] data = Convert.FromBase64String(value);
                string Decrypted = string.Empty;
                using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
                {
                    byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(encryptkey));
                    using (TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider()
                    {
                        Key = keys,
                        Mode = CipherMode.ECB,
                        Padding = PaddingMode.PKCS7
                    })
                    {
                        ICryptoTransform transform = tripleDES.CreateDecryptor();
                        byte[] result = transform.TransformFinalBlock(data, 0, data.Length);
                        Decrypted = UTF8Encoding.UTF8.GetString(result);
                    }
                    return Decrypted;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
