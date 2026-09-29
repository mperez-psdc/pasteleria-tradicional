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
    return {
      version: 1,
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
        { id: "c1", nombre: "Doña Marta Ruiz", telefono: "6000-1101", correo: "", tipo: "fiel", canal: "mostrador", consentimiento: false, desde: sumarDias(hoyIso, -400) },
        { id: "c2", nombre: "Luis Ortega", telefono: "6000-2240", correo: "luis.ortega@correo.com", tipo: "nuevo", canal: "web", consentimiento: true, desde: sumarDias(hoyIso, -12) },
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
    };
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
      if (!datos || datos.version !== 1) return restaurar();
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
  };
})();
