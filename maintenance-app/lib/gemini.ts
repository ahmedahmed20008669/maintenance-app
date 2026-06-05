import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function classifyMaintenanceRequest(description: string, images: string[] = []) {
  const prompt = `You are an AI assistant for a property management company. Analyze the following maintenance request (and any attached images) from a tenant and provide a structured classification.

Maintenance Request: "${description}"

Respond ONLY with a valid JSON object (no markdown, no code fences) with the following fields:
{
  "title": "a short concise 3-5 word title for the request",
  "category": "one of: Plumbing, Electrical, HVAC, Structural, Appliance, Pest Control, Cleaning, Security, Landscaping, General",
  "severity": "one of: Low, Medium, High, Critical",
  "priority": "a number from 1 (highest) to 5 (lowest)",
  "summary": "a brief professional summary of the issue (1-2 sentences, include details from images if present)",
  "actionSteps": ["step 1", "step 2", "step 3"],
  "estimatedCost": "estimated cost range like '$50-$150'"
}`

  try {
    const apiKey = process.env.GEMINI_API_KEY || '';
    
    const parts: any[] = [{ text: prompt }];
    images.forEach(img => {
      const matches = img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        parts.push({
          inlineData: {
            mimeType: matches[1],
            data: matches[2]
          }
        });
      }
    });

    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.1
        }
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Gemini API Error Response:', res.status, errorText);
      throw new Error(`Gemini API failed: ${res.status}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse the JSON response, stripping any markdown fences
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    
    return {
      title: parsed.title || 'Maintenance Request',
      category: parsed.category || 'General',
      severity: parsed.severity || 'Medium',
      priority: parsed.priority || 3,
      summary: parsed.summary || description,
      actionSteps: JSON.stringify(parsed.actionSteps || []),
      estimatedCost: parsed.estimatedCost || null,
      recommendedService: parsed.recommendedService || null,
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    return {
      title: 'Maintenance Request',
      category: 'General',
      severity: 'Medium',
      priority: 3,
      summary: description,
      actionSteps: JSON.stringify(['Review the request manually']),
      estimatedCost: null,
      recommendedService: null,
    }
  }
}

export async function generateCommunication(
  requestDetails: any,
  type: 'TENANT_UPDATE' | 'PROVIDER_MESSAGE'
) {
  let prompt = '';
  
  if (type === 'TENANT_UPDATE') {
    prompt = `You are an AI assistant for a property management company. Write a professional, empathetic, and concise update email to a tenant regarding their maintenance request.

Tenant Name: ${requestDetails.tenantName}
Request Category: ${requestDetails.category}
Current Status: ${requestDetails.status}
Summary of Issue: ${requestDetails.summary}

Draft the email. Do not include subject lines or markdown formatting, just the plain text message body. Ensure it is polite and reassuring.`;
  } else if (type === 'PROVIDER_MESSAGE') {
    prompt = `You are an AI assistant for a property management company. Write a professional and direct message to a service provider assigning them a task or asking for an update on a maintenance request.

Service Provider: ${requestDetails.assignedTo || 'Service Provider'}
Request Category: ${requestDetails.category}
Severity: ${requestDetails.severity}
Current Status: ${requestDetails.status}
Summary of Issue: ${requestDetails.summary}
Tenant Unit: ${requestDetails.tenantUnit || 'N/A'}

Draft the message. Keep it brief, action-oriented, and professional. Do not include subject lines or markdown formatting.`;
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || '';
    
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7
        }
      })
    });

    if (!res.ok) {
      throw new Error(`Gemini API failed: ${res.status}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return text.trim();
  } catch (error) {
    console.error('Gemini communication generation error:', error);
    return 'Failed to generate message. Please try again.';
  }
}

