const h = React.createElement;
const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

const D = [
    {
        n: 1,
        tema: "Saúde",
        c: "#e63946",
        t: "#fff",
        fonte: "Diário de São Paulo · 09/02/2025 · Marina Milani",
        titulo: "Jardim Pantanal se une para enfrentar enchentes e teme novas tragédias",
        url: "https://spdiario.com.br/noticias/noticias-de-sp/jardim-pantanal-se-une-para-enfrentar-enchentes-e-teme-novas-tragedias.html",
        stats: [
            { n: 5, l: "dias até a água começar a baixar" },
            { n: 43000, l: "refeições distribuídas pela Prefeitura" },
            { n: 1400, l: "famílias com cartão emergencial de R$ 1.000" }
        ],
        txt: [
            "O Jardim Pantanal, na zona leste, passou por uma das piores inundações dos últimos quinze anos. O bairro fica colado ao leito do rio Tietê e, por cinco dias, ruas e águas se confundiram, com esgoto vazando e animais peçonhentos nas casas.",
            "A comunidade reagiu antes do poder público: lideranças da Associação Pró-Lar, jovens do bairro e o Movimento Brasil Popular distribuíram água e marmitas e montaram uma cozinha emergencial. Moradoras relatam medo a cada chuva e problemas de saúde em crianças por causa da água contaminada.",
            "A Prefeitura informou ter entregado cerca de 43 mil refeições e cartões emergenciais a mais de 1.400 famílias, e disse estar estudando soluções para os alagamentos crônicos. Moradores criticam a falta de apoio e a Guarda Civil em um protesto."
        ]
    },
    {
        n: 2,
        tema: "Inclusão e Vulnerabilidades",
        c: "#ffb703",
        t: "#111",
        fonte: "Agência Pública · 19/02/2024 · Bianca Muniz e Matheus Santino",
        titulo: "Bairros periféricos e de maioria negra são os mais afetados por desastres em São Paulo",
        url: "https://apublica.org/2024/02/bairros-perifericos-e-de-maioria-negra-sao-os-mais-afetados-por-desastres-em-sao-paulo/",
        stats: [
            { n: 9, s: " de 10", l: "distritos mais atingidos ficam na periferia" },
            { n: 6, s: " de 10", l: "estão na Zona Leste" },
            { n: 2000, p: "+", l: "ocorrências só no Jardim Helena em dez anos" }
        ],
        txt: [
            "Um levantamento da Agência Pública, feito com dados da Defesa Civil, mostra que os dez distritos paulistanos com mais alagamentos, inundações e deslizamentos na última década têm população negra acima da média da cidade. Nove deles estão nas periferias, e seis na Zona Leste.",
            "Jardim Helena, Vila Jacuí e São Miguel Paulista lideram a lista e concentram quase um terço das ocorrências. Especialistas ouvidas pela reportagem relacionam o problema ao racismo ambiental: investimento desigual em infraestrutura e demora do poder público em territórios negros.",
            "Moradores do Jardim Helena convivem com alagamentos há cerca de trinta anos e esperam um estudo de macrodrenagem sem prazo definido."
        ]
    },
    {
        n: 3,
        tema: "Educação",
        c: "#06a77d",
        t: "#fff",
        fonte: "Secretaria Municipal de Educação · 05/11/2025",
        titulo: "Projeto Educa Verde mobiliza comunidade escolar da DRE Penha em ação ambiental",
        url: "https://educacao.sme.prefeitura.sp.gov.br/noticias/projeto-educa-verde-mobiliza-comunidade-escolar-da-dre-penha-em-acao-ambiental-com-arrecadacao-de-tampas-e-lacres/",
        stats: [
            { n: 50000, p: "+", l: "litros de tampas e lacres desde 2019" },
            { n: 200, p: "+", l: "unidades escolares envolvidas" },
            { n: 36, l: "cadeiras de rodas entregues entre 2019 e 2024" }
        ],
        txt: [
            "O Educa Verde, criado em 2019 na DRE Penha (zona leste), une educação ambiental e solidariedade: escolas recolhem tampas e lacres descartáveis, que são vendidos e viram cadeiras de rodas, em parceria com o Lions Clube São Miguel.",
            "Funciona como uma gincana entre escolas. Em 2025, 37 EMEFs e uma EMEI arrecadaram cerca de 39 mil litros, e a escola campeã pode receber uma cadeira de rodas para a própria comunidade.",
            "Além da coleta, o projeto estimula hortas, limpeza de praças e plantio de mudas, e envolve famílias e estudantes como protagonistas."
        ]
    },
    {
        n: 4,
        tema: "Políticas Públicas e Participação",
        c: "#2d6cdf",
        t: "#fff",
        fonte: "ACNUR Brasil · 24/07/2026",
        titulo: "Com apoio do ACNUR, comunidade haitiana em São Paulo recebe ação de saúde",
        url: "https://www.acnur.org/br/noticias/notas-informativas/com-apoio-do-acnur-comunidade-haitiana-em-sao-paulo-recebe-acao-de",
        stats: [
            { n: 70, p: "~", l: "pessoas atendidas dentro da comunidade" },
            { n: 1, l: "primeira ação de saúde desse tipo no local" },
            { n: 2, l: "novas demandas: oftalmologia e odontologia" }
        ],
        txt: [
            "Com apoio do ACNUR e da Cáritas Arquidiocesana, a comunidade haitiana recebeu a primeira ação de atendimento de saúde dentro do próprio território. Cerca de 70 pessoas foram atendidas, a partir de demandas identificadas pelas lideranças locais.",
            "Uma moradora diagnosticada com pressão alta, por exemplo, tinha dificuldade de medir a pressão com frequência por causa da distância e das ruas sem pavimento. Um agente de ação social haitiano ajudou no atendimento.",
            "As lideranças querem levar também oftalmologia e odontologia, áreas com maior dificuldade de acesso na rede pública de saúde."
        ]
    },
    {
        n: 5,
        tema: "Trabalho e Economia",
        c: "#ff7a00",
        t: "#111",
        fonte: "Jornal da USP · Sociedade em Foco #267 · 23/03/2026",
        titulo: "Zona Leste sofre com a falta de políticas públicas",
        url: "https://jornal.usp.br/podcast/sociedade-em-foco-267-zona-leste-sofre-com-a-falta-de-politicas-publicas/",
        stats: [
            { n: 13, s: "%", l: "dos empregos da cidade estão na Zona Leste" },
            { n: 35, s: "%", l: "da população paulistana vive lá" },
            { n: 12, p: "11–", s: "%", l: "de cobertura vegetal (a cidade toda: 54%)" }
        ],
        txt: [
            "No podcast, o pesquisador José Luiz Portella (USP) lembra que a zona leste tem mais de 4 milhões de habitantes, cerca de 35% do município, mas apenas 13% dos empregos. A renda média local é de dois terços da do resto da cidade.",
            "Segundo ele, a riqueza passa pela região, mas não fica: faltam políticas para gerar emprego e renda local, e as pessoas precisam se deslocar para trabalhar e consumir em outras áreas. A região também tem pouca representação política.",
            "Como caminho, ele aponta três eixos: transição energética, economia criativa e inteligência artificial."
        ]
    },
    {
        n: 7,
        tema: "Comunicação e Consciência",
        c: "#d81b84",
        t: "#fff",
        fonte: "UFRN · Matérias Especiais",
        titulo: "Comunicação, consciência e meio ambiente",
        url: "https://www.ufrn.br/imprensa/materias-especiais/88561/comunicacao-consciencia-e-meio-ambiente",
        stats: [
            { n: 1968, l: "ano do memorável relatório do Clube de Roma sobre limites" },
            { n: 1972, l: "Conferência de Estocolmo marco da pauta ambiental global" },
            { n: 30, l: "anos de discussões aprofundadas sobre sustentabilidade" }
        ],
        txt: [
            "A relação entre comunicação, consciência e meio ambiente é fundamental para mobilizar a sociedade em direção a práticas sustentáveis e à preservação dos recursos naturais.",
            "Através de reportagens especiais e iniciativas acadêmicas, como as desenvolvidas na UFRN, evidencia-se que a informação clara e acessível desperta a conscientização ecológica e fomenta o engajamento comunitário.",
            "O papel dos meios de comunicação vai além da transmissão de dados: eles atuam como catalisadores de debates essenciais para a formulação de políticas públicas e para a mudança de hábitos cotidianos em prol do planeta."
        ]
    }
];

