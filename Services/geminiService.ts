import { GoogleGenAI, Type } from "@google/genai";
import { Internship, UserProfile } from '../types';

// According to guidelines, API key must be from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const getInternshipRecommendations = async (
  profile: UserProfile,
  internships: Internship[]
): Promise<number[]> => {
  const prompt = `
    Based on the following user profile, please recommend the top 5 most suitable internships from the provided list.
    User Profile:
    - Education: ${profile.education}
    - Location: ${profile.location}
    - Skills: ${profile.skills}
    - Interests: ${profile.interests}

    Internship List (JSON format):
    ${JSON.stringify(internships.map(({ id, title, description, requiredSkills, sector, location }) => ({ id, title, description, requiredSkills, sector, location })), null, 2)}

    Your task is to return a JSON object containing a single key "recommended_ids", which is an array of the top 5 recommended internship IDs.
    The order of the IDs in the array should be from most to least recommended.
    Consider the user's skills, interests, and location when making recommendations. Match required skills with user skills, and user interests with internship sector and description. Give some preference to internships in or near the user's location.
    Do not add any explanation, just return the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommended_ids: {
              type: Type.ARRAY,
              items: {
                type: Type.NUMBER,
              },
              description: 'Array of top 5 recommended internship IDs.',
            },
          },
        },
      },
    });

    const responseText = response.text.trim();
    const result = JSON.parse(responseText);
    
    if (result && result.recommended_ids && Array.isArray(result.recommended_ids)) {
      return result.recommended_ids.slice(0, 5);
    }
    
    console.error('Unexpected response format from Gemini API:', result);
    return [];
  } catch (error) {
    console.error('Error fetching internship recommendations:', error);
    // Graceful fallback: return empty array on error
    return [];
  }
};
