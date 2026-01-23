from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_admin = Column(Integer, default=0, nullable=False)  # 0: 普通用户, 1: 管理员
    is_active = Column(Integer, default=1, nullable=False)  # 0: 禁用, 1: 激活
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    workflows = relationship("WorkflowHistory", back_populates="user")


class WorkflowHistory(Base):
    __tablename__ = "workflow_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    input_data = Column(Text, nullable=False)
    output_data = Column(Text, nullable=True)
    status = Column(String, default="completed")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="workflows")


class DifyApp(Base):
    __tablename__ = "dify_apps"

    id = Column(Integer, primary_key=True, index=True)
    app_id = Column(String, unique=True, index=True, nullable=False)  # Dify App UUID
    name = Column(String, nullable=False)
    api_key = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
