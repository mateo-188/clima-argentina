/**
 * METEOARGENTINA - LÓGICA DE LA APLICACIÓN (script.js)
 * Estación Meteorológica de Villa María, Córdoba y Red Nacional
 * Alta precisión de coordenadas (-32.4075, -63.2455) e interactividad completa de días
 */

// =============================================================================
// BASE DE DATOS DE PROVINCIAS Y LOCALIDADES DE ARGENTINA
// =============================================================================
const PROVINCIAS_ARGENTINA = [
  {
    nombre: "Córdoba",
    ciudades: [
      // Coordenadas exactas con todos los decimales para Villa María centro (-32.4075, -63.2455)
      // para evitar solapamientos con Villa Nueva
      { nombre: "Villa María", lat: -32.4075, lon: -63.2455, destacada: true },
      { nombre: "Córdoba Capital", lat: -31.4201, lon: -64.1888 },
      { nombre: "Río Cuarto", lat: -33.1307, lon: -64.3499 },
      { nombre: "Villa Carlos Paz", lat: -31.4241, lon: -64.4978 },
      { nombre: "San Francisco", lat: -31.4279, lon: -62.0827 },
      { nombre: "Bell Ville", lat: -32.6259, lon: -62.6887 },
      { nombre: "Alta Gracia", lat: -31.6529, lon: -64.4283 }
    ]
  },
  {
    nombre: "Ciudad Autónoma de Buenos Aires",
    ciudades: [
      { nombre: "Ciudad de Buenos Aires", lat: -34.6037, lon: -58.3816 }
    ]
  },
  {
    nombre: "Buenos Aires",
    ciudades: [
      { nombre: "La Plata", lat: -34.9214, lon: -57.9545 },
      { nombre: "Mar del Plata", lat: -38.0055, lon: -57.5560 },
      { nombre: "Bahía Blanca", lat: -38.7183, lon: -62.2663 },
      { nombre: "Tandil", lat: -37.3217, lon: -59.1332 },
      { nombre: "San Nicolás", lat: -33.3335, lon: -60.2110 },
      { nombre: "Junín", lat: -34.5838, lon: -60.9433 }
    ]
  },
  {
    nombre: "Santa Fe",
    ciudades: [
      { nombre: "Santa Fe Capital", lat: -31.6333, lon: -60.7000 },
      { nombre: "Rosario", lat: -32.9468, lon: -60.6393 },
      { nombre: "Rafaela", lat: -31.2503, lon: -61.4867 },
      { nombre: "Venado Tuerto", lat: -33.7456, lon: -61.9688 },
      { nombre: "Reconquista", lat: -29.1442, lon: -59.6432 }
    ]
  },
  {
    nombre: "Mendoza",
    ciudades: [
      { nombre: "Mendoza Capital", lat: -32.8895, lon: -68.8458 },
      { nombre: "San Rafael", lat: -34.6177, lon: -68.3301 },
      { nombre: "Godoy Cruz", lat: -32.9167, lon: -68.8333 },
      { nombre: "Malargüe", lat: -35.4754, lon: -69.5842 }
    ]
  },
  {
    nombre: "Entre Ríos",
    ciudades: [
      { nombre: "Paraná", lat: -31.7320, lon: -60.5290 },
      { nombre: "Concordia", lat: -31.3930, lon: -58.0209 },
      { nombre: "Gualeguaychú", lat: -33.0094, lon: -58.5172 },
      { nombre: "Concepción del Uruguay", lat: -32.4825, lon: -58.2372 }
    ]
  },
  {
    nombre: "Tucumán",
    ciudades: [
      { nombre: "San Miguel de Tucumán", lat: -26.8241, lon: -65.2226 },
      { nombre: "Tafí del Valle", lat: -26.8525, lon: -65.7118 }
    ]
  },
  {
    nombre: "Salta",
    ciudades: [
      { nombre: "Salta Capital", lat: -24.7821, lon: -65.4232 },
      { nombre: "Cafayate", lat: -26.0730, lon: -65.9761 },
      { nombre: "San Ramón de la Nueva Orán", lat: -23.1322, lon: -64.3260 }
    ]
  },
  {
    nombre: "Jujuy",
    ciudades: [
      { nombre: "San Salvador de Jujuy", lat: -24.1858, lon: -65.2995 },
      { nombre: "Tilcara", lat: -23.5776, lon: -65.3935 },
      { nombre: "Humahuaca", lat: -23.2054, lon: -65.3504 }
    ]
  },
  {
    nombre: "Misiones",
    ciudades: [
      { nombre: "Posadas", lat: -27.3671, lon: -55.8961 },
      { nombre: "Puerto Iguazú", lat: -25.5991, lon: -54.5735 },
      { nombre: "Oberá", lat: -27.4871, lon: -55.1199 }
    ]
  },
  {
    nombre: "Corrientes",
    ciudades: [
      { nombre: "Corrientes Capital", lat: -27.4692, lon: -58.8306 },
      { nombre: "Goya", lat: -29.1440, lon: -59.2635 },
      { nombre: "Paso de los Libres", lat: -29.7125, lon: -57.0883 }
    ]
  },
  {
    nombre: "Chaco",
    ciudades: [
      { nombre: "Resistencia", lat: -27.4514, lon: -58.9866 },
      { nombre: "Presidencia Roque Sáenz Peña", lat: -26.7852, lon: -60.4388 }
    ]
  },
  {
    nombre: "Santiago del Estero",
    ciudades: [
      { nombre: "Santiago del Estero Capital", lat: -27.7951, lon: -64.2615 },
      { nombre: "Termas de Río Hondo", lat: -27.4939, lon: -64.8596 }
    ]
  },
  {
    nombre: "San Juan",
    ciudades: [
      { nombre: "San Juan Capital", lat: -31.5375, lon: -68.5364 },
      { nombre: "Caucete", lat: -31.6508, lon: -68.2814 }
    ]
  },
  {
    nombre: "San Luis",
    ciudades: [
      { nombre: "San Luis Capital", lat: -33.2950, lon: -66.3356 },
      { nombre: "Villa Mercedes", lat: -33.6757, lon: -65.4578 },
      { nombre: "Merlo", lat: -32.3429, lon: -65.0125 }
    ]
  },
  {
    nombre: "La Rioja",
    ciudades: [
      { nombre: "La Rioja Capital", lat: -29.4135, lon: -66.8558 },
      { nombre: "Chilecito", lat: -29.1619, lon: -66.9818 }
    ]
  },
  {
    nombre: "Catamarca",
    ciudades: [
      { nombre: "San Fernando del Valle de Catamarca", lat: -28.4696, lon: -65.7852 },
      { nombre: "Belén", lat: -27.6499, lon: -67.0277 }
    ]
  },
  {
    nombre: "La Pampa",
    ciudades: [
      { nombre: "Santa Rosa", lat: -36.6167, lon: -64.2833 },
      { nombre: "General Pico", lat: -35.6566, lon: -63.7568 }
    ]
  },
  {
    nombre: "Neuquén",
    ciudades: [
      { nombre: "Neuquén Capital", lat: -38.9516, lon: -68.0591 },
      { nombre: "San Martín de los Andes", lat: -40.1580, lon: -71.3533 },
      { nombre: "Villa La Angostura", lat: -40.7628, lon: -71.6444 }
    ]
  },
  {
    nombre: "Río Negro",
    ciudades: [
      { nombre: "San Carlos de Bariloche", lat: -41.1335, lon: -71.3103 },
      { nombre: "Viedma", lat: -40.8135, lon: -62.9967 },
      { nombre: "General Roca", lat: -39.0333, lon: -67.5833 },
      { nombre: "Las Grutas", lat: -40.8089, lon: -65.0872 }
    ]
  },
  {
    nombre: "Chubut",
    ciudades: [
      { nombre: "Puerto Madryn", lat: -42.7692, lon: -65.0385 },
      { nombre: "Trelew", lat: -43.2490, lon: -65.3051 },
      { nombre: "Comodoro Rivadavia", lat: -45.8641, lon: -67.4966 },
      { nombre: "Esquel", lat: -42.9113, lon: -71.3195 }
    ]
  },
  {
    nombre: "Santa Cruz",
    ciudades: [
      { nombre: "Río Gallegos", lat: -51.6226, lon: -69.2181 },
      { nombre: "El Calafate", lat: -50.3408, lon: -72.2778 },
      { nombre: "El Chaltén", lat: -49.3315, lon: -72.8864 }
    ]
  },
  {
    nombre: "Tierra del Fuego",
    ciudades: [
      { nombre: "Ushuaia", lat: -54.8019, lon: -68.3030 },
      { nombre: "Río Grande", lat: -53.7877, lon: -67.7095 }
    ]
  },
  {
    nombre: "Formosa",
    ciudades: [
      { nombre: "Formosa Capital", lat: -26.1849, lon: -58.1731 },
      { nombre: "Clorinda", lat: -25.2848, lon: -57.7185 }
    ]
  }
];

