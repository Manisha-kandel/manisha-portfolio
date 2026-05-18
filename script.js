/* ═══════════════════════════════════════════════════════
   MANISHA KANDEL — script.js v2
   24-Hour Engine · Typed hero · Tabs · Modals · Reveals
════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────────────
   1. BOOK DATABASE
───────────────────────────────────────────── */
const BOOKS = {
  pristine: [
    { title:'War and Peace',     author:'Leo Tolstoy',       emoji:'⚔️', note:'About halfway through — epic in every sense. The Natasha arc hits unexpectedly hard.' },
    { title:'Anna Karenina',     author:'Leo Tolstoy',       emoji:'🌹', note:'On the to-do list. Tolstoy clearly has things to say about society and suffering.' },
    { title:'Shadow and Bone',   author:'Leigh Bardugo',     emoji:'🌑', note:'Just started — the Grishaverse magic system is fascinating.' },
    { title:'Dreaming Death',    author:'J. Kathleen Cheney',emoji:'💭', note:'On the stack — palace intrigue meets psychic detective fiction.' },
  ],
  shabby: [
    { title:'The Broken Wings',                    author:'Kahlil Gibran',                   emoji:'🕊️', note:'Read so many times the spine is faded. Still finds new meaning each time.' },
    { title:'The Living Corpse',                   author:'Leo Tolstoy',                     emoji:'🕯️', note:'Tolstoy at his moral-crisis finest. Dog-eared throughout.' },
    { title:'The Pearl of Lima',                   author:'Jules Verne',                     emoji:'🦪', note:'Underrated Verne — adventure with real emotional stakes.' },
    { title:'Rich Dad Poor Dad',                   author:'Robert Kiyosaki & Sharon Lechter',emoji:'💰', note:'Read in college, reread twice since. Changed how I think about systems.' },
    { title:'The First Twenty Hours',              author:'Josh Kaufman',                    emoji:'⏱️', note:'Gifted to multiple friends. The deconstruction of learning itself.' },
    { title:'Think and Grow Rich',                 author:'Napoleon Hill',                   emoji:'🧠', note:'Classic for a reason. Annotated margins on every page.' },
    { title:"Alice's Adventures in Wonderland",    author:'Lewis Carroll',                   emoji:'🐇', note:'My first "weird" book. Still delights every reread.' },
    { title:'Our Little Spanish Cousin',           author:'Mary Nixon-Roulet',               emoji:'🇪🇸', note:'Charming early-century travelogue — a look at a vanished world.' },
    { title:'To Be Read at Dusk',                  author:'Charles Dickens',                 emoji:'🌆', note:'Short and eerie. Perfect rainy afternoon read.' },
    { title:'The Man Who Was Thursday: A Nightmare',author:'G.K. Chesterton',               emoji:'🎩', note:'Philosophical thriller that gets stranger and stranger. Loved it.' },
    { title:'Yesterday House',                     author:'Fritz Leiber',                    emoji:'🏚️', note:'Leiber\'s uncanny domestic horror — quietly unsettling.' },
    { title:'The Blue Germ',                       author:'Maurice Nicoll',                  emoji:'🔵', note:'Forgotten sci-fi gem. Read in one sitting.' },
    { title:'We Should All Be Feminists',          author:'Chimamanda Ngozi Adichie',        emoji:'✊', note:'Short but essential. Passed around my friend group.' },
    { title:'Sharp Objects',                       author:'Gillian Flynn',                   emoji:'🔪', note:'Flynn\'s debut is still her most personal. Unnerving and brilliant.' },
    { title:'Memories of My Melancholy Whores',    author:'Gabriel García Márquez',          emoji:'🌺', note:'Late GGM, early in style. Melancholy and beautiful as promised.' },
    { title:'The World as I See It',               author:'Albert Einstein',                 emoji:'🌌', note:'Surprising warmth behind the intellect. Underlines on every page.' },
    { title:'Every Heart a Doorway',               author:'Seanan McGuire',                  emoji:'🚪', note:'Portal fantasy meets found family. Read in one afternoon.' },
    { title:'The Metamorphosis',                   author:'Franz Kafka',                     emoji:'🪲', note:'Kafka\'s quiet horror of alienation — more relevant every decade.' },
    { title:'The Pearl',                           author:'John Steinbeck',                  emoji:'💎', note:'Devastating and precise. Every sentence is doing something.' },
    { title:'Finish What You Start',               author:'Peter Hollins',                   emoji:'🏁', note:'Practical and motivating. Read when stuck on a project.' },
    { title:'Bhagvad Gita',                        author:'Attributed to Vyasa',             emoji:'🕉️', note:'Return to this regularly. Comfort and challenge in equal measure.' },
    { title:'The Last Queen',                      author:'Chitra Banerjee Divakaruni',      emoji:'👑', note:'Historical fiction that stayed with me long after finishing.' },
    { title:'Think Like a Monk',                   author:'Jay Shetty',                      emoji:'🧘', note:'Genuinely changed some daily habits. Highlighted half the book.' },
  ]
};

