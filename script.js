// ─────────────────────────────────────
//  Gerenciador de Estudos — script.js
//  Desafio Digitec
//  Isabela Mota
// ─────────────────────────────────────

var materias   = JSON.parse(localStorage.getItem("materias"))   || [];
var atividades = JSON.parse(localStorage.getItem("atividades")) || [];

// salva os vetores no localstorage
function salvar() {
  localStorage.setItem("materias",   JSON.stringify(materias));
  localStorage.setItem("atividades", JSON.stringify(atividades));
}


// ─────────────────────────────────────
//  MATÉRIAS
// ─────────────────────────────────────

function adicionarMateria() {
  var nome = document.getElementById("nomeMateria").value.trim();

  if (nome == "") {
    alert("Digite o nome da matéria.");
    return;
  }

  var materia = {
    id:   Date.now(),
    nome: nome
  };

  materias.push(materia);
  salvar();

  document.getElementById("nomeMateria").value = "";

  renderMaterias();
  atualizarSelect();
  buscarWikipedia(nome);
}

function removerMateria(id) {
  if (!confirm("Remover matéria e todas as suas atividades?")) return;

  for (var i = 0; i < materias.length; i++) {
    if (materias[i].id == id) {
      materias.splice(i, 1);
      break;
    }
  }

  // Remove todas as atividades da materia
  var novas = [];
  for (var i = 0; i < atividades.length; i++) {
    if (atividades[i].materiaId != id) {
      novas.push(atividades[i]);
    }
  }
  atividades = novas;

  salvar();
  renderMaterias();
  atualizarSelect();
  renderAtividades();
}

// refaz a lista de materias no html
function renderMaterias() {
  var lista = document.getElementById("listaMaterias");
  lista.innerHTML = "";

  if (materias.length == 0) {
    lista.innerHTML = "<li style='color:#999; font-size:13px; padding:8px 0'>Nenhuma matéria cadastrada.</li>";
    return;
  }

  for (var i = 0; i < materias.length; i++) {
    var m   = materias[i];
    var qtd = contarAtividades(m.id);

    var li = document.createElement("li");
    li.className = "item-materia";
    li.innerHTML =
      "<span>" +
        m.nome +
        " <span class='materia-qtd'>" + qtd + " atv.</span>" +
      "</span>" +
      "<button class='btn-remover' onclick='removerMateria(" + m.id + ")'>Remover</button>";

    lista.appendChild(li);
  }
}

function contarAtividades(materiaId) {
  var count = 0;
  for (var i = 0; i < atividades.length; i++) {
    if (atividades[i].materiaId == materiaId) count++;
  }
  return count;
}

// atualiza as materias adicionadas no select
function atualizarSelect() {
  var select = document.getElementById("selectMateria");
  select.innerHTML = "<option value=''>Selecione a matéria</option>";

  for (var i = 0; i < materias.length; i++) {
    var opt = document.createElement("option");
    opt.value       = materias[i].id;
    opt.textContent = materias[i].nome;
    select.appendChild(opt);
  }
}


// ─────────────────────────────────────
//  ATIVIDADES
// ─────────────────────────────────────

function adicionarAtividade() {
  var materiaId  = document.getElementById("selectMateria").value;
  var nome       = document.getElementById("nomeAtividade").value.trim();
  var categoria  = document.getElementById("categoria").value;
  var prioridade = document.getElementById("prioridade").value;
  var nota       = document.getElementById("nota").value;
  var data       = document.getElementById("data").value;

  if (materiaId == "") {
    alert("Selecione uma matéria.");
    return;
  }

  if (nome == "") {
    alert("Digite o nome da atividade.");
    return;
  }

  var atividade = {
    id:         Date.now(),
    materiaId:  Number(materiaId),
    nome:       nome,
    categoria:  categoria,
    prioridade: prioridade,
    nota:       nota != "" ? parseFloat(nota) : null,
    data:       data
  };

  atividades.push(atividade);
  salvar();

  document.getElementById("nomeAtividade").value = "";
  document.getElementById("nota").value          = "";
  document.getElementById("data").value          = "";

  renderAtividades();
  renderMaterias();
}

function removerAtividade(id) {
  for (var i = 0; i < atividades.length; i++) {
    if (atividades[i].id == id) {
      atividades.splice(i, 1);
      break;
    }
  }

  salvar();
  renderAtividades();
  renderMaterias();
}

