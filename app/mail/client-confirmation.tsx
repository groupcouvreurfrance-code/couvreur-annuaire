// components/email-templates/client-confirmation-email.tsx
import * as React from 'react'

interface ClientConfirmationEmailProps {
    artisanName: string
    clientName: string
    projectType?: string
    projectDescription?: string
}

export const ClientConfirmationEmailTemplate: React.FC<Readonly<ClientConfirmationEmailProps>> = ({
                                                                                                      artisanName,
                                                                                                      clientName,
                                                                                                      projectType,
                                                                                                      projectDescription,
                                                                                                  }) => {
    return (
        <div style={containerStyle}>
            {/* En-tête avec logo séparé */}
            <div style={logoSectionStyle}>
                <div style={logoContainerStyle}>
                    <img
                        src="https://i.imgur.com/placeholder-logo.png"
                        alt="Couvreur Groupe France"
                        style={logoImageStyle}
                    />
                </div>
            </div>

            {/* En-tête avec titre */}
            <div style={headerStyle}>
                <h1 style={titleStyle}>✅ Confirmation de Demande</h1>
                <p style={subtitleStyle}>Votre demande de devis a bien été transmise</p>
            </div>

            {/* Image d'illustration */}
            <div style={heroImageStyle}>
                <img
                    src="https://www.couvreur-groupefrance.com/og-image.png"
                    alt="Confirmation envoyée"
                    style={imageStyle}
                />
            </div>

            {/* Contenu principal */}
            <div style={contentStyle}>
                {/* Message de bienvenue */}
                <div style={welcomeSectionStyle}>
                    <h2 style={welcomeTitleStyle}>Bonjour {clientName} ! 👋</h2>
                    <p style={welcomeTextStyle}>
                        Excellente nouvelle ! Nous avons bien transmis votre demande de devis à <strong>{artisanName}</strong>.
                        Il vous contactera dans les plus brefs délais pour discuter de votre projet.
                    </p>
                </div>

                {/* Étapes suivantes */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>📋 Prochaines étapes</h2>

                    <div style={stepsContainerStyle}>
                        <div style={stepItemStyle}>
                            <div style={stepNumberStyle}>1</div>
                            <div style={stepContentStyle}>
                                <h3 style={stepTitleStyle}>Prise de contact</h3>
                                <p style={stepDescriptionStyle}>
                                    {artisanName} va vous contacter sous 24-48h pour discuter de votre projet
                                </p>
                            </div>
                        </div>

                        <div style={stepItemStyle}>
                            <div style={stepNumberStyle}>2</div>
                            <div style={stepContentStyle}>
                                <h3 style={stepTitleStyle}>Visite technique</h3>
                                <p style={stepDescriptionStyle}>
                                    Si nécessaire, une visite sera planifiée pour évaluer précisément vos besoins
                                </p>
                            </div>
                        </div>

                        <div style={stepItemStyle}>
                            <div style={stepNumberStyle}>3</div>
                            <div style={stepContentStyle}>
                                <h3 style={stepTitleStyle}>Devis personnalisé</h3>
                                <p style={stepDescriptionStyle}>
                                    Vous recevrez un devis détaillé adapté à votre projet
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Récapitulatif de la demande */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>📝 Récapitulatif de votre demande</h2>

                    <div style={summaryBoxStyle}>
                        <div style={summaryHeaderStyle}>
                            <h3 style={summaryTitleStyle}>Détails du projet</h3>
                        </div>

                        <div style={summaryContentStyle}>
                            {projectType && (
                                <div style={summaryItemStyle}>
                                    <span style={summaryLabelStyle}>Type de projet :</span>
                                    <span style={summaryValueStyle}>{projectType}</span>
                                </div>
                            )}

                            {projectDescription && (
                                <div style={summaryItemStyle}>
                                    <span style={summaryLabelStyle}>Description :</span>
                                    <div style={descriptionTextStyle}>{projectDescription}</div>
                                </div>
                            )}

                            <div style={summaryItemStyle}>
                                <span style={summaryLabelStyle}>Artisan assigné :</span>
                                <span style={summaryValueStyle}>{artisanName}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conseils utiles */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>💡 Conseils utiles</h2>

                    <div style={tipsContainerStyle}>
                        <div style={tipItemStyle}>
                            <span style={tipIconStyle}>📞</span>
                            <p style={tipTextStyle}>
                                Préparez vos questions et vos attentes pour la première conversation
                            </p>
                        </div>

                        <div style={tipItemStyle}>
                            <span style={tipIconStyle}>📸</span>
                            <p style={tipTextStyle}>
                                Ayez des photos de la zone de travail à disposition si possible
                            </p>
                        </div>

                        <div style={tipItemStyle}>
                            <span style={tipIconStyle}>📋</span>
                            <p style={tipTextStyle}>
                                N'hésitez pas à demander des références et à vérifier les assurances
                            </p>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div style={supportSectionStyle}>
                    <h3 style={supportTitleStyle}>Besoin d'aide ?</h3>
                    <p style={supportTextStyle}>
                        Si vous avez des questions ou si vous ne recevez pas de nouvelle de l'artisan sous 48h,
                        n'hésitez pas à nous contacter.
                    </p>
                    <a href="mailto:support@couvreur-groupefrance.com" style={supportButtonStyle}>
                        Nous contacter
                    </a>
                </div>
            </div>

            {/* Pied de page */}
            <div style={footerStyle}>
                <p style={footerTextStyle}>
                    <strong>Couvreur Groupe France</strong>
                </p>
                <p style={footerSubtextStyle}>
                    Votre plateforme de mise en relation avec des artisans qualifiés
                </p>
                <p style={copyrightStyle}>
                    © {new Date().getFullYear()} Couvreur Groupe France. Tous droits réservés.
                </p>
            </div>
        </div>
    )
}

// Styles optimisés
const containerStyle = {
    width: '100%',
    margin: '0',
    backgroundColor: '#f8f9fa',
    color: '#333333',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    colorScheme: 'light' as const,
}

// Nouvelle section dédiée au logo
const logoSectionStyle = {
    padding: '30px 24px 20px 24px',
    textAlign: 'center' as const,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e9ecef'
}

const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const logoImageStyle = {
    width: '160px',
    height: 'auto',
    maxHeight: '80px',
    objectFit: 'contain' as const,
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
}

// En-tête réorganisé sans le logo
const headerStyle = {
    padding: '30px 24px 40px 24px',
    textAlign: 'center' as const,
    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
    color: '#ffffff',
    position: 'relative' as const
}

const titleStyle = {
    fontSize: '32px',
    fontWeight: '700' as const,
    margin: '0 0 15px 0',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
}

const subtitleStyle = {
    fontSize: '18px',
    margin: '0',
    opacity: '0.95',
    color: '#ffffff',
    fontWeight: '400' as const
}

const heroImageStyle = {
    width: '100%',
    maxHeight: '280px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as const
}

const imageStyle = {
    width: '100%',
    height: '280px',
    objectFit: 'cover' as const,
    display: 'block'
}

const contentStyle = {
    padding: '50px 30px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff'
}

const welcomeSectionStyle = {
    textAlign: 'center' as const,
    marginBottom: '50px',
    padding: '35px',
    backgroundColor: '#f8fffe',
    borderRadius: '16px',
    border: '3px solid #27ae60',
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.15)'
}

