/* Marco común: sesión, menú por módulo y avisos. */
(function () {
  const MODULOS = [
    { titulo: "Ventas", color: "linear-gradient(145deg,#8d4d7a,#c46b8a)", roles: ["admin", "cajero"], href: "mostrador/pedidos.html", items: [["Pedidos y caja", "mostrador/pedidos.html"]] },
    { titulo: "Cocina", color: "linear-gradient(145deg,#e07a3d,#f2b56b)", roles: ["admin", "pastelero"], href: "produccion/tablero.html", items: [["Tablero", "produccion/tablero.html"]] },
    { titulo: "Inventario", color: "linear-gradient(145deg,#1a9b8e,#7dcfb6)", roles: ["admin"], href: "gerencia/inventario.html", items: [["Existencias", "gerencia/inventario.html"]] },
    { titulo: "Compras", color: "linear-gradient(145deg,#3a6fd8,#7eb6ff)", roles: ["admin"], href: "compras/ordenes.html", items: [["Órdenes", "compras/ordenes.html"], ["Proveedores", "compras/proveedores.html"]] },
    { titulo: "Contabilidad", color: "linear-gradient(145deg,#e0a106,#f6d365)", roles: ["admin", "contador"], href: "contabilidad/libro.html", items: [["Libro", "contabilidad/libro.html"], ["Por pagar", "contabilidad/pagar.html"], ["Resultados", "contabilidad/resultados.html"]] },
    { titulo: "Clientes", color: "linear-gradient(145deg,#d4537e,#f3a6c8)", roles: ["admin", "cliente"], href: "cliente/catalogo.html", items: [["Catálogo", "cliente/catalogo.html"], ["Pedido", "cliente/pedido.html"], ["Perfil", "cliente/perfil.html"], ["Calificación", "cliente/calificacion.html"]] },
    { titulo: "Personal", color: "linear-gradient(145deg,#2f9e6b,#8ed9a8)", roles: ["admin"], href: "gerencia/personal.html", items: [["Cumplimiento", "gerencia/personal.html"]] },
    { titulo: "Servicios", color: "linear-gradient(145deg,#5b6b8a,#a9b7d0)", roles: ["admin"], href: "gerencia/servicios.html", items: [["Luz, agua y teléfono", "gerencia/servicios.html"]] },
    { titulo: "Marketing", color: "linear-gradient(145deg,#d64545,#f09a7a)", roles: ["admin"], href: "gerencia/marketing.html", items: [["Campañas", "gerencia/marketing.html"]] },
    { titulo: "Reportes", color: "linear-gradient(145deg,#ef6a3c,#f7c08a)", roles: ["admin", "contador"], href: "reportes/panel.html", items: [["Indicadores", "reportes/panel.html"], ["Operación del día", "gerencia/panel.html"]] },
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

  function destinoDe() {
    return "aplicaciones.html";
  }

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

  function modulosDe(rol) {
    return MODULOS.filter(function (modulo) { return modulo.roles.indexOf(rol) !== -1; });
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
        return '<a href="' + esc(raiz + item[1]) + '"' + (activo ? ' aria-current="page"' : "") + ">" + esc(item[0]) + "</a>";
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
    if (opciones.aplicaciones && !rol) {
      location.replace(raiz + "login.html");
      return false;
    }
    const aviso = avisoTomar();
    const red = navigator.onLine ? "" : '<p class="banner-red" role="status">Sin conexión. En el local se atiende igual y se registra cuando vuelva la red. Esta demostración guarda los datos solo en este navegador.</p>';
    const nombre = sessionStorage.getItem("nombreUsuario") || NOMBRE_ROL[rol] || "Invitado";
    const lateral = opciones.aplicaciones ? "" :
      '<aside class="lado"><a class="marca-lado" href="' + esc(raiz) + 'aplicaciones.html">Aplicaciones</a>' +
      '<nav class="menu-lado" aria-label="Módulos">' + menuHtml(raiz) + "</nav></aside>";
    document.getElementById("marco").innerHTML =
      '<div class="app' + (opciones.aplicaciones ? " app-inicio" : "") + '">' + lateral +
        '<div class="cuerpo">' +
          '<header class="cabecera"><div class="marca"><a href="' + esc(raiz) + 'aplicaciones.html">Pastelería Tradicional</a><small>' + esc(nombre) + "</small></div>" +
          '<div class="sesion"><span>' + esc(NOMBRE_ROL[rol] || "Sin sesión") + "</span>" +
          (rol ? '<button type="button" class="secundario" id="salir">Cerrar sesión</button>' : '<a class="enlace-suave" href="' + esc(raiz) + 'login.html">Entrar</a>') +
          "</div></header>" +
          red +
          '<div id="zona-red"></div>' +
          (aviso ? '<p class="aviso" role="status">' + esc(aviso) + "</p>" : "") +
          '<main class="pagina"><div class="titulo-pagina"><h1>' + esc(opciones.titulo || "") + "</h1></div><div id='contenido'></div></main>" +
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
    location.href = base() + "aplicaciones.html";
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
    modulosDe: modulosDe,
    htmlClienteActivo: htmlClienteActivo,
    rolActual: rolActual,
  };
})();
