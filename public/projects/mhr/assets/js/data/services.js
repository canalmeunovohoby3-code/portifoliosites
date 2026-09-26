/* ==========================================================================
   MHR — Serviços
   --------------------------------------------------------------------------
   `featured: true` marca o serviço que aparece na prévia de serviços da
   página inicial. A página Serviços exibe todos, nesta mesma ordem — a
   numeração "Serviço 0X / 09" é a posição neste array e é a mesma nas duas
   áreas, para o visitante reconhecer o serviço ao trocar de página.
   `scope` alimenta a página Serviços (descrição ampliada).
   `imageAlt` descreve a foto para acessibilidade. Quando a imagem ainda é o
   placeholder (servico-0X.svg), pode ficar sem `imageAlt`: o componente usa
   automaticamente "<título> — imagem ilustrativa". Ao trocar por uma foto
   real, informe o `imageAlt` descrevendo o que ela mostra.
   `bullets` lista escopos/entregáveis típicos do serviço.
   ========================================================================== */
(function (MHR) {
  'use strict';

  MHR.services = [
    {
      slug: 'montagem-eletromecanica',
      title: 'Montagem Eletromecânica',
      icon: 'layers',
      image: 'assets/img/services/servico-01.jpg',
      imageAlt: 'Montagem de transportador de correia com estrutura metálica em campo.',
      short: 'Montagem e integração de equipamentos e sistemas industriais.',
      scope:
        'Montagem e integração de equipamentos e sistemas industriais, com equipe multidisciplinar atuando de forma integrada com o planejamento da obra e com as demais disciplinas do projeto.',
      bullets: [
        'Montagem de equipamentos e conjuntos mecânicos',
        'Alinhamento, nivelação e integração de sistemas',
        'Interfaces com montagem elétrica e instrumentação',
        'Acompanhamento de testes e partida assistida',
      ],
      featured: true,
    },
    {
      slug: 'montagem-eletrica-instrumentacao',
      title: 'Montagem Elétrica e Instrumentação',
      icon: 'bolt',
      image: 'assets/img/services/servico-02.jpg',
      imageAlt: 'Técnico testando os contatos de um painel elétrico com multímetro.',
      short: 'Execução de instalações elétricas e sistemas de instrumentação industrial.',
      scope:
        'Execução de instalações elétricas e sistemas de instrumentação industrial, com organização de circuitos, identificação e rastreabilidade dos pontos executados.',
      bullets: [
        'Lançamento de cabos e infraestrutura elétrica',
        'Instalação de painéis, quadros e comandos',
        'Instrumentação e interligação de campo',
        'Identificação, testes e organização de circuitos',
      ],
      featured: true,
    },
    {
      slug: 'manutencao-industrial',
      title: 'Manutenção Industrial',
      icon: 'wrench',
      image: 'assets/img/services/servico-03.jpg',
      imageAlt:
        'Manutenção em equipamento rotativo de grande porte, com placas de revestimento e equipamento de manutenção no piso.',
      short: 'Manutenção preventiva e corretiva para equipamentos e instalações industriais.',
      scope:
        'Manutenção preventiva e corretiva para equipamentos e instalações industriais, com foco em disponibilidade, confiabilidade e continuidade operacional.',
      bullets: [
        'Manutenção preventiva programada',
        'Manutenção corretiva e atendimento a falhas',
        'Diagnóstico e recuperação de conjuntos mecânicos',
        'Registros e histórico de intervenções',
      ],
      featured: true,
    },
    {
      slug: 'paradas-de-manutencao',
      title: 'Paradas de Manutenção',
      icon: 'clock',
      image: 'assets/img/services/servico-04.svg',
      short: 'Planejamento e execução de serviços durante paradas industriais.',
      scope:
        'Planejamento e execução de serviços durante paradas industriais, mobilizando equipes e recursos para cumprir a janela de parada com segurança e controle.',
      bullets: [
        'Programação e sequenciamento de atividades',
        'Mobilização de equipes e recursos',
        'Controle de produtividade durante a janela',
        'Registro de intervenções e liberação de Áreas',
      ],
    },
    {
      slug: 'caldeiraria-pesada-fabricacao',
      title: 'Caldeiraria Pesada e Fabricação',
      icon: 'tank',
      image: 'assets/img/services/servico-05.jpg',
      imageAlt:
        'Interior de moinho com placas de revestimento parafusadas e esferas de moagem no piso.',
      short: 'Fabricação de chutes, silos, tremonhas, tanques, dutos e estruturas metálicas.',
      scope:
        'Fabricação de chutes, silos, tremonhas, tanques, dutos e estruturas metálicas, com controle dimensional e rastreabilidade dos materiais empregados.',
      bullets: [
        'Chutes, moegas, tremonhas e silos',
        'Tanques, dutos e espiras de transporte',
        'Estruturas metálicas e bases de equipamentos',
        'Controle dimensional e acabamento',
      ],
      featured: true,
    },
    {
      slug: 'soldagem-industrial',
      title: 'Soldagem Industrial',
      icon: 'flame',
      image: 'assets/img/services/servico-06.jpg',
      imageAlt:
        'Soldador com máscara de proteção executando solda em peça metálica, com faíscas de solda.',
      short: 'Serviços de soldagem aplicados a estruturas e equipamentos industriais.',
      scope:
        'Serviços de soldagem aplicados a estruturas e equipamentos industriais, executados por soldadores e caldeireiros conforme a necessidade técnica de cada intervenção.',
      bullets: [
        'Soldagem estrutural e de equipamentos',
        'Recuperação e revestimento de peças',
        'Reparos em campo e em oficina',
        'Preparação, ajuste e acabamento',
      ],
      featured: true,
    },
    {
      slug: 'vulcanizacao-de-correias',
      title: 'Vulcanização de Correias',
      icon: 'belt',
      image: 'assets/img/services/servico-07.svg',
      short: 'Vulcanização a frio e a quente de correias transportadoras.',
      scope:
        'Vulcanização a frio e a quente de correias transportadoras, apoiando a operação de sistemas de transporte de minério, grãos e materiais a granel.',
      bullets: [
        'Vulcanização a frio e a quente',
        'Emendas e reparos em correias transportadoras',
        'Apoio a sistemas de transporte de granéis',
        'Intervenções programadas e emergenciais',
      ],
      featured: true,
    },
    {
      slug: 'andaimes',
      title: 'Andaimes',
      icon: 'scaffold',
      image: 'assets/img/services/servico-08.svg',
      short: 'Montagem e desmontagem de andaimes para operações e obras industriais.',
      scope:
        'Montagem e desmontagem de andaimes para operações e obras industriais, com dimensionamento de estrutura e organização das frentes de trabalho.',
      bullets: [
        'Andaimes tubulares e multidirecionais',
        'Apoio a serviços de manutenção e obras',
        'Dimensionamento conforme a frente de serviço',
        'Montagem, inspeção e desmontagem',
      ],
    },
    {
      slug: 'planejamento-controle-obras',
      title: 'Planejamento e Controle de Obras',
      icon: 'chart',
      image: 'assets/img/services/servico-09.svg',
      short: 'Cronogramas, medições, RDO, databook e as-built.',
      scope:
        'Cronogramas, medições, RDO, databook e as-built — a estrutura de engenharia que acompanha a execução e dá visibilidade ao cliente sobre prazos, custos e escopo realizado.',
      bullets: [
        'Cronogramas físicos e físico-financeiros',
        'Medições e controle de avanço',
        'RDO — relatórios diários de obra',
        'Databook e as-built',
      ],
    },
  ];
})((window.MHR = window.MHR || {}));
