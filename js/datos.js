/* Datos y reglas del prototipo. Todo queda en este navegador. */
(function () {
  const CLAVE = "pasteleria-tradicional-v1";
  const MAX_TAREAS = 2;
  const ANTICIPO = 0.5;

  function hoy() {
    return iso(new Date());
  }

  function iso(fecha) {
    const d = fecha instanceof Date ? fecha : new Date(fecha + "T12:00:00");
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + dia;
  }

  function sumarDias(base, dias) {
    const d = new Date(base + "T12:00:00");
    d.setDate(d.getDate() + dias);
    return iso(d);
  }

  function dinero(n) {
    return Number(n || 0).toLocaleString("es-PA", {
      style: "currency",
      currency: "USD",
    });
  }

  function fechaCorta(valor) {
    if (!valor) return "—";
    const [anio, mes, dia] = valor.split("-");
    return dia + "/" + mes + "/" + anio;
  }

  function redondear(n) {
    return Math.round(Number(n) * 100) / 100;
  }

  function semilla() {
    const hoyIso = hoy();
    const datos = {
      version: 2,
      productos: [
        { id: "p1", nombre: "Pastel de chocolate", descripcion: "Ocho porciones, cobertura de chocolate.", precio: 28, stock: 4, rotacion: "alta", tipo: "estandar" },
        { id: "p2", nombre: "Tres leches", descripcion: "Bizcocho húmedo, para llevar o encargar.", precio: 22, stock: 3, rotacion: "alta", tipo: "estandar" },
        { id: "p3", nombre: "Cupcakes de vainilla", descripcion: "Caja de seis.", precio: 12, stock: 8, rotacion: "alta", tipo: "estandar" },
        { id: "p4", nombre: "Galletas de mantequilla", descripcion: "Caja. Sale menos que el resto de la vitrina.", precio: 8, stock: 16, rotacion: "baja", tipo: "estandar" },
        { id: "p5", nombre: "Brazo de gitano", descripcion: "Hoy no hay en vitrina.", precio: 18, stock: 0, rotacion: "baja", tipo: "estandar" },
        { id: "p6", nombre: "Pastel a medida", descripcion: "Se hornea para una fecha. No sale del estante. Requiere anticipo.", precio: 50, stock: null, rotacion: "alta", tipo: "medida" },
      ],
      insumos: [
        { id: "i1", nombre: "Harina", cantidad: 20, unidad: "kg", minimo: 8, vence: sumarDias(hoyIso, 60) },
        { id: "i2", nombre: "Mantequilla", cantidad: 2, unidad: "kg", minimo: 3, vence: sumarDias(hoyIso, 5) },
        { id: "i3", nombre: "Huevos", cantidad: 8, unidad: "docenas", minimo: 4, vence: sumarDias(hoyIso, 12) },
        { id: "i4", nombre: "Chocolate", cantidad: 5, unidad: "kg", minimo: 2, vence: sumarDias(hoyIso, 40) },
      ],
      clientes: [
        { id: "c1", nombre: "Doña Marta Ruiz", telefono: "6000-1101", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: false, desde: sumarDias(hoyIso, -400), sexo: "F", rangoEdad: "55+", laboral: "jubilado" },
        { id: "c2", nombre: "Luis Ortega", telefono: "6000-2240", correo: "luis.ortega@correo.com", tipo: "nuevo", canal: "web", consentimiento: true, desde: sumarDias(hoyIso, -12), sexo: "M", rangoEdad: "25-34", laboral: "trabaja" },
        { id: "c3", nombre: "Andrea Pérez", telefono: "6000-3301", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: true, desde: sumarDias(hoyIso, -200), sexo: "F", rangoEdad: "25-34", laboral: "trabaja" },
        { id: "c4", nombre: "Sofía Chen", telefono: "6000-3302", correo: "", tipo: "fiel", canal: "web", consentimiento: true, desde: sumarDias(hoyIso, -180), sexo: "F", rangoEdad: "18-24", laboral: "estudia" },
        { id: "c5", nombre: "Carmen Díaz", telefono: "6000-3303", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: false, desde: sumarDias(hoyIso, -300), sexo: "F", rangoEdad: "45-54", laboral: "trabaja" },
        { id: "c6", nombre: "Rosa Méndez", telefono: "6000-3304", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: true, desde: sumarDias(hoyIso, -90), sexo: "F", rangoEdad: "35-44", laboral: "trabaja" },
        { id: "c7", nombre: "Elena Vásquez", telefono: "6000-3305", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: false, desde: sumarDias(hoyIso, -500), sexo: "F", rangoEdad: "55+", laboral: "jubilado" },
        { id: "c8", nombre: "Jorge Salas", telefono: "6000-3306", correo: "", tipo: "nuevo", canal: "web", consentimiento: true, desde: sumarDias(hoyIso, -40), sexo: "M", rangoEdad: "18-24", laboral: "estudia" },
        { id: "c9", nombre: "Mario Quiel", telefono: "6000-3307", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: false, desde: sumarDias(hoyIso, -220), sexo: "M", rangoEdad: "35-44", laboral: "trabaja" },
        { id: "c10", nombre: "Pedro Alonso", telefono: "6000-3308", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: true, desde: sumarDias(hoyIso, -150), sexo: "M", rangoEdad: "45-54", laboral: "trabaja" },
        { id: "c11", nombre: "Héctor Núñez", telefono: "6000-3309", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: false, desde: sumarDias(hoyIso, -420), sexo: "M", rangoEdad: "55+", laboral: "jubilado" },
        { id: "c12", nombre: "Valeria Ramos", telefono: "6000-3310", correo: "", tipo: "nuevo", canal: "web", consentimiento: true, desde: sumarDias(hoyIso, -20), sexo: "F", rangoEdad: "25-34", laboral: "trabaja" },
      ],
      pasteleros: [
        { id: "b1", nombre: "Ana Morales" },
        { id: "b2", nombre: "Carlos Vega" },
        { id: "b3", nombre: "Elena Ruiz" },
      ],
      pedidos: [
        {
          id: "ped1",
          numero: "CI-1001",
          canal: "mostrador",
          tipo: "estandar",
          clienteId: "c1",
          clienteNombre: "Doña Marta Ruiz",
          items: [{ productoId: "p2", nombre: "Tres leches", cantidad: 1, precio: 22, subtotal: 22 }],
          total: 22,
          pagos: [{ monto: 22, metodo: "efectivo", fecha: sumarDias(hoyIso, -1), nota: "Cobro en mostrador" }],
          estado: "entregado",
          fechaEntrega: sumarDias(hoyIso, -1),
          fechaCreacion: sumarDias(hoyIso, -1),
          entregadoEn: sumarDias(hoyIso, -1),
          entregaInmediata: true,
          notas: "",
          motivoAnulacion: "",
          notaStock: "",
          calificacion: null,
          queja: null,
          pasteleroId: null,
        },
        {
          id: "ped2",
          numero: "CI-1002",
          canal: "web",
          tipo: "medida",
          clienteId: "c2",
          clienteNombre: "Luis Ortega",
          items: [{ productoId: "p6", nombre: "Pastel a medida", cantidad: 1, precio: 50, subtotal: 50 }],
          total: 50,
          pagos: [{ monto: 25, metodo: "efectivo", fecha: hoyIso, nota: "Anticipo del encargo" }],
          estado: "recibido",
          fechaEntrega: sumarDias(hoyIso, 4),
          fechaCreacion: hoyIso,
          entregadoEn: null,
          entregaInmediata: false,
          notas: "Chocolate y fresas. Retiro en el local.",
          motivoAnulacion: "",
          notaStock: "",
          calificacion: null,
          queja: null,
          pasteleroId: null,
        },
        {
          id: "ped3",
          numero: "CI-1003",
          canal: "mostrador",
          tipo: "estandar",
          clienteId: null,
          clienteNombre: "Cliente de mostrador",
          items: [{ productoId: "p4", nombre: "Galletas de mantequilla", cantidad: 2, precio: 8, subtotal: 16 }],
          total: 16,
          pagos: [{ monto: 16, metodo: "efectivo", fecha: sumarDias(hoyIso, -2), nota: "Pagado al encargar" }],
          estado: "en_produccion",
          fechaEntrega: sumarDias(hoyIso, -1),
          fechaCreacion: sumarDias(hoyIso, -2),
          entregadoEn: null,
          entregaInmediata: false,
          notas: "Encargo de galletas que ya debió salir.",
          motivoAnulacion: "",
          notaStock: "",
          calificacion: null,
          queja: null,
          pasteleroId: "b2",
        },
        {
          id: "ped4",
          numero: "CI-1004",
          canal: "mostrador",
          tipo: "estandar",
          clienteId: null,
          clienteNombre: "Pedido de oficina",
          items: [{ productoId: "p3", nombre: "Cupcakes de vainilla", cantidad: 1, precio: 12, subtotal: 12 }],
          total: 12,
          pagos: [{ monto: 12, metodo: "tarjeta", fecha: hoyIso, nota: "Tarjeta simulada. No se guardó ningún número." }],
          estado: "en_produccion",
          fechaEntrega: sumarDias(hoyIso, 1),
          fechaCreacion: hoyIso,
          entregadoEn: null,
          entregaInmediata: false,
          notas: "",
          motivoAnulacion: "",
          notaStock: "",
          calificacion: null,
          queja: null,
          pasteleroId: "b2",
        },
      ],
      tareas: [
        { id: "t1", pedidoId: "ped3", pasteleroId: "b2", descripcion: "Preparar 2 cajas de galletas de mantequilla", fechaEntrega: sumarDias(hoyIso, -1), estado: "pendiente", cerradaEn: null, aTiempo: null },
        { id: "t2", pedidoId: "ped4", pasteleroId: "b2", descripcion: "Separar 1 caja de cupcakes de vainilla", fechaEntrega: sumarDias(hoyIso, 1), estado: "pendiente", cerradaEn: null, aTiempo: null },
      ],
      servicios: [
        { id: "s1", nombre: "Luz", monto: 185, vence: sumarDias(hoyIso, -1), estado: "pendiente", registradoEn: null },
        { id: "s2", nombre: "Agua", monto: 42, vence: sumarDias(hoyIso, 5), estado: "pendiente", registradoEn: null },
        { id: "s3", nombre: "Teléfono fijo", monto: 28, vence: sumarDias(hoyIso, 10), estado: "pendiente", registradoEn: null },
      ],
      cuadres: [],
      campanas: [],
      mermas: [],
      secuencia: 1004,
      usuarios: [
        { usuario: "admin", clave: "admin", nombre: "Gerencia", rol: "admin" },
        { usuario: "cajero", clave: "cajero", nombre: "Mostrador", rol: "cajero" },
        { usuario: "pastelero", clave: "pastelero", nombre: "Ana Morales", rol: "pastelero", pasteleroId: "b1" },
        { usuario: "contador", clave: "contador", nombre: "Contabilidad", rol: "contador" },
        { usuario: "cliente", clave: "cliente", nombre: "Luis Ortega", rol: "cliente", clienteId: "c2" },
      ],
      ventas: [],
      proveedores: [
        { id: "pr1", nombre: "Harinas del Istmo", contacto: "6001-1000", plazoDias: 15 },
        { id: "pr2", nombre: "Lácteos Chiriquí", contacto: "6001-2000", plazoDias: 8 },
      ],
      ordenes: [],
      cuentas: [],
      movimientos: [],
      gastos: [],
      recetas: {
        p1: [{ insumoId: "i1", cantidad: 0.35 }, { insumoId: "i2", cantidad: 0.08 }, { insumoId: "i3", cantidad: 0.2 }, { insumoId: "i4", cantidad: 0.15 }],
        p2: [{ insumoId: "i1", cantidad: 0.3 }, { insumoId: "i2", cantidad: 0.05 }, { insumoId: "i3", cantidad: 0.25 }],
        p3: [{ insumoId: "i1", cantidad: 0.15 }, { insumoId: "i2", cantidad: 0.05 }, { insumoId: "i3", cantidad: 0.1 }],
        p4: [{ insumoId: "i1", cantidad: 0.2 }, { insumoId: "i2", cantidad: 0.12 }, { insumoId: "i3", cantidad: 0.05 }],
        p5: [{ insumoId: "i1", cantidad: 0.25 }, { insumoId: "i2", cantidad: 0.08 }, { insumoId: "i3", cantidad: 0.2 }],
        p6: [{ insumoId: "i1", cantidad: 0.5 }, { insumoId: "i2", cantidad: 0.25 }, { insumoId: "i3", cantidad: 0.3 }, { insumoId: "i4", cantidad: 0.2 }],
      },
    };
    cargarHistoria(datos, hoyIso);
    return datos;
  }

  function cargar() {
    try {
      const crudo = localStorage.getItem(CLAVE);
      if (!crudo) {
        const datos = semilla();
        localStorage.setItem(CLAVE, JSON.stringify(datos));
        return datos;
      }
      const datos = JSON.parse(crudo);
      if (!datos || datos.version !== 2) return restaurar();
      return datos;
    } catch (error) {
      return restaurar();
    }
  }

  function guardar(datos) {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
  }

  function restaurar() {
    const datos = semilla();
    localStorage.setItem(CLAVE, JSON.stringify(datos));
    return datos;
  }

  function fallo(error) {
    return { ok: false, error: error };
  }

  function pedidoPorId(datos, id) {
    return datos.pedidos.find(function (p) { return p.id === id; });
  }

  function saldo(pedido) {
    const pagado = (pedido.pagos || []).reduce(function (suma, pago) { return suma + Number(pago.monto); }, 0);
    return redondear(pedido.total - pagado);
  }

  function tareasAbiertas(datos, pasteleroId) {
    return datos.tareas.filter(function (tarea) {
      return tarea.pasteleroId === pasteleroId && (tarea.estado === "pendiente");
    });
  }

  function hayCupo(datos) {
    return datos.pasteleros.some(function (persona) {
      return tareasAbiertas(datos, persona.id).length < MAX_TAREAS;
    });
  }

  function insumosBajos(datos) {
    return datos.insumos.filter(function (insumo) {
      return Number(insumo.cantidad) < Number(insumo.minimo) || insumo.vence < hoy();
    });
  }

  function disponibilidad(producto) {
    if (!producto || producto.tipo === "medida") return "encargo";
    if (producto.stock <= 0) return "agotado";
    if (producto.stock <= 3) return "pocas";
    return "disponible";
  }

  function siguienteNumero(datos) {
    datos.secuencia += 1;
    return "CI-" + datos.secuencia;
  }

  function nuevoId(prefijo) {
    return prefijo + "-" + Math.random().toString(36).slice(2, 8);
  }

  function crearCliente(entrada) {
    const datos = cargar();
    const nombre = (entrada.nombre || "").trim();
    const telefono = (entrada.telefono || "").trim();
    const correo = (entrada.correo || "").trim();
    if (nombre.length < 3) return fallo("Escriba el nombre de quien encarga.");
    if (telefono.length < 7) return fallo("Hace falta un teléfono para avisar el pedido.");
    const ya = datos.clientes.find(function (cliente) { return cliente.telefono === telefono; });
      if (ya) {
      ya.consentimiento = Boolean(entrada.consentimiento);
      if (correo) ya.correo = correo;
      if (entrada.sexo) ya.sexo = entrada.sexo;
      if (entrada.rangoEdad) ya.rangoEdad = entrada.rangoEdad;
      if (entrada.laboral) ya.laboral = entrada.laboral;
      guardar(datos);
      return { ok: true, cliente: ya, actualizado: true };
    }
    const cliente = {
      id: nuevoId("c"),
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      tipo: "nuevo",
      canal: "web",
      consentimiento: Boolean(entrada.consentimiento),
      desde: hoy(),
      sexo: entrada.sexo || "",
      rangoEdad: entrada.rangoEdad || "",
      laboral: entrada.laboral || "",
    };
    datos.clientes.push(cliente);
    guardar(datos);
    return { ok: true, cliente: cliente, actualizado: false };
  }

  function fijarConsentimiento(clienteId, valor) {
    const datos = cargar();
    const cliente = datos.clientes.find(function (item) { return item.id === clienteId; });
    if (!cliente) return fallo("No se encontró el cliente.");
    cliente.consentimiento = Boolean(valor);
    guardar(datos);
    return { ok: true, cliente: cliente };
  }

  function armarItems(datos, lineas) {
    if (!lineas.length) return fallo("Elija al menos un producto.");
    const items = [];
    for (let i = 0; i < lineas.length; i += 1) {
      const linea = lineas[i];
      const cantidad = Number(linea.cantidad);
      if (!Number.isInteger(cantidad) || cantidad < 1) return fallo("La cantidad tiene que ser un número entero mayor que cero.");
      const producto = datos.productos.find(function (item) { return item.id === linea.productoId; });
      if (!producto || producto.tipo !== "estandar") return fallo("Ese producto no se vende de vitrina.");
      if (producto.stock < cantidad) {
        return fallo(producto.nombre + " no tiene existencia suficiente. Hay " + producto.stock + " y pidió " + cantidad + ".");
      }
      items.push({
        productoId: producto.id,
        nombre: producto.nombre,
        cantidad: cantidad,
        precio: producto.precio,
        subtotal: redondear(producto.precio * cantidad),
      });
    }
    return { ok: true, items: items, total: redondear(items.reduce(function (s, item) { return s + item.subtotal; }, 0)) };
  }

  function descontar(datos, items) {
    items.forEach(function (item) {
      const producto = datos.productos.find(function (p) { return p.id === item.productoId; });
      producto.stock -= item.cantidad;
    });
  }

  function devolver(datos, items) {
    items.forEach(function (item) {
      const producto = datos.productos.find(function (p) { return p.id === item.productoId; });
      if (producto && producto.tipo === "estandar") producto.stock += item.cantidad;
    });
  }

  function crearPedido(entrada) {
    const datos = cargar();
    const canal = entrada.canal === "web" ? "web" : "mostrador";
    const tipo = entrada.tipo === "medida" ? "medida" : "estandar";
    const inmediato = Boolean(entrada.entregaInmediata) && canal === "mostrador" && tipo === "estandar";
    const metodo = entrada.metodoPago === "tarjeta" ? "tarjeta" : "efectivo";
    const notas = (entrada.notas || "").trim();
    let cliente = null;
    if (entrada.clienteId) {
      cliente = datos.clientes.find(function (item) { return item.id === entrada.clienteId; });
      if (!cliente) return fallo("Elija un cliente registrado.");
    }
    if (canal === "web" && !cliente) return fallo("El pedido web necesita un perfil. Regístrese en la página pública o elija un cliente.");

    const nombre = cliente ? cliente.nombre : ((entrada.clienteNombre || "").trim() || "Cliente de mostrador");
    const fecha = entrada.fechaEntrega || "";
    let items;
    let total;

    if (tipo === "medida") {
      if (!fecha) return fallo("El pedido a medida exige fecha de retiro.");
      if (fecha < hoy()) return fallo("La fecha de retiro no puede estar en el pasado.");
      const bajos = insumosBajos(datos);
      if (bajos.length) {
        const lista = bajos.map(function (insumo) {
          return insumo.nombre + " (" + insumo.cantidad + " " + insumo.unidad + ", mínimo " + insumo.minimo + ")";
        }).join(", ");
        return fallo("No se promete la fecha. Insumo insuficiente o vencido: " + lista + ".");
      }
      if (!hayCupo(datos)) return fallo("No se promete la fecha. Los tres pasteleros ya tienen el cupo de tareas abiertas.");
      const producto = datos.productos.find(function (item) { return item.tipo === "medida"; });
      items = [{ productoId: producto.id, nombre: producto.nombre, cantidad: 1, precio: producto.precio, subtotal: producto.precio }];
      total = producto.precio;
      const anticipo = redondear(entrada.anticipo);
      const minimo = redondear(total * ANTICIPO);
      if (anticipo < minimo) return fallo("El anticipo mínimo es " + dinero(minimo) + " (la mitad).");
      if (anticipo > total) return fallo("El anticipo no puede pasar del total.");
      const pedido = basePedido({ datos: datos, canal: canal, tipo: tipo, cliente: cliente, nombre: nombre, items: items, total: total, fecha: fecha, inmediato: false, notas: notas });
      pedido.pagos.push(pago(anticipo, metodo, "Anticipo del encargo"));
      datos.pedidos.push(pedido);
      guardar(datos);
      return { ok: true, pedido: pedido };
    }

    const armado = armarItems(datos, entrada.items || []);
    if (!armado.ok) return armado;
    items = armado.items;
    total = armado.total;
    if (!inmediato) {
      if (!fecha) return fallo("Indique la fecha de retiro.");
      if (fecha < hoy()) return fallo("La fecha de retiro no puede estar en el pasado.");
    }
    descontar(datos, items);
    const pedido = basePedido({
      datos: datos,
      canal: canal,
      tipo: tipo,
      cliente: cliente,
      nombre: nombre,
      items: items,
      total: total,
      fecha: inmediato ? hoy() : fecha,
      inmediato: inmediato,
      notas: notas,
    });
    if (inmediato) {
      pedido.estado = "entregado";
      pedido.entregadoEn = hoy();
      pedido.pagos.push(pago(total, metodo, "Cobro al llevar"));
    } else if (canal === "mostrador" && Number(entrada.anticipo) > 0) {
      const anticipo = redondear(entrada.anticipo);
      if (anticipo > total) {
        devolver(datos, items);
        return fallo("El cobro no puede pasar del total.");
      }
      pedido.pagos.push(pago(anticipo, metodo, "Abono al encargar"));
    }
    datos.pedidos.push(pedido);
    guardar(datos);
    return { ok: true, pedido: pedido };
  }

  function pago(monto, metodo, nota) {
    return {
      monto: redondear(monto),
      metodo: metodo,
      fecha: hoy(),
      nota: metodo === "tarjeta" ? nota + " Tarjeta simulada: no se guardó ningún número." : nota,
    };
  }

  function basePedido(ctx) {
    return {
      id: nuevoId("ped"),
      numero: siguienteNumero(ctx.datos),
      canal: ctx.canal,
      tipo: ctx.tipo,
      clienteId: ctx.cliente ? ctx.cliente.id : null,
      clienteNombre: ctx.nombre,
      items: ctx.items,
      total: ctx.total,
      pagos: [],
      estado: "recibido",
      fechaEntrega: ctx.fecha,
      fechaCreacion: hoy(),
      entregadoEn: null,
      entregaInmediata: ctx.inmediato,
      notas: ctx.notas,
      motivoAnulacion: "",
      notaStock: "",
      calificacion: null,
      queja: null,
      pasteleroId: null,
      hora: new Date().getHours(),
    };
  }

  function anularPedido(id, motivo) {
    const datos = cargar();
    const pedido = pedidoPorId(datos, id);
    if (!pedido) return fallo("No se encontró el pedido.");
    if (pedido.estado === "anulado") return fallo("Ese pedido ya estaba anulado.");
    if (pedido.estado === "entregado") return fallo("El pedido ya se entregó. Si hay un reclamo, regístrelo como queja.");
    const motivoLimpio = (motivo || "").trim();
    if (motivoLimpio.length < 3) return fallo("Escriba por qué se anula.");
    if (pedido.estado === "recibido" && pedido.tipo === "estandar") {
      devolver(datos, pedido.items);
      pedido.notaStock = "El producto volvió a vitrina porque se anuló antes de producción.";
    } else if (pedido.estado === "recibido") {
      pedido.notaStock = "No había producto de vitrina comprometido.";
    } else {
      pedido.notaStock = "El pedido ya estaba en cocina o listo. El stock no volvió solo; hay que contarlo en el cierre.";
    }
    pedido.estado = "anulado";
    pedido.motivoAnulacion = motivoLimpio;
    datos.tareas.forEach(function (tarea) {
      if (tarea.pedidoId === pedido.id && tarea.estado === "pendiente") tarea.estado = "anulada";
    });
    guardar(datos);
    return { ok: true, pedido: pedido };
  }

  function enviarACocina(pedidoId, pasteleroId) {
    const datos = cargar();
    const pedido = pedidoPorId(datos, pedidoId);
    const pastelero = datos.pasteleros.find(function (persona) { return persona.id === pasteleroId; });
    if (!pedido || !pastelero) return fallo("Falta el pedido o el pastelero.");
    if (pedido.estado !== "recibido") return fallo("Solo se envía a cocina un pedido recibido que todavía no entra a producción.");
    if (pedido.entregaInmediata) return fallo("Esa venta ya salió de mostrador.");
    const abiertas = tareasAbiertas(datos, pastelero.id).length;
    if (abiertas >= MAX_TAREAS) {
      return fallo(pastelero.nombre + " ya tiene " + abiertas + " tareas abiertas. El cupo es " + MAX_TAREAS + ".");
    }
    const descripcion = pedido.items.map(function (item) {
      return item.cantidad + " × " + item.nombre;
    }).join(", ");
    datos.tareas.push({
      id: nuevoId("t"),
      pedidoId: pedido.id,
      pasteleroId: pastelero.id,
      descripcion: descripcion + (pedido.notas ? " — " + pedido.notas : ""),
      fechaEntrega: pedido.fechaEntrega,
      estado: "pendiente",
      cerradaEn: null,
      aTiempo: null,
    });
    pedido.estado = "en_produccion";
    pedido.pasteleroId = pastelero.id;
    guardar(datos);
    return { ok: true, pedido: pedido };
  }

  function terminarTarea(tareaId, pasteleroId) {
    const datos = cargar();
    const tarea = datos.tareas.find(function (item) { return item.id === tareaId; });
    if (!tarea) return fallo("No se encontró la tarea.");
    if (tarea.pasteleroId !== pasteleroId) return fallo("Esa tarea es de otro pastelero.");
    if (tarea.estado !== "pendiente") return fallo("La tarea ya no está pendiente.");
    const pedido = pedidoPorId(datos, tarea.pedidoId);
    const falta = consumirReceta(datos, pedido);
    if (falta) return fallo("No se puede cerrar la tarea. Falta insumo: " + falta + ".");
    tarea.estado = "terminada";
    tarea.cerradaEn = hoy();
    tarea.aTiempo = tarea.fechaEntrega >= hoy();
    if (pedido && pedido.estado === "en_produccion") pedido.estado = "listo";
    guardar(datos);
    return { ok: true, tarea: tarea, aTiempo: tarea.aTiempo };
  }

  function entregarPedido(id, metodo) {
    const datos = cargar();
    const pedido = pedidoPorId(datos, id);
    if (!pedido) return fallo("No se encontró el pedido.");
    const puede = pedido.estado === "listo" || (pedido.estado === "recibido" && pedido.tipo === "estandar");
    if (!puede) {
      if (pedido.tipo === "medida" && pedido.estado === "recibido") {
        return fallo("El pedido a medida todavía no entra a cocina. No se puede marcar entregado.");
      }
      return fallo("Solo se entrega un pedido listo, o uno estándar que sigue en vitrina.");
    }
    const resta = saldo(pedido);
    if (resta > 0) {
      const medio = metodo === "tarjeta" ? "tarjeta" : "efectivo";
      pedido.pagos.push(pago(resta, medio, "Saldo al entregar"));
    }
    pedido.estado = "entregado";
    pedido.entregadoEn = hoy();
    guardar(datos);
    return { ok: true, pedido: pedido };
  }

  function calificar(pedidoId, clienteId, puntaje, comentario) {
    const datos = cargar();
    const pedido = pedidoPorId(datos, pedidoId);
    if (!pedido) return fallo("No se encontró el pedido.");
    if (pedido.clienteId !== clienteId) return fallo("Solo puede calificar quien hizo el pedido.");
    if (pedido.estado !== "entregado") return fallo("La calificación se abre cuando el pedido ya se entregó.");
    if (pedido.calificacion) return fallo("Este pedido ya tiene calificación.");
    const nota = Number(puntaje);
    if (!Number.isInteger(nota) || nota < 1 || nota > 5) return fallo("La nota va de 1 a 5.");
    pedido.calificacion = { puntaje: nota, comentario: (comentario || "").trim(), fecha: hoy() };
    guardar(datos);
    return { ok: true, pedido: pedido };
  }

  function registrarQueja(pedidoId, texto, origen) {
    const datos = cargar();
    const pedido = pedidoPorId(datos, pedidoId);
    if (!pedido) return fallo("No se encontró el pedido.");
    if (pedido.estado === "anulado") return fallo("El pedido anulado no lleva queja. El motivo ya quedó en la anulación.");
    const limpio = (texto || "").trim();
    if (limpio.length < 5) return fallo("Escriba la queja con un poco más de detalle.");
    pedido.queja = { texto: limpio, fecha: hoy(), origen: origen || "mostrador" };
    guardar(datos);
    return { ok: true, pedido: pedido };
  }

  function reponerInsumo(insumoId, cantidad) {
    const datos = cargar();
    const insumo = datos.insumos.find(function (item) { return item.id === insumoId; });
    const qty = Number(cantidad);
    if (!insumo) return fallo("No se encontró el insumo.");
    if (!(qty > 0)) return fallo("Indique cuánto entró.");
    insumo.cantidad = redondear(insumo.cantidad + qty);
    anotarMovimiento(datos, "ajuste", insumo.id, qty, "Entrada manual");
    guardar(datos);
    return { ok: true, insumo: insumo };
  }

  function registrarMerma(insumoId, cantidad, motivo) {
    const datos = cargar();
    const insumo = datos.insumos.find(function (item) { return item.id === insumoId; });
    const qty = Number(cantidad);
    const texto = (motivo || "").trim();
    if (!insumo) return fallo("No se encontró el insumo.");
    if (!(qty > 0) || qty > insumo.cantidad) return fallo("La merma no puede ser cero ni mayor que lo que hay.");
    if (texto.length < 3) return fallo("Escriba el motivo de la merma.");
    insumo.cantidad = redondear(insumo.cantidad - qty);
    datos.mermas.push({ id: nuevoId("m"), insumoId: insumo.id, nombre: insumo.nombre, cantidad: qty, unidad: insumo.unidad, motivo: texto, fecha: hoy() });
    anotarMovimiento(datos, "merma", insumo.id, qty, texto);
    guardar(datos);
    return { ok: true, insumo: insumo };
  }

  function registrarServicio(id) {
    const datos = cargar();
    const servicio = datos.servicios.find(function (item) { return item.id === id; });
    if (!servicio) return fallo("No se encontró el servicio.");
    if (servicio.estado === "registrado") return fallo("Ese pago ya estaba registrado.");
    servicio.estado = "registrado";
    servicio.registradoEn = hoy();
    anotarGasto(datos, servicio.nombre, "servicio", servicio.monto, servicio.id);
    guardar(datos);
    return { ok: true, servicio: servicio, aviso: "Quedó el registro. Esto no debitó ninguna cuenta bancaria." };
  }

  function cerrarCaja(efectivoContado, nota) {
    const datos = cargar();
    const contado = redondear(efectivoContado);
    if (Number.isNaN(contado) || contado < 0) return fallo("Escriba el efectivo contado.");
    let sistema = 0;
    datos.pedidos.forEach(function (pedido) {
      pedido.pagos.forEach(function (pagoItem) {
        if (pagoItem.fecha === hoy() && pagoItem.metodo === "efectivo") sistema = redondear(sistema + pagoItem.monto);
      });
    });
    const cuadre = {
      id: nuevoId("q"),
      fecha: hoy(),
      efectivoSistema: sistema,
      efectivoContado: contado,
      diferencia: redondear(contado - sistema),
      nota: (nota || "").trim(),
    };
    datos.cuadres.push(cuadre);
    guardar(datos);
    return { ok: true, cuadre: cuadre };
  }

  function enviarCampana(asunto, cuerpo) {
    const datos = cargar();
    const titulo = (asunto || "").trim();
    const texto = (cuerpo || "").trim();
    if (titulo.length < 3 || texto.length < 5) return fallo("La campaña necesita asunto y mensaje.");
    const destinatarios = datos.clientes.filter(function (cliente) { return cliente.consentimiento; });
    if (!destinatarios.length) return fallo("Nadie dio permiso de marketing. No se arma la campaña.");
    const campana = {
      id: nuevoId("k"),
      asunto: titulo,
      cuerpo: texto,
      fecha: hoy(),
      destinatarios: destinatarios.map(function (cliente) { return cliente.nombre; }),
      nota: "Envío simulado. No salió ningún correo.",
    };
    datos.campanas.push(campana);
    guardar(datos);
    return { ok: true, campana: campana };
  }

  function resumen(datos) {
    const pagosHoy = [];
    datos.pedidos.forEach(function (pedido) {
      pedido.pagos.forEach(function (pagoItem) {
        if (pagoItem.fecha === hoy()) pagosHoy.push(pagoItem);
      });
    });
    const ventaHoy = redondear(pagosHoy.reduce(function (s, pagoItem) { return s + pagoItem.monto; }, 0));
    const opiniones = datos.pedidos.filter(function (pedido) { return pedido.calificacion; });
    const promedio = opiniones.length
      ? redondear(opiniones.reduce(function (s, pedido) { return s + pedido.calificacion.puntaje; }, 0) / opiniones.length)
      : null;
    const conPromesa = datos.pedidos.filter(function (pedido) {
      return pedido.estado === "entregado" && !pedido.entregaInmediata;
    });
    const aTiempo = conPromesa.filter(function (pedido) { return pedido.entregadoEn && pedido.entregadoEn <= pedido.fechaEntrega; });
    const tareasMes = datos.tareas.filter(function (tarea) { return tarea.estado === "terminada" || tarea.estado === "pendiente"; });
    return {
      ventaHoy: ventaHoy,
      pedidos: datos.pedidos.length,
      porEstado: contarEstados(datos),
      opiniones: opiniones.length,
      promedio: promedio,
      cumplimiento: conPromesa.length ? Math.round((aTiempo.length / conPromesa.length) * 100) : null,
      tareasAtrasadas: datos.tareas.filter(function (tarea) { return tarea.estado === "pendiente" && tarea.fechaEntrega < hoy(); }).length,
      bajaRotacion: datos.productos.filter(function (producto) { return producto.rotacion === "baja" && producto.tipo === "estandar"; }),
      tareasMes: tareasMes,
    };
  }

  function contarEstados(datos) {
    const base = { recibido: 0, en_produccion: 0, listo: 0, entregado: 0, anulado: 0 };
    datos.pedidos.forEach(function (pedido) { base[pedido.estado] += 1; });
    return base;
  }

  function puntosDe(datos, clienteId) {
    const total = datos.pedidos
      .filter(function (pedido) { return pedido.clienteId === clienteId && pedido.estado === "entregado"; })
      .reduce(function (suma, pedido) { return suma + pedido.total; }, 0);
    return Math.floor(total / 10);
  }

  function fechaEnMes(baseIso, mesesAtras, dia) {
    const d = new Date(baseIso + "T12:00:00");
    d.setMonth(d.getMonth() - mesesAtras);
    const ultimo = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(dia, ultimo));
    return iso(d);
  }

  function cargarHistoria(datos, hoyIso) {
    let x = 20260929;
    function rnd() {
      x = (x * 1664525 + 1013904223) % 4294967296;
      return x / 4294967296;
    }
    function elegir(lista) {
      return lista[Math.floor(rnd() * lista.length)];
    }
    const pesosMes = [40, 32, 70, 90, 55, 48, 48, 40, 55, 70, 80, 100];
    const catalogo = [
      { id: "p1", nombre: "Pastel de chocolate", precio: 28, peso: 5 },
      { id: "p2", nombre: "Tres leches", precio: 22, peso: 4 },
      { id: "p3", nombre: "Cupcakes de vainilla", precio: 12, peso: 4 },
      { id: "p4", nombre: "Galletas de mantequilla", precio: 8, peso: 1 },
      { id: "p5", nombre: "Brazo de gitano", precio: 18, peso: 1 },
    ];
    const bolsa = [];
    catalogo.forEach(function (producto) {
      for (let i = 0; i < producto.peso; i += 1) bolsa.push(producto);
    });
    const clientes = datos.clientes.filter(function (cliente) { return cliente.sexo; });
    for (let meses = 11; meses >= 0; meses -= 1) {
      const ancla = new Date(hoyIso + "T12:00:00");
      ancla.setMonth(ancla.getMonth() - meses);
      const cuantos = pesosMes[ancla.getMonth()];
      for (let n = 0; n < cuantos; n += 1) {
        const cliente = elegir(clientes);
        const producto = elegir(bolsa);
        let hora = 8 + Math.floor(rnd() * 12);
        if (cliente.sexo === "F" && rnd() < 0.62) hora = 8 + Math.floor(rnd() * 4);
        if (cliente.sexo === "M" && rnd() < 0.45) hora = 16 + Math.floor(rnd() * 4);
        if (cliente.laboral === "estudia" && rnd() < 0.55) hora = 14 + Math.floor(rnd() * 3);
        if (hora > 19) hora = 19;
        datos.ventas.push({
          id: "vh-" + meses + "-" + n,
          fecha: fechaEnMes(hoyIso, meses, 1 + Math.floor(rnd() * 27)),
          hora: hora,
          clienteId: cliente.id,
          sexo: cliente.sexo,
          rangoEdad: cliente.rangoEdad,
          laboral: cliente.laboral,
          productoId: producto.id,
          nombre: producto.nombre,
          cantidad: 1,
          total: producto.precio,
          canal: cliente.canal,
        });
      }
    }
    for (let meses = 12; meses >= 1; meses -= 1) {
      const fecha = fechaEnMes(hoyIso, meses, 5);
      [["Luz", 180, "servicio"], ["Agua", 40, "servicio"], ["Teléfono", 28, "servicio"], ["Salarios", 650, "nomina"]].forEach(function (fila, indice) {
        datos.gastos.push({ id: "gh-" + meses + "-" + indice, fecha: fecha, concepto: fila[0], categoria: fila[2], monto: fila[1], origen: "historia" });
      });
      datos.gastos.push({
        id: "gi-" + meses,
        fecha: fechaEnMes(hoyIso, meses, 12),
        concepto: "Compra de insumos del mes",
        categoria: "insumo",
        monto: 420 + Math.round(rnd() * 180),
        origen: "historia",
      });
    }
    const hace = sumarDias(hoyIso, -20);
    const totalOc = redondear(10 * 1.4 + 2 * 9);
    datos.ordenes.push({
      id: "oc1",
      numero: "OC-2001",
      proveedorId: "pr1",
      estado: "recibida",
      fecha: hace,
      lineas: [
        { insumoId: "i1", nombre: "Harina", cantidad: 10, costo: 1.4 },
        { insumoId: "i4", nombre: "Chocolate", cantidad: 2, costo: 9 },
      ],
      total: totalOc,
    });
    datos.cuentas.push({ id: "cp1", origen: "compra", refId: "oc1", concepto: "OC-2001 · Harinas del Istmo", monto: totalOc, vence: sumarDias(hace, 15), estado: "pendiente", pagadaEn: null });
    datos.gastos.push({ id: "g-oc1", fecha: hace, concepto: "OC-2001 insumos", categoria: "insumo", monto: totalOc, origen: "oc1" });
    datos.movimientos.push(
      { id: "mv1", tipo: "compra", insumoId: "i1", cantidad: 10, fecha: hace, nota: "OC-2001", refId: "oc1" },
      { id: "mv2", tipo: "compra", insumoId: "i4", cantidad: 2, fecha: hace, nota: "OC-2001", refId: "oc1" }
    );
    const totalOc2 = redondear(4 * 7.5 + 6 * 3.2);
    datos.ordenes.push({
      id: "oc2",
      numero: "OC-2002",
      proveedorId: "pr2",
      estado: "enviada",
      fecha: sumarDias(hoyIso, -2),
      lineas: [
        { insumoId: "i2", nombre: "Mantequilla", cantidad: 4, costo: 7.5 },
        { insumoId: "i3", nombre: "Huevos", cantidad: 6, costo: 3.2 },
      ],
      total: totalOc2,
    });
  }

  function anotarMovimiento(datos, tipo, insumoId, cantidad, nota, refId) {
    datos.movimientos = datos.movimientos || [];
    datos.movimientos.push({ id: nuevoId("mv"), tipo: tipo, insumoId: insumoId, cantidad: redondear(cantidad), fecha: hoy(), nota: nota || "", refId: refId || "" });
  }

  function anotarGasto(datos, concepto, categoria, monto, origen) {
    datos.gastos = datos.gastos || [];
    datos.gastos.push({ id: nuevoId("g"), fecha: hoy(), concepto: concepto, categoria: categoria, monto: redondear(monto), origen: origen || "" });
  }

  function consumirReceta(datos, pedido) {
    if (!pedido || !datos.recetas) return null;
    const usos = [];
    const faltantes = [];
    pedido.items.forEach(function (item) {
      (datos.recetas[item.productoId] || []).forEach(function (linea) {
        const necesidad = redondear(linea.cantidad * item.cantidad);
        const insumo = datos.insumos.find(function (row) { return row.id === linea.insumoId; });
        if (!insumo || insumo.cantidad < necesidad) faltantes.push((insumo ? insumo.nombre : linea.insumoId) + " (" + necesidad + ")");
        else usos.push({ insumo: insumo, cantidad: necesidad });
      });
    });
    if (faltantes.length) return faltantes.join(", ");
    usos.forEach(function (uso) {
      uso.insumo.cantidad = redondear(uso.insumo.cantidad - uso.cantidad);
      anotarMovimiento(datos, "consumo", uso.insumo.id, uso.cantidad, "Producción " + (pedido.numero || ""), pedido.id);
    });
    return null;
  }

  function validarUsuario(usuario, clave) {
    const datos = cargar();
    const hallado = (datos.usuarios || []).find(function (item) {
      return item.usuario === String(usuario || "").trim() && item.clave === String(clave || "");
    });
    if (!hallado) return fallo("Usuario o clave incorrectos.");
    return { ok: true, usuario: hallado };
  }

  function guardarPerfil(clienteId, campos) {
    const datos = cargar();
    const cliente = datos.clientes.find(function (item) { return item.id === clienteId; });
    if (!cliente) return fallo("No se encontró el cliente.");
    ["sexo", "rangoEdad", "laboral"].forEach(function (campo) {
      if (campos[campo] !== undefined) cliente[campo] = campos[campo];
    });
    guardar(datos);
    return { ok: true, cliente: cliente };
  }

  function guardarProveedor(entrada) {
    const datos = cargar();
    const nombre = (entrada.nombre || "").trim();
    if (nombre.length < 3) return fallo("Escriba el nombre del proveedor.");
    const plazo = Number(entrada.plazoDias);
    if (!(plazo >= 0)) return fallo("Indique el plazo de pago en días.");
    let proveedor = datos.proveedores.find(function (item) { return item.id === entrada.id; });
    if (!proveedor) {
      proveedor = { id: nuevoId("pr") };
      datos.proveedores.push(proveedor);
    }
    proveedor.nombre = nombre;
    proveedor.contacto = (entrada.contacto || "").trim();
    proveedor.plazoDias = plazo;
    guardar(datos);
    return { ok: true, proveedor: proveedor };
  }

  function crearOrden(entrada) {
    const datos = cargar();
    const proveedor = datos.proveedores.find(function (item) { return item.id === entrada.proveedorId; });
    if (!proveedor) return fallo("Elija un proveedor.");
    const lineas = (entrada.lineas || []).map(function (linea) {
      const insumo = datos.insumos.find(function (item) { return item.id === linea.insumoId; });
      const cantidad = Number(linea.cantidad);
      const costo = Number(linea.costo);
      if (!insumo || !(cantidad > 0) || !(costo >= 0)) return null;
      return { insumoId: insumo.id, nombre: insumo.nombre, cantidad: cantidad, costo: costo };
    }).filter(Boolean);
    if (!lineas.length) return fallo("La orden necesita al menos un insumo con cantidad y costo.");
    const total = redondear(lineas.reduce(function (suma, linea) { return suma + linea.cantidad * linea.costo; }, 0));
    datos.secuenciaOc = (datos.secuenciaOc || 2002) + 1;
    const orden = {
      id: nuevoId("oc"),
      numero: "OC-" + datos.secuenciaOc,
      proveedorId: proveedor.id,
      estado: "borrador",
      fecha: hoy(),
      lineas: lineas,
      total: total,
    };
    datos.ordenes.push(orden);
    guardar(datos);
    return { ok: true, orden: orden };
  }

  function enviarOrden(id) {
    const datos = cargar();
    const orden = datos.ordenes.find(function (item) { return item.id === id; });
    if (!orden) return fallo("No se encontró la orden.");
    if (orden.estado !== "borrador") return fallo("Solo se envía una orden en borrador.");
    orden.estado = "enviada";
    guardar(datos);
    return { ok: true, orden: orden };
  }

  function recibirOrden(id) {
    const datos = cargar();
    const orden = datos.ordenes.find(function (item) { return item.id === id; });
    if (!orden) return fallo("No se encontró la orden.");
    if (orden.estado !== "enviada") return fallo("Solo se recibe una orden ya enviada.");
    const proveedor = datos.proveedores.find(function (item) { return item.id === orden.proveedorId; });
    orden.lineas.forEach(function (linea) {
      const insumo = datos.insumos.find(function (item) { return item.id === linea.insumoId; });
      if (!insumo) return;
      insumo.cantidad = redondear(insumo.cantidad + Number(linea.cantidad));
      anotarMovimiento(datos, "compra", insumo.id, linea.cantidad, orden.numero, orden.id);
    });
    orden.estado = "recibida";
    const plazo = proveedor ? proveedor.plazoDias : 0;
    datos.cuentas.push({
      id: nuevoId("cp"),
      origen: "compra",
      refId: orden.id,
      concepto: orden.numero + " · " + (proveedor ? proveedor.nombre : "Proveedor"),
      monto: orden.total,
      vence: sumarDias(hoy(), plazo),
      estado: "pendiente",
      pagadaEn: null,
    });
    anotarGasto(datos, orden.numero + " insumos", "insumo", orden.total, orden.id);
    guardar(datos);
    return { ok: true, orden: orden };
  }

  function anularOrden(id) {
    const datos = cargar();
    const orden = datos.ordenes.find(function (item) { return item.id === id; });
    if (!orden) return fallo("No se encontró la orden.");
    if (orden.estado === "recibida") return fallo("La orden ya entró al inventario. No se anula; haga un ajuste.");
    if (orden.estado === "anulada") return fallo("Esa orden ya estaba anulada.");
    orden.estado = "anulada";
    guardar(datos);
    return { ok: true, orden: orden };
  }

  function pagarCuenta(id) {
    const datos = cargar();
    const cuenta = (datos.cuentas || []).find(function (item) { return item.id === id; });
    if (!cuenta) return fallo("No se encontró la cuenta.");
    if (cuenta.estado === "pagada") return fallo("Esa cuenta ya estaba pagada.");
    cuenta.estado = "pagada";
    cuenta.pagadaEn = hoy();
    guardar(datos);
    return { ok: true, cuenta: cuenta, aviso: "Quedó el pago registrado. No salió dinero de un banco real." };
  }

  function registrarGasto(concepto, categoria, monto) {
    const datos = cargar();
    const texto = (concepto || "").trim();
    const valor = Number(monto);
    const cat = categoria === "nomina" || categoria === "servicio" || categoria === "insumo" ? categoria : "otro";
    if (texto.length < 3) return fallo("Escriba el concepto.");
    if (!(valor > 0)) return fallo("El monto tiene que ser mayor que cero.");
    anotarGasto(datos, texto, cat, valor, "manual");
    guardar(datos);
    return { ok: true };
  }

  function guardarProducto(entrada) {
    const datos = cargar();
    const producto = datos.productos.find(function (item) { return item.id === entrada.id; });
    if (!producto || producto.tipo !== "estandar") return fallo("Ese producto no se ajusta desde aquí.");
    const stock = Number(entrada.stock);
    const precio = Number(entrada.precio);
    if (Number.isNaN(stock) || stock < 0) return fallo("La existencia no puede ser negativa.");
    if (!(precio > 0)) return fallo("Indique un precio.");
    const delta = redondear(stock - producto.stock);
    producto.stock = stock;
    producto.precio = redondear(precio);
    if (delta !== 0) {
      datos.movimientos = datos.movimientos || [];
      datos.movimientos.push({ id: nuevoId("mv"), tipo: "ajuste", insumoId: "", productoId: producto.id, cantidad: delta, fecha: hoy(), nota: "Ajuste de vitrina " + producto.nombre, refId: producto.id });
    }
    guardar(datos);
    return { ok: true, producto: producto };
  }

  function visitasPeriodo(datos, desde, hasta) {
    const lista = [];
    (datos.ventas || []).forEach(function (venta) {
      if (venta.fecha >= desde && venta.fecha <= hasta) lista.push(venta);
    });
    datos.pedidos.forEach(function (pedido) {
      if (pedido.estado !== "entregado" || !pedido.entregadoEn) return;
      if (pedido.entregadoEn < desde || pedido.entregadoEn > hasta) return;
      const cliente = datos.clientes.find(function (item) { return item.id === pedido.clienteId; });
      lista.push({
        fecha: pedido.entregadoEn,
        hora: pedido.hora == null ? 12 : pedido.hora,
        clienteId: pedido.clienteId,
        sexo: cliente ? cliente.sexo || "" : "",
        rangoEdad: cliente ? cliente.rangoEdad || "" : "",
        laboral: cliente ? cliente.laboral || "" : "",
        total: pedido.total,
        nombre: pedido.items.map(function (item) { return item.nombre; }).join(", "),
      });
    });
    return lista;
  }

  function diasEntre(desde, hasta) {
    const a = new Date(desde + "T12:00:00");
    const b = new Date(hasta + "T12:00:00");
    return Math.round((b - a) / 86400000) + 1;
  }

  function reporte(desde, hasta) {
    const datos = cargar();
    const visitas = visitasPeriodo(datos, desde, hasta);
    const venta = redondear(visitas.reduce(function (suma, visita) { return suma + visita.total; }, 0));
    const ids = {};
    visitas.forEach(function (visita) { if (visita.clienteId) ids[visita.clienteId] = true; });
    const activos = Object.keys(ids).length;
    const horas = [];
    for (let hora = 8; hora <= 19; hora += 1) {
      const delHora = visitas.filter(function (visita) { return Number(visita.hora) === hora; });
      horas.push({
        hora: hora,
        mujeres: delHora.filter(function (visita) { return visita.sexo === "F"; }).length,
        hombres: delHora.filter(function (visita) { return visita.sexo === "M"; }).length,
        total: delHora.length,
      });
    }
    const rangos = ["18-24", "25-34", "35-44", "45-54", "55+"];
    const edades = rangos.map(function (rango) {
      return {
        rango: rango,
        mujeres: visitas.filter(function (visita) { return visita.rangoEdad === rango && visita.sexo === "F"; }).length,
        hombres: visitas.filter(function (visita) { return visita.rangoEdad === rango && visita.sexo === "M"; }).length,
      };
    });
    const laboral = ["trabaja", "estudia", "jubilado"].map(function (clave) {
      const grupo = visitas.filter(function (visita) { return visita.laboral === clave; });
      const monto = redondear(grupo.reduce(function (suma, visita) { return suma + visita.total; }, 0));
      return { clave: clave, visitas: grupo.length, venta: monto, ticket: grupo.length ? redondear(monto / grupo.length) : 0 };
    });
    const porMes = {};
    visitas.forEach(function (visita) {
      const mes = visita.fecha.slice(0, 7);
      porMes[mes] = (porMes[mes] || 0) + 1;
    });
    const largo = diasEntre(desde, hasta);
    const anteriorHasta = sumarDias(desde, -1);
    const anteriorDesde = sumarDias(anteriorHasta, -(largo - 1));
    const previas = visitasPeriodo(datos, anteriorDesde, anteriorHasta);
    const antes = {};
    const ahora = {};
    previas.forEach(function (visita) { if (visita.clienteId) antes[visita.clienteId] = true; });
    visitas.forEach(function (visita) { if (visita.clienteId) ahora[visita.clienteId] = true; });
    const baseAntes = Object.keys(antes).length;
    const volvieron = Object.keys(antes).filter(function (id) { return ahora[id]; }).length;
    const nuevos = datos.clientes.filter(function (cliente) { return cliente.tipo === "nuevo" && cliente.desde >= desde && cliente.desde <= hasta; }).length;
    const gastos = (datos.gastos || []).filter(function (gasto) { return gasto.fecha >= desde && gasto.fecha <= hasta; });
    const costo = redondear(gastos.filter(function (gasto) { return gasto.categoria === "insumo"; }).reduce(function (suma, gasto) { return suma + gasto.monto; }, 0));
    const fijos = redondear(gastos.filter(function (gasto) { return gasto.categoria !== "insumo"; }).reduce(function (suma, gasto) { return suma + gasto.monto; }, 0));
    const comprado = (datos.movimientos || []).filter(function (mov) { return mov.tipo === "compra" && mov.fecha >= desde && mov.fecha <= hasta; }).reduce(function (suma, mov) { return suma + mov.cantidad; }, 0);
    const perdido = (datos.movimientos || []).filter(function (mov) { return mov.tipo === "merma" && mov.fecha >= desde && mov.fecha <= hasta; }).reduce(function (suma, mov) { return suma + mov.cantidad; }, 0);
    const opiniones = datos.pedidos.filter(function (pedido) { return pedido.calificacion && pedido.calificacion.fecha >= desde && pedido.calificacion.fecha <= hasta; });
    const conFecha = datos.pedidos.filter(function (pedido) { return pedido.estado === "entregado" && !pedido.entregaInmediata && pedido.entregadoEn >= desde && pedido.entregadoEn <= hasta; });
    const aTiempo = conFecha.filter(function (pedido) { return pedido.entregadoEn <= pedido.fechaEntrega; }).length;
    const horaFuerte = horas.slice().sort(function (a, b) { return b.total - a.total; })[0];
    const conVisitas = horas.filter(function (hora) { return hora.total > 0; });
    const horaFloja = (conVisitas.length ? conVisitas : horas).slice().sort(function (a, b) { return a.total - b.total; })[0];
    const segmentos = [];
    edades.forEach(function (fila) {
      [["F", "mujeres", fila.mujeres], ["M", "hombres", fila.hombres]].forEach(function (par) {
        const monto = visitas.filter(function (visita) { return visita.rangoEdad === fila.rango && visita.sexo === par[0]; }).reduce(function (suma, visita) { return suma + visita.total; }, 0);
        segmentos.push({ etiqueta: (par[0] === "F" ? "Mujeres " : "Hombres ") + fila.rango, venta: monto, visitas: par[2] });
      });
    });
    segmentos.sort(function (a, b) { return b.venta - a.venta; });
    const manana = visitas.filter(function (visita) { return visita.hora < 12; }).length;
    const tarde = visitas.filter(function (visita) { return visita.hora >= 12 && visita.hora < 16; }).length;
    const noche = visitas.filter(function (visita) { return visita.hora >= 16; }).length;
    const franjasTotal = Math.max(1, manana + tarde + noche);
    return {
      desde: desde,
      hasta: hasta,
      ilustrativo: true,
      venta: venta,
      ticket: visitas.length ? redondear(venta / visitas.length) : 0,
      visitas: visitas.length,
      activos: activos,
      visitasPorCliente: activos ? redondear(visitas.length / activos) : 0,
      horas: horas,
      edades: edades,
      laboral: laboral,
      meses: porMes,
      recompra: baseAntes ? Math.round((volvieron / baseAntes) * 100) : null,
      cac: nuevos ? redondear(150 / nuevos) : null,
      nuevos: nuevos,
      costoInsumos: costo,
      gastosFijos: fijos,
      resultado: redondear(venta - costo - fijos),
      merma: comprado ? Math.round((perdido / comprado) * 100) : null,
      opinion: opiniones.length ? redondear(opiniones.reduce(function (suma, pedido) { return suma + pedido.calificacion.puntaje; }, 0) / opiniones.length) : null,
      opiniones: opiniones.length,
      cumplimiento: conFecha.length ? Math.round((aTiempo / conFecha.length) * 100) : null,
      bajaRotacion: datos.productos.filter(function (producto) { return producto.rotacion === "baja" && producto.tipo === "estandar"; }),
      horaFuerte: horaFuerte,
      horaFloja: horaFloja,
      segmento: segmentos[0] || null,
      produccion: {
        manana: Math.round((manana / franjasTotal) * 100),
        tarde: Math.round((tarde / franjasTotal) * 100),
        noche: Math.round((noche / franjasTotal) * 100),
      },
    };
  }

  window.Pasteleria = {
    MAX_TAREAS: MAX_TAREAS,
    ANTICIPO: ANTICIPO,
    hoy: hoy,
    sumarDias: sumarDias,
    dinero: dinero,
    fechaCorta: fechaCorta,
    cargar: cargar,
    restaurar: restaurar,
    saldo: saldo,
    disponibilidad: disponibilidad,
    tareasAbiertas: tareasAbiertas,
    insumosBajos: insumosBajos,
    hayCupo: hayCupo,
    crearCliente: crearCliente,
    fijarConsentimiento: fijarConsentimiento,
    crearPedido: crearPedido,
    anularPedido: anularPedido,
    enviarACocina: enviarACocina,
    terminarTarea: terminarTarea,
    entregarPedido: entregarPedido,
    calificar: calificar,
    registrarQueja: registrarQueja,
    reponerInsumo: reponerInsumo,
    registrarMerma: registrarMerma,
    registrarServicio: registrarServicio,
    cerrarCaja: cerrarCaja,
    enviarCampana: enviarCampana,
    resumen: resumen,
    puntosDe: puntosDe,
    validarUsuario: validarUsuario,
    guardarPerfil: guardarPerfil,
    guardarProveedor: guardarProveedor,
    crearOrden: crearOrden,
    enviarOrden: enviarOrden,
    recibirOrden: recibirOrden,
    anularOrden: anularOrden,
    pagarCuenta: pagarCuenta,
    registrarGasto: registrarGasto,
    guardarProducto: guardarProducto,
    reporte: reporte,
  };
})();
