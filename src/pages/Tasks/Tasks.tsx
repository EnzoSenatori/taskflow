import { useEffect, useState } from "react";
import { TaskList } from "../../components/TaskList/TaskList";
import { excluirTarefa, listarTarefas } from "../../services/tarefaService";
import type { Tarefa } from "../../types/Tarefa";
import "./Tasks.css";

export function Tasks() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await listarTarefas();
        setTarefas(dados);
      } catch {
        setErro("Não foi possível carregar as tarefas.");
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, []);

  async function removerTarefa(id: string) {
    try {
      setErro("");
      await excluirTarefa(id);
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa._id !== id));
    } catch {
      setErro("Não foi possível excluir a tarefa.");
    }
  }

  return (
    <section className="tasks-page">
      <div className="tasks-page__heading">
        <div>
          <p className="page-eyebrow">VISÃO GERAL</p>
          <h1>Todas as tarefas</h1>
          <p>Visualização completa das tarefas cadastradas.</p>
        </div>
      </div>
      {erro && <p className="tasks-page__error">{erro}</p>}
      {carregando ? <p>Carregando tarefas...</p> : <TaskList tarefas={tarefas} aoExcluir={removerTarefa} />}
    </section>
  );
}