# Gerenciador de Estudos — Desafio Digitec

>Projeto de Isabela Freitas

Aplicação web para organizar matérias e atividades escolares, desenvolvida com HTML, CSS e JavaScript puro!

---

## Como executar

> ⚠️ **Importante:** o projeto deve ser aberto diretamente no navegador, e não pelo preview da IDE.  
> Abrir pelo preview da IDE pode impedir o funcionamento correto dos `alerts` de validação e do `confirm` de remoção.

**Passos:**
1. Faça o download ou clone o projeto
2. Abra a pasta do projeto no seu computador
3. Dê dois cliques no arquivo `index.html`
4. O projeto abrirá no seu navegador padrão

---

## 📁 Estrutura de arquivos

```
├── index.html    → estrutura da página
├── style.css     → estilização
└── script.js     → lógica da aplicação
```

---

## ✅ Funcionalidades

### Matérias
- **Adicionar matéria:** digite o nome no campo e clique em *Adicionar Matéria*
- **Listar matérias:** as matérias cadastradas aparecem logo abaixo do formulário, com a quantidade de atividades vinculadas
- **Remover matéria:** clique em *Remover* ao lado da matéria — isso também apaga todas as atividades vinculadas a ela

### Atividades
- **Adicionar atividade:** selecione uma matéria, preencha o nome, categoria, prioridade, nota e data, e clique em *Adicionar Atividade*
- **Campos disponíveis:**
  - **Nome** — descrição da atividade
  - **Categoria** — Prova, Estudo, Trabalho, Exercício ou Projeto
  - **Prioridade** — Alta, Média ou Baixa
  - **Nota** — valor de 0 a 10 (opcional)
  - **Data** — data de realização (opcional)
- **Listar atividades:** as atividades são exibidas agrupadas por matéria, com tags coloridas de categoria, prioridade, nota e data
- **Remover atividade:** clique em *Remover* no card da atividade
- **Média das notas:** calculada automaticamente por matéria — aparece em verde se for 5 ou mais, e em laranja se for abaixo de 5

### Persistência de dados
- Todos os dados são salvos automaticamente no **localStorage** do navegador
- As informações permanecem salvas mesmo ao fechar e reabrir a página

---

## Integração com API — Wikipedia

Ao adicionar uma matéria, o sistema faz automaticamente uma requisição à **API REST da Wikipedia em português**:

```
https://pt.wikipedia.org/api/rest_v1/page/summary/{nome_da_materia}
```

- Um card azul aparece na página com um resumo do tema da matéria
- O resumo é limitado a 300 caracteres para não poluir a interface
- Caso a matéria não seja encontrada na Wikipedia, uma mensagem informativa é exibida
- Caso haja falha de conexão, o card exibe uma mensagem de erro

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura semântica da página
- **CSS3** — estilização com Flexbox e responsividade
- **JavaScript** — manipulação do DOM, localStorage e consumo de API com `fetch`
- **Wikipedia REST API** — API pública e gratuita, sem necessidade de chave de acesso

> Projeto de Aprendizagem!