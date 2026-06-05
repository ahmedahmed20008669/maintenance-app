import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image as RLImage
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT, TA_CENTER
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

# Define Palette (Adeer Navy & Teal theme)
COLOR_DARK_BG = HexColor('#0f131a')      # Primary dark background
COLOR_TEAL = HexColor('#0099ad')         # Primary accent
COLOR_MUTED = HexColor('#b5b5b5')        # Secondary text color
COLOR_CARD_BG = HexColor('#1a1f29')      # Card background color
COLOR_BORDER = HexColor('#2e3342')       # Border color
COLOR_WHITE = HexColor('#ffffff')        # White text
COLOR_TEXT_MAIN = HexColor('#d1d5db')    # Main gray text for table body
COLOR_BODY_TEXT = HexColor('#2c3e50')    # Main body text color for light pages
COLOR_DARK_GRAY = HexColor('#4d555d')    # Darker gray for metadata readability on white

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute total page count 
    and display standard, professional page headers, footers, and borders.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        # Skip header/footer on Page 1 (Cover Page).
        if self._pageNumber == 1:
            # Draw Cover Page background decoration
            self.saveState()
            
            # Teal stripe at top only
            self.setFillColor(COLOR_TEAL)
            self.rect(0, 10.75 * inch, 8.5 * inch, 0.25 * inch, fill=True, stroke=False)
            self.restoreState()
            return

        # Regular Pages: Draw standard layout
        self.saveState()
        
        # 3pt Teal Page Border
        self.setStrokeColor(COLOR_TEAL)
        self.setLineWidth(3)
        self.rect(20, 20, 572, 752)
        
        # Small adeer logo in header
        logo_path = r"../maintenance-app/public/adeer-logo.png"
        if os.path.exists(logo_path):
            self.drawImage(logo_path, 500, 722, width=60, preserveAspectRatio=True, mask='auto')

        # Footer text & line
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)
        self.line(40, 45, 572, 45)
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_MUTED)
        self.drawString(40, 32, "Confidential - System Architecture and Specifications")
        
        # Standard Page numbering: "Page X of Y"
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 32, page_str)
        self.restoreState()

