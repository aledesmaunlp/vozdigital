/* Voz Digital — Landing Page Scripts */

(function() {
  'use strict';

  /* ===== NAV ===== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== SCROLL REVEAL ===== */
  const revealEls = document.querySelectorAll('.service-card, .step, .impact-card, .stack-group');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    revealObserver.observe(el);
  });

  /* ===== COUNTER ANIMATION ===== */
  const counters = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ===== NAV BACKGROUND ON SCROLL ===== */
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      nav.style.background = 'rgba(1,1,1,.95)';
      nav.style.boxShadow = '0 1px 0 rgba(87,84,92,.2)';
    } else {
      nav.style.background = 'rgba(1,1,1,.88)';
      nav.style.boxShadow = 'none';
    }
    lastScroll = y;
  }, { passive: true });

  /* ===== SERVICE MODAL ===== */
  const modalData = {
    dataops: {
      title: 'Data Operations & Master Data Management',
      body: `<p>La calidad de tus datos determina la calidad de tus decisiones. Implementamos un ciclo completo de gobernanza:</p>
             <ul><li>Auditoría de calidad de datos con score por dimensión (exactitud, completitud, consistencia, actualidad, unicidad, validez).</li>
             <li>Normalización de catálogos: taxonomías estandarizadas, reglas de validación, y templates de carga.</li>
             <li>Master Data Management (MDM): unificación de criterios entre sistemas para que ERP, e-commerce y planillas hablen el mismo idioma.</li>
             <li>Documentación técnica y capacitación del equipo operativo.</li></ul>
             <p><strong>Entregable:</strong> base limpia + taxonomía documentada + manual de carga.</p>`
    },
    bi: {
      title: 'Business Intelligence Engineering',
      body: `<p>Transformamos datos dispersos en visibilidad ejecutiva. Nuestro stack de BI incluye:</p>
             <ul><li>Mapeo de fuentes de datos (ERP, CRM, e-commerce, APIs).</li>
             <li>Modelado dimensional: esquemas estrella optimizados para consultas rápidas.</li>
             <li>ETL/ELT: pipelines automatizados con Python, dbt y orquestadores.</li>
             <li>Dashboards en Looker Studio, Power BI o Metabase con alertas de umbral.</li></ul>
             <p><strong>Entregable:</strong> pipeline funcional + dashboards operativos + documentación.</p>`
    },
    erp: {
      title: 'Optimización de ERP/CRM',
      body: `<p>Tu software de gestión debe adaptarse a tu operativa, no al revés. Configuramos:</p>
             <ul><li>Parametrización de módulos según workflow real del negocio.</li>
             <li>Carga masiva de productos con validación automática y rollback.</li>
             <li>Actualización masiva de precios: scripts que procesan miles de SKUs en minutos.</li>
             <li>Integración tienda–ERP para sincronización de stock y precios en tiempo real.</li></ul>
             <p><strong>Entregable:</strong> sistema configurado + scripts + documentación de mantenimiento.</p>`
    },
    bpa: {
      title: 'Automatización de Procesos (BPA)',
      body: `<p>El tiempo de tu equipo es el recurso más escaso. Automatizamos:</p>
             <ul><li>Actualización de listas de precios: desde planilla hasta publicación, sin intervención manual.</li>
             <li>Sincronización de stock multi-canal: e-commerce, marketplace y depósito en un solo flujo.</li>
             <li>Alertas operativas: notificaciones por email, Slack o WhatsApp cuando un indicador cruza umbral.</li>
             <li>Backups programados con política 3-2-1.</li></ul>
             <p><strong>Entregable:</strong> flujos automatizados + runbook de operación + capacitación.</p>`
    }
  };

  const modal = document.getElementById('serviceModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = modal.querySelector('.modal-close');
  const modalBackdrop = modal.querySelector('.modal-backdrop');

  function openModal(key) {
    const data = modalData[key];
    if (!data) return;
    modalBody.innerHTML = `<h3>${data.title}</h3>${data.body}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.service-more').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ===== FORM HANDLING ===== */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
    });
  }

  /* ===== SMOOTH SCROLL FOR ANCHORS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
