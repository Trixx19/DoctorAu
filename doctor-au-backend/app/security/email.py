from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import os

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_PORT=int(os.getenv("MAIL_PORT")),
    MAIL_TLS=True,
    MAIL_SSL=False
)

async def enviar_email_verificacao(email: str, token: str):
    link = f"http://127.0.0.1:8000/users/verificar-email/{token}"

    message = MessageSchema(
        subject="Confirme seu email - DoctorAu 🐶",
        recipients=[email],
        body=f"""
Olá!

Clique no link abaixo para confirmar seu email:

{link}
""",
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