def create_specs_pdf():
    pdf_path = "System_Architecture_and_Specifications.pdf"
    doc = SimpleDocTemplate(pdf_path, pagesize=letter,
                            rightMargin=50, leftMargin=50, topMargin=95, bottomMargin=50)
    styles = getSampleStyleSheet()
    
    # Custom Cover Styles
    cover_title_style = ParagraphStyle(
        'CoverTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=24, leading=30, textColor=COLOR_TEAL, alignment=0, spaceAfter=20
    )
    cover_subtitle_style = ParagraphStyle(
        'CoverSubtitle', parent=styles['Heading2'], fontName='Helvetica', fontSize=14, leading=18, textColor=COLOR_BODY_TEXT, alignment=0, spaceAfter=40
    )
    cover_meta_style = ParagraphStyle(
        'CoverMeta', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=15, textColor=COLOR_DARK_GRAY, alignment=0, spaceAfter=10
    )
    
    # Standard styles
    heading1_style = ParagraphStyle(
        'Heading1', parent=styles['Heading1'], fontSize=15, leading=19, spaceAfter=10, spaceBefore=16, textColor=COLOR_TEAL
    )
    heading2_style = ParagraphStyle(
        'Heading2', parent=styles['Heading2'], fontSize=12, leading=15, spaceAfter=6, spaceBefore=10, textColor=COLOR_TEAL
    )
    body_style = ParagraphStyle(
        'BodyText', parent=styles['Normal'], fontSize=9.5, leading=13.5, spaceAfter=6, textColor=COLOR_BODY_TEXT
    )
    code_style = ParagraphStyle(
        'CodeStyle', parent=styles['Normal'], fontName='Courier', fontSize=8, leading=11, spaceAfter=8, textColor=HexColor('#1f2937'), backColor=HexColor('#f3f4f6'), borderPadding=6
    )
    bullet_style = ParagraphStyle(
        'Bullet', parent=styles['Normal'], fontSize=9.5, leading=13.5, spaceAfter=5, leftIndent=15, bulletIndent=8, textColor=COLOR_BODY_TEXT
    )
    table_header_style = ParagraphStyle(
        'TableHeader', parent=styles['Normal'], fontSize=9, fontName='Helvetica-Bold', textColor=COLOR_WHITE
    )
    table_body_style = ParagraphStyle(
        'TableBody', parent=styles['Normal'], fontSize=8.5, leading=11, textColor=COLOR_TEXT_MAIN
    )

    Story = []

    def add_heading(text, level=1):
        if level == 1:
            Story.append(Paragraph(text, heading1_style))
        elif level == 2:
            Story.append(Paragraph(text, heading2_style))
        Story.append(Spacer(1, 3))

    def add_para(text):
        Story.append(Paragraph(text, body_style))
        Story.append(Spacer(1, 3))

    def add_bullet(text):
        Story.append(Paragraph(f"• {text}", bullet_style))

    def add_img(img_name, w_in, h_in):
        img_path = os.path.join(os.path.dirname(__file__), "..", "Screenshots", img_name)
        if os.path.exists(img_path):
            Story.append(Spacer(1, 5))
            Story.append(RLImage(img_path, width=w_in*inch, height=h_in*inch))
            Story.append(Spacer(1, 5))
        else:
            print(f"Warning: image not found at {img_path}")

    # --- Cover Page ---
    Story.append(Spacer(1, 150))
    Story.append(Paragraph("MAINTENANCE-AI & TENANT PORTAL", cover_title_style))
    Story.append(Paragraph("<b>Software Engineering & System Architecture Specification</b>", cover_subtitle_style))
    Story.append(Spacer(1, 80))
    
    Story.append(Paragraph("<b>Author:</b> Mohamed Samir Hassan, MSc, PhD Researcher", cover_meta_style))
    Story.append(Paragraph("<b>Target Audience:</b> Engineering Teams, Property Managers, Operations Directors", cover_meta_style))
    Story.append(Paragraph("<b>Date:</b> June 2026", cover_meta_style))
    Story.append(Paragraph("<b>Classification:</b> Confidential / System Specifications", cover_meta_style))
    Story.append(PageBreak())

    # --- Section 1: Topology ---
    add_heading("1. System Topology & High-Level Architecture", 1)
    add_para("The platform uses a split-responsibility dual-application topology. This topology ensures administrative features and data mutation controls reside on a protected backend container, while tenants access a streamlined portal. Both apps interact with a single SQLite database running in WAL (Write-Ahead Logging) mode, resolving data conflicts through dedicated secure REST endpoints.")
    
    add_img("diagram_topology.png", 4.5, 3.7)
    
    add_heading("1.2 Request Flow Sequence Diagram", 2)
    add_para("This sequence diagram outlines how requests are parsed by AI, saved, and synced in real-time between tenant and manager views.")
    
    add_img("diagram_sequence.png", 5.5, 2.4)
    Story.append(PageBreak())

    # --- Section 2: Tech Stack ---
    add_heading("2. Technology Stack & Core Directories", 1)
    add_para("Both applications are built with modern web technologies:")
    add_bullet("<b>Frontend UI & Framework:</b> Next.js 16 (App Router), React 19, and Tailwind CSS.")
    add_bullet("<b>Design System & Brand Identity:</b> Custom CSS variables matching the Adeer Navy & Teal theme, using custom Poppins typography, rounded-2xl glassmorphism, pulse loading animations, and responsive layouts.")
    add_bullet("<b>Database ORM:</b> Prisma Client v7 querying a local SQLite datastore inside WAL mode to prevent locking during concurrent reads/writes.")
    add_bullet("<b>AI Engine:</b> Google Gemini 2.5 Flash API for automated categorization, cost assessment, prioritization, and technician task checklist generation.")
    
    add_heading("2.1 Key File Mapping", 2)
    
    files_data = [
        [Paragraph("<b>Component / Path</b>", table_header_style), Paragraph("<b>Description</b>", table_header_style)],
        [Paragraph("<b>maintenance-app/prisma/schema.prisma</b>", table_body_style), Paragraph("Database schema definitions.", table_body_style)],
        [Paragraph("<b>maintenance-app/lib/gemini.ts</b>", table_body_style), Paragraph("Prompt engineering and JSON parser.", table_body_style)],
        [Paragraph("<b>maintenance-app/app/api/external/tenant-data/route.ts</b>", table_body_style), Paragraph("Cross-domain synchronizer API.", table_body_style)],
        [Paragraph("<b>tenant-app/app/api/sse/route.ts</b>", table_body_style), Paragraph("Server-Sent Events client-stream connector.", table_body_style)],
        [Paragraph("<b>tenant-app/app/dashboard/page.tsx</b>", table_body_style), Paragraph("Main tenant tracking dashboard workspace.", table_body_style)],
        [Paragraph("<b>tenant-app/app/page.tsx</b>", table_body_style), Paragraph("Dynamic authentication portal.", table_body_style)]
    ]
    files_table = Table(files_data, colWidths=[2.75*inch, 3.75*inch])
    files_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_DARK_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [COLOR_CARD_BG]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    Story.append(files_table)
    Story.append(Spacer(1, 10))
    Story.append(PageBreak())

    # --- Section 3: Database Schema ---
    add_heading("3. Database Schema Diagram", 1)
    add_para("The SQLite database is managed using Prisma. The structure of the core tables is defined below:")
    
    add_img("diagram_erd.png", 2.2, 5.5)
    Story.append(PageBreak())

    # --- Section 4: Interface Walkthrough ---
    add_heading("4. Platform Interface Walkthrough", 1)
    
    add_heading("4.1 Tenant Portal Authentication", 2)
    add_para("The Tenant Portal includes validation on both the client and server. If a tenant's session becomes invalid or expires, the system automatically redirects them to the login screen.")
    
    add_img("tenant_login.png", 4.5, 3.4)
    Story.append(PageBreak())

    add_heading("4.2 Ticket Submission Form", 2)
    add_para("The submit form features templates that allow tenants to quickly auto-populate common issue descriptions. The description is processed by the AI pipeline.")
    
    add_img("tenant_submit_form.png", 4.5, 2.15)
    
    add_heading("4.3 Automated AI Classification & Triage Pipeline", 2)
    add_para("When a request is submitted, it is processed by the Gemini AI pipeline. The text description and any attached photos are analyzed to determine the ticket's category, urgency rating, estimated repair costs, and a structured set of repair steps.")
    
    prompt_text = """const prompt = `You are an AI assistant for a property management company. Analyze the following maintenance request (and any attached images) from a tenant and provide a structured classification.

Respond ONLY with a valid JSON object:
{
  "category": "Plumbing | Electrical | HVAC | Structural | Appliance | Pest Control | Cleaning | Security | Landscaping | General",
  "severity": "Low | Medium | High | Critical",
  "priority": "1 (highest) to 5 (lowest)",
  "summary": "Professional summary of the issue",
  "actionSteps": ["step 1", "step 2", "step 3"],
  "estimatedCost": "Estimated cost range"
}`;"""
    Story.append(Paragraph(prompt_text.replace('\n', '<br/>').replace(' ', '&nbsp;'), code_style))
    Story.append(Spacer(1, 5))
    Story.append(PageBreak())

    add_para("The property manager sees this metadata inside the ticket sidebar:")
    add_img("admin_ticket_details_sidebar.png", 4.5, 2.15)
    
    add_heading("4.4 Operations Control Dashboard", 2)
    add_para("The Operations Hub dashboard provides property managers with statistical counters, global search functionality, status filters, and priority tags to help manage incoming requests.")
    
    add_img("admin_dashboard_overview.png", 4.5, 2.15)
    Story.append(PageBreak())

    add_heading("4.5 Live Client-Side Synchronization (SSE)", 2)
    add_para("The Tenant Portal dashboard establishes a Server-Sent Events (SSE) connection to listen for updates. When a property manager updates a ticket's status, the change is streamed to the tenant's browser, updating the dashboard instantly without requiring a page reload.")
    
    add_img("tenant_dashboard_sse.png", 4.5, 2.15)
    Story.append(Spacer(1, 10))

    # --- Section 5: Key Engineering Solutions ---
    add_heading("5. Key Engineering Solutions & Fixes Implemented", 1)
    add_bullet("<b>EventSource Auto-Reconnection & Heartbeats:</b> To prevent routers and firewalls from dropping idle SSE streams, the server sends regular keep-alive pings. If a connection drops, the client automatically attempts to reconnect every 5 seconds, updating the status indicator to Reconnecting... during the downtime.")
    add_bullet("<b>Cross-App State Sync:</b> To avoid data drift between the admin and tenant applications, the Tenant Portal fetches all ticket data directly from the admin database using secure REST calls. This configuration creates a single source of truth for the system's data.")
    add_bullet("<b>Dynamic Image Scale & Pulsing Spinner:</b> Unified the loading screens across both applications to use a custom pulsing Adeer logo. Sizing class configurations use height-based scaling (h-5 w-auto) to preserve the logo's aspect ratio on different screen sizes.")

    doc.build(Story, canvasmaker=NumberedCanvas)
    print("ReportLab Specs PDF generated successfully!")

if __name__ == "__main__":
    create_specs_pdf()
