import bcrypt

def hash_password(password: str) -> str:
    """Gera um hash seguro da senha usando bcrypt."""
    # O bcrypt trabalha com bytes, então precisamos converter (encode)
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    # Retorna como string para salvar no banco
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha em texto bate com o hash salvo."""
    pwd_bytes = plain_password.encode('utf-8')
    hash_bytes = hashed_password.encode('utf-8')
    # O checkpw faz a verificação segura
    return bcrypt.checkpw(pwd_bytes, hash_bytes)