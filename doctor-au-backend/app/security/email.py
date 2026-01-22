from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv
import os

# Carrega variáveis do .env
load_dotenv()

# Configuração do FastMail usando as variáveis de ambiente
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=os.getenv("MAIL_TLS") == "True",
    MAIL_SSL_TLS=os.getenv("MAIL_SSL") == "True",
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=None, # Se quiser usar templates HTML depois
    MAIL_FROM_NAME="DoctorAu" # O nome que aparece na caixa de entrada
)

async def enviar_email_verificacao(email: str, token: str):
    # Por enquanto o link vai direto pro Backend validar
    link = f"http://127.0.0.1:8000/users/verificar-email/{token}"

    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #4CAF50; text-align: center;">Bem-vindo ao DoctorAu! 🐶</h2>
        <p>Olá,</p>
        <p>Obrigado por se cadastrar. Para ativar sua conta e acessar o sistema, por favor confirme seu e-mail clicando no botão abaixo:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{link}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirmar meu E-mail</a>
        </div>
        
        <p style="color: #666; font-size: 12px;">Se o botão não funcionar, copie e cole este link no seu navegador:</p>
        <p style="color: #666; font-size: 12px; word-break: break-all;">{link}</p>
    </div>
    """

    message = MessageSchema(
        subject="Confirme seu cadastro no DoctorAu",
        recipients=[email],
        body=html_content,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)