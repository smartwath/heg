---
trigger: always_on
---

# Angular Architecture Rules

Prefer feature-based organization.

Example:

src/app/
├── core/
├── shared/
└── features/
    └── users/
        ├── pages/
        ├── components/
        ├── services/
        ├── models/
        └── users.routes.ts

Rules:

- Pages coordinate features.
- Reusable UI belongs in components.
- API communication belongs in services.
- Business logic should not be duplicated across components.
- Models/interfaces should describe application data.
- Do not place API calls directly in templates.
- Do not place large business logic blocks inside HTML.
- Avoid putting everything into one component.
- Extract logic when a component becomes difficult to understand or maintain.