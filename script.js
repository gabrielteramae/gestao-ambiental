const h = React.createElement;
const { useState, useEffect, useRef } = React;

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const SITE_NAME = "Oficina de Gestão Ambiental";
const SITE_URL = "https://gabrielteramae.github.io/gestao-ambiental/#groups";

const formatNumber = n => n.toLocaleString("pt-BR");
const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const playVideo = el => {
    if (!el) return;
    el.muted = true;
    const attempt = el.play();
    if (attempt && attempt.catch) attempt.catch(() => { });
};

function useHash() {
    const read = () => (location.hash || "#home").slice(1);
    const [hash, setHash] = useState(read);

    useEffect(() => {
        const onChange = () => {
            const next = read();
            setHash(next);
            if (next !== "groups") window.scrollTo(0, 0);
        };
        addEventListener("hashchange", onChange);
        return () => removeEventListener("hashchange", onChange);
    }, []);

    return hash;
}

const go = route => { location.hash = route; };

const QR_ONLINE = "https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=" + encodeURIComponent(SITE_URL);

function Qr() {
    return h("div", { className: "qr" },
        h("img", {
            src: "qr.png",
            alt: "QR Code para abrir o site da oficina",
            width: 350,
            height: 350,
            decoding: "async",
            onError: e => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = QR_ONLINE;
            }
        }),
        h("b", null, "Aponte a câmera para acessar")
    );
}

