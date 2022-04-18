using ColaboradoresAPI.Data;
using ColaboradoresAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColaboradoresAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradoresController : ControllerBase
    {
        private readonly DatabaseContext _Context;
        public ColaboradoresController(DatabaseContext databaseContext)
        {
            _Context = databaseContext;
        }

        [HttpPost("Adicionar_Colaborador")]
        public IActionResult AdicionarColaborador([FromBody] Colaboradores colaboradores)
        {
            if (colaboradores == null)
            {
                return BadRequest();
            }
            else
            {
                _Context.Colaboradores.Add(colaboradores);
                _Context.SaveChanges();
                return Ok(new { StatusCode = 200, Message = "Colaborador Adicionado com Sucesso" });
            }
        }
        [HttpPut("Alterar_Colaborador")]
        public IActionResult AlterarColaborador([FromBody] Colaboradores colaboradores)
        {
            if (colaboradores == null)
            {
                return BadRequest();
            }
            var usuario = _Context.Colaboradores.AsNoTracking().FirstOrDefault(x => x.ID == colaboradores.ID);
            if (usuario == null)
            {
                return NotFound(new { StatusCode = 404, Message = "Usuario Não Encontrado" });
            }
            else
            {
                _Context.Entry(colaboradores).State = EntityState.Modified;
                _Context.SaveChanges();
                return Ok(new { StatusCode = 200, Message = "Colaborador Atualizado com Sucesso" });
            }
        }
        [HttpDelete("Apagar_Colaborador/{id}")]
        public IActionResult ApagarColaborador(int id)
        {
            var usuarios = _Context.Colaboradores.Find(id);
            if (usuarios == null)
            {
                return NotFound(new { StatusCode = 404, Message = "Usuario Não Encontrado" });
            }
            else
            {
                _Context.Remove(usuarios);
                _Context.SaveChanges();
                return Ok(new { StatusCode = 200, Message = "Colaborador Apagado com Sucesso" });
            }
        }
        [HttpGet("Todos_Colaboradores")]
        public IActionResult TodosColaboradores()
        {
            var colaboradores = _Context.Colaboradores.AsQueryable();
            return Ok(new { StatusCode = 200, DetalhesColaborador = colaboradores});
        }
        [HttpGet("Mostrar_Colaboradores/id")]
        public IActionResult Mostrar_Colaboradores(int id)
        {
            var colaborador = _Context.Colaboradores.Find(id);
            if (colaborador == null)
            {
                return NotFound(new { StatusCode = 404, Message = "Usuario Não Encontrado" });
            }
            else
            {
                return Ok(new { StatusCode = 200, DetalhesColaborador = colaborador});
            }
        }
    }
}
