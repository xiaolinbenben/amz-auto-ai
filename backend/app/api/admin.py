from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from app.database import get_db
from app.api.auth import get_current_user
from app.schemas.user import User
from app.models import User as UserModel

router = APIRouter()

class GrantAdminRequest(BaseModel):
    user_id: int

class UpdateUserStatusRequest(BaseModel):
    user_id: int
    is_active: int


def check_admin_access(current_user: UserModel):
    """检查当前用户是否为管理员"""
    if current_user.is_admin != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="需要管理员权限"
        )


@router.get("/admin/users")
async def get_all_users(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    获取所有用户列表（管理员权限）
    """
    check_admin_access(current_user)
    try:
        users = db.query(UserModel).all()
        return {
            "data": [
                {
                    "id": str(user.id),
                    "email": user.email,
                    "username": user.username,
                    "created_at": user.created_at.isoformat() if user.created_at else None,
                    "is_admin": user.is_admin,
                    "status": "active" if user.is_active == 1 else "inactive"
                }
                for user in users
            ]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取用户列表失败: {str(e)}"
        )


@router.post("/admin/grant-admin")
async def grant_admin(
    request: GrantAdminRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    授权用户为管理员（管理员权限）
    """
    check_admin_access(current_user)
    try:
        user = db.query(UserModel).filter(UserModel.id == request.user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="用户不存在"
            )

        user.is_admin = 1
        db.commit()
        db.refresh(user)

        return {"message": f"用户 {user.username} 已被授予管理员权限"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"授权管理员失败: {str(e)}"
        )


@router.post("/admin/revoke-admin")
async def revoke_admin(
    request: GrantAdminRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    撤销用户管理员权限（管理员权限）
    """
    check_admin_access(current_user)
    try:
        user = db.query(UserModel).filter(UserModel.id == request.user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="用户不存在"
            )

        # 防止撤销自己的管理员权限
        if user.id == current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="不能撤销自己的管理员权限"
            )

        user.is_admin = 0
        db.commit()
        db.refresh(user)

        return {"message": f"用户 {user.username} 的管理员权限已被撤销"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"撤销管理员权限失败: {str(e)}"
        )


@router.post("/admin/update-user-status")
async def update_user_status(
    request: UpdateUserStatusRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    更新用户状态（激活/禁用）（管理员权限）
    """
    check_admin_access(current_user)
    try:
        user = db.query(UserModel).filter(UserModel.id == request.user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="用户不存在"
            )

        # 防止禁用自己的账户
        if user.id == current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="不能禁用自己的账户"
            )

        user.is_active = request.is_active
        db.commit()
        db.refresh(user)

        status_text = "激活" if user.is_active == 1 else "禁用"
        return {"message": f"用户 {user.username} 已被{status_text}"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"更新用户状态失败: {str(e)}"
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
    check_admin_access(current_user)
    try:
        user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="用户不存在"
            )

        # 防止删除自己的账户
        if user.id == current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="不能删除自己的账户"
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
    check_admin_access(current_user)
    try:
        total_users = db.query(UserModel).count()
        active_users = db.query(UserModel).filter(UserModel.is_active == 1).count()
        admin_users = db.query(UserModel).filter(UserModel.is_admin == 1).count()

        return {
            "total_users": total_users,
            "active_users": active_users,
            "admin_users": admin_users,
            "total_apps": 0,  # TODO: 从 Dify 获取应用数量
            "system_status": "healthy"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取统计数据失败: {str(e)}"
        )
