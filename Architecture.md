# MaintenanceAI — System Architecture

## High-Level Architecture

```mermaid
graph TB
    subgraph Tenant["🏠 Tenant Interface"]
        A["Submit Request Page<br/>/submit"]
        B["Confirmation Page<br/>/submit/confirmation"]
    end

    subgraph AI["🤖 AI Processing Layer"]
        D["Google Gemini 2.0 Flash"]
    end

    subgraph API["⚙️ Backend API Layer (Next.js API Routes)"]
        E["POST /api/requests"]
        F["GET /api/requests"]
        G["GET/PATCH /api/requests/:id"]
        H["GET/PATCH /api/notifications"]
    end

    subgraph DB["🗄️ Data Layer"]
        I["SQLite Database<br/>(Prisma ORM)"]
    end

    subgraph Manager["📊 Operations Interface"]
        J["Dashboard<br/>/dashboard"]
        K["Notifications<br/>/notifications"]
    end

    A -->|"Natural Language Input"| E
    E -->|"Classify Request"| D
    D -->|"Structured JSON"| E
    E -->|"Save"| I
    E -->|"Generate Notification"| I
    B -->|"Fetch Ticket"| G
    G -->|"Query"| I
    F -->|"Query"| I
    J -->|"Fetch All"| F
    J -->|"Update Status/Assignment"| G
    G -->|"Update + Notify"| I
    K -->|"Fetch"| H
    H -->|"Query"| I
```

## Request Processing Flow

```mermaid
sequenceDiagram
    participant T as 👤 Tenant
    participant UI as 🖥️ Submit Form
    participant API as ⚙️ API Route
    participant AI as 🤖 Gemini AI
    participant DB as 🗄️ SQLite
    participant N as 🔔 Notifications

    T->>UI: Describes issue in natural language
    UI->>API: POST /api/requests
    API->>AI: Send description for classification
    AI-->>API: Returns JSON (category, severity, priority, steps, cost)
    API->>DB: Create Request record
    API->>DB: Create Confirmation notification
    API-->>UI: Return created request
    UI->>T: Redirect to confirmation page with ticket details

    Note over T,N: Later - Property Manager Actions

    T->>API: PATCH /api/requests/:id (status change)
    API->>DB: Update request status
    API->>DB: Create Status Update notification
    API-->>T: Return updated request

    T->>API: PATCH /api/requests/:id (assign provider)
    API->>DB: Update assignedTo field
    API->>DB: Create Assignment notification
    API-->>T: Return updated request
```

## Data Model

```mermaid
erDiagram
    Request {
        string id PK "cuid()"
        string tenantName "Required"
        string tenantEmail "Default: empty"
        string tenantUnit "Default: empty"
        string rawInput "Original description"
        string category "AI-classified"
        string severity "Low|Medium|High|Critical"
        int priority "1-5 scale"
        string status "Pending|In Progress|Resolved|Cancelled"
        string assignedTo "Service provider name"
        string summary "AI-generated summary"
        string actionSteps "JSON array of steps"
        string estimatedCost "AI-estimated cost range"
        string imageUrl "Optional image"
        datetime createdAt "Auto"
        datetime updatedAt "Auto"
    }

    Notification {
        string id PK "cuid()"
        string requestId FK "Links to Request"
        string type "CONFIRMATION|STATUS_UPDATE|ASSIGNMENT"
        string recipient "Name of recipient"
        string message "Notification text"
        boolean read "Default: false"
        datetime createdAt "Auto"
    }

    Request ||--o{ Notification : "generates"
```

## AI Classification Pipeline

```mermaid
graph LR
    subgraph Input
        A["Tenant's Natural<br/>Language Text"]
    end

    subgraph Processing["Gemini AI Processing"]
        B["Text Analysis &<br/>Entity Extraction"]
        C["Category<br/>Classification"]
        D["Severity &<br/>Priority Assessment"]
        E["Action Step<br/>Generation"]
        F["Cost<br/>Estimation"]
    end

    subgraph Output["Structured Output"]
        G["Category<br/>(10 types)"]
        H["Severity<br/>(4 levels)"]
        I["Priority<br/>(1-5 scale)"]
        J["Summary &<br/>Action Steps"]
        K["Estimated<br/>Cost Range"]
    end

    A --> B
    B --> C --> G
    B --> D --> H
    D --> I
    B --> E --> J
    B --> F --> K
```

## Technology Stack Diagram

```mermaid
graph TB
    subgraph Frontend["Frontend Layer"]
        A["Next.js 16 (App Router)"]
        B["React 19"]
        C["Tailwind CSS v4"]
        D["TypeScript"]
    end

    subgraph Backend["Backend Layer"]
        E["Next.js API Routes"]
        F["Prisma ORM v7"]
    end

    subgraph External["External Services"]
        G["Google Gemini 2.0 Flash"]
    end

    subgraph Data["Data Layer"]
        H["SQLite (Local)"]
        I["Azure SQL (Production)"]
    end

    A --> E
    E --> F
    E --> G
    F --> H
    F -.->|"Future"| I

    style I stroke-dasharray: 5 5
```

## Directory Structure

```
maintenance-app/
├── app/
│   ├── api/
│   │   ├── requests/
│   │   │   ├── route.ts          # GET all, POST new
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET one, PATCH update
│   │   └── notifications/
│   │       └── route.ts          # GET all, PATCH mark read
│   ├── dashboard/
│   │   └── page.tsx              # Operations dashboard
│   ├── notifications/
│   │   └── page.tsx              # Notification center
│   ├── submit/
│   │   ├── page.tsx              # Request submission form
│   │   └── confirmation/
│   │       └── page.tsx          # AI ticket confirmation
│   ├── globals.css               # Design system & animations
│   ├── layout.tsx                # Root layout with SEO
│   └── page.tsx                  # Landing page
├── components/
│   ├── Navbar.tsx                # Navigation with mobile menu
│   ├── Toast.tsx                 # Toast notification system
│   └── ui.tsx                    # Shared UI components
├── lib/
│   ├── db.ts                     # Prisma client singleton
│   └── gemini.ts                 # Gemini AI integration
├── prisma/
│   └── schema.prisma             # Database schema
├── generated/
│   └── client/                   # Generated Prisma client
├── .env                          # Environment variables
├── Solution_Overview.md          # Solution documentation
└── Architecture.md               # This file
```
