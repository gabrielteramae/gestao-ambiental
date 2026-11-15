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
            { text: "11–12%", label: "de cobertura vegetal (a cidade toda: 54%)" }
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
        source: "UFRN · Agecom · 21/03/2025 · Giovana Góis e Juliana Holanda",
        title: "Comunicação, consciência e meio ambiente",
        url: "https://www.ufrn.br/imprensa/materias-especiais/88561/comunicacao-consciencia-e-meio-ambiente",
        stats: [
            { value: 90, suffix: "%", label: "dos municípios brasileiros têm problemas ambientais (IBGE)" },
            { value: 250, prefix: "+", label: "edições do Minuto Sustentável desde 2021" },
            { value: 5, label: "gravações por semana, com uma equipe pequena" }
        ],
        text: [
            "A desinformação é um dos principais obstáculos para enfrentar a crise climática: notícias falsas distorcem dados e enfraquecem a mobilização. Em resposta, o Instituto Humanitas, a Universitária FM 88.9 e a Superintendência de Comunicação da UFRN mantêm o Minuto Sustentável, no ar desde outubro de 2021 e também na plataforma Nosso Futuro Comum.",
            "São reportagens, entrevistas e trechos de relatórios científicos, com mais de 250 edições e cerca de cinco gravações por semana, feitas por voluntários e bolsistas. O programa nasceu na pandemia, em conversa com Heitor Matallo, ex-funcionário da ONU, e passou a ser transmitido em setembro de 2021.",
            "O coordenador, professor Orivaldo Pimentel Lopes Junior, diz que hábitos do dia a dia ajudam, mas só a atuação política muda o rumo da crise, e que uma sociedade bem informada escolhe quem defende a causa ambiental. A matéria cita o IBGE: 90% dos municípios brasileiros têm problemas ambientais. A equipe, ligada ao grupo Marginália e ao INCT-Klimapolis, quer levar o programa a outras rádios e sites."
        ],
        summary: "O Minuto Sustentável, parceria da UFRN com a rádio Universitária, enfrenta a desinformação climática desde 2021 e já passou de 250 edições. A equipe defende que informação ambiental precisa virar atuação política."
    }
];
