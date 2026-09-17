// AI Chat Service with multi-model cloud integration + intelligent local cultural knowledge engine

interface ChatMessage {
  role: "bot" | "user" | "system" | "assistant";
  content: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  varanasi: `🌸 **Varanasi (Kashi) — The City of Light & Moksha**

Varanasi is one of the world's oldest living cities, situated on the banks of the sacred Ganga.
• **Ganga Aarti:** Every evening at Dashashwamedh Ghat, priests perform a mesmerizing ritual with multi-tiered brass lamps, incense, and conch shells.
• **Kashi Vishwanath:** One of the twelve sacred Jyotirlingas, featuring a grand corridor uniting the temple directly with the river.
• **Heritage Looms:** Famous for pure silk Banarasi sarees hand-woven with gold and silver zari.
• **Dev Deepawali:** On Kartik Purnima, over 1 million earthen diyas light up all 84 ghats!

*Tip:* You can experience our 5-scene guided 3D tour of Varanasi in **Virtual Yatra**!`,

  agra: `🏛️ **Agra — Jewel of Mughal Architecture**

Agra is world-renowned for its sublime white marble monuments and rich artisan crafts:
• **The Taj Mahal:** Built by Emperor Shah Jahan in 1632 in flawless symmetrical Makrana marble.
• **Agra Fort:** The massive red sandstone seat of imperial Mughal rule overlooking the Yamuna.
• **Parchin Kari:** The 400-year-old craft of semi-precious stone inlay (Pietra Dura) in marble.
• **Agra Petha:** Traditional translucent candied ash gourd delicacy!`,

  jaipur: `🏰 **Jaipur — The Pink City of Rajasthan**

Jaipur is a UNESCO World Heritage planned city celebrated for Rajput valor and craftsmanship:
• **Hawa Mahal:** 5-story facade with 953 delicate honeycombed jharokhas for desert breezes.
• **Amber Fort:** Hilltop royal palace housing the luminous Sheesh Mahal (Hall of Mirrors).
• **Jantar Mantar:** 18th-century astronomical observatory with the world's largest stone sundial.
• **Artisan Crafts:** World-famous for Blue Pottery, Kundan jewelry, and Sanganeri block prints.`,

  udaipur: `🌊 **Udaipur — The Venice of the East**

Surrounded by the Aravalli Hills and sapphire waters:
• **City Palace:** Rajasthan's largest palace complex, built by 22 Maharanas over 400 years.
• **Lake Pichola:** Home to the floating white marble Taj Lake Palace (Jag Niwas) and Jag Mandir.
• **Living Arts:** Pichwai cloth paintings, miniature silk art, and evening folk dances.`,

  kerala: `🌴 **Kerala — God's Own Country**

Famous for backwaters, Ayurvedic wellness, and coastal heritage:
• **Backwaters of Alleppey:** Serene labyrinth of palm-fringed canals navigated by traditional thatched Kettuvallam houseboats.
• **Fort Kochi:** Historic spice trading port with 14th-century Chinese cantilevered fishing nets.
• **Kathakali:** Classical dance-drama with elaborate mineral makeup and dramatic facial mudras.
• **Sadya:** Royal multi-course vegetarian feast served on a fresh banana leaf.`,

  kolkata: `🎭 **Kolkata — The City of Joy & Cultural Soul**

The epicenter of Indian literature, theater, art, and intellectual life:
• **Durga Puja:** UNESCO Intangible Cultural Heritage festival transforming the city into an open-air art gallery.
• **Kumartuli:** 300-year-old potter quarter where master craftsmen sculpt holy river clay into idols.
• **Victoria Memorial:** Monumental white marble palace with landscaped gardens.
• **Bengali Sweets:** Famous for melt-in-mouth Rosogolla, Sandesh, and sweet Mishti Doi.`,

  kutch: `🦁 **Rann of Kutch — The Great White Desert**

One of the world's largest salt deserts:
• **White Rann:** Endless white salt crust reflecting silver brilliance under the full moon.
• **Rogan Art:** 400-year-old rare painting technique using boiled castor oil preserved by the Khatri family of Nirona.
• **Lippan Kaam:** Traditional mud-and-mirror relief murals adorning Kutchi Bhunga huts.`,

  ayodhya: `🛕 **Ayodhya — The Sacred Abode of Dharma**

Situated on the holy Sarayu River:
• **Shri Ram Janmabhoomi Mandir:** Built in classical Nagara style without structural iron or steel.
• **Deepotsav:** Millions of glowing clay lamps floating across Ram ki Paidi setting global records.
• **Hanuman Garhi:** 10th-century hill fortress temple guarding the sacred city.`,

