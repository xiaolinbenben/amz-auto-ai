from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import User

def set_first_user_as_admin():
    db = SessionLocal()
    try:
        # 获取第一个用户
        first_user = db.query(User).first()

        if first_user:
            print(f"找到用户: {first_user.username} (ID: {first_user.id})")
            first_user.is_admin = 1
            db.commit()
            db.refresh(first_user)
            print(f"✅ 用户 {first_user.username} 已设置为管理员")
        else:
            print("❌ 数据库中没有用户，请先注册一个账户")

    except Exception as e:
        print(f"❌ 设置管理员失败: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    set_first_user_as_admin()
