import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
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
            self.setFillColor(COLOR_DARK_BG)
            self.rect(0, 0, 8.5 * inch, 11 * inch, fill=True, stroke=False)
            
            # Teal stripes at top and bottom
            self.setFillColor(COLOR_TEAL)
            self.rect(0, 0, 8.5 * inch, 0.25 * inch, fill=True, stroke=False)
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
        self.drawString(40, 32, "Confidential - MaintenanceAI Solution Overview")
        
        # Standard Page numbering: "Page X of Y"
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 32, page_str)
        self.restoreState()

def create_solution_overview_pdf():
    doc = SimpleDocTemplate("Solution_Overview.pdf", pagesize=letter,
                            rightMargin=50, leftMargin=50, topMargin=95, bottomMargin=50)
    styles = getSampleStyleSheet()
    
    # Custom Cover Styles
    cover_title_style = ParagraphStyle(
        'CoverTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=24, leading=30, textColor=COLOR_TEAL, alignment=0, spaceAfter=20
    )
    cover_subtitle_style = ParagraphStyle(
        'CoverSubtitle', parent=styles['Heading2'], fontName='Helvetica', fontSize=14, leading=18, textColor=COLOR_WHITE, alignment=0, spaceAfter=40
    )
    cover_meta_style = ParagraphStyle(
        'CoverMeta', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=15, textColor=COLOR_MUTED, alignment=0, spaceAfter=10
    )
    
    # Standard styles
    heading1_style = ParagraphStyle(
        'Heading1', parent=styles['Heading1'], fontSize=16, leading=20, spaceAfter=12, spaceBefore=18, textColor=COLOR_TEAL
    )
    heading2_style = ParagraphStyle(
        'Heading2', parent=styles['Heading2'], fontSize=12, leading=16, spaceAfter=8, spaceBefore=12, textColor=COLOR_TEAL
    )
    body_style = ParagraphStyle(
        'BodyText', parent=styles['Normal'], fontSize=10, leading=14.5, spaceAfter=8, textColor=COLOR_BODY_TEXT
    )
    body_bold_style = ParagraphStyle(
        'BodyTextBold', parent=body_style, fontName='Helvetica-Bold'
    )
    bullet_style = ParagraphStyle(
        'Bullet', parent=styles['Normal'], fontSize=10, leading=14.5, spaceAfter=6, leftIndent=20, bulletIndent=10, textColor=COLOR_BODY_TEXT
    )
    
    table_header_style = ParagraphStyle(
        'TableHeader', parent=styles['Normal'], fontSize=9.5, leading=12, fontName='Helvetica-Bold', textColor=COLOR_WHITE
    )
    table_body_style = ParagraphStyle(
        'TableBody', parent=styles['Normal'], fontSize=9, leading=12, textColor=COLOR_TEXT_MAIN
    )

    Story = []

    def add_heading(text, level=1):
        if level == 1:
            Story.append(Paragraph(text, heading1_style))
        elif level == 2:
            Story.append(Paragraph(text, heading2_style))
        Story.append(Spacer(1, 4))

    def add_para(text):
        Story.append(Paragraph(text, body_style))
        Story.append(Spacer(1, 4))

    def add_bullet(text):
        Story.append(Paragraph(f"• {text}", bullet_style))

    # --- Cover Page ---
    Story.append(Spacer(1, 150))
    Story.append(Paragraph("MAINTENANCE-AI", cover_title_style))
    Story.append(Paragraph("<b>The Paradigm Shift in Smart Property Operations & Maintenance Systems — Solution Overview and Product Specifications</b>", cover_subtitle_style))
    Story.append(Spacer(1, 80))
    
    Story.append(Paragraph("<b>Author:</b> Adeer International Engineering & Products Group", cover_meta_style))
    Story.append(Paragraph("<b>Target Audience:</b> Property Managers, Asset Owners, Operations Directors", cover_meta_style))
    Story.append(Paragraph("<b>Date:</b> June 2026", cover_meta_style))
    Story.append(Paragraph("<b>Classification:</b> Confidential / Solution Overview", cover_meta_style))
    Story.append(PageBreak())

    # --- Section 1: Problem Statement ---
    add_heading("1. Problem Statement", 1)
    add_para("Property management companies face significant challenges in handling maintenance requests:")
    add_bullet("<b>Manual Coordination:</b> Requests come in via phone, email, or in-person, requiring property managers to manually classify, prioritize, and dispatch service providers.")
    add_bullet("<b>Delayed Response Times:</b> Without automated triage, critical issues (e.g., gas leaks, flooding) may sit in the same queue as minor issues (e.g., a loose doorknob).")
    add_bullet("<b>Poor Visibility:</b> Tenants lack real-time visibility into the status of their requests, leading to frustration and repeat contacts.")
    add_bullet("<b>High Overhead:</b> Property managers spend excessive time on administrative tasks instead of strategic decision-making.")
    Story.append(Spacer(1, 10))

    # --- Section 2: Solution ---
    add_heading("2. The MaintenanceAI Solution", 1)
    add_para("<b>MaintenanceAI</b> is an AI-powered maintenance request management system that automates the entire lifecycle of a maintenance request — from submission to resolution. The system uses Google's Gemini AI to analyze natural language descriptions from tenants and automatically:")
    add_bullet("<b>Classify:</b> categorizes the issue into one of 10 types (Plumbing, Electrical, HVAC, Structural, etc.).")
    add_bullet("<b>Assess Severity:</b> calculates risk level dynamically (Low, Medium, High, Critical).")
    add_bullet("<b>Assign Priority:</b> sorts urgency level from 1 (highest) to 5 (lowest).")
    add_bullet("<b>Generate Remediation Plans:</b> provides interactive technical resolution checklists.")
    add_bullet("<b>Predictive Cost:</b> estimates expected repair cost range for budget approvals.")
    add_bullet("<b>Automated Routing:</b> immediately assigns the ticket to targeted service providers.")
    Story.append(Spacer(1, 10))

    # --- Section 3: Target Users ---
    add_heading("3. Target Users & System Benefits", 1)
    
    users_data = [
        [Paragraph("<b>Role</b>", table_header_style), Paragraph("<b>How They Use MaintenanceAI</b>", table_header_style)],
        [Paragraph("<b>Tenants</b>", table_body_style), Paragraph("Submit maintenance requests in plain language. Receive instant confirmation with AI-generated ticket details and real-time status updates.", table_body_style)],
        [Paragraph("<b>Property Managers</b>", table_body_style), Paragraph("Use the Operations Dashboard to view, filter, assign, and manage all requests. Monitor critical issues with priority-based views.", table_body_style)],
        [Paragraph("<b>Service Providers</b>", table_body_style), Paragraph("Receive automated assignment notifications with issue details, severity, and recommended action steps.", table_body_style)]
    ]
    users_table = Table(users_data, colWidths=[2.0*inch, 4.5*inch])
    users_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_DARK_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [COLOR_CARD_BG]),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    Story.append(users_table)
    Story.append(Spacer(1, 15))

    # --- Section 4: Key Features ---
    add_heading("4. Key Features & Integrations", 1)
    
    add_heading("4.1 Natural Language Request Submission & Multi-Modal Support", 2)
    add_para("Tenants describe their issue in their own words and can upload images. The AI handles the rest, analyzing both text and attached visual evidence to get accurate context.")
    
    add_heading("4.2 AI-Powered Classification & Prioritization", 2)
    add_para("Using Google Gemini, the system extracts structured data from unstructured text and images, filling in the category, severity level, priority metrics, action steps, and cost estimate dynamically.")
    
    add_heading("4.3 Operations Dashboard & Invoice Generation", 2)
    add_para("A comprehensive, real-time dashboard for property managers featuring summary statistics cards, search and multi-filtering, detailed request logs, automated PDF invoice generation, and one-click status updates.")
    
    add_heading("4.4 Automated Communication & Ticket Updates", 2)
    add_para("The system automatically tracks communication between tenants and admins. When comments are posted, the system preserves history logs and automatically triggers Gemini to regenerate issue summaries.")
    Story.append(PageBreak())

    # --- Section 5: AI Capabilities Table ---
    add_heading("5. AI Capabilities & Architecture Specifications", 1)
    
    capabilities_data = [
        [Paragraph("<b>Capability</b>", table_header_style), Paragraph("<b>Description</b>", table_header_style)],
        [Paragraph("Multi-Modal Analysis", table_body_style), Paragraph("Processes free-form text and images to extract structured maintenance data.", table_body_style)],
        [Paragraph("Multi-label Classification", table_body_style), Paragraph("Simultaneously determines category, severity, and priority.", table_body_style)],
        [Paragraph("Summarization", table_body_style), Paragraph("Converts informal language and history logs into professional issue summaries.", table_body_style)],
        [Paragraph("Action Recommendation", table_body_style), Paragraph("Generates step-by-step resolution plans.", table_body_style)],
        [Paragraph("Cost Estimation", table_body_style), Paragraph("Provides estimated repair cost ranges for billing.", table_body_style)]
    ]
    capabilities_table = Table(capabilities_data, colWidths=[2.0*inch, 4.5*inch])
    capabilities_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_DARK_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [COLOR_CARD_BG]),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    Story.append(capabilities_table)
    Story.append(Spacer(1, 15))

    # --- Section 6: Technology Stack ---
    add_heading("6. Technology Stack", 1)
    
    stack_data = [
        [Paragraph("<b>Layer</b>", table_header_style), Paragraph("<b>Technology</b>", table_header_style)],
        [Paragraph("Frontend", table_body_style), Paragraph("Next.js 16 (App Router), React, Tailwind CSS", table_body_style)],
        [Paragraph("Backend", table_body_style), Paragraph("Next.js API Routes (server-side)", table_body_style)],
        [Paragraph("Database", table_body_style), Paragraph("SQLite via Prisma ORM", table_body_style)],
        [Paragraph("AI Engine", table_body_style), Paragraph("Google Gemini 2.0 Flash", table_body_style)],
        [Paragraph("Deployment", table_body_style), Paragraph("Fly.io (Containerized Docker deployment with persistent volumes)", table_body_style)],
        [Paragraph("Document Generation", table_body_style), Paragraph("Python (ReportLab) & jsPDF", table_body_style)]
    ]
    stack_table = Table(stack_data, colWidths=[2.0*inch, 4.5*inch])
    stack_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_DARK_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [COLOR_CARD_BG]),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    Story.append(stack_table)
    Story.append(Spacer(1, 15))

    # --- Section 7: Business Impact ---
    add_heading("7. Expected Business Impact", 1)
    add_bullet("<b>95% faster classification:</b> AI processes requests in seconds vs. minutes of manual review.")
    add_bullet("<b>60% cost reduction:</b> Reduced administrative overhead and faster issue resolution.")
    add_bullet("<b>24/7 availability:</b> Tenants can submit requests anytime, AI classifies immediately.")
    add_bullet("<b>Improved tenant satisfaction:</b> Real-time visibility and faster response times.")
    add_bullet("<b>Data-driven decisions:</b> Dashboard analytics help managers identify recurring issues.")
    Story.append(Spacer(1, 10))

    # --- Section 8: Future Enhancements ---
    add_heading("8. Future Enhancements", 1)
    add_bullet("<b>Predictive Maintenance:</b> Use historical data to predict and prevent common issues.")
    add_bullet("<b>Multi-language Support:</b> Leverage AI for automatic translation of requests.")
    add_bullet("<b>Integration with IoT:</b> Connect smart building sensors for automatic issue detection.")
    add_bullet("<b>Mobile App:</b> React Native companion app for tenants and service providers.")

    doc.build(Story, canvasmaker=NumberedCanvas)
    print("Solution Overview PDF generated successfully via ReportLab!")

if __name__ == "__main__":
    create_solution_overview_pdf()