const fmt = n => n.toLocaleString("pt-BR");

function useHash() {
    const [x, s] = useState((location.hash || "#home").slice(1));
    useEffect(() => {
        const f = () => {
            s((location.hash || "#home").slice(1));
            window.scrollTo(0, 0);
        };
        addEventListener("hashchange", f);
        return () => removeEventListener("hashchange", f);
    }, []);
    return x;
}

const go = v => { location.hash = v; };

const QR_HTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=https%3A%2F%2Fgabrielteramae.github.io%2Fgestao-ambiental%2F%23groups" alt="QR Code do site" style="width:100%;height:auto;display:block;border-radius:6px">`;

function Qr() {
    return h("div", { className: "qr" },
        h("div", { dangerouslySetInnerHTML: { __html: QR_HTML } }),
        h("b", null, "Aponte a câmera para acessar")
    );
}

// Componente do Easter Egg usando o arquivo icone-play.png
function SecretSurprise() {
    const [isOpen, setIsOpen] = useState(false);

    return h(React.Fragment, null,
        h("button", {
            className: "secret-emoji-btn",
            title: "Ei, volte para a atividade!",
            onClick: () => setIsOpen(true)
        },
            h("img", {
                src: "icone-play.png",
                alt: "Emoji surpreso",
                onError: e => { e.target.src = "https://i.imgur.com/8Qz469y.png"; }
            })
        ),

        isOpen && h("div", { className: "modal-overlay", onClick: () => setIsOpen(false) },
            h("div", { className: "modal-content", onClick: e => e.stopPropagation() },
                h("button", { className: "modal-close", onClick: () => setIsOpen(false) }, "×"),
                h("div", { className: "modal-title" }, "Ei, volte para a atividade!"),
                h("div", { className: "modal-video-container" },
                    h("video", {
                        src: "pixel.mp4",
                        autoPlay: true,
                        loop: true,
                        muted: true,
                        playsInline: true
                    })
                )
            )
        )
    );
}

