// Source of truth for the 15 NIS2 gap-assessment domains.
// Edit this file (not data/gap-assessment.json) and run
// `bun run build:json` to regenerate the published JSON artefact.
export const domains = [
    {
        id: 0,
        code: "SCOPE",
        name: { en: "Scoping & Registration", de: "Anwendungsbereich & Registrierung" },
        description: {
            en: "Before anything else: are you in scope, and have you registered?",
            de: "Zuallererst: Sind Sie betroffen, und haben Sie sich registriert?",
        },
        day: 1,
    },
    {
        id: 1,
        code: "GOV",
        name: { en: "Governance & Management Liability", de: "Governance & Geschäftsleitungshaftung" },
        description: {
            en: "The CEO is personally liable. This domain tests whether management knows, understands, and has acted.",
            de: "Die Geschäftsführung haftet persönlich. Dieser Bereich prüft, ob das Management informiert ist, die Pflichten versteht und gehandelt hat.",
        },
        day: 1,
    },
    {
        id: 2,
        code: "RISK",
        name: { en: "Risk Management", de: "Risikomanagement" },
        description: {
            en: "Do you know what you have, what can go wrong, and what you're doing about it?",
            de: "Wissen Sie, was Sie haben, was schiefgehen kann und was Sie dagegen tun?",
        },
        day: 2,
    },
    {
        id: 3,
        code: "INC",
        name: { en: "Incident Handling", de: "Vorfallbehandlung" },
        description: {
            en: "Can you detect, respond to, and report security incidents?",
            de: "Können Sie Sicherheitsvorfälle erkennen, darauf reagieren und sie melden?",
        },
        day: 3,
    },
    {
        id: 4,
        code: "BCP",
        name: { en: "Business Continuity", de: "Betriebskontinuität" },
        description: {
            en: "If your systems go down, can you keep your business running?",
            de: "Wenn Ihre Systeme ausfallen, können Sie den Geschäftsbetrieb aufrechterhalten?",
        },
        day: 3,
    },
    {
        id: 5,
        code: "SUP",
        name: { en: "Supply Chain Security", de: "Lieferkettensicherheit" },
        description: {
            en: "Are your suppliers secure, and can you prove your own security to your customers?",
            de: "Sind Ihre Lieferanten sicher, und können Sie Ihre eigene Sicherheit gegenüber Ihren Kunden nachweisen?",
        },
        day: 4,
    },
    {
        id: 6,
        code: "DEV",
        name: { en: "Secure Development & Procurement", de: "Sichere Entwicklung & Beschaffung" },
        description: {
            en: "Are you buying and building systems securely?",
            de: "Beschaffen und entwickeln Sie Systeme sicher?",
        },
        day: 5,
    },
    {
        id: 7,
        code: "EFF",
        name: { en: "Effectiveness Assessment", de: "Wirksamkeitsbewertung" },
        description: {
            en: "How do you know your security actually works?",
            de: "Woher wissen Sie, dass Ihre Sicherheitsmaßnahmen tatsächlich funktionieren?",
        },
        day: 5,
    },
    {
        id: 8,
        code: "TRN",
        name: { en: "Cyber Hygiene & Training", de: "Cyberhygiene & Schulungen" },
        description: {
            en: "Do your employees know how to stay safe online?",
            de: "Wissen Ihre Mitarbeiter, wie sie sich online sicher verhalten?",
        },
        day: 4,
    },
    {
        id: 9,
        code: "CRY",
        name: { en: "Cryptography", de: "Kryptografie" },
        description: {
            en: "Are you using encryption to protect data?",
            de: "Nutzen Sie Verschlüsselung zum Schutz Ihrer Daten?",
        },
        day: 5,
    },
    {
        id: 10,
        code: "ACC",
        name: { en: "Access Control", de: "Zugangskontrolle" },
        description: {
            en: "Who has access to what, and is it controlled?",
            de: "Wer hat Zugang wozu, und ist dieser kontrolliert?",
        },
        day: 4,
    },
    {
        id: 11,
        code: "COM",
        name: { en: "Secure Communications", de: "Sichere Kommunikation" },
        description: {
            en: "Can you communicate securely, especially during a crisis?",
            de: "Können Sie sicher kommunizieren, insbesondere während einer Krise?",
        },
        day: 5,
    },
    {
        id: 12,
        code: "NET",
        name: { en: "Network Security", de: "Netzwerksicherheit" },
        description: { en: "Are your networks protected?", de: "Sind Ihre Netzwerke geschützt?" },
        day: 5,
    },
    {
        id: 13,
        code: "PHY",
        name: { en: "Physical Security", de: "Physische Sicherheit" },
        description: { en: "Is your physical space secure?", de: "Sind Ihre Räumlichkeiten physisch gesichert?" },
        day: 4,
    },
    {
        id: 14,
        code: "EVD",
        name: { en: "Evidence & Documentation", de: "Nachweise & Dokumentation" },
        description: {
            en: "Can you prove all of the above to an auditor?",
            de: "Können Sie all das einem Prüfer nachweisen?",
        },
        day: 5,
    },
];
//# sourceMappingURL=domains.js.map