/* ─────────────────────────────────────────────
   2. 24-HOUR SKY ENGINE
───────────────────────────────────────────── */
const SKY = [
  { h:0,  sT:'#080b18',sB:'#0c1020',orb:'#c8c8f0',gl:'rgba(170,170,240,.2)',  hz:'rgba(10,10,30,0)',   cast:'rgba(0,0,0,0)',       tod:'rgba(4,6,18,.62)',  lf:'#223022', st:1   },
  { h:4,  sT:'#0c1224',sB:'#181a36',orb:'#c0c0e8',gl:'rgba(155,155,230,.18)', hz:'rgba(20,15,50,0)',   cast:'rgba(0,0,0,0)',       tod:'rgba(6,8,24,.52)',  lf:'#243022', st:1   },
  { h:5,  sT:'#1e1838',sB:'#362858',orb:'#e8c070',gl:'rgba(225,175,70,.3)',   hz:'rgba(90,50,110,.28)',cast:'rgba(70,30,70,.09)',   tod:'rgba(18,8,36,.34)', lf:'#365828', st:.4  },
  { h:6,  sT:'#c07028',sB:'#f09858',orb:'#ffd458',gl:'rgba(255,195,70,.62)',  hz:'rgba(255,130,50,.5)',cast:'rgba(250,110,36,.18)', tod:'rgba(70,35,8,.14)', lf:'#486838', st:0   },
  { h:7,  sT:'#c88840',sB:'#f8c070',orb:'#ffe470',gl:'rgba(255,215,90,.5)',   hz:'rgba(255,150,70,.28)',cast:'rgba(255,140,50,.1)', tod:'rgba(35,18,4,.07)', lf:'#528040', st:0   },
  { h:8,  sT:'#70b0d8',sB:'#b0d8f0',orb:'#ffe07a',gl:'rgba(255,215,75,.45)', hz:'rgba(255,170,70,.1)',cast:'rgba(255,190,70,.07)', tod:'rgba(0,0,0,.02)',   lf:'#588448', st:0   },
  { h:10, sT:'#52a0d0',sB:'#96ccea',orb:'#fff090',gl:'rgba(255,238,130,.4)', hz:'rgba(255,195,75,0)', cast:'rgba(255,215,90,.05)', tod:'rgba(0,0,0,0)',     lf:'#5e8c50', st:0   },
  { h:12, sT:'#3488c8',sB:'#78b8e0',orb:'#fffab0',gl:'rgba(255,248,160,.48)',hz:'rgba(255,215,95,0)', cast:'rgba(255,235,110,.1)', tod:'rgba(0,0,0,0)',     lf:'#629050', st:0   },
  { h:14, sT:'#4298cc',sB:'#86c4e0',orb:'#fff8b0',gl:'rgba(255,244,152,.45)',hz:'rgba(255,215,80,0)', cast:'rgba(255,225,95,.08)', tod:'rgba(0,0,0,0)',     lf:'#5e8c4c', st:0   },
  { h:16, sT:'#4890c0',sB:'#8cc0e0',orb:'#ffe878',gl:'rgba(255,218,70,.5)',  hz:'rgba(255,175,55,.1)',cast:'rgba(255,172,50,.08)', tod:'rgba(0,0,0,0)',     lf:'#588448', st:0   },
  { h:17, sT:'#c06028',sB:'#e08848',orb:'#ffc038',gl:'rgba(255,175,36,.7)',  hz:'rgba(255,130,36,.5)',cast:'rgba(255,120,28,.2)',  tod:'rgba(28,10,4,.07)', lf:'#486838', st:0   },
  { h:18, sT:'#9c3e1e',sB:'#d06838',orb:'#ff9618',gl:'rgba(255,130,16,.7)',  hz:'rgba(255,90,18,.62)',cast:'rgba(252,90,16,.28)',  tod:'rgba(36,12,4,.14)', lf:'#3e5a2c', st:0   },
  { h:19, sT:'#5c2614',sB:'#9c4c2a',orb:'#dc6c0c',gl:'rgba(215,95,8,.58)',   hz:'rgba(195,65,8,.58)', cast:'rgba(195,65,8,.18)',   tod:'rgba(28,9,4,.24)',  lf:'#344824', st:0   },
  { h:20, sT:'#281630',sB:'#48263e',orb:'#b05878',gl:'rgba(172,75,96,.38)',  hz:'rgba(95,36,56,.28)', cast:'rgba(55,18,38,.1)',    tod:'rgba(18,6,24,.34)', lf:'#2c3c22', st:.3  },
  { h:21, sT:'#160c26',sB:'#261636',orb:'#b098de',gl:'rgba(155,135,215,.28)',hz:'rgba(36,18,58,.1)',  cast:'rgba(0,0,0,0)',        tod:'rgba(10,5,18,.44)', lf:'#263820', st:.7  },
  { h:22, sT:'#0c0a1e',sB:'#141028',orb:'#b8b8ee',gl:'rgba(163,163,235,.24)',hz:'rgba(16,10,38,0)',   cast:'rgba(0,0,0,0)',        tod:'rgba(5,3,14,.54)',  lf:'#223020', st:.9  },
  { h:23, sT:'#08061a',sB:'#0c0a20',orb:'#c2c2f4',gl:'rgba(170,170,248,.22)',hz:'rgba(8,6,22,0)',     cast:'rgba(0,0,0,0)',        tod:'rgba(4,2,12,.60)',  lf:'#202e1e', st:1   },
];

