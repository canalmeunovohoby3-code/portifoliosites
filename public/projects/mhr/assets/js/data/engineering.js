/* ==========================================================================
   MHR — Engenharia e planejamento
   --------------------------------------------------------------------------
   Fluxo de trabalho e entregáveis. Edite aqui para refletir novos processos.
   ========================================================================== */
(function (MHR) {
  'use strict';

  MHR.engineering = {
    flow: [
      {
        title: 'Planejamento',
        icon: 'calendar',
        text: 'Levantamento de escopo, cronograma físico e definição de recursos, frentes de trabalho e interfaces do projeto.',
      },
      {
        title: 'Execução',
        icon: 'layers',
        text: 'Mobilização de equipes multidisciplinares e execução dos serviços conforme o plano e as normas de segurança aplicáveis.',
      },
      {
        title: 'Controle',
        icon: 'chart',
        text: 'Acompanhamento de avanço físico, medições, RDO e tratamento de desvios ao longo de toda a obra.',
      },
      {
        title: 'Entrega',
        icon: 'check-circle',
        text: 'Consolidação da documentação técnica, databook, as-built e liberação final dos serviços executados.',
      },
    ],

    deliverables: [
      {
        title: 'Cronogramas',
        icon: 'calendar',
        text: 'Programação de atividades físicas e físico-financeiras, com marcos e caminho crítico.',
      },
      {
        title: 'Medições',
        icon: 'ruler',
        text: 'Apuração de avanço e medição dos serviços executados para acompanhamento contratual.',
      },
      {
        title: 'RDO',
        icon: 'clipboard',
        text: 'Relatórios diários de obra com efetivo, equipamentos, atividades e ocorrências.',
      },
      {
        title: 'Databook',
        icon: 'file',
        text: 'Organização da documentação técnica produzida ao longo da execução dos serviços.',
      },
      {
        title: 'As-built',
        icon: 'blueprint',
        text: 'Registro do que foi efetivamente executado em campo e suas alterações em relação ao projeto.',
      },
      {
        title: 'Controle de obras',
        icon: 'target',
        text: 'Gestão de prazos, recursos e produtividade com visibilidade para o cliente.',
      },
    ],

    responsibility: [
      'Responsável técnico registrado no CREA',
      'Execução conforme as normas de segurança aplicáveis',
      'Registros e documentação de obra organizados',
      'Interface técnica direta com a equipe do cliente',
    ],
  };
})((window.MHR = window.MHR || {}));
