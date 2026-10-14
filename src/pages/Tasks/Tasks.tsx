import { useOutletContext } from "react-router-dom";
import type { LayoutContext } from "../../components/Layout/Layout";
import { TaskList } from "../../components/TaskList/TaskList";
import { useTarefas } from "../../contexts/TarefasContext";
import "./Tasks.css";

export function Tasks() {
  const { abrirTaskModal, abrirEdicaoTarefa } = useOutletContext<LayoutContext>();
  const { tarefas, carregando, erro, removerTarefa, alternarConclusao } = useTarefas();

  return (
    <section className="tasks-page">
      <div className="tasks-page__heading">
        <div>
          <p className="page-eyebrow">VISÃO GERAL</p>
          <h1>Todas as tarefas</h1>
          <p>Visualização completa das tarefas cadastradas.</p>
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
          tarefas={tarefas}
          aoEditar={abrirEdicaoTarefa}
          aoAlternarConclusao={alternarConclusao}
          aoExcluir={removerTarefa}
        />
      )}
    </section>
  );
}