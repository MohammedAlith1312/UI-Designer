# 🚀 Dynamic UI Platform - Complete Architecture

## Overview
This is now a **full Dynamic UI / Low-Code Platform** that allows users to create complete **applications** (not just pages) with **custom components**.

---

## 🏗️ Database Schema

### 1. **dynamic_apps** - Application Container
Each app is a complete application with multiple pages, routing, and theme.

```sql
- id: UUID (primary key)
- name: TEXT (e.g., "My ERP System")
- slug: TEXT (unique, e.g., "my-erp")
- description: TEXT
- theme: JSONB (global styling)
- metadata: JSONB (custom data)
- is_published: BOOLEAN
- created_at, updated_at: TIMESTAMP
```

### 2. **dynamic_pages** - Pages within Apps
Each page belongs to an app and has its own route.

```sql
- id: UUID (primary key)
- app_id: UUID (foreign key → dynamic_apps)
- name: TEXT (e.g., "Dashboard")
- route: TEXT (e.g., "/", "/dashboard", "/settings")
- schema: JSONB (UI structure)
- metadata: JSONB
- order: INTEGER (for navigation ordering)
- created_at, updated_at: TIMESTAMP
```

### 3. **dynamic_components** - Custom Component Library
Reusable custom components created by users.

```sql
- id: UUID (primary key)
- name: TEXT (e.g., "Custom Card")
- category: TEXT (form, display, layout, custom)
- schema: JSONB (component structure)
- props_schema: JSONB (defines accepted props)
- preview_url: TEXT (optional preview image)
- is_public: BOOLEAN (share with others?)
- created_by: TEXT (user identifier)
- created_at, updated_at: TIMESTAMP
```

---

## 📁 File Structure

```
src/
├── lib/
│   ├── db.ts                    # Server-only database operations
│   ├── services.ts              # Client-side API communication
│   └── dynamic-ui/
│       ├── registry.tsx         # Built-in atomic components
│       └── context.tsx          # UI context
│
├── app/
│   ├── api/
│   │   ├── apps/
│   │   │   ├── route.ts         # GET /api/apps, POST /api/apps
│   │   │   └── [id]/route.ts    # GET /api/apps/:id, DELETE /api/apps/:id
│   │   ├── pages/
│   │   │   ├── route.ts         # POST /api/pages
│   │   │   └── [id]/route.ts    # DELETE /api/pages/:id
│   │   └── components/
│   │       ├── route.ts         # GET /api/components, POST /api/components
│   │       └── [id]/route.ts    # DELETE /api/components/:id
│   │
│   ├── page.tsx                 # Apps dashboard
│   ├── builder/page.tsx         # App/Page builder
│   └── app/[slug]/
│       └── [...route]/page.tsx  # Dynamic app renderer
```

---

## 🔄 How It Works

### Creating an App
1. User clicks "Create New App"
2. Enters app name, slug, description
3. System creates app record in `dynamic_apps`
4. User can now add pages to the app

### Adding Pages to App
1. User selects an app
2. Clicks "Add Page"
3. Defines page name and route (e.g., "/dashboard")
4. Builds UI using drag-and-drop
5. Page saved to `dynamic_pages` with `app_id` reference

### Creating Custom Components
1. User opens "Component Creator"
2. Builds component using atomic elements
3. Defines props schema (what inputs it accepts)
4. Saves to `dynamic_components`
5. Component now available in builder sidebar

### Publishing & Viewing
1. User marks app as `is_published = true`
2. App accessible at `/app/[slug]`
3. Dynamic router loads all pages
4. Renders navigation based on page routes
5. Each page uses DynamicRenderer with its schema

---

## 🎯 Key Features

### ✅ Implemented
- Database schema for Apps, Pages, Components
- API routes for all CRUD operations
- Client-side service layer
- Server-side database operations
- Automatic table initialization

### 🚧 Next Steps
1. **Update Home Page** - Show apps instead of pages
2. **App Builder UI** - Multi-page management interface
3. **Component Creator** - Visual component builder
4. **Dynamic Router** - `/app/[slug]/[...route]` handler
5. **Navigation System** - Auto-generate nav from pages
6. **Theme System** - Global styling per app
7. **Component Library UI** - Browse and use custom components

---

## 💡 Usage Examples

### Client-Side (React Components)
```typescript
import { AppService, PageService, ComponentService } from '@/lib/services';

// Get all apps
const apps = await AppService.getApps();

// Get app with all pages
const app = await AppService.getApp('my-erp');

// Create new app
await AppService.saveApp({
  name: 'My ERP',
  slug: 'my-erp',
  description: 'Enterprise Resource Planning',
  is_published: false
});

// Add page to app
await PageService.savePage({
  app_id: app.id,
  name: 'Dashboard',
  route: '/',
  schema: { /* UI schema */ },
  order: 0
});

// Get custom components
const components = await ComponentService.getComponents('form');
```

### Server-Side (API Routes)
```typescript
import { AppService, PageService, ComponentService } from '@/lib/db';

// Same API, but runs directly on server
const apps = await AppService.getApps();
```

---

## 🎨 Architecture Benefits

1. **Separation of Concerns**
   - `db.ts` = Server-only (never bundled to browser)
   - `services.ts` = Client-safe (API calls only)
   - API routes = Bridge between client and database

2. **Type Safety**
   - Shared interfaces between client and server
   - TypeScript ensures consistency

3. **Scalability**
   - Apps can have unlimited pages
   - Components are reusable across apps
   - Relational structure (CASCADE deletes)

4. **Security**
   - Database credentials never exposed to browser
   - All operations go through API routes
   - Can add authentication middleware easily

---

## 🚀 What You Can Build

- **ERP Systems** - Multi-module business apps
- **CMS Platforms** - Content management with custom pages
- **Dashboards** - Analytics with multiple views
- **SaaS Apps** - Complete applications with routing
- **Admin Panels** - CRUD interfaces with custom components
- **Workflow Tools** - Process management systems

---

## 📝 Next Implementation Priority

1. Update home page to show apps list
2. Create app builder interface
3. Implement component creator
4. Build dynamic app router
5. Add navigation generation
6. Implement theme system

**The foundation is complete. Now we build the UI!** 🎉
