import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function classifyMaintenanceRequest(description: string, images: string[] = []) {
  const prompt = `You are an AI assistant for a property management company. Analyze the following maintenance request (and any attached images) from a tenant and provide a structured classification.

Maintenance Request: "${description}"

Respond ONLY with a valid JSON object (no markdown, no code fences) with the following fields:
{
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
