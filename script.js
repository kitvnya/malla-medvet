const ramos = [
  { id: "BIOL034", nombre: "Biología Celular", semestre: 1, requisitos: [] },
  { id: "BIOL035", nombre: "Lab. Biocel.", semestre: 1, requisitos: [] },
  { id: "DEBD221", nombre: "Zoología", semestre: 1, requisitos: [] },
  { id: "QUI002", nombre: "Química General", semestre: 1, requisitos: [] },
  { id: "FMMP003", nombre: "Matemáticas", semestre: 1, requisitos: [] },
  { id: "MVET611", nombre: "Intro. Med. Vet", semestre: 1, requisitos: [] },

  { id: "BIOL166", nombre: "Bioquímica", semestre: 2, requisitos: ["BIOL034", "BIOL035", "QUI002"] },
  { id: "MVET621", nombre: "ADO I", semestre: 2, requisitos: ["BIOL034", "BIOL035"] },
  { id: "MVET622", nombre: "Cuerpo Animal I", semestre: 2, requisitos: ["BIOL034", "BIOL035", "DEBD221"] },
  { id: "ING119", nombre: "Inglés I", semestre: 2, requisitos: [] },

  { id: "MVET631", nombre: "ADO II", semestre: 3, requisitos: ["MVET621", "BIOL166"] },
  { id: "MVET632", nombre: "Cuerpo Animal II", semestre: 3, requisitos: ["MVET622"] },
  { id: "MVET633", nombre: "FDO I", semestre: 3, requisitos: ["MVET622"] },
  { id: "DEBD130", nombre: "Métodos Cuant. RRNN", semestre: 3, requisitos: ["FMMP003"] },
  { id: "ING129", nombre: "Inglés II", semestre: 3, requisitos: ["ING119"] },

  { id: "MVET641", nombre: "FDO II", semestre: 4, requisitos: ["MVET633", "MVET631"] },
  { id: "MVET240", nombre: "Anatomía Clínica", semestre: 4, requisitos: ["MVET632", "MVET633"] },
  { id: "DEBD140", nombre: "Ecología General", semestre: 4, requisitos: ["DEBD130"] },
  { id: "MVET178", nombre: "Genética", semestre: 4, requisitos: ["BIOL166", "DEBD130"] },
  { id: "ING239", nombre: "Inglés III", semestre: 4, requisitos: ["ING129"] },
];

// 1. Construimos índice rápido
const mapaCursos = {};
ramos.forEach(r => mapaCursos[r.id] = r);

// 2. Calculamos dependientes (qué ramos desbloquea cada uno)
ramos.forEach(r => {
  r.dependientes = [];
});
ramos.forEach(r => {
  r.requisitos.forEach(req => {
    if (mapaCursos[req]) {
      mapaCursos[req].dependientes.push(r.id);
    }
  });
});

const aprobados = new Set();
const container = document.getElementById("malla-container");

// Generar interfaz agrupada por semestre
for (let sem = 1; sem <= 10; sem++) {
  const semDiv = document.createElement("div");
  semDiv.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.textContent = `${sem}° Semestre`;
  semDiv.appendChild(titulo);

  const cursosDiv = document.createElement("div");
  cursosDiv.className = "cursos";

  ramos.filter(r => r.semestre === sem).forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso bloqueado";
    div.dataset.id = curso.id;
    div.dataset.requisitos = JSON.stringify(curso.requisitos);
    div.dataset.dependientes = JSON.stringify(curso.dependientes);
    div.textContent = curso.nombre;

    div.addEventListener("click", () => {
      const requisitos = JSON.parse(div.dataset.requisitos);
      const id = curso.id;

      const todosCumplidos = requisitos.every(req => aprobados.has(req));
      if (!todosCumplidos || aprobados.has(id)) return;

      // Marcar como aprobado
      aprobados.add(id);
      div.classList.remove("bloqueado");
      div.classList.add("aprobado");

      actualizarDisponibles();
    });

    cursosDiv.appendChild(div);
  });

  semDiv.appendChild(cursosDiv);
  container.appendChild(semDiv);
}

// Función para desbloquear visualmente
function actualizarDisponibles() {
  document.querySelectorAll(".curso").forEach(div => {
    const requisitos = JSON.parse(div.dataset.requisitos);
    const id = div.dataset.id;

    if (aprobados.has(id)) return;

    const todosCumplidos = requisitos.every(req => aprobados.has(req));
    if (todosCumplidos) {
      div.classList.remove("bloqueado");
    }
  });
}

actualizarDisponibles();