// =============================================================================
// MAPEO DE CÓDIGOS WMO A ICONOS FONTAWESOME Y TEXTO
// =============================================================================
const WMO_MAP = {
  0: { desc: "Cielo despejado", icon: "fa-sun", color: "#fbbf24" },
  1: { desc: "Mayormente despejado", icon: "fa-cloud-sun", color: "#fcd34d" },
  2: { desc: "Parcialmente nublado", icon: "fa-cloud-sun", color: "#93c5fd" },
  3: { desc: "Nublado", icon: "fa-cloud", color: "#94a3b8" },
  45: { desc: "Niebla", icon: "fa-smog", color: "#cbd5e1" },
  48: { desc: "Niebla con escarcha", icon: "fa-smog", color: "#cbd5e1" },
  51: { desc: "Llovizna ligera", icon: "fa-cloud-rain", color: "#38bdf8" },
  53: { desc: "Llovizna moderada", icon: "fa-cloud-rain", color: "#0284c7" },
  55: { desc: "Llovizna densa", icon: "fa-cloud-showers-heavy", color: "#0284c7" },
  61: { desc: "Lluvia ligera", icon: "fa-cloud-rain", color: "#60a5fa" },
  63: { desc: "Lluvia moderada", icon: "fa-cloud-showers-heavy", color: "#3b82f6" },
  65: { desc: "Lluvia fuerte", icon: "fa-cloud-showers-water", color: "#1d4ed8" },
  71: { desc: "Nevada ligera", icon: "fa-snowflake", color: "#e0f2fe" },
  73: { desc: "Nevada moderada", icon: "fa-snowflake", color: "#bae6fd" },
  75: { desc: "Nevada fuerte", icon: "fa-snowflake", color: "#7dd3fc" },
  80: { desc: "Chubascos suaves", icon: "fa-cloud-sun-rain", color: "#38bdf8" },
  81: { desc: "Chubascos moderados", icon: "fa-cloud-showers-heavy", color: "#2563eb" },
  82: { desc: "Chubascos violentos", icon: "fa-cloud-showers-water", color: "#1e40af" },
  95: { desc: "Tormenta eléctrica", icon: "fa-bolt-lightning", color: "#f59e0b" },
  96: { desc: "Tormenta con granizo", icon: "fa-cloud-bolt", color: "#ef4444" },
  99: { desc: "Tormenta severa", icon: "fa-cloud-bolt", color: "#b91c1c" }
};

