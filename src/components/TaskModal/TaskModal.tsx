import { X } from "lucide-react";
import { useTarefas } from "../../contexts/TarefasContext";
import type { Tarefa } from "../../types/Tarefa";
import { TaskForm } from "../TaskForm/TaskForm";
import "./TaskModal.css";

type NovaTarefa = Omit<Tarefa, "_id">;

type TaskModalProps = {
  aberto: boolean;
  tarefaEmEdicao?: Tarefa;
  aoFechar: () => void;
};

export function TaskModal({ aberto, tarefaEmEdicao, aoFechar }: Readonly<TaskModalProps>) {
  const { adicionarTarefa, atualizarTarefa } = useTarefas();

  if (!aberto) {
    return null;
  }

  async function salvarTarefa(dadosFormulario: NovaTarefa) {
    if (tarefaEmEdicao) {
      await atualizarTarefa({ ...dadosFormulario, _id: tarefaEmEdicao._id });
    } else {
      await adicionarTarefa(dadosFormulario);
    }
    aoFechar();
  }

  return (
    <div className="task-modal">
      <div className="task-modal__content" role="dialog" aria-modal="true" aria-label={tarefaEmEdicao ? "Editar tarefa" : "Nova tarefa"}>
        <button className="task-modal__close" type="button" aria-label="Fechar" onClick={aoFechar}>
          <X size={20} />
        </button>
        <TaskForm tarefaInicial={tarefaEmEdicao} aoSalvar={salvarTarefa} aoCancelar={aoFechar} />
      </div>
    </div>
  );
}