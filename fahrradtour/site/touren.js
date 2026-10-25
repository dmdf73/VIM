// Gemeinsame Daten und Darstellung für alle Seiten von „Radtouren ab Darmstadt“.
(function () {
  "use strict";

  const KG = 85; // Körpergewicht für die Kalorienschätzung

  // pts: [Name, lat, lon, km ab Start, Höhe m, Beschreibung]; line: nur für die Übersichtskarte
  const TOURS = [
    { slug: "rhein", page: "rhein.html", c: "--r1", name: "Rheintour nach Mainz", short: "Rhein & Mainz", tag: "Streckentour · Bahn zurück", hilly: false, hm: 15, km: 49.7,
      lead: "Durchs flache Ried an den Rhein bei Kornsand und auf Damm und Uferwegen bis Mainz. Mit Kühkopf-Abstecher und Variante weiter bis Frankfurt.",
      line: [[49.8725,8.6295],[49.8635,8.5615],[49.8555,8.4985],[49.8360,8.4880],[49.8345,8.4615],[49.8530,8.4270],[49.8650,8.3900],[49.8770,8.3640],
        [49.9230,8.3580],[49.9660,8.3180],[49.9925,8.3000],[49.9985,8.3110],[50.0040,8.3000],[50.0060,8.2840],[50.0040,8.2780],[50.0010,8.2590]] },
    { slug: "frankfurt", page: "frankfurt.html", c: "--r7", name: "Radschnellweg nach Frankfurt", short: "Frankfurt", tag: "Streckentour · Bahn zurück", hilly: false, hm: 40, km: 33.5,
      lead: "Auf dem Radschnellweg FRM 1 bis Langen, dann durch Dreieich, Neu-Isenburg und den Stadtwald an den Main.",
      line: [[49.8725,8.6295],[49.8857,8.6545],[49.9300,8.6475],[49.9520,8.6460],[49.9670,8.6590],[49.9935,8.6600],[50.0230,8.6630],[50.0530,8.6650],
        [50.0830,8.6700],[50.0990,8.6860],[50.1080,8.6830],[50.1070,8.6630]] },
    { slug: "bergstrasse", page: "tour-bergstrasse.html", c: "--r6", name: "Bergstraße bis Heppenheim", short: "Bergstraße", tag: "Streckentour · Bahn zurück", hilly: false, hm: 150,
      lead: "Auf der ausgeschilderten Radroute „Die Bergstraße“ am Fuß des Odenwalds nach Süden. Von Ort zu Ort durch Obstwiesen und Weinberge, drei hübsche Altstädte, im Frühjahr Mandel- und Obstblüte.",
      ret: "Von Heppenheim fahren Regionalzüge über Bensheim und Zwingenberg zurück nach Darmstadt, etwa 20 bis 30 Minuten. Heppenheim gehört zum Verkehrsverbund VRN, die Regeln zur Fahrradmitnahme vorher prüfen.",
      pts: [["Darmstadt, Luisenplatz", 49.8726, 8.6506, 0, 145, "Start der ausgeschilderten Radroute am Langen Ludwig. Vom Hauptbahnhof sind es gut 2 km bis hierher."],
            ["Eberstadt", 49.8170, 8.6430, 7.4, 125, "Durch Bessungen und Eberstadt nach Süden, ab hier am Hangfuß des Odenwalds."],
            ["Seeheim", 49.7680, 8.6500, 13.0, 145, "Kleiner Ortskern, ringsum Obstwiesen am Hang."],
            ["Jugenheim", 49.7520, 8.6400, 15.5, 150, "Oberhalb liegt Schloss Heiligenberg. Leichte Wellen zwischen Hang und Ebene."],
            ["Zwingenberg", 49.7230, 8.6110, 21.0, 110, "Älteste Stadt an der Bergstraße mit engen Altstadtgassen. Bahnhof, falls ihr abkürzen wollt."],
            ["Auerbach", 49.7000, 8.6230, 25.0, 120, "Über dem Ort die Ruine Auerbacher Schloss, im Ort der Staatspark Fürstenlager."],
            ["Bensheim", 49.6810, 8.6230, 28.0, 115, "Größte Stadt der Strecke, Fachwerk rund um den Marktplatz. Auch Fernzüge halten hier."],
            ["Heppenheim, Marktplatz", 49.6420, 8.6390, 36.5, 110, "Fachwerk-Marktplatz mit Eiscafés, oben auf dem Berg die Starkenburg."],
            ["Heppenheim Bf", 49.6400, 8.6290, 37.5, 100, "Ziel. Mit dem Zug zurück nach Darmstadt."]],
      high: ["Altstadt von Zwingenberg", "Blick hoch zum Melibokus und zum Auerbacher Schloss", "Marktplatz Heppenheim mit der Starkenburg darüber", "Abkürzen: in Zwingenberg oder Bensheim in den Zug steigen"],
      bike: ["Ausgeschilderte Radroute „Die Bergstraße“, meist verkehrsarme Wege und Wirtschaftswege", "Leicht wellig am Hangfuß, keine langen Anstiege", "In den Ortsdurchfahrten etwas Verkehr"] },
    { slug: "frankenstein", page: "tour-frankenstein.html", c: "--r2", name: "Burg Frankenstein", short: "Frankenstein", tag: "Rundtour · Bergtour", hilly: true, hm: 300,
      lead: "Die sportliche Tour: von Eberstadt den Frankenstein hinauf zur Burg mit Blick über die Rheinebene, dann ins Modautal hinunter und über Mühltal zurück nach Darmstadt.",
      ret: "Rundtour, Ziel ist wieder der Hauptbahnhof. Zum Abkürzen liegt der Bahnhof Mühltal an der Odenwaldbahn direkt am Weg.",
      pts: [["Darmstadt Hbf", 49.8725, 8.6295, 0, 145, "Start, durch die Stadt nach Südosten."],
            ["Bessungen", 49.8600, 8.6550, 2.8, 160, "Ruhige Wohnstraßen, dann Richtung Eberstadt."],
            ["Eberstadt", 49.8170, 8.6430, 8.6, 125, "Hier beginnt der Anstieg. Der Start am Ortsrand ist wenig schön, danach wird es ruhig."],
            ["Burg Frankenstein", 49.7935, 8.6680, 14.1, 370, "Höchster Punkt. Burgruine mit Restaurant und Weitblick über die Rheinebene."],
            ["Nieder-Beerbach", 49.7860, 8.6840, 16.5, 200, "Abfahrt nach Osten, im oberen Teil auf Schlaglöcher achten."],
            ["Nieder-Ramstadt", 49.8280, 8.6870, 21.5, 180, "Durchs Modautal nach Norden, Ortsteil von Mühltal."],
            ["Böllenfalltor", 49.8580, 8.6720, 25.5, 170, "Am Stadion vorbei zurück in die Stadt."],
            ["Darmstadt Hbf", 49.8725, 8.6295, 29.5, 145, "Ziel."]],
      high: ["Burg Frankenstein mit Aussicht über die Rheinebene", "Burgrestaurant mit Terrasse", "Schwungvolle Abfahrt ins Modautal"],
      bike: ["Anstieg zur Burg asphaltiert: rund 2,8 km mit knapp 8 % im Schnitt, Spitzen um 12 %", "Wenig Autoverkehr, oben ein paar Schlaglöcher, bei der Abfahrt aufpassen", "Für Untrainierte mit E-Bike deutlich angenehmer"] },
    { slug: "messel", page: "tour-messel.html", c: "--r3", name: "Grube Messel & Kranichstein", short: "Grube Messel", tag: "Rundtour · Wald", hilly: false, hm: 100,
      lead: "Durch den Herrngarten und den Kranichsteiner Wald zum Jagdschloss, weiter zur Grube Messel, dem UNESCO-Welterbe mit den berühmten Urpferdchen, und über Messel und Arheilgen zurück.",
      ret: "Rundtour, Ziel ist wieder der Hauptbahnhof. Zum Abkürzen fahren vom Bahnhof Messel Züge nach Darmstadt.",
      pts: [["Darmstadt Hbf", 49.8725, 8.6295, 0, 145, "Start, quer durch die Innenstadt nach Nordosten."],
            ["Herrngarten", 49.8770, 8.6550, 2.3, 150, "Größter Park der Innenstadt."],
            ["Jagdschloss Kranichstein", 49.9040, 8.6920, 7.1, 160, "Barockes Jagdschloss am Backhausteich, mitten im Wald."],
            ["Grube Messel", 49.9170, 8.7540, 12.7, 200, "UNESCO-Welterbe. Besucherzentrum mit Ausstellung und Aussichtsplattform; in die Grube selbst nur mit Führung."],
            ["Messel", 49.9380, 8.7440, 15.6, 165, "Kleiner Ort mit Fossilien- und Heimatmuseum."],
            ["Arheilgen", 49.9120, 8.6550, 24.0, 140, "Durch Wald und Felder zurück nach Westen, dann durch Arheilgen."],
            ["Darmstadt Hbf", 49.8725, 8.6295, 29.7, 145, "Ziel."]],
      high: ["Besucherzentrum Grube Messel mit Aussichtsplattform auf dem Dach", "Jagdschloss Kranichstein und Backhausteich", "Viel Schatten im Wald, gut für heiße Tage"],
      bike: ["Überwiegend Waldwege und Radwege, teils fester Schotter", "Fast eben, ein paar sanfte Wellen im Wald", "Für die Anreise zur Grube wird das Fahrrad ausdrücklich empfohlen, Parkplätze sind knapp"] },
    { slug: "lorsch", page: "tour-lorsch.html", c: "--r4", name: "Durchs Ried zum Kloster Lorsch", short: "Kloster Lorsch", tag: "Streckentour · Bahn zurück", hilly: false, hm: 20,
      lead: "Flach nach Süden durch Pfungstadt und die Felder des Rieds zum Kloster Lorsch, einem weiteren UNESCO-Welterbe, mit der karolingischen Königshalle.",
      ret: "Von Lorsch mit der Bahn nach Bensheim und dort umsteigen nach Darmstadt, zusammen etwa 40 bis 50 Minuten. Lorsch gehört zum VRN, die Regeln zur Fahrradmitnahme vorher prüfen. Oder die rund 6 km nach Bensheim radeln und dort direkt in den Zug steigen.",
      pts: [["Darmstadt Hbf", 49.8725, 8.6295, 0, 145, "Start, nach Süden aus der Stadt."],
            ["Pfungstadt", 49.8060, 8.6030, 9.2, 105, "Kurz durch den Ort, danach offene Felder."],
            ["Hähnlein", 49.7590, 8.5710, 16.0, 95, "Feldwege durchs Ried, Spargel- und Gemüseanbau."],
            ["Schwanheim", 49.6930, 8.5670, 24.8, 92, "Kleiner Ortsteil von Bensheim, weiter auf ruhigen Wegen nach Süden."],
            ["Kloster Lorsch", 49.6535, 8.5695, 30.1, 95, "UNESCO-Welterbe mit karolingischer Königshalle, Museumszentrum und Kräutergarten."],
            ["Lorsch Bf", 49.6530, 8.5640, 30.6, 95, "Ziel. Mit der Bahn über Bensheim zurück."]],
      high: ["Königshalle und Klosterareal Lorsch", "Kräutergarten nach dem Lorscher Arzneibuch", "Spargel- und Gemüsefelder im Frühsommer"],
      bike: ["Völlig flach, meist asphaltierte Feldwege abseits der Hauptstraßen", "Teilweise auf der ausgeschilderten Familien-Radroute des Landkreises", "Offenes Gelände, bei Wind anstrengender als gedacht"] },
    { slug: "parks", page: "tour-parks.html", c: "--r5", name: "Darmstädter Parks & Ludwigshöhe", short: "Parks & Ludwigshöhe", tag: "Rundtour · Feierabend", hilly: true, hm: 120,
      lead: "Kurze Runde für den Feierabend: Herrngarten, Mathildenhöhe mit Hochzeitsturm, Rosenhöhe, durch den Wald zum Oberwaldhaus am Steinbrücker Teich, hinauf zur Ludwigshöhe und über den Prinz-Emil-Garten zurück.",
      ret: "Rundtour mitten in Darmstadt, Ziel ist wieder der Hauptbahnhof. Jeder Punkt liegt nah an Straßenbahn oder Bus.",
      pts: [["Darmstadt Hbf", 49.8725, 8.6295, 0, 145, "Start."],
            ["Herrngarten", 49.8770, 8.6550, 2.3, 150, "Englischer Landschaftsgarten mitten in der Stadt."],
            ["Mathildenhöhe", 49.8765, 8.6680, 3.4, 180, "Jugendstil-Künstlerkolonie mit Hochzeitsturm, UNESCO-Welterbe. Kurzer Anstieg."],
            ["Rosenhöhe", 49.8730, 8.6820, 4.7, 175, "Park mit Rosengarten, ruhig und grün."],
            ["Oberwaldhaus", 49.8570, 8.7090, 7.8, 170, "Am Steinbrücker Teich, mit Biergarten."],
            ["Ludwigshöhe", 49.8360, 8.6720, 12.1, 240, "Höchster Punkt mit Ludwigsturm und Blick über die Stadt."],
            ["Prinz-Emil-Garten", 49.8560, 8.6500, 15.4, 155, "Kleiner Park mit Schlösschen in Bessungen."],
            ["Darmstadt Hbf", 49.8725, 8.6295, 18.2, 145, "Ziel."]],
      high: ["Mathildenhöhe mit Hochzeitsturm", "Biergarten am Oberwaldhaus", "Ludwigsturm mit Blick über die Stadt"],
      bike: ["Im Wald breite, befestigte Forstwege", "Kurzer, kräftiger Anstieg zur Ludwigshöhe", "In der Innenstadt Radwege und Tempo-30-Straßen"] },
  ];

  const RHINE = [[49.765,8.470],[49.785,8.430],[49.800,8.385],[49.830,8.366],[49.856,8.362],[49.877,8.356],[49.900,8.352],[49.925,8.345],
    [49.950,8.325],[49.970,8.305],[49.985,8.293],[49.995,8.287],[50.004,8.275],[50.020,8.258],[50.035,8.245],[50.045,8.215]];
  const ALTRHEIN = [[49.790,8.410],[49.800,8.448],[49.815,8.466],[49.834,8.466],[49.848,8.445],[49.858,8.405],[49.862,8.372]];
  const MAIN = [[49.995,8.290],[49.997,8.310],[50.001,8.330],[49.996,8.353],[49.999,8.395],[50.009,8.430],[50.031,8.474],[50.062,8.491],
    [50.068,8.515],[50.096,8.543],[50.093,8.605],[50.098,8.645],[50.101,8.662],[50.107,8.683],[50.104,8.720],[50.103,8.760],[50.112,8.800]];
  const TOWNS = [["Griesheim",49.8635,8.5615,"end"],["Weiterstadt",49.904,8.588,"end"],["Dieburg",49.900,8.840,"end"],["Roßdorf",49.860,8.762,"start"],
    ["Ober-Ramstadt",49.831,8.749,"start"],["Pfungstadt",49.806,8.603,"end"],["Bickenbach",49.757,8.611,"end"],["Lindenfels",49.684,8.781,"end"],
    ["Biblis",49.690,8.455,"start"],["Groß-Gerau",49.921,8.482,"start"],["Langen",49.9935,8.660,"start"],["Rüsselsheim",49.985,8.413,"start"],
    ["Mainz",49.993,8.262,"end"],["Frankfurt",50.112,8.682,"start"],["Erzhausen",49.952,8.646,"end"],["Seeheim",49.768,8.650,"start"]];
  const REGIONS = [["Odenwald",49.745,8.700],["Hess. Ried",49.765,8.430],["Rheinhessen",49.880,8.250],["Stadtwald",50.070,8.700]];

  // Hilfsfunktionen
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const fmt = (n) => n.toFixed(1).replace(".", ",");
  const tourKm = (t) => t.km != null ? t.km : t.pts[t.pts.length - 1][3];
  const hours = (t) => tourKm(t) / (t.hilly ? 14 : 16);
  const kcal = (t) => Math.round(((t.hilly ? 8.0 : 6.8) * KG * hours(t)) / 50) * 50;
  const kcalText = (t) => "≈ " + kcal(t).toLocaleString("de-DE") + " kcal";
  const hhmm = (h) => { const m = Math.round(h * 60); return Math.floor(m / 60) + ":" + String(m % 60).padStart(2, "0") + " h"; };
  const lineOf = (t) => t.line || t.pts.map((p) => [p[1], p[2]]);
  const isLoop = (t) => t.pts && t.pts[0][1] === t.pts[t.pts.length - 1][1] && t.pts[0][2] === t.pts[t.pts.length - 1][2];
  const ll = (p) => p[1] + "," + p[2];
  const google = (pts) => "https://www.google.com/maps/dir/?api=1&travelmode=bicycling&origin=" + ll(pts[0]) + "&destination=" + ll(pts[pts.length - 1]) + "&waypoints=" + encodeURIComponent(pts.slice(1, -1).map(ll).join("|"));
  const apple = (a, b) => "https://maps.apple.com/directions?source=" + ll(a) + "&destination=" + ll(b) + "&mode=cycling";
  const brouter = (pts) => "https://brouter.de/brouter-web/#map=12/" + pts[0][1] + "/" + pts[0][2] + "/standard&lonlats=" + pts.map((p) => p[2] + "," + p[1]).join(";") + "&profile=trekking";
  const dot = (t, i) => `<span class="dot" style="background:var(${t.c})">${i + 1}</span>`;
  const KCAL_NOTE = `Kalorien grob geschätzt für ${KG} kg: flache Touren mit 16 km/h und MET 6,8, hügelige mit 14 km/h und MET 8,0, jeweils × ${KG} kg × Fahrzeit. Wind, Gepäck und Tempo ändern das deutlich; mit E-Bike etwa die Hälfte.`;

  // Schematische Karte: passt alle Linien in die Fläche, zeichnet Flüsse, Orte und Maßstab
  function makeMap(svg, lines, opts) {
    const o = Object.assign({ W: 560, Hmin: 360, Hmax: 640, pad: 0.12, skip: [] }, opts);
    const all = lines.flat();
    let la0 = Math.min(...all.map((p) => p[0])), la1 = Math.max(...all.map((p) => p[0]));
    let lo0 = Math.min(...all.map((p) => p[1])), lo1 = Math.max(...all.map((p) => p[1]));
    const R = 0.92 / Math.cos(50 * Math.PI / 180); // Breitengrade gestreckt
    const latSpan0 = Math.max(la1 - la0, 0.02) * (1 + 2 * o.pad), lonSpan0 = Math.max(lo1 - lo0, 0.03) * (1 + 2 * o.pad);
    const W = o.W, H = Math.round(Math.min(o.Hmax, Math.max(o.Hmin, (W * latSpan0 * R) / lonSpan0)));
    const k = Math.min(W / lonSpan0, H / (latSpan0 * R));
    const top = (la0 + la1) / 2 + H / (R * k) / 2, left = (lo0 + lo1) / 2 - W / k / 2;
    const px = (la, lo) => [+((lo - left) * k).toFixed(1), +((top - la) * k * R).toFixed(1)];
    const path = (pts) => "M" + pts.map((p) => px(p[0], p[1]).join(",")).join(" L");
    const inside = (la, lo, a) => { const [x, y] = px(la, lo); return x > (a === "end" ? 80 : 10) && x < W - (a === "end" ? 40 : 100) && y > 14 && y < H - 40; };
    svg.replaceChildren();
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    el("rect", { x: 0, y: 0, width: W, height: H, rx: 4, fill: "var(--land)" }, svg);
    REGIONS.forEach(([n, la, lo]) => { if (inside(la, lo, "region") && px(la, lo)[0] < W - 130) { const [x, y] = px(la, lo); el("text", { x, y, class: "m-region" }, svg).textContent = n; } });
    el("path", { d: path(ALTRHEIN.concat([[49.830,8.366],[49.800,8.385]])) + "Z", fill: "var(--water-soft)", opacity: 0.35 }, svg);
    [[MAIN, 5], [ALTRHEIN, 3], [RHINE, 9]].forEach(([pts, w]) => el("path", { d: path(pts), fill: "none", stroke: "var(--water)", "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" }, svg));
    TOWNS.forEach(([n, la, lo, a]) => {
      if (!inside(la, lo, a) || o.skip.some((p) => Math.abs(p[0] - la) < 0.01 && Math.abs(p[1] - lo) < 0.015)) return;
      const [x, y] = px(la, lo);
      el("circle", { cx: x, cy: y, r: 2.5, fill: "var(--town)" }, svg);
      el("text", { x: x + (a === "end" ? -6 : 6), y: y + 4, class: "m-label", "text-anchor": a }, svg).textContent = n;
    });
    // Maßstab mit runder Länge und Nordpfeil
    const pxPerKm = k / (111.32 * Math.cos(((la0 + la1) / 2) * Math.PI / 180));
    const len = [1, 2, 5, 10, 20].find((n) => n * pxPerKm >= 50) || 20;
    const sx = W - 24 - len * pxPerKm, sy = H - 20;
    el("path", { d: `M${sx},${sy} h${len * pxPerKm} M${sx},${sy - 4} v8 M${sx + len * pxPerKm},${sy - 4} v8`, stroke: "var(--fg)", "stroke-width": 1.5, fill: "none" }, svg);
    el("text", { x: sx + (len * pxPerKm) / 2, y: sy - 8, class: "m-label", "text-anchor": "middle" }, svg).textContent = len + " km";
    el("path", { d: `M${W - 24},${H - 82} l-7,16 l7,-4 l7,4 z`, fill: "var(--fg)" }, svg);
    el("text", { x: W - 24, y: H - 52, class: "m-label", "text-anchor": "middle" }, svg).textContent = "N";
    return { px, path, W, H };
  }

  function drawLine(g, m, pts, color, width) {
    const d = m.path(pts);
    el("path", { d, fill: "none", stroke: "var(--surface)", "stroke-width": width + 4, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.85 }, g);
    el("path", { d, fill: "none", stroke: color, "stroke-width": width, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
  }

  function nav(current) {
    const host = document.getElementById("siteNav");
    if (!host) return;
    host.className = "site-nav";
    host.setAttribute("aria-label", "Alle Touren");
    host.innerHTML = `<a class="home" href="index.html"${current === "index" ? ' aria-current="page"' : ""}>← Radtouren ab Darmstadt</a><div class="chips">` +
      TOURS.map((t, i) => `<a class="chip" style="--c:var(${t.c})" href="${t.page}"${t.slug === current ? ' aria-current="page"' : ""}><span class="dot">${i + 1}</span>${t.short}</a>`).join("") + "</div>";
  }

  // Startseite: Übersichtskarte, Vergleichstabelle und Kurzporträts
  function overview() {
    nav("index");
    const svg = document.getElementById("ov");
    const m = makeMap(svg, TOURS.map(lineOf), { W: 560, Hmax: 760, pad: 0.03 });
    const groups = TOURS.map((t, i) => {
      const a = el("a", { href: t.page, class: "rt", "aria-label": t.name }, svg);
      drawLine(a, m, lineOf(t), `var(${t.c})`, 3.5);
      const line = lineOf(t), mid = line[Math.floor(line.length * 0.6)];
      const [x, y] = m.px(mid[0], mid[1]);
      el("circle", { cx: x, cy: y, r: 10, fill: `var(${t.c})`, stroke: "var(--surface)", "stroke-width": 2 }, a);
      el("text", { x, y, fill: "var(--surface)", "font-family": "var(--f-mono)", "font-size": 11, "text-anchor": "middle", "dominant-baseline": "central" }, a).textContent = i + 1;
      return a;
    });
    const [dx, dy] = m.px(49.8725, 8.6295);
    el("rect", { x: dx - 6, y: dy - 6, width: 12, height: 12, fill: "var(--fg)" }, svg);
    el("text", { x: dx - 10, y: dy + 4, "text-anchor": "end", fill: "var(--fg)", "font-weight": 700, "font-size": 13 }, svg).textContent = "Darmstadt";
    const focus = (i) => { svg.classList.toggle("focus", i != null); groups.forEach((g, j) => g.classList.toggle("on", j === i)); };

    const tbody = document.querySelector("#cmp tbody");
    TOURS.forEach((t, i) => {
      const tr = document.createElement("tr");
      tr.className = "row";
      tr.innerHTML = `<td><a href="${t.page}">${dot(t, i)}<span class="rname">${t.name}</span></a><br><span class="tag">${t.tag}</span></td>` +
        `<td class="num">${fmt(tourKm(t))}</td><td class="num">${t.hm}</td><td class="num">${hhmm(hours(t))}</td><td class="num">${kcalText(t).replace(" kcal", "")}</td>`;
      tr.addEventListener("mouseenter", () => focus(i));
      tr.addEventListener("mouseleave", () => focus(null));
      tr.addEventListener("focusin", () => focus(i));
      tr.addEventListener("focusout", () => focus(null));
      tr.addEventListener("click", (e) => { if (!e.target.closest("a")) location.href = t.page; });
      tbody.appendChild(tr);
    });
    document.getElementById("kcalNote").textContent = KCAL_NOTE;

    const grid = document.getElementById("cards");
    TOURS.forEach((t, i) => {
      const c = document.createElement("article");
      c.className = "tcard";
      c.style.setProperty("--c", `var(${t.c})`);
      c.innerHTML = `<h3>${dot(t, i)}${t.name}</h3><span class="tag">${t.tag}</span>` +
        `<div class="rfacts"><span><b>≈ ${fmt(tourKm(t))} km</b></span><span>↑ <b>${t.hm} Hm</b></span><span><b>${kcalText(t)}</b></span></div>` +
        `<p>${t.lead}</p><a class="go" href="${t.page}">Zur Tour →</a>`;
      grid.appendChild(c);
    });
  }

  // Tourseite: alles aus den Daten der Tour
  function detail(slug) {
    const i = TOURS.findIndex((t) => t.slug === slug), t = TOURS[i];
    const app = document.getElementById("app");
    app.style.setProperty("--route", `var(${t.c})`);
    app.style.setProperty("--route-soft", `color-mix(in srgb, var(${t.c}) 20%, transparent)`);
    const loop = isLoop(t), start = t.pts[0], end = t.pts[t.pts.length - 1];
    const ups = t.pts.slice(1).reduce((s, p, j) => s + Math.max(0, p[4] - t.pts[j][4]), 0);
    const downs = t.pts.slice(1).reduce((s, p, j) => s + Math.max(0, t.pts[j][4] - p[4]), 0);
    app.innerHTML = `
      <nav id="siteNav"></nav>
      <header>
        <div class="eyebrow">Tour ${i + 1} · ${t.tag}</div>
        <h1>${t.name}</h1>
        <p>${t.lead}</p>
        <div class="sign"><span>${loop ? "Rundtour ab " + start[0] : end[0].replace(" Bf", "")}</span><span class="km">${fmt(tourKm(t))} km</span></div>
      </header>
      <section class="facts" aria-label="Eckdaten">
        <div class="fact"><small>Strecke</small><b>≈ ${fmt(tourKm(t))} km</b></div>
        <div class="fact"><small>Fahrzeit bei ${t.hilly ? 14 : 16} km/h</small><b>≈ ${hhmm(hours(t))}</b></div>
        <div class="fact kcal"><small>Kalorien bei ${KG} kg</small><b>${kcalText(t)}</b></div>
        <div class="fact"><small>Höhenmeter</small><b>↑ ${t.hm}</b></div>
        <div class="fact"><small>Typ</small><b style="font-size:1rem;font-family:var(--f-display)">${t.tag.split(" · ")[0]}</b></div>
      </section>
      <section class="card nav">
        <h2>Auf echter Karte öffnen</h2>
        <div class="links">
          <a class="btn primary" target="_blank" rel="noopener" href="${brouter(t.pts)}">OpenStreetMap (BRouter)</a>
          <a class="btn" target="_blank" rel="noopener" href="${google(t.pts)}">Google Maps</a>
          ${loop ? "" : `<a class="btn" target="_blank" rel="noopener" href="${apple(start, end)}">Apple Karten</a>`}
        </div>
        <p class="note">BRouter rechnet auf OpenStreetMap mit allen Wegpunkten und kann die Strecke als GPX exportieren, etwa für Komoot oder ein Radnavi. Google Maps übernimmt auf dem Handy nur wenige Zwischenstopps. ${loop ? "Apple Karten plant keine Rundtouren mit Zwischenzielen." : "Apple Karten plant nur von Start zu Ziel, der Weg kann dort abweichen."}</p>
      </section>
      <section class="main">
        <div class="map-box">
          <svg id="map" role="img" aria-label="Schematische Karte der Tour ${t.name}"></svg>
          <p class="note">Schematische Karte, Lage der Orte vereinfacht. Den genauen Weg zeigen die Links oben.</p>
        </div>
        <div class="card" style="padding: 8px 8px 4px;">
          <h2 style="padding: 8px 8px 0;">Etappen</h2>
          <ol class="stops" id="stops"></ol>
        </div>
      </section>
      <section class="card profile">
        <h2>Höhenprofil</h2>
        <svg id="profile" role="img" aria-label="Grobes Höhenprofil der Tour"></svg>
        <p class="note">Grobe Höhen an den Etappenpunkten (Summe ↑ ${ups} m, ↓ ${downs} m). Kleine Wellen dazwischen sind nicht erfasst, deshalb ist die Angabe oben etwas höher.</p>
      </section>
      <section class="grid2">
        <div class="card info"><h2>Unterwegs</h2><ul>${t.high.map((h) => `<li>${h}</li>`).join("")}</ul></div>
        <div class="card info"><h2>Ist die Strecke radtauglich?</h2><ul>${t.bike.map((h) => `<li>${h}</li>`).join("")}</ul></div>
        <div class="card info" style="grid-column: 1 / -1;"><h2>Praktisches</h2><ul>
          <li><b>${loop ? "Rückweg" : "Rückfahrt"}:</b> ${t.ret}</li>
          <li><b>Kalorien:</b> ${KCAL_NOTE}</li>
          <li><b>Hinweis:</b> Kilometer und Höhenmeter sind Schätzungen. Vor der Fahrt die Route einmal in BRouter oder Komoot ansehen.</li>
        </ul></div>
      </section>`;
    nav(slug);

    // Karte mit Markern
    const svg = document.getElementById("map");
    const line = lineOf(t);
    const m = makeMap(svg, [line], { skip: line });
    drawLine(svg, m, line, "var(--route)", 4);
    const list = document.getElementById("stops");
    const markers = [];
    t.pts.forEach((p, j) => {
      const again = loop && j === t.pts.length - 1;
      const label = again ? 1 : j + 1;
      let g;
      if (again) g = markers[0].g;
      else {
        const [x, y] = m.px(p[1], p[2]);
        g = el("g", { class: "marker" }, svg);
        el("circle", { cx: x, cy: y, r: 10 }, g);
        el("text", { x, y }, g).textContent = label;
        el("title", {}, g).textContent = p[0];
        if (j === 0 || j === t.pts.length - 1) el("text", { x: x + 14, y: y + 4, fill: "var(--fg)", "font-weight": 600, "font-size": 12 }, svg).textContent = loop ? p[0] : p[0];
      }
      const li = document.createElement("li");
      li.className = "stop";
      li.tabIndex = 0;
      li.innerHTML = `<span class="n">${label}</span><h3>${p[0]}</h3><span class="km">${fmt(p[3])} km</span><p>${p[5]}</p>`;
      list.appendChild(li);
      markers.push({ g, li });
      const activate = () => markers.forEach((mk) => { mk.g.classList.toggle("active", mk.g === g); mk.li.classList.toggle("active", mk.li === li); });
      li.addEventListener("click", activate);
      li.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } });
      if (!again) g.addEventListener("click", () => { activate(); li.scrollIntoView({ block: "nearest", behavior: "smooth" }); });
    });

    // Höhenprofil
    const prof = document.getElementById("profile");
    const PW = 720, PH = 190, L = 44, Rm = 28, T = 24, B = 30;
    const eles = t.pts.map((p) => p[4]);
    const step = Math.max(...eles) - Math.min(...eles) > 150 ? 50 : 20;
    const eMin = Math.floor((Math.min(...eles) - 10) / step) * step, eMax = Math.ceil((Math.max(...eles) + 10) / step) * step;
    const maxKm = Math.ceil(tourKm(t) / 5) * 5;
    prof.setAttribute("viewBox", `0 0 ${PW} ${PH}`);
    const xk = (km) => L + (km / maxKm) * (PW - L - Rm), ye = (e) => T + (1 - (e - eMin) / (eMax - eMin)) * (PH - T - B);
    for (let e = eMin; e <= eMax; e += step) {
      el("line", { x1: L, x2: PW - Rm, y1: ye(e), y2: ye(e), stroke: "var(--line)", "stroke-width": 1 }, prof);
      el("text", { x: L - 6, y: ye(e) + 4, class: "m-label", "text-anchor": "end" }, prof).textContent = e + " m";
    }
    const kStep = maxKm > 25 ? 5 : 2.5;
    for (let km = 0; km <= maxKm; km += kStep) el("text", { x: xk(km), y: PH - 10, class: "m-label", "text-anchor": "middle" }, prof).textContent = String(km).replace(".", ",") + " km";
    const pts = t.pts.map((p) => [xk(p[3]), ye(p[4])]);
    const d = "M" + pts.map((p) => p.join(",")).join(" L");
    el("path", { d: d + ` L${xk(tourKm(t))},${ye(eMin)} L${xk(0)},${ye(eMin)} Z`, fill: "var(--route-soft)" }, prof);
    el("path", { d, fill: "none", stroke: "var(--route)", "stroke-width": 2.5, "stroke-linejoin": "round" }, prof);
    pts.forEach((p, j) => el("circle", { cx: p[0], cy: p[1], r: j === 0 || j === pts.length - 1 ? 4 : 2.5, fill: "var(--route)" }, prof));
    const top = t.pts.reduce((a, b) => (b[4] > a[4] ? b : a));
    el("text", { x: xk(top[3]), y: ye(top[4]) - 8, class: "m-label", "text-anchor": "middle" }, prof).textContent = top[0] + " · " + top[4] + " m";
  }

  window.Touren = { nav, overview, detail };
})();
