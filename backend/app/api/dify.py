from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, Any
import httpx

from app.database import get_db
from app.config import settings
from app.api.auth import get_current_user
from app.schemas.user import User

router = APIRouter()


@router.get("/dify/apps")
async def get_dify_apps(
    current_user: User = Depends(get_current_user)
):
    """
    获取 Dify 应用列表
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{settings.dify_api_url}/apps",
                headers={
                    "Authorization": f"Bearer {settings.dify_api_key}",
                    "Content-Type": "application/json"
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Dify API 错误: {e.response.text if e.response else str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取 Dify 应用失败: {str(e)}"
        )


@router.get("/dify/apps/{app_id}")
async def get_dify_app(
    app_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    获取单个 Dify 应用详情
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{settings.dify_api_url}/apps/{app_id}",
                headers={
                    "Authorization": f"Bearer {settings.dify_api_key}",
                    "Content-Type": "application/json"
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Dify API 错误: {e.response.text if e.response else str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取 Dify 应用失败: {str(e)}"
        )


@router.get("/dify/apps/{app_id}/workflow")
async def get_dify_app_workflow(
    app_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    获取 Dify 应用的工作流详情
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{settings.dify_api_url}/apps/{app_id}/workflows",
                headers={
                    "Authorization": f"Bearer {settings.dify_api_key}",
                    "Content-Type": "application/json"
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Dify API 错误: {e.response.text if e.response else str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取 Dify 工作流失败: {str(e)}"
        )


@router.post("/dify/apps/{app_id}/run")
async def run_dify_app(
    app_id: str,
    inputs: Dict[str, Any],
    current_user: User = Depends(get_current_user)
):
    """
    运行 Dify 应用
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.dify_api_url}/apps/{app_id}/run",
                json={"inputs": inputs},
                headers={
                    "Authorization": f"Bearer {settings.dify_api_key}",
                    "Content-Type": "application/json"
                },
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Dify API 错误: {e.response.text if e.response else str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"运行 Dify 应用失败: {str(e)}"
        )
