import nodemailer from "nodemailer"

// Créer un transporteur SMTP réutilisable
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true
  }
})

export async function sendContactEmail({ 
  artisanEmail, 
  clientName, 
  clientEmail,
  clientPhone,
  projectType,
  projectDescription,
  urgency,
  preferredContact,
}: {
  artisanEmail: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  projectType?: string
  projectDescription?: string
  urgency: string
  preferredContact: string
}) {
  const urgencyMap = {
    immediate: "Urgent",
    within_week: "Cette semaine",
    within_month: "Ce mois-ci",
    no_rush: "Pas pressé",
  }



  // Extraire le nom du couvreur de son email et le formater
  const artisanName = artisanEmail.split('@')[0]
                                .split(/[._-]/)
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')

  // Email à l'artisan
  await transporter.sendMail({
    from: `"Couvreurs App" <${process.env.SMTP_USER}>`, // On utilise toujours le SMTP authentifié
    replyTo: clientEmail, // Le client peut répondre directement
    to: artisanEmail,
    subject: `Nouvelle demande de devis de ${clientName}`,
    html: `
      <h1>Nouvelle demande de devis</h1>
      
      <h2>Informations client</h2>
      <ul>
        <li><strong>Nom :</strong> ${clientName}</li>
        <li><strong>Email :</strong> ${clientEmail}</li>
        ${clientPhone ? `<li><strong>Téléphone :</strong> ${clientPhone}</li>` : ""}
      </ul>

      <h2>Détails du projet</h2>
      <ul>
        ${projectType ? `<li><strong>Type de projet :</strong> ${projectType}</li>` : ""}
        <li><strong>Urgence :</strong> ${urgencyMap[urgency as keyof typeof urgencyMap]}</li>
        <li><strong>Contact préféré :</strong> ${preferredContact}</li>
      </ul>

      ${projectDescription ? `
      <h2>Description du projet</h2>
      <p>${projectDescription}</p>
      ` : ""}

      <p>Vous pouvez répondre directement à cet email pour contacter le client.</p>
    `,
  })

  // Email de confirmation au client avec le nom du couvreur
  await transporter.sendMail({
    from: `"${artisanName} - Couvreur" <${process.env.SMTP_USER}>`,
    replyTo: artisanEmail, // Le couvreur recevra directement les réponses
    to: clientEmail,
    subject: "Confirmation de votre demande de devis",
    html: `
      <h1>Votre demande de devis a bien été envoyée</h1>
      
      <p>Nous avons bien transmis votre demande à ${artisanName}. Il vous contactera dans les plus brefs délais.</p>
      
      <h2>Récapitulatif de votre demande</h2>
      ${projectType ? `<p><strong>Type de projet :</strong> ${projectType}</p>` : ""}
      ${projectDescription ? `<p><strong>Description :</strong> ${projectDescription}</p>` : ""}
      
      <p>À très bientôt !</p>
    `,
  })
}

export async function sendArtisanRegistrationEmail({
  companyName,
  contactName,
  email,
  phone,
  address,
  siret,
  yearsExperience,
  specialties,
  description,
  website,
  departmentName,
}: {
  companyName: string
  contactName: string
  email: string
  phone: string
  address: string
  siret: string
  yearsExperience?: string
  specialties?: string
  description?: string
  website?: string
  departmentName: string
}) {
  const experienceMap = {
    "1-5": "1-5 ans",
    "5-10": "5-10 ans",
    "10-20": "10-20 ans",
    "20+": "Plus de 20 ans"
  }

  // Email à l'admin
  await transporter.sendMail({
    from: `"Couvreurs App" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // Envoyer à l'admin
    subject: `Nouvelle inscription artisan - ${companyName}`,
    html: `
      <h1>Nouvelle inscription artisan</h1>
      
      <h2>Informations de l'entreprise</h2>
      <ul>
        <li><strong>Entreprise :</strong> ${companyName}</li>
        <li><strong>Contact :</strong> ${contactName}</li>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Téléphone :</strong> ${phone}</li>
        <li><strong>Adresse :</strong> ${address}</li>
        <li><strong>SIRET :</strong> ${siret}</li>
        <li><strong>Département :</strong> ${departmentName}</li>
        ${yearsExperience ? `<li><strong>Expérience :</strong> ${experienceMap[yearsExperience as keyof typeof experienceMap]}</li>` : ''}
        ${specialties ? `<li><strong>Spécialités :</strong> ${specialties}</li>` : ''}
        ${website ? `<li><strong>Site web :</strong> <a href="${website}">${website}</a></li>` : ''}
      </ul>

      ${description ? `
      <h2>Description de l'activité</h2>
      <p>${description}</p>
      ` : ''}

      <p>Connectez-vous à l'interface d'administration pour valider ou refuser cette inscription.</p>
    `,
  })
}
