window.VetLifeDatos = {
  credencialesAdministrador: [
    { usuario: 'admin', contrasena: 'admin123', nombre: 'Dra. Ramírez', correo: 'admin@vetlife.com' },
    { usuario: 'admin@vetlife.com', contrasena: 'admin123', nombre: 'Dra. Ramírez', correo: 'admin@vetlife.com' }
  ],
  servicios: [
    { id:'S-01', nombre:'Consulta General', categoria:'Medicina Interna', duracion:30, precio:40, activo:true },
    { id:'S-02', nombre:'Consulta Especializada', categoria:'Medicina Interna', duracion:45, precio:55, activo:true },
    { id:'S-03', nombre:'Ecografía Abdominal', categoria:'Imagen', duracion:30, precio:45, activo:true },
    { id:'S-04', nombre:'Radiografía Digital', categoria:'Imagen', duracion:20, precio:35, activo:true },
    { id:'S-05', nombre:'Tomografía Computada', categoria:'Imagen', duracion:60, precio:180, activo:true },
    { id:'S-06', nombre:'Resonancia Magnética', categoria:'Imagen', duracion:90, precio:250, activo:false },
    { id:'S-07', nombre:'Hemograma Completo', categoria:'Laboratorio', duracion:120, precio:20, activo:true },
    { id:'S-08', nombre:'Bioquímica Sérica', categoria:'Laboratorio', duracion:180, precio:30, activo:true },
    { id:'S-09', nombre:'Uroanálisis', categoria:'Laboratorio', duracion:60, precio:15, activo:true },
    { id:'S-10', nombre:'Cultivo Bacteriano', categoria:'Laboratorio', duracion:2880, precio:50, activo:true },
    { id:'S-11', nombre:'Ecocardiografía', categoria:'Cardiología', duracion:45, precio:95, activo:true },
    { id:'S-12', nombre:'Electrocardiograma', categoria:'Cardiología', duracion:20, precio:40, activo:true },
    { id:'S-13', nombre:'Limpieza Dental', categoria:'Odontología', duracion:40, precio:70, activo:true },
    { id:'S-14', nombre:'Extracción Dental', categoria:'Odontología', duracion:45, precio:50, activo:true },
    { id:'S-15', nombre:'Castración / Esterilización', categoria:'Cirugía', duracion:60, precio:120, activo:true },
    { id:'S-16', nombre:'Cirugía de Tejidos Blandos', categoria:'Cirugía', duracion:120, precio:200, activo:true }
  ],
  pacientesDemo: [
    {id:'P-001',nombre:'Luna',especie:'Perro',raza:'Border Collie',edad:'4 años',propietario:'María González',telefono:'+51 900 111 223',ultimaVisita:'2026-08-20',visitas:12,estado:'activo'},
    {id:'P-002',nombre:'Simba',especie:'Gato',raza:'Persa',edad:'6 años',propietario:'Carlos Méndez',telefono:'+51 900 444 556',ultimaVisita:'2026-08-18',visitas:8,estado:'activo'},
    {id:'P-003',nombre:'Rocky',especie:'Perro',raza:'Labrador',edad:'2 años',propietario:'Ana Torres',telefono:'+51 900 777 889',ultimaVisita:'2026-08-15',visitas:5,estado:'activo'},
    {id:'P-004',nombre:'Milo',especie:'Conejo',raza:'Belier',edad:'1 año',propietario:'Pedro Ruiz',telefono:'+51 900 000 112',ultimaVisita:'2026-07-30',visitas:3,estado:'activo'},
    {id:'P-005',nombre:'Bella',especie:'Perro',raza:'Bulldog Francés',edad:'3 años',propietario:'Laura Sosa',telefono:'+51 900 333 445',ultimaVisita:'2026-08-10',visitas:7,estado:'activo'},
    {id:'P-006',nombre:'Max',especie:'Perro',raza:'Golden Retriever',edad:'7 años',propietario:'Jorge Flores',telefono:'+51 900 666 778',ultimaVisita:'2026-08-05',visitas:22,estado:'activo'},
    {id:'P-007',nombre:'Coco',especie:'Ave',raza:'Loro Africano',edad:'5 años',propietario:'Sandra Lima',telefono:'+51 900 999 001',ultimaVisita:'2026-08-01',visitas:4,estado:'activo'},
    {id:'P-008',nombre:'Nala',especie:'Gato',raza:'Siamés',edad:'2 años',propietario:'Tomás Vera',telefono:'+51 900 222 334',ultimaVisita:'2026-07-28',visitas:6,estado:'inactivo'},
    {id:'P-009',nombre:'Toby',especie:'Perro',raza:'Poodle',edad:'9 años',propietario:'Patricia Ríos',telefono:'+51 900 555 667',ultimaVisita:'2026-07-15',visitas:34,estado:'activo'},
    {id:'P-010',nombre:'Lola',especie:'Perro',raza:'Dálmata',edad:'3 años',propietario:'Andrés Pinto',telefono:'+51 900 888 990',ultimaVisita:'2026-08-12',visitas:9,estado:'activo'}
  ],
  citasDemo: [
    {id:'C-1001',fecha:'2026-08-28',hora:'08:30',paciente:'Luna',propietario:'María González',servicio:'Consulta General',veterinario:'Dra. Ramírez',telefono:'+51 900 111 223',estado:'confirmada'},
    {id:'C-1002',fecha:'2026-08-28',hora:'09:30',paciente:'Simba',propietario:'Carlos Méndez',servicio:'Ecocardiografía',veterinario:'Dr. Salazar',telefono:'+51 900 444 556',estado:'pendiente'},
    {id:'C-1003',fecha:'2026-08-28',hora:'11:00',paciente:'Rocky',propietario:'Ana Torres',servicio:'Radiografía Digital',veterinario:'Dra. Ramírez',telefono:'+51 900 777 889',estado:'en curso'},
    {id:'C-1004',fecha:'2026-08-28',hora:'14:30',paciente:'Milo',propietario:'Pedro Ruiz',servicio:'Consulta Especializada',veterinario:'Dr. Salazar',telefono:'+51 900 000 112',estado:'pendiente'},
    {id:'C-1005',fecha:'2026-08-28',hora:'16:00',paciente:'Bella',propietario:'Laura Sosa',servicio:'Limpieza Dental',veterinario:'Dra. Ramírez',telefono:'+51 900 333 445',estado:'completada'}
  ],
  pasos: [
    {numero:'01',titulo:'Crea tu cuenta',texto:'Registra tus datos de contacto para que podamos identificar tus reservas.'},
    {numero:'02',titulo:'Registra a tu mascota',texto:'Guarda los datos básicos de tu compañero para agilizar la atención.'},
    {numero:'03',titulo:'Reserva tu cita',texto:'Selecciona servicio, mascota, fecha y horario disponible.'}
  ]
};
