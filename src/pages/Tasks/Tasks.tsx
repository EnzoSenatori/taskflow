import { useOutletContext } from "react-router-dom";
import type { LayoutContext } from "../../components/Layout/Layout";
import { TaskList } from "../../components/TaskList/TaskList";
import type { Tarefa } from "../../types/Tarefa";
import { useTarefas } from "../../contexts/TarefasContext";
import "./Tasks.css";

type VisaoTarefas = "tarefas" | "hoje" | "proximas" | "concluidas";

type TasksProps = {
  visao: VisaoTarefas;
};

const textosVisao = {
  tarefas: {
    rotulo: "VISÃO GERAL",
    titulo: "Todas as tarefas",
    descricao: "Tarefas em aberto, de qualquer data.",
  },
  hoje: {
    rotulo: "FOCO DO DIA",
    titulo: "Hoje",
    descricao: "Concentre-se no que precisa avançar agora.",
  },
  proximas: {
    rotulo: "PLANEJAMENTO",
    titulo: "Próximas",
    descricao: "Tarefas previstas para os próximos dias.",
  },
  concluidas: {
    rotulo: "HISTÓRICO",
    titulo: "Concluídas",
    descricao: "Tarefas que já foram finalizadas.",
  },
};

function obterDataAtual() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function selecionarTarefas(tarefas: Tarefa[], visao: VisaoTarefas) {
  const hoje = obterDataAtual();

  if (visao === "hoje") {
    return tarefas.filter((tarefa) => !tarefa.concluida && tarefa.data === hoje);
  }
  if (visao === "proximas") {
    return tarefas.filter((tarefa) => !tarefa.concluida && tarefa.data > hoje);
  }
  if (visao === "concluidas") {
    return tarefas.filter((tarefa) => tarefa.concluida);
  }
  return tarefas.filter((tarefa) => !tarefa.concluida);
}
export function Tasks({ visao }: Readonly<TasksProps>) {
  const { abrirTaskModal, abrirEdicaoTarefa } = useOutletContext<LayoutContext>();
  const { tarefas, carregando, erro, removerTarefa, alternarConclusao } = useTarefas();

  const texto = textosVisao[visao];
  const tarefasDaVisao = selecionarTarefas(tarefas, visao);

  return (
    <section className="tasks-page">
      <div className="tasks-page__heading">
        <div>
          {/* Use os textos dinâmicos aqui */}
          <p className="page-eyebrow">{texto.rotulo}</p>
          <h1>{texto.titulo}</h1>
          <p>{texto.descricao}</p>
        </div>
        <button type="button" onClick={abrirTaskModal}>
          Nova tarefa
        </button>
      </div>
      {erro && <p className="tasks-page__error">{erro}</p>}
      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : (
        <TaskList
          tarefas={tarefasDaVisao}
          aoEditar={abrirEdicaoTarefa}
          aoAlternarConclusao={alternarConclusao}
          aoExcluir={removerTarefa}
        />
      )}
    </section>
  );
}