function lerp(a,b,t){return a+(b-a)*t}
function parseH(hex){const n=parseInt(hex.replace('#',''),16);return{r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
function lerpH(a,b,t){const A=parseH(a),B=parseH(b);const r=Math.round(lerp(A.r,B.r,t)),g=Math.round(lerp(A.g,B.g,t)),bl=Math.round(lerp(A.b,B.b,t));return`#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${bl.toString(16).padStart(2,'0')}`}
function parseRGBA(s){const m=s.match(/[\d.]+/g);return m?{r:+m[0],g:+m[1],b:+m[2],a:+m[3]}:{r:0,g:0,b:0,a:0}}
function lerpRGBA(a,b,t){const A=parseRGBA(a),B=parseRGBA(b);return`rgba(${Math.round(lerp(A.r,B.r,t))},${Math.round(lerp(A.g,B.g,t))},${Math.round(lerp(A.b,B.b,t))},${parseFloat(lerp(A.a,B.a,t).toFixed(3))})`}

function getSky(h){
  const K=SKY;
  let lo=K[K.length-1],hi=K[0];
  for(let i=0;i<K.length;i++){if(K[i].h<=h)lo=K[i];if(K[i].h>h){hi=K[i];break}}
  if(lo===hi)return lo;
  const range=(hi.h-lo.h+24)%24||1;
  const t=((h-lo.h+24)%24)/range;
  return{
    sT:lerpH(lo.sT,hi.sT,t),sB:lerpH(lo.sB,hi.sB,t),
    orb:lerpH(lo.orb,hi.orb,t),gl:lerpRGBA(lo.gl,hi.gl,t),
    hz:lerpRGBA(lo.hz,hi.hz,t),cast:lerpRGBA(lo.cast,hi.cast,t),
    tod:lerpRGBA(lo.tod,hi.tod,t),lf:lerpH(lo.lf,hi.lf,t),
    st:lerp(lo.st,hi.st,t)
  };
}

function orbPos(h){
  let x,y;
  if(h>=5.5&&h<=19.5){
    const p=(h-5.5)/(19.5-5.5);
    x=4+p*92;y=82-70*Math.sin(Math.PI*p);
  }else{
    const total=(5.5+24-19.5);
    const p=h>=19.5?(h-19.5)/total:(h+24-19.5)/total;
    x=4+p*92;y=78-36*Math.sin(Math.PI*p);
  }
  return{x,y};
}

let manualTheme=false;
let currentTheme='light';

function applyTime(h){
  const s=getSky(h),pos=orbPos(h),root=document.documentElement;
  root.style.setProperty('--sky-a',s.sT);
  root.style.setProperty('--sky-b',s.sB);
  root.style.setProperty('--orb-col',s.orb);
  root.style.setProperty('--orb-glow',s.gl);
  root.style.setProperty('--horizon-col',s.hz);
  root.style.setProperty('--cast-col',s.cast);
  root.style.setProperty('--tod-col',s.tod);
  root.style.setProperty('--leaf-col',s.lf);
  const orb=document.getElementById('sunOrb');
  if(orb){orb.style.left=pos.x+'%';orb.style.top=pos.y+'%'}
  const sw=document.getElementById('starsWrap');
  if(sw)sw.style.opacity=s.st;
  document.querySelectorAll('.cloud').forEach(c=>{c.style.opacity=s.st>.5?.14:.68});
  if(!manualTheme)setTheme(h<6.5||h>20?'dark':'light',false);
}

function setTheme(mode,manual){
  if(manual)manualTheme=true;
  currentTheme=mode;
  document.body.classList.toggle('dark',mode==='dark');
  const icon=document.getElementById('themeIcon');
  if(icon)icon.textContent=mode==='dark'?'☽':'☀';
}

function initEngine(){
  function tick(){
    const n=new Date();
    applyTime(n.getHours()+n.getMinutes()/60+n.getSeconds()/3600);
  }
  tick();
  setInterval(tick,60000);
  window.setDebugHour=h=>{manualTheme=false;applyTime(h);console.log('[Engine] Hour:',h)};
}

/* ─────────────────────────────────────────────
   3. NAVBAR
───────────────────────────────────────────── */
function initNavbar(){
  const nav=document.getElementById('navbar');
  const burger=document.getElementById('burger');
  const navList=document.getElementById('navList');
  const toggle=document.getElementById('themeToggle');

  window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>40)},{passive:true});

  burger&&burger.addEventListener('click',()=>{
    const open=navList.classList.toggle('open');
    burger.setAttribute('aria-expanded',open);
  });

  // Close menu on link click
  document.querySelectorAll('.nav-a').forEach(a=>{
    a.addEventListener('click',()=>{navList.classList.remove('open');burger&&burger.setAttribute('aria-expanded','false')});
  });

  // Active link tracking
  const sections=document.querySelectorAll('section[id],footer[id]');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        document.querySelectorAll('.nav-a').forEach(a=>{
          a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id);
        });
      }
    });
  },{threshold:.35});
  sections.forEach(s=>observer.observe(s));

  toggle&&toggle.addEventListener('click',()=>setTheme(currentTheme==='dark'?'light':'dark',true));
}

