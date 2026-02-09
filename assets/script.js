const $ = (id) => document.getElementById(id);
const data = window.PORTFOLIO;

$("year").textContent = new Date().getFullYear();

// mobile menu
$("burger").addEventListener("click", () => {
  const nav = $("nav");
  nav.classList.toggle("open");
  $("burger").setAttribute("aria-expanded", nav.classList.contains("open"));
});

// hero chips
data.heroChips.forEach(t => {
  const s = document.createElement("span");
  s.className = "chip";
  s.textContent = t;
  $("heroChips").appendChild(s);
});

// hero stats
data.heroStats.forEach(x => {
  const d = document.createElement("div");
  d.className = "stat";
  d.innerHTML = `<b>${x.kpi}</b><div class="muted small">${x.label}</div>`;
  $("heroStats").appendChild(d);
});

// about
$("aboutText").textContent = data.aboutText;
data.aboutCards.forEach(c => {
  const d = document.createElement("div");
  d.className = "card";
  d.innerHTML = `<h3>${c.title}</h3><p class="muted">${c.text}</p>`;
  $("aboutCards").appendChild(d);
});
data.results.forEach(r => {
  const li = document.createElement("li");
  li.textContent = r;
  $("resultsList").appendChild(li);
});

// experience filters + accordion
let activeExp = "All";
function renderExpFilters(){
  $("expFilters").innerHTML = "";
  data.experienceFilters.forEach(f => {
    const b = document.createElement("button");
    b.textContent = f;
    b.className = f === activeExp ? "active" : "";
    b.onclick = () => { activeExp = f; renderExperience(); renderExpFilters(); };
    $("expFilters").appendChild(b);
  });
}
function renderExperience(){
  $("expAccordion").innerHTML = "";
  data.experiences
    .filter(e => activeExp === "All" || e.group === activeExp)
    .forEach(e => {
      const det = document.createElement("details");
      if (e.open) det.setAttribute("open", "open");
      det.innerHTML = `
        <summary>${e.title} <span class="muted small">— ${e.meta}</span></summary>
        <ul>${e.bullets.map(x=>`<li>${x}</li>`).join("")}</ul>
      `;
      $("expAccordion").appendChild(det);
    });
}
renderExpFilters();
renderExperience();

// projects filters + search
let activeProj = "All";
function renderProjFilters(){
  $("projFilters").innerHTML = "";
  data.projectFilters.forEach(f => {
    const b = document.createElement("button");
    b.textContent = f;
    b.className = f === activeProj ? "active" : "";
    b.onclick = () => { activeProj = f; renderProjects(); renderProjFilters(); };
    $("projFilters").appendChild(b);
  });
}
function renderProjects(){
  const q = ($("projSearch").value || "").toLowerCase().trim();
  $("projGrid").innerHTML = "";
  data.projects
    .filter(p => activeProj === "All" || p.tags.includes(activeProj))
    .filter(p => !q || (p.title + " " + p.meta + " " + p.bullets.join(" ")).toLowerCase().includes(q))
    .forEach(p => {
      const d = document.createElement("div");
      d.className = "card";
      d.innerHTML = `
        <h3>${p.title}</h3>
        <p class="muted small">${p.meta}</p>
        <ul>${p.bullets.map(x=>`<li>${x}</li>`).join("")}</ul>
      `;
      $("projGrid").appendChild(d);
    });
}
$("projSearch").addEventListener("input", renderProjects);
renderProjFilters();
renderProjects();

// skills chips
data.skills.forEach(t => {
  const s = document.createElement("span");
  s.className = "chip";
  s.textContent = t;
  $("skillsChips").appendChild(s);
});

// approach
data.approach.forEach(a => {
  const d = document.createElement("div");
  d.className = "card";
  d.innerHTML = `<h3>${a.title}</h3><p class="muted">${a.text}</p>`;
  $("approachCards").appendChild(d);
});

// certs
data.certs.forEach(c => {
  const d = document.createElement("div");
  d.className = "card";
  d.innerHTML = `<h3>${c}</h3>`;
  $("certCards").appendChild(d);
});

// contact quick form -> mailto
$("quickForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const subject = encodeURIComponent(`Portfolio message from ${fd.get("name")}`);
  const body = encodeURIComponent(`Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`);
  window.location.href = `mailto:azer.alizadeh94@gmail.com?subject=${subject}&body=${body}`;
});

// calendly iframe
$("calendlyFrame").src = data.calendlyUrl;
