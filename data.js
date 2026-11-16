const GROUPS = [
    {
        number: 1,
        theme: "Saúde",
        color: "#d62839",
        textColor: "#fff",
        source: "Diário de São Paulo · 09/02/2025 · Marina Milani",
        title: "Jardim Pantanal se une para enfrentar enchentes e teme novas tragédias",
        url: "https://spdiario.com.br/noticias/noticias-de-sp/jardim-pantanal-se-une-para-enfrentar-enchentes-e-teme-novas-tragedias.html",
        stats: [
            { value: 5, label: "dias até a água começar a baixar" },
            { value: 43000, label: "refeições distribuídas pela Prefeitura" },
            { value: 1400, label: "famílias com cartão emergencial de R$ 1.000" }
        ],
        text: [
            "O Jardim Pantanal, na zona leste, passou por uma das piores inundações dos últimos quinze anos. O bairro fica colado ao leito do rio Tietê e, por cinco dias, ruas e águas se confundiram, com esgoto vazando e animais peçonhentos nas casas.",
            "A comunidade reagiu antes do poder público: lideranças da Associação Pró-Lar, jovens do bairro e o Movimento Brasil Popular distribuíram água e marmitas e montaram uma cozinha emergencial. Moradoras relatam medo a cada chuva e problemas de saúde em crianças por causa da água contaminada.",
            "A Prefeitura informou ter entregado cerca de 43 mil refeições e cartões emergenciais a mais de 1.400 famílias, e disse estar estudando soluções para os alagamentos crônicos. Moradores criticam a falta de apoio e a Guarda Civil em um protesto."
        ],
        summary: "O Jardim Pantanal ficou até cinco dias alagado. Os próprios moradores se organizaram para distribuir água e comida antes do poder público. A Prefeitura entregou refeições e cartões emergenciais, mas a comunidade ainda teme novas enchentes."
    },
    {
        number: 2,
        theme: "Inclusão e Vulnerabilidades",
        color: "#ffb703",
        textColor: "#111",
        source: "Agência Pública · 19/02/2024 · Bianca Muniz e Matheus Santino",
        title: "Bairros periféricos e de maioria negra são os mais afetados por desastres em São Paulo",
        url: "https://apublica.org/2024/02/bairros-perifericos-e-de-maioria-negra-sao-os-mais-afetados-por-desastres-em-sao-paulo/",
        stats: [
            { value: 9, suffix: " de 10", label: "distritos mais atingidos ficam na periferia" },
            { value: 6, suffix: " de 10", label: "estão na Zona Leste" },
            { value: 2000, prefix: "+", label: "ocorrências só no Jardim Helena em dez anos" }
        ],
        text: [
            "Um levantamento da Agência Pública, feito com dados da Defesa Civil, mostra que os dez distritos paulistanos com mais alagamentos, inundações e deslizamentos na última década têm população negra acima da média da cidade. Nove deles estão nas periferias, e seis na Zona Leste.",
            "Jardim Helena, Vila Jacuí e São Miguel Paulista lideram a lista e concentram quase um terço das ocorrências. Especialistas ouvidas pela reportagem relacionam o problema ao racismo ambiental: investimento desigual em infraestrutura e demora do poder público em territórios negros.",
            "Moradores do Jardim Helena convivem com alagamentos há cerca de trinta anos e esperam um estudo de macrodrenagem sem prazo definido."
        ],
        summary: "Um levantamento da Agência Pública mostra que os distritos mais atingidos por alagamentos e deslizamentos em São Paulo são periféricos e de maioria negra. Especialistas ligam isso ao racismo ambiental e à desigualdade de investimento em infraestrutura."
    },
    {
        number: 3,
        theme: "Educação",
        color: "#06a77d",
        textColor: "#111",
        source: "Secretaria Municipal de Educação · 05/11/2025",
        title: "Projeto Educa Verde mobiliza comunidade escolar da DRE Penha em ação ambiental",
        url: "https://educacao.sme.prefeitura.sp.gov.br/noticias/projeto-educa-verde-mobiliza-comunidade-escolar-da-dre-penha-em-acao-ambiental-com-arrecadacao-de-tampas-e-lacres/",
        stats: [
            { value: 50000, prefix: "+", label: "litros de tampas e lacres desde 2019" },
            { value: 200, prefix: "+", label: "unidades escolares envolvidas" },
            { value: 36, label: "cadeiras de rodas entregues entre 2019 e 2024" }
        ],
        text: [
            "O Educa Verde, criado em 2019 na DRE Penha (zona leste), une educação ambiental e solidariedade: escolas recolhem tampas e lacres descartáveis, que são vendidos e viram cadeiras de rodas, em parceria com o Lions Clube São Miguel.",
            "Funciona como uma gincana entre escolas. Em 2025, 37 EMEFs e uma EMEI arrecadaram cerca de 39 mil litros, e a escola campeã pode receber uma cadeira de rodas para a própria comunidade.",
            "Além da coleta, o projeto estimula hortas, limpeza de praças e plantio de mudas, e envolve famílias e estudantes como protagonistas."
        ],
        summary: "O Educa Verde coleta tampas e lacres nas escolas da DRE Penha. O material é vendido e vira cadeiras de rodas. O projeto une educação ambiental, solidariedade e participação da comunidade escolar."
    },
    {
        number: 4,
        theme: "Políticas Públicas e Participação",
        color: "#2d6cdf",
        textColor: "#fff",
        source: "ACNUR Brasil · 24/07/2026",
        title: "Com apoio do ACNUR, comunidade haitiana em São Paulo recebe ação de saúde",
        url: "https://www.acnur.org/br/noticias/notas-informativas/com-apoio-do-acnur-comunidade-haitiana-em-sao-paulo-recebe-acao-de",
        stats: [
            { value: 70, prefix: "~", label: "pessoas atendidas dentro da comunidade" },
            { value: 1, label: "primeira ação de saúde desse tipo no local" },
            { value: 2, label: "novas demandas: oftalmologia e odontologia" }
        ],
        text: [
            "Com apoio do ACNUR e da Cáritas Arquidiocesana, a comunidade haitiana recebeu a primeira ação de atendimento de saúde dentro do próprio território. Cerca de 70 pessoas foram atendidas, a partir de demandas identificadas pelas lideranças locais.",
            "Uma moradora diagnosticada com pressão alta, por exemplo, tinha dificuldade de medir a pressão com frequência por causa da distância e das ruas sem pavimento. Um agente de ação social haitiano ajudou no atendimento.",
            "As lideranças querem levar também oftalmologia e odontologia, áreas com maior dificuldade de acesso na rede pública de saúde."
        ],
        summary: "Pela primeira vez, a comunidade haitiana recebeu atendimento de saúde dentro do próprio território, com apoio do ACNUR e da Cáritas. Cerca de 70 pessoas foram atendidas e as lideranças querem ampliar para oftalmologia e odontologia."
    },
    {
        number: 5,
        theme: "Trabalho e Economia",
        color: "#ff7a00",
        textColor: "#111",
        source: "Jornal da USP · Sociedade em Foco #267 · 23/03/2026",
        title: "Zona Leste sofre com a falta de políticas públicas",
        url: "https://jornal.usp.br/podcast/sociedade-em-foco-267-zona-leste-sofre-com-a-falta-de-politicas-publicas/",
        stats: [
            { value: 13, suffix: "%", label: "dos empregos da cidade estão na Zona Leste" },
            { value: 35, suffix: "%", label: "da população paulistana vive lá" },
            { value: 12, raw: true, prefix: "11–", suffix: "%", label: "de cobertura vegetal (a cidade toda: 54%)" }
        ],
        text: [
            "No podcast, o pesquisador José Luiz Portella (USP) lembra que a zona leste tem mais de 4 milhões de habitantes, cerca de 35% do município, mas apenas 13% dos empregos. A renda média local é de dois terços da do resto da cidade.",
            "Segundo ele, a riqueza passa pela região, mas não fica: faltam políticas para gerar emprego e renda local, e as pessoas precisam se deslocar para trabalhar e consumir em outras áreas. A região também tem pouca representação política.",
            "Como caminho, ele aponta três eixos: transição energética, economia criativa e inteligência artificial."
        ],
        summary: "A Zona Leste concentra cerca de 35% da população paulistana, mas só 13% dos empregos, e tem pouca cobertura vegetal. O pesquisador defende políticas de emprego e renda locais."
    },
    {
        number: 7,
        theme: "Comunicação e Consciência",
        color: "#d81b84",
        textColor: "#fff",
        source: "UFRN · Matérias Especiais",
        title: "Comunicação, consciência e meio ambiente",
        url: "https://www.ufrn.br/imprensa/materias-especiais/88561/comunicacao-consciencia-e-meio-ambiente",
        stats: [
            { value: 1968, raw: true, label: "ano de fundação do Clube de Roma" },
            { value: 1972, raw: true, label: "Conferência de Estocolmo e relatório “Limites do Crescimento”" },
            { value: 1992, raw: true, label: "Rio-92: conferência da ONU sobre meio ambiente e desenvolvimento" }
        ],
        text: [
            "A relação entre comunicação, consciência e meio ambiente é fundamental para mobilizar a sociedade em direção a práticas sustentáveis e à preservação dos recursos naturais.",
            "Através de reportagens especiais e iniciativas acadêmicas, como as desenvolvidas na UFRN, evidencia-se que a informação clara e acessível desperta a conscientização ecológica e fomenta o engajamento comunitário.",
            "O papel dos meios de comunicação vai além da transmissão de dados: eles atuam como catalisadores de debates essenciais para a formulação de políticas públicas e para a mudança de hábitos cotidianos em prol do planeta."
        ],
        summary: "A comunicação é central para mobilizar a sociedade por práticas sustentáveis. Informação clara e acessível aumenta a consciência ambiental e alimenta o debate sobre políticas públicas."
    }
];