/* ─────────────────────────────────────────────
   4. TYPED HERO TEXT
───────────────────────────────────────────── */
function initTyped(){
  const el=document.getElementById('typed');
  if(!el)return;
  const phrases=[
    'Data Scientist.',
    'ML Engineer.',
    'Graph Neural Network Researcher.',
    'Rail Infrastructure Analyst.',
    'Infrastructure Data Engineer.',
  ];
  let pi=0,ci=0,deleting=false;
  function tick(){
    const phrase=phrases[pi];
    el.textContent=deleting?phrase.slice(0,ci--):phrase.slice(0,ci++);
    if(!deleting&&ci>phrase.length){setTimeout(()=>{deleting=true;tick()},1800);return}
    if(deleting&&ci<0){deleting=false;pi=(pi+1)%phrases.length;ci=0;setTimeout(tick,400);return}
    setTimeout(tick,deleting?55:85);
  }
  tick();
}

/* ─────────────────────────────────────────────
   5. TABS
───────────────────────────────────────────── */
function initTabs(){
  document.querySelectorAll('.tab-bar').forEach(bar=>{
    const btns=bar.querySelectorAll('.tab-btn');
    const section=bar.closest('.glass-card,section');
    btns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        btns.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});
        btn.classList.add('active');btn.setAttribute('aria-selected','true');
        const target=btn.dataset.tab;
        if(section){
          section.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
          const pane=section.querySelector('#pane-'+target);
          if(pane)pane.classList.add('active');
        }
      });
      btn.addEventListener('keydown',e=>{
        const list=[...btns],i=list.indexOf(btn);
        if(e.key==='ArrowRight')list[(i+1)%list.length].focus();
        if(e.key==='ArrowLeft')list[(i-1+list.length)%list.length].focus();
      });
    });
  });
}

