/* ==========================================================================
   MHR — Configuração central do site
   --------------------------------------------------------------------------
   FONTE DE VERDADE: altere aqui os dados institucionais, canais de contato e
   o menu. Campos com valor `null` são tratados como "aguardando definição" e
   aparecem como espaços reservados (sem dados fictícios).
   ========================================================================== */
(function (MHR) {
  'use strict';

  MHR.site = {
    name: 'MHR Manutenção Industrial e Engenharia',
    shortName: 'MHR',
    tagline: 'Manutenção Industrial e Engenharia',
    legalName: 'MHR Manutenção Industrial Ltda',
    cnpj: '69.188.438/0001-41',

    /* Texto de posicionamento (usado em SEO, footer, etc.) */
    description:
      'Engenharia industrial, montagem eletromecânica, manutenção industrial, caldeiraria pesada e fabricação em Varginha/MG, atendendo o Sul de Minas e todo o estado de Minas Gerais.',

    address: {
      street: 'Av. Dom Othon Motta, 530, Sala 01',
      district: 'Jardim Sion',
      city: 'Varginha',
      state: 'MG',
      zip: '37.048-570',
      country: 'Brasil',
    },

    area: {
      region: 'Sul de Minas e todo o estado de Minas Gerais',
      note: 'Disponibilidade para outras regiões conforme o projeto.',
    },

    technical: {
      crea: 'Responsável técnico registrado no CREA',
      safety: 'Atuação conforme as normas de segurança aplicáveis.',
    },

    /* ----------------------------------------------------------------------
       Canais de contato — preencher quando definidos.
       Exemplos:
         phone:    { label: '(00) 0000-0000', href: 'tel:+550000000000' }
         whatsapp: { label: 'WhatsApp', href: 'https://wa.me/550000000000' }
         email:    { label: 'contato@empresa.com.br', href: 'mailto:...' }
         instagram:{ label: '@perfil', href: 'https://instagram.com/perfil' }
         linkedin: { label: '/empresa', href: 'https://linkedin.com/company/...' }
       ---------------------------------------------------------------------- */
    contact: {
      phone: null,
      whatsapp: null,
      email: null,
      instagram: null,
      linkedin: null,
    },

    /* Endereço usado no mapa incorporado */
    mapQuery: 'Av. Dom Othon Motta, 530, Jardim Sion, Varginha - MG, 37048-570',

    /* Carrossel do banner principal ---------------------------------------
       O título de cada banner é soletrado letra por letra e a troca de banner
       acontece quando a soletração termina, seguida do tempo de leitura.
       A duração NÃO é fixa: ela cresce com o tamanho do título.

         duração do banner = nº de caracteres × letterDelay + postTypingDelay

       Exemplos com os valores abaixo:
         título de 51 caracteres -> 51 × 55 + 1700 = ~4,5 s
         título de 43 caracteres -> 43 × 55 + 1700 = ~4,1 s
       ---------------------------------------------------------------------- */
    carousel: {
      /* Tempo entre a entrada de cada letra do título, em milissegundos.
         Menor = soletração mais rápida. */
      letterDelay: 55,
      /* Tempo que o título completo permanece visível antes de trocar de
         banner, em milissegundos. */
      postTypingDelay: 1700,
      /* Se true, visitantes com "reduzir animações" ativo no sistema
         operacional veem o título completo de uma vez, sem soletração
         (comportamento recomendado para acessibilidade).
         Se false, a soletração acontece para todos os visitantes.
         Observação: no Windows, "Configurações > Acessibilidade > Efeitos
         visuais > Efeitos de animação" desligado faz o Chrome reportar
         prefers-reduced-motion: reduce — então, com true, quem estiver nessa
         configuração não vê a soletração. */
      respectReducedMotion: false,
    },

    /* Menu principal */
    nav: [
      { label: 'Início', href: 'index.html' },
      { label: 'A Empresa', href: 'a-empresa.html' },
      { label: 'Serviços', href: 'servicos.html' },
      { label: 'Segmentos', href: 'segmentos.html' },
      { label: 'Engenharia', href: 'engenharia.html' },
      { label: 'Segurança e Qualidade', href: 'seguranca-qualidade.html' },
      { label: 'Contato', href: 'contato.html' },
    ],

    cta: { label: 'Solicitar Orçamento', href: 'contato.html' },

    /* Redes / canais exibidos no footer e no contato */
    socials: [
      { key: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp' },
      { key: 'instagram', label: 'Instagram', icon: 'instagram' },
      { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
      { key: 'email', label: 'E-mail', icon: 'mail' },
    ],
  };
})((window.MHR = window.MHR || {}));
