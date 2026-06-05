import urllib.request
import base64
import json
import os

diagrams = {
    "diagram_topology": """graph TB
    subgraph TenantDomain["🏠 Tenant Portal Domain (adeer-tenant-portal.fly.dev)"]
        A["Submit Request Page<br/>/submit"]
        B["Dashboard Page<br/>/dashboard"]
        C["API Router<br/>/api/sse & /api/tenant"]
    end

    subgraph OperationsDomain["📊 Operations Hub (maintenance-app.fly.dev)"]
        D["Operations Dashboard<br/>/dashboard"]
        E["API Controller<br/>/api/external/tenant-data"]
        F["Gemini AI Pipeline<br/>lib/gemini.ts"]
    end

    subgraph DataStore["🗄️ Shared Persistence Layer"]
        G[(SQLite Database dev.db)]
    end

    A -->|"Submit Details"| C
    C -->|"Proxy HTTP Requests"| E
    B -->|"SSE Event Stream"| C
    C -->|"Poll & Fetch updates"| E
    E -->|"Prisma Client"| G
    D -->|"Prisma Client"| G
    E -->|"Run Triage Prompt"| F
    F -.->|"Google Gemini API"| GeminiEngine["Gemini 2.5 Flash Engine"]""",

    "diagram_sequence": """sequenceDiagram
    autonumber
    participant Tenant as 👤 Tenant Client
    participant TenantApp as 🖥️ Tenant Portal (Next.js)
    participant AdminApp as ⚙️ Operations Admin (Next.js)
    participant Gemini as 🤖 Gemini 2.5 Flash API
    participant DB as 🗄️ SQLite Database

    Tenant->>TenantApp: Inputs natural language issue & submits
    TenantApp->>AdminApp: POST /api/external/requests/ (proxy payload)
    AdminApp->>Gemini: Forward text & images for triage analysis
    Gemini-->>AdminApp: Return JSON metadata (Category, Severity, Cost, Steps)
    AdminApp->>DB: Write Request record & notification payload
    AdminApp-->>TenantApp: Return ticket object
    TenantApp-->>Tenant: Redirect to Dashboard with active ticket status
    
    Note over Tenant, AdminApp: Real-time Event Streaming (SSE)
    AdminApp->>DB: Property manager edits status/assigns technician
    DB-->>AdminApp: Update persistent record
    TenantApp->>AdminApp: GET /api/external/tenant-data (polling event loop)
    AdminApp-->>TenantApp: Return updated tickets & notifications
    TenantApp-->>Tenant: Stream changes via EventSource to update UI dynamically""",

    "diagram_erd": """erDiagram
    Tenant {
        string id PK "cuid()"
        string name "Full Name"
        string email UK "Unique Address"
        string unit "Unit / Apartment"
        string password "Hashed credentials"
        datetime createdAt
    }

    Request {
        string id PK "cuid()"
        string tenantName "Tenant Name"
        string tenantEmail "Tenant Email"
        string tenantUnit "Tenant Unit"
        string rawInput "Description text"
        string category "Plumbing|HVAC|Electrical|Appliance|..."
        string severity "Low|Medium|High|Critical"
        int priority "1 (highest) to 5 (lowest)"
        string status "Pending|In Progress|Resolved|Cancelled"
        string assignedTo "Assigned technician"
        string summary "AI-generated ticket summary"
        string actionSteps "JSON array of technical tasks"
        string estimatedCost "Estimated cost range"
        string imageUrl "URL of uploaded issue photo"
        datetime createdAt
        datetime updatedAt
    }

    Notification {
        string id PK "cuid()"
        string requestId FK "Links to Request"
        string type "CONFIRMATION|STATUS_UPDATE|ASSIGNMENT"
        string recipient "Recipient Email/Name"
        string message "Text notification payload"
        boolean read "Marked read status"
        datetime createdAt
    }

    Tenant ||--o{ Request : "submits"
    Request ||--o{ Notification : "triggers" """
}

output_dir = "Screenshots"
os.makedirs(output_dir, exist_ok=True)

for name, code in diagrams.items():
    print(f"Rendering {name}...")
    # Clean the code a bit
    clean_code = code.strip()
    
    # Base64 encode the string as JSON object for mermaid.ink
    json_data = json.dumps({"code": clean_code, "mermaid": {"theme": "dark"}})
    b64_encoded = base64.b64encode(json_data.encode('utf-8')).decode('utf-8')
    
    # Using the standard mermaid.ink URL
    url = f"https://mermaid.ink/img/pako:{b64_encoded}"
    
    # Actually standard base64 is supported by raw URL: https://mermaid.ink/img/{base64}
    # Let's use simple base64 encoding of the code directly, it is simpler:
    code_b64 = base64.b64encode(clean_code.encode('utf-8')).decode('utf-8')
    url = f"https://mermaid.ink/img/{code_b64}"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(os.path.join(output_dir, f"{name}.png"), "wb") as f:
                f.write(response.read())
        print(f"Saved {name}.png successfully!")
    except Exception as e:
        print(f"Error rendering {name}: {e}")
