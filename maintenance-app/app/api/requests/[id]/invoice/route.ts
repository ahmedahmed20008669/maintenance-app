import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { db } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Verify request exists
    const request = db.prepare('SELECT id FROM Request WHERE id = ?').get(id)
    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    const tempPdfPath = path.join(os.tmpdir(), `invoice-${id}-${Date.now()}.pdf`)
    const scriptPath = path.join(process.cwd(), 'generate_invoice.py')

    // Execute Python script to generate invoice
    await new Promise<void>((resolve, reject) => {
      exec(`python "${scriptPath}" "${id}" "${tempPdfPath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error('Python PDF generation failed:', stderr || stdout || error.message)
          reject(error)
        } else {
          resolve()
        }
      })
    })

    if (!fs.existsSync(tempPdfPath)) {
      throw new Error('PDF file was not created')
    }

    const pdfBuffer = fs.readFileSync(tempPdfPath)

    // Clean up temporary file
    try {
      fs.unlinkSync(tempPdfPath)
    } catch (err) {
      console.error('Failed to delete temporary invoice file:', err)
    }

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${id}.pdf"`,
        'Content-Length': pdfBuffer.length.toString()
      }
    })
  } catch (error) {
    console.error('Error generating PDF invoice endpoint:', error)
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 })
  }
}
