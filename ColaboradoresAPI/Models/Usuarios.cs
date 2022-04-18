using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ColaboradoresAPI.Models
{
    public class Usuarios
    {
        [Key]
        public int ID { get; set; }
        public string NomeCompleto { get; set; }
        public string UsuarioNome { get; set; }
        public string Senha { get; set; }
        public string Telefone { get; set; }
        public string TipoUsuario { get; set; }
    }
}
