# Import all the SQLAlchemy models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.score_table import ScoreReference  # noqa
# from app.models.user import User  # noqa (si tienes otros modelos)
# from app.models.otros_modelos import OtroModelo  # noqa