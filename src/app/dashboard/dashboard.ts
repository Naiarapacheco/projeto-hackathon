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

interface ProductComplianceItem {
  name: string;
  area: 'Engenharia' | 'Plataforma';
  adherence: number;
  statusLabel: string;
  description: string;
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
      title: 'Aderência geral PCI DSS',
      value: '81%',
      badge: '+4%',
      description: 'Percentual consolidado considerando terminais e plataforma'
    },
    {
      title: 'Terminais - Engenharia',
      value: '78%',
      badge: '4 produtos',
      description: 'Aderência média dos equipamentos de pagamento'
    },
    {
      title: 'Tap2Pay - Plataforma',
      value: '86%',
      badge: '1 produto',
      description: 'Aderência atual da plataforma ao processo de conformidade'
    },
    {
      title: 'Itens críticos pendentes',
      value: '9',
      badge: '-2',
      description: 'Pendências prioritárias para evolução rumo ao PCI DSS'
    }
  ];

  products: ProductComplianceItem[] = [
    {
      name: 'MP35',
      area: 'Engenharia',
      adherence: 76,
      statusLabel: 'Atenção',
      description: 'Necessita evolução em hardening, evidências e validações de segurança'
    },
    {
      name: 'MP15',
      area: 'Engenharia',
      adherence: 72,
      statusLabel: 'Atenção',
      description: 'Ainda possui lacunas em documentação técnica e trilha de auditoria'
    },
    {
      name: 'SmartPOS',
      area: 'Engenharia',
      adherence: 83,
      statusLabel: 'Evoluindo',
      description: 'Bom nível de aderência, com ajustes finais em controles complementares'
    },
    {
      name: 'Pinpad PPC 930',
      area: 'Engenharia',
      adherence: 81,
      statusLabel: 'Evoluindo',
      description: 'Necessita refinamento de evidências e revisão de requisitos pendentes'
    },
    {
      name: 'Tap2Pay',
      area: 'Plataforma',
      adherence: 86,
      statusLabel: 'Próximo da meta',
      description: 'Faltam adequações finais em controles, governança e evidências operacionais'
    }
  ];

  taskList: TaskItem[] = [
    {
      title: 'Consolidar evidências de hardening do MP35',
      subtitle: 'Validar controles técnicos e documentação exigida para PCI DSS',
      status: 'Em andamento'
    },
    {
      title: 'Revisar gaps de segurança do Tap2Pay',
      subtitle: 'Mapear pendências funcionais e evidências ainda não formalizadas',
      status: 'Pendente'
    },
    {
      title: 'Atualizar trilha de conformidade dos terminais',
      subtitle: 'Organizar status por produto para acompanhamento executivo',
      status: 'Concluído',
      completedAt: Date.now()
    }
  ];

  isAiPanelOpen = false;

  selectedProduct = 'MP35';

  mockPrompt =
    'Analise o produto MP35 e informe o que ainda falta para ele avançar no processo de aderência ao PCI DSS. Depois faça uma leitura geral dos equipamentos e da plataforma Tap2Pay.';

  aiSummary =
    'A IA identificou que o MP35 ainda depende de ajustes em controles técnicos, formalização de evidências e revisão de requisitos pendentes. No consolidado geral, os terminais apresentam maior volume de pendências do que a plataforma Tap2Pay.';

  aiSuggestions: TaskItem[] = [
    {
      title: 'Formalizar evidências de segurança do MP35',
      subtitle: 'Consolidar documentação técnica e comprovações exigidas para auditoria PCI DSS',
      status: 'Pendente'
    },
    {
      title: 'Revisar controles pendentes do Tap2Pay',
      subtitle: 'Mapear os itens restantes para elevar a aderência da plataforma',
      status: 'Pendente'
    },
    {
      title: 'Criar visão consolidada de gaps por produto',
      subtitle: 'Comparar pendências entre terminais e plataforma para priorização',
      status: 'Pendente'
    }
  ];

  ngOnInit(): void {
    //this.loadMetrics();
    this.loadTasks();
    this.removeExpiredCompletedTasks();
  }

  onMainAction(): void {
    this.refreshComplianceView();
    this.saveMetrics();
  }

  toggleAiPanel(): void {
    this.isAiPanelOpen = !this.isAiPanelOpen;
  }

  selectProduct(productName: string): void {
    this.selectedProduct = productName;

    this.mockPrompt =
      `Analise o produto ${productName} e informe o que ainda falta para ele avançar no processo de aderência ao PCI DSS. Depois faça uma leitura geral dos equipamentos e da plataforma Tap2Pay.`;

    this.aiSummary =
      `${productName} ainda possui lacunas em aderência PCI DSS relacionadas a controles, evidências e validações técnicas. No cenário consolidado, a IA recomenda priorizar os produtos com menor percentual de aderência para acelerar a evolução do portfólio.`;

    this.aiSuggestions = [
      {
        title: `Mapear pendências críticas do ${productName}`,
        subtitle: `Levantar os itens restantes para elevar a aderência do ${productName} ao PCI DSS`,
        status: 'Pendente'
      },
      {
        title: `Consolidar evidências técnicas do ${productName}`,
        subtitle: `Organizar documentação e comprovações necessárias para auditoria`,
        status: 'Pendente'
      },
      {
        title: 'Atualizar visão consolidada de aderência',
        subtitle: 'Comparar engenharia e plataforma para direcionar as próximas ações',
        status: 'Pendente'
      }
    ];
  }

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

  getAdherenceClass(adherence: number): string {
    if (adherence >= 85) {
      return 'bg-green-100 text-green-700';
    }

    if (adherence >= 75) {
      return 'bg-yellow-100 text-yellow-700';
    }

    return 'bg-red-100 text-red-700';
  }

  getAreaClass(area: string): string {
    if (area === 'Plataforma') {
      return 'bg-blue-100 text-blue-700';
    }

    return 'bg-slate-100 text-slate-700';
  }

  private refreshComplianceView(): void {
    this.products = this.products.map((product) => {
      const increase = this.randomBetween(0, 2);
      const updatedAdherence = Math.min(product.adherence + increase, 100);

      return {
        ...product,
        adherence: updatedAdherence
      };
    });

    const averageAdherence = this.calculateAverageAdherence();
    const terminalsAverage = this.calculateAreaAverage('Engenharia');
    const tap2payAdherence =
      this.products.find((product) => product.name === 'Tap2Pay')?.adherence ?? 0;

    this.metrics = [
      {
        title: 'Aderência geral PCI DSS',
        value: `${averageAdherence}%`,
        badge: '+1%',
        description: 'Percentual consolidado considerando terminais e plataforma'
      },
      {
        title: 'Terminais - Engenharia',
        value: `${terminalsAverage}%`,
        badge: '4 produtos',
        description: 'Aderência média dos equipamentos de pagamento'
      },
      {
        title: 'Tap2Pay - Plataforma',
        value: `${tap2payAdherence}%`,
        badge: '1 produto',
        description: 'Aderência atual da plataforma ao processo de conformidade'
      },
      {
        title: 'Itens críticos pendentes',
        value: `${this.randomBetween(6, 10)}`,
        badge: '-1',
        description: 'Pendências prioritárias para evolução rumo ao PCI DSS'
      }
    ];
  }

  private calculateAverageAdherence(): number {
    const total = this.products.reduce(
      (accumulator, product) => accumulator + product.adherence,
      0
    );

    return Math.round(total / this.products.length);
  }

  private calculateAreaAverage(area: 'Engenharia' | 'Plataforma'): number {
    const filteredProducts = this.products.filter((product) => product.area === area);
    const total = filteredProducts.reduce(
      (accumulator, product) => accumulator + product.adherence,
      0
    );

    return Math.round(total / filteredProducts.length);
  }

  private saveMetrics(): void {
    localStorage.setItem('dashboard_metrics', JSON.stringify(this.metrics));
    localStorage.setItem('dashboard_products', JSON.stringify(this.products));
  }

  /** private loadMetrics(): void {
    const savedMetrics = localStorage.getItem('dashboard_metrics');
    const savedProducts = localStorage.getItem('dashboard_products');

    if (savedMetrics) {
      this.metrics = JSON.parse(savedMetrics);
    }

    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  } **/

  private saveTasks(): void {
    localStorage.setItem('dashboard_tasks', JSON.stringify(this.taskList));
  }

  private loadTasks(): void {
    const savedTasks = localStorage.getItem('dashboard_tasks');

    if (savedTasks) {
      this.taskList = JSON.parse(savedTasks);
    }
  }

  private removeExpiredCompletedTasks(): void {
    const expirationTime = 10_000;
    const now = Date.now();

    this.taskList = this.taskList.filter((task) => {
      if (task.status !== 'Concluído') {
        return true;
      }

      if (!task.completedAt) {
        return true;
      }

      return now - task.completedAt < expirationTime;
    });

    this.saveTasks();
  }

  private randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}