  lucknow: `✨ **Lucknow — The Royal City of Awadhi Tehzeeb**

The capital of refined etiquette, poetry, and culinary excellence:
• **Bara Imambara:** Pillarless vaulted arched hall featuring the acoustic Bhool Bhulaiya labyrinth.
• **Chikankari:** Delicate shadow needlework hand-embroidered on fine muslin and silk.
• **Dum Pukht Cuisine:** World-famous slow-cooked Awadhi Biryani and melt-in-mouth Galouti Kebabs.`,

  madurai: `🛕 **Madurai — The Ancient Lotus City**

One of South Asia's oldest living civilizational centers:
• **Meenakshi Amman Temple:** Crowned by 14 soaring gopurams encrusted with 33,000 brightly painted sculptures.
• **Hall of 1,000 Pillars:** Stone carved mandapam with musical pillars emitting melodious notes when tapped.
• **Madurai Malli:** Exquisite GI-tagged Jasmine flowers and rich Jigarthanda beverage.`,

  yatra: `🗺️ **BharatVerse Virtual Yatra Guide**

Virtual Yatra allows you to virtually tour India's most iconic destinations:
1. **Select a State:** Explore states via the interactive map on the Virtual Yatra page.
2. **Choose a Destination:** Pick places like Varanasi, Agra, Jaipur, Kochi, Kolkata, or Kutch.
3. **Launch Guided Tour:** Click **"Begin Virtual Tour"** to travel through 5 interactive 3D scenes.
4. **Immersive Mode:** Click **"Enter Immersive Mode"** for a full-screen experience with keyboard controls!
5. **Save to My Yatra:** Click the **❤️ Save** button to save places to your personal journey tracker.`,

  my_yatra: `❤️ **My Yatra (Saved Journeys)**

You can bookmark your favorite cultural destinations across India!
• Log in to your BharatVerse account.
• Click **"♡ Save to My Yatra"** on any destination card or tour page.
• Visit **/my-yatra** anytime from the top navigation to view your saved bucket list and resume guided tours!`,

  admin: `🛡️ **Admin Dashboard**

If your account has the **Admin / Creator** role:
1. Navigate to **/admin** from the top right navigation.
2. **My Content Tab:** Add, edit, or delete regional cultural articles, reels, and craft products.
3. **Virtual Yatra Tab:** Create new destinations, manage panoramic scenes, and edit cultural facts!
4. **Subscribers Tab:** Track supporters who subscribe (CatchUp) to your cultural creations.`,

  cart: `🛒 **Shopping & Cart on BharatVerse**

• Explore any state page and select a category (e.g., Handicrafts, Food).
• Click **"Add to Cart"** on authentic artisan products.
• Visit **/cart** to view items, modify quantities, and place your order.`,

  catchup: `⚡ **CatchUp (Subscriptions)**

CatchUp lets you support your favorite regional cultural creators directly and unlock exclusive behind-the-scenes content, recipes, and folk dance workshops!`,

  support: `📞 **BharatVerse Customer Care**

We're always here to assist you!
• **Email Support:** support@bharatverse.com
• **Toll-Free:** 1800-BHARAT-CARE (9 AM – 9 PM IST)
• **Returns Policy:** Returns and exchanges are accepted within 7 days of delivery.`
};