function obtenerInfoClima(code, isDay = 1) {
  const info = WMO_MAP[code] || { desc: "Condiciones variables", icon: "fa-cloud", color: "#94a3b8" };
  if (!isDay && (code === 0 || code === 1)) {
    return {
      desc: code === 0 ? "Noche despejada" : "Noche algo nublada",
      icon: "fa-moon",
      color: "#c084fc"
    };
  }
  return info;
}

// =============================================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// =============================================================================
const estado = {
  provinciaActual: "Córdoba",
  ciudadActual: "Villa María",
  // Coordenadas exactas para Villa María centro
  lat: -32.4075,
  lon: -63.2455,
  mapa: null,
  marcador: null,
  cargando: false,
  datosApiActuales: null, // Guarda la respuesta completa de Open-Meteo
  diaSeleccionadoIndex: 0  // 0 = Hoy (en vivo), 1 = Mañana, etc.
};

// =============================================================================
// INICIALIZACIÓN
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  inicializarReloj();
  inicializarSelectores();
  inicializarChips();
  inicializarMapa();
  inicializarEventos();

  // Carga inicial enfocada exactamente en Villa María, Córdoba
  cargarPronostico(estado.lat, estado.lon, estado.ciudadActual, estado.provinciaActual);
});

// =============================================================================
// RELOJ DIGITAL EN VIVO
// =============================================================================
function inicializarReloj() {
  const elReloj = document.getElementById("reloj-hora");
  function actualizar() {
    const ahora = new Date();
    elReloj.textContent = ahora.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  actualizar();
  setInterval(actualizar, 1000);
}

// =============================================================================
// SELECTORES DINÁMICOS DE PROVINCIA Y CIUDAD
// =============================================================================
function inicializarSelectores() {
  const selectProv = document.getElementById("provincia-select");
  const selectCiudad = document.getElementById("ciudad-select");

  selectProv.innerHTML = "";
  PROVINCIAS_ARGENTINA.forEach(prov => {
    const opt = document.createElement("option");
    opt.value = prov.nombre;
    opt.textContent = prov.nombre;
    if (prov.nombre === estado.provinciaActual) opt.selected = true;
    selectProv.appendChild(opt);
  });

  selectProv.addEventListener("change", (e) => {
    const provNombre = e.target.value;
    actualizarCiudadesSelect(provNombre);

    const provObj = PROVINCIAS_ARGENTINA.find(p => p.nombre === provNombre);
    if (provObj && provObj.ciudades.length > 0) {
      const primerCiudad = provObj.ciudades[0];
      seleccionarUbicacion(primerCiudad.nombre, provNombre, primerCiudad.lat, primerCiudad.lon);
    }
  });

  selectCiudad.addEventListener("change", (e) => {
    const provObj = PROVINCIAS_ARGENTINA.find(p => p.nombre === selectProv.value);
    if (!provObj) return;
    const ciudadObj = provObj.ciudades.find(c => c.nombre === e.target.value);
    if (ciudadObj) {
      seleccionarUbicacion(ciudadObj.nombre, provObj.nombre, ciudadObj.lat, ciudadObj.lon);
    }
  });

  actualizarCiudadesSelect(estado.provinciaActual, estado.ciudadActual);
}

function actualizarCiudadesSelect(provNombre, ciudadSeleccionada = null) {
  const selectCiudad = document.getElementById("ciudad-select");
  selectCiudad.innerHTML = "";
  const provObj = PROVINCIAS_ARGENTINA.find(p => p.nombre === provNombre);
  if (!provObj) return;

  provObj.ciudades.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.nombre;
    opt.textContent = c.nombre;
    if (ciudadSeleccionada && c.nombre === ciudadSeleccionada) {
      opt.selected = true;
    }
    selectCiudad.appendChild(opt);
  });
}

