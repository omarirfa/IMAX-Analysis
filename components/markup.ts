// Markup ported verbatim from the original IMAX data study.
// Injected as HTML so the imperative chart/nav code (which finds elements
// by id) works unchanged. No React conversion needed.

export const MARKUP = `<a class="skip-link" href="#s1">Skip to the charts</a>
<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

<!-- desktop scroll-spy side-rail (populated by JS) -->
<nav class="rail" id="rail" aria-label="Section navigation"></nav>

<!-- back to top -->
<button class="to-top" id="toTop" aria-label="Back to top" title="Back to top">&#8593;</button>

<header class="hero">
  <div class="aperture" id="aperture" aria-hidden="true"></div>
  <div class="eyebrow">1994 — 2026 · a data study</div>
  <h1>The giant screen,<br><span class="thin">measured.</span></h1>
  <p class="lede">This is a study of every film released in IMAX from 1994 to 2026. The dataset has <b>1,406 films</b>. It runs from small museum documentaries to the largest blockbusters ever made. The charts below show what got made, how it was filmed, and what made films succeed.</p>
</header>

<div class="wrap">

  <!-- mobile / narrow-viewport section jumper -->
  <div class="mobile-jump">
    <label for="jumpSelect" class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Jump to section</label>
    <select id="jumpSelect" aria-label="Jump to section"></select>
  </div>

  <div class="dataset-intro">
    <div class="di-title">What is this dataset?</div>
    <div class="di-grid">
      <div class="di-item">
        <div class="di-h">The films</div>
        <p>Every movie shown in an IMAX cinema, from Wikipedia's IMAX release lists. This includes giant hits like <b>Avatar</b>, <b>Oppenheimer</b> and the <b>Avengers</b> films. It also includes small science-museum documentaries and films released only in China. In total: 1,406 films across 33 years.</p>
      </div>
      <div class="di-item">
        <div class="di-h">The money</div>
        <p>Box-office grosses come from Box Office Mojo. <b>900 films</b> have a verified worldwide gross. Figures split into domestic (US and Canada) and international. All money is in US dollars, not adjusted for inflation.</p>
      </div>
      <div class="di-item">
        <div class="di-h">The hardware</div>
        <p>The count of IMAX screens worldwide comes from IMAX's own filings with the US Securities and Exchange Commission (SEC). This gives a screen count for most years from 2001 to 2026.</p>
      </div>
      <div class="di-item">
        <div class="di-h">How to use it</div>
        <p>Read top to bottom, or jump to any section. Each chart has a short "how to read this" note. Every IMAX term is defined in the glossary below. Hover over any point or bar to see the exact number.</p>
      </div>
    </div>
  </div>

  <div class="metrics">
    <div class="metric"><div class="k">films tracked</div><div class="v">1,406</div><div class="d">across 33 release years</div></div>
    <div class="metric"><div class="k">peak year</div><div class="v">2025</div><div class="d up">113 films — an all-time high</div></div>
    <div class="metric"><div class="k">network 2001 → 2026</div><div class="v">8.5×</div><div class="d up">225 → 1,865 systems</div></div>
    <div class="metric"><div class="k">IMAX + Dolby premium</div><div class="v">3×</div><div class="d up">$372M vs $125M IMAX-only</div></div>
  </div>

  <!-- section index / jump menu -->
  <nav class="index" id="sectionIndex" aria-label="Contents">
    <div class="index-head">
      <span class="ih-t">The study, in fifteen sections</span>
      <span class="ih-n">jump to any part &middot; or read straight through</span>
    </div>
    <div class="index-grid" id="indexGrid"></div>
  </nav>

  <div class="primer">
    <p class="primer-lead">Before the charts, the vocabulary. Every film here is "IMAX," but that word covers a <b>four-rung ladder</b> — from a movie physically <b>shot on 70mm IMAX film</b> down to an ordinary film <b>digitally upscaled</b> to fill the screen. The rung a film sits on shapes almost everything that follows, so it's worth two minutes up front. Ordered by how much real IMAX picture you actually get:</p>
    <div class="ladder" id="primerLadder"></div>

    <div class="glossary">
      <details class="gloss">
        <summary>Full glossary — every IMAX term used on this page, defined <span class="hint">tap to expand</span></summary>
        <dl class="gloss-grid" id="glossGrid"></dl>
      </details>
    </div>
  </div>

  <!-- ============ ACT I · ORIENTATION ============ -->
  <div class="act-divider" id="act-I" data-act="I">
    <span class="act-roman">I</span>
    <div class="act-text">
      <h2 class="act-title">Orientation</h2>
      <p class="act-blurb">What we're looking at, and where it came from.</p>
    </div>
  </div>

  <section id="sExplain" data-act="I">
    <div class="sec-head"><span class="sec-num">01</span><h2>What counts as "IMAX," really</h2></div>
    <p class="sec-sub">"IMAX" on a poster can mean four very different things — and the difference is the single biggest driver of everything that follows. It ranges from a film physically <b>shot on 70mm IMAX cameras</b> down to an ordinary film <b>digitally upscaled</b> to fill a big screen. Here's the ladder, with each tier's real median worldwide gross.</p>

    <div class="tiers" id="tierCards"></div>

    <div class="finding">
      <span class="tag">the core distinction</span>
      <b>DMR is not a different camera — it's a different screen.</b> A DMR film was shot conventionally, then remastered and upscaled so it looks acceptable blown up to six storeys. The image is the same shape and resolution the director captured. A <b>shot-on-IMAX</b> film carries a negative physically larger than the projected picture, and <b>opens the frame taller</b> (to 1.43:1) so you literally see more of the scene. That extra picture — not just bigger — is what people are paying the premium for.
    </div>

    <div class="panel" style="margin-top:18px">
      <div style="font-size:14px;color:var(--ink);margin-bottom:4px;font-weight:500">The "more picture" part, drawn to scale</div>
      <p class="cap" style="margin-top:0;margin-bottom:14px">Standard cinema is 2.39:1 — wide and short (dashed guide). IMAX 70mm opens the frame <b>vertically</b>: you don't get a wider image, you get a taller one. This is why an IMAX shot feels immersive rather than just large.</p>
      <div class="ar-wrap" id="arWrap"></div>
    </div>

    <div class="panel" style="margin-top:18px">
      <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">How much of each film is <em>actually</em> in full IMAX</div>
      <p class="cap" style="margin:0 0 6px">Only ~20 films in history were shot on real IMAX film cameras — and even those switch to the tall 1.43:1 frame for only part of their runtime. This is the <b>exact fraction</b> in full-frame IMAX, per film, from Letterboxd's format archive. Hover for the gross.</p>
      <div class="chart-box xtall"><canvas id="cImmersion" role="img" aria-label="Horizontal bar chart ranking films by the percentage of their runtime shot in full 1.43:1 IMAX, from The Odyssey at 100 percent down through Oppenheimer at 22 percent."></canvas></div>
      <p class="cap"><b>Read:</b> <b>Dunkirk</b> (75%) and Nolan's films lead; <b>Oppenheimer</b> is only 22% full-frame despite its reputation. "Shot in IMAX" almost never means the whole film — it means the director chose specific sequences to open up. The Odyssey (2026) is set to be the first-ever film shot <em>entirely</em> on IMAX film.</p>
    </div>

    <div class="note">
      <b>How these tiers are derived:</b> the <span class="src">imax_65mm_minutes</span> and <span class="src">imax_expanded_minutes</span> columns tell us how a film was actually captured — minutes shot on real IMAX film vs minutes that merely open to a taller digital ratio. A film with 65mm-minutes &gt; 0 (Dunkirk, Interstellar, Oppenheimer) is genuinely shot-on-IMAX; one with only expanded-minutes (Aquaman, Eternals) is certified-digital; everything else is DMR. The per-film 1.43:1 fractions above come from Letterboxd's format notes (<span class="src">letterboxd_imax_notes.csv</span>).
    </div>

    <div class="finding">
      <span class="tag">a null finding worth stating</span>
      Intuition says more IMAX footage should mean a bigger film. It doesn't. Across the 54 films with a measured IMAX-minutes value, the correlation between minutes-shot-in-IMAX and worldwide gross is <b>0.02 — essentially zero</b>. How much of a film is in the tall frame is an artistic choice, not a commercial one. Oppenheimer (22% full-frame) out-grossed Dunkirk (75%); the format decision and the box office are independent.
    </div>
  </section>

  <section id="s1" data-act="I">
    <div class="sec-head"><span class="sec-num">02</span><h2>The DMR pivot</h2></div>
    <p class="sec-sub">For its first decade IMAX was purely <b>IMAX 70mm</b> — films shot on 15-perf 70mm for science museums. Then in 2002 <b>DMR</b> (<abbr title="Digital Media Remastering: IMAX's process for converting a film not shot on IMAX cameras into an IMAX-compatible format — upscaling and sharpening it to fill a giant screen">Digital Media Remastering</abbr>) let any Hollywood release be blown up to giant-screen. Watch the composition of the catalogue invert. <span style="color:var(--ink-3)">New to these terms? The glossary above defines every one.</span></p>

    <div class="controls">
      <span class="ctl-label">view</span>
      <div class="seg" id="s1seg" role="group" aria-label="Section 1 view">
        <button data-v="stack" data-mode="1" aria-pressed="true">composition</button>
        <button data-v="total" data-mode="1" aria-pressed="false">total volume</button>
        <button data-v="share" data-mode="1" aria-pressed="false">IMAX 70mm share %</button>
        <button data-v="net" aria-pressed="false" title="overlay EDGAR installed-systems count">+ network line</button>
      </div>
    </div>

    <div class="panel">
      <div class="legend" id="s1legend">
        <span><i style="background:var(--native)"></i>IMAX 70mm</span>
        <span><i style="background:var(--certified)"></i>Filmed for IMAX</span>
        <span><i style="background:var(--dmr)"></i>IMAX DMR</span>
      </div>
      <div class="chart-box tall"><canvas id="c1" role="img" aria-label="Stacked area of IMAX films per year 1994-2026 by capture type, showing IMAX 70mm originals dominating early then IMAX DMR conversions taking over after 2002."></canvas></div>
      <p class="cap"><b>Read:</b> IMAX 70mm originals (amber) carry the format until ~2004, then flatten near zero. IMAX DMR conversions (gray) go from 0 to ~90 films a year. Toggle <b>+ network line</b> to add the IMAX screen count from SEC filings. It uses the right axis, on a different scale. The screen build-out and the DMR film flood rise together.</p>
    </div>

    <div class="finding">
      <span class="tag">what the data says</span>
      In <b>2002</b> there were <b>225</b> IMAX systems worldwide and IMAX 70mm originals still outnumbered DMR conversions 16 to 6. By <b>2026</b> the network is <b>1,865</b> systems and the slate is almost entirely DMR. The screen build-out and the shift to conversions are the same story: a bigger network needs a constant supply of wide-release titles, which only DMR can provide.
    </div>
  </section>

  <!-- ============ ACT II · WHAT HAPPENED ============ -->
  <div class="act-divider" id="act-II" data-act="II">
    <span class="act-roman">II</span>
    <div class="act-text">
      <h2 class="act-title">What happened</h2>
      <p class="act-blurb">The history: formats, the network build-out, and where screens landed.</p>
    </div>
  </div>

  <section id="s2" data-act="II">
    <div class="sec-head"><span class="sec-num">03</span><h2>Which premium format won</h2></div>
    <p class="sec-sub">IMAX is one of several <b>PLF</b> (<abbr title="Premium Large Format: branded big-screen, big-sound cinemas that charge extra for a ticket">premium large format</abbr>) brands. A film can play in more than one at the same time. Each format does something different. The table explains what. The chart then shows how their popularity changed over time.</p>

    <div class="format-table">
      <div class="ft-row ft-head">
        <div>Format</div><div>What it changes</div><div>How it works</div>
      </div>
      <div class="ft-row">
        <div class="ft-name" style="border-color:var(--native)">3D</div>
        <div>Adds depth to the image.</div>
        <div>Two overlaid images and special glasses make the picture appear to have depth. Some films are shot in 3D; most are converted afterward.</div>
      </div>
      <div class="ft-row">
        <div class="ft-name" style="border-color:var(--certified)">IMAX with Laser</div>
        <div>A brighter, sharper image.</div>
        <div>Laser projectors replace older xenon lamps. They give a brighter picture and better contrast. The top "GT" version is the only digital system that shows the full, tall 1.43:1 frame.</div>
      </div>
      <div class="ft-row">
        <div class="ft-name" style="border-color:#7b9be0">ScreenX</div>
        <div>A wider field of view.</div>
        <div>The picture extends onto the left and right side walls for a 270-degree image. Made by the Korean company CJ 4DPLEX. It does not make the image taller, only wider.</div>
      </div>
      <div class="ft-row">
        <div class="ft-name" style="border-color:var(--film65)">4DX</div>
        <div>Adds physical effects.</div>
        <div>Seats move. Wind, water, scent and light effects match the action. Also from CJ 4DPLEX. It changes the seat, not the screen.</div>
      </div>
      <div class="ft-row">
        <div class="ft-name" style="border-color:#9b6cd6">Dolby Cinema</div>
        <div>Better contrast and sound.</div>
        <div>IMAX's main rival, from Dolby. It uses Dolby Vision (very high contrast, over 1,000,000:1) and Dolby Atmos sound. It competes on picture quality and audio, not on a taller screen.</div>
      </div>
    </div>

    <div class="controls">
      <span class="ctl-label">series</span>
      <div class="seg" id="s2seg" role="group" aria-label="Toggle format lines">
        <button data-k="3d" aria-pressed="true">3D</button>
        <button data-k="laser" aria-pressed="true">laser</button>
        <button data-k="screenx" aria-pressed="true">ScreenX</button>
        <button data-k="fourdx" aria-pressed="true">4DX</button>
      </div>
    </div>

    <div class="panel">
      <div class="legend"><span><i style="background:var(--native)"></i>3D</span><span><i style="background:var(--certified)"></i>laser</span><span><i style="background:#7b9be0"></i>ScreenX</span><span><i style="background:var(--film65)"></i>4DX</span></div>
      <div class="chart-box"><canvas id="c2" role="img" aria-label="Line chart of the share of each year's IMAX slate released in 3D, laser, ScreenX and 4DX formats, 2005-2026. Y axis is percent of slate, X axis is year."></canvas></div>
      <p class="cap"><b>Read:</b> 3D (amber) peaks around 2016 at ~70% of the slate, then falls to the teens — the post-Avatar 3D bubble deflating in real data. 4DX and ScreenX climb as the newer premium tiers. <span style="color:var(--ink-3)">Toggle series above; Y = % of that year's films, X = year.</span></p>
    </div>

    <div class="finding">
      <span class="tag">what the data says</span>
      3D isn't a steady feature of IMAX — it's a <b>wave</b>. It crests in the mid-2010s and recedes. Meanwhile laser projection stays a thin premium sliver (10–18%), and 4DX/ScreenX pick up the "extra-format" role 3D vacated.
    </div>
  </section>

  <section id="sStructure" data-act="II">
    <div class="sec-head"><span class="sec-num">04</span><h2>The maturing network</h2></div>
    <p class="sec-sub">Two structural signals from the SEC filings that reveal a business shifting from novelty to saturation — and from museums to multiplexes.</p>

    <div class="grid-2">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Gross per screen is falling</div>
        <p class="cap" style="margin:0 0 14px">Median film's worldwide gross divided by the number of IMAX screens live that year. A saturation signal.</p>
        <div class="chart-box"><canvas id="cEff" role="img" aria-label="Line chart of median gross per screen, peaking around 2010 then declining steeply toward 2025."></canvas></div>
        <p class="cap"><b>Read:</b> per-screen productivity peaked around <b>2010</b> then fell steeply. As the network exploded 8× and absorbed a long tail of smaller releases, each screen carries less median gross. Growth in <em>screens</em> outran growth in <em>hits</em>.</p>
      </div>
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Museums squeezed out by multiplexes</div>
        <p class="cap" style="margin:0 0 14px">Institutional (science-centre / museum) screens as a share of the total IMAX network, from the filings' 4-part breakdown.</p>
        <div class="chart-box"><canvas id="cInst" role="img" aria-label="Line chart of institutional screen share declining from 5.8 percent in 2018 to 3.1 percent in 2026."></canvas></div>
        <p class="cap"><b>Read:</b> IMAX's origin was the museum dome, but institutional screens fell from <b>5.8%</b> of the network (2018) to <b>3.1%</b> (2026) as commercial multiplexes multiplied. The science-centre roots are being diluted — the same shift the DMR pivot showed in the film slate, now visible in the hardware.</p>
      </div>
    </div>
  </section>

  <section id="sGeo" data-act="II">
    <div class="sec-head"><span class="sec-num">05</span><h2>Where the screens actually are</h2></div>
    <p class="sec-sub">The slate is only half the business — the other half is <b>hardware on the ground</b>. Mapping the venue registries (<span class="src">imax_venues_worldwide.csv</span>, <span class="src">dolby_venues_worldwide.csv</span>) shows where IMAX built, where its premium-format rival Dolby Cinema went head-to-head, and how few screens can actually show the format at full height.</p>

    <div class="panel">
      <div class="map-head">
        <div>
          <div style="font-size:14px;color:var(--ink);font-weight:500">The global footprint</div>
          <p class="cap" style="margin:2px 0 0">Every catalogued screen, placed on the map. The story is concentration — a few countries carry most of the network.</p>
        </div>
        <div class="map-toggles">
          <div class="seg" id="mapNet" role="tablist">
            <button role="tab" aria-pressed="true" data-net="imax">IMAX</button>
            <button role="tab" aria-pressed="false" data-net="dolby">Dolby</button>
          </div>
          <div class="seg" id="mapView" role="tablist">
            <button role="tab" aria-pressed="true" data-view="choro">Shaded</button>
            <button role="tab" aria-pressed="false" data-view="bubble">Bubbles</button>
          </div>
        </div>
      </div>
      <div class="map-wrap">
        <svg id="worldMap" viewBox="0 0 1000 500" role="img" aria-label="World map of IMAX and Dolby premium-format screens by country. IMAX is concentrated in the United States, China, Japan and Canada, with a long tail of smaller markets across Europe, Asia and the Americas.">
          <g id="mapCountries"></g>
          <g id="mapBubbles"></g>
        </svg>
        <div class="map-legend" id="mapLegend"></div>
      </div>
      <p class="cap" style="margin-top:12px"><b>Read:</b> the network is strikingly top-heavy. The <b>United States (181)</b>, <b>China (69)</b>, <b>Japan (29)</b> and <b>Canada (28)</b> hold most of the catalogued IMAX venues, trailing off into a long tail of single-screen countries. Dolby's footprint is smaller and even more US-weighted. <span style="color:var(--ink-3)">Bubbles are placed at country centroids, not exact venues — city coordinates are not in the venue data, so this shows national totals, not street locations. The over-time shift toward China and international, described in IMAX's filings, is not chartable at country level from this snapshot.</span></p>
    </div>

    <div class="grid-2" style="margin-top:18px">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">IMAX vs Dolby Cinema, by country</div>
        <p class="cap" style="margin:0 0 14px">Installed venues per country. The two premium formats fight hardest in the same handful of markets.</p>
        <div class="legend">
          <span><i style="background:var(--beam)"></i>IMAX venues</span>
          <span><i style="background:var(--certified)"></i>Dolby Cinema screens</span>
        </div>
        <div class="chart-box tall"><canvas id="cGeoH2H" role="img" aria-label="Grouped horizontal bars comparing IMAX and Dolby Cinema venue counts across the top twelve countries, led by the United States where the two are almost tied."></canvas></div>
        <p class="cap"><b>Read:</b> in the <b>United States</b> the two are near-parity (181 IMAX vs 178 Dolby) — the rivalry is fiercest in IMAX's home market. IMAX leads decisively in <b>China, Canada and Japan</b>; Dolby only ties or edges ahead in a few smaller European markets.</p>
      </div>
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">The network leans hard to the Americas</div>
        <p class="cap" style="margin:0 0 14px">IMAX venues by world region. Nearly half sit in one region — the reach is broad but far from even.</p>
        <div class="chart-box"><canvas id="cGeoReg" role="img" aria-label="Bar chart of IMAX venues by region: Americas 220, Asia 182, Europe 83, Oceania 5, Africa 2."></canvas></div>
        <p class="cap"><b>Read:</b> the <b>Americas</b> hold <b>45%</b> of catalogued venues and <b>Asia</b> another 37% — together 82% of the network. <b>Africa</b> has just two. The map is a story of two continents.</p>
      </div>
    </div>

    <div class="panel" style="margin-top:18px">
      <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Not all "IMAX" is the same IMAX</div>
      <p class="cap" style="margin:0 0 14px">Venues by projection format-class. Only the <b>IMAX 70mm / GT Laser (1.43:1)</b> tier can open to the full-height frame that films like <em>Oppenheimer</em> and <em>Dunkirk</em> were shot for.</p>
      <div class="grid-2">
        <div><div class="chart-box"><canvas id="cGeoFmt" role="img" aria-label="Horizontal bar chart of IMAX venues by format class: 372 Filmed for IMAX 1.90 to 1, 84 IMAX 70mm and GT Laser 1.43 to 1, 26 dome, 10 other."></canvas></div></div>
        <div><div class="chart-box"><canvas id="cGeo143" role="img" aria-label="Horizontal bar chart of the countries with the most 1.43 to 1 capable IMAX screens, led by the United States and Canada."></canvas></div></div>
      </div>
      <div style="font-size:14px;color:var(--ink);margin:22px 0 2px;font-weight:500">…and the rare frame is also the <em>big</em> frame</div>
      <p class="cap" style="margin:0 0 14px">Median physical screen area by format-class, from the <b>342</b> venues with dimensions on file (<span class="src">imax_venues_worldwide.csv</span>). The scarce 1.43:1 tier isn't just a taller ratio — it's a far larger picture.</p>
      <div class="chart-box"><canvas id="cGeoSize" role="img" aria-label="Horizontal bar chart of median IMAX screen area by format class: 1.43 to 1 capable screens 447 square metres versus 1.90 to 1 screens 197 square metres."></canvas></div>
      <p class="cap"><b>Read:</b> a median <b>1.43:1</b> screen is <b>447&nbsp;m²</b> (~18m tall) — <b>2.3×</b> the area of a median <b>1.90:1</b> screen at 197&nbsp;m² (~10m tall). The two dimensions of scarcity compound: the full-height frame is rare, and where it exists the wall itself is more than twice as big.</p>
      <div class="finding" style="margin-top:16px">
        <span class="tag">the scarcity finding</span>
        Only <b>84 of 492</b> catalogued IMAX venues — <b>17%</b> — can project the full <b>1.43:1</b> frame; the other 83% top out at the shorter 1.90:1 shape or the dome. And <b>57%</b> of those 1.43:1-capable screens sit in the <b>US and Canada</b>. So when a film is shot in <b>IMAX 70mm</b> for the tallest ratio (Section 02), the overwhelming majority of the audience — everywhere outside North America especially — never sees it that way. The immersion ranking upstream is an aspiration most tickets can't deliver.
      </div>
    </div>
  </section>

  <!-- ============ ACT III · WHY ============ -->
  <div class="act-divider" id="act-III" data-act="III">
    <span class="act-roman">III</span>
    <div class="act-text">
      <h2 class="act-title">Why</h2>
      <p class="act-blurb">What actually drives an IMAX film's reach.</p>
    </div>
  </div>

  <section id="s3" data-act="III">
    <div class="sec-head"><span class="sec-num">06</span><h2>Does capture type predict reach?</h2></div>
    <p class="sec-sub">The revenue question, on <b>900 films with verified Box Office Mojo grosses</b>. Each dot is one film — release year against worldwide gross, colored by capture type. Switch the y-axis to test whether the pattern survives once you remove the industry's overall growth.</p>

    <div class="controls">
      <span class="ctl-label">y-axis</span>
      <div class="seg" id="s3seg" role="group" aria-label="Section 3 scale">
        <button data-v="log" aria-pressed="true">log scale (default)</button>
        <button data-v="raw" aria-pressed="false">linear scale</button>
        <button data-v="detrend" aria-pressed="false">÷ year median</button>
      </div>
    </div>

    <div class="panel">
      <div class="legend">
        <span><i style="background:var(--native)"></i>IMAX 70mm</span>
        <span><i style="background:var(--certified)"></i>Filmed for IMAX</span>
        <span><i style="background:var(--dmr)"></i>IMAX DMR</span>
      </div>
      <div class="chart-box tall"><canvas id="c3" role="img" aria-label="Scatter of 900 films by release year against worldwide gross, colored by capture category. Filmed for IMAX titles cluster high, IMAX 70mm museum originals low, IMAX DMR conversions spread across the middle."></canvas></div>
      <p class="cap"><b>How to read this:</b> each dot is one film. The X axis is its release year. The Y axis is its worldwide gross on a <b>log scale</b>, so each gridline is 10× the one below. A log scale is used because grosses range from under $1M to nearly $3B. A normal scale would squash 90% of the films into a thin line at the bottom. Hover any dot to see the film. The <b>÷ year median</b> view removes the effect of the industry growing over time.</p>
    </div>

    <div class="finding">
      <span class="tag">what the data says</span>
      Median worldwide gross: <b>Filmed for IMAX $432M</b>, <b>IMAX DMR $166M</b>, <b>IMAX 70mm museum originals $13M</b>. The museum-originals figure is misleading — those are old documentaries with tiny releases, not flops. The real signal is simpler. <b>Filmed for IMAX blockbusters roughly double the IMAX DMR median.</b> Much of that gap survives the year-median view. So it is a real format effect, not just recency.
    </div>

    <div class="note">
      <b>Analysis honesty:</b> capture type, release year, and network size all rise together — they're collinear. The <b>÷ year median</b> view guards against reading recency as a format effect. Even so, Filmed for IMAX titles skew toward big-budget franchises, so part of the gap is budget, not the camera — only a multivariate model can fully separate those.
    </div>
  </section>

  <section id="sDrivers" data-act="III">
    <div class="sec-head"><span class="sec-num">07</span><h2>What actually drives reach</h2></div>
    <p class="sec-sub">Capture type is one lever. Two others turn out to matter as much or more — and one of them cuts against the obvious read from the adoption chart. Both are computed on the <b>900 films with verified grosses</b>.</p>

    <div class="grid-2">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Premium-format stacking</div>
        <p class="cap" style="margin:0 0 14px">Median worldwide gross by how many extra premium formats (3D, ScreenX, 4DX, 70mm) a film shipped in.</p>
        <div class="chart-box"><canvas id="cStack" role="img" aria-label="Bar chart: median gross rises steadily with number of extra premium formats, from 28 million at zero to 522 million at three."></canvas></div>
        <p class="cap"><b>Read:</b> a clean monotonic ladder — <b>$28M → $167M → $393M → $522M</b>. More premium formats tracks with far higher gross. It's largely selection (studios reserve the full format stack for their biggest titles), but that makes format-count a strong <em>signal</em> of a tentpole.</p>
      </div>

      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">The 3D premium didn't die</div>
        <p class="cap" style="margin:0 0 14px">Median gross, 3D vs non-3D films, across three eras. The adoption chart showed 3D <em>releases</em> falling — but look at the gross.</p>
        <div class="legend"><span><i style="background:var(--certified)"></i>3D</span><span><i style="background:var(--dmr)"></i>non-3D</span></div>
        <div class="chart-box"><canvas id="cEra3d" role="img" aria-label="Grouped bars comparing 3D versus non-3D median gross across 2010-14, 2015-19 and 2020-26. The 3D premium widens over time."></canvas></div>
        <p class="cap"><b>Read:</b> fewer films get 3D now. But the ones that do are the big ones. The 3D-vs-non gap <b>widens</b> from about 2× to nearly <b>9×</b> ($432M vs $46M in 2020–26). 3D became a <em>marker</em> of a blockbuster, not a fading gimmick.</p>
      </div>
    </div>

    <div class="finding">
      <span class="tag">the counterintuitive one</span>
      Section 03's adoption curve made 3D look like a dying fad — its share of releases collapsed after 2016. But <b>share of releases and share of revenue are different questions.</b> 3D stopped being applied to mid-tier films and concentrated onto tentpoles, so per-film it looks <em>more</em> premium than ever. Same data, opposite conclusion depending on which denominator you pick.
    </div>

    <div class="panel" style="margin-top:18px">
      <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Median gross per film, by era</div>
      <p class="cap" style="margin:0 0 14px">The rise — and recent fall — of the typical IMAX film's reach.</p>
      <div class="chart-box"><canvas id="cDecade" role="img" aria-label="Bar chart of median gross per IMAX film by era, peaking 2010-19 then falling sharply in 2020-26."></canvas></div>
      <p class="cap"><b>Read:</b> the median climbs from $13M (pre-2005) to ~$300M (2010–14), then <b>crashes to $84M in 2020–26</b>. That fall isn't IMAX weakening — it's volume: 378 films in the latest bucket vs 138 in 2010–14. The network now absorbs a long tail of small releases alongside the tentpoles, dragging the median down even as the top end grows.</p>
    </div>

    <div class="grid-2" style="margin-top:18px">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">IMAX vs Dolby — the co-release premium</div>
        <p class="cap" style="margin:0 0 14px">IMAX isn't the only premium screen. <b>135 films</b> also got a Dolby Cinema release. Films that land <b>both</b> formats gross far more than IMAX-only.</p>
        <div class="legend"><span><i style="background:var(--beam-fill)"></i>IMAX only</span><span><i style="background:#9b6cd6"></i>IMAX + Dolby</span></div>
        <div class="chart-box"><canvas id="cDolby" role="img" aria-label="Two bars comparing median worldwide gross: IMAX-only films at 125 million versus IMAX-plus-Dolby films at 382 million."></canvas></div>
        <p class="cap"><b>Read:</b> <b>$372M vs $125M</b> — a 3× gap. Studios save the full premium stack — IMAX and Dolby together — for their surest hits. So a dual-format release is one of the strongest signs of a major title.</p>
      </div>

      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Dual-format release is rising fast</div>
        <p class="cap" style="margin:0 0 14px">Share of each year's IMAX slate that <em>also</em> gets a Dolby Cinema release, since Dolby Cinema scaled up.</p>
        <div class="chart-box"><canvas id="cDual" role="img" aria-label="Line chart showing the share of IMAX films also released in Dolby Cinema rising from near zero in 2016 to around 30 percent by 2023-2026."></canvas></div>
        <p class="cap"><b>Read:</b> from effectively <b>0% before 2017</b> to <b>~30%</b> by 2023–26. The two formats increasingly co-exist on the same tentpoles rather than competing — the premium tier is consolidating, not fragmenting.</p>
      </div>
    </div>

    <div class="note">
      <b>On the comparison:</b> the IMAX-vs-Dolby gross gap is <b>selection, not causation</b> — Dolby doesn't <em>make</em> a film gross more; studios grant both formats to films already expected to be huge. It's a reliable <em>signal</em> of a tentpole, not a lever you can pull. The Dolby list (179 titles) comes from Wikipedia's Dolby Cinema category; the Wayback reconstruction of Dolby's own site returned empty, so this is the film-list angle only, not a screen-count time series.
    </div>

    <div class="panel" style="margin-top:18px">
      <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Best available projection tier vs gross</div>
      <p class="cap" style="margin:0 0 14px">Median worldwide gross by the highest projection format a film was released in — from ordinary digital xenon up to the flagship <abbr title="Grand Theatre dual-laser: IMAX's top projection system, the only digital setup showing the full 1.43:1 frame">GT dual-laser</abbr> system.</p>
      <div class="chart-box"><canvas id="cProj" role="img" aria-label="Bar chart of median gross by projection tier, rising from 124 million for digital xenon to 521 million for GT dual-laser."></canvas></div>
      <p class="cap"><b>Read:</b> a clean 4× climb — <b>$124M</b> (digital xenon) to <b>$521M</b> (GT dual-laser). The premium-projection venues get the premium films. Note the small counts on the top tiers (n=20 each): these are the handful of flagship releases studios push into the best houses.</p>
    </div>
  </section>

  <section id="sFranchise" data-act="III">
    <div class="sec-head"><span class="sec-num">08</span><h2>Franchise economics</h2></div>
    <p class="sec-sub">The strongest single predictor of an IMAX film's reach isn't the camera or the projector — it's whether it belongs to a <b>franchise</b>. Detected from title patterns across <b>900 films with grosses</b>.</p>

    <div class="grid-2">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Franchise vs standalone</div>
        <p class="cap" style="margin:0 0 14px">Median worldwide gross, franchise entries vs original standalone films.</p>
        <div class="chart-box"><canvas id="cFranBar" role="img" aria-label="Two bars: franchise films median 709 million versus standalone films 108 million."></canvas></div>
        <p class="cap"><b>Read:</b> <b>$709M vs $108M</b> — a <b>6.5× gap</b>, wider than any format effect in this dashboard. IMAX's commercial model runs on franchise tentpoles; standalone films are the long tail.</p>
      </div>
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">The biggest franchises on IMAX</div>
        <p class="cap" style="margin:0 0 14px">Median gross per film, franchises with 3+ IMAX releases. Bar length = median; hover for total franchise haul.</p>
        <div class="legend"><span><i style="background:var(--beam-fill)"></i>Marvel/MCU</span><span><i style="background:var(--certified)"></i>other franchises</span></div>
        <div class="chart-box"><canvas id="cFranRank" role="img" aria-label="Horizontal bar ranking of franchises by median gross, led by Avatar and Jurassic, with Marvel contributing the most films. X axis is median gross in millions, each bar is a franchise."></canvas></div>
        <p class="cap"><b>Read:</b> <b>Avatar</b> tops per-film median, but <b>Marvel</b> is the volume engine — 41 IMAX films totalling <b>$35.5B</b>, more than the next three franchises combined.</p>
      </div>
    </div>

    <div class="note">
      <b>Method:</b> franchises are matched by keywords in the title (e.g. any film containing "Avengers", "Spider-Man" etc. maps to Marvel/MCU). This under-counts films with non-obvious titles and can't see franchises not in the keyword list, so treat the standalone bucket as "franchise not detected" rather than "definitely original." Even so, the gap is large enough that reasonable mis-classification wouldn't erase it.
    </div>
  </section>

  <section id="sRelations" data-act="III">
    <div class="sec-head"><span class="sec-num">09</span><h2>Relationships that actually hold</h2></div>
    <p class="sec-sub">Rankings show <em>what's</em> bigger; these scatters show <em>what predicts what</em>. Each dot is a real data point. Each axis is a real quantity. The dashed line is the fitted trend. Its correlation <b>r</b> runs from 0 (no relationship) to 1 (perfect).</p>

    <div class="grid-2">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Infrastructure drives supply</div>
        <p class="cap" style="margin:0 0 14px">Each dot is one year. <b>X = IMAX screens installed worldwide</b>, <b>Y = films released that year</b>.</p>
        <div class="legend"><span><i style="background:var(--beam-fill)"></i>one year</span><span><i style="background:var(--film65)"></i>fitted trend (r = 0.93)</span></div>
        <div class="chart-box"><canvas id="cNetFilms" role="img" aria-label="Scatter of installed IMAX screens versus films released per year, one dot per year, showing a strong upward trend with correlation 0.93."></canvas></div>
        <p class="cap"><b>Read:</b> a near-straight line, <b>r = 0.93</b>. Every ~100 new screens brings roughly 5 more films a year. The film supply is almost mechanically tied to how many screens exist to fill — the strongest relationship in the dataset.</p>
      </div>
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">The opening weekend forecasts the run</div>
        <p class="cap" style="margin:0 0 14px">Each dot is a film. <b>X = domestic opening weekend</b>, <b>Y = final worldwide gross</b> (both $M, log-scaled).</p>
        <div class="legend"><span><i style="background:var(--certified)"></i>one film (n = 717)</span></div>
        <div class="chart-box"><canvas id="cOpenTotal" role="img" aria-label="Scatter of domestic opening weekend versus worldwide total gross for 717 films on log scales, tight upward band with correlation 0.82."></canvas></div>
        <p class="cap"><b>Read:</b> a tight upward band, <b>r = 0.82</b>. A film's first three days strongly predict its entire global haul — which is exactly why the industry obsesses over opening weekend. Outliers above the line are the rare films with "legs" that over-performed their start.</p>
      </div>
    </div>

    <div class="panel" style="margin-top:18px">
      <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Franchises get the better formats</div>
      <p class="cap" style="margin:0 0 14px">Capture-type mix within franchise films vs standalone films. Stacked to 100% so you compare composition, not volume.</p>
      <div class="legend"><span><i style="background:var(--certified)"></i>Filmed for IMAX</span><span><i style="background:var(--dmr)"></i>IMAX DMR</span><span><i style="background:var(--native)"></i>IMAX 70mm</span></div>
      <div class="chart-box" style="height:150px"><canvas id="cCrossTab" role="img" aria-label="Two stacked horizontal bars comparing capture-type mix: franchise films are 20 percent certified digital versus 5 percent for standalone films."></canvas></div>
      <p class="cap"><b>Read:</b> franchise films are <b>4× more likely</b> to use Filmed for IMAX capture (20% vs 5%) — studios invest in the premium format precisely where the audience is guaranteed. Standalone films lean on the cheaper IMAX DMR path or are museum originals. Format choice follows commercial confidence.</p>
    </div>
  </section>

  <!-- ============ ACT IV · SO WHAT ============ -->
  <div class="act-divider" id="act-IV" data-act="IV">
    <span class="act-roman">IV</span>
    <div class="act-text">
      <h2 class="act-title">So what</h2>
      <p class="act-blurb">The money, and the shape of the business.</p>
    </div>
  </div>

  <section id="s5" data-act="IV">
    <div class="sec-head"><span class="sec-num">10</span><h2>Where the money comes from</h2></div>
    <p class="sec-sub">Box Office Mojo splits gross into <b>domestic (US / Canada)</b> and <b>international</b> — not per-country, but enough to see IMAX's center of gravity shift. As the network built out overseas, the international share of gross climbed and stayed high.</p>

    <div class="controls">
      <span class="ctl-label">view</span>
      <div class="seg" id="s5seg" role="group" aria-label="Section 5 view">
        <button data-v="share" aria-pressed="true">international share %</button>
        <button data-v="withnet" aria-pressed="false">vs network size</button>
      </div>
    </div>

    <div class="panel">
      <div class="chart-box"><canvas id="c5" role="img" aria-label="International share of IMAX worldwide gross by year, rising from 28 percent in 2000 to around 65 percent, optionally overlaid with installed system count."></canvas></div>
      <p class="cap"><b>Read:</b> international share of every year's total worldwide gross for films with a reported split. It roughly doubles from 2000 to the mid-2010s, then plateaus around two-thirds. <b>vs network size</b> overlays the installed-system count to show they grew together.</p>
    </div>

    <div class="finding">
      <span class="tag">what the data says</span>
      In <b>2000</b>, international was <b>28%</b> of IMAX-film worldwide gross; by the <b>2010s it settled near 65%</b>. IMAX became an <b>internationally-driven business</b> — the overseas screen build-out (especially China) is where the growth went. The <span class="src">china_only</span> flag marks 177 films that never got a domestic IMAX release at all.
    </div>

    <div class="note">
      <b>Data limit:</b> this is a <b>two-bucket</b> split (domestic vs international), not per-country. A true country-level map isn't supported by these sources — Box Office Mojo's per-territory tables weren't captured, and the only finer geographic signal in the pipeline is the binary <span class="src">china_only</span> flag. Claiming per-country revenue here would mean inventing it.
    </div>
  </section>

  <section id="sEcon" data-act="IV">
    <div class="sec-head"><span class="sec-num">11</span><h2>The economics behind the frame</h2></div>
    <p class="sec-sub">Joining production budgets and original language from <span class="src">tmdb_enrichment.csv</span> exposes two things the release data alone can't: which capture format returns the most <b>per dollar spent</b>, and how the slate stopped being a Hollywood-export box and went <b>genuinely multilingual</b>.</p>

    <div class="grid-2">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Return on budget, by capture type</div>
        <p class="cap" style="margin:0 0 14px">Median worldwide gross ÷ production budget, for the <b>660</b> films with a real (&gt;$1M) budget on record. Higher = more reach per dollar.</p>
        <div class="chart-box"><canvas id="cEconRoi" role="img" aria-label="Horizontal bar chart of return on budget by capture type: 65mm film 3.5x, DMR 2.85x, certified digital 2.66x, native 1.86x."></canvas></div>
        <p class="cap"><b>Read:</b> the prestige <b>65mm-film</b> titles (amber) aren't just an artistic flex — at a <b>3.5×</b> median return they're the most budget-<em>efficient</em> tier, ahead of DMR (2.85×) and certified digital (2.66×). Native museum originals trail at 1.86×, on tiny budgets. <span style="color:var(--ink-3)">Native n=7 — read as indicative, not firm.</span></p>
      </div>
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">The slate went multilingual</div>
        <p class="cap" style="margin:0 0 14px">Films per year by original language (those with a verified gross). Watch the English share erode after 2019.</p>
        <div class="legend">
          <span><i style="background:var(--dmr)"></i>English</span>
          <span><i style="background:var(--beam)"></i>Chinese</span>
          <span><i style="background:var(--certified)"></i>Japanese</span>
          <span><i style="background:var(--film65)"></i>other</span>
        </div>
        <div class="chart-box"><canvas id="cEconLang" role="img" aria-label="Stacked bar chart of IMAX films per year by original language, 2010 to 2026, with non-English titles rising from under 10 percent to nearly half the slate."></canvas></div>
        <p class="cap"><b>Read:</b> non-English titles were under <b>10%</b> of the slate through 2010–14 and are <b>~48%</b> by 2025–26 — Chinese, Japanese and a fast-growing "other" bucket (Hindi, Korean, Telugu, French).</p>
      </div>
    </div>

    <div class="finding">
      <span class="tag">what the data says</span>
      The two findings connect. IMAX's <b>international share of gross</b> (Section 10) rose because the <em>network</em> globalized — and here's the supply-side proof: the company now programs a slate that is nearly half non-English, feeding screens in China, Japan and India that a Hollywood-only pipeline could never fill. Meanwhile the tier IMAX markets hardest — true 65mm film — quietly returns the most per dollar, which is why the expensive "shot-for-IMAX" prestige play keeps paying off even as the network saturates.
    </div>
  </section>

  <section id="sRhythm" data-act="IV">
    <div class="sec-head"><span class="sec-num">12</span><h2>Release rhythm &amp; concentration</h2></div>
    <p class="sec-sub">When IMAX films come out, and how unequally the money is shared. Release dates parsed from <b>1,042 films</b>; grosses from 900.</p>

    <div class="panel">
      <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Seasonality — count and median gross by month</div>
      <p class="cap" style="margin:0 0 14px">Bars show how many films release each month; the line shows their median gross. The tentpole calendar is unmistakable.</p>
      <div class="legend"><span><i style="background:var(--dmr)"></i>films released</span><span><i style="background:var(--beam-fill)"></i>median gross</span></div>
      <div class="chart-box"><canvas id="cSeason" role="img" aria-label="Combo chart of films per month as bars and median gross as a line, peaking in May through July and November."></canvas></div>
      <p class="cap"><b>Read:</b> a clear two-peak tentpole rhythm — <b>summer</b> (May–July, median ~$370M) and the <b>November</b> holiday launch ($261M). January is the dead zone ($52M). Studios save their IMAX-worthy films for the windows audiences show up.</p>
    </div>

    <div class="grid-2" style="margin-top:18px">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">The box-office pyramid</div>
        <p class="cap" style="margin:0 0 14px">How the 900 films distribute across gross bands.</p>
        <div class="chart-box"><canvas id="cPyramid" role="img" aria-label="Horizontal bars showing film counts per gross band, widest at under 25 million and 100-250 million."></canvas></div>
        <p class="cap"><b>Read:</b> <b>52 billion-dollar films</b> sit atop a broad base — 233 films earned under $25M. IMAX is a hit-driven business: a few giants, a long tail.</p>
      </div>
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Revenue concentration</div>
        <p class="cap" style="margin:0 0 14px">Share of all IMAX-film worldwide gross earned by the top 10% of titles.</p>
        <div class="legend"><span><i style="background:var(--beam-fill)"></i>top 10% of films</span><span><i style="background:var(--grid)"></i>other 90%</span></div>
        <div class="chart-box"><canvas id="cConc" role="img" aria-label="Donut chart showing the top 10 percent of films account for 40 percent of all gross."></canvas></div>
        <p class="cap"><b>Read:</b> the <b>top 10%</b> of films (about 90 titles) earn <b>40%</b> of all the box office across $233B total. The blockbusters carry the network.</p>
      </div>
    </div>
  </section>

  <section id="sFinancials" data-act="IV">
    <div class="sec-head"><span class="sec-num">13</span><h2>What IMAX itself reports</h2></div>
    <p class="sec-sub">The sections above measure the <em>slate</em>. This one measures the <em>company</em>. It reads IMAX's own numbers straight from its SEC filings (<span class="src">imax_economics_from_edgar.csv</span>, 103 filings, 2002–2026) — the box office its network actually captured, quarter by quarter.</p>

    <div class="panel">
      <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Quarterly gross box office, as reported to the SEC</div>
      <p class="cap" style="margin:0 0 14px">Each point is a figure IMAX disclosed in a quarterly or annual filing. The gap in 2020–2021 is the pandemic, when theatres closed and filings carried no comparable figure.</p>
      <div class="chart-box tall"><canvas id="cFinGBO" role="img" aria-label="Line chart of IMAX quarterly gross box office from 2002 to 2025, rising from under 20 million dollars to a 200 to 370 million dollar range, with a gap in 2020 and 2021 and record highs in 2023 and 2025."></canvas></div>
      <p class="cap"><b>Read:</b> IMAX box office grew from about <b>$17M</b> a quarter in 2002 to a <b>$200–370M</b> range through the 2010s. The 2020–2021 gap marks the pandemic shutdown. Recovery has been strong — the two highest points in the series, <b>$347M</b> (Q3 2023) and <b>$368M</b> (Q3 2025), are both post-pandemic.</p>
      <div class="finding" style="margin-top:16px">
        <span class="tag">the billion-dollar line</span>
        In its 2015 full-year filing, IMAX reported that its <b>global box office passed $1 billion</b> for the first time — a 31% jump on the prior year. The quarterly series shows how it got there: a steady climb through the early 2010s as the network scaled and the blockbuster slate matured. The recent record quarters show the business is not just back to its pre-pandemic level but above it.
      </div>
    </div>
  </section>

  <!-- ============ ACT V · YOUR TURN ============ -->
  <div class="act-divider" id="act-V" data-act="V">
    <span class="act-roman">V</span>
    <div class="act-text">
      <h2 class="act-title">Your turn</h2>
      <p class="act-blurb">The producer's verdict — why a film green-lights IMAX.</p>
    </div>
  </div>

  <section id="sDecision" data-act="V">
    <div class="sec-head"><span class="sec-num">14</span><h2>Why a producer green-lights IMAX</h2></div>
    <p class="sec-sub">Every section above measures <em>what</em> happened. This one asks <em>why</em> — the decision a producer actually makes. It is a cost-versus-payoff calculation, and it explains why IMAX 70mm capture stays rare and depends heavily on the specific film. The framing draws on trade reporting from <a href="https://www.pressreader.com/usa/the-oklahoman/20170630/281938837932872" target="_blank" rel="noopener">The Oklahoman (2017)</a> and a <a href="https://kinonews.pro/imax-and-large-format-cinematography-technical-requirements-explained" target="_blank" rel="noopener">2025 large-format cinematography primer</a>, checked against this dataset.</p>

    <div style="display:flex;flex-direction:column;gap:18px">
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">The commitment funnel</div>
        <p class="cap" style="margin:0 0 14px">How far a film goes into IMAX narrows sharply at each step. Most "IMAX films" never touch an IMAX camera.</p>
        <div class="chart-box"><canvas id="cDecFunnel" role="img" aria-label="Funnel chart: 1406 films released in IMAX, only 408 shot with IMAX cameras, only 38 using the full 1.43 frame."></canvas></div>
        <p class="cap"><b>Read:</b> of 1,406 IMAX releases, only <b>408</b> (29%) were shot with large-format cameras — the rest are DMR post-conversions. Only <b>38 films (3%)</b> commit to the full 1.43 frame. This mirrors the trade estimate that fewer than 15% of a given year's ~30 IMAX releases use IMAX's own cameras.</p>
      </div>
      <div class="panel">
        <div style="font-size:14px;color:var(--ink);margin-bottom:2px;font-weight:500">Camera capture is a big-budget privilege</div>
        <p class="cap" style="margin:0 0 14px">Median production budget, camera-shot films vs DMR-only conversions. The gear only makes sense at the top of the market.</p>
        <div class="chart-box"><canvas id="cDecBudget" role="img" aria-label="Bar chart comparing median budgets: DMR-only 85 million dollars versus camera-shot 165 million dollars."></canvas></div>
        <p class="cap"><b>Read:</b> camera-shot films carry a median budget of <b>$165M</b> — nearly double the <b>$85M</b> of DMR-only films. <b>67%</b> of camera-shot films cost $100M or more, matching the reporting that studios rarely go full IMAX below a ~$100M budget.</p>
      </div>
    </div>

    <div class="panel" style="margin-top:18px">
      <div style="font-size:14px;color:var(--ink);margin-bottom:10px;font-weight:500">The producer's ledger</div>
      <p class="cap" style="margin:0 0 14px">The decision weighs concrete costs and logistics against a real commercial upside. Both sides are drawn from the trade sources above.</p>
      <div class="grid-2">
        <div class="ledger">
          <div class="ledger-head cost">Reasons not to (why it stays rare)</div>
          <ul class="ledger-list">
            <li><b>Camera cost.</b> An IMAX camera rents for roughly $40–50k per week; each ~3-minute film magazine runs about $3,000, and scanning adds ~$20k per hour of footage.</li>
            <li><b>Scarce, difficult gear.</b> Only about ten 15/70mm film cameras exist worldwide. They are heavy, run loud enough to complicate live sound, and hold only ~3 minutes of film per load.</li>
            <li><b>Screen mismatch.</b> Only ~100 theatres worldwide have the 1.43 screen. Shooting 1.43 means giving up roughly a quarter of the frame in most houses (see Section 12).</li>
            <li><b>Rigid workflow.</b> Native capture generates enormous data and demands specialised lighting, lenses, and a locked delivery spec — slower and costlier than a normal shoot.</li>
          </ul>
        </div>
        <div class="ledger">
          <div class="ledger-head gain">Reasons to (why the top of the market does it)</div>
          <ul class="ledger-list">
            <li><b>Box-office share.</b> IMAX runs about 10% of opening-weekend grosses for big blockbusters, and films built with IMAX "DNA" can pull a much higher share.</li>
            <li><b>Longer legs.</b> Films that use IMAX technology tend to hold their IMAX screens for more weeks than a typical release.</li>
            <li><b>A reason to leave the couch.</b> As home screens improve, native capture is marketed as the experience audiences cannot get at home.</li>
            <li><b>Efficient at the top.</b> In this dataset the camera-shot / 65mm tier returns the most per budget dollar (Section 11) — the spend pays back for the films that can carry it.</li>
          </ul>
        </div>
      </div>
      <div style="font-size:13px;color:var(--ink-2);margin:20px 0 12px"><b style="color:var(--ink);font-weight:600">The payoff, made concrete.</b> When IMAX reports its share of a film's box office, the "punches above its weight" claim becomes specific. These are the disclosed figures in the data.</div>
      <div class="share-strip">
        <div class="share-card">
          <div class="share-pct">20%</div>
          <div class="share-film">Project Hail Mary</div>
          <div class="share-note">of the North American debut — on just <b>1% of screens</b> ($16.4M in IMAX)</div>
          <div class="share-src">IMAX PR · high confidence</div>
        </div>
        <div class="share-card">
          <div class="share-pct">23%</div>
          <div class="share-film">Avatar: Fire and Ash</div>
          <div class="share-note">of the film's opening in China ($13.5M in IMAX)</div>
          <div class="share-src">IMAX PR · high confidence</div>
        </div>
        <div class="share-card">
          <div class="share-pct">4.2%</div>
          <div class="share-film">Demon Slayer: Infinity Castle</div>
          <div class="share-note">of global box office in the quarter</div>
          <div class="share-src">Deadline · low confidence</div>
        </div>
      </div>
      <div class="finding" style="margin-top:16px">
        <span class="tag">the answer</span>
        A producer green-lights IMAX 70mm capture when the film can <b>carry the cost and exploit the payoff</b> — a big-budget, spectacle-driven title where immersion is central and a ~10%+ opening-weekend IMAX share is worth chasing. That is why it is a <b>creative-and-commercial choice, not a technical default</b>. It also explains the shape of the whole dataset: 71% DMR conversions, a thin 3% using the full frame, and camera capture clustered among the most expensive films. IMAX is not used commonly because, for most films, the ledger does not balance.
      </div>
    </div>
  </section>



  <footer>
    <p><b>Data sources.</b> Film catalogue: Wikipedia IMAX release lists (1,406 rows, <span class="src">films_full_from_wikipedia.csv</span>). Grosses: Box Office Mojo (<span class="src">bom_grosses_verified.csv</span>, 900 films with worldwide figures). Network counts &amp; institutional split: SEC EDGAR filings, IMAX Corp CIK 921582 (<span class="src">imax_network_from_edgar.csv</span>). Venue registries: IMAX &amp; Dolby location listings (<span class="src">imax_venues_worldwide.csv</span>, 492 venues; <span class="src">dolby_venues_worldwide.csv</span>, 304 sites). Budgets &amp; original language: TMDB (<span class="src">tmdb_enrichment.csv</span>, 660 films with a verified budget). Reported financials: SEC EDGAR filings (<span class="src">imax_economics_from_edgar.csv</span>, 103 filings, 2002–2026). Box-office share figures: IMAX press releases and Deadline, parsed (<span class="src">imax_share_parsed.csv</span>). Format notes: Letterboxd.</p>
    <p style="margin-top:10px">All sections use <b>real computed values</b> from the joined data. Franchise membership is inferred from title keywords; treat as indicative.</p>
  </footer>

</div>`;
