import os

from setuptools import setup, find_packages

#here = os.path.abspath(os.path.dirname(__file__))
#README = open(os.path.join(here, 'README.txt')).read()
#CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()

requires = [
    #'pyyaml',
    'Pillow',
    'django-ckeditor',
    'djangorestframework',
 
    ]

setup(
    name = "Karhu",
    version = "0.0",
    package_data = {'':['*.*']},
    packages = find_packages(),
)

'''
setup(name='karhu',
      version='0.0',
      description='Just one more web-site framework',
      long_description=README + '\n\n' +  CHANGES,
      classifiers=[
        "Programming Language :: Python"
        ],
      author='',
      author_email='',
      url='',
      keywords='',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      test_suite='yoyo',
      install_requires=requires
      #entry_points='',
      )

'''