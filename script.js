const h = React.createElement;
const { useState, useEffect, useRef } = React;

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const SITE_NAME = "Oficina de Gestão Ambiental";
const SITE_URL = "https://gabrielteramae.github.io/gestao-ambiental/#groups";
const CARTA_KEY = "oga-carta-v1";
const CARTA_GROUP_KEY = "oga-carta-grupo";

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

const readStore = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
};

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
    return h("nav", { className: "navbar", "aria-label": "Principal" },
        h("div", { className: "nav-links" },
            h("button", {
                className: "nav-link",
                "aria-current": current === "carta" ? "page" : undefined,
                onClick: () => go("carta")
            },
                h("span", { dangerouslySetInnerHTML: { __html: CARTA_ICON } }),
                h("span", null, "Carta da Juventude")
            )
        )
    );
}

function Stat({ stat }) {
    const numberRef = useRef();
    const textual = stat.text != null;
    const format = value => (stat.prefix || "") + (stat.raw ? String(value) : formatNumber(value)) + (stat.suffix || "");
    const finalText = textual ? stat.text : format(stat.value);
    const animate = !textual && !stat.raw && !prefersReducedMotion();

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
    }, [animate, stat.value]);

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
            GROUPS.map((group, i) => h("button", {
                key: group.number,
                className: "card",
                style: {
                    "--c": group.color,
                    "--t": group.textColor,
                    animationDelay: (i * 70) + "ms"
                },
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
            groupsRef.current.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
        } else {
            go("groups");
        }
    };

    return h(React.Fragment, null,
        h("section", { className: "view earth-hero" },
            h("h1", null, SITE_NAME),
            h(Qr),
            h("div", { style: { display: "flex", justifyContent: "center", marginTop: 10 } },
                h("button", { className: "hint", onClick: showGroups }, "Desça a página e descubra qual é o seu tema ↓")
            )
        ),
        h("div", { ref: groupsRef, id: "groups-section" }, h(Groups))
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
    const next = GROUPS[(index + 1) % GROUPS.length];

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
            h("button", { className: "btn s", onClick: () => go("g" + next.number) }, "Grupo " + next.number + " · " + next.theme + " →")
        )
    );
}

const CARTA_FIELDS = [
    {
        key: "diagnostico",
        title: "1. Diagnóstico",
        hint: "Problemas, gargalos e vulnerabilidades da reportagem.",
        className: "postit-yellow"
    },
    {
        key: "propostas",
        title: "2. Propostas",
        hint: "Soluções e ações práticas para o território.",
        className: "postit-green"
    },
    {
        key: "demandas",
        title: "3. Demandas",
        hint: "O que os jovens reivindicam daqui pra frente.",
        className: "postit-blue"
    }
];

const blankDraft = () => ({ diagnostico: "", propostas: "", demandas: "" });

