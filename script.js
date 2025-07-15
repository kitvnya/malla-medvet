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

  // Puedes continuar con el resto...

];

// Estado de cursos aprobados
const aprobados = new Set();

const malla = document.getElementById("malla");

// Generar cursos por semestre
for (let sem = 1; sem <= 10; sem++) {
  ramos.filter(c => c.semestre === sem).forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso bloqueado";
    div.dataset.id = curso.id;
    div.dataset.requisitos = JSON.stringify(curso.requisitos);
    div.textContent = curso.nombre;

    div.addEventListener("click", () => {
      const requisitos = JSON.parse(div.dataset.requisitos);
      const todosCumplidos = requisitos.every(req => aprobados.has(req));

      if (!todosCumplidos || aprobados.has(curso.id)) return;

      aprobados.add(curso.id);
      div.classList.remove("bloqueado");
      div.classList.add("aprobado");

      actualizarDisponibles();
    });

    malla.appendChild(div);
  });
}

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
