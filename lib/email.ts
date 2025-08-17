import {Resend} from "resend";
import {QuoteRequestEmailTemplate} from "@/app/mail/demande-devis";
import {ClientConfirmationEmailTemplate} from "@/app/mail/client-confirmation";

// Initialiser Resend
const resend = new Resend(process.env.RESEND_API_KEY || "");

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

  // Email au couvreur
    await resend.emails.send({
        from: "no-reply@couvreur-groupefrance.com",
        to: artisanEmail,
        subject: `Nouvelle demande de devis de ${clientName}`,
        react: await QuoteRequestEmailTemplate({
            clientName,
            clientEmail,
            clientPhone,
            projectType,
            projectDescription,
            urgency,
            preferredContact,
        }),
    });
  // Email de confirmation au client avec le nom du couvreur
    await resend.emails.send({
        from: `${artisanName} - Couvreur <no-reply@couvreur-groupefrance.com>`,
        to: clientEmail,
        subject: "Confirmation de votre demande de devis",
        react: await ClientConfirmationEmailTemplate({
            artisanName,
            clientName,
            projectType,
            projectDescription,
        }),
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
  await resend.emails.send({
    from: "Couvreurs App <no-reply@couvreur-groupefrance.com>",
    to: process.env.ADMIN_EMAIL || "admin@couvreur-groupefrance.com", // Email admin
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