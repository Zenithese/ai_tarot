set -o errexit

poetry install
poetry lock

python manage.py collectstatic --no-input
python manage.py migrate