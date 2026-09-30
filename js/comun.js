/* Marco común: sesión, menú por módulo y avisos. */
(function () {
  const MODULOS = [
    {
      titulo: "Ventas",
      roles: ["admin", "cajero"],
      items: [["Pedidos y caja", "mostrador/pedidos.html", "Fase 1"]],
    },
    {
      titulo: "Dirección",
      roles: ["admin"],
      items: [["Operación del día", "gerencia/panel.html", "Fase 1"]],
    },
    {
      titulo: "Producción",
      roles: ["admin", "pastelero"],
      items: [["Tablero de cocina", "produccion/tablero.html", "Fase 1"]],
    },
    {
      titulo: "Inventario",
      roles: ["admin"],
      items: [["Existencias y kardex", "gerencia/inventario.html", "Fase 1"]],
    },
    {
      titulo: "Compras",
      roles: ["admin"],
      items: [
        ["Proveedores", "compras/proveedores.html", "Fase 1"],
        ["Órdenes de compra", "compras/ordenes.html", "Fase 1"],
      ],
    },
    {
      titulo: "Contabilidad",
      roles: ["admin", "contador"],
      items: [
        ["Libro", "contabilidad/libro.html", "Fase 1"],
        ["Cuentas por pagar", "contabilidad/pagar.html", "Fase 1"],
        ["Resultados", "contabilidad/resultados.html", "Fase 1"],
      ],
    },
    {
      titulo: "Clientes",
      roles: ["admin", "cliente"],
      items: [
        ["Catálogo", "cliente/catalogo.html", "Fase 3"],
        ["Pedido", "cliente/pedido.html", "Fase 3"],
        ["Perfil", "cliente/perfil.html", "Fase 3"],
        ["Calificación", "cliente/calificacion.html", "Fase 3"],
      ],
    },
    {
      titulo: "Personal y difusión",
      roles: ["admin"],
      items: [
        ["Personal", "gerencia/personal.html", "Fase 4"],
        ["Servicios", "gerencia/servicios.html", "Fase 4"],
        ["Marketing", "gerencia/marketing.html", "Fase 2 y 4"],
      ],
    },
    {
      titulo: "Reportes",
      roles: ["admin", "contador"],
      items: [["Panel de KPIs", "reportes/panel.html", "Fase 1"]],
    },
  ];

  const NOMBRE_ROL = {
    admin: "Administración",
    cajero: "Caja",
    pastelero: "Cocina",
    contador: "Contabilidad",
    cliente: "Cliente",
    mostrador: "Caja",
    gerencia: "Administración",
  };

  const DESTINO = {
    admin: "reportes/panel.html",
    cajero: "mostrador/pedidos.html",
    pastelero: "produccion/tablero.html",
    contador: "contabilidad/libro.html",
    cliente: "cliente/catalogo.html",
  };

  function base() {
    const ruta = decodeURIComponent(location.pathname).replace(/\\/g, "/");
    if (/\/(cliente|mostrador|produccion|gerencia|publico|compras|contabilidad|reportes)\//.test(ruta)) return "../";
    return "";
  }

  function esc(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, function (caracter) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[caracter];
    });
  }

  function estadoTexto(estado) {
    const mapa = {
      recibido: "Recibido",
      en_produccion: "En producción",
      listo: "Listo",
      entregado: "Entregado",
      anulado: "Anulado",
      borrador: "Borrador",
      enviada: "Enviada",
      recibida: "Recibida",
      pendiente: "Pendiente",
      pagada: "Pagada",
    };
    return mapa[estado] || estado;
  }

  function rolActual() {
    return sessionStorage.getItem("rol") || "";
  }

  function autorizado(rolPedido) {
    if (!rolPedido) return true;
    const actual = rolActual();
    if (!actual) return false;
    if (actual === "admin") return true;
    if (actual === rolPedido) return true;
    if (rolPedido === "mostrador" && actual === "cajero") return true;
    if (rolPedido === "gerencia" && actual === "admin") return true;
    return false;
  }

  function destinoDe(rol) {
    return DESTINO[rol] || "login.html";
  }

  function avisoTomar() {
    const params = new URLSearchParams(location.search);
    const enUrl = params.get("aviso");
    if (enUrl) return enUrl;
    const guardado = sessionStorage.getItem("aviso");
    if (guardado) {
      sessionStorage.removeItem("aviso");
      return guardado;
    }
    return "";
  }

  function dejarAviso(texto) {
    sessionStorage.setItem("aviso", texto);
  }

  function menuHtml(raiz) {
    const rol = rolActual();
    if (!rol) {
      return '<a href="' + esc(raiz) + 'login.html">Entrar</a><a href="' + esc(raiz) + 'publico/inicio.html">Vitrina</a>';
    }
    const ruta = location.pathname.replace(/\\/g, "/");
    return MODULOS.filter(function (modulo) {
      return modulo.roles.indexOf(rol) !== -1;
    }).map(function (modulo) {
      const links = modulo.items.map(function (item) {
        const activo = ruta.endsWith(item[1]);
        const fase = item[2] ? '<span class="fase">' + esc(item[2]) + "</span>" : "";
        return '<a href="' + esc(raiz + item[1]) + '"' + (activo ? ' aria-current="page"' : "") + ">" + esc(item[0]) + fase + "</a>";
      }).join("");
      return '<p class="grupo-nav">' + esc(modulo.titulo) + "</p>" + links;
    }).join("");
  }

  function iniciar(opciones) {
    const rolPedido = opciones.rol || "";
    if (rolPedido && !autorizado(rolPedido)) {
      dejarAviso(rolActual() ? "Ese módulo no está en su usuario." : "Entre con su usuario.");
      location.replace(base() + "login.html");
      return false;
    }
    const raiz = base();
    const rol = rolActual();
    const chipFase = opciones.fase ? '<span class="fase fase-grande">' + esc(opciones.fase) + "</span>" : "";
    const aviso = avisoTomar();
    const red = navigator.onLine ? "" : '<p class="banner-red" role="status">Sin conexión. En el local se atiende igual y se registra cuando vuelva la red. Esta demostración guarda los datos solo en este navegador.</p>';
    const nombre = sessionStorage.getItem("nombreUsuario") || NOMBRE_ROL[rol] || "Invitado";
    document.getElementById("marco").innerHTML =
      '<div class="app">' +
        '<aside class="lado"><a class="marca-lado" href="' + esc(raiz) + (rol ? destinoDe(rol) : "index.html") + '">Pastelería Tradicional</a>' +
        '<nav class="menu-lado" aria-label="Módulos">' + menuHtml(raiz) + "</nav></aside>" +
        '<div class="cuerpo">' +
          '<header class="cabecera"><div class="marca"><strong>' + esc(opciones.titulo || "Pastelería") + "</strong><small>" + esc(nombre) + "</small></div>" +
          '<div class="sesion"><span>' + esc(NOMBRE_ROL[rol] || "Sin sesión") + "</span>" +
          (rol ? '<button type="button" class="secundario" id="salir">Cerrar sesión</button>' : '<a class="enlace-suave" href="' + esc(raiz) + 'login.html">Entrar</a>') +
          "</div></header>" +
          red +
          '<div id="zona-red"></div>' +
          (aviso ? '<p class="aviso" role="status">' + esc(aviso) + "</p>" : "") +
          '<main class="pagina"><div class="titulo-pagina"><h1>' + esc(opciones.titulo || "") + "</h1>" + chipFase + "</div><div id='contenido'></div></main>" +
          '<footer class="pie">Demostración. Las claves no son reales. No hay pasarela, ni correo real, ni factura de la DGI, ni datos compartidos entre computadoras. El comprobante y la contabilidad son internos.</footer>' +
        "</div></div>";
    const salir = document.getElementById("salir");
    if (salir) {
      salir.addEventListener("click", function () {
        sessionStorage.removeItem("rol");
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("nombreUsuario");
        location.href = base() + "login.html";
      });
    }
    window.addEventListener("offline", pintarRed);
    window.addEventListener("online", pintarRed);
    return true;
  }

  function pintarRed() {
    const zona = document.getElementById("zona-red");
    if (!zona) return;
    zona.innerHTML = navigator.onLine
      ? ""
      : '<p class="banner-red" role="status">Sin conexión. En el local se atiende igual y se registra cuando vuelva la red. Esta demostración guarda los datos solo en este navegador.</p>';
  }

  function contenido() {
    return document.getElementById("contenido");
  }

  function mensaje(texto, tipo) {
    const clase = tipo === "error" ? "aviso error" : tipo === "warn" ? "aviso warn" : "aviso ok";
    const nodo = document.createElement("p");
    nodo.className = clase;
    nodo.setAttribute("role", "status");
    nodo.textContent = texto;
    const caja = contenido();
    if (caja) caja.insertBefore(nodo, caja.firstChild);
  }

  function clienteActivo() {
    return sessionStorage.getItem("clienteActivo") || "";
  }

  function fijarClienteActivo(id) {
    sessionStorage.setItem("clienteActivo", id);
  }

  function pasteleroActivo() {
    return sessionStorage.getItem("pasteleroActivo") || "b1";
  }

  function fijarPasteleroActivo(id) {
    sessionStorage.setItem("pasteleroActivo", id);
  }

  function entrar(rol) {
    sessionStorage.setItem("rol", rol);
  }

  function entrarUsuario(usuario) {
    sessionStorage.setItem("rol", usuario.rol);
    sessionStorage.setItem("usuario", usuario.usuario);
    sessionStorage.setItem("nombreUsuario", usuario.nombre);
    if (usuario.clienteId) fijarClienteActivo(usuario.clienteId);
    if (usuario.pasteleroId) fijarPasteleroActivo(usuario.pasteleroId);
    location.href = base() + destinoDe(usuario.rol);
  }

  function htmlClienteActivo(datos) {
    const fijo = rolActual() === "cliente" ? sessionStorage.getItem("clienteActivo") : "";
    const lista = fijo ? datos.clientes.filter(function (cliente) { return cliente.id === fijo; }) : datos.clientes;
    const activo = clienteActivo() || (lista[0] ? lista[0].id : "");
    if (activo && !clienteActivo()) fijarClienteActivo(activo);
    if (fijo) {
      const uno = lista[0];
      return '<p>Perfil: <strong>' + esc(uno ? uno.nombre : "") + "</strong></p>";
    }
    const opciones = lista.map(function (cliente) {
      const marca = cliente.id === (clienteActivo() || activo) ? " selected" : "";
      return '<option value="' + esc(cliente.id) + '"' + marca + ">" + esc(cliente.nombre) + "</option>";
    }).join("");
    return '<label>Perfil con el que está pidiendo<select id="cliente-activo">' + opciones + "</select></label>";
  }

  window.PasteleriaUI = {
    base: base,
    esc: esc,
    estadoTexto: estadoTexto,
    iniciar: iniciar,
    contenido: contenido,
    mensaje: mensaje,
    dejarAviso: dejarAviso,
    clienteActivo: clienteActivo,
    fijarClienteActivo: fijarClienteActivo,
    pasteleroActivo: pasteleroActivo,
    fijarPasteleroActivo: fijarPasteleroActivo,
    entrar: entrar,
    entrarUsuario: entrarUsuario,
    destinoDe: destinoDe,
    htmlClienteActivo: htmlClienteActivo,
    rolActual: rolActual,
  };
})();
