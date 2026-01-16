from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.api.auth import get_current_user
from app.schemas.user import User
from app.models import User as UserModel

router = APIRouter()


@router.get("/admin/users")
async def get_all_users(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    获取所有用户列表（管理员权限）
    """
    # TODO: 添加管理员权限检查
    try:
        users = db.query(UserModel).all()
        return {
            "data": [
                {
                    "id": str(user.id),
                    "email": user.email,
                    "username": user.username,
                    "created_at": user.created_at.isoformat() if user.created_at else None,
                    "status": "active"  # TODO: 从数据库获取实际状态
                }
                for user in users
            ]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取用户列表失败: {str(e)}"
        )


@router.delete("/admin/users/{user_id}")
async def delete_user(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    删除用户（管理员权限）
    """
    # TODO: 添加管理员权限检查
    try:
        user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="用户不存在"
            )
        
        db.delete(user)
        db.commit()
        
        return {"message": "用户删除成功"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"删除用户失败: {str(e)}"
        )


@router.get("/admin/stats")
async def get_admin_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    获取系统统计数据（管理员权限）
    """
    # TODO: 添加管理员权限检查
    try:
        total_users = db.query(UserModel).count()
        active_users = db.query(UserModel).count()  # TODO: 根据实际状态过滤
        
        return {
            "total_users": total_users,
            "active_users": active_users,
            "total_apps": 0,  # TODO: 从 Dify 获取应用数量
            "system_status": "healthy"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取统计数据失败: {str(e)}"
        )
