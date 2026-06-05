import os
import sys
import sqlite3
import json
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

# Define Palette (Adeer International Branding Colors matching the app design system)
COLOR_DARK_BG = colors.HexColor('#0f131a')      # Primary dark background
COLOR_TEAL = colors.HexColor('#0099ad')         # Primary accent
COLOR_MUTED = colors.HexColor('#b5b5b5')        # Secondary text color
COLOR_CARD_BG = colors.HexColor('#1a1f29')      # Card background color
COLOR_BORDER = colors.HexColor('#2e3342')       # Border color
COLOR_WHITE = colors.HexColor('#ffffff')        # White text/elements
COLOR_TEXT_MAIN = colors.HexColor('#d1d5db')    # Main gray text

class NumberedCanvas(canvas.Canvas):
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
        self.saveState()
        # Header border & text
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(COLOR_TEAL)
        self.drawString(54, 11 * inch - 36, "ADEER MAINTENANCE-AI PORTAL")
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_MUTED)
        self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "OFFICIAL MAINTENANCE INVOICE")
        
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)
        self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)

        # Footer border & text
        self.line(54, 50, 8.5 * inch - 54, 50)
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_MUTED)
        self.drawString(54, 38, "Adeer International Properties & Maintenance AI Division")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 38, page_str)
        self.restoreState()

def generate_invoice_pdf(request_id, output_path):
    # Connect to database
    db_path = os.path.join(os.path.dirname(__file__), 'prisma', 'dev.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM Request WHERE id = ?', (request_id,))
    row = cursor.fetchone()
    
    if not row:
        print(f"Error: Request with ID {request_id} not found.")
        sys.exit(1)
        
    req = dict(row)
    conn.close()

    # Parse JSON fields
    try:
        action_steps = json.loads(req['actionSteps'])
    except Exception:
        action_steps = []
        
    try:
        logs = json.loads(req['updatesLog'])
    except Exception:
        logs = []

    # ReportLab document setup
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles matching corporate brand
    style_title = ParagraphStyle(
        name='InvoiceTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=COLOR_TEAL,
        spaceAfter=5
    )
    style_subtitle = ParagraphStyle(
        name='InvoiceSubtitle',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=COLOR_MUTED,
        spaceAfter=20
    )
    style_h2 = ParagraphStyle(
        name='SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=COLOR_TEAL,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )
    style_body = ParagraphStyle(
        name='MainBody',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=COLOR_TEXT_MAIN,
        spaceAfter=8
    )
    style_body_bold = ParagraphStyle(
        name='MainBodyBold',
        parent=style_body,
        fontName='Helvetica-Bold'
    )
    style_bullet = ParagraphStyle(
        name='BulletStyle',
        parent=style_body,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    story = []

    # Logo / Brand Header Row
    logo_path = os.path.join(os.path.dirname(__file__), 'public', 'adeer-logo.png')
    
    header_data = []
    if os.path.exists(logo_path):
        from reportlab.platypus import Image as RLImage
        logo_img = RLImage(logo_path, width=1.1*inch, height=0.45*inch)
        header_data = [[logo_img, Paragraph("MAINTENANCE INVOICE", style_title)]]
    else:
        header_data = [[Paragraph("<b>adeer</b>", style_title), Paragraph("MAINTENANCE INVOICE", style_title)]]
        
    header_table = Table(header_data, colWidths=[2.5*inch, 4.0*inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 15))

    # Invoice Details Grid
    details_data = [
        [
            Paragraph("<b>Invoice To:</b>", style_body_bold),
            Paragraph("<b>Ticket Reference:</b>", style_body_bold)
        ],
        [
            Paragraph(f"Name: {req['tenantName']}<br/>Unit: {req['tenantUnit'] or 'N/A'}<br/>Email: {req['tenantEmail'] or 'N/A'}", style_body),
            Paragraph(f"Ticket ID: #{req['id'].slice(-6).toUpperCase() if hasattr(req['id'], 'slice') else req['id'][:8].upper()}<br/>Created: {req['createdAt']}<br/>Status: <b>{req['status']}</b>", style_body)
        ]
    ]
    details_table = Table(details_data, colWidths=[3.25*inch, 3.25*inch])
    details_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(details_table)
    story.append(Spacer(1, 15))

    # 1. Summary Block
    story.append(Paragraph("AI-Generated Maintenance Summary", style_h2))
    story.append(Paragraph(req['summary'] or "No summary generated.", style_body))
    story.append(Spacer(1, 10))

    # 2. Required to be Fixed (Original Issue / Initial Request)
    story.append(Paragraph("Reported Problem", style_h2))
    story.append(Paragraph(req['rawInput'], style_body))
    story.append(Spacer(1, 10))

    # 3. Action Steps / Tasks Checklist
    if action_steps:
        story.append(Paragraph("Required Remediation & Action Steps", style_h2))
        for idx, step in enumerate(action_steps):
            story.append(Paragraph(f"• &nbsp; {step}", style_bullet))
        story.append(Spacer(1, 10))

    # 4. updates timeline history
    if len(logs) > 1:
        story.append(Paragraph("Ticket Update History Timeline", style_h2))
        for idx, log in enumerate(logs):
            log_date = log['timestamp'].split('T')[0]
            prefix = "Initial Description" if idx == 0 else f"Update Entry #{idx}"
            story.append(Paragraph(f"<b>{log_date} - {prefix}:</b> {log['text']}", style_bullet))
        story.append(Spacer(1, 10))

    # 5. Price Tag & Totals Table
    story.append(Paragraph("Cost Breakdown & Price Estimation", style_h2))
    
    price_tag = req['estimatedCost'] or "$0.00"
    
    cost_data = [
        [Paragraph("<b>Line Item Description</b>", style_body_bold), Paragraph("<b>Category</b>", style_body_bold), Paragraph("<b>Estimated Cost Range</b>", style_body_bold)],
        [Paragraph(f"Facility repair and parts procurement: {req['title'] or req['category'] + ' Issue'}", style_body), Paragraph(req['category'], style_body), Paragraph(f"<b>{price_tag}</b>", style_body_bold)],
    ]
    cost_table = Table(cost_data, colWidths=[3.5*inch, 1.5*inch, 1.5*inch])
    cost_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_DARK_BG),
        ('TEXTCOLOR', (0,0), (-1,0), COLOR_WHITE),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [COLOR_CARD_BG]),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(cost_table)
    story.append(Spacer(1, 25))

    # Official Signature Footer
    sig_data = [
        [Paragraph("Prepared by: Adeer MaintenanceAI Agent", style_subtitle), Paragraph("Authorized Signature: _______________________", style_subtitle)]
    ]
    sig_table = Table(sig_data, colWidths=[3.25*inch, 3.25*inch])
    sig_table.setStyle(TableStyle([
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
    ]))
    story.append(sig_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python generate_invoice.py <id> <output_path>")
        sys.exit(1)
        
    generate_invoice_pdf(sys.argv[1], sys.argv[2])