// calcula a media de todas as atividades que tem nota
function calcularMedia(materiaId) {
  var soma  = 0;
  var count = 0;

  for (var i = 0; i < atividades.length; i++) {
    var a = atividades[i];
    if (a.materiaId == materiaId && a.nota != null) {
      soma += a.nota;
      count++;
    }
  }

  if (count == 0) return null;
  return (soma / count).toFixed(1);
}

// formata a data
function formatarData(dataStr) {
  if (!dataStr) return null;
  var p = dataStr.split("-");
  return p[2] + "/" + p[1] + "/" + p[0];
}

// atualiza todas as atividades separadas por materia no HTML
function renderAtividades() {
  var container = document.getElementById("listaAtividades");
  container.innerHTML = "";

  if (materias.length == 0) {
    container.innerHTML = "<p id='mensagemVazia'>Adicione uma matéria para começar.</p>";
    return;
  }

  var temAlguma = false;

  for (var i = 0; i < materias.length; i++) {
    var m    = materias[i];
    var atvs = [];

    for (var j = 0; j < atividades.length; j++) {
      if (atividades[j].materiaId == m.id) {
        atvs.push(atividades[j]);
      }
    }

    if (atvs.length == 0) continue;
    temAlguma = true;

    var media = calcularMedia(m.id);
    var grupo = document.createElement("div");
    grupo.className = "grupo-materia";

    var badgeHTML = "";
    if (media != null) {
      var classBadge = parseFloat(media) < 5 ? "media-badge media-baixa" : "media-badge";
      badgeHTML = "<span class='" + classBadge + "'>Média: " + media + "</span>";
    }

    grupo.innerHTML = "<h3>" + m.nome + badgeHTML + "</h3>";

    for (var k = 0; k < atvs.length; k++) {
      var a    = atvs[k];
      var item = document.createElement("div");
      item.className = "item-atividade";

      var tagPri =
        a.prioridade == "Alta"  ? "tag-alta"  :
        a.prioridade == "Média" ? "tag-media" : "tag-baixa";

      var tags =
        "<span class='tag tag-cat'>" + a.categoria + "</span>" +
        "<span class='tag " + tagPri + "'>" + a.prioridade + "</span>";

      if (a.nota != null) {
        tags += "<span class='tag tag-nota'>★ " + a.nota.toFixed(1) + "</span>";
      }
      if (a.data) {
        tags += "<span class='tag tag-data'>📅 " + formatarData(a.data) + "</span>";
      }

      item.innerHTML =
        "<div>" +
          "<div class='atv-nome'>" + a.nome + "</div>" +
          "<div class='atv-tags'>" + tags + "</div>" +
        "</div>" +
        "<button class='btn-remover' onclick='removerAtividade(" + a.id + ")'>Remover</button>";

      grupo.appendChild(item);
    }

    container.appendChild(grupo);
  }

  if (!temAlguma) {
    container.innerHTML = "<p id='mensagemVazia'>Nenhuma atividade cadastrada ainda.</p>";
  }
}


// ─────────────────────────────────────
//  WIKIPEDIA API
// ─────────────────────────────────────

// procura um resumo da materia na wikipedia
function buscarWikipedia(nomeMateria) {
  var card   = document.getElementById("cardWiki");
  var texto  = document.getElementById("wikiTexto");
  var titulo = document.getElementById("wikiTitulo");

  card.style.display = "block";
  titulo.textContent = nomeMateria;
  texto.textContent  = "Buscando informações...";

  var url = "https://pt.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(nomeMateria);

  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      if (data.extract) {
        var resumo = data.extract;
        if (resumo.length > 300) {
          resumo = resumo.substring(0, 300) + "...";
        }
        texto.textContent = resumo;
      } else {
        texto.textContent = "Nenhum resultado encontrado para \"" + nomeMateria + "\" na Wikipedia.";
      }
    })
    .catch(function() {
      texto.textContent = "Não foi possível carregar o resumo da Wikipedia.";
    });
}


// ─────────────────────────────────────
//  INICIALIZAÇÃO
// ─────────────────────────────────────

// carrega os dados do localstorage quando abre a pagina
renderMaterias();
atualizarSelect();
renderAtividades();