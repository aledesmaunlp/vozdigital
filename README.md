# Voz Digital — Documentación de Ecosistema

> **Repositorio privado de operaciones.**  
> Contiene identidad de marca, arquitectura de servicios, stack técnico, gobernanza de datos y configuraciones de infraestructura.

---

## ¿Qué hacemos? (Taxonomía canónica)

Ofrecemos **Ingeniería de Operaciones Digitales e Inteligencia de Negocios** — un stack de disciplinas que transforman la operativa diaria de pymes y empresas medianas en ventajas competitivas medibles.

| Disciplina técnica | Qué resolvemos | Valor para el cliente |
|---|---|---|
| **Data Operations (DataOps)** | Limpieza, normalización y mantenimiento de bases de datos. Eliminación de duplicados, estandarización de campos, validación de registros. | Datos confiables para tomar decisiones. Menos errores operativos. |
| **Master Data Management (MDM)** | Unificación de criterios para carga de productos, catálogos y nomenclaturas. Creación de taxonomías consistentes. | Catalogación escalable. Equipos que cargan igual sin importar quién lo haga. |
| **BI Engineering** | Extracción de datos desde ERP/CRM, modelado dimensional, generación de informes de negocio (KPIs, P&L, rotación, márgenes). | Visibilidad real del negocio. Deja de operar a ciegas. |
| **ERP/CRM Systems Optimization** | Configuración, parametrización y optimización de software de gestión (Tango, SAP B1, Salesforce, etc.). | El sistema adaptado al negocio, no al revés. |
| **Business Process Automation (BPA)** | Automatización de flujos repetitivos: actualización masiva de listas de precios, sincronización de stock, alertas de umbral. | Horas humanas recuperadas. Cero errores de tipeo en tareas repetitivas. |
| **Data Governance** | Políticas de calidad, roles de acceso, auditoría de cambios, backup y recuperación. | Cumplimiento, trazabilidad y tranquilidad. |

> **Por qué estos nombres:** utilizamos terminología estándar de la industria (Gartner, DAMA-DMBOK) para que tu propuesta técnica sea inmediatamente reconocible por gerentes de IT, CFOs y directores de operaciones. No inventamos categorías; usamos el lenguaje que ya usan quienes toman decisiones de compra en B2B.

---

## Estructura del repo

```
vozdigital-private/
├── docs/                          # Documentación canónica del negocio
│   ├── 01-IDENTIDAD.md            # Marca, voz, tono, paleta
│   ├── 02-ARQUITECTURA-DE-SERVICIOS.md  # Catálogo de servicios y SLAs
│   ├── 03-ECOSISTEMA-TECNICO.md   # Herramientas, integraciones, APIs
│   ├── 04-STACK-TECNICO.md        # Stack de desarrollo y operación
│   ├── 05-GOBERNANZA-DE-DATOS.md  # Políticas de calidad y seguridad
│   ├── 06-SEGURIDAD-Y-CUMPLIMIENTO.md   # Compliance, backups, accesos
│   └── 07-ROADMAP.md              # Evolución del servicio y releases
├── config/                        # Archivos de configuración
│   ├── github/workflows/          # CI/CD para docs y automatismos
│   ├── vscode/                    # Settings compartidos del equipo
│   └── git/                       # .gitignore templates
├── assets/brand/                  # Logos, íconos, paleta en formato editable
├── src/templates/                 # Plantillas de email, propuestas, contratos
└── scripts/                       # Utilitarios internos (Python, Bash)
```

---

## Convenciones

- **Idioma:** español para documentación de negocio, inglés para código y configuración técnica.
- **Versionado:** Calendar Versioning `YYYY.MM.DD` para documentos; SemVer para scripts.
- **Branching:** `main` protegida. PR obligatorio para cualquier cambio en `/docs`.
- **Commits:** Conventional Commits (`docs:`, `feat:`, `config:`, `chore:`).

---

*Voz Digital — Arquitectura de Sistemas de Negocio y Operaciones de Datos.*
