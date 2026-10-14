import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { alterarTarefa, criarTarefa, excluirTarefa, listarTarefas } from "../services/tarefaService";
import type { Tarefa } from "../types/Tarefa";

type NovaTarefa = Omit<Tarefa, "_id">;

type TarefasContextType = {
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string;
  adicionarTarefa: (novaTarefa: NovaTarefa) => Promise<void>;
  removerTarefa: (id: string) => Promise<void>;
  atualizarTarefa: (tarefa: Tarefa) => Promise<void>;
  alternarConclusao: (tarefa: Tarefa) => Promise<void>;
};

const TarefasContext = createContext<TarefasContextType | null>(null);

type TarefasProviderProps = {
  children: ReactNode;
};

export function TarefasProvider({ children }: Readonly<TarefasProviderProps>) {
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

  async function adicionarTarefa(novaTarefa: NovaTarefa) {
    try {
      setErro("");
      const tarefaCriada = await criarTarefa(novaTarefa);
      setTarefas((tarefasAtuais) => [tarefaCriada, ...tarefasAtuais]);
    } catch {
      setErro("Não foi possível criar a tarefa.");
      throw new Error("Não foi possível criar a tarefa.");
    }
  }

  async function removerTarefa(id: string) {
    try {
      setErro("");
      await excluirTarefa(id);
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa._id !== id));
    } catch {
      setErro("Não foi possível excluir a tarefa.");
    }
  }

  async function atualizarTarefa(tarefa: Tarefa) {
    const { _id, ...dados } = tarefa;
    if (!_id) {
      return;
    }
    try {
      setErro("");
      const tarefaAtualizada = await alterarTarefa(_id, dados);
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefaAtual) =>
          tarefaAtual._id === tarefaAtualizada._id ? tarefaAtualizada : tarefaAtual
        )
      );
    } catch {
      setErro("Não foi possível atualizar a tarefa.");
      throw new Error("Não foi possível atualizar a tarefa.");
    }
  }

  async function alternarConclusao(tarefa: Tarefa) {
    try {
      await atualizarTarefa({ ...tarefa, concluida: !tarefa.concluida });
    } catch {
      // atualizarTarefa já registra a mensagem de erro na tela.
    }
  }

  return (
    <TarefasContext.Provider value={{ tarefas, carregando, erro, adicionarTarefa, removerTarefa, atualizarTarefa, alternarConclusao}}>
      {children}
    </TarefasContext.Provider>
  );
}

export function useTarefas() {
  const contexto = useContext(TarefasContext);
  if (!contexto) {
    throw new Error("useTarefas deve ser utilizado dentro de TarefasProvider.");
  }
  return contexto;
}