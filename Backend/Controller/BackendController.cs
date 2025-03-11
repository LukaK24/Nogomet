using AutoMapper;
using Backend.Data;

namespace Backend.Controller
{
    public class BackendController
    {
        private BackendContext context;
        private IMapper mapper;

        public BackendController(BackendContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
    }
}