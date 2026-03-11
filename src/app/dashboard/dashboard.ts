import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

type TaskStatus = 'Concluído' | 'Em andamento' | 'Pendente';

interface MetricCard {
  title: string;
  value: string;
  badge: string;
  description: string;
}

interface TaskItem {
  title: string;
  subtitle: string;
  status: TaskStatus;
  completedAt?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  metrics: MetricCard[] = [
    {
      title: 'Pedidos hoje',
      value: '1284',
      badge: '+12%',
      description: 'Aumento em comparação com ontem'
    },
    {
      title: 'Entregas concluídas',
      value: '932',
      badge: '+8%',
      description: 'Pedidos finalizados com sucesso hoje'
    },
    {
      title: 'Satisfação do cliente',
      value: '94%',
      badge: 'Alta',
      description: 'Avaliação média das últimas 24 horas'
    }
  ];

  taskList: TaskItem[] = [
    {
      title: 'Revisar pedidos com atraso',
      subtitle: 'Separar entregas críticas da manhã',
      status: 'Em andamento'
    },
    {
      title: 'Validar integração com parceiros',
      subtitle: 'Conferir retorno de status das entregas',
      status: 'Pendente'
    },
    {
      title: 'Atualizar painel operacional',
      subtitle: 'Publicar indicadores do dia para o time',
      status: 'Concluído',
      completedAt: Date.now()
    }
  ];

  isAiPanelOpen = false;

  mockPrompt =
    'Analise os indicadores da operação e sugira atividades prioritárias para melhorar a eficiência.';

  aiSuggestions: TaskItem[] = [
    {
      title: 'Priorizar pedidos com maior atraso',
      subtitle: 'Sugestão da IA com base no aumento do volume operacional',
      status: 'Pendente'
    },
    {
      title: 'Revisar fluxo de entregas críticas',
      subtitle: 'Sugestão da IA para reduzir impacto operacional',
      status: 'Pendente'
    },
    {
      title: 'Acompanhar integrações com retorno instável',
      subtitle: 'Sugestão da IA com foco em estabilidade da operação',
      status: 'Pendente'
    }
  ];

  ngOnInit(): void {
    this.loadMetrics();
    this.loadTasks();
    this.removeExpiredCompletedTasks();
  }

  onMainAction(): void {
    this.updateMetrics();
    this.saveMetrics();
  }

  toggleAiPanel(): void {
    this.isAiPanelOpen = !this.isAiPanelOpen;
  }

  // Adiciona apenas sugestões que ainda não existem na lista principal
  addAiSuggestionsToTasks(): void {
    const newSuggestions = this.aiSuggestions.filter(
      (suggestion) =>
        !this.taskList.some(
          (task) =>
            task.title === suggestion.title &&
            task.subtitle === suggestion.subtitle
        )
    );

    this.taskList = [...newSuggestions, ...this.taskList];
    this.saveTasks();
    this.isAiPanelOpen = false;
  }

  // Ciclo de status: Pendente -> Em andamento -> Concluído -> Pendente
  changeStatus(task: TaskItem): void {
    if (task.status === 'Pendente') {
      task.status = 'Em andamento';
      task.completedAt = undefined;
    } else if (task.status === 'Em andamento') {
      task.status = 'Concluído';
      task.completedAt = Date.now();
    } else {
      task.status = 'Pendente';
      task.completedAt = undefined;
    }

    this.saveTasks();
  }

  // Atualiza apenas as métricas dinâmicas da operação
  private updateMetrics(): void {
    this.metrics = this.metrics.map((metric) => {
      if (metric.title === 'Pedidos hoje') {
        const currentValue = this.parseMetricValue(metric.value);
        const increasedValue = currentValue + this.randomBetween(10, 35);

        return {
          ...metric,
          value: this.formatNumber(increasedValue)
        };
      }

      if (metric.title === 'Entregas concluídas') {
        const currentValue = this.parseMetricValue(metric.value);
        const increasedValue = currentValue + this.randomBetween(5, 20);

        return {
          ...metric,
          value: this.formatNumber(increasedValue)
        };
      }

      return metric;
    });
  }

  private saveMetrics(): void {
    localStorage.setItem('dashboard_metrics', JSON.stringify(this.metrics));
  }

  private loadMetrics(): void {
    const savedMetrics = localStorage.getItem('dashboard_metrics');

    if (savedMetrics) {
      this.metrics = JSON.parse(savedMetrics);
    }
  }

  private saveTasks(): void {
    localStorage.setItem('dashboard_tasks', JSON.stringify(this.taskList));
  }

  private loadTasks(): void {
    const savedTasks = localStorage.getItem('dashboard_tasks');

    if (savedTasks) {
      this.taskList = JSON.parse(savedTasks);
    }
  }

  // Remove tarefas concluídas após o tempo definido
  private removeExpiredCompletedTasks(): void {
    // Produção: 24 * 60 * 60 * 1000
    const expirationTime = 10000;
    const now = Date.now();

    this.taskList = this.taskList.filter((task) => {
      if (task.status !== 'Concluído') {
        return true;
      }

      if (!task.completedAt) {
        return true;
      }

      return now - task.completedAt! < expirationTime;
    });

    this.saveTasks();
  }

  private parseMetricValue(value: string): number {
    return Number(value.replace(/\./g, ''));
  }

  private formatNumber(value: number): string {
    return value.toLocaleString('pt-BR');
  }

  private randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}