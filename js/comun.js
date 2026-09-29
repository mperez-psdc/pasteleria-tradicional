/* Marco común: menú por rol, avisos y conexión. */
(function () {
  const NAV = {
    cliente: [
      ["Catálogo", "cliente/catalogo.html"],
      ["Pedido", "cliente/pedido.html"],
      ["Perfil", "cliente/perfil.html"],
      ["Calificación", "cliente/calificacion.html"],
    ],
    mostrador: [
      ["Pedidos y caja", "mostrador/pedidos.html"],
    ],
    pastelero: [
      ["Tablero de cocina", "produccion/tablero.html"],
    ],
    gerencia: [
      ["Panel", "gerencia/panel.html", "Fase 1"],
      ["Inventario", "gerencia/inventario.html", "Fase 1"],
      ["Personal", "gerencia/personal.html", "Fase 4"],
      ["Servicios", "gerencia/servicios.html", "Fase 4"],
      ["Marketing", "gerencia/marketing.html", "Fase 2 y 4"],
    ],
  };

  const NOMBRE_ROL = {
    cliente: "Cliente",
    mostrador: "Mostrador",
    pastelero: "Cocina",
    gerencia: "Gerencia",
  };

  function base() {
    const ruta = decodeURIComponent(location.pathname).replace(/\\/g, "/");
    if (/\/(cliente|mostrador|produccion|gerencia|publico)\//.test(ruta)) return "../";
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
    };
    return mapa[estado] || estado;
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

  function iniciar(opciones) {
    const rolPedido = opciones.rol || "";
    const rolActual = sessionStorage.getItem("rol") || "";
    if (rolPedido && rolActual !== rolPedido) {
      dejarAviso("Entre con el rol de " + (NOMBRE_ROL[rolPedido] || rolPedido) + ".");
      location.replace(base() + "index.html");
      return false;
    }
    const raiz = base();
    const links = (NAV[rolActual] || []).map(function (item) {
      const activo = location.pathname.replace(/\\/g, "/").endsWith(item[1]);
      const fase = item[2] ? '<span class="fase">' + esc(item[2]) + "</span>" : "";
      return '<a href="' + esc(raiz + item[1]) + '"' + (activo ? ' aria-current="page"' : "") + ">" + esc(item[0]) + fase + "</a>";
    }).join("");
    const chipFase = opciones.fase ? '<span class="fase fase-grande">' + esc(opciones.fase) + "</span>" : "";
    const aviso = avisoTomar();
    const red = navigator.onLine ? "" : '<p class="banner-red" role="status">Sin conexión. En el local se atiende igual y se registra cuando vuelva la red. Esta demostración guarda los datos solo en este navegador.</p>';
    document.getElementById("marco").innerHTML =
      '<header class="cabecera">' +
        '<div class="marca"><a href="' + esc(raiz) + 'index.html">Pastelería Tradicional</a><small>Pedidos, caja, cocina y gerencia</small></div>' +
        '<nav class="menu" aria-label="Secciones del rol">' + links + "</nav>" +
        '<div class="sesion"><span>' + esc(rolActual ? NOMBRE_ROL[rolActual] : "Entrada") + "</span>" +
        '<a class="enlace-suave" href="' + esc(raiz) + 'index.html">Cambiar rol</a></div>' +
      "</header>" +
      red +
      '<div id="zona-red"></div>' +
      (aviso ? '<p class="aviso" role="status">' + esc(aviso) + "</p>" : "") +
      '<main class="pagina"><div class="titulo-pagina"><h1>' + esc(opciones.titulo || "") + "</h1>" + chipFase + "</div><div id='contenido'></div></main>" +
      '<footer class="pie">Prototipo de demostración. El cambio de rol no es una clave real. No hay pasarela de pago, ni envío de correo, ni factura de la DGI, ni sincronización entre computadoras. El comprobante es interno.</footer>';
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
    const clase = tipo === "error" ? "aviso error" : "aviso ok";
    const nodo = document.createElement("p");
    nodo.className = clase;
    nodo.setAttribute("role", "status");
    nodo.textContent = texto;
    const caja = contenido();
    caja.insertBefore(nodo, caja.firstChild);
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

  function htmlClienteActivo(datos) {
    const activo = clienteActivo() || (datos.clientes[0] ? datos.clientes[0].id : "");
    if (activo && !clienteActivo()) fijarClienteActivo(activo);
    const opciones = datos.clientes.map(function (cliente) {
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
    htmlClienteActivo: htmlClienteActivo,
  };
})();
