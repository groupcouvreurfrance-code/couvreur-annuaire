// components/email-templates/quote-request-email.tsx
import * as React from 'react'

interface QuoteRequestEmailProps {
    clientName: string
    clientEmail: string
    clientPhone?: string
    projectType?: string
    projectDescription?: string
    urgency: string
    preferredContact: string
}

export const QuoteRequestEmailTemplate: React.FC<Readonly<QuoteRequestEmailProps>> = ({
                                                                                          clientName,
                                                                                          clientEmail,
                                                                                          clientPhone,
                                                                                          projectType,
                                                                                          projectDescription,
                                                                                          urgency,
                                                                                          preferredContact,
                                                                                      }) => {
    const urgencyMap = {
        immediate: "Urgent",
        within_week: "Cette semaine",
        within_month: "Ce mois-ci",
        no_rush: "Pas pressé",
    }

    const getUrgencyStyle = (urgencyLevel: string) => {
        const baseStyle = {
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: '600' as const,
            fontSize: '14px',
            textTransform: 'uppercase' as const,
        }

        switch (urgencyLevel) {
            case 'immediate':
                return { ...baseStyle, backgroundColor: '#e74c3c', color: '#ffffff' }
            case 'within_week':
                return { ...baseStyle, backgroundColor: '#f39c12', color: '#ffffff' }
            case 'within_month':
                return { ...baseStyle, backgroundColor: '#3498db', color: '#ffffff' }
            case 'no_rush':
                return { ...baseStyle, backgroundColor: '#27ae60', color: '#ffffff' }
            default:
                return { ...baseStyle, backgroundColor: '#95a5a6', color: '#ffffff' }
        }
    }

    return (
        <div style={containerStyle}>
            {/* En-tête avec logo */}
            <div style={headerStyle}>im
                <div style={logoContainerStyle}>
                    <img
                        src="https://www.couvreur-groupefrance.com/og-image.png"
                        alt="Couvreur Groupe France"
                        style={logoImageStyle}
                    />
                </div>
                <h1 style={titleStyle}>Nouvelle Demande de Devis</h1>
                <p style={subtitleStyle}>Un client souhaite obtenir un devis pour ses travaux</p>
            </div>

            {/* Image d'illustration */}
            <div style={heroImageStyle}>
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.29_284bbe7b.jpg-wHVYXq6HcbrTlrU79t7zq5U2nMVtoJ.jpeg"
                    alt="Travaux de couverture"
                    style={imageStyle}
                />
            </div>

            {/* Contenu principal */}
            <div style={contentStyle}>
                {/* Informations client */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>👤 Informations Client</h2>

                    <div style={infoGridStyle}>
                        <div style={infoItemStyle}>
                            <div style={infoLabelStyle}>Nom du client</div>
                            <div style={infoValueStyle}>{clientName}</div>
                        </div>

                        <div style={infoItemStyle}>
                            <div style={infoLabelStyle}>Email</div>
                            <div style={infoValueStyle}>{clientEmail}</div>
                        </div>

                        {clientPhone && (
                            <div style={infoItemStyle}>
                                <div style={infoLabelStyle}>Téléphone</div>
                                <div style={infoValueStyle}>{clientPhone}</div>
                            </div>
                        )}

                        <div style={infoItemStyle}>
                            <div style={infoLabelStyle}>Contact préféré</div>
                            <div style={infoValueStyle}>{preferredContact}</div>
                        </div>
                    </div>
                </div>

                {/* Détails du projet */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>🏠 Détails du Projet</h2>

                    <div style={infoGridStyle}>
                        {projectType && (
                            <div style={infoItemStyle}>
                                <div style={infoLabelStyle}>Type de projet</div>
                                <div style={infoValueStyle}>{projectType}</div>
                            </div>
                        )}

                        <div style={infoItemStyle}>
                            <div style={infoLabelStyle}>Niveau d'urgence</div>
                            <div style={infoValueStyle}>
                <span style={getUrgencyStyle(urgency)}>
                  {urgencyMap[urgency as keyof typeof urgencyMap]}
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description du projet */}
                {projectDescription && (
                    <div style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>📝 Description du Projet</h2>
                        <div style={descriptionBoxStyle}>
                            <p style={descriptionTextStyle}>{projectDescription}</p>
                        </div>
                    </div>
                )}

                {/* Call to action */}
                <div style={ctaSectionStyle}>
                    <p style={ctaTextStyle}>Prêt à répondre à cette demande ?</p>
                    <a href={`mailto:${clientEmail}`} style={buttonStyle}>
                        Contacter le Client
                    </a>
                    <p style={ctaSubtextStyle}>
                        Vous pouvez répondre directement à cet email ou cliquer sur le bouton ci-dessus
                    </p>
                </div>
            </div>

            {/* Pied de page */}
            <div style={footerStyle}>
                <p style={footerTextStyle}>
                    <strong>Couvreur Groupe France</strong>
                </p>
                <p style={footerSubtextStyle}>
                    Votre plateforme de mise en relation avec des clients qualifiés
                </p>
                <p style={copyrightStyle}>
                    © {new Date().getFullYear()} Couvreur Groupe France. Tous droits réservés.
                </p>
            </div>
        </div>
    )
}

// Styles
const containerStyle = {
    width: '100%',
    margin: '0',
    backgroundColor: '#f8f9fa',
    color: '#333333',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    colorScheme: 'light' as const,
}

const headerStyle = {
    padding: '40px 24px',
    textAlign: 'center' as const,
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    color: '#ffffff'
}

const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
}

