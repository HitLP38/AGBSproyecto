"""Add score_reference table

Revision ID: 677767ddbba0
Revises: 9239e03f322d
Create Date: 2025-07-22 04:01:55.871833

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '677767ddbba0'
down_revision: Union[str, Sequence[str], None] = '9239e03f322d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
