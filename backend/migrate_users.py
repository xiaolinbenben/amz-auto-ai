from sqlalchemy import text
from app.database import engine

with engine.connect() as conn:
    try:
        conn.execute(text('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin INTEGER DEFAULT 0'))
        print('is_admin column added')
    except Exception as e:
        print(f'is_admin column already exists or error: {e}')

    try:
        conn.execute(text('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active INTEGER DEFAULT 1'))
        print('is_active column added')
    except Exception as e:
        print(f'is_active column already exists or error: {e}')

    conn.commit()
    print('Database migration completed successfully!')
