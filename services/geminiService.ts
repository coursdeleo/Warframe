import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWarframeContent = async (topic: string, type: 'lore' | 'update'): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  let prompt = "";
  if (type === 'lore') {
    prompt = `En tant qu'expert du lore de Warframe (Jeu Vidéo), génère une théorie fascinante, sombre et mystérieuse sur le sujet suivant : "${topic}". 
    Utilise le ton cryptique d'un Albrecht Entrati ou d'un Cephalon. Fais des liens avec le Néant (Void), l'Homme dans le Mur (Man in the Wall), ou les futures mises à jour comme Warframe 1999.
    Reste concis (maximum 150 mots). Format brut, pas de markdown complexe.`;
  } else {
    prompt = `En tant que développeur de Warframe, imagine une fonctionnalité ou un contenu futur pour une mise à jour sur le thème : "${topic}".
    Décris les mécaniques de jeu potentielles, les nouvelles Warframes ou les armes.
    Reste concis (maximum 150 mots). Format brut.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "Erreur lors de la génération du contenu. Le Néant est silencieux...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connexion au Néant interrompue. Veuillez réessayer.";
  }
};
