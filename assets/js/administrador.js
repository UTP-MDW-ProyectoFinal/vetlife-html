(function () {
  'use strict';

  const {
    ICONOS_ESPECIE,
    obtenerCuenta,
    obtenerMascotas,
    obtenerCitas,
    obtenerServicios,
    guardarAlmacenamiento,
    escaparHtml,
    obtenerFechaActual,
    formatearFecha
  } = window.VetLife;

  function citasAdministrativas() {
    const citasUsuario = obtenerCitas().map(cita => ({
      id: cita.id,
      fecha: cita.fecha,
      hora: cita.hora,
      paciente: cita.mascotaNombre,
      propietario: cita.nombrePropietario,
      servicio: cita.servicio,
      veterinario: 'Por asignar',
      telefono: cita.telefonoPropietario,
      estado: cita.estado
    }));

    return [...VetLifeDatos.citasDemo, ...citasUsuario];
  }

  function renderizarDashboard() {
    const citas = citasAdministrativas();
    const contenedor = document.getElementById('resumenAdmin');
    if (!contenedor) return;

    const hoy = obtenerFechaActual();
    const citasHoy = citas.filter(cita => cita.fecha === hoy).length;
    const pendientes = citas.filter(cita => cita.estado === 'pendiente').length;
    const pacientes = VetLifeDatos.pacientesDemo.length + obtenerMascotas().length;
    const serviciosActivos = obtenerServicios().filter(servicio => servicio.activo).length;

    const estadisticas = [
      ['Citas de hoy', citasHoy, 'bi-calendar-check'],
      ['Pendientes', pendientes, 'bi-hourglass-split'],
      ['Pacientes', pacientes, 'bi-heart-pulse'],
      ['Servicios activos', serviciosActivos, 'bi-clipboard2-pulse']
    ];

    contenedor.innerHTML = estadisticas.map(([titulo, valor, icono]) => `
      <div class="col-sm-6 col-xl-3">
        <div class="tarjeta-estadistica p-4 h-100">
          <div class="d-flex justify-content-between">
            <span class="small text-secondary">${escaparHtml(titulo)}</span>
            <i class="bi ${icono} text-principal"></i>
          </div>
          <div class="display-6 font-heading mt-2">${valor}</div>
        </div>
      </div>`).join('');

    const agenda = document.getElementById('agendaAdmin');
    if (agenda) {
      agenda.innerHTML = citas.slice(0, 5).map(cita => `
        <tr>
          <td>${escaparHtml(cita.hora)}</td>
          <td>${escaparHtml(cita.paciente)}</td>
          <td>${escaparHtml(cita.servicio)}</td>
          <td><span class="badge text-bg-light">${escaparHtml(cita.estado)}</span></td>
        </tr>`).join('');
    }

    const fecha = document.getElementById('fechaAdministrador');
    if (fecha) {
      fecha.textContent = new Date().toLocaleDateString('es-PE', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  }

  function renderizarAdminCitas() {
    const cuerpoTabla = document.getElementById('cuerpoTablaCitas');
    if (!cuerpoTabla) return;

    const buscador = document.getElementById('buscarCita');
    const botonesFiltro = document.querySelectorAll('[data-filtro-cita]');
    let filtroActual = 'todas';
    let busquedaActual = '';

    const renderizar = () => {
      const citas = citasAdministrativas();
      const textoBusqueda = busquedaActual.toLowerCase();
      const citasFiltradas = citas.filter(cita =>
        (filtroActual === 'todas' || cita.estado === filtroActual) &&
        (!textoBusqueda || [cita.id, cita.paciente, cita.propietario, cita.servicio].join(' ').toLowerCase().includes(textoBusqueda))
      );

      botonesFiltro.forEach(boton => {
        const activo = boton.dataset.filtroCita === filtroActual;
        boton.classList.toggle('btn-vet-primary', activo);
        boton.classList.toggle('btn-vet-soft', !activo);
      });

      cuerpoTabla.innerHTML = citasFiltradas.length
        ? citasFiltradas.map(cita => `
          <tr class="cursor-pointer" data-id="${escaparHtml(cita.id)}">
            <td class="font-monospace small">${escaparHtml(cita.id)}</td>
            <td>${escaparHtml(formatearFecha(cita.fecha))}</td>
            <td class="fw-semibold">${escaparHtml(cita.hora)}</td>
            <td><strong>${escaparHtml(cita.paciente)}</strong><div class="small text-secondary">${escaparHtml(cita.propietario)}</div></td>
            <td>${escaparHtml(cita.servicio)}</td>
            <td>${escaparHtml(cita.veterinario)}</td>
            <td><span class="badge text-bg-light">${escaparHtml(cita.estado)}</span></td>
          </tr>`).join('')
        : '<tr><td colspan="7" class="text-center text-secondary py-5">No se encontraron citas.</td></tr>';

      cuerpoTabla.querySelectorAll('tr[data-id]').forEach(fila => {
        fila.addEventListener('click', () => mostrarDetalleCita(fila.dataset.id, citas));
      });
    };

    botonesFiltro.forEach(boton => {
      boton.addEventListener('click', () => {
        filtroActual = boton.dataset.filtroCita;
        renderizar();
      });
    });

    buscador?.addEventListener('input', () => {
      busquedaActual = buscador.value;
      renderizar();
    });

    renderizar();
  }

  function mostrarDetalleCita(id, citas) {
    const cita = citas.find(citaActual => citaActual.id === id);
    const panel = document.getElementById('detalleCita');
    if (!cita || !panel) return;

    panel.classList.remove('d-none');
    panel.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0">Detalle de cita</h2>
        <button class="btn-close" aria-label="Cerrar"></button>
      </div>
      <div class="bg-principal-suave rounded p-3 mb-3">
        <div class="font-monospace small">${escaparHtml(cita.id)}</div>
        <div class="h3 font-heading text-principal">${escaparHtml(cita.hora)}</div>
        <div class="small text-secondary">${escaparHtml(formatearFecha(cita.fecha))}</div>
      </div>
      <dl class="row small">
        <dt class="col-5 text-secondary">Paciente</dt><dd class="col-7">${escaparHtml(cita.paciente)}</dd>
        <dt class="col-5 text-secondary">Propietario</dt><dd class="col-7">${escaparHtml(cita.propietario)}</dd>
        <dt class="col-5 text-secondary">Teléfono</dt><dd class="col-7">${escaparHtml(cita.telefono || '—')}</dd>
        <dt class="col-5 text-secondary">Servicio</dt><dd class="col-7">${escaparHtml(cita.servicio)}</dd>
        <dt class="col-5 text-secondary">Veterinario</dt><dd class="col-7">${escaparHtml(cita.veterinario)}</dd>
      </dl>`;

    panel.querySelector('.btn-close').addEventListener('click', () => panel.classList.add('d-none'));
  }

  function pacientesAdministrativos() {
    const cuenta = obtenerCuenta();
    const mascotasUsuario = obtenerMascotas().map((mascota, indice) => ({
      id: `U-${indice + 1}`,
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza || 'Sin raza',
      edad: mascota.edad || 'No indicada',
      propietario: cuenta ? `${cuenta.nombre} ${cuenta.apellido}`.trim() : 'Usuario VetLife',
      telefono: cuenta?.telefono || '—',
      ultimaVisita: 'Nueva',
      visitas: 0,
      estado: 'activo'
    }));

    return [...VetLifeDatos.pacientesDemo, ...mascotasUsuario];
  }

  function renderizarAdminPacientes() {
    const grid = document.getElementById('gridPacientes');
    if (!grid) return;

    const buscador = document.getElementById('buscarPaciente');
    const filtros = document.querySelectorAll('[data-filtro-especie]');
    let especieActual = 'todas';
    let busquedaActual = '';

    const renderizar = () => {
      const pacientes = pacientesAdministrativos();
      const textoBusqueda = busquedaActual.toLowerCase();
      const pacientesFiltrados = pacientes.filter(paciente =>
        (especieActual === 'todas' || paciente.especie === especieActual) &&
        (!textoBusqueda || [paciente.nombre, paciente.propietario, paciente.raza].join(' ').toLowerCase().includes(textoBusqueda))
      );

      filtros.forEach(filtro => {
        const activo = filtro.dataset.filtroEspecie === especieActual;
        filtro.classList.toggle('btn-vet-primary', activo);
        filtro.classList.toggle('btn-vet-soft', !activo);
      });

      grid.innerHTML = pacientesFiltrados.length
        ? pacientesFiltrados.map(paciente => `
          <article class="col">
            <div class="card tarjeta-vet h-100 cursor-pointer" data-id="${escaparHtml(paciente.id)}">
              <div class="card-body p-3">
                <div class="d-flex gap-3">
                  <div class="fs-2">${ICONOS_ESPECIE[paciente.especie] || '🐾'}</div>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between gap-2">
                      <h2 class="h6 mb-1">${escaparHtml(paciente.nombre)}</h2>
                      <span class="badge text-bg-light">${escaparHtml(paciente.estado)}</span>
                    </div>
                    <div class="small text-secondary">${escaparHtml(paciente.raza)} · ${escaparHtml(paciente.edad)}</div>
                    <div class="small mt-2">${escaparHtml(paciente.propietario)}</div>
                    <div class="d-flex justify-content-between mt-2">
                      <small class="text-secondary">Última: ${escaparHtml(paciente.ultimaVisita)}</small>
                      <small class="text-principal fw-semibold">${paciente.visitas} visitas</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>`).join('')
        : '<div class="col-12 text-center text-secondary py-5">No se encontraron pacientes.</div>';

      grid.querySelectorAll('[data-id]').forEach(card => {
        card.addEventListener('click', () => mostrarDetallePaciente(card.dataset.id, pacientes));
      });
    };

    filtros.forEach(filtro => {
      filtro.addEventListener('click', () => {
        especieActual = filtro.dataset.filtroEspecie;
        renderizar();
      });
    });

    buscador?.addEventListener('input', () => {
      busquedaActual = buscador.value;
      renderizar();
    });

    renderizar();
  }

  function mostrarDetallePaciente(id, pacientes) {
    const paciente = pacientes.find(pacienteActual => pacienteActual.id === id);
    const panel = document.getElementById('detallePaciente');
    if (!paciente || !panel) return;

    panel.classList.remove('d-none');
    panel.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0">Ficha de paciente</h2>
        <button class="btn-close" aria-label="Cerrar"></button>
      </div>
      <div class="text-center mb-3">
        <div class="display-5">${ICONOS_ESPECIE[paciente.especie] || '🐾'}</div>
        <h3 class="h4 font-heading">${escaparHtml(paciente.nombre)}</h3>
        <small class="text-secondary">${escaparHtml(paciente.id)} · ${escaparHtml(paciente.raza)}</small>
      </div>
      <dl class="row small">
        <dt class="col-5 text-secondary">Especie</dt><dd class="col-7">${escaparHtml(paciente.especie)}</dd>
        <dt class="col-5 text-secondary">Edad</dt><dd class="col-7">${escaparHtml(paciente.edad)}</dd>
        <dt class="col-5 text-secondary">Propietario</dt><dd class="col-7">${escaparHtml(paciente.propietario)}</dd>
        <dt class="col-5 text-secondary">Teléfono</dt><dd class="col-7">${escaparHtml(paciente.telefono)}</dd>
        <dt class="col-5 text-secondary">Visitas</dt><dd class="col-7">${paciente.visitas}</dd>
      </dl>`;

    panel.querySelector('.btn-close').addEventListener('click', () => panel.classList.add('d-none'));
  }

  function renderizarAdminServicios() {
    const contenedor = document.getElementById('listaServiciosAdmin');
    if (!contenedor) return;

    let servicios = obtenerServicios();
    const filtros = document.querySelectorAll('[data-filtro-categoria]');
    let categoriaActual = 'todas';

    const formatearDuracion = window.VetLifeModulos.servicios?.formatearDuracion || (minutos => `${minutos} min`);

    const renderizar = () => {
      const serviciosFiltrados = servicios.filter(servicio =>
        categoriaActual === 'todas' || servicio.categoria === categoriaActual
      );

      filtros.forEach(filtro => {
        const activo = filtro.dataset.filtroCategoria === categoriaActual;
        filtro.classList.toggle('btn-vet-primary', activo);
        filtro.classList.toggle('btn-vet-soft', !activo);
      });

      const estadisticas = document.getElementById('estadisticasServicios');
      if (estadisticas) {
        const categorias = [...new Set(servicios.map(servicio => servicio.categoria))];
        const precioPromedio = servicios.length
          ? Math.round(servicios.reduce((total, servicio) => total + servicio.precio, 0) / servicios.length)
          : 0;

        estadisticas.innerHTML = [
          ['Total', servicios.length],
          ['Activos', servicios.filter(servicio => servicio.activo).length],
          ['Categorías', categorias.length],
          ['Precio promedio', `S/ ${precioPromedio}`]
        ].map(([titulo, valor]) => `
          <div class="col-sm-6 col-xl-3">
            <div class="tarjeta-estadistica p-3">
              <small class="text-secondary">${escaparHtml(titulo)}</small>
              <div class="h4 font-heading text-principal mt-1 mb-0">${escaparHtml(valor)}</div>
            </div>
          </div>`).join('');
      }

      const categoriasFiltradas = [...new Set(serviciosFiltrados.map(servicio => servicio.categoria))];
      contenedor.innerHTML = categoriasFiltradas.map(categoria => `
        <section class="mb-4">
          <h2 class="h6 mb-2">${escaparHtml(categoria)}</h2>
          <div class="table-responsive">
            <table class="table tabla-vet align-middle bg-white border rounded overflow-hidden">
              <thead>
                <tr><th>ID</th><th>Servicio</th><th>Duración</th><th>Precio</th><th>Estado</th><th>Acción</th></tr>
              </thead>
              <tbody>
                ${serviciosFiltrados.filter(servicio => servicio.categoria === categoria).map(servicio => `
                  <tr>
                    <td class="font-monospace small">${escaparHtml(servicio.id)}</td>
                    <td>${escaparHtml(servicio.nombre)}</td>
                    <td>${escaparHtml(formatearDuracion(servicio.duracion))}</td>
                    <td class="fw-semibold text-principal">S/ ${escaparHtml(servicio.precio)}</td>
                    <td><span class="badge text-bg-light">${servicio.activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td><button class="btn btn-sm btn-vet-soft" data-cambiar-servicio="${escaparHtml(servicio.id)}">${servicio.activo ? 'Desactivar' : 'Activar'}</button></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </section>`).join('');

      contenedor.querySelectorAll('[data-cambiar-servicio]').forEach(boton => {
        boton.addEventListener('click', () => {
          const idServicio = boton.dataset.cambiarServicio;
          servicios = servicios.map(servicio => servicio.id === idServicio
            ? { ...servicio, activo: !servicio.activo }
            : servicio
          );
          guardarAlmacenamiento(window.VetLife.CLAVES_ALMACENAMIENTO.servicios, servicios);
          renderizar();
        });
      });
    };

    filtros.forEach(filtro => {
      filtro.addEventListener('click', () => {
        categoriaActual = filtro.dataset.filtroCategoria;
        renderizar();
      });
    });

    renderizar();
  }

  function configurarMenuAdministrador() {
    const botonMenu = document.getElementById('botonMenuAdmin');
    const barraLateral = document.getElementById('barraLateralAdmin');
    const superposicion = document.getElementById('superposicionAdmin');

    const cerrarMenu = () => {
      barraLateral?.classList.remove('mostrar');
      superposicion?.classList.add('d-none');
    };

    botonMenu?.addEventListener('click', () => {
      barraLateral?.classList.toggle('mostrar');
      superposicion?.classList.toggle('d-none');
    });

    superposicion?.addEventListener('click', cerrarMenu);
    barraLateral?.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', cerrarMenu));
  }

  window.VetLifeModulos = window.VetLifeModulos || {};
  window.VetLifeModulos.administrador = {
    iniciar() {
      configurarMenuAdministrador();
      const paginaAdministrativa = document.body.dataset.adminPagina;
      if (paginaAdministrativa === 'dashboard') renderizarDashboard();
      if (paginaAdministrativa === 'citas') renderizarAdminCitas();
      if (paginaAdministrativa === 'pacientes') renderizarAdminPacientes();
      if (paginaAdministrativa === 'servicios') renderizarAdminServicios();
    }
  };
}());
