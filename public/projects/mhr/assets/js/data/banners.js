/* ==========================================================================
   MHR — Banners do carrossel principal (full width)
   --------------------------------------------------------------------------
   Para TROCAR um banner: substitua o arquivo de imagem em
   assets/img/banners/ mantendo o mesmo nome.
   Para ADICIONAR um banner: copie um bloco abaixo e ajuste os campos.
   Nenhuma alteração é necessária no HTML ou no componente.

   Campos:
     image       caminho da imagem (1920 × 820 px recomendado)
     alt         texto alternativo da imagem (acessibilidade / SEO)
     eyebrow     rótulo técnico superior
     title       título principal (o primeiro banner é o <h1> da página)
     text        texto de apoio
     cta         { label, href } — botão principal (opcional)
     ctaAlt      { label, href } — botão secundário (opcional)
     placeholder true enquanto a imagem for provisória: exibe o aviso
                 "Imagem provisória — XX / YY" sobre o banner. Remova a linha
                 (ou use false) quando entrar a foto definitiva.
   ========================================================================== */
(function (MHR) {
  'use strict';

  MHR.banners = [
    {
      image: 'assets/img/banners/banner-01.jpg',
      alt: 'Equipe de manutenção trabalhando em equipamento industrial de grande porte, sobre plataforma de acesso.',
      eyebrow: 'Engenharia Industrial',
      title: 'Montagem e Manutenção Eletromecânica para Mineração e Agroindústria',
      text: 'A MHR Engenharia executa montagem eletromecânica, manutenção industrial, paradas programadas, caldeiraria, fabricação e serviços de engenharia para mineração, beneficiamento mineral, armazenagem e processamento de grãos, com atuação em todo o Brasil.',
      cta: { label: 'Solicitar orçamento', href: 'contato.html' },
      ctaAlt: { label: 'Conhecer serviços', href: 'servicos.html' },
    },
    {
      image: 'assets/img/banners/banner-02.jpg',
      alt: 'Dois profissionais de manutenção industrial com capacete e óculos de proteção, em ambiente fabril.',
      eyebrow: 'Montagem e Fabricação',
      title: 'Montagem, fabricação e manutenção industrial',
      text: 'Montagem eletromecânica, elétrica e instrumentação, caldeiraria pesada e soldagem com equipe própria e multidisciplinar.',
      cta: { label: 'Ver serviços', href: 'servicos.html' },
    },
    {
      image: 'assets/img/banners/banner-03.jpg',
      alt: 'Capacete de segurança sobre plantas e desenhos técnicos, com obra ao fundo.',
      eyebrow: 'Projetos de Alta Exigência',
      title: 'Experiência técnica para projetos de alta exigência',
      text: 'Planejamento, execução, controle e entrega com responsabilidade técnica e CREA/ART quando aplicável.',
      cta: { label: 'Falar com a MHR', href: 'contato.html' },
      ctaAlt: { label: 'Engenharia e planejamento', href: 'engenharia.html' },
    },
  ];
})((window.MHR = window.MHR || {}));