const welcomeTitleStyle = {
    fontSize: '26px',
    fontWeight: '700' as const,
    color: '#27ae60',
    marginBottom: '20px',
    margin: '0 0 20px 0'
}

const welcomeTextStyle = {
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#555',
    margin: '0'
}

const sectionStyle = {
    marginBottom: '45px'
}

const sectionTitleStyle = {
    fontSize: '22px',
    fontWeight: '700' as const,
    color: '#2c3e50',
    marginBottom: '30px',
    paddingBottom: '12px',
    borderBottom: '4px solid #27ae60',
    display: 'inline-block'
}

const stepsContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '25px'
}

const stepItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '25px',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    border: '1px solid #e9ecef',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
}

const stepNumberStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#27ae60',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold' as const,
    flexShrink: '0',
    boxShadow: '0 4px 8px rgba(39, 174, 96, 0.3)'
}

const stepContentStyle = {
    flex: '1'
}

const stepTitleStyle = {
    fontSize: '19px',
    fontWeight: '600' as const,
    color: '#2c3e50',
    marginBottom: '10px',
    margin: '0 0 10px 0'
}

const stepDescriptionStyle = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    margin: '0'
}

const summaryBoxStyle = {
    border: '3px solid #3498db',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.15)'
}

const summaryHeaderStyle = {
    backgroundColor: '#3498db',
    padding: '25px',
    textAlign: 'center' as const
}

const summaryTitleStyle = {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '700' as const,
    margin: '0',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
}

const summaryContentStyle = {
    padding: '30px',
    backgroundColor: '#ffffff'
}

const summaryItemStyle = {
    marginBottom: '25px',
    padding: '20px 0',
    borderBottom: '2px solid #f1f3f4'
}

const summaryLabelStyle = {
    fontWeight: '600' as const,
    color: '#2c3e50',
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px'
}

const summaryValueStyle = {
    color: '#555',
    fontSize: '17px',
    fontWeight: '500' as const
}

const descriptionTextStyle = {
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.7',
    fontStyle: 'italic' as const,
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '10px',
    border: '1px solid #e9ecef'
}

const tipsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px'
}

const tipItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '18px',
    padding: '25px',
    backgroundColor: '#fff8e1',
    borderRadius: '16px',
    border: '2px solid #ffc107',
    boxShadow: '0 2px 8px rgba(255, 193, 7, 0.2)'
}

const tipIconStyle = {
    fontSize: '28px',
    flexShrink: '0'
}

const tipTextStyle = {
    fontSize: '16px',
    color: '#856404',
    lineHeight: '1.6',
    margin: '0',
    fontWeight: '500' as const
}

const supportSectionStyle = {
    textAlign: 'center' as const,
    padding: '35px',
    backgroundColor: '#e3f2fd',
    borderRadius: '16px',
    border: '3px solid #2196f3',
    marginTop: '50px',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)'
}

const supportTitleStyle = {
    fontSize: '22px',
    fontWeight: '700' as const,
    color: '#1565c0',
    marginBottom: '18px',
    margin: '0 0 18px 0'
}

const supportTextStyle = {
    fontSize: '17px',
    color: '#1976d2',
    lineHeight: '1.7',
    marginBottom: '30px',
    margin: '0 0 30px 0'
}

const supportButtonStyle = {
    display: 'inline-block',
    backgroundColor: '#2196f3',
    color: '#ffffff',
    padding: '15px 30px',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600' as const,
    fontSize: '17px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
}

const footerStyle = {
    padding: '40px 24px',
    textAlign: 'center' as const,
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    color: '#ffffff'
}

const footerTextStyle = {
    fontSize: '18px',
    marginBottom: '10px',
    margin: '0 0 10px 0',
    fontWeight: '600' as const
}

const footerSubtextStyle = {
    fontSize: '15px',
    marginBottom: '20px',
    opacity: '0.9',
    margin: '0 0 20px 0'
}

const copyrightStyle = {
    fontSize: '13px',
    opacity: '0.8',
    margin: '0'
}