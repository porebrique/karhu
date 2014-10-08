

Использование Karhu в проекте:


Проект:
* рядом с settings.py должен лежать site_config.py с оверрайдом настроек karhu.default_site_config
Не нуждающиеся в оверрайде настройки можно опустить.	

settings.py:

* Добавить 'karhu' в INSTALLED_APPS
* BASE_DIR -- папка проекта, в которой находится его сеттингс.пи

вообще вот копипаста:
	PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))
	WWW_DIR = os.path.join(PROJECT_ROOT, 'www')
	BASE_DIR = os.path.normpath(os.path.dirname(__file__))


* Для работы karhu,pagelets должен быть задан SITE_ID


urls.py:

* import karhu

* (r'', include('karhu.urls')),   