const ICONS = {
    carta: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
};

function Navbar({ current }) {
    return h("nav", { className: "navbar" },
        h("div", { className: "nav-links" },
            h("button", {
                className: "nav-link",
                "aria-current": current === "carta" ? "true" : "false",
                onClick: () => go("carta")
            },
                h("span", { dangerouslySetInnerHTML: { __html: ICONS.carta } }),
                h("span", null, "Carta da Juventude")
            )
        )
    );
}

function Count({ s }) {
    const [v, setV] = useState(0);
    useEffect(() => {
        let t0 = null, id;
        const f = t => {
            if (t0 === null) t0 = t;
            const p = Math.min((t - t0) / 900, 1);
            setV(Math.round(s.n * (1 - Math.pow(1 - p, 3))));
            if (p < 1) id = requestAnimationFrame(f);
        };
        id = requestAnimationFrame(f);
        return () => cancelAnimationFrame(id);
    }, [s.n]);
    return h("div", { className: "stat" },
        h("b", null, (s.p || "") + fmt(v) + (s.s || "")),
        h("span", null, s.l)
    );
}

function Home({ to }) {
    const r = useRef();
    useEffect(() => {
        if (to === "groups" && r.current) r.current.scrollIntoView();
    }, [to]);
    return h(React.Fragment, null,
        h("section", { className: "view earth-hero" },
            h("h1", null, "Oficina de Gestão Ambiental"),
            h(Qr),
            h("div", { style: { display: "flex", justifyContent: "center", marginTop: 10 } },
                h("button", { className: "hint", onClick: () => go("groups") }, "Desça a página e descubra qual é o seu tema ↓")
            )
        ),
        h("div", { ref: r, id: "grupos" }, h(Groups))
    );
}

function Groups() {
    return h("section", { className: "view" },
        h("div", { style: { marginBottom: 14 } },
            h("h1", { style: { color: "#fff" } }, "Qual é o seu", h("br"), "grupo?")
        ),
        h("p", { className: "lead" }, "Toque no seu grupo para abrir a notícia."),
        h("div", { className: "grid" },
            D.map(g => h("button", {
                key: g.n,
                className: "card",
                onClick: () => go("g" + g.n)
            },
                h("small", null, "Grupo"),
                h("div", { className: "n" }, g.n),
                h("div", { className: "t" }, g.tema)
            ))
        )
    );
}

function Orig({ g }) {
    return h("div", { className: "panel" },
        h("h3", { style: { marginBottom: 14, fontSize: "1.3rem", fontWeight: 700, color: "#1c1c1c" } }, g.titulo),
        ...g.txt.map((p, i) => h("p", { key: i, style: { marginBottom: "1em", fontSize: "1.05rem", lineHeight: "1.6", color: "#1c1c1c" } }, p)),
        h("p", { className: "src", style: { marginTop: 16 } }, "Fonte: " + g.fonte),
        h("a", { className: "btn", href: g.url, target: "_blank", rel: "noopener", style: { marginTop: 16, background: "#0b3d3a", color: "#fff", borderColor: "#0b3d3a" } }, "Abrir matéria original completa em nova aba ↗")
    );
}