// =============================================================================
// ACCESOS RÁPIDOS (Chips)
// =============================================================================
function inicializarChips() {
  const chips = document.querySelectorAll(".quick-chips .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const ciudadNombre = chip.getAttribute("data-ciudad");
      const provNombre = chip.getAttribute("data-provincia");

      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const provObj = PROVINCIAS_ARGENTINA.find(p => p.nombre === provNombre);
      if (provObj) {
        const cObj = provObj.ciudades.find(c => c.nombre === ciudadNombre);
        if (cObj) {
          document.getElementById("provincia-select").value = provNombre;
          actualizarCiudadesSelect(provNombre, ciudadNombre);
          seleccionarUbicacion(cObj.nombre, provNombre, cObj.lat, cObj.lon);
        }
      }
    });
  });
}

function actualizarChipActivo(ciudadNombre) {
  const chips = document.querySelectorAll(".quick-chips .chip");
  chips.forEach(chip => {
    if (chip.getAttribute("data-ciudad") === ciudadNombre) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
}

// =============================================================================
// MAPA INTERACTIVO (Leaflet) CON PROVEEDOR LIBRE DE ERROR 403
// =============================================================================
function inicializarMapa() {
  estado.mapa = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([estado.lat, estado.lon], 12);

  // Capa HOT Humanitarian sin bloqueo 403
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">HOT</a>'
  }).addTo(estado.mapa);

  setTimeout(() => {
    if (estado.mapa) estado.mapa.invalidateSize();
  }, 300);

  estado.marcador = L.marker([estado.lat, estado.lon])
    .addTo(estado.mapa)
    .bindPopup(`<b>${estado.ciudadActual}</b><br><span style="color:#00d2ff; font-weight:bold;">Estación Meteorológica</span>`)
    .openPopup();

  // Reacción al clic en cualquier punto del mapa
  estado.mapa.on("click", async (e) => {
    // Preservar precisión exacta de coordenadas
    const lat = Number(e.latlng.lat.toFixed(4));
    const lon = Number(e.latlng.lng.toFixed(4));

    estado.marcador.setLatLng([lat, lon]);
    estado.marcador.bindPopup(`
      <div style="text-align:center; padding: 4px;">
        <i class="fa-solid fa-spinner fa-spin" style="color: #00d2ff; font-size: 1.2rem;"></i><br>
        <span style="font-size:0.85rem; font-weight:600;">Consultando Open-Meteo...</span><br>
        <span style="color:#94a3b8; font-size:0.75rem;">[${lat}, ${lon}]</span>
      </div>
    `).openPopup();

    let nombreLugar = `Punto (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;
    let nombreProv = "Argentina";

    try {
      const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;
      const geoRes = await fetch(geoUrl, { signal: AbortSignal.timeout(2000) });
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        const ciudadDetectada = geoData.locality || geoData.city || geoData.principalSubdivision;
        const provDetectada = geoData.principalSubdivision || geoData.countryName;
        if (ciudadDetectada) nombreLugar = ciudadDetectada;
        if (provDetectada) nombreProv = provDetectada;
      }
    } catch (err) {
      // Usar coordenadas directamente si no responde el reverse-geocoding
    }

    estado.lat = lat;
    estado.lon = lon;
    estado.ciudadActual = nombreLugar;
    estado.provinciaActual = nombreProv;

    document.querySelectorAll(".quick-chips .chip").forEach(c => c.classList.remove("active"));
    await cargarPronostico(lat, lon, nombreLugar, nombreProv);
  });
}

function centrarMapa(lat, lon, zoom = 12, popupTexto = "") {
  if (!estado.mapa) return;
  estado.mapa.flyTo([lat, lon], zoom, { duration: 1.0 });
  if (estado.marcador) {
    estado.marcador.setLatLng([lat, lon]);
    if (popupTexto) {
      estado.marcador.bindPopup(popupTexto).openPopup();
    }
  }
}

// =============================================================================
// EVENTOS DE BOTONES
// =============================================================================
function inicializarEventos() {
  document.getElementById("btn-actualizar").addEventListener("click", () => {
    const btn = document.getElementById("btn-actualizar");
    const icono = btn.querySelector("i");
    icono.classList.add("fa-spin");
    cargarPronostico(estado.lat, estado.lon, estado.ciudadActual, estado.provinciaActual)
      .finally(() => {
        setTimeout(() => icono.classList.remove("fa-spin"), 600);
      });
  });

  document.getElementById("btn-mi-ubicacion").addEventListener("click", () => {
    if (navigator.geolocation) {
      mostrarLoader(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(4));
          const lon = Number(pos.coords.longitude.toFixed(4));
          seleccionarUbicacion("Mi Ubicación Actual", "Argentina", lat, lon);
        },
        (err) => {
          mostrarLoader(false);
          alert("No se pudo obtener la geolocalización del navegador. Asegurate de otorgar permisos de ubicación.");
        },
        { timeout: 8000 }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  });

  // Botón para volver al clima actual en vivo
  const btnVolver = document.getElementById("btn-volver-hoy");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      seleccionarDiaPronostico(0);
    });
  }
}

function seleccionarUbicacion(ciudad, provincia, lat, lon) {
  estado.ciudadActual = ciudad;
  estado.provinciaActual = provincia;
  estado.lat = lat;
  estado.lon = lon;

  actualizarChipActivo(ciudad);
  cargarPronostico(lat, lon, ciudad, provincia);
}

// =============================================================================
// CONSULTA A OPEN-METEO CON PRECISIÓN EXACTA Y MÉTRICAS DETALLADAS
// =============================================================================
async function cargarPronostico(lat, lon, ciudad, provincia) {
  mostrarLoader(true);

  // 1. Usar coordenadas exactas sin truncar decimales
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,surface_pressure,uv_index` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max` +
    `&hourly=relative_humidity_2m,surface_pressure` +
    `&timezone=auto`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();

    // Guardar los datos completos para permitir interactividad instantánea entre días
    estado.datosApiActuales = data;
    estado.diaSeleccionadoIndex = 0; // Regresar a "Hoy" al cambiar de ubicación

    // Renderizar secciones
    renderizarClimaActual(data, ciudad, provincia);
    renderizarAlertas(data, ciudad);
    renderizarPronosticoExtendido(data);

    // Actualizar popup del mapa y badge
    const tempActualRedondeada = Math.round(data.current.temperature_2m);
    const infoClima = obtenerInfoClima(data.current.weather_code, data.current.is_day);

    centrarMapa(lat, lon, 12, `
      <div style="font-size:0.9rem;">
        <b style="font-size:1rem; color:#fff;">${ciudad}</b><br>
        <span style="color:#00d2ff; font-weight:800; font-size:1.15rem;">${tempActualRedondeada}°C</span>
        <span style="color:#94a3b8; font-size:0.8rem;"> • ${infoClima.desc}</span><br>
        <span style="color:#64748b; font-size:0.75rem;">${provincia} [${lat}, ${lon}]</span>
      </div>
    `);

    document.getElementById("map-pin-city").textContent = ciudad;
    document.getElementById("map-pin-temp").textContent = `${tempActualRedondeada}°C`;

  } catch (error) {
    console.error("Error al consultar Open-Meteo:", error);
    renderizarError("No se pudieron cargar los datos meteorológicos en tiempo real. Por favor, verificá tu conexión.");
  } finally {
    mostrarLoader(false);
  }
}

// =============================================================================
// CÁLCULO DE MÉTRICAS DIARIAS PROMEDIO DESDE DATOS HORARIOS
// =============================================================================
function obtenerMetricasDiaHorarias(data, diaIndex) {
  let humedadPromedio = null;
  let presionPromedio = null;

  if (data.hourly && data.hourly.relative_humidity_2m) {
    const inicio = diaIndex * 24;
    const fin = inicio + 24;
    const humSlice = data.hourly.relative_humidity_2m.slice(inicio, fin).filter(v => v !== null && !isNaN(v));
    if (humSlice.length > 0) {
      humedadPromedio = Math.round(humSlice.reduce((a, b) => a + b, 0) / humSlice.length);
    }
  }

  if (data.hourly && data.hourly.surface_pressure) {
    const inicio = diaIndex * 24;
    const fin = inicio + 24;
    const presSlice = data.hourly.surface_pressure.slice(inicio, fin).filter(v => v !== null && !isNaN(v));
    if (presSlice.length > 0) {
      presionPromedio = Math.round(presSlice.reduce((a, b) => a + b, 0) / presSlice.length);
    }
  }

  return { humedadPromedio, presionPromedio };
}

// =============================================================================
// SECCIÓN 1: CLIMA ACTUAL EN VIVO ("Hoy")
// =============================================================================
function renderizarClimaActual(data, ciudad, provincia) {
  if (!data || !data.current) return;
  const current = data.current;
  const infoClima = obtenerInfoClima(current.weather_code, current.is_day);

  // Título y visibilidad de controles de tiempo proyectado
  document.getElementById("titulo-seccion-clima").textContent = "Clima Actual";
  document.getElementById("btn-volver-hoy").classList.add("hidden");
  document.getElementById("actual-temp-range").classList.add("hidden");

  // Nombres de ubicación
  document.getElementById("actual-nombre-ciudad").textContent = ciudad;
  document.getElementById("actual-provincia-pais").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${provincia}, Argentina`;

  // Temperatura y Sensación Térmica en vivo
  document.getElementById("actual-temp").textContent = Math.round(current.temperature_2m);
  document.getElementById("actual-st-label").textContent = "Sensación Térmica";
  document.getElementById("actual-sensacion").textContent = `${current.apparent_temperature.toFixed(1)} °C`;

  // Icono y Condición climática actual
  const elIcono = document.getElementById("actual-icono");
  elIcono.innerHTML = `<i class="fa-solid ${infoClima.icon}"></i>`;
  elIcono.style.color = infoClima.color;
  document.getElementById("actual-descripcion").textContent = infoClima.desc;

  // Métricas atmosféricas en tiempo real
  document.getElementById("metric-label-humedad").textContent = "Humedad";
  document.getElementById("actual-humedad").textContent = `${current.relative_humidity_2m}%`;

  document.getElementById("metric-label-viento").textContent = "Viento";
  document.getElementById("actual-viento").textContent = `${current.wind_speed_10m} km/h`;

  document.getElementById("metric-label-precipitacion").textContent = "Precipitación";
  document.getElementById("actual-precipitacion").textContent = `${current.precipitation} mm`;

  document.getElementById("metric-label-presion").textContent = "Presión";
  document.getElementById("actual-presion").textContent = `${Math.round(current.surface_pressure || 1013)} hPa`;

  document.getElementById("metric-label-uv").textContent = "Índice UV";
  document.getElementById("actual-uv").textContent = current.uv_index !== undefined ? current.uv_index : "N/D";

  document.getElementById("actual-coordenadas").textContent = `${estado.lat.toFixed(4)}, ${estado.lon.toFixed(4)}`;

  const horaFormateada = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  document.getElementById("label-hora-actualizacion").textContent = `Actualizado: ${horaFormateada} (En vivo)`;
}

// =============================================================================
// SECCIÓN 1 (MODO PROYECTADO): CLIMA DE UN DÍA ESPECÍFICO SELECCIONADO
// =============================================================================
function renderizarClimaDiaEspecifico(data, diaIndex, ciudad, provincia) {
  const daily = data.daily;
  const fechaStr = daily.time[diaIndex];
  const dt = new Date(fechaStr + "T00:00:00");
  const code = daily.weather_code[diaIndex];
  const infoClima = obtenerInfoClima(code, 1);

  // Formatear día y fecha
  const esManana = diaIndex === 1;
  const nombreDia = dt.toLocaleDateString("es-AR", { weekday: "long" });
  const nombreDiaCap = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);
  const fechaCorta = dt.toLocaleDateString("es-AR", { day: "numeric", month: "numeric" });

  const tituloSeccion = esManana 
    ? `Pronóstico para Mañana (${nombreDiaCap} ${fechaCorta})` 
    : `Pronóstico para ${nombreDiaCap} (${fechaCorta})`;

  // 3. Actualizar título dinámicamente y botón de regreso
  document.getElementById("titulo-seccion-clima").textContent = tituloSeccion;
  document.getElementById("btn-volver-hoy").classList.remove("hidden");
  document.getElementById("label-hora-actualizacion").textContent = `Proyección para el ${fechaCorta}`;

  document.getElementById("actual-nombre-ciudad").textContent = ciudad;
  document.getElementById("actual-provincia-pais").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${provincia}, Argentina`;

  // Temperatura máxima esperada y rango térmico visible
  const maxTemp = Math.round(daily.temperature_2m_max[diaIndex]);
  const minTemp = Math.round(daily.temperature_2m_min[diaIndex]);
  document.getElementById("actual-temp").textContent = maxTemp;

  const rangeBadge = document.getElementById("actual-temp-range");
  rangeBadge.classList.remove("hidden");
  document.getElementById("actual-temp-max").innerHTML = `<i class="fa-solid fa-arrow-up"></i> Máx: ${maxTemp}°C`;
  document.getElementById("actual-temp-min").innerHTML = `<i class="fa-solid fa-arrow-down"></i> Mín: ${minTemp}°C`;

  // Sensación térmica proyectada
  const stMax = daily.apparent_temperature_max ? daily.apparent_temperature_max[diaIndex].toFixed(1) : maxTemp.toFixed(1);
  const stMin = daily.apparent_temperature_min ? daily.apparent_temperature_min[diaIndex].toFixed(1) : minTemp.toFixed(1);
  document.getElementById("actual-st-label").textContent = "Sensación Térmica (Rango proyectado)";
  document.getElementById("actual-sensacion").textContent = `Máx: ${stMax} °C / Mín: ${stMin} °C`;

  // Icono y Condición climática del día elegido
  const elIcono = document.getElementById("actual-icono");
  elIcono.innerHTML = `<i class="fa-solid ${infoClima.icon}"></i>`;
  elIcono.style.color = infoClima.color;
  document.getElementById("actual-descripcion").textContent = infoClima.desc;

  // Humedad promedio real proyectada para ese día
  const { humedadPromedio, presionPromedio } = obtenerMetricasDiaHorarias(data, diaIndex);
  document.getElementById("metric-label-humedad").textContent = "Humedad Media";
  document.getElementById("actual-humedad").textContent = humedadPromedio !== null ? `${humedadPromedio}%` : "--%";

  // Viento máximo esperado para ese día
  const vientoMax = daily.wind_speed_10m_max ? daily.wind_speed_10m_max[diaIndex] : "--";
  document.getElementById("metric-label-viento").textContent = "Viento Máx.";
  document.getElementById("actual-viento").textContent = `${vientoMax} km/h`;

  // Precipitación y probabilidad del día
  const precipSum = daily.precipitation_sum ? daily.precipitation_sum[diaIndex] : 0;
  const precipProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[diaIndex] : 0;
  document.getElementById("metric-label-precipitacion").textContent = "Precipitación";
  document.getElementById("actual-precipitacion").textContent = `${precipSum} mm (${precipProb}% prob.)`;

  // Presión media proyectada
  document.getElementById("metric-label-presion").textContent = "Presión Media";
  document.getElementById("actual-presion").textContent = presionPromedio !== null ? `${presionPromedio} hPa` : "1013 hPa";

  // Índice UV máximo
  const uvMax = daily.uv_index_max ? daily.uv_index_max[diaIndex] : "N/D";
  document.getElementById("metric-label-uv").textContent = "Índice UV Máx";
  document.getElementById("actual-uv").textContent = uvMax;

  document.getElementById("actual-coordenadas").textContent = `${estado.lat.toFixed(4)}, ${estado.lon.toFixed(4)}`;
}

// =============================================================================
// INTERACTIVIDAD DE DÍAS: SELECCIÓN Y TRANSICIÓN FLUIDA
// =============================================================================
function seleccionarDiaPronostico(diaIndex) {
  if (!estado.datosApiActuales) return;

  estado.diaSeleccionadoIndex = diaIndex;

  // Actualizar clases activas e indicador visual en las tarjetas
  const cards = document.querySelectorAll(".forecast-cards-container .forecast-day-card");
  cards.forEach((c, idx) => {
    const badge = c.querySelector(".selected-indicator-pill");
    if (badge) badge.remove();

    if (idx === diaIndex) {
      c.classList.add("selected-day");
      const nuevoBadge = document.createElement("span");
      nuevoBadge.className = "selected-indicator-pill";
      nuevoBadge.textContent = "Viendo";
      c.prepend(nuevoBadge);
    } else {
      c.classList.remove("selected-day");
    }
  });

  // Animación fluida de transición en el hero card
  const heroCard = document.getElementById("weather-hero-card");
  if (heroCard) {
    heroCard.classList.add("switching-day");
    setTimeout(() => {
      heroCard.classList.remove("switching-day");
    }, 220);
  }

  // 4. Si el usuario vuelve a hacer clic en "Hoy" (índice 0), regresar al tiempo actual en vivo
  if (diaIndex === 0) {
    renderizarClimaActual(estado.datosApiActuales, estado.ciudadActual, estado.provinciaActual);
  } else {
    // Si selecciona un día futuro ("Mañana", etc.), mostrar sus datos específicos
    renderizarClimaDiaEspecifico(estado.datosApiActuales, diaIndex, estado.ciudadActual, estado.provinciaActual);
  }
}

// =============================================================================
// SECCIÓN 2: RENDERIZADO DE AVISOS / ALERTAS
// =============================================================================
function renderizarAlertas(data, ciudad) {
  const daily = data.daily;
  const contenedor = document.getElementById("contenedor-aviso");
  const tagEstado = document.getElementById("tag-alerta-estado");

  const diasAlerta = [];
  const totalDias = daily.time.length;

  for (let i = 0; i < totalDias; i++) {
    const fecha = daily.time[i];
    const prob = daily.precipitation_probability_max[i] || 0;
    const code = daily.weather_code[i];
    const info = obtenerInfoClima(code);

    if (prob > 50) {
      diasAlerta.push({
        fecha,
        prob,
        condicion: info.desc,
        precipitacionMm: daily.precipitation_sum ? daily.precipitation_sum[i] : null
      });
    }
  }

  if (diasAlerta.length > 0) {
    tagEstado.textContent = `${diasAlerta.length} aviso(s) activo(s)`;
    tagEstado.style.color = "#fbbf24";

    contenedor.className = "alert-box-card active-alert";
    contenedor.innerHTML = `
      <div class="alert-header-row">
        <div class="alert-title-wrap">
          <i class="fa-solid fa-cloud-showers-heavy" style="color: #fbbf24;"></i>
          <h3 class="alert-header-title">ALERTA POR PRECIPITACIONES ELEVADAS (> 50%)</h3>
        </div>
        <span class="alert-badge-pill alert-badge-warning">Alerta Activa</span>
      </div>

      <p class="alert-body-text">
        Se detectaron probabilidades elevadas de lluvia para los próximos días en <strong>${ciudad}</strong>:
      </p>

      <div class="alert-days-list">
        ${diasAlerta.map(d => {
          const dt = new Date(d.fecha + "T00:00:00");
          const diaSemana = dt.toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "numeric" });
          return `
            <div class="alert-day-chip">
              <i class="fa-solid fa-umbrella" style="color: #60a5fa;"></i>
              <span>${diaSemana.toUpperCase()}</span>
              <span class="prob-number">${d.prob}% de lluvia</span>
              <span style="color: #94a3b8; font-size: 0.75rem;">(${d.condicion})</span>
            </div>
          `;
        }).join("")}
      </div>

      <div class="alert-recommendation">
        <i class="fa-solid fa-lightbulb"></i>
        <span>Recomendación: Llevá paraguas o piloto y conducí con precaución sobre calzada resbaladiza.</span>
      </div>
    `;
  } else {
    tagEstado.textContent = "Sin alertas";
    tagEstado.style.color = "#34d399";

    contenedor.className = "alert-box-card active-calm";
    contenedor.innerHTML = `
      <div class="alert-header-row">
        <div class="alert-title-wrap">
          <i class="fa-solid fa-circle-check" style="color: #34d399;"></i>
          <h3 class="alert-header-title">CONDICIONES ESTABLES: SIN ALERTAS METEOROLÓGICAS</h3>
        </div>
        <span class="alert-badge-pill alert-badge-tranquil">Estable</span>
      </div>

      <p class="alert-body-text">
        No se esperan precipitaciones intensas en <strong>${ciudad}</strong>. 
        Todas las probabilidades de lluvia se mantienen por debajo del 50%.
      </p>

      <div class="alert-recommendation" style="color: #a7f3d0;">
        <i class="fa-solid fa-sun" style="color: #fbbf24;"></i>
        <span>¡Panorama excelente para actividades al aire libre y disfrutar de la semana!</span>
      </div>
    `;
  }
}

// =============================================================================
// SECCIÓN 3: RENDERIZADO DEL PRONÓSTICO EXTENDIDO CON EVENTLISTENERS
// =============================================================================
function renderizarPronosticoExtendido(data) {
  const daily = data.daily;
  const contenedor = document.getElementById("contenedor-pronostico-dias");
  contenedor.innerHTML = "";

  const totalDias = Math.min(daily.time.length, 7);

  for (let i = 0; i < totalDias; i++) {
    const fechaStr = daily.time[i];
    const dt = new Date(fechaStr + "T00:00:00");
    const code = daily.weather_code[i];
    const info = obtenerInfoClima(code);
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const probLluvia = daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0;

    const esHoy = i === 0;
    const esManana = i === 1;

    let tituloDia = dt.toLocaleDateString("es-AR", { weekday: "short" });
    tituloDia = tituloDia.charAt(0).toUpperCase() + tituloDia.slice(1);
    if (esHoy) tituloDia = "Hoy";
    if (esManana) tituloDia = "Mañana";

    const fechaCorta = dt.toLocaleDateString("es-AR", { day: "numeric", month: "numeric" });
    const esLluviaAlta = probLluvia > 50;
    const esSeleccionado = i === estado.diaSeleccionadoIndex;

    const card = document.createElement("div");
    card.className = `forecast-day-card ${esHoy ? "today" : ""} ${esSeleccionado ? "selected-day" : ""}`;
    card.setAttribute("data-dia-index", i);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.title = `Hacé clic para ver las métricas detalladas de ${tituloDia} (${fechaCorta})`;

    card.innerHTML = `
      ${esSeleccionado ? '<span class="selected-indicator-pill">Viendo</span>' : ''}
      <div class="f-day-title">${tituloDia}</div>
      <div class="f-date-sub">${fechaCorta}</div>
      <div class="f-weather-icon" style="color: ${info.color}">
        <i class="fa-solid ${info.icon}"></i>
      </div>
      <div class="f-weather-condition">${info.desc}</div>

      <div class="f-thermal-bar">
        <span class="f-temp-min">${min}°</span>
        <div style="flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 99px; margin: 0 4px; position: relative;">
          <div style="position: absolute; left: 15%; right: 15%; top: 0; bottom: 0; background: linear-gradient(90deg, #60a5fa, #f87171); border-radius: 99px;"></div>
        </div>
        <span class="f-temp-max">${max}°</span>
      </div>

      <div class="f-rain-chance-badge ${esLluviaAlta ? "high-rain" : "low-rain"}">
        <i class="fa-solid fa-droplet"></i> ${probLluvia}%
      </div>
    `;

    // 2. EventListener para hacer interactivo el cambio de día
    card.addEventListener("click", () => {
      seleccionarDiaPronostico(i);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        seleccionarDiaPronostico(i);
      }
    });

    contenedor.appendChild(card);
  }
}

// =============================================================================
// AUXILIARES
// =============================================================================
function mostrarLoader(visible) {
  estado.cargando = visible;
  const loader = document.getElementById("loader");
  if (loader) {
    if (visible) {
      loader.classList.remove("hidden");
    } else {
      loader.classList.add("hidden");
    }
  }
}

function renderizarError(mensaje) {
  const contenedorAviso = document.getElementById("contenedor-aviso");
  if (!contenedorAviso) return;
  contenedorAviso.className = "alert-box-card active-alert";
  contenedorAviso.innerHTML = `
    <div class="alert-header-row">
      <div class="alert-title-wrap">
        <i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i>
        <h3 class="alert-header-title">ERROR DE CONEXIÓN</h3>
      </div>
    </div>
    <p class="alert-body-text">${mensaje}</p>
  `;
}