function Carta() {
    const [groupNumber, setGroupNumber] = useState(() => {
        try {
            const saved = +localStorage.getItem(CARTA_GROUP_KEY);
            return GROUPS.some(group => group.number === saved) ? saved : GROUPS[0].number;
        } catch (e) {
            return GROUPS[0].number;
        }
    });
    const [drafts, setDrafts] = useState(() => readStore(CARTA_KEY, {}));
    const [notice, setNotice] = useState("");
    const timer = useRef();
    const group = GROUPS.find(item => item.number === groupNumber);
    const draft = drafts[groupNumber] || blankDraft();

    useEffect(() => {
        try { localStorage.setItem(CARTA_GROUP_KEY, String(groupNumber)); } catch (e) {}
    }, [groupNumber]);

    useEffect(() => {
        try { localStorage.setItem(CARTA_KEY, JSON.stringify(drafts)); } catch (e) {}
    }, [drafts]);

    useEffect(() => () => clearTimeout(timer.current), []);

    const flash = message => {
        setNotice(message);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setNotice(""), 2200);
    };

    const update = (field, value) => {
        setDrafts(prev => {
            const current = prev[groupNumber] || blankDraft();
            return { ...prev, [groupNumber]: { ...current, [field]: value } };
        });
    };

    const copyCarta = async () => {
        const body = [
            "Carta da Juventude — Grupo " + group.number + " · " + group.theme,
            "",
            "1. Diagnóstico",
            draft.diagnostico.trim() || "(em branco)",
            "",
            "2. Propostas",
            draft.propostas.trim() || "(em branco)",
            "",
            "3. Demandas",
            draft.demandas.trim() || "(em branco)"
        ].join("\n");
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(body);
            } else {
                const area = document.createElement("textarea");
                area.value = body;
                area.setAttribute("readonly", "");
                area.style.position = "fixed";
                area.style.left = "-9999px";
                document.body.appendChild(area);
                area.select();
                const ok = document.execCommand("copy");
                area.remove();
                if (!ok) throw new Error("copy");
            }
            flash("Carta copiada.");
        } catch (e) {
            flash("Não foi possível copiar. Selecione o texto e copie manualmente.");
        }
    };

    const clearDraft = () => {
        const hasText = CARTA_FIELDS.some(field => (draft[field.key] || "").trim());
        if (!hasText) return;
        if (!window.confirm("Apagar o rascunho do grupo " + group.number + " neste celular?")) return;
        setDrafts(prev => ({ ...prev, [groupNumber]: blankDraft() }));
        flash("Rascunho apagado.");
    };

    return h("div", { className: "carta-container view" },
        h("div", { className: "carta-header" },
            h("h1", null, "CARTA DA JUVENTUDE")
        ),
        h("div", { className: "carta-instructions" },
            h("h2", null, "Como vai funcionar a atividade"),
            h("ol", null,
                h("li", null, h("strong", null, "Diagnóstico: "), "o que a reportagem mostra de problema, gargalo e vulnerabilidade no território."),
                h("li", null, h("strong", null, "Propostas: "), "o que o grupo faria, na prática, para mudar esse quadro."),
                h("li", null, h("strong", null, "Demandas: "), "o que os jovens cobram de quem decide, por escrito.")
            )
        ),
        h("p", { className: "carta-picked" }, "Escrevendo pelo grupo " + group.number + " · " + group.theme),
        h("div", { className: "chips", role: "group", "aria-label": "Escolher grupo" },
            GROUPS.map(item => h("button", {
                key: item.number,
                type: "button",
                className: "chip",
                style: { background: item.color, color: item.textColor },
                "aria-pressed": item.number === groupNumber,
                "aria-label": "Grupo " + item.number + ", " + item.theme,
                onClick: () => setGroupNumber(item.number)
            }, String(item.number)))
        ),
        h("div", { className: "carta-postits", key: groupNumber },
            CARTA_FIELDS.map(field => h("div", { key: field.key, className: field.className },
                h("label", { className: "postit-title", htmlFor: "carta-" + field.key }, field.title),
                h("p", { className: "carta-hint" }, field.hint),
                h("textarea", {
                    id: "carta-" + field.key,
                    className: "carta-field",
                    value: draft[field.key],
                    placeholder: "Escrevam aqui…",
                    rows: 5,
                    onChange: e => update(field.key, e.target.value)
                })
            ))
        ),
        h("p", { className: "carta-status" + (notice ? " is-flash" : ""), role: "status" },
            notice || "O rascunho fica salvo só neste celular. Não sincroniza com o grupo."
        ),
        h("div", { className: "carta-actions" },
            h("button", { type: "button", className: "btn", onClick: copyCarta }, "Copiar carta"),
            h("button", { type: "button", className: "btn s", onClick: clearDraft }, "Apagar rascunho")
        ),
        h("div", { className: "carta-back" },
            h("button", { className: "btn s", onClick: () => go("home") }, "← Voltar ao Início")
        )
    );
}

function App() {
    const route = useHash();
    const firstRender = useRef(true);
    const match = /^g(\d+)$/.exec(route);
    const group = match ? GROUPS.find(item => item.number === +match[1]) : null;

    useEffect(() => {
        document.title = group
            ? "Grupo " + group.number + " · " + SITE_NAME
            : route === "carta"
                ? "Carta da Juventude · " + SITE_NAME
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
        h(Navbar, { current: route === "carta" ? "carta" : "" }),
        h("main", { id: "main", tabIndex: -1 },
            route === "carta" ? h(Carta) :
                group ? h(News, { group, key: route }) :
                    h(Home, { route })
        ),
        h(SecretSurprise)
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
