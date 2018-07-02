from pathlib import Path
from setuptools import find_packages
from setuptools import setup

readme = Path(__file__) / '..' / 'README.md'
with readme.resolve().open() as f:
    long_description = f.read()


setup(
    name='vibrations',
    use_scm_version=True,
    setup_requires=['setuptools_scm'],
    author='Anthony Schwartzman',
    author_email='anthony@anthonyschwartzman.com',
    description='A minimalistic soundmap',
    long_description=long_description,
    long_description_content_type='text/markdown',
    packages=find_packages(exclude=[
        'conf',
        'lib',
        'node_modules',
        'static',
        'templates'
    ]),
    install_requires=[
        'boto3',
        'flask',
        'importlib_resources',
        'pyyaml',
        'requests'
    ],
    extras_require={
        'dev': [
            'livereload',
            'zappa'
        ]
    }
)
