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

interface AiSuggestion {
  productName: string;
  title: string;
  summary: string;
  fullText: string;
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
      description: 'Percentual consolidado de conformidade considerando terminais e plataforma'
    },
    {
      title: 'Terminais - Engenharia',
      value: '78%',
      badge: '4 produtos',
      description: 'Percentual médio de conformidade dos equipamentos de pagamento'
    },
    {
      title: 'Tap2Pay - Plataforma',
      value: '86%',
      badge: '1 produto',
      description: 'Nível atual de conformidade da plataforma em relação ao PCI DSS'
    },
    {
      title: 'Itens críticos pendentes',
      value: '4',
      badge: 'Em aberto',
      description: 'Produtos com pendências para atingir 100% de conformidade'
    }
  ];

  products: ProductComplianceItem[] = [
    {
      name: 'MP35',
      area: 'Engenharia',
      adherence: 76,
      statusLabel: 'Atenção',
      description:
      '76% em conformidade. Necessita evolução em hardening (reforço de segurança), evidências e validações técnicas.'
      },
    {
      name: 'MP15',
      area: 'Engenharia',
      adherence: 72,
      statusLabel: 'Atenção',
      description:
        '72% em conformidade. Ainda possui lacunas em documentação técnica e trilha de auditoria.'
    },
    {
      name: 'SmartPOS',
      area: 'Engenharia',
      adherence: 83,
      statusLabel: 'Evoluindo',
      description:
        '83% em conformidade. Bom nível de aderência, com ajustes finais em controles complementares.'
    },
    {
      name: 'Pinpad PPC 930',
      area: 'Engenharia',
      adherence: 81,
      statusLabel: 'Evoluindo',
      description:
        '81% em conformidade. Necessita refinamento de evidências e revisão de requisitos pendentes.'
    },
    {
      name: 'Tap2Pay',
      area: 'Plataforma',
      adherence: 86,
      statusLabel: 'Próximo da meta',
      description:
        '86% em conformidade. Faltam adequações finais em controles, governança e evidências operacionais.'
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

  aiSuggestions: AiSuggestion[] = [
    {
      productName: 'Tap2Pay',
      title: 'Reporte de vulnerabilidades no T2P',
      summary:
        'Implementar um fluxo formal para que usuários do T2P reportem vulnerabilidades, com investigação e tratamento definidos pela Gertec...',
      fullText:
        'A GerzInhA recomenda implementar um programa de reporte de vulnerabilidades para usuários do T2P, com um fluxo definido para recebimento, investigação, classificação e tratamento das vulnerabilidades reportadas.'
    },
    {
      productName: 'Tap2Pay',
      title: 'Canal formal para reporte pelo usuário',
      summary:
        'Documentar como a Gertec disponibiliza ao usuário do T2P um canal claro e rastreável para reporte de vulnerabilidades...',
      fullText:
        'A GerzInhA recomenda adaptar e documentar como a Gertec disponibiliza ao usuário do T2P um canal formal para reporte de vulnerabilidades identificadas, garantindo clareza no processo e rastreabilidade das tratativas.'
    },
    {
      productName: 'MP35 / SOs suportados',
      title: 'Governança de sistemas operacionais',
      summary:
        'Definir processo recorrente de scan de vulnerabilidades e critérios para inclusão ou remoção de sistemas operacionais suportados...',
      fullText:
        'A GerzInhA recomenda estabelecer um processo recorrente de scan de vulnerabilidades nos sistemas operacionais suportados, com critérios definidos para inclusão de novos SOs e remoção de versões com base em análises de risco e segurança.'
    }
  ];

  isAiPanelOpen = false;
  selectedProduct = 'MP35';

  ngOnInit(): void {
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
    this.isAiPanelOpen = true;
    this.generateSuggestionFromSelectedProduct(productName);
  }

  private generateSuggestionFromSelectedProduct(productName: string): void {
    const suggestion = this.buildSuggestionByProduct(productName);

    const alreadyExists = this.aiSuggestions.some(
      (item) =>
        item.productName === suggestion.productName &&
        item.title === suggestion.title
    );

    if (!alreadyExists) {
      this.aiSuggestions = [suggestion, ...this.aiSuggestions];
    }
  }

  private buildSuggestionByProduct(productName: string): AiSuggestion {
    if (productName === 'Tap2Pay') {
      return {
        productName,
        title: 'Canal formal para reporte pelo usuário',
        summary:
          'A GerzInhA recomenda adaptar e documentar como a Gertec disponibiliza ao usuário do T2P um canal formal para reporte de vulnerabilidades...',
        fullText:
          'A GerzInhA recomenda adaptar e documentar como a Gertec disponibiliza ao usuário do T2P um canal formal para reporte de vulnerabilidades identificadas, garantindo clareza no processo e rastreabilidade das tratativas.'
      };
    }

    if (productName === 'MP35') {
      return {
        productName,
        title: 'Governança de sistemas operacionais',
        summary:
          'A GerzInhA recomenda definir processo recorrente de scan de vulnerabilidades e critérios para inclusão ou remoção de sistemas operacionais...',
        fullText:
          'A GerzInhA recomenda estabelecer um processo recorrente de scan de vulnerabilidades nos sistemas operacionais suportados, com critérios definidos para inclusão de novos SOs e remoção de versões com base em análises de risco e segurança.'
      };
    }

    if (productName === 'MP15') {
      return {
        productName,
        title: 'Formalização de evidências técnicas',
        summary:
          'A GerzInhA recomenda consolidar documentação técnica e trilha de auditoria para elevar o nível de conformidade do MP15...',
        fullText:
          'A GerzInhA recomenda consolidar a documentação técnica, a trilha de auditoria e os registros de validação do MP15, reduzindo lacunas documentais e fortalecendo a comprovação de conformidade.'
      };
    }

    if (productName === 'SmartPOS') {
      return {
        productName,
        title: 'Finalização de controles complementares',
        summary:
          'A GerzInhA recomenda concluir controles complementares de segurança e validar as evidências restantes do SmartPOS...',
        fullText:
          'A GerzInhA recomenda concluir os controles complementares de segurança do SmartPOS e validar as evidências restantes para acelerar a evolução do produto rumo à conformidade total.'
      };
    }

    return {
      productName,
      title: 'Revisão de requisitos pendentes do produto',
      summary:
        `A GerzInhA recomenda revisar os requisitos pendentes do ${productName} e consolidar as evidências necessárias para auditoria...`,
      fullText:
        `A GerzInhA recomenda revisar os requisitos pendentes do ${productName}, consolidar evidências técnicas e definir um plano de ação para elevar o percentual de conformidade do produto em relação ao PCI DSS.`
    };
  }

  addSuggestionToTasks(suggestion: AiSuggestion): void {
    const taskAlreadyExists = this.taskList.some(
      (task) => task.title === suggestion.title
    );

    if (taskAlreadyExists) {
      return;
    }

    this.taskList = [
      {
        title: suggestion.title,
        subtitle: suggestion.summary,
        status: 'Pendente'
      },
      ...this.taskList
    ];

    this.saveTasks();
  }

  downloadSuggestion(suggestion: AiSuggestion): void {
    const content = `${suggestion.title}\n\nProduto: ${suggestion.productName}\n\n${suggestion.fullText}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${suggestion.productName.toLowerCase().replace(/\s+/g, '-')}-recomendacao.txt`;
    link.click();

    window.URL.revokeObjectURL(url);
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
        adherence: updatedAdherence,
        description: `${updatedAdherence}% em conformidade. ${this.getProductBaseDescription(product.name, updatedAdherence)}`
      };
    });

    const averageAdherence = this.calculateAverageAdherence();
    const terminalsAverage = this.calculateAreaAverage('Engenharia');
    const tap2payAdherence =
      this.products.find((product) => product.name === 'Tap2Pay')?.adherence ?? 0;

    const pendingItems = this.calculatePendingItems();

    this.metrics = [
      {
        title: 'Aderência geral PCI DSS',
        value: `${averageAdherence}%`,
        badge: '+1%',
        description:
          'Percentual consolidado de conformidade considerando terminais e plataforma'
      },
      {
        title: 'Terminais - Engenharia',
        value: `${terminalsAverage}%`,
        badge: '4 produtos',
        description: 'Percentual médio de conformidade dos equipamentos de pagamento'
      },
      {
        title: 'Tap2Pay - Plataforma',
        value: `${tap2payAdherence}%`,
        badge: '1 produto',
        description:
          'Nível atual de conformidade da plataforma em relação ao PCI DSS'
      },
      {
        title: 'Itens críticos pendentes',
        value: `${pendingItems}`,
        badge: pendingItems === 0 ? 'Conforme' : 'Em aberto',
        description:
          pendingItems === 0
            ? 'Todos os produtos atingiram 100% de conformidade'
            : 'Produtos com pendências para atingir 100% de conformidade'
      }
    ];
  }

  private getProductBaseDescription(productName: string, adherence?: number): string {
    if (adherence === 100) {
      return 'Produto em conformidade total com os requisitos monitorados do PCI DSS.';
    }

    if (productName === 'MP35') {
      return 'Necessita evolução em hardening, evidências e validações de segurança.';
    }

    if (productName === 'MP15') {
      return 'Ainda possui lacunas em documentação técnica e trilha de auditoria.';
    }

    if (productName === 'SmartPOS') {
      return 'Bom nível de aderência, com ajustes finais em controles complementares.';
    }

    if (productName === 'Pinpad PPC 930') {
      return 'Necessita refinamento de evidências e revisão de requisitos pendentes.';
    }

    return 'Faltam adequações finais em controles, governança e evidências operacionais.';
  }

  private calculatePendingItems(): number {
    return this.products.filter((product) => product.adherence < 100).length;
  }

  private calculateAverageAdherence(): number {
    const total = this.products.reduce(
      (accumulator, product) => accumulator + product.adherence,
      0
    );

    return Math.floor(total / this.products.length);
  }

  private calculateAreaAverage(area: 'Engenharia' | 'Plataforma'): number {
    const filteredProducts = this.products.filter(
      (product) => product.area === area
    );

    const total = filteredProducts.reduce(
      (accumulator, product) => accumulator + product.adherence,
      0
    );

    return Math.floor(total / filteredProducts.length);
  }

  private saveMetrics(): void {
    localStorage.setItem('dashboard_metrics', JSON.stringify(this.metrics));
    localStorage.setItem('dashboard_products', JSON.stringify(this.products));
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

  get overallAdherence(): number {
    const metric = this.metrics.find(
      (item) => item.title === 'Aderência geral PCI DSS'
    );

    if (!metric) {
      return 0;
    }

    return Number(metric.value.replace('%', ''));
  }

  get remainingToGoal(): number {
    return Math.max(100 - this.overallAdherence, 0);
  }

  getProgressBarWidth(value: number): string {
    return `${value}%`;
  }
}