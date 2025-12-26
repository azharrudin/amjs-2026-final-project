using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NETCHARSP_BACKEND.Persistence;
using NETCHARSP_BACKEND.Persistence.JWT;
using System.Security.Claims;
namespace NETCHARSP_BACKEND.Controllers.Auth
{
    [ApiController]
    [Route("/api/v1/auth")]
    public class ValidationController : ControllerBase

    {
        private readonly JWT _jwt;
        public ValidationController(AppDBContext context, JWT jwt)
        {
            _jwt = jwt ?? throw new ArgumentNullException(nameof(jwt));
        }
        [HttpPost]
        [Route("validation")]
        public TokenValidationResponse Validate([FromBody] TokenValidationRequest token)
        {
            return _jwt.ValidateToken(token);
        }
    }
}