const logoImageStyle = {
    width: '120px',
    height: 'auto',
    maxHeight: '60px',
    objectFit: 'contain' as const
}

const titleStyle = {
    fontSize: '28px',
    fontWeight: '600' as const,
    margin: '0 0 10px 0',
    color: '#ffffff'
}

const subtitleStyle = {
    fontSize: '16px',
    margin: '0',
    opacity: '0.9',
    color: '#ffffff'
}

const heroImageStyle = {
    width: '100%',
    maxHeight: '250px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const imageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover' as const,
    display: 'block'
}

const contentStyle = {
    padding: '40px 30px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff'
}

const sectionStyle = {
    marginBottom: '40px'
}

const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600' as const,
    color: '#2c3e50',
    marginBottom: '25px',
    paddingBottom: '10px',
    borderBottom: '3px solid #e74c3c',
    display: 'inline-block'
}

const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
}

const infoItemStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    borderLeft: '4px solid #e74c3c',
    transition: 'transform 0.2s ease'
}

const infoLabelStyle = {
    fontWeight: '600' as const,
    color: '#2c3e50',
    fontSize: '14px',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
}

const infoValueStyle = {
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.4'
}

const descriptionBoxStyle = {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '12px',
    borderLeft: '4px solid #3498db',
    marginTop: '15px'
}

const descriptionTextStyle = {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#555',
    margin: '0',
    fontStyle: 'italic' as const
}

const ctaSectionStyle = {
    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    padding: '40px',
    textAlign: 'center' as const,
    borderRadius: '12px',
    marginTop: '40px'
}

const ctaTextStyle = {
    color: '#ffffff',
    marginBottom: '25px',
    fontSize: '20px',
    fontWeight: '500' as const,
    margin: '0 0 25px 0'
}

const buttonStyle = {
    display: 'inline-block',
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    padding: '16px 32px',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600' as const,
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
}

const ctaSubtextStyle = {
    color: '#ffffff',
    fontSize: '14px',
    marginTop: '20px',
    opacity: '0.9',
    margin: '20px 0 0 0'
}

const footerStyle = {
    padding: '30px 24px',
    textAlign: 'center' as const,
    background: '#2c3e50',
    color: '#ffffff'
}

const footerTextStyle = {
    fontSize: '16px',
    marginBottom: '8px',
    margin: '0 0 8px 0'
}

const footerSubtextStyle = {
    fontSize: '14px',
    marginBottom: '15px',
    opacity: '0.8',
    margin: '0 0 15px 0'
}

const copyrightStyle = {
    fontSize: '12px',
    opacity: '0.7',
    margin: '0'
}