function News({ g }) {
    const [tab, setTab] = useState("orig");
    const bar = useRef();

    useEffect(() => {
        let ticking = false;
        const f = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const d = document.documentElement;
                    const p = d.scrollTop / Math.max(1, d.scrollHeight - innerHeight);
                    if (bar.current) bar.current.style.width = Math.round(p * 100) + "%";
                    ticking = false;
                });
                ticking = true;
            }
        };
        f();
        addEventListener("scroll", f, { passive: true });
        return () => removeEventListener("scroll", f);
    }, []);

    const st = { "--c": g.c, "--t": g.t };
    const groupIds = D.map(item => item.n);
    const currentIndex = groupIds.indexOf(g.n);
    const nxtId = groupIds[(currentIndex + 1) % groupIds.length];

    return h("section", { className: "view", style: st },
        h("div", { className: "prog" }, h("i", { ref: bar })),
        h("div", { className: "head" },
            h("small", null, "Grupo " + g.n + " · " + g.tema),
            h("h1", null, g.titulo),
            h("div", { className: "meta" }, g.fonte)
        ),
        h("div", { className: "stats" }, g.stats.map((s, i) => h(Count, { s, key: g.n + "-" + i }))),
        h("div", { className: "tabs", role: "tablist" },
            [["orig", "Matéria completa"], ["resumo", "Resumo rápido"]].map(t =>
                h("button", {
                    key: t[0],
                    role: "tab",
                    className: "tab",
                    "aria-selected": tab === t[0],
                    onClick: () => setTab(t[0])
                }, t[1])
            )
        ),
        tab === "orig" ? h(Orig, { g, key: "o" }) :
            tab === "resumo" ? h("div", { className: "panel", key: "r" },
                ...g.txt.map((p, i) => h("p", { key: i }, p)),
                h("p", { className: "src" }, "Resumo escrito para a atividade com base na matéria original."),
                h("a", { className: "btn", style: { ...st, background: "#0b3d3a", color: "#fff" }, href: g.url, target: "_blank", rel: "noopener" }, "Ler na fonte original ↗")
            ) : null,
        h("div", { className: "row", style: { marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap" } },
            h("button", { className: "btn s", onClick: () => go("groups") }, "← Todos os grupos"),
            h("button", { className: "btn s", onClick: () => go("g" + nxtId) }, "Ver grupo " + nxtId + " →")
        )
    );
}

function Carta() {
    return h("div", { className: "carta-container view" },
        h("div", { className: "carta-header" },
            h("h1", { style: { fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "0.2em" } }, "CARTA DA JUVENTUDE")
        ),
        h("div", { className: "carta-instructions" },
            h("h3", null, "Como vai funcionar a atividade"),
            h("ol", null,
                h("li", null, h("strong", null, "1. Diagnóstico: "), "Apresenta a identificação e análise dos principais problemas, gargalos e vulnerabilidades socioambientais relacionados ao tema na região."),
                h("li", null, h("strong", null, "2. Propostas: "), "Indica as formulações coletivas de soluções, melhorias e ações práticas que devem ser aplicadas no território."),
                h("li", null, h("strong", null, "3. Demandas: "), "Consolida as reivindicações concretas e o posicionamento oficial defendido pelos jovens para garantir sustentabilidade e direitos.")
            )
        ),
        h("div", { className: "carta-postits" },
            h("div", { className: "postit-yellow" },
                h("div", { className: "postit-title" }, "1. Diagnóstico"),
                h("p", { className: "postit-text" }, "Identifique e analise os principais problemas, gargalos e vulnerabilidades socioambientais presentes na reportagem.")
            ),
            h("div", { className: "postit-green" },
                h("div", { className: "postit-title" }, "2. Propostas"),
                h("p", { className: "postit-text" }, "Defina coletivamente as soluções, melhorias e transformações práticas que devem ser aplicadas no território.")
            ),
            h("div", { className: "postit-blue" },
                h("div", { className: "postit-title" }, "3. Demandas"),
                h("p", { className: "postit-text" }, "Consolide as reivindicações concretas e o posicionamento defendido pelos jovens para o futuro sustentável.")
            )
        ),
        h("div", { style: { marginTop: 30, textAlign: "center" } },
            h("button", { className: "btn s", onClick: () => go("home") }, "← Voltar ao Início")
        )
    );
}

function App() {
    const v = useHash();
    const m = /^g(\d+)$/.exec(v);
    const groupNum = m ? +m[1] : null;
    const gObj = D.find(item => item.n === groupNum);
    const current = v === "carta" ? "carta" : "";

    return h(React.Fragment, null,
        h(Navbar, { current }),
        v === "carta" ? h(Carta) :
            gObj ? h(News, { g: gObj, key: v }) : h(Home, { to: v }),
        h(SecretSurprise)
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