export const getAiResponse = async (
  userMessage: string,
  history: { role: string; text: string }[] = []
): Promise<string> => {
  const q = userMessage.toLowerCase().trim();

  // Try Cloud Groq API first with fast timeout
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    const models = ["llama-3.3-70b-versatile", "llama3-8b-8192", "mixtral-8x7b-32768", "gemma2-9b-it"];
    for (const model of models) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "system",
                content:
                  "You are BharatVerse AI Assistant & Cultural Guide. Provide inspiring, concise, friendly answers about Indian culture, monuments, temples, handicrafts, food, and BharatVerse features. Use emojis."
              },
              ...history.slice(-4).map(m => ({
                role: m.role === "bot" ? "assistant" : "user",
                content: m.text
              })),
              { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 600
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply && reply.trim()) {
            return reply.trim();
          }
        }
      } catch (e) {
        // Continue to fallback model or knowledge base
      }
    }
  }

  // Knowledge Engine Fallback: Match keywords accurately
  if (q.includes("varanasi") || q.includes("kashi") || q.includes("banaras") || q.includes("ganga aarti") || q.includes("ghat")) {
    return KNOWLEDGE_BASE.varanasi;
  }
  if (q.includes("agra") || q.includes("taj mahal") || q.includes("tajmahal") || q.includes("fatehpur")) {
    return KNOWLEDGE_BASE.agra;
  }
  if (q.includes("jaipur") || q.includes("pink city") || q.includes("hawa mahal") || q.includes("amber fort") || q.includes("rajasthan")) {
    return KNOWLEDGE_BASE.jaipur;
  }
  if (q.includes("udaipur") || q.includes("lake pichola") || q.includes("city palace") || q.includes("lake palace")) {
    return KNOWLEDGE_BASE.udaipur;
  }
  if (q.includes("kerala") || q.includes("kochi") || q.includes("cochin") || q.includes("alleppey") || q.includes("alappuzha") || q.includes("backwater") || q.includes("kathakali")) {
    return KNOWLEDGE_BASE.kerala;
  }
  if (q.includes("kolkata") || q.includes("calcutta") || q.includes("west bengal") || q.includes("bengal") || q.includes("durga puja") || q.includes("victoria memorial") || q.includes("kumartuli")) {
    return KNOWLEDGE_BASE.kolkata;
  }
  if (q.includes("kutch") || q.includes("gujarat") || q.includes("white desert") || q.includes("rann") || q.includes("rogan") || q.includes("garba")) {
    return KNOWLEDGE_BASE.kutch;
  }
  if (q.includes("ayodhya") || q.includes("ram mandir") || q.includes("sarayu") || q.includes("deepotsav")) {
    return KNOWLEDGE_BASE.ayodhya;
  }
  if (q.includes("lucknow") || q.includes("awadh") || q.includes("imambara") || q.includes("chikan") || q.includes("kebab")) {
    return KNOWLEDGE_BASE.lucknow;
  }
  if (q.includes("madurai") || q.includes("meenakshi") || q.includes("tamil") || q.includes("tamil nadu") || q.includes("chola") || q.includes("thanjavur")) {
    return KNOWLEDGE_BASE.madurai;
  }
  if (q.includes("yatra") || q.includes("virtual tour") || q.includes("tour") || q.includes("explore") || q.includes("3d") || q.includes("panorama") || q.includes("immersive")) {
    return KNOWLEDGE_BASE.yatra;
  }
  if (q.includes("my yatra") || q.includes("save") || q.includes("bookmark") || q.includes("favorite")) {
    return KNOWLEDGE_BASE.my_yatra;
  }
  if (q.includes("admin") || q.includes("add content") || q.includes("creator") || q.includes("publish")) {
    return KNOWLEDGE_BASE.admin;
  }
  if (q.includes("cart") || q.includes("buy") || q.includes("shop") || q.includes("order") || q.includes("price")) {
    return KNOWLEDGE_BASE.cart;
  }
  if (q.includes("catchup") || q.includes("subscribe") || q.includes("subscriber") || q.includes("creator")) {
    return KNOWLEDGE_BASE.catchup;
  }
  if (q.includes("help") || q.includes("support") || q.includes("contact") || q.includes("refund") || q.includes("return") || q.includes("shipping")) {
    return KNOWLEDGE_BASE.support;
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("namaste") || q.includes("hey")) {
    return `Namaste! 🙏 Welcome to BharatVerse. 

I can guide you through:
• 🗺️ **Virtual Yatra:** 3D tours of Varanasi, Taj Mahal, Jaipur, Kerala Backwaters & more!
• 🛕 **Indian Heritage:** Temples, monuments, history, and classical arts.
• 🎨 **Handicrafts & Delicacies:** Regional treasures and recipes.
• 🛍️ **Platform Support:** Cart, subscriptions (CatchUp), and Admin tools.

What would you like to explore today?`;
  }

  // Default intelligent assistant response
  return `Namaste! 🙏 Regarding **"${userMessage}"**:

BharatVerse connects you with India's living cultural heritage across all 36 states and union territories. You can experience multi-scene 3D guided tours, explore regional handicrafts and authentic recipes, or bookmark your favorite heritage spots into **My Yatra**.

Feel free to ask me about specific destinations (like *Varanasi, Agra, Jaipur, Kerala, Kolkata, Kutch*), temple histories, or how to use any BharatVerse feature! ✨`;
};