/* ─────────────────────────────────────────────
   6. SCROLL REVEALS
───────────────────────────────────────────── */
function initReveals(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('visible'),i*55);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

/* ─────────────────────────────────────────────
   7. BOOK LIBRARY
───────────────────────────────────────────── */
function initLibrary(){
  function makeGrid(books,gridId,type){
    const grid=document.getElementById(gridId);
    if(!grid)return;
    books.forEach(book=>{
      const cover=document.createElement('div');
      cover.className='book-cover reveal';
      cover.setAttribute('role','button');
      cover.setAttribute('tabindex','0');
      cover.setAttribute('aria-label',book.title+' by '+book.author);
      cover.innerHTML=`<span class="book-emoji">${book.emoji}</span><span class="book-short">${book.title}</span><span class="book-hover-info"><span class="bhi-title">${book.title}</span><span class="bhi-author">${book.author}</span></span>`;
      cover.addEventListener('click',()=>openModal(book,type));
      cover.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(book,type)}});
      grid.appendChild(cover);
    });
  }
  makeGrid(BOOKS.pristine,'grid-pristine','pristine');
  makeGrid(BOOKS.shabby,  'grid-shabby',  'shabby');
  // Re-observe newly created reveal elements
  initReveals();
}

/* ─────────────────────────────────────────────
   8. MODAL
───────────────────────────────────────────── */
function openModal(book,type){
  const overlay=document.getElementById('modalOverlay');
  const cover=document.getElementById('modalCover');
  const emoji=document.getElementById('modalEmoji');
  const badge=document.getElementById('modalBadge');
  const title=document.getElementById('modalTitle');
  const author=document.getElementById('modalAuthor');
  const note=document.getElementById('modalNote');
  if(!overlay)return;

  emoji.textContent=book.emoji;
  badge.textContent=type==='pristine'?'✦ Pristine':'♦ Shabby';
  badge.className='modal-badge '+(type==='pristine'?'pristine':'shabby');
  title.textContent=book.title;
  author.textContent=book.author;
  note.textContent=book.note;

  const bg=type==='pristine'
    ?'linear-gradient(135deg,#e8f5ec,#c8e8d0)'
    :'linear-gradient(135deg,#f5ede0,#e8d4b8)';
  cover.style.background=bg;

  overlay.classList.add('open');
  document.body.style.overflow='hidden';
  overlay.focus();
}

function closeModal(){
  const overlay=document.getElementById('modalOverlay');
  if(overlay)overlay.classList.remove('open');
  document.body.style.overflow='';
}

function initModal(){
  document.getElementById('modalClose')?.addEventListener('click',closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click',e=>{
    if(e.target===document.getElementById('modalOverlay'))closeModal();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
}

/* ─────────────────────────────────────────────
   9. PROJECT CARD TILT
───────────────────────────────────────────── */
function initTilt(){
  document.querySelectorAll('.proj-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
      const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
      card.style.transform=`translateY(-4px) perspective(600px) rotateY(${dx*6}deg) rotateX(${dy*-5}deg)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform=''});
  });
}

/* ─────────────────────────────────────────────
   10. PARALLAX ON SCROLL
───────────────────────────────────────────── */
function initParallax(){
  if(window.innerWidth<900)return;
  const orb=document.getElementById('sunOrb');
  const clouds=document.querySelectorAll('.cloud');
  window.addEventListener('scroll',()=>{
    const sy=window.scrollY;
    if(orb)orb.style.marginTop=sy*.04+'px';
    clouds.forEach((c,i)=>{c.style.transform=`translateX(${Math.sin(sy*.006+i)*8}px)`});
  },{passive:true});
}

/* ─────────────────────────────────────────────
   11. SMOOTH SCROLL HIJACK (for older Safari)
───────────────────────────────────────────── */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const target=document.querySelector(a.getAttribute('href'));
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}
    });
  });
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  initEngine();
  initNavbar();
  initTyped();
  initTabs();
  initLibrary();   // must come before initReveals to stamp reveal classes
  initReveals();
  initModal();
  initTilt();
  initParallax();
  initSmoothScroll();

  console.log('%c🌅 Shadow Engine Active','color:#c8903a;font-weight:600;font-size:13px');
  console.log('%csetDebugHour(6) → dawn · setDebugHour(18) → sunset · setDebugHour(0) → midnight','color:#7a7470;font-size:11px');
});