function SecretSurprise() {
    const [isOpen, setIsOpen] = useState(false);
    const closeRef = useRef();

    useEffect(() => {
        if (!isOpen) return;
        const onKey = e => { if (e.key === "Escape") setIsOpen(false); };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        addEventListener("keydown", onKey);
        if (closeRef.current) closeRef.current.focus();
        return () => {
            removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    return h(React.Fragment, null,
        h("button", {
            className: "secret-emoji-btn",
            title: "Ei, volte para a atividade!",
            "aria-label": "Abrir surpresa",
            onClick: () => setIsOpen(true)
        },
            h("img", {
                src: "icone-play.png",
                alt: "",
                width: 42,
                height: 42,
                decoding: "async",
                onError: e => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = "https://i.imgur.com/8Qz469y.png";
                }
            })
        ),

        isOpen && h("div", { className: "modal-overlay", onClick: () => setIsOpen(false) },
            h("div", {
                className: "modal-content",
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "modal-title",
                onClick: e => e.stopPropagation()
            },
                h("button", {
                    className: "modal-close",
                    ref: closeRef,
                    "aria-label": "Fechar",
                    onClick: () => setIsOpen(false)
                }, "×"),
                h("div", { className: "modal-title", id: "modal-title" }, "Ei, volte para a atividade!"),
                h("div", { className: "modal-video-container" },
                    h("video", {
                        ref: playVideo,
                        src: "pixel.mp4",
                        autoPlay: true,
                        loop: true,
                        muted: true,
                        playsInline: true,
                        preload: "auto",
                        disablePictureInPicture: true,
                        "aria-hidden": "true"
                    })
                )
            )
        )
    );
}

const CARTA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';

function Navbar({ current }) {
    const item = (id, label, icon) => h("button", {
        type: "button",
        className: "nav-link" + (id === "votar" ? " nav-vote" : ""),
        "aria-current": current === id ? "page" : undefined,
        onClick: () => go(id)
    },
        icon ? h("span", { dangerouslySetInnerHTML: { __html: icon } }) : null,
        h("span", null, label)
    );

    return h("nav", { className: "navbar", "aria-label": "Principal" },
        h("div", { className: "nav-links" },
            item("carta", "Carta da Juventude", CARTA_ICON)
        )
    );
}

function Stat({ stat }) {
    const numberRef = useRef();
    const format = value => (stat.prefix || "") + (stat.raw ? String(value) : formatNumber(value)) + (stat.suffix || "");
    const finalText = format(stat.value);
    const animate = !stat.raw && !prefersReducedMotion();

    useEffect(() => {
        const el = numberRef.current;
        if (!animate || !el) return;
        let start = null, frame;
        const step = t => {
            if (start === null) start = t;
            const progress = Math.min((t - start) / 700, 1);
            el.textContent = format(Math.round(stat.value * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, []);

    return h("div", { className: "stat" },
        h("b", null,
            h("span", { ref: numberRef, "aria-hidden": "true" }, animate ? format(0) : finalText),
            h("span", { className: "sr-only" }, finalText)
        ),
        h("span", null, stat.label)
    );
}

function Groups() {
    return h("section", { className: "view" },
        h("h2", { className: "h1", style: { marginBottom: 14 } }, "Qual é o seu", h("br"), "grupo?"),
        h("p", { className: "lead" }, "Toque no seu grupo para abrir a notícia."),
        h("div", { className: "grid" },
            GROUPS.map(group => h("button", {
                key: group.number,
                className: "card",
                onClick: () => go("g" + group.number)
            },
                h("small", null, "Grupo"),
                h("div", { className: "n" }, group.number),
                h("div", { className: "t" }, group.theme)
            ))
        )
    );
}

function Home({ route }) {
    const groupsRef = useRef();

    useEffect(() => {
        if (route === "groups" && groupsRef.current) groupsRef.current.scrollIntoView();
    }, [route]);

    const showGroups = () => {
        if (route === "groups" && groupsRef.current) {
            groupsRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
            go("groups");
        }
    };

    return h(React.Fragment, null,
        h("section", { className: "view earth-hero" },
            h("h1", null, SITE_NAME),
            h("button", { type: "button", className: "btn vote-cta", onClick: () => go("votar") }, "Votar"),
            h(Qr),
            h("div", { style: { display: "flex", justifyContent: "center", marginTop: 10 } },
                h("button", { className: "hint", onClick: showGroups }, "Desça a página e descubra qual é o seu tema ↓")
            )
        ),
        h("div", { ref: groupsRef, id: "groups-section" }, h(Groups)),
        h(Footer)
    );
}

function ContextText({ group, tabId, labelId }) {
    return h("div", { className: "panel", role: "tabpanel", id: tabId, "aria-labelledby": labelId },
        h("h3", null, group.title),
        group.text.map((paragraph, i) => h("p", { key: i }, paragraph)),
        h("p", { className: "src" }, "Fonte: " + group.source + ". Texto adaptado para a atividade a partir da matéria original."),
        h("a", {
            className: "btn primary",
            href: group.url,
            target: "_blank",
            rel: "noopener noreferrer"
        }, "Abrir matéria original completa em nova aba ↗")
    );
}

function QuickSummary({ group, tabId, labelId }) {
    return h("div", { className: "panel", role: "tabpanel", id: tabId, "aria-labelledby": labelId },
        h("p", null, group.summary),
        h("p", { className: "src" }, "Resumo escrito para a atividade com base na matéria original."),
        h("a", {
            className: "btn primary",
            href: group.url,
            target: "_blank",
            rel: "noopener noreferrer"
        }, "Ler na fonte original ↗")
    );
}

const TABS = [
    { id: "context", label: "Contexto da notícia" },
    { id: "summary", label: "Resumo rápido" }
];

function News({ group }) {
    const [tab, setTab] = useState("context");
    const barRef = useRef();

    useEffect(() => {
        let ticking = false;
        const update = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const doc = document.documentElement;
                const scrolled = window.pageYOffset || doc.scrollTop;
                const progress = Math.min(1, Math.max(0, scrolled / Math.max(1, doc.scrollHeight - window.innerHeight)));
                if (barRef.current) barRef.current.style.transform = "scaleX(" + progress.toFixed(3) + ")";
                ticking = false;
            });
        };
        update();
        addEventListener("scroll", update, { passive: true });
        addEventListener("resize", update);
        return () => {
            removeEventListener("scroll", update);
            removeEventListener("resize", update);
        };
    }, []);

    const colorVars = { "--c": group.color, "--t": group.textColor };
    const index = GROUPS.findIndex(item => item.number === group.number);
    const nextNumber = GROUPS[(index + 1) % GROUPS.length].number;

    const tabId = id => "tab-" + id;
    const panelId = id => "panel-" + id;
    const Panel = tab === "context" ? ContextText : QuickSummary;

    return h("section", { className: "view", style: colorVars },
        h("div", { className: "prog", "aria-hidden": "true" }, h("i", { ref: barRef })),
        h("div", { className: "head" },
            h("small", null, "Grupo " + group.number + " · " + group.theme),
            h("h1", null, group.title),
            h("div", { className: "meta" }, group.source)
        ),
        h("div", { className: "stats" },
            group.stats.map((stat, i) => h(Stat, { stat, key: group.number + "-" + i }))
        ),
        h("div", { className: "tabs", role: "tablist", "aria-label": "Formato do texto" },
            TABS.map(t => h("button", {
                key: t.id,
                id: tabId(t.id),
                role: "tab",
                className: "tab",
                "aria-selected": tab === t.id,
                "aria-controls": panelId(t.id),
                onClick: () => setTab(t.id)
            }, t.label))
        ),
        h(Panel, { group, key: tab, tabId: panelId(tab), labelId: tabId(tab) }),
        h("div", { className: "row" },
            h("button", { className: "btn s", onClick: () => go("groups") }, "← Todos os grupos"),
            h("button", { className: "btn s", onClick: () => go("g" + nextNumber) }, "Ver grupo " + nextNumber + " →")
        )
    );
}

function Carta() {
    return h("div", { className: "carta-container view" },
        h("div", { className: "carta-header" },
            h("h1", null, "CARTA DA JUVENTUDE")
        ),
        h("div", { className: "carta-instructions" },
            h("h2", null, "Como vai funcionar a atividade"),
            h("ol", null,
                h("li", null, h("strong", null, "Diagnóstico: "), "Apresenta a identificação e análise dos principais problemas, gargalos e vulnerabilidades socioambientais relacionados ao tema na região."),
                h("li", null, h("strong", null, "Propostas: "), "Indica as formulações coletivas de soluções, melhorias e ações práticas que devem ser aplicadas no território."),
                h("li", null, h("strong", null, "Demandas: "), "Consolida as reivindicações concretas e o posicionamento oficial defendido pelos jovens para garantir sustentabilidade e direitos.")
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
        h("div", { className: "carta-back" },
            h("button", { className: "btn s", onClick: () => go("home") }, "← Voltar ao Início")
        )
    );
}

const VOTE_ROOT = "https://keyvalue.immanuel.co/api/KeyVal";

function encodeVotes(list) {
    const parts = (list || [])
        .filter(vote => vote && GROUPS_VOTE.indexOf(+vote.group) >= 0 && Array.isArray(vote.picks))
        .map(vote => {
            const picks = vote.picks.filter(item => DEMANDS.indexOf(item) >= 0).slice(0, 2);
            return picks.length ? (+vote.group) + "a" + picks.join("b") : "";
        })
        .filter(Boolean);
    return parts.length ? parts.join("_") : "0";
}

function decodeVotes(raw) {
    const text = String(raw == null ? "" : raw);
    if (!text || text === "0") return [];
    return text.split("_").map(part => {
        const bits = part.split("a");
        const group = +bits[0];
        const picks = String(bits[1] || "").split("b").map(Number).filter(item => DEMANDS.indexOf(item) >= 0).slice(0, 2);
        return GROUPS_VOTE.indexOf(group) >= 0 && picks.length === 2 ? { group: group, picks: picks } : null;
    }).filter(Boolean);
}

function readVotes() {
    return fetch(VOTE_ROOT + "/GetValue/gestaoambiental2026/urna").then(response => {
        if (response.status === 404) return [];
        if (!response.ok) throw new Error("load");
        return response.json();
    }).then(decodeVotes);
}

let clearedOnThisLoad = null;

function writeVotes(list) {
    const value = encodeVotes(list);
    return fetch(VOTE_ROOT + "/UpdateValue/gestaoambiental2026/urna/" + value, {
        method: "POST",
        body: ""
    }).then(response => {
        if (!response.ok) throw new Error("save");
    });
}

function clearStoredVotes() {
    if (!clearedOnThisLoad) {
        clearedOnThisLoad = writeVotes([]).then(() => []);
    }
    return clearedOnThisLoad;
}

function latestByGroup(list) {
    const map = {};
    (list || []).forEach(vote => {
        if (vote && vote.group != null) map[vote.group] = vote;
    });
    return map;
}

function saveVote(list, group, picks) {
    const next = (list || []).filter(vote => vote.group !== group);
    next.push({ group: group, picks: picks });
    return writeVotes(next);
}

const LOCK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-7-2a2 2 0 1 1 4 0v2h-4V7z"/></svg>';
const GROUPS_VOTE = [1, 2, 3, 4, 5, 7];
const DEMANDS = [1, 2, 3, 4, 5, 6];

function rankVotes(list) {
    const map = latestByGroup(list);
    const counts = {};
    DEMANDS.forEach(number => { counts[number] = 0; });
    Object.keys(map).forEach(key => {
        if (GROUPS_VOTE.indexOf(+key) < 0) return;
        (map[key].picks || []).forEach(number => {
            if (counts[number] != null) counts[number] += 1;
        });
    });
    return DEMANDS.map(number => ({ number: number, count: counts[number] }))
        .sort((a, b) => b.count - a.count || a.number - b.number);
}

function leadingDemands(ranked) {
    const withVotes = ranked.filter(item => item.count > 0);
    if (!withVotes.length) return [];
    const first = withVotes[0].count;
    const tiedFirst = withVotes.filter(item => item.count === first);
    if (tiedFirst.length >= 2) return tiedFirst;
    const second = withVotes[1] ? withVotes[1].count : 0;
    return withVotes.filter(item => item.count === first || item.count === second);
}

function Votacao() {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [voter, setVoter] = useState(null);
    const [picks, setPicks] = useState([]);
    const [saving, setSaving] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let live = true;
        clearStoredVotes()
            .then(data => { if (live) setVotes(data); })
            .catch(() => { if (live) setError("Não foi possível carregar a votação. Verifique a internet e tente de novo."); })
            .finally(() => { if (live) setLoading(false); });
        return () => { live = false; };
    }, []);

    const chooseGroup = number => {
        const previous = latestByGroup(votes)[number];
        setVoter(number);
        setDone(false);
        setPicks(previous && Array.isArray(previous.picks) ? previous.picks.filter(item => DEMANDS.indexOf(item) >= 0).slice(0, 2) : []);
    };

    const toggle = number => {
        setPicks(current => {
            if (current.indexOf(number) >= 0) return current.filter(item => item !== number);
            if (current.length >= 2) return current;
            return current.concat(number);
        });
    };

    const submit = () => {
        if (voter == null || picks.length !== 2 || saving) return;
        setSaving(true);
        setError("");
        const currentVotes = votes;
        saveVote(currentVotes, voter, picks)
            .then(() => readVotes())
            .then(data => {
                setVotes(data);
                setDone(true);
            })
            .catch(() => setError("Não foi possível registrar o voto. Tente de novo."))
            .finally(() => setSaving(false));
    };

    const existing = voter != null && latestByGroup(votes)[voter];

    return h("section", { className: "view vote" },
        h("h1", null, "Votação"),
        h("p", { className: "lead" }, "Sem limite de tempo. A votação fica aberta e o grupo pode trocar o voto quando quiser."),
        h("p", { className: "vote-alert", role: "note" },
            h("strong", null, "Atenção: "),
            "só uma pessoa do grupo deve votar."
        ),
        loading ? h("p", null, "Carregando…") : h(React.Fragment, null,
            h("h2", { className: "vote-h" }, "1. Qual é o seu grupo?"),
            h("div", { className: "slot-list", role: "group", "aria-label": "Seu grupo" },
                GROUPS_VOTE.reduce((rows, number) => {
                    rows.push(h("button", {
                        type: "button",
                        key: number,
                        className: "slot" + (voter === number ? " is-on" : ""),
                        "aria-pressed": voter === number,
                        "aria-label": "Grupo " + number,
                        onClick: () => chooseGroup(number)
                    },
                        h("span", { className: "slot-num" }, number),
                        h("span", { className: "slot-label" }, "Grupo " + number),
                        voter === number && h("span", { className: "slot-check", "aria-hidden": "true" }, "✓")
                    ));
                    if (number === 5) {
                        rows.push(h("div", { key: "lock", className: "slot is-locked" },
                            h("span", { className: "slot-num" }, "6"),
                            h("span", { className: "slot-label" }, "Não tem grupo 6. O 6 sou eu, e eu apresento."),
                            h("span", { className: "slot-lock", "aria-hidden": "true", dangerouslySetInnerHTML: { __html: LOCK_ICON } })
                        ));
                    }
                    return rows;
                }, [])
            ),
            voter != null && h("p", { className: "pick-banner", key: "grupo-" + voter, role: "status" },
                "Grupo ", h("b", null, voter), " selecionado"
            ),
            voter != null && h(React.Fragment, null,
                h("h2", { className: "vote-h" }, "2. Escolha 2 demandas da lousa"),
                h("div", { className: "slot-list" },
                    DEMANDS.map(number => {
                        const selected = picks.indexOf(number) >= 0;
                        return h("button", {
                            type: "button",
                            key: number,
                            className: "slot" + (selected ? " is-on" : ""),
                            "aria-pressed": selected,
                            "aria-label": "Demanda " + number,
                            disabled: !selected && picks.length >= 2,
                            onClick: () => toggle(number)
                        },
                            h("span", { className: "slot-num" }, number),
                            h("span", { className: "slot-label" }, "Demanda " + number),
                            selected && h("span", { className: "slot-check", "aria-hidden": "true" }, "✓")
                        );
                    })
                ),
                h("p", {
                    className: "pick-banner" + (picks.length === 2 ? " is-ready" : ""),
                    key: "demanda-" + picks.join("-"),
                    role: "status"
                },
                    picks.length === 0 ? "Toque em 2 números da lousa." :
                        picks.length === 1 ? ["Demanda ", h("b", null, picks[0]), " selecionada. Falta 1."] :
                            ["Demandas ", h("b", null, picks[0]), " e ", h("b", null, picks[1]), " selecionadas."]
                ),
                existing && h("p", { className: "vote-note" }, "Este grupo já enviou um voto. Enviar de novo só troca a escolha."),
                h("div", { className: "row" },
                    h("button", {
                        type: "button",
                        className: "btn",
                        disabled: picks.length !== 2 || saving,
                        onClick: submit
                    }, saving ? "Enviando…" : "Enviar voto"),
                    h("button", { type: "button", className: "btn s", onClick: () => go("resultado") }, "Ver resultado")
                ),
                done && h("p", { className: "vote-ok", role: "status" }, "Voto do grupo " + voter + " registrado.")
            ),
            error && h("p", { className: "vote-err", role: "alert" }, error)
        )
    );
}

function Resultado() {
    const [votes, setVotes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let live = true;
        const pull = first => (first ? clearStoredVotes().then(() => readVotes()) : readVotes())
            .then(data => {
                if (!live) return;
                setVotes(data);
                setError("");
                setLoading(false);
            })
            .catch(() => {
                if (live) {
                    setError("Não foi possível atualizar o resultado.");
                    setLoading(false);
                }
            });
        pull(true);
        const timer = setInterval(() => pull(false), 5000);
        return () => {
            live = false;
            clearInterval(timer);
        };
    }, []);

    const ranked = rankVotes(votes);
    const leaders = leadingDemands(ranked);
    const max = ranked.reduce((highest, item) => Math.max(highest, item.count), 0);
    const votedGroups = GROUPS_VOTE.filter(number => latestByGroup(votes)[number]);

    return h("section", { className: "view" },
        h("h1", null, "Resultado"),
        h("p", { className: "lead" },
            loading ? "Carregando…" : votedGroups.length + " de 6 grupos votaram. A tela atualiza sozinha."
        ),
        !loading && !leaders.length && h("p", null, "Ainda não há votos."),
        leaders.length > 0 && h(React.Fragment, null,
            h("h2", { className: "vote-h" }, leaders.length > 2 ? "Mais votadas, com empate" : "As 2 mais votadas"),
            h("div", { className: "slot-list winners" },
                leaders.map(item => h("article", {
                    key: item.number,
                    className: "slot is-on winner-slot",
                },
                    h("span", { className: "slot-num" }, item.number),
                    h("span", { className: "slot-meta" }, item.count + (item.count === 1 ? " voto" : " votos"))
                ))
            )
        ),
        h("h2", { className: "vote-h" }, "Contagem"),
        h("div", { className: "rank-list" },
            ranked.map(item => h("div", {
                key: item.number,
                className: "rank-row"
            },
                h("div", { className: "rank-label" },
                    h("span", null, "Demanda " + item.number),
                    h("b", null, String(item.count))
                ),
                h("div", { className: "bar", "aria-hidden": "true" },
                    h("i", { style: { width: (max ? Math.round(item.count / max * 100) : 0) + "%" } })
                )
            ))
        ),
        error && h("p", { className: "vote-err", role: "alert" }, error),
        h("div", { className: "row" },
            h("button", { type: "button", className: "btn s", onClick: () => go("votar") }, "← Voltar à votação")
        )
    );
}

function Footer() {
    return h("footer", { className: "site-footer" },
        "© 2026 Gabriel Teramae. Todos os direitos reservados."
    );
}

function App() {
    const route = useHash();
    const firstRender = useRef(true);
    const match = /^g(\d+)$/.exec(route);
    const group = match ? GROUPS.find(item => item.number === +match[1]) : null;

    useEffect(() => {
        document.title = group
            ? `Grupo ${group.number} · ${SITE_NAME}`
            : route === "carta"
                ? `Carta da Juventude · ${SITE_NAME}`
                : route === "votar"
                    ? `Votação · ${SITE_NAME}`
                    : route === "resultado"
                        ? `Resultado · ${SITE_NAME}`
                        : SITE_NAME;
    }, [route, group]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        const main = document.getElementById("main");
        if (main) main.focus({ preventScroll: true });
    }, [route]);

    return h(React.Fragment, null,
        h(Navbar, { current: route === "resultado" ? "votar" : route }),
        h("main", { id: "main", tabIndex: -1 },
            route === "carta" ? h(Carta) :
                route === "votar" ? h(Votacao) :
                    route === "resultado" ? h(Resultado) :
                        group ? h(News, { group, key: route }) :
                            h(Home, { route })
        ),
        h(SecretSurprise)
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
