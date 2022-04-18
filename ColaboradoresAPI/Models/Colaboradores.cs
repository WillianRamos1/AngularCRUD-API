using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ColaboradoresAPI.Models
{
    public class Colaboradores
    {
        [Required]
        [Key]
        public int ID { get; set; }
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int Salario { get; set; }
        
    }
}
