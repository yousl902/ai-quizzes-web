const siteInfo = {
    title: "HögskoleprovetQuizes",
    logo: "/Mind_Swarm_Logo.png", // path relative to /public
    info: {
        contact: {
            email: "info@studycomb.se",
            telephoneTimes: "Telefontid vardagar",
            timeStamp: "09:00 - 17:00",
            more: "Vi strävar efter att besvara alla förfrågningar inom 24 timmar. Tveka inte att höra av dig om du har några frågor eller funderingar.",
        },
        FAQ: {
            faqItems: [
                {
                question: "Kan jag använda era quiz offline?",
                answer: "Just nu är våra quizer enbart tillgängliga online."
                },
                {
                question: "Vad kostar tjänsten?",
                answer: "Tjänsten är kostnadsfri."
                },
                {
                question: "Har ni olika delarfrån Högskoleprovet?",
                answer: "Ja, vi har quizer från alla delar av Högskoleprovet."
                }
          ]
        },
        about: [
            "Vi är ett team av passionerade individer som strävar efter att göra lärande roligt och effektivt. Vår resa började i ett litet studentrum, där vi insåg att studier ibland kan vara monotona.",
            "Därför skapade vi en plattform som kombinerar interaktivt lärande med den senaste AI-tekniken för att generera quizfrågor.",
            "Vår ambition är att låta varje användare personifiera sin studieupplevelse, dela material med andra och tillsammans göra lärandet mer dynamiskt. Med ett starkt community i ryggen fortsätter vi att utveckla nya funktioner och förbättra vår tjänst.",
            // Add more paragraphs as needed
        ],                  
    },
    quizMenuContent: {
        verbala: {
            label: "Verbala Uppgifter",
            items: [
                {
                    title: "ORD, ordförståelse",
                    link: "/info",
                },
                {
                    title: "LÄS, svensk läsförståelse",
                    content: "Tyvärr ej tillgänglig för tillfället",
                },
                {
                    title: "MEK, meningskomplettering",
                    content: "Tyvärr ej tillgänglig för tillfället",
                },
                {
                    title: "ELF, Engelsk läsförståelse",
                    content: "Tyvärr ej tillgänglig för tillfället",
                },
            ],
        },
        kvantitativa: {
            label: "Kvantitativa Uppgifter",
            items: [
                {
                    title: "XYZ, matematisk problemlösning",
                    content: "Tyvärr ej tillgänglig för tillfället",
                },
                {
                    title: "KVA, kvantitativa jämförelser",
                    content: "Tyvärr ej tillgänglig för tillfället",
                },
                {
                    title: "NOG, kvantitativa resonemang",
                    content: "Tyvärr ej tillgänglig för tillfället",
                },
                {
                    title: "DTK, diagram, tabeller och kartor",
                    content: "Tyvärr ej tillgänglig för tillfället",
                },
            ],
        },
    },
    footerText: "© 2025 MindSwarm. All rights reserved.",
  }

  
  
  export default siteInfo