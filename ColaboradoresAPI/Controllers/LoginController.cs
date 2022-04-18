using ColaboradoresAPI.Data;
using ColaboradoresAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColaboradoresAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DatabaseContext _Context;
        public LoginController(DatabaseContext databaseContext)
        {
            _Context = databaseContext;
        }
        [HttpGet("Usuarios")]
        public IActionResult GetUsers()
        {
            var UsuarioDetalhes = _Context.Usuario.AsQueryable();
            return Ok(UsuarioDetalhes);
        }
        [HttpPost("Registro")]
        public IActionResult Registrar([FromBody] Usuarios usuarios)
        {
            if (usuarios == null)
            {
                return BadRequest();
            }
            else
            {
                _Context.Usuario.Add(usuarios);
                _Context.SaveChanges();
                return Ok(new { StatusCode = 200, Message = "Usuario Adicionado com Sucesso" });
            }
        }
        [HttpPost("Login")]
        public IActionResult Login([FromBody] Usuarios usuarios)
        {
            if (usuarios == null)
            {
                return BadRequest();
            }
            else
            {
                var usuario = _Context.Usuario.Where(x => x.UsuarioNome == usuarios.UsuarioNome && x.Senha == usuarios.Senha).FirstOrDefault();
                if (usuario != null)
                {
                    return Ok(new { StatusCode = 200, Message = "Logado com Sucesso", UserData = usuarios.NomeCompleto });
                }
                else
                {
                    return NotFound(new { StatusCode = 404, Message = "Usuario Não Encontrado" });
                }
            }
        }
    }
}
